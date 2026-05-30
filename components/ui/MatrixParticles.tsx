'use client';

import React, { useEffect, useRef } from 'react';

export default function MatrixParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Characters for digital rain
    const chars = "VYGRID01XY[]+-*<>/{}$%#".split("");
    const fontSize = 11;
    const columns = Math.floor(width / 20);

    // Columns state
    const drops: number[] = [];
    const speeds: number[] = [];
    for (let i = 0; i < columns; i++) {
      // Start with negative offsets so they don't fall in a single flat row
      drops[i] = Math.random() * -height * 0.5;
      speeds[i] = 1 + Math.random() * 1.5;
    }

    // Floating particles state
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
    }
    const particles: Particle[] = [];
    const particleCount = Math.min(75, Math.floor((width * height) / 18000));

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: 1 + Math.random() * 1.5,
        alpha: 0.15 + Math.random() * 0.3,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const draw = () => {
      // 1. Draw a semi-transparent screen mask in our base dark color (#0A0A0A)
      // This wipes the canvas slightly each frame, generating beautiful, smooth trailing streams
      ctx.fillStyle = 'rgba(10, 10, 10, 0.08)';
      ctx.fillRect(0, 0, width, height);

      // 2. Render falling Matrix character streams
      ctx.font = `${fontSize}px var(--font-ibm-plex), monospace`;
      
      for (let i = 0; i < columns; i++) {
        // Random character
        const char = chars[Math.floor(Math.random() * chars.length)];
        
        // Pick colors from our premium brand system
        // Standard: graphite grey (subtle)
        // Occasional: linen off-white
        // Rarest: sand-gold highlight
        const rand = Math.random();
        if (rand < 0.02) {
          ctx.fillStyle = '#C8B89A'; // Gold droplet
        } else if (rand < 0.1) {
          ctx.fillStyle = '#F5F0EB'; // White droplet
        } else {
          ctx.fillStyle = '#333333'; // Muted dark graphite
        }

        const x = i * 20;
        const y = drops[i];

        // Draw the character
        if (y > 0 && y < height) {
          ctx.fillText(char, x, y);
        }

        // Increment drop y coordinate by speed
        drops[i] += speeds[i];

        // Reset if it hits bottom with random delay
        if (y > height && Math.random() > 0.98) {
          drops[i] = -20;
          speeds[i] = 1 + Math.random() * 1.5;
        }
      }

      // 3. Render Drift Particles & Connective Coordinate Webs
      particles.forEach((p, idx) => {
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce borders
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Draw node dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        // Slightly gold or off-white node glow
        ctx.fillStyle = idx % 3 === 0 ? `rgba(200, 184, 154, ${p.alpha})` : `rgba(245, 240, 235, ${p.alpha * 0.8})`;
        ctx.fill();

        // Connect with thin digital web lines when close
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const lineAlpha = (1 - dist / 130) * 0.07;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = idx % 2 === 0 ? `rgba(200, 184, 154, ${lineAlpha})` : `rgba(255, 255, 255, ${lineAlpha * 0.8})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
