"use client";

import { useMotionValue, useSpring, useTransform } from "framer-motion";

export function useTilt() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXRaw = useMotionValue(0);
  const mouseYRaw = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const glow = useTransform(
    [mouseXRaw, mouseYRaw],
    ([mx, my]) => `radial-gradient(400px circle at ${mx}px ${my}px, rgba(139, 92, 246, 0.1), transparent 80%)`
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
    mouseXRaw.set(mouseX);
    mouseYRaw.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    mouseXRaw.set(-1000);
    mouseYRaw.set(-1000);
  };

  return { rotateX, rotateY, glow, handleMouseMove, handleMouseLeave };
}
