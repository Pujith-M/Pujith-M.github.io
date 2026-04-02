export function Experience() {
  const experiences = [
    {
      company: 'Unmarshal',
      role: 'Senior Software Engineer',
      date: 'April 2021 - Present',
      link: 'https://unmarshal.io/',
      points: [
        'Architected core blockchain data indexing solution, supporting 500M+ API requests monthly.',
        'Developed "Unmarshal Parser," a zero-code indexer for smart contract data retrieval.',
        'Designed a Web3 notification engine delivering real-time blockchain event updates.',
        'Led development of "Xscan," a cross-chain block explorer.',
        'Configured observability stack (Grafana, Loki, Prometheus).'
      ]
    },
    {
      company: 'Navi Technologies Pvt Ltd',
      role: 'SDE-2',
      date: 'Dec 2019 - March 2021',
      link: 'https://navi.com/',
      points: [
        'Built core accounting system for personal loans using Spring Boot, Kafka, and PostgreSQL.',
        'Automated loan collection systems, improving collection efficiency by 15%.',
        'Created internal operations portal using React JS and TypeScript.'
      ]
    },
    {
      company: 'MavenHive Technologies Pvt Ltd',
      role: 'Associate Developer',
      date: 'July 2018 - Nov 2019',
      points: [
        'Developed internal dashboard for CRED using React JS to streamline product management.',
        'Contributed to CultFit’s e-commerce inventory management system.',
        'Built a mobile-friendly web app using React JS and Apollo GraphQL.'
      ]
    }
  ]

  return (
    <section style={{ padding: '4rem 8%', minHeight: '100vh' }}>
      <h2 style={{ fontSize: '3rem', marginBottom: '4rem', textAlign: 'center' }}>
        <span className="gradient-text">Experience</span> Timeline
      </h2>

      <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="glass-panel"
            style={{ 
              borderLeft: '4px solid var(--accent-blue)', 
              borderRadius: '0 20px 20px 0',
              paddingLeft: '2.5rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'baseline', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.8rem', margin: 0, color: 'var(--text-main)' }}>
                {exp.company}
              </h3>
              <span style={{ color: 'var(--accent-purple)', fontWeight: 'bold' }}>{exp.date}</span>
            </div>
            
            <h4 style={{ fontSize: '1.2rem', color: 'var(--accent-teal)', marginTop: 0, marginBottom: '1.5rem' }}>
              {exp.role} {exp.link && <a href={exp.link} target="_blank" rel="noreferrer" style={{ fontSize: '0.9rem', marginLeft: '10px' }}>(Website)</a>}
            </h4>

            <ul style={{ paddingLeft: '20px', margin: 0, color: 'var(--text-muted)' }}>
              {exp.points.map((pt, i) => (
                <li key={i} style={{ marginBottom: '10px', lineHeight: '1.6' }}>{pt}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
