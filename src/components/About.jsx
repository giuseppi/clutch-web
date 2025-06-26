import React from 'react';
import Carousel from './Carousel';

const About = () => {
  const storyItems = [
    {
      icon: '🎮',
      title: 'Gaming Meets Basketball',
      description:
        "Whether you're new to the game or grinding to prove you're the most clutch player on the court, Clutch makes it easy to find games, track performance, and compete with a purpose.",
    },
    {
      icon: '🏀',
      title: 'Real-World Competition',
      description:
        'Inspired by my experiences both on the hardwood and in high-stakes online matches, Clutch blends real-world competition with the power of smart, intuitive design.',
    },
    {
      icon: '🚀',
      title: 'Level Up Together',
      description: "This is more than just an app—it's a platform for players who love to win, learn, and level up together.",
    },
  ];

  const missionItems = [
    {
      icon: '🎯',
      title: 'Ranked Matchmaking',
      description: 'Bring the competitive structure of esports to basketball with skill-based matchmaking and performance tracking.',
    },
    {
      icon: '🏆',
      title: 'Competitive Spirit',
      description: 'Create an environment where every game matters and players can prove their skills on the court.',
    },
    {
      icon: '🤝',
      title: 'Community First',
      description: "Build a community of passionate players who support each other's growth and love for the game.",
    },
  ];

  return (
    <div className="main-container">
      <div className="content-section about-content">
        <h1 className="header">About Clutch</h1>
        <p className="text">
          Hi, I'm Giuseppi Pelayo—a software developer with a lifelong passion for basketball, competitive gaming, and building meaningful technology.
          I created Clutch to bring the same energy and structure of ranked matchmaking from professional esports into the world of pick-up
          basketball.
        </p>

        <Carousel
          title="The Clutch Story"
          items={storyItems}
        />
        <Carousel
          title="Our Mission"
          items={missionItems}
        />

        <div className="features-section">
          <h3 className="features-title">Join the Clutch Community</h3>
          <p
            className="text"
            style={{ textAlign: 'center', marginBottom: '0' }}
          >
            Ready to take your game to the next level? Join thousands of players who are already using Clutch to find competitive games and track
            their progress.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
