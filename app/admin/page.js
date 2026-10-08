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
  BarChart3,
  MousePointer,
  Activity,
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

  // Cookie Consent & Traffic Telemetry (BHH-cookie-consent) state
  const [consentSessions, setConsentSessions] = useState([]);
  const [isLoadingConsent, setIsLoadingConsent] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [trafficSearchQuery, setTrafficSearchQuery] = useState("");

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
      fetchConsentSessions();
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

  const fetchConsentSessions = async () => {
    setIsLoadingConsent(true);
    try {
      const res = await fetch("/api/cookie-consent?limit=50");
      const data = await res.json();
      if (data.success) {
        setConsentSessions(data.records || []);
      }
    } catch (err) {
      console.error("Failed to load cookie consent sessions:", err);
    } finally {
      setIsLoadingConsent(false);
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
    if (activeTab === "needs_call" && item.status !== "new") return false;
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
            ? "Care article updated successfully!"
            : "New care article published and live on your website!",
        });
        await fetchBlogs();
        setTimeout(() => {
          setBlogModalOpen(false);
        }, 1200);
      } else {
        setBlogFeedback({ type: "error", msg: data.error || "Failed to save article." });
      }
    } catch (err) {
      setBlogFeedback({ type: "error", msg: "Network error saving article." });
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
    if (!confirm(`Are you sure you want to permanently delete "${title}"?`)) return;

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
              <span>Care Team Portal</span>
            </div>
            <h1 className={styles.loginTitle}>Blessed Hearts Homecare</h1>
            <p className={styles.loginSubtitle}>
              Manager &amp; Coordinator Sign In
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
                Username or Email Address
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
                  placeholder="Enter your password"
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
              {isLoggingIn ? "Signing In..." : "Sign In to Care Portal"}
            </button>
          </form>

          <div style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "0.78rem", color: "#a0aec0" }}>
            🔒 Secure Agency Access • Confidential Client Information
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
            <h1 className={styles.navTitle}>Blessed Hearts Care Portal</h1>
            <p className={styles.navSub}>Client Inquiries, Care Articles &amp; Website Activity</p>
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
              fetchConsentSessions();
            }}
            className={styles.iconBtn}
            title="Refresh All Records"
          >
            <RefreshCw size={14} className={isLoadingInquiries || isLoadingBlogs || isLoadingConsent ? "animate-spin" : ""} />
            <span>Refresh Data</span>
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
        {activeTab === "traffic" ? (
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIconWrap} style={{ background: "#fdf2f4", color: "#ff2d7a" }}>
                <BarChart3 size={22} />
              </div>
              <div>
                <div className={styles.statNumber}>{consentSessions.length}</div>
                <div className={styles.statLabel}>Total Recent Visitors</div>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIconWrap} style={{ background: "#eff6ff", color: "#1d4ed8" }}>
                <Globe size={22} />
              </div>
              <div>
                <div className={styles.statNumber}>
                  {consentSessions.reduce((acc, s) => acc + (s.traffic?.pageCount || s.traffic?.pagesVisited?.length || 0), 0)}
                </div>
                <div className={styles.statLabel}>Care Pages Explored</div>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIconWrap} style={{ background: "#fffbeb", color: "#d97706" }}>
                <MousePointer size={22} />
              </div>
              <div>
                <div className={styles.statNumber}>
                  {consentSessions.reduce((acc, s) => acc + (s.traffic?.clickCount || s.traffic?.clicks?.length || 0), 0)}
                </div>
                <div className={styles.statLabel}>Button &amp; Call Clicks</div>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIconWrap} style={{ background: "#ecfdf5", color: "#047857" }}>
                <Check size={22} />
              </div>
              <div>
                <div className={styles.statNumber}>
                  {consentSessions.filter((s) => s.consent?.status === "accepted").length}
                </div>
                <div className={styles.statLabel}>Accepted Standard Cookies</div>
              </div>
            </div>
          </div>
        ) : activeTab === "blogs" ? (
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIconWrap} style={{ background: "#fdf2f4", color: "#ff2d7a" }}>
                <BookOpen size={22} />
              </div>
              <div>
                <div className={styles.statNumber}>{blogs.length}</div>
                <div className={styles.statLabel}>Total Care Articles</div>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIconWrap} style={{ background: "#ecfdf5", color: "#047857" }}>
                <Check size={22} />
              </div>
              <div>
                <div className={styles.statNumber}>{publishedBlogCount}</div>
                <div className={styles.statLabel}>Published on Website</div>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIconWrap} style={{ background: "#fffbeb", color: "#d97706" }}>
                <Edit3 size={22} />
              </div>
              <div>
                <div className={styles.statNumber}>{draftBlogCount}</div>
                <div className={styles.statLabel}>Draft Articles</div>
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
                <div className={styles.statLabel}>Care Topics</div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIconWrap} style={{ background: "#ecfdf5", color: "#047857" }}>
                <Clock size={22} />
              </div>
              <div>
                <div className={styles.statNumber}>{newCount}</div>
                <div className={styles.statLabel}>Needs Call Promptly</div>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIconWrap} style={{ background: "#fdf2f4", color: "#ff2d7a" }}>
                <FileText size={22} />
              </div>
              <div>
                <div className={styles.statNumber}>{totalCount}</div>
                <div className={styles.statLabel}>Total Client Requests</div>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIconWrap} style={{ background: "#fff1f2", color: "#e11d48" }}>
                <FileText size={22} />
              </div>
              <div>
                <div className={styles.statNumber}>{contactFormCount}</div>
                <div className={styles.statLabel}>Website Form Requests</div>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIconWrap} style={{ background: "#eff6ff", color: "#1d4ed8" }}>
                <MessageSquare size={22} />
              </div>
              <div>
                <div className={styles.statNumber}>{chatbotCount}</div>
                <div className={styles.statLabel}>AI Chatbot Leads</div>
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
              <span>All Requests</span>
              <span className={styles.tabCount}>{totalCount}</span>
            </button>

            <button
              className={`${styles.tabBtn} ${activeTab === "needs_call" ? styles.tabBtnActive : ""}`}
              onClick={() => setActiveTab("needs_call")}
            >
              <Clock size={14} color="#047857" />
              <span>Needs Call</span>
              <span className={styles.tabCount} style={{ background: "#ecfdf5", color: "#047857" }}>{newCount}</span>
            </button>

            <button
              className={`${styles.tabBtn} ${activeTab === "contact_form" ? styles.tabBtnActive : ""}`}
              onClick={() => setActiveTab("contact_form")}
            >
              <FileText size={14} />
              <span>Website Forms</span>
              <span className={styles.tabCount}>{contactFormCount}</span>
            </button>

            <button
              className={`${styles.tabBtn} ${activeTab === "chatbot" ? styles.tabBtnActive : ""}`}
              onClick={() => setActiveTab("chatbot")}
            >
              <MessageSquare size={14} />
              <span>Chatbot Leads</span>
              <span className={styles.tabCount}>{chatbotCount}</span>
            </button>

            <button
              className={`${styles.tabBtn} ${activeTab === "blogs" ? styles.tabBtnActive : ""}`}
              onClick={() => setActiveTab("blogs")}
            >
              <BookOpen size={14} />
              <span>Articles &amp; Guides</span>
              <span className={styles.tabCount}>{blogs.length}</span>
            </button>

            <button
              className={`${styles.tabBtn} ${activeTab === "traffic" ? styles.tabBtnActive : ""}`}
              onClick={() => setActiveTab("traffic")}
            >
              <BarChart3 size={14} />
              <span>Website Visitors</span>
              <span className={styles.tabCount}>{consentSessions.length}</span>
            </button>

            <button
              className={`${styles.tabBtn} ${activeTab === "credentials" ? styles.tabBtnActive : ""}`}
              onClick={() => setActiveTab("credentials")}
            >
              <Key size={14} />
              <span>Change Password</span>
            </button>
          </div>

          {activeTab !== "credentials" && activeTab !== "blogs" && activeTab !== "traffic" && (
            <div className={styles.filterRow}>
              <div className={styles.searchWrap}>
                <Search size={16} className={styles.inputIcon} />
                <input
                  type="text"
                  placeholder="Search by client name, phone, email, service, or city..."
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
                  <option value="all">All Request Statuses</option>
                  <option value="new">🟢 New (Needs Call)</option>
                  <option value="contacted">🟡 In Contact / Speaking</option>
                  <option value="closed">⚪ Completed / Closed</option>
                </select>

                <button
                  onClick={handleExportCSV}
                  className={styles.iconBtn}
                  title="Export filtered inquiries to Excel / CSV spreadsheet"
                >
                  <Download size={14} />
                  <span>Download Excel/CSV</span>
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
            <h2 className={styles.settingsTitle}>Change Admin Password</h2>
            <p className={styles.settingsDesc}>
              Update your login username or password for this care coordinator portal. Keep your password confidential.
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
                  placeholder="Enter your current password"
                  value={credForm.currentPassword}
                  onChange={(e) => setCredForm({ ...credForm, currentPassword: e.target.value })}
                  className={styles.input}
                  style={{ paddingLeft: "1rem" }}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Username or Email Address</label>
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
                <label className={styles.label}>New Password (At least 8 characters)</label>
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
                {isUpdatingCreds ? "Saving Password..." : "Save New Password"}
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
                <h2>Care Articles &amp; Educational Guides</h2>
                <p>Publish senior care tips and advice for Pennsylvania families. Articles published here appear live on your website and help families find your care agency on Google.</p>
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
                  title="View live articles on the website in a new tab"
                >
                  <Globe size={15} />
                  <span>View Live on Website</span>
                </a>
                <button
                  onClick={handleOpenCreateBlog}
                  className={styles.createBlogBtn}
                >
                  <Plus size={16} />
                  <span>Write New Article</span>
                </button>
              </div>
            </div>

            {/* Filter & Search Bar for Blogs */}
            <div className={styles.filterRow} style={{ marginTop: 0, padding: 0 }}>
              <div className={styles.searchWrap}>
                <Search size={16} className={styles.inputIcon} />
                <input
                  type="text"
                  placeholder="Search articles by title, care topic, or keywords..."
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
                  <option value="published">🟢 Published Live ({publishedBlogCount})</option>
                  <option value="draft">⚪ Drafts ({draftBlogCount})</option>
                </select>
              </div>
            </div>

            {/* Blog Cards Grid */}
            {filteredBlogs.length === 0 ? (
              <div className={styles.emptyState}>
                <BookOpen size={38} strokeWidth={1.5} />
                <h3 className={styles.emptyStateTitle}>No care articles found</h3>
                <p style={{ margin: "0.5rem 0 1.25rem 0", fontSize: "0.88rem" }}>
                  {blogSearchQuery || blogFilter !== "all"
                    ? "No articles match your search or filter."
                    : "No articles have been written yet. Click below to write and publish your first article for families!"}
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
        ) : activeTab === "traffic" ? (
          /* ========================================================
             TAB: TRAFFIC TELEMETRY & COOKIE CONSENT (BHH-cookie-consent)
             ======================================================== */
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div className={styles.blogHeaderRow}>
              <div className={styles.blogHeaderInfo}>
                <h2>Website Visitors &amp; Activity Overview</h2>
                <p>
                  Understand how many families visit your website, where they are browsing from across Pennsylvania, which care services they read about, and which buttons they click.
                </p>
              </div>
              <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", alignItems: "center" }}>
                <div className={styles.searchWrap} style={{ width: "260px" }}>
                  <Search size={14} className={styles.inputIcon} />
                  <input
                    type="text"
                    placeholder="Search by city, page, or browser..."
                    value={trafficSearchQuery}
                    onChange={(e) => setTrafficSearchQuery(e.target.value)}
                    className={styles.searchInput}
                    style={{ fontSize: "0.82rem", padding: "0.45rem 0.65rem 0.45rem 2rem" }}
                  />
                </div>
                <button
                  onClick={fetchConsentSessions}
                  className={styles.iconBtn}
                  title="Reload Traffic Records"
                >
                  <RefreshCw size={13} className={isLoadingConsent ? "animate-spin" : ""} />
                  <span>Refresh Visitors</span>
                </button>
              </div>
            </div>

            {/* Analytical Widgets Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1rem" }}>
              {/* Widget 1: Most Looked At Care Pages */}
              <div style={{ background: "#ffffff", borderRadius: "0.85rem", padding: "1.25rem", border: "1px solid #e2e8f0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.85rem" }}>
                  <Globe size={16} color="#ff2d7a" />
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 700, margin: 0, color: "#1a2638" }}>
                    Most Looked At Care Pages
                  </h3>
                </div>
                {(() => {
                  const pathCounts = {};
                  consentSessions.forEach((s) => {
                    (s.traffic?.pagesVisited || []).forEach((p) => {
                      const path = p.path || "/";
                      pathCounts[path] = (pathCounts[path] || 0) + 1;
                    });
                  });
                  const sortedPaths = Object.entries(pathCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);

                  if (sortedPaths.length === 0) {
                    return <div style={{ fontSize: "0.82rem", color: "#64748b" }}>No page history recorded yet.</div>;
                  }

                  return (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      {sortedPaths.map(([path, count], idx) => (
                        <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.82rem" }}>
                          <span style={{ fontFamily: "monospace", color: "#5a1a5e", maxWidth: "230px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {path === "/" ? "Home Page (/)" : path}
                          </span>
                          <span style={{ fontWeight: 700, background: "#fdf2f4", color: "#ff2d7a", padding: "0.15rem 0.5rem", borderRadius: "9999px", fontSize: "0.75rem" }}>
                            {count} {count === 1 ? "visitor" : "visitors"}
                          </span>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>

              {/* Widget 2: Calls & Button Clicks by Visitors */}
              <div style={{ background: "#ffffff", borderRadius: "0.85rem", padding: "1.25rem", border: "1px solid #e2e8f0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.85rem" }}>
                  <MousePointer size={16} color="#1d4ed8" />
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 700, margin: 0, color: "#1a2638" }}>
                    Calls &amp; Buttons Clicked by Visitors
                  </h3>
                </div>
                {(() => {
                  const recentClicks = [];
                  consentSessions.forEach((s) => {
                    (s.traffic?.clicks || []).forEach((c) => {
                      recentClicks.push({ ...c, sessionId: s.sessionId });
                    });
                  });
                  const displayedClicks = recentClicks.slice(-5).reverse();

                  if (displayedClicks.length === 0) {
                    return <div style={{ fontSize: "0.82rem", color: "#64748b" }}>No button clicks recorded yet.</div>;
                  }

                  return (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                      {displayedClicks.map((click, idx) => (
                        <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.8rem", borderBottom: "1px solid #f1f5f9", paddingBottom: "0.3rem" }}>
                          <span style={{ fontWeight: 600, color: "#334155", maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            "{click.text || click.tag}"
                          </span>
                          <span style={{ fontSize: "0.72rem", color: "#64748b", fontFamily: "monospace" }}>
                            on {click.path}
                          </span>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Sessions Table */}
            <div className={styles.tableContainer}>
              {(() => {
                const filtered = consentSessions.filter((s) => {
                  if (!trafficSearchQuery) return true;
                  const q = trafficSearchQuery.toLowerCase();
                  return (
                    s.sessionId?.toLowerCase().includes(q) ||
                    s.approximateLocation?.city?.toLowerCase().includes(q) ||
                    s.approximateLocation?.region?.toLowerCase().includes(q) ||
                    s.traffic?.lastVisitedPage?.toLowerCase().includes(q) ||
                    s.deviceBrowser?.browser?.toLowerCase().includes(q)
                  );
                });

                if (filtered.length === 0) {
                  return (
                    <div className={styles.emptyState}>
                      <BarChart3 size={38} strokeWidth={1.5} color="#94a3b8" />
                      <h3>No Visitors Recorded Yet</h3>
                      <p>
                        Visitor activity will automatically appear here as families browse your website.
                      </p>
                    </div>
                  );
                }

                return (
                  <div style={{ overflowX: "auto" }}>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th style={{ whiteSpace: "nowrap" }}>Visitor &amp; Device</th>
                          <th style={{ whiteSpace: "nowrap" }}>Location</th>
                          <th style={{ whiteSpace: "nowrap" }}>Pages Looked At</th>
                          <th style={{ whiteSpace: "nowrap" }}>Buttons Clicked</th>
                          <th style={{ whiteSpace: "nowrap" }}>How They Found You</th>
                          <th style={{ whiteSpace: "nowrap" }}>Visit Date &amp; Time</th>
                          <th style={{ whiteSpace: "nowrap" }}>Cookie Consent</th>
                          <th style={{ textAlign: "right", whiteSpace: "nowrap" }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filtered.map((s, sIdx) => {
                          const timeVal = s.updatedAt || s.createdAt || s.sessionInfo?.lastActiveTime || s.sessionInfo?.startTime;
                          const dateObj = timeVal ? new Date(timeVal) : null;

                          return (
                            <tr key={s.id || s.sessionId}>
                              <td>
                                <div style={{ fontWeight: 700, color: "#1e293b", fontSize: "0.85rem" }}>
                                  Visitor #{filtered.length - sIdx}
                                </div>
                                <div style={{ fontSize: "0.74rem", color: "#64748b", marginTop: "0.15rem" }}>
                                  {s.deviceBrowser?.deviceType === "Mobile" ? "📱 Mobile Phone" : s.deviceBrowser?.deviceType === "Tablet" ? "📱 Tablet" : "💻 Computer"} ({s.deviceBrowser?.browser || "Browser"})
                                </div>
                              </td>

                              <td>
                                <div style={{ fontSize: "0.83rem", color: "#1e293b", fontWeight: 600 }}>
                                  {s.approximateLocation?.city || "York Area"}
                                </div>
                                <div style={{ fontSize: "0.73rem", color: "#64748b", marginTop: "0.15rem" }}>
                                  {s.approximateLocation?.region || "Pennsylvania"}
                                </div>
                              </td>

                              <td>
                                <div style={{ fontWeight: 700, color: "#5a1a5e", fontSize: "0.85rem" }}>
                                  {s.traffic?.pageCount || s.traffic?.pagesVisited?.length || 1} pages
                                </div>
                                <div style={{ fontSize: "0.72rem", color: "#64748b", fontFamily: "monospace", maxWidth: "150px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginTop: "0.15rem" }}>
                                  {s.traffic?.lastVisitedPage || "/"}
                                </div>
                              </td>

                              <td>
                                <span style={{ fontWeight: 700, background: "#f1f5f9", color: "#334155", padding: "0.22rem 0.55rem", borderRadius: "0.35rem", fontSize: "0.78rem", display: "inline-block" }}>
                                  {s.traffic?.clickCount || s.traffic?.clicks?.length || 0} clicks
                                </span>
                              </td>

                              <td>
                                <div style={{ fontSize: "0.8rem", color: "#475569", maxWidth: "160px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                  {s.traffic?.referralSource?.domain?.includes("google") ? "Google Search" : s.traffic?.referralSource?.domain === "Direct" ? "Direct Website Link" : s.traffic?.referralSource?.domain || "Direct Link"}
                                </div>
                              </td>

                              <td>
                                {dateObj ? (
                                  <div>
                                    <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "#1e293b", whiteSpace: "nowrap" }}>
                                      {dateObj.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })}
                                    </div>
                                    <div style={{ fontSize: "0.73rem", color: "#64748b", marginTop: "0.15rem", whiteSpace: "nowrap" }}>
                                      {dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })}
                                    </div>
                                  </div>
                                ) : (
                                  <span style={{ fontSize: "0.78rem", color: "#94a3b8" }}>Recent</span>
                                )}
                              </td>

                              <td>
                                <span
                                  style={{
                                    display: "inline-block",
                                    padding: "0.22rem 0.6rem",
                                    borderRadius: "9999px",
                                    fontSize: "0.73rem",
                                    fontWeight: 700,
                                    whiteSpace: "nowrap",
                                    background:
                                      s.consent?.status === "accepted"
                                        ? "#ecfdf5"
                                        : s.consent?.status === "declined"
                                        ? "#fef2f2"
                                        : "#fffbeb",
                                    color:
                                      s.consent?.status === "accepted"
                                        ? "#047857"
                                        : s.consent?.status === "declined"
                                        ? "#b91c1c"
                                        : "#b45309",
                                  }}
                                >
                                  {s.consent?.status === "accepted" ? "🟢 Accepted" : s.consent?.status === "declined" ? "🔴 Declined" : "🟡 Pending"}
                                </span>
                              </td>

                              <td style={{ textAlign: "right" }}>
                                <button
                                  onClick={() => setSelectedSession(s)}
                                  className={styles.viewDetailBtn}
                                  style={{ background: "#5a1a5e", whiteSpace: "nowrap" }}
                                  title="View what pages this visitor explored"
                                >
                                  <span>View Activity</span>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                );
              })()}
            </div>
          </div>
        ) : (
          /* ========================================================
             TAB: INQUIRIES DATA TABLE
             ======================================================== */
          <div>
            {/* Friendly Care Coordinator Action Guide */}
            <div className={styles.friendlyGuideBanner}>
              <div className={styles.friendlyGuideIcon}>
                <Phone size={16} />
              </div>
              <div className={styles.friendlyGuideText}>
                <strong>How to handle family requests:</strong> When a new inquiry arrives (marked 🟢 New), click the green <strong>Call Client</strong> button right away to connect with the family. Once you have spoken with them, change their status to <strong>🟡 In Contact</strong>. After care is scheduled or closed, mark them <strong>⚪ Completed</strong>.
              </div>
            </div>

            <div className={styles.tableContainer}>
              {filteredInquiries.length === 0 ? (
                <div className={styles.emptyState}>
                  <FileText size={38} strokeWidth={1.5} />
                  <h3 className={styles.emptyStateTitle}>No client requests found</h3>
                  <p style={{ margin: 0, fontSize: "0.88rem" }}>
                    {searchQuery || statusFilter !== "all"
                      ? "Try clearing your search bar or adjusting the status filter above."
                      : "When visitors request care on your website or chat with your AI assistant, their details will appear here immediately."}
                  </p>
                </div>
              ) : (
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Lead Source</th>
                      <th>Family / Client Name</th>
                      <th>Quick Contact</th>
                      <th>Care Service Needed</th>
                      <th>Location</th>
                      <th>Date &amp; Time Received</th>
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
                                <MessageSquare size={11} /> AI Chatbot
                              </>
                            ) : (
                              <>
                                <FileText size={11} /> Website Form
                              </>
                            )}
                          </span>
                        </td>

                        {/* Name */}
                        <td style={{ fontWeight: 600 }}>
                          <div style={{ color: "#1e293b", fontSize: "0.92rem" }}>
                            {inq.fullName || "Family Client"}
                          </div>
                          {inq.notes && (
                            <div style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 400, marginTop: "0.15rem", maxWidth: "210px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              "{inq.notes}"
                            </div>
                          )}
                        </td>

                        {/* Contact */}
                        <td>
                          <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", alignItems: "flex-start" }}>
                            {inq.phone ? (
                              <a
                                href={`tel:${inq.phone}`}
                                className={styles.quickCallBtn}
                                title={`Click to call ${inq.phone} immediately`}
                              >
                                <Phone size={11} />
                                <span>Call {inq.phone}</span>
                              </a>
                            ) : null}
                            {inq.email ? (
                              <a
                                href={`mailto:${inq.email}`}
                                className={styles.quickEmailBtn}
                                title={`Click to email ${inq.email}`}
                              >
                                <Mail size={11} />
                                <span>{inq.email}</span>
                              </a>
                            ) : null}
                            {!inq.phone && !inq.email && (
                              <span style={{ fontSize: "0.78rem", color: "#94a3b8" }}>No phone/email</span>
                            )}
                          </div>
                        </td>

                        {/* Service */}
                        <td>
                          <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#5a1a5e" }}>
                            {inq.serviceRequested || "General In-Home Care"}
                          </span>
                        </td>

                        {/* Location */}
                        <td>
                          <span style={{ fontSize: "0.85rem", color: "#64748b" }}>
                            {[inq.city, inq.county, inq.zip].filter(Boolean).join(", ") || "Central PA / York Area"}
                          </span>
                        </td>

                        {/* Date & Time */}
                        <td>
                          {inq.createdAt ? (
                            <div>
                              <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "#1e293b", whiteSpace: "nowrap" }}>
                                {new Date(inq.createdAt).toLocaleDateString([], {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </div>
                              <div style={{ fontSize: "0.73rem", color: "#64748b", marginTop: "0.15rem", whiteSpace: "nowrap" }}>
                                {new Date(inq.createdAt).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                })}
                              </div>
                            </div>
                          ) : (
                            <span style={{ fontSize: "0.78rem", color: "#94a3b8" }}>Recent</span>
                          )}
                        </td>

                        {/* Status */}
                        <td>
                          <select
                            value={inq.status}
                            onChange={(e) => handleStatusChange(inq.id, inq.type, e.target.value)}
                            className={styles.selectInput}
                            style={{
                              padding: "0.35rem 0.55rem",
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
                              cursor: "pointer",
                            }}
                          >
                            <option value="new">🟢 New (Needs Call)</option>
                            <option value="contacted">🟡 In Contact</option>
                            <option value="closed">⚪ Completed</option>
                          </select>
                        </td>

                        {/* Actions */}
                        <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                          <button
                            onClick={() => setSelectedInquiry(inq)}
                            className={styles.viewDetailBtn}
                            title="View Full Client Details & Conversation Notes"
                          >
                            <span>Full Details</span>
                          </button>

                          <button
                            onClick={() => {
                              if (window.confirm("Are you sure you want to delete this client request?")) {
                                handleDeleteInquiry(inq.id, inq.type);
                              }
                            }}
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
                  <MessageSquare size={18} color="#ff2d7a" />
                ) : (
                  <FileText size={18} color="#ff2d7a" />
                )}
                <div>
                  <h3 className={styles.modalTitle}>
                    {selectedInquiry.type === "chatbot" ? "AI Chatbot Consultation Request" : "Website Contact Form Request"}
                  </h3>
                  <div style={{ fontSize: "0.78rem", color: "#64748b" }}>
                    From {selectedInquiry.fullName || "Prospective Client"}
                  </div>
                </div>
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
              {/* Quick Coordinator Action Banner */}
              <div style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "0.65rem",
                padding: "0.85rem 1.1rem",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "0.75rem",
                marginBottom: "0.5rem"
              }}>
                <div>
                  <div style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "#64748b", fontWeight: 700 }}>
                    Quick Coordinator Action
                  </div>
                  <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#1e293b" }}>
                    Reach out to {selectedInquiry.fullName || "the family"}
                  </div>
                </div>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {selectedInquiry.phone && (
                    <a
                      href={`tel:${selectedInquiry.phone}`}
                      className={styles.quickCallBtn}
                      style={{ padding: "0.45rem 0.95rem", fontSize: "0.85rem" }}
                    >
                      <Phone size={14} /> Call {selectedInquiry.phone}
                    </a>
                  )}
                  {selectedInquiry.email && (
                    <a
                      href={`mailto:${selectedInquiry.email}`}
                      className={styles.quickEmailBtn}
                      style={{ padding: "0.45rem 0.95rem", fontSize: "0.85rem" }}
                    >
                      <Mail size={14} /> Send Email
                    </a>
                  )}
                </div>
              </div>

              {/* Client Info Grid */}
              <div className={styles.infoGrid}>
                <div>
                  <div className={styles.infoItemLabel}>Family / Client Name</div>
                  <div className={styles.infoItemValue} style={{ fontWeight: 700 }}>{selectedInquiry.fullName || "—"}</div>
                </div>

                <div>
                  <div className={styles.infoItemLabel}>Care Service Needed</div>
                  <div className={styles.infoItemValue} style={{ fontWeight: 600, color: "#5a1a5e" }}>{selectedInquiry.serviceRequested || "General Care"}</div>
                </div>

                <div>
                  <div className={styles.infoItemLabel}>Phone Number</div>
                  <div className={styles.infoItemValue}>
                    {selectedInquiry.phone ? (
                      <a href={`tel:${selectedInquiry.phone}`} style={{ color: "#047857", fontWeight: 700, textDecoration: "none" }}>
                        📞 {selectedInquiry.phone}
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
                      <a href={`mailto:${selectedInquiry.email}`} style={{ color: "#1d4ed8", textDecoration: "none" }}>
                        ✉️ {selectedInquiry.email}
                      </a>
                    ) : (
                      "Not provided"
                    )}
                  </div>
                </div>

                <div>
                  <div className={styles.infoItemLabel}>Location / City</div>
                  <div className={styles.infoItemValue}>
                    {[selectedInquiry.city, selectedInquiry.county, selectedInquiry.zip].filter(Boolean).join(", ") || "Central PA / York Area"}
                  </div>
                </div>

                <div>
                  <div className={styles.infoItemLabel}>Date &amp; Time Received</div>
                  <div className={styles.infoItemValue}>
                    {selectedInquiry.createdAt ? new Date(selectedInquiry.createdAt).toLocaleString([], { dateStyle: "medium", timeStyle: "short" }) : "Recent"}
                  </div>
                </div>
              </div>

              {/* Message / Care Notes */}
              {(selectedInquiry.notes || selectedInquiry.message) && (
                <div>
                  <div className={styles.infoItemLabel} style={{ marginBottom: "0.35rem" }}>
                    Care Requirements &amp; Family Notes
                  </div>
                  <div className={styles.messageBox} style={{ fontSize: "0.92rem", lineHeight: 1.6, background: "#f8fafc", padding: "0.85rem 1rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0" }}>
                    {selectedInquiry.notes || selectedInquiry.message}
                  </div>
                </div>
              )}

              {/* If Chatbot lead: Show Interactive Chat Transcript */}
              {selectedInquiry.type === "chatbot" && selectedInquiry.chatTranscript?.length > 0 && (
                <div className={styles.transcriptContainer}>
                  <div className={styles.transcriptHeader}>
                    <MessageSquare size={14} color="#ff2d7a" />
                    <span>Conversation Between Family &amp; AI Care Assistant</span>
                  </div>
                  <div className={styles.transcriptBody}>
                    {selectedInquiry.chatTranscript.map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className={
                          m.sender === "user" ? styles.transcriptMsgUser : styles.transcriptMsgBot
                        }
                      >
                        <div style={{ fontSize: "0.72rem", opacity: 0.85, fontWeight: 700, marginBottom: "0.2rem" }}>
                          {m.sender === "user" ? "👤 Family Member / Visitor" : "🤖 Blessed Hearts Care Assistant"}
                        </div>
                        <div style={{ lineHeight: 1.5 }}>{m.text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className={styles.modalFooter}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 700 }}>Update Status:</span>
                <select
                  value={selectedInquiry.status}
                  onChange={(e) =>
                    handleStatusChange(selectedInquiry.id, selectedInquiry.type, e.target.value)
                  }
                  className={styles.selectInput}
                  style={{ padding: "0.4rem 0.75rem", fontWeight: 700 }}
                >
                  <option value="new">🟢 New (Needs Call)</option>
                  <option value="contacted">🟡 In Contact / Speaking</option>
                  <option value="closed">⚪ Completed / Closed</option>
                </select>
              </div>

              <div style={{ display: "flex", gap: "0.5rem" }}>
                {selectedInquiry.phone && (
                  <a
                    href={`tel:${selectedInquiry.phone}`}
                    className={styles.quickCallBtn}
                    style={{ padding: "0.45rem 0.95rem" }}
                  >
                    <Phone size={13} /> Call Now
                  </a>
                )}
                <button onClick={() => setSelectedInquiry(null)} className={styles.iconBtn}>
                  Close Window
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: VISITOR ACTIVITY & USER JOURNEY
          ======================================================== */}
      {selectedSession && (
        <div className={styles.modalOverlay} onClick={() => setSelectedSession(null)}>
          <div
            className={styles.modalCard}
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "720px", overflowY: "auto", maxHeight: "90vh" }}
          >
            <div className={styles.modalHeader}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <BarChart3 size={20} color="#ff2d7a" />
                <div>
                  <h3 className={styles.modalTitle}>Website Visitor Journey &amp; Activity</h3>
                  <div style={{ fontSize: "0.75rem", color: "#64748b" }}>
                    Visit recorded on {(() => {
                      const t = selectedSession.updatedAt || selectedSession.createdAt || selectedSession.sessionInfo?.startTime;
                      return t ? new Date(t).toLocaleString([], { dateStyle: "medium", timeStyle: "short" }) : "Recent";
                    })()}
                  </div>
                </div>
              </div>
              <button onClick={() => setSelectedSession(null)} className={styles.closeBtn}>
                <X size={18} />
              </button>
            </div>

            <div className={styles.modalBody} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {/* Overview Grid */}
              <div className={styles.infoGrid} style={{ gridTemplateColumns: "1fr 1fr" }}>
                <div>
                  <div className={styles.infoItemLabel}>Cookie Consent Choice</div>
                  <div className={styles.infoItemValue} style={{ fontWeight: 700 }}>
                    {selectedSession.consent?.status === "all" ? (
                      <span style={{ color: "#047857" }}>🟢 Accepted Analytics &amp; Personalization</span>
                    ) : selectedSession.consent?.status === "essential" ? (
                      <span style={{ color: "#475569" }}>⚪ Essential Cookies Only</span>
                    ) : (
                      <span>{selectedSession.consent?.status || "Standard"}</span>
                    )}
                    {selectedSession.consent?.doNotSellOptOut && " (Opted Out of Data Sharing)"}
                  </div>
                </div>

                <div>
                  <div className={styles.infoItemLabel}>Approximate Location</div>
                  <div className={styles.infoItemValue}>
                    {[
                      selectedSession.approximateLocation?.city,
                      selectedSession.approximateLocation?.region,
                      selectedSession.approximateLocation?.country,
                    ].filter(Boolean).join(", ") || "Unknown Location"}
                  </div>
                </div>

                <div>
                  <div className={styles.infoItemLabel}>Device &amp; Browser</div>
                  <div className={styles.infoItemValue}>
                    {selectedSession.deviceBrowser?.browser || "Browser"} on {selectedSession.deviceBrowser?.os || "Device"} ({selectedSession.deviceBrowser?.deviceType || "Desktop"})
                  </div>
                </div>

                <div>
                  <div className={styles.infoItemLabel}>How They Found You (Referral)</div>
                  <div className={styles.infoItemValue}>
                    {selectedSession.traffic?.referralSource?.referrer || "Direct Visit / Search Engine"}
                  </div>
                </div>
              </div>

              {/* Pages Visited Sequence */}
              <div>
                <div className={styles.infoItemLabel} style={{ marginBottom: "0.4rem" }}>
                  Pages Explored by Visitor ({selectedSession.traffic?.pagesVisited?.length || 0})
                </div>
                <div style={{ background: "#f8fafc", borderRadius: "0.65rem", padding: "0.75rem", border: "1px solid #e2e8f0", maxHeight: "160px", overflowY: "auto" }}>
                  {(selectedSession.traffic?.pagesVisited || []).map((p, pIdx) => (
                    <div key={pIdx} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", padding: "0.35rem 0", borderBottom: "1px solid #edf2f7" }}>
                      <span style={{ fontWeight: 600, color: "#5a1a5e" }}>
                        {p.path === "/" ? "Home Page (/)" : p.path}
                      </span>
                      <span style={{ color: "#64748b", fontSize: "0.76rem" }}>{p.timestamp ? new Date(p.timestamp).toLocaleTimeString() : ""}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Click Interactions */}
              <div>
                <div className={styles.infoItemLabel} style={{ marginBottom: "0.4rem" }}>
                  Buttons &amp; Calls Clicked by Visitor ({selectedSession.traffic?.clicks?.length || 0})
                </div>
                <div style={{ background: "#f8fafc", borderRadius: "0.65rem", padding: "0.75rem", border: "1px solid #e2e8f0", maxHeight: "160px", overflowY: "auto" }}>
                  {(selectedSession.traffic?.clicks || []).length === 0 ? (
                    <div style={{ fontSize: "0.82rem", color: "#64748b" }}>No button clicks recorded during this visit.</div>
                  ) : (
                    (selectedSession.traffic?.clicks || []).map((c, cIdx) => (
                      <div key={cIdx} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", padding: "0.35rem 0", borderBottom: "1px solid #edf2f7" }}>
                        <span style={{ color: "#1e293b" }}>
                          Clicked <strong>"{c.text || c.tag}"</strong>
                        </span>
                        <span style={{ color: "#64748b", fontSize: "0.76rem" }}>
                          on {c.path === "/" ? "Home" : c.path}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <div style={{ fontSize: "0.78rem", color: "#64748b" }}>
                🔒 Securely saved for privacy compliance &amp; website analytics
              </div>
              <button onClick={() => setSelectedSession(null)} className={styles.iconBtn}>
                Close
              </button>
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
                      <RefreshCw size={14} className="animate-spin" /> Publishing Article...
                    </>
                  ) : editingBlog ? (
                    <>
                      <Check size={14} /> Update Care Article
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
