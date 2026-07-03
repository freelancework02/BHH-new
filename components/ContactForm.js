"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("Thank you — we've received your message and will be in touch soon.");
    e.target.reset();
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-describedby="form-status">
      <div className="grid grid--2">
        <div className="field">
          <label htmlFor="firstName" className="required">
            First Name
          </label>
          <input id="firstName" name="firstName" type="text" required autoComplete="given-name" />
        </div>
        <div className="field">
          <label htmlFor="lastName" className="required">
            Last Name
          </label>
          <input id="lastName" name="lastName" type="text" required autoComplete="family-name" />
        </div>
      </div>

      <div className="field">
        <label htmlFor="email" className="required">
          Email
        </label>
        <input id="email" name="email" type="email" required autoComplete="email" />
      </div>

      <div className="field">
        <label htmlFor="phone" className="required">
          Phone Number
        </label>
        <input id="phone" name="phone" type="tel" required autoComplete="tel" />
      </div>

      <div className="grid grid--2">
        <div className="field">
          <label htmlFor="city" className="required">
            City
          </label>
          <input id="city" name="city" type="text" required autoComplete="address-level2" />
        </div>
        <div className="field">
          <label htmlFor="zip" className="required">
            Zip Code
          </label>
          <input id="zip" name="zip" type="text" required autoComplete="postal-code" />
        </div>
      </div>

      <div className="field">
        <label htmlFor="help" className="required">
          How can we help you?
        </label>
        <select id="help" name="help" required defaultValue="">
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
