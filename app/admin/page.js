"use client";

import { useState, useEffect, useRef } from "react";
import {
  Lock,
  User,
  Eye,
  EyeOff,
  LogOut,
  RefreshCw,
  Search,
  MessageSquare,
  FileText,
  Clock,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Trash2,
  X,
  ExternalLink,
  Shield,
  Download,
  Key,
  BookOpen,
  Plus,
  Edit3,
  Globe,
  Tag,
  Check,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Quote,
  Heading2,
  Heading3,
  Link as LinkIcon,
  Image as ImageIcon,
  UploadCloud,
  Upload,
  Sparkles,
  Paperclip,
  Minus,
} from "lucide-react";
import styles from "./admin.module.css";

const initialBlogForm = {
  id: "",
  title: "",
  slug: "",
  category: "Caregiver Tips",
  excerpt: "",
  content: "",
  author: "Blessed Hearts Care Team",
  readTime: "5 min read",
  image: "https://images.unsplash.com/photo-1762955911431-4c44c7c3f408?w=600&auto=format&fit=crop&q=60",
  status: "published",
  date: new Date().toISOString().slice(0, 10),
};

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState("");
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Login form state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Dashboard state
  const [inquiries, setInquiries] = useState([]);
  const [isLoadingInquiries, setIsLoadingInquiries] = useState(false);
  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'contact_form' | 'chatbot' | 'blogs' | 'credentials'
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  // Blogs CRUD state
  const [blogs, setBlogs] = useState([]);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(false);
  const [blogFilter, setBlogFilter] = useState("all"); // 'all' | 'published' | 'draft'
  const [blogSearchQuery, setBlogSearchQuery] = useState("");
  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [autoSlug, setAutoSlug] = useState(true);
  const [isSavingBlog, setIsSavingBlog] = useState(false);
  const [blogFeedback, setBlogFeedback] = useState({ type: "", msg: "" });
  const [blogForm, setBlogForm] = useState(initialBlogForm);

  // Dual-mode Image attachment & Rich Text Editor state
  const [coverSourceType, setCoverSourceType] = useState("upload"); // 'upload' | 'url'
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [coverUploadError, setCoverUploadError] = useState("");
  const [localCoverFileName, setLocalCoverFileName] = useState("");
  const [editorMode, setEditorMode] = useState("edit"); // 'edit' | 'preview'
  const [isUploadingInline, setIsUploadingInline] = useState(false);

  const coverFileInputRef = useRef(null);
  const inlineFileInputRef = useRef(null);
  const contentTextareaRef = useRef(null);

  // Change credentials state
  const [credForm, setCredForm] = useState({
    currentPassword: "",
    newUsername: "",
    newPassword: "",
  });
  const [credStatus, setCredStatus] = useState({ type: "", msg: "" });
  const [isUpdatingCreds, setIsUpdatingCreds] = useState(false);

  // 1. Check Authentication on Mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/me");
        const data = await res.json();
        if (data.authenticated) {
          setIsAuthenticated(true);
          setAdminUser(data.username);
        }
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setIsCheckingAuth(false);
      }
    }
    checkAuth();
  }, []);

  // 2. Fetch Data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchInquiries();
      fetchBlogs();
    }
  }, [isAuthenticated]);

  const fetchInquiries = async () => {
    setIsLoadingInquiries(true);
    try {
      const res = await fetch("/api/admin/inquiries");
      const data = await res.json();
      if (data.success) {
        setInquiries(data.inquiries || []);
      }
    } catch (err) {
      console.error("Failed to load inquiries:", err);
    } finally {
      setIsLoadingInquiries(false);
    }
  };

  const fetchBlogs = async () => {
    setIsLoadingBlogs(true);
    try {
      const res = await fetch("/api/admin/blogs");
      const data = await res.json();
      if (data.success) {
        setBlogs(data.blogs || []);
      }
    } catch (err) {
      console.error("Failed to load blogs:", err);
    } finally {
      setIsLoadingBlogs(false);
    }
  };

  // 3. Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
        setIsAuthenticated(true);
        setAdminUser(data.username);
        setUsername("");
        setPassword("");
      } else {
        setLoginError(data.error || "Invalid username or password.");
      }
    } catch (err) {
      setLoginError("Network connection error. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  // 4. Handle Logout
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch (e) {}
    setIsAuthenticated(false);
    setAdminUser("");
    setInquiries([]);
    setSelectedInquiry(null);
  };

  // 5. Update Status
  const handleStatusChange = async (id, type, newStatus) => {
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, type, status: newStatus }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry((prev) => ({ ...prev, status: newStatus }));
        }
      }
    } catch (e) {
      console.error("Error updating status:", e);
    }
  };

  // 6. Delete Inquiry
  const handleDeleteInquiry = async (id, type) => {
    if (!confirm("Are you sure you want to delete this inquiry record?")) return;

    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, type }),
      });
      if (res.ok) {
        setInquiries((prev) => prev.filter((item) => item.id !== id));
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry(null);
        }
      }
    } catch (e) {
      console.error("Error deleting inquiry:", e);
    }
  };

  // 7. Update Admin Credentials
  const handleUpdateCredentials = async (e) => {
    e.preventDefault();
    setCredStatus({ type: "", msg: "" });
    setIsUpdatingCreds(true);

    try {
      const res = await fetch("/api/admin/credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credForm),
      });
      const data = await res.json();

      if (data.success) {
        setCredStatus({ type: "success", msg: data.message });
        setAdminUser(credForm.newUsername);
        setCredForm({ currentPassword: "", newUsername: "", newPassword: "" });
      } else {
        setCredStatus({ type: "error", msg: data.error });
      }
    } catch (err) {
      setCredStatus({ type: "error", msg: "Failed to update credentials." });
    } finally {
      setIsUpdatingCreds(false);
    }
  };

  // 8. CSV Export
  const handleExportCSV = () => {
    if (!inquiries.length) return;

    const headers = ["Type", "Name", "Phone", "Email", "City", "County", "Service", "Status", "Date", "Notes"];
    const rows = filteredInquiries.map((i) => [
      i.sourceType,
      `"${(i.fullName || "").replace(/"/g, '""')}"`,
      `"${(i.phone || "").replace(/"/g, '""')}"`,
      `"${(i.email || "").replace(/"/g, '""')}"`,
      `"${(i.city || "").replace(/"/g, '""')}"`,
      `"${(i.county || "").replace(/"/g, '""')}"`,
      `"${(i.serviceRequested || "").replace(/"/g, '""')}"`,
      i.status,
      i.createdAt ? new Date(i.createdAt).toLocaleString() : "",
      `"${(i.notes || i.message || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `BHH_Inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered inquiries calculation
  const filteredInquiries = inquiries.filter((item) => {
    // Tab filter
    if (activeTab === "contact_form" && item.type !== "contact_form") return false;
    if (activeTab === "chatbot" && item.type !== "chatbot") return false;

    // Status filter
    if (statusFilter !== "all" && item.status !== statusFilter) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        item.fullName?.toLowerCase().includes(q) ||
        item.phone?.toLowerCase().includes(q) ||
        item.email?.toLowerCase().includes(q) ||
        item.city?.toLowerCase().includes(q) ||
        item.county?.toLowerCase().includes(q) ||
        item.serviceRequested?.toLowerCase().includes(q) ||
        item.notes?.toLowerCase().includes(q);
      if (!match) return false;
    }

    return true;
  });

  const totalCount = inquiries.length;
  const contactFormCount = inquiries.filter((i) => i.type === "contact_form").length;
  const chatbotCount = inquiries.filter((i) => i.type === "chatbot").length;
  const newCount = inquiries.filter((i) => i.status === "new").length;

  // 9. Blog Management Handlers
  const handleOpenCreateBlog = () => {
    setEditingBlog(null);
    setBlogForm({
      ...initialBlogForm,
      date: new Date().toISOString().slice(0, 10),
    });
    setAutoSlug(true);
    setBlogFeedback({ type: "", msg: "" });
    setCoverSourceType("upload");
    setCoverUploadError("");
    setLocalCoverFileName("");
    setEditorMode("edit");
    setBlogModalOpen(true);
  };

  const handleOpenEditBlog = (b) => {
    setEditingBlog(b);
    const isLocalUpload = b.image && b.image.startsWith("/uploads/");
    setBlogForm({
      id: b.id || b.slug,
      title: b.title || "",
      slug: b.slug || "",
      category: b.category || "Caregiver Tips",
      excerpt: b.excerpt || "",
      content: Array.isArray(b.content) ? b.content.join("\n\n") : b.content || "",
      author: b.author || "Blessed Hearts Care Team",
      readTime: b.readTime || "5 min read",
      image: b.image || "https://images.unsplash.com/photo-1762955911431-4c44c7c3f408?w=600&auto=format&fit=crop&q=60",
      status: b.status || "published",
      date: b.date || new Date().toISOString().slice(0, 10),
    });
    setAutoSlug(false);
    setBlogFeedback({ type: "", msg: "" });
    setCoverSourceType(isLocalUpload ? "upload" : "url");
    setCoverUploadError("");
    setLocalCoverFileName(isLocalUpload ? b.image.split("/").pop() : "");
    setEditorMode("edit");
    setBlogModalOpen(true);
  };

  const handleBlogTitleChange = (val) => {
    if (autoSlug) {
      const generated = val
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-");
      setBlogForm((prev) => ({ ...prev, title: val, slug: generated }));
    } else {
      setBlogForm((prev) => ({ ...prev, title: val }));
    }
  };

  // Upload local image (cover or inline)
  const handleUploadImageFile = async (file, target = "cover") => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file (PNG, JPG, WEBP, GIF, SVG).");
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      alert("Image is too large. Maximum supported size is 8MB.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    if (target === "cover") {
      setIsUploadingCover(true);
      setCoverUploadError("");
    } else {
      setIsUploadingInline(true);
    }

    try {
      const res = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Upload failed");
      }

      if (target === "cover") {
        setBlogForm((prev) => ({ ...prev, image: data.url }));
        setLocalCoverFileName(data.fileName);
      } else if (target === "inline") {
        insertInlineImage(data.url, file.name);
      }
    } catch (err) {
      console.error("Image upload error:", err);
      if (target === "cover") {
        setCoverUploadError(err.message || "Failed to upload image.");
      } else {
        alert("Failed to insert image: " + err.message);
      }
    } finally {
      if (target === "cover") {
        setIsUploadingCover(false);
      } else {
        setIsUploadingInline(false);
      }
    }
  };

  // Helper to insert formatting or wrap selected text in the content textarea
  const insertFormatting = (tagType) => {
    const textarea = contentTextareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentVal = blogForm.content || "";
    const selectedText = currentVal.substring(start, end);

    let replacement = "";
    let cursorOffset = 0;

    switch (tagType) {
      case "h2":
        replacement = `<h2>${selectedText || "Subheading Title"}</h2>\n`;
        cursorOffset = selectedText ? replacement.length : 4;
        break;
      case "h3":
        replacement = `<h3>${selectedText || "Section Heading"}</h3>\n`;
        cursorOffset = selectedText ? replacement.length : 4;
        break;
      case "bold":
        replacement = `<strong>${selectedText || "bold text"}</strong>`;
        cursorOffset = selectedText ? replacement.length : 8;
        break;
      case "italic":
        replacement = `<em>${selectedText || "italicized text"}</em>`;
        cursorOffset = selectedText ? replacement.length : 4;
        break;
      case "underline":
        replacement = `<u>${selectedText || "underlined text"}</u>`;
        cursorOffset = selectedText ? replacement.length : 3;
        break;
      case "ul":
        if (selectedText) {
          const items = selectedText
            .split("\n")
            .filter((l) => l.trim())
            .map((l) => `  <li>${l.replace(/^[-*•]\s*/, "")}</li>`)
            .join("\n");
          replacement = `<ul>\n${items}\n</ul>\n`;
        } else {
          replacement = `<ul>\n  <li>First point</li>\n  <li>Second point</li>\n  <li>Third point</li>\n</ul>\n`;
        }
        cursorOffset = replacement.length;
        break;
      case "ol":
        if (selectedText) {
          const items = selectedText
            .split("\n")
            .filter((l) => l.trim())
            .map((l) => `  <li>${l.replace(/^\d+[\.\)]\s*/, "")}</li>`)
            .join("\n");
          replacement = `<ol>\n${items}\n</ol>\n`;
        } else {
          replacement = `<ol>\n  <li>Step one</li>\n  <li>Step two</li>\n  <li>Step three</li>\n</ol>\n`;
        }
        cursorOffset = replacement.length;
        break;
      case "quote":
        replacement = `<blockquote>\n  ${selectedText || "Compassionate care is at the heart of everything we do."}\n</blockquote>\n`;
        cursorOffset = replacement.length;
        break;
      case "link": {
        const url = prompt("Enter link URL (e.g. https://example.com):", "https://");
        if (!url || url === "https://") return;
        replacement = `<a href="${url}" target="_blank" rel="noopener noreferrer">${selectedText || "Learn more"}</a>`;
        cursorOffset = replacement.length;
        break;
      }
      case "hr":
        replacement = `\n<hr />\n\n`;
        cursorOffset = replacement.length;
        break;
      default:
        return;
    }

    const newVal = currentVal.substring(0, start) + replacement + currentVal.substring(end);
    setBlogForm((prev) => ({ ...prev, content: newVal }));

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + cursorOffset, start + cursorOffset);
    }, 10);
  };

  const insertInlineImage = (url, altText = "Article illustration") => {
    const textarea = contentTextareaRef.current;
    const cleanAlt = altText.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
    const imgHtml = `\n<img src="${url}" alt="${cleanAlt}" />\n`;

    if (!textarea) {
      setBlogForm((prev) => ({ ...prev, content: (prev.content || "") + imgHtml }));
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentVal = blogForm.content || "";
    const newVal = currentVal.substring(0, start) + imgHtml + currentVal.substring(end);
    setBlogForm((prev) => ({ ...prev, content: newVal }));

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + imgHtml.length, start + imgHtml.length);
    }, 10);
  };

  const handlePromptInlineImageUrl = () => {
    const url = prompt("Enter image URL (e.g. https://images.unsplash.com/...):", "https://");
    if (url && url !== "https://") {
      insertInlineImage(url, "Illustration");
    }
  };

  // Auto calculate read time based on word count
  const handleAutoCalcReadTime = () => {
    const textOnly = (blogForm.content || "").replace(/<[^>]*>/g, " ");
    const words = textOnly.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    setBlogForm((prev) => ({ ...prev, readTime: `${minutes} min read` }));
  };

  const handleSaveBlog = async (e) => {
    e.preventDefault();
    if (!blogForm.title.trim() || !blogForm.content.trim()) {
      setBlogFeedback({ type: "error", msg: "Please provide both an article title and content." });
      return;
    }

    setIsSavingBlog(true);
    setBlogFeedback({ type: "", msg: "" });

    try {
      const method = editingBlog ? "PUT" : "POST";
      const payload = {
        ...blogForm,
        id: editingBlog ? (editingBlog.id || editingBlog.slug) : blogForm.slug,
      };

      const res = await fetch("/api/admin/blogs", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setBlogFeedback({
          type: "success",
          msg: editingBlog
            ? "Blog article updated successfully in BHH-Blogs!"
            : "New blog article published successfully into BHH-Blogs!",
        });
        await fetchBlogs();
        setTimeout(() => {
          setBlogModalOpen(false);
        }, 1200);
      } else {
        setBlogFeedback({ type: "error", msg: data.error || "Failed to save blog post." });
      }
    } catch (err) {
      setBlogFeedback({ type: "error", msg: "Network error saving blog." });
    } finally {
      setIsSavingBlog(false);
    }
  };

  const handleToggleBlogStatus = async (b) => {
    const newStatus = b.status === "draft" ? "published" : "draft";
    try {
      const res = await fetch("/api/admin/blogs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: b.id || b.slug,
          slug: b.slug,
          title: b.title,
          excerpt: b.excerpt,
          content: b.content,
          category: b.category,
          author: b.author,
          readTime: b.readTime,
          image: b.image,
          date: b.date,
          status: newStatus,
        }),
      });
      if (res.ok) {
        setBlogs((prev) =>
          prev.map((item) => (item.id === b.id || item.slug === b.slug ? { ...item, status: newStatus } : item))
        );
      }
    } catch (err) {
      console.error("Error toggling blog status:", err);
    }
  };

  const handleDeleteBlog = async (id, title) => {
    if (!confirm(`Are you sure you want to permanently delete "${title}" from BHH-Blogs?`)) return;

    try {
      const res = await fetch("/api/admin/blogs", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setBlogs((prev) => prev.filter((item) => item.id !== id && item.slug !== id));
      } else {
        alert(data.error || "Failed to delete blog.");
      }
    } catch (err) {
      console.error("Error deleting blog:", err);
      alert("Error deleting blog.");
    }
  };

  // Blog filtering & counts
  const filteredBlogs = blogs.filter((b) => {
    if (blogFilter !== "all" && b.status !== blogFilter) return false;
    if (blogSearchQuery.trim()) {
      const q = blogSearchQuery.toLowerCase();
      const match =
        b.title?.toLowerCase().includes(q) ||
        b.category?.toLowerCase().includes(q) ||
        b.excerpt?.toLowerCase().includes(q) ||
        b.slug?.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const publishedBlogCount = blogs.filter((b) => b.status === "published" || !b.status).length;
  const draftBlogCount = blogs.filter((b) => b.status === "draft").length;

  if (isCheckingAuth) {
    return (
      <div className={styles.loginContainer}>
        <div style={{ textAlign: "center", color: "#5a1a5e", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.85rem" }}>
          <RefreshCw size={28} className="animate-spin" />
          <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>Verifying administrator session...</div>
        </div>
      </div>
    );
  }

  // ========================================================
  // RENDER: LOGIN SCREEN (If not authenticated)
  // ========================================================
  if (!isAuthenticated) {
    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <div className={styles.loginHeader}>
            <div className={styles.loginBadge}>
              <Shield size={13} />
              <span>Restricted Access</span>
            </div>
            <h1 className={styles.loginTitle}>Care Administration</h1>
            <p className={styles.loginSubtitle}>
              Blessed Hearts Homecare Inquiries Portal
            </p>
          </div>

          {loginError && (
            <div className={`${styles.alertBox} ${styles.alertError}`}>
              <AlertCircle size={16} />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className={styles.loginForm}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="admin-user">
                Administrator Username or Email
              </label>
              <div className={styles.inputWrap}>
                <User size={16} className={styles.inputIcon} />
                <input
                  id="admin-user"
                  type="text"
                  placeholder="admin@blessedheartshca.com"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={styles.input}
                  required
                  autoFocus
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="admin-pass">
                Password
              </label>
              <div className={styles.inputWrap}>
                <Lock size={16} className={styles.inputIcon} />
                <input
                  id="admin-pass"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter administrator password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                  required
                />
                <button
                  type="button"
                  className={styles.togglePassBtn}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className={styles.loginSubmitBtn}
            >
              {isLoggingIn ? "Verifying Credentials..." : "Sign In to Portal"}
            </button>
          </form>

          <div style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "0.78rem", color: "#a0aec0" }}>
            🔒 Stored securely in database collection <strong>BHH-Admin-panel-pass</strong>
          </div>
        </div>
      </div>
    );
  }

  // ========================================================
  // RENDER: AUTHENTICATED ADMIN DASHBOARD
  // ========================================================
  return (
    <div className={styles.adminPage}>
      {/* Top Navbar */}
      <header className={styles.navBar}>
        <div className={styles.navBrand}>
          <div className={styles.navLogoCircle}>BHH</div>
          <div>
            <h1 className={styles.navTitle}>Blessed Hearts Administration</h1>
            <p className={styles.navSub}>Contact &amp; Chatbot Inquiries Management</p>
          </div>
        </div>

        <div className={styles.navRight}>
          <div className={styles.userBadge}>
            <Shield size={14} color="#ff2d7a" />
            <span>{adminUser}</span>
          </div>

          <button
            onClick={() => {
              fetchInquiries();
              fetchBlogs();
            }}
            className={styles.iconBtn}
            title="Refresh All Records"
          >
            <RefreshCw size={14} className={isLoadingInquiries || isLoadingBlogs ? "animate-spin" : ""} />
            <span>Refresh</span>
          </button>

          <button onClick={handleLogout} className={styles.logoutBtn} title="Sign Out">
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className={styles.mainContainer}>
        {/* Metric Cards Row */}
        {activeTab === "blogs" ? (
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIconWrap} style={{ background: "#fdf2f4", color: "#ff2d7a" }}>
                <BookOpen size={22} />
              </div>
              <div>
                <div className={styles.statNumber}>{blogs.length}</div>
                <div className={styles.statLabel}>Total Blog Articles</div>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIconWrap} style={{ background: "#ecfdf5", color: "#047857" }}>
                <Check size={22} />
              </div>
              <div>
                <div className={styles.statNumber}>{publishedBlogCount}</div>
                <div className={styles.statLabel}>Published Live</div>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIconWrap} style={{ background: "#fffbeb", color: "#d97706" }}>
                <Edit3 size={22} />
              </div>
              <div>
                <div className={styles.statNumber}>{draftBlogCount}</div>
                <div className={styles.statLabel}>Draft Posts</div>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIconWrap} style={{ background: "#eff6ff", color: "#1d4ed8" }}>
                <Tag size={22} />
              </div>
              <div>
                <div className={styles.statNumber}>
                  {new Set(blogs.map((b) => b.category || "General")).size}
                </div>
                <div className={styles.statLabel}>Categories</div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIconWrap} style={{ background: "#fdf2f4", color: "#ff2d7a" }}>
                <FileText size={22} />
              </div>
              <div>
                <div className={styles.statNumber}>{totalCount}</div>
                <div className={styles.statLabel}>Total Inquiries</div>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIconWrap} style={{ background: "#ecfdf5", color: "#047857" }}>
                <Clock size={22} />
              </div>
              <div>
                <div className={styles.statNumber}>{newCount}</div>
                <div className={styles.statLabel}>New / Pending Leads</div>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIconWrap} style={{ background: "#fff1f2", color: "#e11d48" }}>
                <FileText size={22} />
              </div>
              <div>
                <div className={styles.statNumber}>{contactFormCount}</div>
                <div className={styles.statLabel}>Contact Form (BHH_inquiries)</div>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIconWrap} style={{ background: "#eff6ff", color: "#1d4ed8" }}>
                <MessageSquare size={22} />
              </div>
              <div>
                <div className={styles.statNumber}>{chatbotCount}</div>
                <div className={styles.statLabel}>Chatbot (BHH-chatbot-inquiries)</div>
              </div>
            </div>
          </div>
        )}

        {/* Toolbar & Tabs Card */}
        <div className={styles.toolbarCard}>
          <div className={styles.tabsRow}>
            <button
              className={`${styles.tabBtn} ${activeTab === "all" ? styles.tabBtnActive : ""}`}
              onClick={() => setActiveTab("all")}
            >
              <span>All Inquiries</span>
              <span className={styles.tabCount}>{totalCount}</span>
            </button>

            <button
              className={`${styles.tabBtn} ${activeTab === "contact_form" ? styles.tabBtnActive : ""}`}
              onClick={() => setActiveTab("contact_form")}
            >
              <FileText size={14} />
              <span>Contact Form Leads</span>
              <span className={styles.tabCount}>{contactFormCount}</span>
            </button>

            <button
              className={`${styles.tabBtn} ${activeTab === "chatbot" ? styles.tabBtnActive : ""}`}
              onClick={() => setActiveTab("chatbot")}
            >
              <MessageSquare size={14} />
              <span>Chatbot Inquiries</span>
              <span className={styles.tabCount}>{chatbotCount}</span>
            </button>

            <button
              className={`${styles.tabBtn} ${activeTab === "blogs" ? styles.tabBtnActive : ""}`}
              onClick={() => setActiveTab("blogs")}
            >
              <BookOpen size={14} />
              <span>Blogs (BHH-Blogs)</span>
              <span className={styles.tabCount}>{blogs.length}</span>
            </button>

            <button
              className={`${styles.tabBtn} ${activeTab === "credentials" ? styles.tabBtnActive : ""}`}
              onClick={() => setActiveTab("credentials")}
            >
              <Key size={14} />
              <span>Admin Credentials</span>
            </button>
          </div>

          {activeTab !== "credentials" && activeTab !== "blogs" && (
            <div className={styles.filterRow}>
              <div className={styles.searchWrap}>
                <Search size={16} className={styles.inputIcon} />
                <input
                  type="text"
                  placeholder="Search by name, phone, email, service, city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
              </div>

              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className={styles.selectInput}
                >
                  <option value="all">All Statuses</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="closed">Closed</option>
                </select>

                <button
                  onClick={handleExportCSV}
                  className={styles.iconBtn}
                  title="Export filtered inquiries to CSV"
                >
                  <Download size={14} />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================
            TAB: CREDENTIALS SETTINGS
            ======================================================== */}
        {activeTab === "credentials" ? (
          <div className={styles.settingsCard}>
            <h2 className={styles.settingsTitle}>Update Admin Credentials</h2>
            <p className={styles.settingsDesc}>
              These credentials are encrypted and stored in your Firebase collection{" "}
              <strong>BHH-Admin-panel-pass</strong> under the document <code>admin_credentials</code>.
            </p>

            {credStatus.msg && (
              <div
                className={`${styles.alertBox} ${
                  credStatus.type === "success" ? styles.alertSuccess : styles.alertError
                }`}
              >
                {credStatus.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                <span>{credStatus.msg}</span>
              </div>
            )}

            <form onSubmit={handleUpdateCredentials} className={styles.loginForm}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Current Admin Password</label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  value={credForm.currentPassword}
                  onChange={(e) => setCredForm({ ...credForm, currentPassword: e.target.value })}
                  className={styles.input}
                  style={{ paddingLeft: "1rem" }}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>New Username / Email</label>
                <input
                  type="text"
                  placeholder="e.g. admin@blessedheartshca.com"
                  value={credForm.newUsername}
                  onChange={(e) => setCredForm({ ...credForm, newUsername: e.target.value })}
                  className={styles.input}
                  style={{ paddingLeft: "1rem" }}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>New Password (Minimum 8 characters)</label>
                <input
                  type="password"
                  placeholder="Enter strong new password"
                  value={credForm.newPassword}
                  onChange={(e) => setCredForm({ ...credForm, newPassword: e.target.value })}
                  className={styles.input}
                  style={{ paddingLeft: "1rem" }}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isUpdatingCreds}
                className={styles.loginSubmitBtn}
                style={{ width: "fit-content", padding: "0.75rem 1.5rem" }}
              >
                {isUpdatingCreds ? "Saving to Database..." : "Save New Credentials"}
              </button>
            </form>
          </div>
        ) : activeTab === "blogs" ? (
          /* ========================================================
             TAB: BLOG MANAGEMENT (BHH-Blogs CRUD)
             ======================================================== */
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div className={styles.blogHeaderRow}>
              <div className={styles.blogHeaderInfo}>
                <h2>Blog &amp; Knowledge Base Articles</h2>
                <p>Manage, edit, publish, and delete articles directly stored in the <strong>BHH-Blogs</strong> database collection.</p>
              </div>
              <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
                <a
                  href="/blogs"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.viewDetailBtn}
                  style={{
                    textDecoration: "none",
                    background: "#f1f5f9",
                    color: "#334155",
                    padding: "0.55rem 0.95rem",
                    borderRadius: "0.65rem",
                    fontSize: "0.85rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    fontWeight: 600,
                  }}
                  title="Open live /blogs collection page in new tab"
                >
                  <Globe size={15} />
                  <span>View Public /blogs</span>
                </a>
                <button
                  onClick={handleOpenCreateBlog}
                  className={styles.createBlogBtn}
                >
                  <Plus size={16} />
                  <span>Publish New Blog</span>
                </button>
              </div>
            </div>

            {/* Filter & Search Bar for Blogs */}
            <div className={styles.filterRow} style={{ marginTop: 0, padding: 0 }}>
              <div className={styles.searchWrap}>
                <Search size={16} className={styles.inputIcon} />
                <input
                  type="text"
                  placeholder="Search articles by title, category, slug, or content..."
                  value={blogSearchQuery}
                  onChange={(e) => setBlogSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
              </div>

              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <select
                  value={blogFilter}
                  onChange={(e) => setBlogFilter(e.target.value)}
                  className={styles.selectInput}
                >
                  <option value="all">All Articles ({blogs.length})</option>
                  <option value="published">Published ({publishedBlogCount})</option>
                  <option value="draft">Drafts ({draftBlogCount})</option>
                </select>
              </div>
            </div>

            {/* Blog Cards Grid */}
            {filteredBlogs.length === 0 ? (
              <div className={styles.emptyState}>
                <BookOpen size={38} strokeWidth={1.5} />
                <h3 className={styles.emptyStateTitle}>No blog articles found</h3>
                <p style={{ margin: "0.5rem 0 1.25rem 0", fontSize: "0.88rem" }}>
                  {blogSearchQuery || blogFilter !== "all"
                    ? "No articles match your search or filter."
                    : "No blogs have been published yet. Click below to publish your first article into BHH-Blogs!"}
                </p>
                <button
                  onClick={handleOpenCreateBlog}
                  className={styles.createBlogBtn}
                  style={{ margin: "0 auto" }}
                >
                  <Plus size={16} /> Publish New Blog
                </button>
              </div>
            ) : (
              <div className={styles.blogGridCards}>
                {filteredBlogs.map((b) => (
                  <article key={b.id || b.slug} className={styles.blogAdminCard}>
                    <div className={styles.blogCardCover}>
                      <img
                        src={b.image || "https://images.unsplash.com/photo-1762955911431-4c44c7c3f408?w=600&auto=format&fit=crop&q=60"}
                        alt={b.title}
                        className={styles.blogCardCoverImg}
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1762955911431-4c44c7c3f408?w=600&auto=format&fit=crop&q=60";
                        }}
                      />
                      <div className={styles.blogCardBadgeRow}>
                        <span className={styles.blogCardCategory}>{b.category || "General"}</span>
                        <span
                          className={
                            b.status === "draft"
                              ? styles.blogCardStatusDraft
                              : styles.blogCardStatusPublished
                          }
                        >
                          ● {b.status === "draft" ? "Draft" : "Published"}
                        </span>
                      </div>
                    </div>

                    <div className={styles.blogCardBody}>
                      <h3 className={styles.blogCardTitle}>{b.title}</h3>
                      <div className={styles.blogCardSlug}>/blog/{b.slug}</div>
                      <p className={styles.blogCardExcerpt}>{b.excerpt}</p>

                      <div className={styles.blogCardMeta}>
                        <span>{b.date || "Recent"}</span>
                        <span>•</span>
                        <span>{b.readTime || "5 min read"}</span>
                        <span>•</span>
                        <span>{b.author || "Care Team"}</span>
                      </div>
                    </div>

                    <div className={styles.blogCardActions}>
                      <div style={{ display: "flex", gap: "0.4rem" }}>
                        <button
                          onClick={() => handleToggleBlogStatus(b)}
                          className={styles.statusToggleBtn}
                          title={b.status === "draft" ? "Click to Publish Live" : "Click to Unpublish / Draft"}
                        >
                          {b.status === "draft" ? "Publish" : "Draft"}
                        </button>

                        <a
                          href={`/blog/${b.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className={styles.viewDetailBtn}
                          style={{ background: "#f1f5f9", color: "#334155", textDecoration: "none" }}
                          title="View live post on website"
                        >
                          <ExternalLink size={12} /> Live
                        </a>
                      </div>

                      <div style={{ display: "flex", gap: "0.3rem" }}>
                        <button
                          onClick={() => handleOpenEditBlog(b)}
                          className={styles.viewDetailBtn}
                          title="Edit blog post content"
                        >
                          <Edit3 size={13} /> Edit
                        </button>

                        <button
                          onClick={() => handleDeleteBlog(b.id || b.slug, b.title)}
                          className={styles.deleteBtn}
                          title="Delete blog post"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* ========================================================
             TAB: INQUIRIES DATA TABLE
             ======================================================== */
          <div className={styles.tableContainer}>
            {filteredInquiries.length === 0 ? (
              <div className={styles.emptyState}>
                <FileText size={38} strokeWidth={1.5} />
                <h3 className={styles.emptyStateTitle}>No inquiries found</h3>
                <p style={{ margin: 0, fontSize: "0.88rem" }}>
                  {searchQuery || statusFilter !== "all"
                    ? "Try adjusting your search or status filter."
                    : "When visitors submit contact forms or chat with the care bot, their inquiries will appear here in real-time."}
                </p>
              </div>
            ) : (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Source</th>
                    <th>Name</th>
                    <th>Contact Info</th>
                    <th>Service Needed</th>
                    <th>Location</th>
                    <th>Date &amp; Time</th>
                    <th>Status</th>
                    <th style={{ textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInquiries.map((inq) => (
                    <tr key={`${inq.type}-${inq.id}`}>
                      {/* Source */}
                      <td>
                        <span
                          className={`${styles.badge} ${
                            inq.type === "chatbot" ? styles.badgeChatbot : styles.badgeContactForm
                          }`}
                        >
                          {inq.type === "chatbot" ? (
                            <>
                              <MessageSquare size={11} /> Chatbot
                            </>
                          ) : (
                            <>
                              <FileText size={11} /> Contact Form
                            </>
                          )}
                        </span>
                      </td>

                      {/* Name */}
                      <td style={{ fontWeight: 600 }}>{inq.fullName}</td>

                      {/* Contact */}
                      <td>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                          {inq.phone && (
                            <a href={`tel:${inq.phone}`} className={styles.contactLink}>
                              <Phone size={12} color="#ff2d7a" />
                              <span>{inq.phone}</span>
                            </a>
                          )}
                          {inq.email && (
                            <a href={`mailto:${inq.email}`} className={styles.contactLink}>
                              <Mail size={12} color="#5a1a5e" />
                              <span>{inq.email}</span>
                            </a>
                          )}
                        </div>
                      </td>

                      {/* Service */}
                      <td>
                        <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "#4a5568" }}>
                          {inq.serviceRequested}
                        </span>
                      </td>

                      {/* Location */}
                      <td>
                        <span style={{ fontSize: "0.85rem", color: "#718096" }}>
                          {[inq.city, inq.county, inq.zip].filter(Boolean).join(", ") || "—"}
                        </span>
                      </td>

                      {/* Date */}
                      <td>
                        <span style={{ fontSize: "0.82rem", color: "#718096" }}>
                          {inq.createdAt
                            ? new Date(inq.createdAt).toLocaleDateString([], {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "Recent"}
                        </span>
                      </td>

                      {/* Status */}
                      <td>
                        <select
                          value={inq.status}
                          onChange={(e) => handleStatusChange(inq.id, inq.type, e.target.value)}
                          className={styles.selectInput}
                          style={{
                            padding: "0.3rem 0.5rem",
                            fontSize: "0.78rem",
                            fontWeight: 700,
                            borderColor:
                              inq.status === "new"
                                ? "#a7f3d0"
                                : inq.status === "contacted"
                                ? "#fde68a"
                                : "#e5e7eb",
                            background:
                              inq.status === "new"
                                ? "#ecfdf5"
                                : inq.status === "contacted"
                                ? "#fffbeb"
                                : "#f3f4f6",
                            color:
                              inq.status === "new"
                                ? "#047857"
                                : inq.status === "contacted"
                                ? "#b45309"
                                : "#4b5563",
                          }}
                        >
                          <option value="new">● New</option>
                          <option value="contacted">● Contacted</option>
                          <option value="closed">● Closed</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                        <button
                          onClick={() => setSelectedInquiry(inq)}
                          className={styles.viewDetailBtn}
                          title="View Full Inquiry Details"
                        >
                          <span>Details</span>
                        </button>

                        <button
                          onClick={() => handleDeleteInquiry(inq.id, inq.type)}
                          className={styles.deleteBtn}
                          title="Delete Record"
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </main>

      {/* ========================================================
          MODAL: INQUIRY DETAILS & CHAT TRANSCRIPT
          ======================================================== */}
      {selectedInquiry && (
        <div className={styles.modalOverlay} onClick={() => setSelectedInquiry(null)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                {selectedInquiry.type === "chatbot" ? (
                  <MessageSquare size={18} />
                ) : (
                  <FileText size={18} />
                )}
                <h3 className={styles.modalTitle}>
                  {selectedInquiry.sourceType} Details
                </h3>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className={styles.modalCloseBtn}
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>

            <div className={styles.modalBody}>
              {/* Client Info Grid */}
              <div className={styles.infoGrid}>
                <div>
                  <div className={styles.infoItemLabel}>Client Name</div>
                  <div className={styles.infoItemValue}>{selectedInquiry.fullName}</div>
                </div>

                <div>
                  <div className={styles.infoItemLabel}>Service Needed</div>
                  <div className={styles.infoItemValue}>{selectedInquiry.serviceRequested}</div>
                </div>

                <div>
                  <div className={styles.infoItemLabel}>Phone Number</div>
                  <div className={styles.infoItemValue}>
                    {selectedInquiry.phone ? (
                      <a href={`tel:${selectedInquiry.phone}`} style={{ color: "#ff2d7a", textDecoration: "none" }}>
                        {selectedInquiry.phone}
                      </a>
                    ) : (
                      "Not provided"
                    )}
                  </div>
                </div>

                <div>
                  <div className={styles.infoItemLabel}>Email Address</div>
                  <div className={styles.infoItemValue}>
                    {selectedInquiry.email ? (
                      <a href={`mailto:${selectedInquiry.email}`} style={{ color: "#5a1a5e", textDecoration: "none" }}>
                        {selectedInquiry.email}
                      </a>
                    ) : (
                      "Not provided"
                    )}
                  </div>
                </div>

                <div>
                  <div className={styles.infoItemLabel}>Location</div>
                  <div className={styles.infoItemValue}>
                    {[selectedInquiry.city, selectedInquiry.county, selectedInquiry.zip].filter(Boolean).join(", ") || "N/A"}
                  </div>
                </div>

                <div>
                  <div className={styles.infoItemLabel}>Submitted At</div>
                  <div className={styles.infoItemValue}>
                    {selectedInquiry.createdAt ? new Date(selectedInquiry.createdAt).toLocaleString() : "Recent"}
                  </div>
                </div>
              </div>

              {/* Message / Care Notes */}
              {(selectedInquiry.notes || selectedInquiry.message) && (
                <div>
                  <div className={styles.infoItemLabel} style={{ marginBottom: "0.35rem" }}>
                    Inquiry Message / Family Notes
                  </div>
                  <div className={styles.messageBox}>
                    {selectedInquiry.notes || selectedInquiry.message}
                  </div>
                </div>
              )}

              {/* If Chatbot lead: Show Interactive Chat Transcript */}
              {selectedInquiry.type === "chatbot" && selectedInquiry.chatTranscript?.length > 0 && (
                <div className={styles.transcriptContainer}>
                  <div className={styles.transcriptHeader}>
                    <MessageSquare size={14} color="#ff2d7a" />
                    <span>Interactive Chatbot Transcript Leading to Consultation</span>
                  </div>
                  <div className={styles.transcriptBody}>
                    {selectedInquiry.chatTranscript.map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className={
                          m.sender === "user" ? styles.transcriptMsgUser : styles.transcriptMsgBot
                        }
                      >
                        <div style={{ fontSize: "0.72rem", opacity: 0.8, marginBottom: "0.15rem" }}>
                          {m.sender === "user" ? "Visitor" : "Care Bot"}
                        </div>
                        <div>{m.text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className={styles.modalFooter}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span style={{ fontSize: "0.82rem", fontWeight: 600 }}>Update Status:</span>
                <select
                  value={selectedInquiry.status}
                  onChange={(e) =>
                    handleStatusChange(selectedInquiry.id, selectedInquiry.type, e.target.value)
                  }
                  className={styles.selectInput}
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div style={{ display: "flex", gap: "0.5rem" }}>
                {selectedInquiry.phone && (
                  <a
                    href={`tel:${selectedInquiry.phone}`}
                    className={styles.viewDetailBtn}
                    style={{ background: "#ff2d7a", textDecoration: "none" }}
                  >
                    <Phone size={13} /> Call Client
                  </a>
                )}
                <button onClick={() => setSelectedInquiry(null)} className={styles.iconBtn}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: CREATE / EDIT BLOG ARTICLE
          ======================================================== */}
      {blogModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setBlogModalOpen(false)}>
          <div
            className={styles.blogModalCard}
            onClick={(e) => e.stopPropagation()}
            style={{ overflowY: "auto" }}
          >
            <div className={styles.modalHeader}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <BookOpen size={18} color="#ff2d7a" />
                <h3 className={styles.modalTitle}>
                  {editingBlog ? "Edit Blog Article" : "Publish New Blog Article"}
                </h3>
              </div>
              <button
                onClick={() => setBlogModalOpen(false)}
                className={styles.modalCloseBtn}
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>

            {blogFeedback.msg && (
              <div
                className={`${styles.alertBox} ${
                  blogFeedback.type === "success" ? styles.alertSuccess : styles.alertError
                }`}
                style={{ margin: "1rem 1.5rem 0" }}
              >
                {blogFeedback.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                <span>{blogFeedback.msg}</span>
              </div>
            )}

            <form onSubmit={handleSaveBlog} className={styles.modalBody} style={{ gap: "1.1rem" }}>
              {/* Title */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Article Title *</label>
                <input
                  type="text"
                  placeholder="e.g. 7 Essential Home Care Tips for Aging Loved Ones"
                  value={blogForm.title}
                  onChange={(e) => handleBlogTitleChange(e.target.value)}
                  className={styles.input}
                  style={{ paddingLeft: "1rem" }}
                  required
                />
              </div>

              {/* Slug */}
              <div className={styles.formGroup}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <label className={styles.label}>URL Slug (/blog/[slug]) *</label>
                  <button
                    type="button"
                    onClick={() => setAutoSlug(!autoSlug)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#ff2d7a",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    {autoSlug ? "🔒 Auto-generating from Title" : "✏️ Custom Slug"}
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="e.g. essential-home-care-tips-aging-loved-ones"
                  value={blogForm.slug}
                  onChange={(e) => {
                    setAutoSlug(false);
                    setBlogForm({ ...blogForm, slug: e.target.value });
                  }}
                  className={styles.input}
                  style={{ paddingLeft: "1rem", fontFamily: "monospace" }}
                  required
                />
              </div>

              {/* 3-Column: Category, Author, Read Time */}
              <div className={styles.formGrid3}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Category</label>
                  <input
                    type="text"
                    list="blog-category-suggestions"
                    placeholder="e.g. Caregiver Tips"
                    value={blogForm.category}
                    onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                    className={styles.input}
                    style={{ paddingLeft: "1rem" }}
                  />
                  <datalist id="blog-category-suggestions">
                    <option value="Caregiver Tips" />
                    <option value="Medicaid Waiver" />
                    <option value="Home Safety" />
                    <option value="Companion Care" />
                    <option value="Dementia Care" />
                    <option value="Respite Care" />
                  </datalist>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Author</label>
                  <input
                    type="text"
                    placeholder="Blessed Hearts Care Team"
                    value={blogForm.author}
                    onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                    className={styles.input}
                    style={{ paddingLeft: "1rem" }}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Read Time</label>
                  <input
                    type="text"
                    placeholder="5 min read"
                    value={blogForm.readTime}
                    onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                    className={styles.input}
                    style={{ paddingLeft: "1rem" }}
                  />
                </div>
              </div>

              {/* 2-Column: Publication Date & Status */}
              <div className={styles.formGrid2}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Publication Date</label>
                  <input
                    type="date"
                    value={blogForm.date}
                    onChange={(e) => setBlogForm({ ...blogForm, date: e.target.value })}
                    className={styles.input}
                    style={{ paddingLeft: "1rem" }}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Publishing Status</label>
                  <select
                    value={blogForm.status}
                    onChange={(e) => setBlogForm({ ...blogForm, status: e.target.value })}
                    className={styles.selectInput}
                    style={{ padding: "0.75rem 1rem", height: "auto" }}
                  >
                    <option value="published">🟢 Published (Live on Website &amp; Sitemap)</option>
                    <option value="draft">🟡 Draft (Hidden from visitors)</option>
                  </select>
                </div>
              </div>

              {/* Dual-Mode Cover Image: Attachment (Local File) OR Public URL */}
              <div className={styles.formGroup}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                  <label className={styles.label} style={{ margin: 0 }}>Cover Featured Image *</label>
                  <span style={{ fontSize: "0.75rem", color: "#64748b" }}>Choose how to attach your image</span>
                </div>

                {/* Tabs to switch between Local File Upload vs Image URL */}
                <div className={styles.imageTabsRow}>
                  <button
                    type="button"
                    onClick={() => setCoverSourceType("upload")}
                    className={`${styles.imageTabBtn} ${coverSourceType === "upload" ? styles.imageTabBtnActive : ""}`}
                  >
                    <UploadCloud size={14} /> Attach from Computer (Local File)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCoverSourceType("url")}
                    className={`${styles.imageTabBtn} ${coverSourceType === "url" ? styles.imageTabBtnActive : ""}`}
                  >
                    <Globe size={14} /> Image URL &amp; Presets
                  </button>
                </div>

                {/* Hidden File Input for Cover */}
                <input
                  type="file"
                  ref={coverFileInputRef}
                  accept="image/png, image/jpeg, image/webp, image/gif, image/svg+xml"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleUploadImageFile(file, "cover");
                  }}
                />

                {coverSourceType === "upload" ? (
                  <div>
                    {blogForm.image && blogForm.image.startsWith("/uploads/") ? (
                      <div>
                        <div className={styles.imagePreviewWrapper}>
                          <img
                            src={blogForm.image}
                            alt="Cover preview"
                            className={styles.imagePreviewImg}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setBlogForm((prev) => ({ ...prev, image: "" }));
                              setLocalCoverFileName("");
                            }}
                            className={styles.removeImageBtn}
                            title="Remove image"
                          >
                            <Trash2 size={12} /> Remove
                          </button>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "0.5rem" }}>
                          <span style={{ fontSize: "0.78rem", color: "#047857", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                            <CheckCircle2 size={14} /> Attached: {localCoverFileName || blogForm.image.split("/").pop()}
                          </span>
                          <button
                            type="button"
                            onClick={() => coverFileInputRef.current?.click()}
                            style={{
                              background: "none",
                              border: "none",
                              color: "#ff2d7a",
                              fontSize: "0.78rem",
                              fontWeight: 600,
                              cursor: "pointer",
                              textDecoration: "underline",
                            }}
                          >
                            Change Image
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div
                          className={styles.dropzone}
                          onClick={() => coverFileInputRef.current?.click()}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => {
                            e.preventDefault();
                            const file = e.dataTransfer.files?.[0];
                            if (file) handleUploadImageFile(file, "cover");
                          }}
                        >
                          {isUploadingCover ? (
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#ff2d7a" }}>
                              <RefreshCw size={20} className="animate-spin" />
                              <span style={{ fontSize: "0.88rem", fontWeight: 600 }}>Attaching local image to server...</span>
                            </div>
                          ) : (
                            <>
                              <UploadCloud size={28} color="#ff2d7a" />
                              <p className={styles.dropzoneTitle}>
                                Click to select image from your computer, or drag &amp; drop here
                              </p>
                              <p className={styles.dropzoneSub}>
                                PNG, JPG, WEBP, GIF, SVG up to 8MB — instantly attached without external URL
                              </p>
                            </>
                          )}
                        </div>
                        {coverUploadError && (
                          <div style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "0.35rem" }}>
                            {coverUploadError}
                          </div>
                        )}
                        {blogForm.image && !blogForm.image.startsWith("/uploads/") && (
                          <div style={{ marginTop: "0.5rem", fontSize: "0.76rem", color: "#64748b" }}>
                            Current fallback image: <code style={{ color: "#5a1a5e" }}>{blogForm.image.slice(0, 50)}...</code>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={blogForm.image}
                      onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                      className={styles.input}
                      style={{ paddingLeft: "1rem" }}
                    />
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.4rem" }}>
                      <span style={{ fontSize: "0.74rem", color: "#718096" }}>Presets:</span>
                      {[
                        { label: "Caregiver & Senior", url: "https://images.unsplash.com/photo-1762955911431-4c44c7c3f408?w=600&auto=format&fit=crop&q=60" },
                        { label: "Companionship", url: "https://images.unsplash.com/photo-1765896387387-0538bc9f997e?w=600&auto=format&fit=crop&q=60" },
                        { label: "Elderly Care", url: "https://plus.unsplash.com/premium_photo-1664475811964-75af7d90ee4b?w=600&auto=format&fit=crop&q=60" },
                        { label: "Home Comfort", url: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&auto=format&fit=crop&q=60" },
                      ].map((p, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setBlogForm({ ...blogForm, image: p.url })}
                          style={{
                            background: "#f1f5f9",
                            border: "1px solid #cbd5e1",
                            borderRadius: "4px",
                            fontSize: "0.72rem",
                            padding: "0.15rem 0.45rem",
                            cursor: "pointer",
                          }}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                    {blogForm.image && (
                      <div className={styles.imagePreviewWrapper} style={{ height: "120px", marginTop: "0.6rem" }}>
                        <img src={blogForm.image} alt="Preview" className={styles.imagePreviewImg} />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Excerpt / Meta description */}
              <div className={styles.formGroup}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <label className={styles.label}>Excerpt / SEO Meta Description *</label>
                  <span style={{ fontSize: "0.75rem", color: blogForm.excerpt.length > 165 ? "#e11d48" : "#718096" }}>
                    {blogForm.excerpt.length} characters (120-160 recommended for Google)
                  </span>
                </div>
                <textarea
                  rows={2}
                  placeholder="A compelling 1-2 sentence overview of the article for Google search snippets and blog previews..."
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                  className={styles.textarea}
                  required
                />
              </div>

              {/* Rich Text Editor with Full Formatting & Media Attachment */}
              <div className={styles.formGroup}>
                <div className={styles.editorTabsHeader}>
                  <div>
                    <label className={styles.label} style={{ margin: 0 }}>
                      Article Body &amp; Rich Text Editor *
                    </label>
                    <div style={{ fontSize: "0.75rem", color: "#64748b" }}>
                      Use the formatting toolbar to design headings, lists, blockquotes, and media.
                    </div>
                  </div>

                  <div className={styles.editorModeTabGroup}>
                    <button
                      type="button"
                      onClick={() => setEditorMode("edit")}
                      className={`${styles.editorModeBtn} ${editorMode === "edit" ? styles.editorModeBtnActive : ""}`}
                    >
                      <Edit3 size={13} /> Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditorMode("preview")}
                      className={`${styles.editorModeBtn} ${editorMode === "preview" ? styles.editorModeBtnActive : ""}`}
                    >
                      <Eye size={13} /> Live Preview
                    </button>
                  </div>
                </div>

                {/* Hidden input for inline image file picker */}
                <input
                  type="file"
                  ref={inlineFileInputRef}
                  accept="image/png, image/jpeg, image/webp, image/gif, image/svg+xml"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleUploadImageFile(file, "inline");
                  }}
                />

                <div className={styles.editorContainer}>
                  {editorMode === "edit" ? (
                    <>
                      {/* Editor Toolbar */}
                      <div className={styles.editorToolbar}>
                        {/* Heading Styles */}
                        <div className={styles.editorToolbarGroup}>
                          <button
                            type="button"
                            onClick={() => insertFormatting("h2")}
                            className={styles.toolbarBtn}
                            title="Insert Heading 2 (H2)"
                          >
                            <Heading2 size={15} /> <strong>H2</strong>
                          </button>
                          <button
                            type="button"
                            onClick={() => insertFormatting("h3")}
                            className={styles.toolbarBtn}
                            title="Insert Heading 3 (H3)"
                          >
                            <Heading3 size={15} /> <strong>H3</strong>
                          </button>
                        </div>

                        <div className={styles.editorToolbarDivider} />

                        {/* Inline Formats */}
                        <div className={styles.editorToolbarGroup}>
                          <button
                            type="button"
                            onClick={() => insertFormatting("bold")}
                            className={styles.toolbarBtn}
                            title="Bold Text"
                          >
                            <Bold size={15} />
                          </button>
                          <button
                            type="button"
                            onClick={() => insertFormatting("italic")}
                            className={styles.toolbarBtn}
                            title="Italic Text"
                          >
                            <Italic size={15} />
                          </button>
                          <button
                            type="button"
                            onClick={() => insertFormatting("underline")}
                            className={styles.toolbarBtn}
                            title="Underline Text"
                          >
                            <Underline size={15} />
                          </button>
                        </div>

                        <div className={styles.editorToolbarDivider} />

                        {/* Lists & Quotes */}
                        <div className={styles.editorToolbarGroup}>
                          <button
                            type="button"
                            onClick={() => insertFormatting("ul")}
                            className={styles.toolbarBtn}
                            title="Bulleted List"
                          >
                            <List size={15} />
                          </button>
                          <button
                            type="button"
                            onClick={() => insertFormatting("ol")}
                            className={styles.toolbarBtn}
                            title="Numbered List"
                          >
                            <ListOrdered size={15} />
                          </button>
                          <button
                            type="button"
                            onClick={() => insertFormatting("quote")}
                            className={styles.toolbarBtn}
                            title="Quote Box"
                          >
                            <Quote size={15} />
                          </button>
                          <button
                            type="button"
                            onClick={() => insertFormatting("link")}
                            className={styles.toolbarBtn}
                            title="Insert Link"
                          >
                            <LinkIcon size={15} />
                          </button>
                          <button
                            type="button"
                            onClick={() => insertFormatting("hr")}
                            className={styles.toolbarBtn}
                            title="Horizontal Divider"
                          >
                            <Minus size={15} />
                          </button>
                        </div>

                        <div className={styles.editorToolbarDivider} />

                        {/* Media Insertion: Attach Local Image OR Image URL */}
                        <div className={styles.editorToolbarGroup}>
                          <button
                            type="button"
                            onClick={() => inlineFileInputRef.current?.click()}
                            disabled={isUploadingInline}
                            className={styles.toolbarBtn}
                            style={{ background: "#ffedf5", color: "#ff2d7a", fontWeight: 600 }}
                            title="Attach Local Image from Computer into Article"
                          >
                            {isUploadingInline ? (
                              <>
                                <RefreshCw size={14} className="animate-spin" /> Uploading...
                              </>
                            ) : (
                              <>
                                <Paperclip size={14} /> Attach Local Image
                              </>
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={handlePromptInlineImageUrl}
                            className={styles.toolbarBtn}
                            title="Insert Image by Web URL"
                          >
                            <ImageIcon size={14} /> Image URL
                          </button>
                        </div>

                        <div className={styles.editorToolbarDivider} />

                        {/* Auto Read Time Helper */}
                        <div className={styles.editorToolbarGroup} style={{ marginLeft: "auto" }}>
                          <button
                            type="button"
                            onClick={handleAutoCalcReadTime}
                            className={styles.toolbarBtn}
                            title="Auto calculate estimated reading time based on words"
                          >
                            <Sparkles size={13} color="#5a1a5e" /> Auto Read Time
                          </button>
                        </div>
                      </div>

                      {/* Textarea Area */}
                      <textarea
                        ref={contentTextareaRef}
                        rows={10}
                        placeholder="Write or format your article content here...

You can use the toolbar above to add Subheadings (H2, H3), Bullet points, Quotes, Links, and Attach Local Images directly from your computer!

Click the 'Live Preview' tab above anytime to see exactly how your article will look on the live website."
                        value={blogForm.content}
                        onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                        className={styles.editorContentArea}
                        required
                      />
                    </>
                  ) : (
                    /* Live Preview Mode */
                    <div className={styles.editorLivePreview}>
                      {blogForm.content ? (
                        <div dangerouslySetInnerHTML={{ __html: blogForm.content }} />
                      ) : (
                        <div style={{ textAlign: "center", color: "#94a3b8", padding: "2.5rem 1rem" }}>
                          <Edit3 size={32} style={{ marginBottom: "0.5rem", opacity: 0.5 }} />
                          <p style={{ margin: 0, fontWeight: 500 }}>No content written yet.</p>
                          <p style={{ margin: "0.25rem 0 0", fontSize: "0.8rem" }}>
                            Switch back to "Edit" tab and start typing to see your live preview!
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Editor Footer Stats */}
                  <div className={styles.editorFooterStats}>
                    <div style={{ display: "flex", gap: "1rem" }}>
                      <span>
                        Words: <strong>{(blogForm.content || "").replace(/<[^>]*>/g, " ").trim().split(/\s+/).filter(Boolean).length}</strong>
                      </span>
                      <span>
                        Characters: <strong>{(blogForm.content || "").length}</strong>
                      </span>
                    </div>
                    <span style={{ color: "#047857", fontWeight: 500, fontSize: "0.72rem" }}>
                      ✓ Rich HTML &amp; Local Images Supported
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className={styles.modalFooter} style={{ padding: "1rem 0 0", background: "none" }}>
                <button
                  type="button"
                  onClick={() => setBlogModalOpen(false)}
                  className={styles.iconBtn}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSavingBlog}
                  className={styles.createBlogBtn}
                >
                  {isSavingBlog ? (
                    <>
                      <RefreshCw size={14} className="animate-spin" /> Saving to BHH-Blogs...
                    </>
                  ) : editingBlog ? (
                    <>
                      <Check size={14} /> Update Blog Post
                    </>
                  ) : (
                    <>
                      <Plus size={14} /> Publish Article Now
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
