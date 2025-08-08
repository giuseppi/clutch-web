import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { getActiveSessions, getUserSessionHistory } from '../services/userService';

const SessionTracker = () => {
  const [activeSessions, setActiveSessions] = useState([]);
  const [userSessions, setUserSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSessionData();
  }, []);

  const loadSessionData = async () => {
    try {
      setLoading(true);

      // Load active sessions
      const { data: activeData, error: activeError } = await getActiveSessions();
      if (activeError) {
        console.error('Error loading active sessions:', activeError);
        setError('Failed to load active sessions');
      } else {
        setActiveSessions(activeData || []);
      }

      // Load current user's session history
      if (auth.currentUser) {
        const { data: userData, error: userError } = await getUserSessionHistory(auth.currentUser.uid, 5);
        if (userError) {
          console.error('Error loading user sessions:', userError);
        } else {
          setUserSessions(userData || []);
        }
      }
    } catch (err) {
      console.error('Error in loadSessionData:', err);
      setError('Failed to load session data');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const getSessionTypeColor = (type) => {
    return type === 'login' ? '#22c55e' : '#ef4444';
  };

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div
          className="loading-spinner"
          style={{ width: '40px', height: '40px', margin: '0 auto' }}
        ></div>
        <p style={{ marginTop: '10px', color: 'var(--text-secondary)' }}>Loading session data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: 'var(--error)' }}>
        <p>{error}</p>
        <button
          onClick={loadSessionData}
          style={{
            marginTop: '10px',
            padding: '8px 16px',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            color: 'var(--text-primary)',
            cursor: 'pointer',
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2
        style={{
          color: 'var(--text-primary)',
          marginBottom: '20px',
          fontSize: '24px',
          fontWeight: '600',
        }}
      >
        Session Tracker
      </h2>

      {/* Active Sessions */}
      <div style={{ marginBottom: '30px' }}>
        <h3
          style={{
            color: 'var(--text-primary)',
            marginBottom: '15px',
            fontSize: '18px',
            fontWeight: '500',
          }}
        >
          Active Sessions (Last 24 Hours)
        </h3>

        {activeSessions.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>No active sessions found</p>
        ) : (
          <div
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: '8px',
              padding: '15px',
              border: '1px solid var(--border)',
            }}
          >
            {activeSessions.map((session, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 0',
                  borderBottom: index < activeSessions.length - 1 ? '1px solid var(--border)' : 'none',
                }}
              >
                <div>
                  <div style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{session.display_name || session.email}</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>{session.user_id}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: 'var(--text-primary)', fontSize: '14px' }}>{formatTime(session.last_activity)}</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>{session.hours_since_activity.toFixed(1)} hours ago</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Current User Session History */}
      {auth.currentUser && (
        <div>
          <h3
            style={{
              color: 'var(--text-primary)',
              marginBottom: '15px',
              fontSize: '18px',
              fontWeight: '500',
            }}
          >
            Your Recent Sessions
          </h3>

          {userSessions.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>No session history found</p>
          ) : (
            <div
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '8px',
                padding: '15px',
                border: '1px solid var(--border)',
              }}
            >
              {userSessions.map((session, index) => (
                <div
                  key={session.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 0',
                    borderBottom: index < userSessions.length - 1 ? '1px solid var(--border)' : 'none',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: getSessionTypeColor(session.session_type),
                      }}
                    />
                    <span
                      style={{
                        color: 'var(--text-primary)',
                        fontWeight: '500',
                        textTransform: 'capitalize',
                      }}
                    >
                      {session.session_type}
                    </span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: 'var(--text-primary)', fontSize: '14px' }}>{formatTime(session.created_at)}</div>
                    {session.ip_address && <div style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>IP: {session.ip_address}</div>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Refresh Button */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button
          onClick={loadSessionData}
          style={{
            padding: '10px 20px',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Refresh Data
        </button>
      </div>
    </div>
  );
};

export default SessionTracker;
