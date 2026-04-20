"use client";
import React from "react";
import { motion } from "framer-motion";

const principles = [
  {
    number: "01",
    title: "If it’s confusing, it’s not done.",
    body: "Complexity is fine. Confusion isn’t. The job is to make things clear enough that people don’t have to think about them.",
  },
  {
    number: "02",
    title: "Constraints are where the good ideas are.",
    body: "Deadlines, technical limits, weird edge cases, this is the real brief. Working within it is the job, not a blocker.",
  },
  {
    number: "03",
    title: "You can’t think your way to the right answer.",
    body: "At some point you have to put something in front of people and see what happens. That’s when the real learning starts.",
  },
  {
    number: "04",
    title: "The team is the product.",
    body: "How people work together shows up in the final experience. Trust, honesty, and low ego aren’t nice-to-haves, they’re how good work happens.",
  },
];

export function About() {
  return (
    <section id="about" className="w-full py-24 md:py-32 bg-near-black border-b border-[#30302e]">
      <div className="container-wide container-wide-padded">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="max-w-2xl mb-20"
        >
          <p className="label-overline text-warm-silver mb-4">About</p>
          <h2
            className="heading-section mb-7"
            style={{ color: "#faf9f5" }}
          >
            I care about the end result, but I’m more interested in how it gets made.{" "}
          </h2>
          <p
            className="body-large"
            style={{ color: "var(--color-warm-silver)" }}
          >
            I’ve spent the past decade working on products where things aren’t 
            clearly defined and rarely go to plan. That’s usually where the interesting problems are.
            <br></br><br></br>My role tends to sit somewhere between designer, translator, and occasionally therapist, understanding the system, aligning the people, and helping the team move forward. I like being close to the work while also shaping where it’s going. Big picture, small details, whatever’s needed to get to a good outcome.
            <br></br><br></br>I’ve worked across startups and large organizations, in industries ranging from telecom to entertainment to aerospace. The common thread is always the same: good teams make great products.
            <br></br><br></br>I’m a maker at heart! Outside of work, I like building things just to for, elaborate Halloween props, small 8-bit games, whatever holds my attention. I’m forever curious and love new challenges. At one point, I even applied to be a NASA astronaut, but still waiting on the call.
          </p>
        </motion.div>

        {/* Principles */}
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="heading-section mb-7"
          style={{ color: "#faf9f5" }}
        >
          A few things I believe{" "}
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-dark-surface">
          {principles.map((p, i) => (
            <motion.div
              key={p.number}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.65,
                ease: "easeOut",
                delay: i * 0.11,
              }}
              className="bg-near-black p-8 md:p-10"
            >
              <span className="label-overline text-[#5e5d59] mb-4 block">
                {p.number}
              </span>
              <h3
                className="heading-feature mb-3"
                style={{ color: "#faf9f5", fontFamily: "var(--font-serif)" }}
              >
                {p.title}
              </h3>
              <p
                className="text-[14px] font-sans leading-relaxed"
                style={{ color: "var(--color-warm-silver)" }}
              >
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
