import React from 'react';

const About = () => {
  return (
    <div className="main-container">
      <div className="content-section about-content">
        <h1 className="header">About Clutch</h1>
        <p className="text">
          Clutch is revolutionizing the way basketball players find and book courts. Our mission is to connect players with the best basketball
          facilities in their area, making it easier than ever to get out and play the game you love.
        </p>

        <div
          style={{
            marginTop: '40px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
          }}
        >
          <div
            style={{
              background: 'var(--bg-tertiary)',
              padding: '25px',
              borderRadius: '15px',
              border: '1px solid var(--border)',
              textAlign: 'left',
              transition: 'all 0.3s ease',
            }}
          >
            <h3
              style={{
                color: 'var(--success)',
                fontSize: '1.5rem',
                marginBottom: '15px',
                fontWeight: '600',
                transition: 'color 0.3s ease',
              }}
            >
              Our Story
            </h3>
            <p
              style={{
                color: 'var(--text-secondary)',
                lineHeight: '1.6',
                transition: 'color 0.3s ease',
              }}
            >
              Founded by basketball enthusiasts who were tired of driving around looking for available courts, Clutch was born from the simple idea
              that finding a place to play shouldn't be a challenge. We've built a platform that puts the power back in the players' hands.
            </p>
          </div>

          <div
            style={{
              background: 'var(--bg-tertiary)',
              padding: '25px',
              borderRadius: '15px',
              border: '1px solid var(--border)',
              textAlign: 'left',
              transition: 'all 0.3s ease',
            }}
          >
            <h3
              style={{
                color: 'var(--success)',
                fontSize: '1.5rem',
                marginBottom: '15px',
                fontWeight: '600',
                transition: 'color 0.3s ease',
              }}
            >
              Our Mission
            </h3>
            <p
              style={{
                color: 'var(--text-secondary)',
                lineHeight: '1.6',
                transition: 'color 0.3s ease',
              }}
            >
              To create a seamless experience for basketball players of all levels, from casual pickup games to competitive leagues. We believe
              everyone deserves easy access to quality basketball facilities.
            </p>
          </div>

          <div
            style={{
              background: 'var(--bg-tertiary)',
              padding: '25px',
              borderRadius: '15px',
              border: '1px solid var(--border)',
              textAlign: 'left',
              transition: 'all 0.3s ease',
            }}
          >
            <h3
              style={{
                color: 'var(--success)',
                fontSize: '1.5rem',
                marginBottom: '15px',
                fontWeight: '600',
                transition: 'color 0.3s ease',
              }}
            >
              Our Values
            </h3>
            <ul
              style={{
                color: 'var(--text-secondary)',
                lineHeight: '1.6',
                paddingLeft: '20px',
                transition: 'color 0.3s ease',
              }}
            >
              <li>Community-driven approach.</li>
              <li>Quality and reliability.</li>
              <li>Accessibility for all players.</li>
              <li>Innovation in sports technology.</li>
            </ul>
          </div>
        </div>

        <div
          style={{
            marginTop: '40px',
            padding: '30px',
            background: 'var(--bg-tertiary)',
            borderRadius: '15px',
            border: '1px solid var(--border)',
            textAlign: 'center',
            transition: 'all 0.3s ease',
          }}
        >
          <h3
            style={{
              fontSize: '1.8rem',
              marginBottom: '20px',
              color: 'var(--text-primary)',
              fontWeight: '600',
              transition: 'color 0.3s ease',
            }}
          >
            Join the Clutch Community
          </h3>
          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '1.1rem',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6',
              transition: 'color 0.3s ease',
            }}
          >
            Whether you're a seasoned player or just getting started, Clutch is here to help you find your perfect court. Join thousands of players
            who are already using Clutch to elevate their game.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
