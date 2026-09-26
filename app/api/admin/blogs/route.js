import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/adminAuth";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, setDoc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { blogPosts as fallbackPosts } from "@/lib/site";
import { slugify, memoryBlogs, getLocalDiskBlogs, saveLocalDiskBlogs } from "@/lib/blogsData";

// GET all blogs for Admin management
export async function GET(request) {
  const token = request.cookies.get("bhh_admin_session")?.value;
  const session = verifyAdminSession(token);
  if (!session.valid) {
    return NextResponse.json({ success: false, error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const blogsMap = new Map();

    // 1. Load default fallback posts from site.js
    fallbackPosts.forEach((post) => {
      blogsMap.set(post.slug, {
        id: post.slug,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: Array.isArray(post.content) ? post.content.join("\n\n") : post.content,
        image: post.image || "",
        category: post.category || (post.slug.includes("waiver") ? "Medicaid Waiver" : "Caregiver Tips"),
        author: post.author || "Blessed Hearts Care Team",
        readTime: post.readTime || "5 min read",
        status: "published",
        date: post.date || "2026-06-25",
        isDefault: true,
      });
    });

    // 2. Load from persistent disk storage
    const diskBlogs = getLocalDiskBlogs();
    Object.values(diskBlogs).forEach((post) => {
      blogsMap.set(post.slug, {
        ...post,
        content: Array.isArray(post.content) ? post.content.join("\n\n") : post.content,
      });
    });

    // 3. Load from memory cache
    memoryBlogs.forEach((post, slug) => {
      blogsMap.set(slug, {
        ...post,
        content: Array.isArray(post.content) ? post.content.join("\n\n") : post.content,
      });
    });

    // 3. Load Firestore BHH-Blogs
    if (db) {
      try {
        const snap = await getDocs(collection(db, "BHH-Blogs"));
        snap.forEach((docSnap) => {
          const d = docSnap.data();
          const slug = d.slug || docSnap.id;
          blogsMap.set(slug, {
            id: docSnap.id,
            slug,
            title: d.title || "Untitled",
            excerpt: d.excerpt || d.summary || "",
            content: Array.isArray(d.content) ? d.content.join("\n\n") : d.content || "",
            image: d.image || d.coverImage || "",
            category: d.category || "General",
            author: d.author || "Blessed Hearts Care Team",
            readTime: d.readTime || "5 min read",
            status: d.status || "published",
            date: d.date || d.publishedAt || (d.createdAt?.toDate ? d.createdAt.toDate().toISOString().slice(0, 10) : "2026-09-26"),
            isDefault: false,
          });
        });
      } catch (err) {
        console.warn("Firestore BHH-Blogs fetch note in admin:", err.message);
      }
    }

    const allBlogs = Array.from(blogsMap.values());
    allBlogs.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

    return NextResponse.json({ success: true, count: allBlogs.length, blogs: allBlogs });
  } catch (error) {
    console.error("Admin GET blogs error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch blogs." }, { status: 500 });
  }
}

// POST create new blog post
export async function POST(request) {
  const token = request.cookies.get("bhh_admin_session")?.value;
  const session = verifyAdminSession(token);
  if (!session.valid) {
    return NextResponse.json({ success: false, error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      title = "",
      slug: customSlug = "",
      excerpt = "",
      content = "",
      category = "Caregiver Tips",
      author = "Blessed Hearts Care Team",
      readTime = "5 min read",
      image = "",
      status = "published",
      date = "",
    } = body;

    if (!title.trim() || !content.trim()) {
      return NextResponse.json(
        { success: false, error: "Blog title and content are required." },
        { status: 400 }
      );
    }

    const finalSlug = slugify(customSlug || title);
    const publishDate = date || new Date().toISOString().slice(0, 10);

    const contentString = typeof content === "string"
      ? content.trim()
      : Array.isArray(content)
      ? content.join("\n\n")
      : "";

    const postObject = {
      id: finalSlug,
      brand: "BHH",
      collection: "BHH-Blogs",
      title: title.trim(),
      slug: finalSlug,
      excerpt: excerpt.trim() || title.trim(),
      content: contentString,
      category: category.trim(),
      author: author.trim(),
      readTime: readTime.trim(),
      image: image.trim() || "https://images.unsplash.com/photo-1762955911431-4c44c7c3f408?w=600&auto=format&fit=crop&q=60",
      status: status || "published",
      date: publishDate,
      isDefault: false,
    };

    // Store in active cache & local disk storage
    memoryBlogs.set(finalSlug, postObject);
    const disk = getLocalDiskBlogs();
    disk[finalSlug] = postObject;
    saveLocalDiskBlogs(disk);

    // Persist in Firestore BHH-Blogs
    let firestorePersisted = false;
    if (db) {
      try {
        const blogDocRef = doc(db, "BHH-Blogs", finalSlug);
        await setDoc(blogDocRef, {
          ...postObject,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        firestorePersisted = true;
      } catch (err) {
        console.warn("Firestore BHH-Blogs write notice (grant read/write rules to persist permanently):", err.message);
      }
    }

    return NextResponse.json({
      success: true,
      message: firestorePersisted
        ? `Blog post "${title}" published and stored in BHH-Blogs collection!`
        : `Blog post "${title}" published to active website! (Add Firestore rule for 'BHH-Blogs' to enable permanent DB persistence).`,
      slug: finalSlug,
      firestorePersisted,
    });
  } catch (error) {
    console.error("Admin POST blog error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to publish blog." },
      { status: 500 }
    );
  }
}

// PUT update existing blog post
export async function PUT(request) {
  const token = request.cookies.get("bhh_admin_session")?.value;
  const session = verifyAdminSession(token);
  if (!session.valid) {
    return NextResponse.json({ success: false, error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      id = "",
      title = "",
      slug = "",
      excerpt = "",
      content = "",
      category = "Caregiver Tips",
      author = "Blessed Hearts Care Team",
      readTime = "5 min read",
      image = "",
      status = "published",
      date = "",
    } = body;

    const docId = id || slug;
    if (!docId) {
      return NextResponse.json({ success: false, error: "Missing blog ID or slug." }, { status: 400 });
    }

    const contentString = typeof content === "string"
      ? content.trim()
      : Array.isArray(content)
      ? content.join("\n\n")
      : "";

    const updatedObject = {
      id: docId,
      brand: "BHH",
      collection: "BHH-Blogs",
      title: title.trim(),
      slug: slug || docId,
      excerpt: excerpt.trim(),
      content: contentString,
      category: category.trim(),
      author: author.trim(),
      readTime: readTime.trim(),
      image: image.trim(),
      status: status || "published",
      date: date || new Date().toISOString().slice(0, 10),
      isDefault: false,
    };

    memoryBlogs.set(docId, updatedObject);
    if (slug && slug !== docId) {
      memoryBlogs.set(slug, updatedObject);
    }

    const disk = getLocalDiskBlogs();
    disk[docId] = updatedObject;
    if (slug && slug !== docId) {
      delete disk[docId];
      disk[slug] = updatedObject;
    }
    saveLocalDiskBlogs(disk);

    let firestorePersisted = false;
    if (db) {
      try {
        const blogDocRef = doc(db, "BHH-Blogs", docId);
        await setDoc(blogDocRef, {
          ...updatedObject,
          updatedAt: serverTimestamp(),
        }, { merge: true });
        firestorePersisted = true;
      } catch (err) {
        console.warn("Firestore BHH-Blogs update note:", err.message);
      }
    }

    return NextResponse.json({
      success: true,
      message: firestorePersisted
        ? "Blog post updated successfully in BHH-Blogs."
        : "Blog post updated in active website.",
      firestorePersisted,
    });
  } catch (error) {
    console.error("Admin PUT blog error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update blog." },
      { status: 500 }
    );
  }
}

// DELETE a blog post
export async function DELETE(request) {
  const token = request.cookies.get("bhh_admin_session")?.value;
  const session = verifyAdminSession(token);
  if (!session.valid) {
    return NextResponse.json({ success: false, error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing blog ID." }, { status: 400 });
    }

    memoryBlogs.delete(id);
    const disk = getLocalDiskBlogs();
    delete disk[id];
    saveLocalDiskBlogs(disk);

    if (db) {
      try {
        const blogDocRef = doc(db, "BHH-Blogs", id);
        await deleteDoc(blogDocRef);
      } catch (err) {
        console.warn("Firestore BHH-Blogs delete note:", err.message);
      }
    }

    return NextResponse.json({ success: true, message: "Blog post deleted successfully." });
  } catch (error) {
    console.error("Admin DELETE blog error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete blog." },
      { status: 500 }
    );
  }
}
