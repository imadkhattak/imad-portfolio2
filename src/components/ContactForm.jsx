import React, { useState } from 'react';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // Handler for input field changes
  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    setResult("Sending...");

    try {
      const formDataObj = new FormData(event.target);
      
      // Use Access Key from .env or fallback to the provided one
      const accessKey = process.env.REACT_APP_WEB3FORMS_ACCESS_KEY || "aa93c931-aee7-4751-9593-89ccaad32ff3";
      formDataObj.append('access_key', accessKey);

      const object = Object.fromEntries(formDataObj);
      const json = JSON.stringify(object);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: json,
      });

      const resJson = await response.json();

      if (resJson.success) {
        setResult("Message sent successfully!");
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        console.error("Error", resJson);
        setResult(resJson.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Network Error", error);
      setResult("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form id="contact-form" onSubmit={onSubmit}>
      <div className="row gx-3 gy-4">
        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label">Your Name</label>
            <input
              name="name"
              placeholder="Name *"
              className="form-control"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label">Your Email</label>
            <input
              name="email"
              placeholder="Email *"
              className="form-control"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <label className="form-label">Subject</label>
            <input
              name="subject"
              placeholder="Subject *"
              className="form-control"
              type="text"
              value={formData.subject}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="col-md-12">
          <div className="form-group">
            <label className="form-label">Your message</label>
            <textarea
              name="message"
              placeholder="Your message *"
              rows={4}
              className="form-control"
              value={formData.message}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="col-md-12">
          <div className="send">
            <button
              className={`px-btn w-100 ${loading ? 'disabled' : ''}`}
              type="submit"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </div>
          {result && (
            <div className={`mt-3 text-center ${result.includes('successfully') ? 'text-success' : 'text-danger'}`}>
              {result}
            </div>
          )}
        </div>
      </div>
    </form>
  );
}

