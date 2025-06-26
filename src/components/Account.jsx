import { EmailAuthProvider, reauthenticateWithCredential, sendEmailVerification, updateEmail, updatePassword, updateProfile } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';

const Account = () => {
  const user = auth.currentUser;

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        displayName: user.displayName || '',
        email: user.email || '',
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      await updateProfile(user, {
        displayName: formData.displayName,
        photoURL: user.photoURL, // Keep existing photo for now
      });
      showMessage('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      showMessage('Failed to update profile. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      await updateEmail(user, formData.email);
      await sendEmailVerification(user);
      showMessage('Email updated! Please check your inbox to verify the new email address.');
    } catch (error) {
      console.error('Error updating email:', error);
      if (error.code === 'auth/requires-recent-login') {
        showMessage('Please re-authenticate to change your email.', 'error');
      } else {
        showMessage('Failed to update email. Please try again.', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!user) return;

    if (formData.newPassword !== formData.confirmPassword) {
      showMessage('New passwords do not match.', 'error');
      return;
    }

    if (formData.newPassword.length < 6) {
      showMessage('Password must be at least 6 characters long.', 'error');
      return;
    }

    setLoading(true);
    try {
      // Re-authenticate user before password change
      const credential = EmailAuthProvider.credential(user.email, formData.currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Update password
      await updatePassword(user, formData.newPassword);

      showMessage('Password updated successfully!');
      setFormData((prev) => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
      setShowPasswordForm(false);
    } catch (error) {
      console.error('Error updating password:', error);
      if (error.code === 'auth/wrong-password') {
        showMessage('Current password is incorrect.', 'error');
      } else {
        showMessage('Failed to update password. Please try again.', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="main-container">
        <div className="content-section">
          <h1 className="header">Account</h1>
          <p className="text">Please sign in to access your account settings.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="main-container">
      <div
        className="content-section"
        style={{ maxWidth: '600px' }}
      >
        <h1 className="header">Account Settings</h1>
        <p className="text">Manage your account information and preferences.</p>

        {message.text && <div className={`${message.type === 'error' ? 'error-message' : 'success-message'}`}>{message.text}</div>}

        {/* Profile Information */}
        <div
          style={{
            background: 'var(--bg-tertiary)',
            padding: '25px',
            borderRadius: '15px',
            border: '1px solid var(--border)',
            marginBottom: '30px',
            transition: 'all 0.3s ease',
          }}
        >
          <h3
            style={{
              fontSize: '1.5rem',
              marginBottom: '20px',
              color: 'var(--text-primary)',
              fontWeight: '600',
              transition: 'color 0.3s ease',
            }}
          >
            Profile Information
          </h3>

          <form onSubmit={handleUpdateProfile}>
            <div className="form-group">
              <label className="form-label">Display Name</label>
              <input
                type="text"
                name="displayName"
                className="form-input"
                value={formData.displayName}
                onChange={handleInputChange}
                placeholder="Enter your display name"
              />
            </div>

            <button
              type="submit"
              className="form-button"
              disabled={loading}
              style={{ opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>

        {/* Email Settings */}
        <div
          style={{
            background: 'var(--bg-tertiary)',
            padding: '25px',
            borderRadius: '15px',
            border: '1px solid var(--border)',
            marginBottom: '30px',
            transition: 'all 0.3s ease',
          }}
        >
          <h3
            style={{
              fontSize: '1.5rem',
              marginBottom: '20px',
              color: 'var(--text-primary)',
              fontWeight: '600',
              transition: 'color 0.3s ease',
            }}
          >
            Email Address
          </h3>

          <form onSubmit={handleUpdateEmail}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-input"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
              />
            </div>

            <button
              type="submit"
              className="form-button"
              disabled={loading}
              style={{ opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Updating...' : 'Update Email'}
            </button>
          </form>
        </div>

        {/* Password Settings */}
        <div
          style={{
            background: 'var(--bg-tertiary)',
            padding: '25px',
            borderRadius: '15px',
            border: '1px solid var(--border)',
            transition: 'all 0.3s ease',
          }}
        >
          <h3
            style={{
              fontSize: '1.5rem',
              marginBottom: '20px',
              color: 'var(--text-primary)',
              fontWeight: '600',
              transition: 'color 0.3s ease',
            }}
          >
            Password
          </h3>

          {!showPasswordForm ? (
            <button
              onClick={() => setShowPasswordForm(true)}
              className="form-button"
              style={{ width: 'auto', padding: '12px 24px' }}
            >
              Change Password
            </button>
          ) : (
            <form onSubmit={handleUpdatePassword}>
              <div className="form-group">
                <label className="form-label">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  className="form-input"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  placeholder="Enter your current password"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  className="form-input"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  placeholder="Enter your new password"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-input"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your new password"
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="submit"
                  className="form-button"
                  disabled={loading}
                  style={{ opacity: loading ? 0.7 : 1, flex: 1 }}
                >
                  {loading ? 'Updating...' : 'Update Password'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordForm(false);
                    setFormData((prev) => ({
                      ...prev,
                      currentPassword: '',
                      newPassword: '',
                      confirmPassword: '',
                    }));
                  }}
                  style={{
                    padding: '12px 24px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border)',
                    borderRadius: '10px',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Account Info */}
        <div
          style={{
            background: 'var(--bg-tertiary)',
            padding: '25px',
            borderRadius: '15px',
            border: '1px solid var(--border)',
            marginTop: '30px',
            transition: 'all 0.3s ease',
          }}
        >
          <h3
            style={{
              fontSize: '1.5rem',
              marginBottom: '20px',
              color: 'var(--text-primary)',
              fontWeight: '600',
              transition: 'color 0.3s ease',
            }}
          >
            Account Information
          </h3>

          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            <p>
              <strong>User ID:</strong> {user.uid}
            </p>
            <p>
              <strong>Email Verified:</strong> {user.emailVerified ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>Account Created:</strong> {user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'Unknown'}
            </p>
            <p>
              <strong>Last Sign In:</strong> {user.metadata.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleDateString() : 'Unknown'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
