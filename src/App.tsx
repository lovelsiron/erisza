import { useState, useEffect, useRef } from 'react';
import Particles from './components/Particles';
import Voucher from './components/Voucher';
import confetti from 'canvas-confetti';
import { Volume2, VolumeX } from 'lucide-react';
import './App.css';

function App() {
  const [showGift, setShowGift] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.55); // Default to 55% volume level
  
  // Typing Effect state (Part 1 and Part 2)
  const [typedText, setTypedText] = useState({ part1: '', part2: '' });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize background audio
  useEffect(() => {
    const audio = new Audio('/slowdance.mp3');
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    // Autoplay song immediately upon load (catch browser autoplay block policies)
    audio.play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((err) => {
        console.warn("Autoplay blocked by browser. Music will start on user interaction.", err);
      });

    // Cleanup: pause audio on component unmount
    return () => {
      audio.pause();
    };
  }, []);

  // Sync mute state changes to the HTMLAudioElement
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Sync volume state changes to the HTMLAudioElement
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Typing effect logic
  useEffect(() => {
    if (showGift) return; // Only type on the greeting card screen

    const part1Str = "Happy Birthday, ";
    const part2Str = "Elyssa";
    let index1 = 0;
    let index2 = 0;
    let active = true;

    // Reset strings
    setTypedText({ part1: '', part2: '' });

    const typeCharacter = () => {
      if (!active) return;

      if (index1 < part1Str.length) {
        setTypedText((prev) => ({ ...prev, part1: part1Str.substring(0, index1 + 1) }));
        index1++;
        setTimeout(typeCharacter, 80); // 80ms typing speed
      } else if (index2 < part2Str.length) {
        setTypedText((prev) => ({ ...prev, part2: part2Str.substring(0, index2 + 1) }));
        index2++;
        setTimeout(typeCharacter, 110); // 110ms typing speed for name
      }
    };

    // Delay start of typing slightly to let the card slide-up/intro transition finish
    const startDelay = setTimeout(typeCharacter, 500);

    return () => {
      active = false;
      clearTimeout(startDelay);
    };
  }, [showGift]);

  const handleRevealGift = () => {
    setShowGift(true);
    
    // Trigger celebratory confetti on gift reveal
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#c084fc', '#a78bfa', '#eab308', '#fbcfe8', '#ffffff']
    });

    // Start playing background music on first reveal click
    if (audioRef.current && !isPlaying) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error("Audio playback blocked by browser policies until further interaction", err);
        });
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      // If sound control clicked but not playing yet, play it!
      if (!isPlaying) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.error(err);
          });
      }
      setIsMuted((prev) => !prev);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    
    // Automatically unmute if user adjusts volume up from 0
    if (newVol > 0 && isMuted) {
      setIsMuted(false);
    }
    // Automatically mute if user drags volume to 0
    if (newVol === 0 && !isMuted) {
      setIsMuted(true);
    }
  };

  return (
    <>
      {/* Floating Particles in Background */}
      <Particles />

      {/* Main Glass Card container */}
      <div className="glass-card float-slow fade-in">
        {!showGift ? (
          // Welcome / Greeting Card
          <div className="scale-up" style={{ width: '100%' }}>
            {/* Birthday Cake SVG */}
            <svg className="cake-graphic" viewBox="0 0 100 100" style={{ width: '95px', height: '95px', margin: '0 auto 10px', display: 'block' }}>
              <defs>
                <filter id="cake-shadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#7c3aed" floodOpacity="0.1" />
                </filter>
              </defs>
              {/* Sparkles around the cake */}
              <g fill="#c084fc" className="cake-sparkle" style={{ transformOrigin: '50px 50px' }}>
                <path d="M20,30 L22,33 L25,30 L22,27 Z" />
                <path d="M80,30 L82,33 L85,30 L82,27 Z" />
                <path d="M15,55 L17,58 L20,55 L17,52 Z" />
                <path d="M85,55 L87,58 L90,55 L87,52 Z" />
              </g>
              {/* Flame */}
              <path d="M50,13 C52,13 53.5,17 50,21 C46.5,17 48,13 50,13 Z" fill="#f59e0b" className="cake-flame" style={{ transformOrigin: '50px 21px' }} />
              {/* Candle */}
              <rect x="48.5" y="21" width="3" height="15" rx="1" fill="#a78bfa" />
              {/* Cake Base Plate */}
              <ellipse cx="50" cy="78" rx="35" ry="6" fill="#e9d5ff" />
              {/* Cake Bottom Layer */}
              <rect x="22" y="55" width="56" height="20" rx="4" fill="#fbcfe8" filter="url(#cake-shadow)" />
              {/* Frosting middle line */}
              <rect x="22" y="61" width="56" height="4" fill="#ffffff" opacity="0.9" />
              {/* Cake Top Layer */}
              <rect x="28" y="36" width="44" height="19" rx="4" fill="#f5f3ff" />
              {/* Frosting top drips */}
              <path d="M28,36 C30,36 32,39 34,39 C36,39 38,36 40,36 C42,36 44,39 46,39 C48,39 50,36 52,36 C54,36 56,39 58,39 C60,39 62,36 64,36 C66,36 68,39 72,36 L72,42 C72,42 68,44 64,42 C62,42 60,40 58,40 C56,40 54,42 52,42 C50,42 48,40 46,40 C44,40 42,42 40,42 C38,42 36,40 34,40 C32,40 30,42 28,42 Z" fill="#ffffff" opacity="0.9" />
              {/* Cherries/Sprinkles */}
              <circle cx="36" cy="33" r="2.5" fill="#f472b6" />
              <circle cx="50" cy="33" r="2.5" fill="#c084fc" />
              <circle cx="64" cy="33" r="2.5" fill="#f472b6" />
            </svg>

            <h1 className="greeting-title" style={{ marginBottom: '25px' }}>
              <span>{typedText.part1}</span>
              <span className="script-text">{typedText.part2}</span>
            </h1>

            <button 
              type="button" 
              className="btn-primary"
              onClick={handleRevealGift}
            >
              Open Your Gift
            </button>
          </div>
        ) : (
          // Voucher Card
          <Voucher onBack={() => setShowGift(false)} />
        )}
      </div>

      {/* Floating Sound Control Container */}
      <div className="sound-control-container">
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          value={isMuted ? 0 : volume} 
          onChange={handleVolumeChange} 
          className="volume-slider"
          aria-label="Volume slider"
          title="Adjust volume"
        />
        <button 
          type="button" 
          className="sound-toggle"
          onClick={toggleMute}
          title={isMuted ? "Unmute music" : "Mute music"}
          aria-label={isMuted ? "Unmute music" : "Mute music"}
        >
          {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
          {isPlaying && !isMuted && volume > 0 && (
            <div className="music-bars">
              <div className="music-bar active" />
              <div className="music-bar active" />
              <div className="music-bar active" />
            </div>
          )}
        </button>
      </div>
    </>
  );
}

export default App;
