import { ArrowLeft } from 'lucide-react';

interface VoucherProps {
  onBack: () => void;
}

export default function Voucher({ onBack }: VoucherProps) {
  return (
    <div className="ticket-wrapper scale-up">
      <div className="ticket">
        {/* Rotating Sunflower */}
        <div className="sunflower-logo-container">
          <svg className="sunflower-graphic" viewBox="0 0 100 100">
            <defs>
              <filter id="shadow">
                <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.15"/>
              </filter>
            </defs>
            <g fill="#eab308">
              <ellipse cx="50" cy="20" rx="6" ry="18" transform="rotate(0 50 50)" />
              <ellipse cx="50" cy="20" rx="6" ry="18" transform="rotate(20 50 50)" />
              <ellipse cx="50" cy="20" rx="6" ry="18" transform="rotate(40 50 50)" />
              <ellipse cx="50" cy="20" rx="6" ry="18" transform="rotate(60 50 50)" />
              <ellipse cx="50" cy="20" rx="6" ry="18" transform="rotate(80 50 50)" />
              <ellipse cx="50" cy="20" rx="6" ry="18" transform="rotate(100 50 50)" />
              <ellipse cx="50" cy="20" rx="6" ry="18" transform="rotate(120 50 50)" />
              <ellipse cx="50" cy="20" rx="6" ry="18" transform="rotate(140 50 50)" />
              <ellipse cx="50" cy="20" rx="6" ry="18" transform="rotate(160 50 50)" />
              <ellipse cx="50" cy="20" rx="6" ry="18" transform="rotate(180 50 50)" />
              <ellipse cx="50" cy="20" rx="6" ry="18" transform="rotate(200 50 50)" />
              <ellipse cx="50" cy="20" rx="6" ry="18" transform="rotate(220 50 50)" />
              <ellipse cx="50" cy="20" rx="6" ry="18" transform="rotate(240 50 50)" />
              <ellipse cx="50" cy="20" rx="6" ry="18" transform="rotate(260 50 50)" />
              <ellipse cx="50" cy="20" rx="6" ry="18" transform="rotate(280 50 50)" />
              <ellipse cx="50" cy="20" rx="6" ry="18" transform="rotate(300 50 50)" />
              <ellipse cx="50" cy="20" rx="6" ry="18" transform="rotate(320 50 50)" />
              <ellipse cx="50" cy="20" rx="6" ry="18" transform="rotate(340 50 50)" />
            </g>
            <circle cx="50" cy="50" r="16" fill="#78350f" filter="url(#shadow)" />
            <circle cx="50" cy="50" r="12" fill="#451a03" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,3" />
          </svg>
        </div>

        {/* Voucher Header */}
        <div className="voucher-header">
          <h2 className="voucher-title">Sunflower Voucher</h2>
          <div className="voucher-badge">
            <span className="badge-dot" style={{ backgroundColor: '#eab308', boxShadow: '0 0 8px #eab308' }} />
            Gift Card
          </div>
        </div>

        <div className="ticket-divider" />

        {/* Van Gogh Sunflower Image */}
        <div 
          className="sunflower-art-container" 
          style={{ 
            margin: '0 auto 20px', 
            overflow: 'hidden', 
            borderRadius: '16px', 
            border: '1px solid rgba(124, 58, 237, 0.1)',
            boxShadow: 'var(--shadow-sm)',
            maxWidth: '260px'
          }}
        >
          <img 
            src="/van_gogh_sunflowers.jpg" 
            alt="Vincent van Gogh's Sunflowers" 
            style={{ 
              width: '100%', 
              height: 'auto',
              display: 'block'
            }} 
          />
        </div>

        {/* Custom text block in clean sans-serif font */}
        <div 
          className="voucher-message-container" 
          style={{ 
            padding: '10px 18px', 
            margin: '0 0 10px', 
            textAlign: 'center'
          }}
        >
          <p style={{ 
            fontFamily: 'var(--sans)',
            fontSize: '1.05rem',
            fontWeight: '400',
            color: 'var(--text-dark)',
            lineHeight: '1.65',
            margin: '0'
          }}>
            You have one unclaimed sunflower. You can redeem it whenever you'd like it delivered or when we meet.
          </p>
        </div>

        {/* Voucher Footer */}
        <div className="voucher-footer">
          <div className="footer-meta" style={{ textAlign: 'left' }}>
            <span className="meta-label">Expires</span>
            <span className="meta-value">Never</span>
          </div>
          <div className="footer-meta" style={{ textAlign: 'right' }}>
            <span className="meta-label">Voucher ID</span>
            <span className="meta-value">4NG-G4L1NG-N1-L0VEL</span>
          </div>
        </div>
      </div>

      {/* Screenshot Helper Note - Moved outside the ticket card */}
      <p style={{ 
        fontFamily: 'var(--sans)',
        fontSize: '0.8rem', 
        color: 'var(--text-muted)', 
        textAlign: 'center',
        margin: '15px 0 5px',
        opacity: 0.8
      }}>
        Take a screenshot to save your voucher
      </p>

      {/* Return to greeting */}
      <button type="button" className="btn-back" onClick={onBack}>
        <ArrowLeft size={16} />
        Back
      </button>
    </div>
  );
}
