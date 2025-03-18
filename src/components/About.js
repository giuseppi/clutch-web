import React from 'react';

const About = () => {
  return (
    <div style={{ padding: '20px', color: '#ffffff', backgroundColor: '#121212', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '20px' }}>About Midpoint</h1>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '20px', color: '#cccccc' }}>
          Welcome to <strong>Midpoint</strong>, the ultimate solution for planning meetups effortlessly. Whether you're catching up with a friend or
          planning a date, Midpoint helps you find exciting activities, restaurants, and events at a convenient location halfway between you and your
          companion. No more long commutes or frustrating planning sessions!
        </p>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '40px', marginBottom: '20px' }}>Why Midpoint?</h2>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '20px', color: '#cccccc' }}>
          In our busy lives, it’s hard to find time to plan meetups or travel long distances. Midpoint eliminates the hassle by suggesting convenient
          locations that save you time and energy. Using advanced mapping technology, integrated with popular services like Yelp, Midpoint ensures
          your meetups are stress-free, enjoyable, and memorable.
        </p>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '40px', marginBottom: '20px' }}>Our Vision</h2>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '20px', color: '#cccccc' }}>
          Midpoint’s vision is to make connecting with others as simple as possible. We aim to foster stronger relationships by providing a seamless
          way to meet halfway and discover hidden gems in your area. Our goal is to create a platform that saves time, removes planning stress, and
          enhances social interactions.
        </p>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '40px', marginBottom: '20px' }}>Key Features</h2>
        <ul style={{ fontSize: '1.2rem', lineHeight: '1.6', textAlign: 'left', marginBottom: '20px', color: '#cccccc' }}>
          <li>🚩 Find halfway points between two locations.</li>
          <li>🍴 Discover nearby restaurants, activities, and events using Yelp integration.</li>
          <li>📍 Use location services or manually enter locations to drop pins on the map.</li>
          <li>💬 Share and vote on suggested locations with friends or companions.</li>
        </ul>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '20px', color: '#cccccc' }}>
          Join us on this journey to revolutionize how we connect with others. Whether you’re planning a casual coffee meetup, a dinner date, or a day
          of adventure, Midpoint is here to make it easy and fun.
        </p>
      </div>
    </div>
  );
};

export default About;
