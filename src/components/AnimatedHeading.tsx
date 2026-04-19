"use client";

import { motion, Variants } from "framer-motion";
import { Oswald } from "next/font/google";
import React from "react";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

interface AnimatedHeadingProps {
  /** The text to animate. Supports \n for newlines and [word] for highlighting */
  text: string;
  className?: string;
  highlightClass?: string;
  element?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export default function AnimatedHeading({
  text,
  className = "",
  highlightClass = "text-[#F5B301]",
  element: Element = "h2",
}: AnimatedHeadingProps) {
  const tokens: { word: string; isHighlight: boolean; isBreak: boolean }[] = [];

  const lines = text.split("\n");
  lines.forEach((line, lineIdx) => {
    // Split line by bracketed text or regular text
    const parts = line.split(/(\[[^\]]+\])/g);

    parts.forEach((part) => {
      if (part.startsWith("[") && part.endsWith("]")) {
        const phrase = part.slice(1, -1);
        phrase.split(" ").forEach((w) => {
          if (w) tokens.push({ word: w, isHighlight: true, isBreak: false });
        });
      } else {
        part.split(" ").forEach((w) => {
          if (w) tokens.push({ word: w, isHighlight: false, isBreak: false });
        });
      }
    });

    if (lineIdx < lines.length - 1) {
      tokens.push({ word: "", isHighlight: false, isBreak: true });
    }
  });

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1], // Smooth, elegant ease-out
      },
    },
    hidden: {
      opacity: 0,
      y: 10,
    },
  };

  return (
    <Element className={`${oswald.className} ${className}`}>
      <motion.span
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        style={{ display: "inline-block" }}
      >
        {tokens.map((token, index) => {
          if (token.isBreak) {
            return <br key={index} />;
          }

          return (
            <motion.span
              variants={child}
              key={index}
              className={`inline-block mr-[0.25em] ${
                token.isHighlight ? highlightClass : ""
              }`}
            >
              {token.word}
            </motion.span>
          );
        })}
      </motion.span>
    </Element>
  );
}
