"use client";

import { motion } from "framer-motion";

export default function FadeInUp({
  children,
  className = "",
  delay = 0,
  amount = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  amount?: number | "some" | "all";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1.0] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
