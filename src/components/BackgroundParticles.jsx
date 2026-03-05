import { useMemo, useState, useEffect } from "react";
import "../styles/particles.css";

const BackgroundParticles = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Generate particles with random properties (only on desktop)
  const particles = useMemo(() => {
    if (isMobile) return [];
    
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 5 + 2, // 2px to 7px
      duration: Math.random() * 20 + 25, // 25s to 45s
      delay: Math.random() * 8, // 0s to 8s stagger
      moveDistance: Math.random() * 150 + 50, // 50px to 200px movement
      angle: Math.random() * 360, // random direction
      opacity: Math.random() * 0.4 + 0.2, // 0.2 to 0.6
    }));
  }, [isMobile]);

  return (
    <div className="background-particles-wrapper">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            "--duration": `${particle.duration}s`,
            "--delay": `${particle.delay}s`,
            "--move-distance": `${particle.moveDistance}px`,
            "--angle": `${particle.angle}deg`,
            "--opacity": particle.opacity,
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundParticles;