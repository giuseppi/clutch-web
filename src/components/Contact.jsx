import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="main-container">
      <div className="content-section contact-content">
        <h1 className="header">Get in Touch</h1>
        <p className="text">
          Have questions, suggestions, or need support? We'd love to hear from you.
          Send us a message and we'll get back to you as soon as possible.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
          marginTop: '40px'
        }}>
          <div>
            <h3 style={{
              fontSize: '1.8rem',
              marginBottom: '20px',
              color: 'var(--text-primary)',
              fontWeight: '600',
              transition: 'color 0.3s ease'
            }}>
              Contact Information
            </h3>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                padding: '15px',
                background: 'var(--bg-tertiary)',
                borderRadius: '10px',
                border: '1px solid var(--border)',
                transition: 'all 0.3s ease'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(45deg, var(--accent), var(--accent-hover))',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px'
                }}>
                  📧
                </div>
                <div>
                  <h4 style={{
                    color: 'var(--success)',
                    marginBottom: '5px',
                    fontSize: '1rem',
                    transition: 'color 0.3s ease'
                  }}>
                    Email
                  </h4>
                  <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem',
                    transition: 'color 0.3s ease'
                  }}>
                    support@clutch.com
                  </p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                padding: '15px',
                background: 'var(--bg-tertiary)',
                borderRadius: '10px',
                border: '1px solid var(--border)',
                transition: 'all 0.3s ease'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(45deg, var(--warning), var(--error))',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px'
                }}>
                  📱
                </div>
                <div>
                  <h4 style={{
                    color: 'var(--success)',
                    marginBottom: '5px',
                    fontSize: '1rem',
                    transition: 'color 0.3s ease'
                  }}>
                    Phone
                  </h4>
                  <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem',
                    transition: 'color 0.3s ease'
                  }}>
                    +1 (555) 123-4567
                  </p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                padding: '15px',
                background: 'var(--bg-tertiary)',
                borderRadius: '10px',
                border: '1px solid var(--border)',
                transition: 'all 0.3s ease'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(45deg, var(--success), var(--accent))',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px'
                }}>
                  🏢
                </div>
                <div>
                  <h4 style={{
                    color: 'var(--success)',
                    marginBottom: '5px',
                    fontSize: '1rem',
                    transition: 'color 0.3s ease'
                  }}>
                    Office
                  </h4>
                  <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem',
                    transition: 'color 0.3s ease'
                  }}>
                    123 Basketball Ave<br />
                    Court City, CC 12345
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 style={{
              fontSize: '1.8rem',
              marginBottom: '20px',
              color: 'var(--text-primary)',
              fontWeight: '600',
              transition: 'color 0.3s ease'
            }}>
              Send us a Message
            </h3>

            {submitted ? (
              <div className="success-message" style={{ padding: '20px', textAlign: 'center' }}>
                <h4 style={{
                  color: 'var(--success)',
                  marginBottom: '10px',
                  transition: 'color 0.3s ease'
                }}>
                  Thank you for your message!
                </h4>
                <p style={{
                  color: 'var(--text-secondary)',
                  transition: 'color 0.3s ease'
                }}>
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
                    transition: 'all 0.3s ease'
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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

                <button type="submit" className="form-button">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
