"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  MessageCircle,
  X,
  Minus,
  Send,
  Phone,
  Calendar,
  Sparkles,
  Bot,
  RotateCcw,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import { getChatbotResponse } from "@/lib/chatbotKnowledge";
import styles from "./Chatbot.module.css";

const INITIAL_MESSAGE = {
  id: "welcome-1",
  sender: "bot",
  text: "Hello! 👋 Welcome to Blessed Hearts Homecare. I'm your digital Care Assistant.\n\nHow can we support you or your family today?",
  time: "Just now",
  quickReplies: [
    "What services do you provide?",
    "Areas you serve",
    "Cost & Medicaid Waivers",
    "About Blessed Hearts",
    "Transferring Agency",
    "Request Free Consultation",
    "Caregiver Jobs",
  ],
};

export default function Chatbot() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const [isOpen, setIsOpen] = useState(false);
  const [showCallout, setShowCallout] = useState(true);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // In-chat consultation lead form state
  const [showInChatForm, setShowInChatForm] = useState(false);
  const [leadForm, setLeadForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "Personal Care",
    notes: "",
  });
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadSuccessMsg, setLeadSuccessMsg] = useState("");

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll chat to bottom & mobile scroll lock
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setShowCallout(false);
      if (typeof window !== "undefined" && window.innerWidth <= 640) {
        document.body.style.overflow = "hidden";
      }
      setTimeout(() => inputRef.current?.focus(), 200);
    } else {
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
    }
    return () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, [isOpen, messages, isTyping, showInChatForm]);

  // Handle user sending a text message
  const handleSendMessage = (textToSend) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Natural typing delay for realistic interaction
    setTimeout(() => {
      const response = getChatbotResponse(text, messages);

      const botMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: response.text,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        quickReplies: response.quickReplies,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);

      if (response.triggerLeadForm) {
        setShowInChatForm(true);
        if (response.serviceDefault) {
          setLeadForm((f) => ({ ...f, service: response.serviceDefault }));
        }
      }
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setShowInChatForm(false);
    setLeadSuccessMsg("");
  };

  // Submit Lead from the Chat directly to BHH-chatbot-inquiries
  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    if (isSubmittingLead) return;

    if (!leadForm.name.trim() || (!leadForm.phone.trim() && !leadForm.email.trim())) {
      alert("Please provide your name and at least a phone number or email address.");
      return;
    }

    setIsSubmittingLead(true);

    try {
      const res = await fetch("/api/chatbot/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: leadForm.name,
          phone: leadForm.phone,
          email: leadForm.email,
          serviceRequested: leadForm.service,
          notes: leadForm.notes,
          chatTranscript: messages.map((m) => ({ sender: m.sender, text: m.text })),
        }),
      });

      const data = await res.json();

      if (data.success) {
        setLeadSuccessMsg(
          data.message || `Thank you, ${leadForm.name}! Our Care Coordinator has received your details and will contact you shortly.`
        );
        setShowInChatForm(false);
        setLeadForm({ name: "", phone: "", email: "", service: "Personal Care", notes: "" });

        // Add confirmation message to chat
        const confirmationMessage = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: `🎉 **Consultation Request Received!**\n\nThank you for reaching out, ${leadForm.name}. A certified Blessed Hearts Care Coordinator will call you at **${leadForm.phone || leadForm.email}** within one business day.\n\nNeed immediate help? Call us directly at [(223) 260-9042](tel:+12232609042).`,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          quickReplies: ["What services do you provide?", "Areas you serve"],
        };
        setMessages((prev) => [...prev, confirmationMessage]);
      } else {
        alert(data.error || "Unable to submit your inquiry. Please call (223) 260-9042.");
      }
    } catch (err) {
      console.error("Chatbot lead submission error:", err);
      alert("Something went wrong. Please call us directly at (223) 260-9042.");
    } finally {
      setIsSubmittingLead(false);
    }
  };

  // Format message text with markdown-style bolding and bullet lists
  const renderFormattedText = (text) => {
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      if (!line.trim()) return <div key={idx} style={{ height: "0.4rem" }} />;

      let formatted = line;

      // Replace bold **text** with <strong>
      const boldParts = formatted.split(/(\*\*[^*]+\*\*)/g);

      return (
        <p key={idx} style={{ margin: "0.2rem 0" }}>
          {boldParts.map((part, pIdx) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return <strong key={pIdx}>{part.slice(2, -2)}</strong>;
            }
            // Check for phone links [(223) 260-9042](tel:+12232609042)
            if (part.includes("(223) 260-9042")) {
              return (
                <span key={pIdx}>
                  <a href="tel:+12232609042" style={{ color: "var(--pink, #ff2d7a)", fontWeight: "bold" }}>
                    (223) 260-9042
                  </a>
                </span>
              );
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <aside className={`${styles.chatbotWrapper} ${isOpen ? styles.chatbotWrapperOpen : ""}`} aria-label="Live Care Assistant Chat">
      {/* 1. Closed state: Floating Launcher Button with pulse and tooltip */}
      {!isOpen && (
        <div style={{ position: "relative" }}>
          {showCallout && (
            <div className={styles.calloutBadge} role="alert">
              <span>👋 <strong>Need care?</strong> Chat with our Care Team!</span>
              <button
                className={styles.closeCallout}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCallout(false);
                }}
                aria-label="Close notification"
              >
                ×
              </button>
            </div>
          )}

          <button
            id="bhh-chatbot-launcher"
            className={styles.launcherBtn}
            onClick={() => setIsOpen(true)}
            aria-label="Chat with Us - Open Care Assistant"
          >
            <div className={styles.launcherIconWrap}>
              <MessageCircle size={22} />
              <span className={styles.pulseDot} />
            </div>
            <span className={styles.launcherLabel}>Chat with Us</span>
          </button>
        </div>
      )}

      {/* 2. Open state: Interactive Chat Window */}
      {isOpen && (
        <div id="bhh-chatbot-window" className={styles.chatWindow} role="dialog" aria-modal="true">
          {/* Header */}
          <div className={styles.chatHeader}>
            <div className={styles.headerLeft}>
              <div className={styles.avatarWrap}>
                <Bot size={22} color="#ffffff" />
                <span className={styles.avatarOnline} />
              </div>
              <div>
                <div className={styles.headerTitle}>Blessed Hearts Care</div>
                <div className={styles.headerSubtitle}>
                  <Sparkles size={11} /> Online • 10 PA Counties
                </div>
              </div>
            </div>

            <div className={styles.headerActions}>
              <button
                className={styles.headerBtn}
                onClick={handleResetChat}
                title="Restart Chat"
                aria-label="Restart Chat"
              >
                <RotateCcw size={14} />
              </button>
              <button
                className={styles.headerBtn}
                onClick={() => setIsOpen(false)}
                title="Minimize Chat"
                aria-label="Minimize Chat"
              >
                <Minus size={16} />
              </button>
              <button
                className={styles.headerBtn}
                onClick={() => setIsOpen(false)}
                title="Close Chat"
                aria-label="Close Chat"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Quick Call Help Banner */}
          <div className={styles.callBanner}>
            <span>Need immediate family care?</span>
            <a href="tel:+12232609042" className={styles.callBannerLink}>
              <Phone size={12} /> (223) 260-9042
            </a>
          </div>

          {/* Messages Body */}
          <div className={styles.messagesContainer}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`${styles.messageRow} ${
                  msg.sender === "user" ? styles.messageRowUser : styles.messageRowBot
                }`}
              >
                {msg.sender === "bot" && (
                  <div className={styles.botAvatarSmall}>
                    <Bot size={15} />
                  </div>
                )}
                <div style={{ maxWidth: "100%" }}>
                  <div
                    className={`${styles.bubble} ${
                      msg.sender === "user" ? styles.bubbleUser : styles.bubbleBot
                    }`}
                  >
                    {renderFormattedText(msg.text)}
                  </div>
                  <span
                    className={`${styles.timeTag} ${
                      msg.sender === "user" ? styles.timeTagUser : ""
                    }`}
                  >
                    {msg.time}
                  </span>

                  {/* Suggestion Chips */}
                  {msg.quickReplies && msg.quickReplies.length > 0 && (
                    <div className={styles.quickChipsWrap}>
                      {msg.quickReplies.map((reply, rIdx) => (
                        <button
                          key={rIdx}
                          className={styles.quickChip}
                          onClick={() => {
                            if (reply === "Request Free Consultation") {
                              setShowInChatForm(true);
                            } else {
                              handleSendMessage(reply);
                            }
                          }}
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* In-Chat Consultation Lead Form */}
            {showInChatForm && (
              <div className={styles.leadCard}>
                <div className={styles.leadCardTitle}>
                  <Calendar size={16} color="#ff2d7a" />
                  <span>Request a Free Care Consultation</span>
                </div>
                <div className={styles.leadCardSubtitle}>
                  Leave your details and a Care Coordinator will call or email you within one business day:
                </div>

                <form onSubmit={handleLeadSubmit} className={styles.leadForm}>
                  <input
                    type="text"
                    placeholder="Your Full Name *"
                    value={leadForm.name}
                    onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                    className={styles.leadInput}
                    required
                  />

                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    value={leadForm.phone}
                    onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                    className={styles.leadInput}
                    required
                  />

                  <input
                    type="email"
                    placeholder="Email Address (Optional)"
                    value={leadForm.email}
                    onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                    className={styles.leadInput}
                  />

                  <select
                    value={leadForm.service}
                    onChange={(e) => setLeadForm({ ...leadForm, service: e.target.value })}
                    className={styles.leadSelect}
                  >
                    <option value="Personal Care">Personal Care (Bathing, Grooming, Mobility)</option>
                    <option value="Companion Care">Companion Care & Social Support</option>
                    <option value="Alzheimer's & Dementia Care">Alzheimer's & Dementia Care</option>
                    <option value="Respite Care">Respite Care for Family Caregivers</option>
                    <option value="Light Housekeeping">Light Housekeeping & Meals</option>
                    <option value="24-Hour / Live-In Care">24-Hour & Live-In Care</option>
                    <option value="Medicaid Waiver / CHC">PA Medicaid Waiver / CHC Program</option>
                    <option value="Caregiver Employment">Caregiver Employment Application</option>
                  </select>

                  <input
                    type="text"
                    placeholder="City or County (e.g. York, Lancaster)"
                    value={leadForm.notes}
                    onChange={(e) => setLeadForm({ ...leadForm, notes: e.target.value })}
                    className={styles.leadInput}
                  />

                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.25rem" }}>
                    <button
                      type="submit"
                      disabled={isSubmittingLead}
                      className={styles.leadSubmitBtn}
                      style={{ flex: 1 }}
                    >
                      {isSubmittingLead ? "Submitting..." : "Send Request to Care Team"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowInChatForm(false)}
                      style={{
                        background: "#f3f4f6",
                        border: "none",
                        borderRadius: "0.5rem",
                        padding: "0.65rem 0.8rem",
                        fontSize: "0.85rem",
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Success Card */}
            {leadSuccessMsg && (
              <div className={styles.leadSuccessCard}>
                <div className={styles.leadSuccessHeader}>
                  <CheckCircle2 size={16} /> Saved to Care Team Database
                </div>
                <div>{leadSuccessMsg}</div>
              </div>
            )}

            {/* Typing Indicator */}
            {isTyping && (
              <div className={styles.typingRow}>
                <div className={styles.botAvatarSmall}>
                  <Bot size={15} />
                </div>
                <div className={styles.typingBubble}>
                  <span className={styles.typingDot} />
                  <span className={styles.typingDot} />
                  <span className={styles.typingDot} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Bar */}
          <div className={styles.chatFooter}>
            <div className={styles.footerActions}>
              <button
                className={styles.consultationTriggerBtn}
                onClick={() => setShowInChatForm(true)}
              >
                <Calendar size={13} /> Request Free In-Home Consultation
              </button>
              <a
                href="tel:+12232609042"
                style={{ fontSize: "0.75rem", color: "#666", textDecoration: "none" }}
              >
                Call: (223) 260-9042
              </a>
            </div>

            <div className={styles.inputRow}>
              <input
                ref={inputRef}
                type="text"
                placeholder="Ask about services, areas, pricing..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className={styles.chatInput}
                aria-label="Type your message"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isTyping}
                className={styles.sendBtn}
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
