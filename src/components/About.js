import React from 'react';

const About = () => {
  return (
    <div style={{ padding: '20px', color: '#ffffff', backgroundColor: '#121212', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '20px' }}>About Clutch</h1>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '20px', color: '#cccccc' }}>
          Welcome to <strong>Clutch</strong>, the ultimate platform for organizing and joining pick-up basketball games. Inspired by competitive
          gaming ranking systems, Clutch makes it easier for players to find and participate in games at local courts. Whether you’re a casual player
          looking for a quick run or someone aiming to track their progress, Clutch simplifies the process and keeps the competition alive.
        </p>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '40px', marginBottom: '20px' }}>Why Clutch?</h2>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '20px', color: '#cccccc' }}>
          Finding a quality pick-up basketball game can be difficult—courts are either empty or packed, and skill levels vary widely. Clutch
          eliminates the guesswork by helping players find games that match their availability and skill level. Through real-time updates,
          location-based matchmaking, and future plans for stat tracking, Clutch makes pick-up basketball more organized, engaging, and competitive.
        </p>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '40px', marginBottom: '20px' }}>Our Vision</h2>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '20px', color: '#cccccc' }}>
          Clutch’s vision is to revolutionize the way players connect and compete in local basketball games. We aim to create a structured system that
          allows for casual and competitive play, offering features like matchmaking, performance tracking, and skill-based ranking. By making
          basketball more accessible and structured, Clutch fosters an environment where players can grow and compete at their best.
        </p>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '40px', marginBottom: '20px' }}>Key Features</h2>
        <ul style={{ fontSize: '1.2rem', lineHeight: '1.6', textAlign: 'left', marginBottom: '20px', color: '#cccccc' }}>
          <li>🏀 Find and join pick-up games at nearby courts.</li>
          <li>📍 Set preferences for locations and skill levels.</li>
          <li>📅 Get notified when games matching your criteria become available.</li>
          <li>📊 Future updates: Competitive mode with stat tracking and ranking.</li>
        </ul>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '20px', color: '#cccccc' }}>
          Join us in building a smarter way to play pick-up basketball. Whether you're looking to improve your game, meet new players, or simply find
          the best local runs, Clutch is here to make it easier, more competitive, and more fun.
        </p>
      </div>
    </div>
  );
};

export default About;
