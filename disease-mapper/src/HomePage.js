import React from 'react';
import styles from './HomePage.module.css'; // Assuming you store your CSS here

const teamMembers = [
  { name: 'Joshua', role: 'Frontend & Backend & Good Vibes' },
  { name: 'Raghav', role: 'Frontend & Backend & Sleep & Cricket' },
  { name: 'Marwan', role: 'Frontend & Backend & Minecraft' },
  { name: 'Cindy', role: 'Snack Machine & Mapper (Frontend <3)' },
  { name: 'Eric', role: 'King of Imports & Moral Support' },
  { name: 'Abdul', role: 'Frontend & Talkative' },
];

const HomePage = () => (
  <div className={styles.App}>
    <header className={styles.Header}>
      <h1>Welcome to Our Disease Tracking Project!</h1>
    </header>
    <section className={styles.ProjectConcept}>
      <h2>Understanding Disease Spread, Together</h2>
      <p>
        In today's connected world, the rapid spread of contagious diseases
        poses a significant challenge. Our project aims to empower individuals
        and communities to manage and investigate the spread of contagious
        diseases more effectively.
      </p>
      <p>
        Users can anonymously report contagious diseases they have encountered
        or been diagnosed with. These reports are then displayed on an
        interactive map, providing valuable insights into how diseases spread
        across different regions. By contributing to and accessing our map,
        individuals can make informed decisions about their health and mobility.
      </p>
    </section>
    <div className={styles.TeamSection}>
      <h2>Meet the Team</h2>
      <div className={styles.TeamMembers}>
        {teamMembers.map((member, index) => (
          <div key={index} className={styles.TeamMemberCard}>
            <h3>{member.name}</h3>
            <p>{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default HomePage;
