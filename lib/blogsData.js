import { blogPosts as fallbackPosts } from "./site.js";
import { db } from "./firebase.js";
import { collection, getDocs, doc, getDoc, query, where, orderBy } from "firebase/firestore";

/**
 * Generate a clean URL-friendly slug from title
 */
export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

/**
 * Format blog date string
 */
export function formatBlogDate(d) {
  if (!d) return "Recent";
  try {
    const dateObj = new Date(d);
    if (isNaN(dateObj.getTime())) return d;
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (e) {
    return d;
  }
}

import fs from "fs";
import path from "path";

const LOCAL_BLOGS_FILE = path.join(process.cwd(), "data", "localBlogs.json");

export function getLocalDiskBlogs() {
  try {
    if (fs.existsSync(LOCAL_BLOGS_FILE)) {
      const raw = fs.readFileSync(LOCAL_BLOGS_FILE, "utf-8");
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn("Local blogs read error:", e.message);
  }
  return {};
}

export function saveLocalDiskBlogs(blogsObj) {
  try {
    const dir = path.dirname(LOCAL_BLOGS_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(LOCAL_BLOGS_FILE, JSON.stringify(blogsObj, null, 2), "utf-8");
  } catch (e) {
    console.warn("Local blogs save error:", e.message);
  }
}

if (!globalThis._bhh_memory_blogs) {
  globalThis._bhh_memory_blogs = new Map();
}
export const memoryBlogs = globalThis._bhh_memory_blogs;

/**
 * Fetch all published blogs for the public frontend
 */
export async function getAllBlogs() {
  const postsMap = new Map();

  // 1. Add all built-in fallback posts from site.js
  fallbackPosts.forEach((post) => {
    postsMap.set(post.slug, {
      ...post,
      id: post.slug,
      status: "published",
      author: post.author || "Blessed Hearts Care Team",
      readTime: post.readTime || "5 min read",
      category: post.category || (post.slug.includes("waiver") || post.slug.includes("medicaid") ? "Medicaid Waiver" : "Caregiver Tips"),
      date: post.date || "2026-06-25",
    });
  });

  // 2. Add from persistent local disk storage
  const diskBlogs = getLocalDiskBlogs();
  Object.values(diskBlogs).forEach((post) => {
    if (post.status === "published" || !post.status) {
      postsMap.set(post.slug, post);
    }
  });

  // 3. Add from memory cache
  memoryBlogs.forEach((post, slug) => {
    if (post.status === "published" || !post.status) {
      postsMap.set(slug, post);
    }
  });

  // 3. Fetch from Firebase Firestore collection: BHH-Blogs
  if (db) {
    try {
      const snap = await getDocs(collection(db, "BHH-Blogs"));
      snap.forEach((docSnap) => {
        const data = docSnap.data();
        if (data.status === "published" || !data.status) {
          const slug = data.slug || docSnap.id;
          postsMap.set(slug, {
            id: docSnap.id,
            slug,
            title: data.title || "Untitled Article",
            excerpt: data.excerpt || data.summary || "",
            content: data.content || [],
            image: data.image || data.coverImage || "https://images.unsplash.com/photo-1762955911431-4c44c7c3f408?w=600&auto=format&fit=crop&q=60",
            category: data.category || "Caregiver Tips",
            author: data.author || "Blessed Hearts Care Team",
            readTime: data.readTime || "5 min read",
            date: data.date || data.publishedAt || (data.createdAt?.toDate ? data.createdAt.toDate().toISOString().slice(0, 10) : "2026-09-26"),
            status: data.status || "published",
          });
        }
      });
    } catch (err) {
      console.warn("Firestore BHH-Blogs read note:", err.message);
    }
  }

  const postsArray = Array.from(postsMap.values());

  // Sort descending by date
  postsArray.sort((a, b) => {
    const timeA = new Date(a.date || 0).getTime();
    const timeB = new Date(b.date || 0).getTime();
    return timeB - timeA;
  });

  return postsArray;
}

/**
 * Fetch a single blog post by slug
 */
export async function getBlogBySlug(slug) {
  if (!slug) return null;

  // 1. Try Firestore BHH-Blogs
  if (db) {
    try {
      // First try doc ID = slug
      const docRef = doc(db, "BHH-Blogs", slug);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          slug: data.slug || slug,
          title: data.title,
          excerpt: data.excerpt || data.summary || "",
          content: data.content || [],
          image: data.image || data.coverImage || "https://images.unsplash.com/photo-1762955911431-4c44c7c3f408?w=600&auto=format&fit=crop&q=60",
          category: data.category || "Caregiver Tips",
          author: data.author || "Blessed Hearts Care Team",
          readTime: data.readTime || "5 min read",
          date: data.date || data.publishedAt || (data.createdAt?.toDate ? data.createdAt.toDate().toISOString().slice(0, 10) : "2026-09-26"),
          status: data.status || "published",
        };
      }

      // Query by slug field
      const q = query(collection(db, "BHH-Blogs"), where("slug", "==", slug));
      const querySnap = await getDocs(q);
      if (!querySnap.empty) {
        const firstDoc = querySnap.docs[0];
        const data = firstDoc.data();
        return {
          id: firstDoc.id,
          slug: data.slug || slug,
          title: data.title,
          excerpt: data.excerpt || data.summary || "",
          content: data.content || [],
          image: data.image || data.coverImage || "https://images.unsplash.com/photo-1762955911431-4c44c7c3f408?w=600&auto=format&fit=crop&q=60",
          category: data.category || "Caregiver Tips",
          author: data.author || "Blessed Hearts Care Team",
          readTime: data.readTime || "5 min read",
          date: data.date || data.publishedAt || (data.createdAt?.toDate ? data.createdAt.toDate().toISOString().slice(0, 10) : "2026-09-26"),
          status: data.status || "published",
        };
      }
    } catch (err) {
      console.warn("Firestore single blog query note:", err.message);
    }
  }

  // 2. Try persistent local disk storage
  const diskBlogs = getLocalDiskBlogs();
  if (diskBlogs[slug]) {
    return diskBlogs[slug];
  }

  // 3. Try memory cache
  if (memoryBlogs.has(slug)) {
    return memoryBlogs.get(slug);
  }

  // 4. Fallback to built-in blogPosts in site.js
  const fallback = fallbackPosts.find((p) => p.slug === slug);
  if (fallback) {
    return {
      ...fallback,
      id: fallback.slug,
      status: "published",
      author: fallback.author || "Blessed Hearts Care Team",
      readTime: fallback.readTime || "5 min read",
      category: fallback.category || (fallback.slug.includes("waiver") || fallback.slug.includes("medicaid") ? "Medicaid Waiver" : "Caregiver Tips"),
      date: fallback.date || "2026-06-25",
    };
  }

  return null;
}
