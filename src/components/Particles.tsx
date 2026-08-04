import { useMemo } from 'react';

interface ParticleType {
  id: number;
  left: string;
  size: number;
  delay: string;
  duration: string;
  wobbleX: string;
  rot: string;
  color: string;
  type: 'petal' | 'heart' | 'sparkle';
}

export default function Particles() {
  const particles = useMemo(() => {
    const types: ('petal' | 'heart' | 'sparkle')[] = ['petal', 'heart', 'sparkle'];
    const colors = [
      '#c084fc', // purple
      '#e9d5ff', // light purple
      '#f472b6', // pink
      '#fbcfe8', // light pink
      '#fef08a', // pastel yellow (sunflower theme accent)
      '#ffffff', // white
    ];
    
    const list: ParticleType[] = [];
    for (let i = 0; i < 22; i++) {
      list.push({
        id: i,
        left: `${Math.random() * 100}%`,
        size: Math.floor(Math.random() * 16) + 12, // 12px to 28px
        delay: `${Math.random() * -15}s`, // start immediately at random points
        duration: `${Math.floor(Math.random() * 12) + 10}s`, // 10s to 22s
        wobbleX: `${Math.floor(Math.random() * 120) - 60}px`, // -60px to 60px wobble
        rot: `${Math.floor(Math.random() * 360) + 180}deg`, // rotation
        color: colors[Math.floor(Math.random() * colors.length)],
        type: types[Math.floor(Math.random() * types.length)],
      });
    }
    return list;
  }, []);

  return (
    <div className="particle-container">
      {particles.map((p) => {
        const style = {
          left: p.left,
          width: `${p.size}px`,
          height: `${p.size}px`,
          color: p.color,
          animationDelay: p.delay,
          animationDuration: p.duration,
          '--wobble-x': p.wobbleX,
          '--rot': p.rot,
        } as React.CSSProperties;

        return (
          <div key={p.id} className="particle" style={style}>
            {p.type === 'petal' && (
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '100%', height: '100%' }}>
                <path d="M12 2C8 6 8 12 12 22C16 12 16 6 12 2Z" />
              </svg>
            )}
            {p.type === 'heart' && (
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '100%', height: '100%' }}>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            )}
            {p.type === 'sparkle' && (
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '100%', height: '100%' }}>
                <path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z" />
              </svg>
            )}
          </div>
        );
      })}
    </div>
  );
}
