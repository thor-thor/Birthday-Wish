"use client";

import { useEffect, useRef } from "react";

export default function CursorHearts() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Check if device supports touch to avoid drawing trails on touchscreens
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0;

    if (isTouchDevice) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    const colors = ["#ec4899", "#f43f5e", "#d946ef", "#a855f7", "#eab308"];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class HeartParticle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 8 + 6;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 1.5 - 1; // drift upwards
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.01;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.05;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= this.decay;
        this.rotation += this.rotationSpeed;
      }

      draw(context) {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.rotation);
        context.globalAlpha = this.alpha;
        context.fillStyle = this.color;

        // Draw a heart path
        context.beginPath();
        const size = this.size;
        context.moveTo(0, size / 4);
        context.bezierCurveTo(
          -size / 2, -size / 2,
          -size, -size / 6,
          -size, size / 3
        );
        context.bezierCurveTo(
          -size, size * 0.7,
          -size * 0.2, size * 0.9,
          0, size
        );
        context.bezierCurveTo(
          size * 0.2, size * 0.9,
          size, size * 0.7,
          size, size / 3
        );
        context.bezierCurveTo(
          size, -size / 6,
          size / 2, -size / 2,
          0, size / 4
        );
        context.closePath();
        context.fill();

        context.restore();
      }
    }

    const handleMouseMove = (e) => {
      // Spawn particles per move event for optimization
      if (Math.random() < 0.4) {
        particles.push(new HeartParticle(e.clientX, e.clientY));
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        if (p.alpha <= 0) {
          particles.splice(i, 1);
        } else {
          p.draw(ctx);
        }
      }

      // Cap maximum particles for performance
      if (particles.length > 100) {
        particles.shift();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50 mix-blend-screen"
    />
  );
}
