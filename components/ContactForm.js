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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    
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
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-describedby="form-status">
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

      <button type="submit" className="btn btn--gradient" style={{ width: "100%" }}>
        Submit
      </button>

      <p id="form-status" role="status" aria-live="polite" className="form-status">
        {status}
      </p>
    </form>
  );
}
