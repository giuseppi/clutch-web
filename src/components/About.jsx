import React from 'react';

const About = () => {
  const storyItems = [
    {
      title: 'Gaming Meets Basketball',
      description:
        "Whether you're new to the game or grinding to prove you're the most clutch player on the court, Clutch makes it easy to find games, track performance, and compete with a purpose.",
    },
    {
      title: 'Real-World Competition',
      description:
        'Inspired by my experiences both on the hardwood and in high-stakes online matches, Clutch blends real-world competition with the power of smart, intuitive design.',
    },
    {
      title: 'Level Up Together',
      description: "This is more than just an app—it's a platform for players who love to win, learn, and level up together.",
    },
  ];

  const missionItems = [
    {
      title: 'Ranked Matchmaking',
      description: 'Bring the competitive structure of esports to basketball with skill-based matchmaking and performance tracking.',
    },
    {
      title: 'Competitive Spirit',
      description: 'Create an environment where every game matters and players can prove their skills on the court.',
    },
    {
      title: 'Community First',
      description: "Build a community of passionate players who support each other's growth and love for the game.",
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
          <h2 className="about-section-title">The Clutch Story</h2>
          <div className="about-grid">
            {storyItems.map((item, index) => (
              <div
                key={index}
                className="about-card"
              >
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
          <h2 className="about-section-title">Our Mission</h2>
          <div className="about-grid">
            {missionItems.map((item, index) => (
              <div
                key={index}
                className="about-card"
              >
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
          <h2 className="about-cta-title">Join the Clutch Community</h2>
          <p className="about-cta-subtitle">
            Ready to take your game to the next level? Be among the first to experience the future of basketball court discovery.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
