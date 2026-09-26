"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    zip: "",
    help: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (isSubmitting) return;
    
    const newErrors = {};
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    
    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (cleanPhone.length < 10) {
      newErrors.phone = "Please enter a valid 10-digit phone number.";
    }
    
    if (!formData.city.trim()) {
      newErrors.city = "City is required.";
    }
    
    if (!formData.zip.trim()) {
      newErrors.zip = "ZIP code is required.";
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zip.trim())) {
      newErrors.zip = "Please enter a valid ZIP code.";
    }
    
    if (!formData.help) {
      newErrors.help = "Please select a service option.";
    }
    
    setErrors(newErrors);
    
    const isValid = Object.keys(newErrors).length === 0;
    if (!isValid) {
      return;
    }

    setIsSubmitting(true);
    setStatus("");

    try {
      const formPayload = new FormData();
      formPayload.append("access_key", "ae29ff25-607e-4eb5-a6df-e30885a1b4a5");
      formPayload.append("subject", `New Inquiry from ${formData.firstName} ${formData.lastName}`);
      formPayload.append("from_name", "Blessed Hearts Website Lead");
      formPayload.append("name", `${formData.firstName} ${formData.lastName}`);
      formPayload.append("email", formData.email);
      formPayload.append("phone", formData.phone);
      formPayload.append("city", formData.city);
      formPayload.append("zip", formData.zip);
      formPayload.append("service_needed", formData.help);
      formPayload.append("source", "Contact Form Component");

      const web3Res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formPayload,
      });

      const web3Data = await web3Res.json();
      if (!web3Data.success) {
        throw new Error(web3Data.message || "Unable to send your message. Please try again.");
      }

      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source: "Contact Form Component",
        }),
      }).catch((e) => console.warn("Firestore save error:", e));

      setStatus("Thank you — we've received your message and will be in touch soon.");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        city: "",
        zip: "",
        help: "",
      });
    } catch (err) {
      setStatus(err.message || "Something went wrong. Please call us at (223) 260-9042.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-describedby="form-status">
      {/* Honeypot field for bot protection */}
      <input type="text" name="botField" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
      <div className="grid grid--2">
        <div className="field">
          <label htmlFor="firstName" className="required">
            First Name
          </label>
          <input 
            id="firstName" 
            name="firstName" 
            type="text" 
            value={formData.firstName}
            onChange={handleInputChange}
            className={errors.firstName ? "input-error" : ""}
            required 
            autoComplete="given-name" 
          />
          {errors.firstName && <span className="error-message">{errors.firstName}</span>}
        </div>
        <div className="field">
          <label htmlFor="lastName" className="required">
            Last Name
          </label>
          <input 
            id="lastName" 
            name="lastName" 
            type="text" 
            value={formData.lastName}
            onChange={handleInputChange}
            className={errors.lastName ? "input-error" : ""}
            required 
            autoComplete="family-name" 
          />
          {errors.lastName && <span className="error-message">{errors.lastName}</span>}
        </div>
      </div>

      <div className="field">
        <label htmlFor="email" className="required">
          Email
        </label>
        <input 
          id="email" 
          name="email" 
          type="email" 
          value={formData.email}
          onChange={handleInputChange}
          className={errors.email ? "input-error" : ""}
          required 
          autoComplete="email" 
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="field">
        <label htmlFor="phone" className="required">
          Phone Number
        </label>
        <input 
          id="phone" 
          name="phone" 
          type="tel" 
          value={formData.phone}
          onChange={handleInputChange}
          className={errors.phone ? "input-error" : ""}
          required 
          autoComplete="tel" 
        />
        {errors.phone && <span className="error-message">{errors.phone}</span>}
      </div>

      <div className="grid grid--2">
        <div className="field">
          <label htmlFor="city" className="required">
            City
          </label>
          <input 
            id="city" 
            name="city" 
            type="text" 
            value={formData.city}
            onChange={handleInputChange}
            className={errors.city ? "input-error" : ""}
            required 
            autoComplete="address-level2" 
          />
          {errors.city && <span className="error-message">{errors.city}</span>}
        </div>
        <div className="field">
          <label htmlFor="zip" className="required">
            Zip Code
          </label>
          <input 
            id="zip" 
            name="zip" 
            type="text" 
            value={formData.zip}
            onChange={handleInputChange}
            className={errors.zip ? "input-error" : ""}
            required 
            autoComplete="postal-code" 
          />
          {errors.zip && <span className="error-message">{errors.zip}</span>}
        </div>
      </div>

      <div className="field">
        <label htmlFor="help" className="required">
          How can we help you?
        </label>
        <select 
          id="help" 
          name="help" 
          value={formData.help}
          onChange={handleInputChange}
          className={errors.help ? "input-error" : ""}
          required
        >
          <option value="" disabled>
            Please select
          </option>
          <option value="personal-care">Personal Care</option>
          <option value="companion-care">Companion Care</option>
          <option value="housekeeping">Light Housekeeping</option>
          <option value="respite-care">Respite Care</option>
          <option value="dementia-care">Alzheimer's &amp; Dementia Care</option>
          <option value="employment">Caregiver Employment</option>
          <option value="other">Other</option>
        </select>
        {errors.help && <span className="error-message">{errors.help}</span>}
      </div>

      <button type="submit" className="btn btn--gradient" style={{ width: "100%", opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? "not-allowed" : "pointer" }} disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>

      <p id="form-status" role="status" aria-live="polite" className="form-status">
        {status}
      </p>
    </form>
  );
}
