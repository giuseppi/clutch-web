import { Tab } from '@headlessui/react';
import { EmailAuthProvider, reauthenticateWithCredential, sendEmailVerification, updateEmail, updatePassword, updateProfile } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { FaBasketballBall } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';
import { auth } from '../firebase';
import { getUserFromSupabase, updateUserProfile } from '../services/userService';

const Account = () => {
  const user = auth.currentUser;
  const [searchParams] = useSearchParams();
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    firstName: user?.displayName?.split(' ')[0] || '',
    lastName: user?.displayName?.split(' ').slice(1).join(' ') || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  useEffect(() => {
    if (user) {
      const loadUserData = async () => {
        try {
          // Load user data from Supabase
          const supabaseUser = await getUserFromSupabase(user.uid);

          const displayNameParts = user.displayName ? user.displayName.split(' ') : ['', ''];
          setFormData((prev) => ({
            ...prev,
            displayName: user.displayName || '',
            firstName: supabaseUser?.first_name || displayNameParts[0] || '',
            lastName: supabaseUser?.last_name || displayNameParts.slice(1).join(' ') || '',
            email: user.email || '',
          }));
        } catch (error) {
          console.error('Error loading user data:', error);
          // Fallback to Firebase display name parsing
          const displayNameParts = user.displayName ? user.displayName.split(' ') : ['', ''];
          setFormData((prev) => ({
            ...prev,
            displayName: user.displayName || '',
            firstName: displayNameParts[0] || '',
            lastName: displayNameParts.slice(1).join(' ') || '',
            email: user.email || '',
          }));
        }
      };

      loadUserData();
    }
  }, [user]);

  // Watch for URL parameter changes to switch tabs
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'stats') {
      setSelectedTabIndex(1);
    } else {
      setSelectedTabIndex(0);
    }
  }, [searchParams]);

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
      // Update Firebase display name
      await updateProfile(user, {
        displayName: formData.displayName,
        photoURL: user.photoURL,
      });

      // Update first and last names in Supabase
      await updateUserProfile(user.uid, {
        first_name: formData.firstName,
        last_name: formData.lastName,
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
      const credential = EmailAuthProvider.credential(user.email, formData.currentPassword);
      await reauthenticateWithCredential(user, credential);
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

  const renderAccountSettings = () => (
    <>
      {/* Message Display */}
      {message.text && (
        <div className={`account-message ${message.type === 'error' ? 'error' : 'success'}`}>
          <div className="message-indicator"></div>
          {message.text}
        </div>
      )}

      {/* Profile Section */}
      <div className="account-section">
        <div className="section-header">
          <h2 className="section-title">Profile Information</h2>
          <p className="section-description">Update your display name and personal details.</p>
        </div>

        <form
          onSubmit={handleUpdateProfile}
          className="account-form"
        >
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

          <div className="form-group">
            <label className="form-label">First Name</label>
            <input
              type="text"
              name="firstName"
              className="form-input"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Enter your first name"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              name="lastName"
              className="form-input"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Enter your last name"
            />
          </div>

          <button
            type="submit"
            className="account-button primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                Updating...
              </>
            ) : (
              'Update Profile'
            )}
          </button>
        </form>
      </div>

      {/* Email Section */}
      <div className="account-section">
        <div className="section-header">
          <h2 className="section-title">Email Address</h2>
          <p className="section-description">Change your email address and verification status.</p>
        </div>

        <form
          onSubmit={handleUpdateEmail}
          className="account-form"
        >
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
            className="account-button primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                Updating...
              </>
            ) : (
              'Update Email'
            )}
          </button>
        </form>
      </div>

      {/* Password Section */}
      <div className="account-section">
        <div className="section-header">
          <h2 className="section-title">Password</h2>
          <p className="section-description">Change your account password securely.</p>
        </div>

        {!showPasswordForm ? (
          <button
            onClick={() => setShowPasswordForm(true)}
            className="account-button primary"
          >
            Change Password
          </button>
        ) : (
          <form
            onSubmit={handleUpdatePassword}
            className="account-form"
          >
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

            <div className="button-group">
              <button
                type="submit"
                className="account-button primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Updating...
                  </>
                ) : (
                  'Update Password'
                )}
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
                className="account-button secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Account Info Section */}
      <div className="account-section">
        <div className="section-header">
          <h2 className="section-title">Account Information</h2>
          <p className="section-description">View your account details and metadata.</p>
        </div>

        <div className="info-list">
          <div className="info-item">
            <span className="info-label">User ID</span>
            <span className="info-value">{user.uid}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Email Verified</span>
            <span className={`info-value ${user.emailVerified ? 'verified' : 'unverified'}`}>{user.emailVerified ? 'Yes' : 'No'}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Account Created</span>
            <span className="info-value">{user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'Unknown'}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Last Sign In</span>
            <span className="info-value">
              {user.metadata.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleDateString() : 'Unknown'}
            </span>
          </div>
        </div>
      </div>
    </>
  );

  const renderStats = () => (
    <>
      <div className="account-section">
        <div className="section-header">
          <h2 className="section-title">Usage Statistics</h2>
          <p className="section-description">View your account usage and activity metrics.</p>
        </div>
        <div className="coming-soon">
          <p>🚧 &nbsp;Statistics feature coming soon. This will display your usage data and activity metrics.</p>
        </div>
      </div>

      <div className="account-section">
        <div className="section-header">
          <h2 className="section-title">Activity Overview</h2>
          <p className="section-description">Track your recent activities and engagement.</p>
        </div>
        <div className="coming-soon">
          <p>🚧 &nbsp;Activity tracking feature coming soon. This will show your recent interactions and engagement metrics.</p>
        </div>
      </div>

      <div className="account-section">
        <div className="section-header">
          <h2 className="section-title">Performance Metrics</h2>
          <p className="section-description">Monitor your account performance and trends.</p>
        </div>
        <div className="coming-soon">
          <p>🚧 &nbsp;Performance analytics feature coming soon. This will provide detailed insights into your account performance.</p>
        </div>
      </div>
    </>
  );

  if (!user) {
    return (
      <div className="main-container">
        <div className="account-container">
          <div className="account-hero">
            <h1 className="account-title">Account Settings</h1>
            <p className="account-subtitle">Please sign in to access your account settings.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-container">
      <div className="account-container">
        {/* Header */}
        <div className="account-hero">
          <h1 className="account-title">Account settings</h1>
        </div>

        {/* Tabs */}
        <Tab.Group
          selectedIndex={selectedTabIndex}
          onChange={setSelectedTabIndex}
        >
          <Tab.List className="account-tabs">
            <Tab className={({ selected }) => `tab-button ${selected ? 'active' : ''}`}>Account Settings</Tab>
            <Tab className={({ selected }) => `tab-button ${selected ? 'active' : ''}`}>Stats</Tab>
          </Tab.List>
          <Tab.Panels className="tab-content">
            <Tab.Panel className="tab-panel">{renderAccountSettings()}</Tab.Panel>
            <Tab.Panel className="tab-panel">{renderStats()}</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default Account;
