import { FaFileDownload, FaEnvelope } from 'react-icons/fa'

export function Hero() {
  return (
    <section style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      padding: '0 8%',
    }}>
      <div className="glass-panel" style={{ maxWidth: '800px', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <img 
            src="/PUJITH.jpeg" 
            alt="Pujith" 
            style={{ width: '140px', height: '140px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--accent-blue)' }} 
          />
          <div>
            <h1 style={{ fontSize: '3.5rem', margin: '0 0 0.5rem 0' }}>
              Hi, I'm <span className="gradient-text">Pujith M</span>
            </h1>
            <h2 style={{ fontSize: '1.4rem', color: 'var(--text-muted)', margin: 0 }}>
              Senior Software Engineer | Blockchain Expert
            </h2>
            <p style={{ display: 'flex', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
              Bengaluru, India
            </p>
          </div>
        </div>

        <p style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '2rem' }}>
          I architect and build scalable backend systems, robust blockchain indexing solutions, 
          and intuitive web applications. With a strong track record of designing high-availability APIs and 
          zero-code Web3 data retrieval tools, I'm passionate about engineering the future of decentralized tech.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="/resume.pdf" target="_blank" className="glass-panel" style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(20, 184, 166, 0.5)' }}>
            <FaFileDownload /> Resume
          </a>
          <a href="mailto:pujithcareerventure@gmail.com" className="glass-panel" style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaEnvelope /> Email Me
          </a>
          <a href="https://unmarshal.io/" target="_blank" rel="noreferrer" className="glass-panel" style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            Current Work
          </a>
        </div>
      </div>
    </section>
  )
}
