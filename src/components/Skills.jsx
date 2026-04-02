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
        <h2 style={{ fontSize: '3rem', marginBottom: '3rem', textAlign: 'center' }}>
          Technical <span className="gradient-text">Arsenal</span>
        </h2>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '2rem' 
        }}>
          {skills.map((skill, index) => (
            <div
              key={index}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
