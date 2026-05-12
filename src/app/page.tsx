import Link from "next/link";
import {
  profile,
  experience,
  skills,
  education,
  certifications,
  howIWork,
} from "@/data/profile";
import type { Job, Skill } from "@/data/profile";
import { ScrollReveal } from "@/components/scroll-reveal";
import { getVariant } from "@/config/variants";

const variant = getVariant();

// Sort skills according to the active variant — AI Tools first on the AI-SWE
// site, security first on the cybersec/prodsec sites, unlisted categories go
// to the bottom.
const orderedSkills: Skill[] = [
  ...variant.skillsOrder
    .map((cat) => skills.find((s) => s.category === cat))
    .filter((s): s is Skill => Boolean(s)),
  ...skills.filter((s) => !variant.skillsOrder.includes(s.category)),
];

/* ── Helper components ─────────────────────────────── */

function SectionHeading({
  kicker,
  title,
  index,
  total,
}: {
  kicker: string;
  title: string;
  index: number;
  total: number;
}) {
  const padded = String(index).padStart(2, "0");
  const totalPadded = String(total).padStart(2, "0");
  return (
    <div className="section-heading-block">
      <p className="section-kicker">
        <span className="section-kicker-index" aria-hidden>
          {padded} / {totalPadded}
        </span>
        <span>{kicker}</span>
      </p>
      <h2 className="section-title">{title}</h2>
    </div>
  );
}

function JobCard({ job, index }: { job: Job; index: number }) {
  return (
    <ScrollReveal delay={Math.min(index * 120, 400)}>
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
                className="text-fg-dim text-sm leading-relaxed flex items-start gap-2.5"
              >
                <span
                  className="bg-accent shrink-0 size-1.5 mt-2"
                  aria-hidden
                />
                <span>{highlight}</span>
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
    <ScrollReveal delay={Math.min(index * 100, 400)}>
      <div className="break-inside-avoid mb-10">
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

  // Section index/total — How I Work only renders on the AI-SWE variant, so
  // the count varies. About → Experience → Skills → Credentials is shared.
  const sections = variant.showHowIWork
    ? [
        { id: "about", kicker: "// about", title: "Background" },
        { id: "how-i-work", kicker: "// how I work", title: "AI-augmented engineering" },
        { id: "experience", kicker: "// experience", title: "Where I've shipped" },
        { id: "skills", kicker: "// skills", title: "What I reach for" },
        { id: "education", kicker: "// credentials", title: "Education & certifications" },
      ]
    : [
        { id: "about", kicker: "// about", title: "Background" },
        { id: "experience", kicker: "// experience", title: "Where I've shipped" },
        { id: "skills", kicker: "// skills", title: "What I reach for" },
        { id: "education", kicker: "// credentials", title: "Education & certifications" },
      ];
  const total = sections.length;
  const idx = (id: string) => sections.findIndex((s) => s.id === id) + 1;
  const sec = (id: string) => sections.find((s) => s.id === id)!;

  return (
    <main>
      {/* ── Hero ──────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden grid-bg scan-lines">
        <div className="max-w-6xl mx-auto px-6 w-full pt-28 pb-20">
          {/* decorative mono label */}
          <p className="font-mono text-fg-dim text-sm mb-8 animate-text-reveal">
            {`// ${variant.heroTitle.toLowerCase()}`}
          </p>

          {/* terminal cursor */}
          <p
            className="font-mono text-accent text-2xl mb-4 animate-text-reveal"
            style={{ animationDelay: "150ms" }}
          >
            <span className="hero-cursor">
              {">"}_<span className="animate-blink">|</span>
            </span>
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

          {/* title — static per variant (each site commits to one role) */}
          <p
            className="text-accent font-mono text-xl mt-4 animate-text-reveal"
            style={{ animationDelay: "600ms" }}
          >
            {variant.heroTitle}
          </p>

          {/* tagline */}
          <p
            className="text-fg-dim max-w-xl text-lg font-body leading-relaxed mt-6 animate-text-reveal"
            style={{ animationDelay: "750ms" }}
          >
            {variant.tagline}
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
            <Link
              href="/resume"
              className="inline-flex items-center gap-2 border border-border text-fg-dim rounded-lg px-6 py-3 font-mono text-sm hover:text-accent hover:border-accent-dim transition-all duration-300"
            >
              Download Resume
            </Link>
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
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-fg-dim text-sm animate-bounce">
          <span className="font-mono text-xs">scroll</span>
          <span>↓</span>
        </div>
      </section>

      {/* ── About ─────────────────────────────────── */}
      <section id="about" className="py-24 max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeading
            kicker={sec("about").kicker}
            title={sec("about").title}
            index={idx("about")}
            total={total}
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* left — pull quote */}
          <div className="md:col-span-2">
            <ScrollReveal delay={100}>
              <blockquote className="accent-line pl-6">
                <p className="font-display italic text-[2rem] text-fg leading-snug">
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

      {/* ── How I Work (AI-SWE site only) ─────────── */}
      {variant.showHowIWork && (
        <section id="how-i-work" className="py-24 max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <SectionHeading
              kicker={sec("how-i-work").kicker}
              title={sec("how-i-work").title}
              index={idx("how-i-work")}
              total={total}
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
            <div className="md:col-span-3 space-y-6">
              <ScrollReveal delay={100}>
                <h3 className="font-display text-2xl text-fg leading-snug">
                  {howIWork.heading}
                </h3>
              </ScrollReveal>
              {howIWork.paragraphs.map((p, i) => (
                <ScrollReveal key={i} delay={150 + i * 100}>
                  <p className="text-fg-dim leading-relaxed">{p}</p>
                </ScrollReveal>
              ))}
            </div>

            <div className="md:col-span-2">
              <ScrollReveal delay={200}>
                <blockquote className="accent-line pl-6">
                  <p className="font-display text-xl text-fg leading-snug">
                    &ldquo;{howIWork.pullQuote}&rdquo;
                  </p>
                </blockquote>
              </ScrollReveal>
            </div>
          </div>
        </section>
      )}

      {/* ── Experience ────────────────────────────── */}
      <section id="experience" className="py-24 max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeading
            kicker={sec("experience").kicker}
            title={sec("experience").title}
            index={idx("experience")}
            total={total}
          />
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
          <SectionHeading
            kicker={sec("skills").kicker}
            title={sec("skills").title}
            index={idx("skills")}
            total={total}
          />
        </ScrollReveal>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-10">
          {orderedSkills.map((skill, i) => (
            <SkillCategory key={skill.category} skill={skill} index={i} />
          ))}
        </div>
      </section>

      {/* ── Education & Certifications ────────────── */}
      <section id="education" className="py-24 max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeading
            kicker={sec("education").kicker}
            title={sec("education").title}
            index={idx("education")}
            total={total}
          />
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
                <ScrollReveal key={cert} delay={150 + Math.min(i * 80, 250)}>
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
            <Link
              href="/resume"
              className="text-fg-dim hover:text-accent transition-colors text-sm font-mono"
            >
              Resume
            </Link>
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

        {/* Cross-site variant links */}
        <div className="max-w-6xl mx-auto px-6 mt-8 pt-6 border-t border-border/40">
          <p className="text-fg-dim/60 font-mono text-[11px] text-center">
            {`// this is the ${variant.heroTitle.toLowerCase()} version — also available: `}
            {variant.crossLinks.map((link, i) => (
              <span key={link.url}>
                <a
                  href={link.url}
                  className="text-fg-dim hover:text-accent transition-colors"
                >
                  {link.label} <span aria-hidden>&rarr;</span>
                </a>
                {i < variant.crossLinks.length - 1 && (
                  <span className="text-fg-dim/30">{" · "}</span>
                )}
              </span>
            ))}
          </p>
        </div>
      </footer>
    </main>
  );
}
