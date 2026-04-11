import { COLORS } from './colors'

/**
 * Canonical Resume Timeline Data.
 * Centralized content for the 3D journey.
 */
export const TIMELINE = [
  {
    type: 'EXPERIENCE',
    id: 'careem',
    company: 'Careem',
    role: 'Senior Software Engineer',
    period: '2025 - Present',
    description: 'A leading ride-hailing and SuperApp in the Middle East, serving over 50M+ users.',
    logo: '/brands/careem.png',
    points: [
      'Designing and developing core backend functionalities powering Hala\'s ride-booking and payment experience. (Golang, DynamoDB, Kafka, SQS)',
      'Led the implementation of an ETA-based product switch, reducing downtime and improving reliability.',
      'Collaborating with cross-functional teams to ensure scalable and fault-tolerant ride services in high-demand markets.'
    ]
  },
  {
    type: 'EXPERIENCE',
    id: 'unmarshal',
    company: 'Unmarshal',
    role: 'Senior Software Engineer',
    period: '2021 - 2025',
    description: 'Senior Software Engineer at Unmarshal, focusing on blockchain infrastructure.',
    logo: '/brands/unmarshal.svg',
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
    logo: '/brands/navi.svg',
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
    logo: '/brands/mavenhive.jpg',
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
    color: COLORS.ACCENT_BLUE
  },
  {
    type: 'SKILLS',
    id: 'skills-web3',
    title: 'Web3 & Blockchain',
    items: ["Web3", "Foundry", "Smart Contracts", "Postgres"],
    color: COLORS.ACCENT_PURPLE
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
