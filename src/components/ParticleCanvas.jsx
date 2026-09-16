import React, { useEffect, useRef } from 'react';

/**
 * Animated Canvas Overlay for ambient atmosphere
 * Types: 'golden' (dust/sparkles), 'night' (fireflies/stars), 'leaves' (floating leaves), 'hearts' (floating hearts)
 */
export default function ParticleCanvas({ type = 'golden', density = 35 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Create particles
    const particles = Array.from({ length: density }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * (type === 'night' ? 3.5 : 4) + 1,
      speedX: (Math.random() - 0.5) * 0.6,
      speedY: type === 'leaves' ? Math.random() * 0.8 + 0.3 : (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.7 + 0.3,
      pulseSpeed: Math.random() * 0.02 + 0.008,
      pulseDir: 1,
      angle: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
    }));

    const drawParticle = (p) => {
      ctx.save();
      ctx.globalAlpha = p.opacity;

      if (type === 'night') {
        // Glowing Fireflies
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.5);
        gradient.addColorStop(0, 'rgba(253, 224, 71, 1)');
        gradient.addColorStop(0.5, 'rgba(234, 179, 8, 0.4)');
        gradient.addColorStop(1, 'rgba(234, 179, 8, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        ctx.fill();
      } else if (type === 'hearts') {
        // Floating Heart Particles
        ctx.translate(p.x, p.y);
        ctx.fillStyle = '#f472b6';
        ctx.beginPath();
        const s = p.size;
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-s, -s, -s * 2, s / 2, 0, s * 1.8);
        ctx.bezierCurveTo(s * 2, s / 2, s, -s, 0, 0);
        ctx.fill();
      } else if (type === 'leaves') {
        // Falling Soft Leaves
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = '#52b788';
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 2, p.size, 0, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Golden Magic Dust
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        gradient.addColorStop(0, 'rgba(254, 240, 138, 1)');
        gradient.addColorStop(0.6, 'rgba(245, 158, 11, 0.6)');
        gradient.addColorStop(1, 'rgba(245, 158, 11, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Update positions
        p.x += p.speedX;
        p.y += p.speedY;
        p.angle += p.rotationSpeed;

        // Twinkle/pulse opacity
        p.opacity += p.pulseSpeed * p.pulseDir;
        if (p.opacity > 0.95 || p.opacity < 0.25) {
          p.pulseDir *= -1;
        }

        // Wrap boundaries
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        drawParticle(p);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [type, density]);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-10 h-full w-full" />;
}
