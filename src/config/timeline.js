/**
 * Canonical Resume Timeline Data.
 * Centralized content for the 3D journey.
 */
export const TIMELINE = [
  {
    type: 'EXPERIENCE',
    id: 'unmarshal',
    company: 'Unmarshal',
    role: 'Senior Software Engineer',
    period: '2021 - Present',
    description: 'Senior Software Engineer at Unmarshal, focusing on blockchain infrastructure.',
    points: [
      'Architected blockchain data indexing solution (500M+ API requests monthly).',
      'Built "Unmarshal Parser" for zero-code smart contract indexing.',
      'Created Web3 real-time notification engine.',
      'Led development of "Xscan," a cross-chain block explorer.'
    ]
  },
  {
    type: 'EXPERIENCE',
    id: 'navi',
    company: 'Navi Technologies',
    role: 'SDE-2',
    period: '2019 - 2021',
    description: 'Building financial systems and automation at scale.',
    points: [
      'Built accounting system using Spring Boot, Kafka, and PostgreSQL.',
      'Automated collections, boosting efficiency by 15%.',
      'Developed internal operations portal in React JS.'
    ]
  },
  {
    type: 'EXPERIENCE',
    id: 'mavenhive',
    company: 'MavenHive',
    role: 'Associate Developer',
    period: '2018 - 2019',
    description: 'Modern web development for top-tier startups.',
    points: [
      'Dashboard for CRED using React JS.',
      'Contributed to CultFit inventory management.',
      'Mobile web campaign app via React JS & Apollo GraphQL.'
    ]
  },
  {
    type: 'SKILLS',
    id: 'skills-core',
    title: 'Core Languages',
    items: ["Golang", "Solidity", "TypeScript", "Java"],
    color: "#3b82f6"
  },
  {
    type: 'SKILLS',
    id: 'skills-web3',
    title: 'Web3 & Blockchain',
    items: ["Web3", "Foundry", "Smart Contracts", "Postgres"],
    color: "#8b5cf6"
  },
  {
    type: 'PROJECTS',
    id: 'campus-io',
    name: 'Campus.IO',
    tech: 'MEAN Stack',
    desc: 'Quiz-based web application for placement activities.'
  },
  {
    type: 'PROJECTS',
    id: 'chasetothr33',
    name: 'ChaseToThr33',
    tech: 'Swift (iOS)',
    desc: 'Ancient game similar to Tic-Tac-Toe for iOS.'
  },
  {
    type: 'PROJECTS',
    id: 'fighter-jet',
    name: 'Fighter Jet Game',
    tech: 'OpenGL (C++)',
    desc: 'Multiplayer shooting game built using OpenGL.'
  }
];
