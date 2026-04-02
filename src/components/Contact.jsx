import { FaEnvelope, FaPhone } from 'react-icons/fa'

export function Contact() {
  return (
    <section style={{ 
      minHeight: '60vh', 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center', 
      padding: '4rem 8%',
      textAlign: 'center'
    }}>
      <div
        className="glass-panel"
        style={{ maxWidth: '600px', width: '100%', padding: '3rem' }}
      >
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', marginTop: 0 }}>
          Let's <span className="gradient-text">Connect</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.1rem' }}>
          Interested in working together or have a question? Let's connect and build the next big thing in Web3.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          <a href="mailto:pujithcareerventure@gmail.com" 
             style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', color: 'var(--text-main)' }}>
            <FaEnvelope size={30} color="var(--accent-teal)" />
            pujithcareerventure@gmail.com
          </a>
          <a href="tel:+919741283118" 
             style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', color: 'var(--text-main)' }}>
            <FaPhone size={30} color="var(--accent-blue)" />
            +91 9741283118
          </a>
        </div>
      </div>

      <footer style={{ marginTop: '4rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        © {new Date().getFullYear()} Pujith M. Built with React Three Fiber.
      </footer>
    </section>
  )
}
