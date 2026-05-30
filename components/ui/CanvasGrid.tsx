'use client';

import React, { useEffect, useRef } from 'react';

export default function CanvasGrid() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates
    const mouse = { x: -1000, y: -1000, active: false };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Glimmering grid intersection points
    const gridSize = 64; // Grid sizing
    interface IntersectionPoint {
      x: number;
      y: number;
      targetAlpha: number;
      alpha: number;
      speed: number;
    }

    const points: IntersectionPoint[] = [];
    const cols = Math.ceil(width / gridSize);
    const rows = Math.ceil(height / gridSize);

    for (let c = 0; c <= cols; c++) {
      for (let r = 0; r <= rows; r++) {
        points.push({
          x: c * gridSize,
          y: r * gridSize,
          targetAlpha: 0,
          alpha: 0,
          speed: 0.01 + Math.random() * 0.02,
        });
      }
    }

    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.005;

      // Draw background
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);

      // Draw grid lines
      ctx.strokeStyle = 'rgba(26, 60, 110, 0.04)';
      ctx.lineWidth = 1;

      // Vertical lines
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        // Add subtle waves using sin
        const offset = Math.sin(time + x * 0.005) * 8;
        ctx.moveTo(x + offset, 0);
        ctx.lineTo(x + offset, height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        const offset = Math.cos(time + y * 0.005) * 8;
        ctx.moveTo(0, y + offset);
        ctx.lineTo(width, y + offset);
        ctx.stroke();
      }

      // Mouse interactive spotlight radial gradient
      if (mouse.active) {
        const glow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          350
        );
        glow.addColorStop(0, 'rgba(0, 168, 232, 0.08)');
        glow.addColorStop(0.5, 'rgba(26, 60, 110, 0.03)');
        glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, width, height);
      }

      // Draw elegant glimmers at grid points
      points.forEach((p) => {
        // Occasionally trigger new glimmer targets
        if (Math.random() < 0.002) {
          p.targetAlpha = Math.random() * 0.8;
        }
        if (Math.random() < 0.004 && p.targetAlpha > 0) {
          p.targetAlpha = 0;
        }

        // Move alpha towards target
        p.alpha += (p.targetAlpha - p.alpha) * p.speed;

        if (p.alpha > 0.01) {
          ctx.beginPath();
          // Draw subtle circular glow
          ctx.arc(p.x, p.y, 2 + p.alpha * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 168, 232, ${p.alpha * 0.6})`;
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: 'multiply' }}
    />
  );
}
