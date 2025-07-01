import React from 'react';
import { FaChartLine, FaFire, FaGamepad, FaMedal, FaUsers } from 'react-icons/fa';
import { LuSwords } from 'react-icons/lu';
import { useTheme } from '../contexts/useTheme';

const About = () => {
  const { theme } = useTheme();

  const storyItems = [
    {
      title: 'Gaming Meets Basketball',
      description:
        "Whether you're new to the game or grinding to prove you're the most clutch player on the court, Clutch makes it easy to find games, track performance, and compete with a purpose.",
      icon: <FaGamepad style={{ color: '#8b5cf6', width: 40, height: 40, margin: '0 auto 20px', display: 'block' }} />,
    },
    {
      title: 'Real-World Competition',
      description:
        'Inspired by my experiences both on the hardwood and in high-stakes online matches, Clutch blends real-world competition with the power of smart, intuitive design.',
      icon: <LuSwords style={{ color: '#9ca3af', width: 40, height: 40, margin: '0 auto 20px', display: 'block' }} />,
    },
    {
      title: 'Level Up Together',
      description: "This is more than just an app—it's a platform for players who love to win, learn, and level up together.",
      icon: <FaChartLine style={{ color: '#22c55e', width: 40, height: 40, margin: '0 auto 20px', display: 'block' }} />,
    },
  ];

  const missionItems = [
    {
      title: 'Competitive Experience',
      description: 'Bring the excitement of structured, competitive play to basketball with performance tracking and player stats.',
      icon: <FaMedal style={{ color: '#ef4444', width: 40, height: 40, margin: '0 auto 20px', display: 'block' }} />,
    },
    {
      title: 'Competitive Spirit',
      description: 'Create an environment where every game matters and players can prove their skills on the court.',
      icon: <FaFire style={{ color: '#f97316', width: 40, height: 40, margin: '0 auto 20px', display: 'block' }} />,
    },
    {
      title: 'Community First',
      description: "Build a community of passionate players who support each other's growth and love for the game.",
      icon: <FaUsers style={{ color: theme === 'dark' ? 'white' : '#000', width: 40, height: 40, margin: '0 auto 20px', display: 'block' }} />,
    },
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1 className="about-hero-title">
            About <span className="gradient-text">Clutch</span>
          </h1>
          <p className="about-hero-subtitle">
            Hi, I'm Giuseppi Pelayo—a software engineer with a lifelong passion for basketball, competitive gaming, and building meaningful
            technology. I created Clutch to bring the same energy and structure of ranked matchmaking from professional esports into the world of
            pick-up basketball.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-section">
        <div className="about-section-content">
          <h2 className="about-section-title">
            The Clutch <span className="gradient-text">Story</span>
          </h2>
          <div className="about-grid">
            {storyItems.map((item, index) => (
              <div
                key={index}
                className="about-card"
              >
                {item.icon}
                <h3 className="about-card-title">{item.title}</h3>
                <p className="about-card-description">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-section">
        <div className="about-section-content">
          <h2 className="about-section-title">
            Our <span className="gradient-text">Mission</span>
          </h2>
          <div className="about-grid">
            {missionItems.map((item, index) => (
              <div
                key={index}
                className="about-card"
              >
                {item.icon}
                <h3 className="about-card-title">{item.title}</h3>
                <p className="about-card-description">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="about-cta-content">
          <h2 className="about-cta-title">
            Join the Clutch <span className="gradient-text">Community</span>
          </h2>
          <p className="about-cta-subtitle">
            Ready to take your game to the next level? Be among the first to experience the future of basketball court discovery.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
