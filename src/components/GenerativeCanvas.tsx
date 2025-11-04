import { useEffect, useRef } from "react";
import styles from "./GenerativeCanvas.module.css";

type GenerativeCanvasProps = {
  palette: string[];
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
};

const PARTICLE_COUNT = 64;

function randomFromPalette(palette: string[]) {
  return palette[Math.floor(Math.random() * palette.length)];
}

const GenerativeCanvas = ({ palette }: GenerativeCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    const resize = () => {
      const container = canvas.parentElement;
      if (!container) return;
      const { width, height } = container.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const seedParticles = () => {
      const container = canvas.parentElement;
      if (!container) return;
      const { width, height } = container.getBoundingClientRect();
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.15 + Math.random() * 0.35;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 18 + Math.random() * 42,
          color: randomFromPalette(palette)
        };
      });
    };

    resize();
    seedParticles();

    const animate = () => {
      const container = canvas.parentElement;
      if (!container) return;
      const { width, height } = container.getBoundingClientRect();

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";

      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < -particle.radius) particle.x = width + particle.radius;
        if (particle.x > width + particle.radius) particle.x = -particle.radius;
        if (particle.y < -particle.radius) particle.y = height + particle.radius;
        if (particle.y > height + particle.radius) particle.y = -particle.radius;

        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          particle.radius * 0.1,
          particle.x,
          particle.y,
          particle.radius
        );
        gradient.addColorStop(0, `${particle.color}cc`);
        gradient.addColorStop(1, `${particle.color}00`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [palette]);

  useEffect(() => {
    particlesRef.current = particlesRef.current.map((particle) => ({
      ...particle,
      color: randomFromPalette(palette)
    }));
  }, [palette]);

  return (
    <div className={styles.canvasWrapper}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
};

export default GenerativeCanvas;
