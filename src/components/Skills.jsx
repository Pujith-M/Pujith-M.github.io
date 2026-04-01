import { motion } from 'framer-motion'
import { FaServer, FaCode, FaCubes, FaDatabase } from 'react-icons/fa'

export function Skills() {
  const skills = [
    { title: 'Core Languages', icon: <FaCode />, items: ['Golang', 'Solidity', 'TypeScript', 'Java'] },
    { title: 'Web3 & Blockchain', icon: <FaCubes />, items: ['Web3.js/Ethers', 'Foundry', 'Smart Contracts'] },
    { title: 'Frontend', icon: <FaDatabase />, items: ['React.js', 'Next.js', 'Framer Motion'] },
    { title: 'Backend & Data', icon: <FaServer />, items: ['PostgreSQL', 'Kafka', 'Prometheus', 'Grafana'] }
  ]

  return (
    <section style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      padding: '0 8%',
      justifyContent: 'center'
    }}>
      <div style={{ width: '100%', maxWidth: '1200px' }}>
        <motion.h2 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          style={{ fontSize: '3rem', marginBottom: '3rem', textAlign: 'center' }}
        >
          Technical <span className="gradient-text">Arsenal</span>
        </motion.h2>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '2rem' 
        }}>
          {skills.map((skill, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="glass-panel"
            >
              <div style={{ 
                fontSize: '2rem', 
                color: 'var(--accent-teal)', 
                marginBottom: '1rem',
                borderBottom: '1px solid var(--glass-border)',
                paddingBottom: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                {skill.icon} <h3 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--text-main)' }}>{skill.title}</h3>
              </div>
              <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                {skill.items.map((item, i) => (
                  <li key={i} style={{ 
                    padding: '8px 0', 
                    fontSize: '1.1rem',
                    color: 'var(--text-muted)'
                  }}>
                    • {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
