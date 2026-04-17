import Link from "next/link";
import {
  profile,
  experience,
  skills,
  education,
  certifications,
} from "@/data/profile";
import type { Job, Skill } from "@/data/profile";
import { ScrollReveal } from "@/components/scroll-reveal";

/* ── Helper components ─────────────────────────────── */

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="section-heading mb-12">{children}</h2>;
}

function JobCard({ job, index }: { job: Job; index: number }) {
  return (
    <ScrollReveal delay={index * 120}>
      <div className="relative pl-8 border-l-2 border-border">
        {/* accent dot */}
        <span className="absolute -left-[7px] top-0 size-3 rounded-full bg-accent-dim border-2 border-bg" />

        <div className="bg-bg-surface border border-border rounded-xl p-8 glow-card">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-5">
            <div>
              <h3 className="font-display text-xl font-bold text-fg">
                {job.title}
              </h3>
              <p className="font-mono text-accent-dim text-sm">{job.company}</p>
            </div>
            <span className="shrink-0 rounded-full bg-bg border border-border px-3 py-1 font-mono text-xs text-fg-dim">
              {job.period}
            </span>
          </div>

          <ul className="space-y-2">
            {job.highlights.map((highlight, i) => (
              <li
                key={i}
                className="text-fg-dim text-sm leading-relaxed pl-5 relative before:content-['▹'] before:absolute before:left-0 before:text-accent-dim"
              >
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ScrollReveal>
  );
}

function SkillCategory({ skill, index }: { skill: Skill; index: number }) {
  return (
    <ScrollReveal delay={index * 100}>
      <div>
        <h3 className="font-display text-sm font-bold text-fg uppercase tracking-wider mb-4">
          {skill.category}
        </h3>
        <div className="flex flex-wrap gap-2">
          {skill.items.map((item) => (
            <span
              key={item}
              className="bg-bg-surface border border-border rounded-full px-4 py-1.5 text-xs font-mono text-fg-dim hover:border-accent-dim hover:text-accent transition-all duration-300"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}

/* ── Page ───────────────────────────────────────────── */

export default function Home() {
  const [firstName, lastName] = profile.name.split(" ");

  return (
    <main>
      {/* ── Hero ──────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden grid-bg scan-lines">
        <div className="max-w-6xl mx-auto px-6 w-full pt-28 pb-20">
          {/* decorative mono label */}
          <p className="font-mono text-fg-dim text-sm mb-8 animate-text-reveal">
            {"// cybersecurity engineer"}
          </p>

          {/* terminal cursor */}
          <p
            className="font-mono text-accent text-2xl mb-4 animate-text-reveal"
            style={{ animationDelay: "150ms" }}
          >
            {">"}_<span className="animate-blink">|</span>
          </p>

          {/* name */}
          <h1 className="font-display font-extrabold tracking-tight text-fg">
            <span
              className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl animate-text-reveal"
              style={{ animationDelay: "300ms" }}
            >
              {firstName}
            </span>
            <span
              className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl animate-text-reveal"
              style={{ animationDelay: "450ms" }}
            >
              {lastName}
            </span>
          </h1>

          {/* title */}
          <p
            className="text-accent font-mono text-xl mt-4 animate-text-reveal"
            style={{ animationDelay: "600ms" }}
          >
            {profile.title}
          </p>

          {/* tagline */}
          <p
            className="text-fg-dim max-w-xl text-lg font-body leading-relaxed mt-6 animate-text-reveal"
            style={{ animationDelay: "750ms" }}
          >
            {profile.tagline}
          </p>

          {/* CTA buttons */}
          <div
            className="flex flex-wrap gap-4 mt-10 animate-text-reveal"
            style={{ animationDelay: "900ms" }}
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 border border-accent text-accent rounded-lg px-6 py-3 font-mono text-sm hover:bg-accent hover:text-bg transition-all duration-300"
            >
              View Projects
            </Link>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 border border-border text-fg-dim rounded-lg px-6 py-3 font-mono text-sm hover:text-accent hover:border-accent-dim transition-all duration-300"
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* decorative 3x3 grid — bottom right */}
        <div className="absolute bottom-16 right-10 grid grid-cols-3 gap-1 opacity-60">
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={i}
              className="block size-2 rounded-[1px] bg-accent-dim/40"
            />
          ))}
        </div>

        {/* scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-fg-dim text-sm animate-bounce">
          <span className="font-mono text-xs">scroll</span>
          <span>↓</span>
        </div>
      </section>

      {/* ── About ─────────────────────────────────── */}
      <section id="about" className="py-24 max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeading>About</SectionHeading>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* left — pull quote */}
          <div className="md:col-span-2">
            <ScrollReveal delay={100}>
              <blockquote className="accent-line pl-6">
                <p className="font-display text-2xl text-fg leading-snug">
                  &ldquo;I focus on making the secure path the easiest
                  path.&rdquo;
                </p>
              </blockquote>
            </ScrollReveal>
          </div>

          {/* right — full about text */}
          <div className="md:col-span-3 space-y-6">
            {profile.about.map((paragraph, i) => (
              <ScrollReveal key={i} delay={150 + i * 100}>
                <p className="text-fg-dim leading-relaxed">{paragraph}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Experience ────────────────────────────── */}
      <section id="experience" className="py-24 max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeading>Experience</SectionHeading>
        </ScrollReveal>

        <div className="space-y-8">
          {experience.map((job, i) => (
            <JobCard key={i} job={job} index={i} />
          ))}
        </div>
      </section>

      {/* ── Skills ────────────────────────────────── */}
      <section id="skills" className="py-24 max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeading>Skills</SectionHeading>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {skills.map((skill, i) => (
            <SkillCategory key={skill.category} skill={skill} index={i} />
          ))}
        </div>
      </section>

      {/* ── Education & Certifications ────────────── */}
      <section id="education" className="py-24 max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeading>Education &amp; Certifications</SectionHeading>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          <div className="md:col-span-2 space-y-6">
            <ScrollReveal delay={100}>
              <h3 className="font-display text-sm font-bold text-fg uppercase tracking-wider mb-4">
                Education
              </h3>
            </ScrollReveal>
            {education.map((ed, i) => (
              <ScrollReveal key={ed.school} delay={150 + i * 100}>
                <div className="bg-bg-surface border border-border rounded-xl p-5 glow-card">
                  <p className="font-display text-lg font-bold text-fg">
                    {ed.school}
                  </p>
                  <p className="font-mono text-accent-dim text-sm mt-1">
                    {ed.degree}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="md:col-span-3">
            <ScrollReveal delay={100}>
              <h3 className="font-display text-sm font-bold text-fg uppercase tracking-wider mb-4">
                Certifications
              </h3>
            </ScrollReveal>
            <div className="flex flex-wrap gap-2">
              {certifications.map((cert, i) => (
                <ScrollReveal key={cert} delay={150 + i * 80}>
                  <span className="bg-bg-surface border border-border rounded-full px-4 py-1.5 text-xs font-mono text-fg-dim hover:border-accent-dim hover:text-accent transition-all duration-300">
                    {cert}
                  </span>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────── */}
      <footer className="border-t border-border py-12 mt-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-fg-dim font-mono text-xs">
            &copy; 2026 {profile.name}
          </p>

          <p className="text-fg-dim/30 font-mono text-[10px] hidden sm:block">
            {"// built with next.js + tailwind"}
          </p>

          <div className="flex items-center gap-6">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg-dim hover:text-accent transition-colors text-sm font-mono"
            >
              GitHub
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg-dim hover:text-accent transition-colors text-sm font-mono"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
