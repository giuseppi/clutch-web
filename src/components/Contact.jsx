import React, { useState } from 'react';
import Carousel from './Carousel';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactItems = [
    {
      icon: '📧',
      title: 'Email Support',
      description: 'support@clutch.com',
    },
    {
      icon: '📱',
      title: 'Phone Support',
      description: '+1 (555) 123-4567',
    },
    {
      icon: '🏢',
      title: 'Office Location',
      description: '123 Basketball Ave, Court City, CC 12345',
    },
  ];

  return (
    <div className="main-container">
      <div className="content-section contact-content">
        <h1 className="header">Get in Touch</h1>
        <p className="text">
          Have questions, suggestions, or need support? We'd love to hear from you. Send us a message and we'll get back to you as soon as possible.
        </p>

        <Carousel
          title="Contact Information"
          items={contactItems}
        />

        <div className="features-section">
          <h3 className="features-title">Send us a Message</h3>

          {submitted ? (
            <div
              className="success-message"
              style={{ padding: '20px', textAlign: 'center' }}
            >
              <h4
                style={{
                  color: 'var(--success)',
                  marginBottom: '10px',
                  transition: 'color 0.3s ease',
                }}
              >
                Thank you for your message!
              </h4>
              <p
                style={{
                  color: 'var(--text-secondary)',
                  transition: 'color 0.3s ease',
                }}
              >
                We'll get back to you as soon as possible.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                style={{
                  marginTop: '15px',
                  padding: '10px 20px',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'all 0.3s ease',
                }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
            >
              <div className="form-group">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Subject</label>
                <input
                  type="text"
                  name="subject"
                  className="form-input"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea
                  name="message"
                  className="form-input"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  required
                  rows="5"
                  style={{ resize: 'vertical', minHeight: '120px' }}
                />
              </div>

              <button
                type="submit"
                className="form-button"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
