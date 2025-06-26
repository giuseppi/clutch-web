import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
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
    setFormData({ firstName: '', lastName: '', email: '', message: '' });
  };

  return (
    <div className="contact-page">
      {/* Main Content */}
      <section className="contact-main">
        <div className="contact-container">
          {/* Left Side - Hero Content */}
          <div className="contact-hero-content-left">
            <h1 className="contact-hero-title">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="contact-hero-subtitle">Have questions about finding courts, joining games, or need support? We'd love to hear from you.</p>

            {/* Testimonial below hero content */}
            <div className="contact-testimonial">
              <div className="testimonial-content">
                <blockquote className="testimonial-quote">
                  Clutch aims to revolutionize basketball by making the experience seamless and competitive. Let's stay connected and work together to
                  build a bigger, stronger community.
                </blockquote>
                <div className="testimonial-author">
                  <div className="testimonial-author-info">
                    <div className="testimonial-author-name">Giuseppi Pelayo</div>
                    <div className="testimonial-author-title">Founder & Lead Software Engineer, Clutch</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="contact-form-section">
            {submitted ? (
              <div className="contact-success">
                <h3 className="contact-success-title">Thank you for your message!</h3>
                <p className="contact-success-text">We'll get back to you as soon as possible.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="contact-reset-button"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="contact-form"
              >
                <div className="contact-form-row">
                  <div className="contact-form-group">
                    <label className="contact-form-label">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      className="contact-form-input"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Your first name"
                      required
                    />
                  </div>

                  <div className="contact-form-group">
                    <label className="contact-form-label">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      className="contact-form-input"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Your last name"
                      required
                    />
                  </div>
                </div>

                <div className="contact-form-group">
                  <label className="contact-form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="contact-form-input"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div className="contact-form-group">
                  <label className="contact-form-label">Message</label>
                  <textarea
                    name="message"
                    className="contact-form-textarea"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us what you're interested in..."
                    rows="4"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="contact-form-button"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
