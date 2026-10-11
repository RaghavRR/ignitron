
import React from 'react';
import { Link } from 'react-router-dom';
import { whyIgnitron } from './solutionData';

const processSteps = [
  { title: 'Understand', description: 'Identify your goals, learners and challenges.' },
  { title: 'Design', description: 'Plan a practical solution for your school.' },
  { title: 'Implement', description: 'Turn the plan into hands-on learning.' },
  { title: 'Support', description: 'Help your team keep improving.' },
];

function StemIllustration() {
  return (
    <div className="relative min-h-[340px] overflow-hidden bg-[#0d1729] sm:min-h-[430px] lg:min-h-[490px]">
      {/* Circuit grid background */}
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.16) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="absolute left-1/2 top-[40%] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/20 blur-3xl" />

      {/* Orbit rings */}
      <div className="absolute left-1/2 top-[42%] h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-300/30 sm:h-60 sm:w-60" />
      <div className="absolute left-1/2 top-[42%] h-32 w-56 -translate-x-1/2 -translate-y-1/2 rotate-[-30deg] rounded-[50%] border-2 border-orange-400/70 sm:h-40 sm:w-72" />
      <div className="absolute left-1/2 top-[42%] h-32 w-56 -translate-x-1/2 -translate-y-1/2 rotate-[30deg] rounded-[50%] border-2 border-sky-300/60 sm:h-40 sm:w-72" />

      {/* Central STEM chip */}
      <div className="absolute left-1/2 top-[42%] flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[26px] border border-orange-200/60 bg-gradient-to-br from-orange-400 to-orange-600 shadow-[0_0_65px_rgba(249,115,22,.35)] sm:h-28 sm:w-28">
        <svg viewBox="0 0 100 100" className="h-16 w-16 sm:h-[76px] sm:w-[76px]" fill="none" aria-hidden="true">
          <path d="M50 13 79 30v39L50 87 21 69V30L50 13Z" stroke="white" strokeWidth="3" strokeLinejoin="round" />
          <path d="M50 13v24m29-7L58 43M21 30l21 13m8 44V61m29 8L58 57M21 69l21-12" stroke="white" strokeWidth="3" strokeLinecap="round" />
          <circle cx="50" cy="50" r="8" fill="white" />
        </svg>
      </div>

      {/* Robotics floating label */}
      <div className="absolute left-3 top-5 rounded-xl border border-white/10 bg-[#17243a]/90 px-3 py-2.5 shadow-xl backdrop-blur sm:left-6 sm:top-8 sm:px-4">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-400/15 text-sky-300">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="5" y="7" width="14" height="12" rx="2" />
              <path d="M12 3v4M9 12h.01M15 12h.01M9 16h6M3 11v4m18-4v4" strokeLinecap="round" />
            </svg>
          </span>
          <span>
            <span className="block text-[10px] uppercase tracking-wider text-slate-300">Build</span>
            <span className="text-xs font-bold text-white sm:text-sm">Robotics</span>
          </span>
        </div>
      </div>

      {/* STEM label */}
      <div className="absolute right-3 top-7 rounded-xl border border-white/10 bg-[#17243a]/90 px-3 py-2.5 shadow-xl backdrop-blur sm:right-6 sm:top-12 sm:px-4">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/15 text-emerald-300">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1m0-12.8-2.1 2.1m-8.6 8.6-2.1 2.1" />
              <circle cx="12" cy="12" r="4" />
            </svg>
          </span>
          <span>
            <span className="block text-[10px] uppercase tracking-wider text-slate-300">Explore</span>
            <span className="text-xs font-bold text-white sm:text-sm">STEM + AI</span>
          </span>
        </div>
      </div>

      {/* Bottom label */}
      <div className="absolute bottom-24 left-3 rounded-xl border border-white/10 bg-[#101827]/90 px-3 py-2 shadow-xl backdrop-blur sm:bottom-28 sm:left-6 sm:px-4">
        <p className="text-[10px] uppercase tracking-wider text-slate-400">Learning mode</p>
        <p className="mt-1 text-xs font-bold text-white sm:text-sm">Make · Test · Improve</p>
      </div>

      {/* Code icon */}
      <div className="absolute bottom-24 right-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-orange-300 backdrop-blur sm:bottom-28 sm:right-7 sm:h-14 sm:w-14">
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M4 19V5h16v14H4Z" />
          <path d="m8 9-3 3 3 3m8-6 3 3-3 3M13 8l-2 8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Bottom caption */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0b1220] via-[#0b1220]/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-300">Learn by doing</p>
        <p className="mt-2 max-w-md text-xl font-bold leading-snug text-white sm:text-2xl">
          Turning curiosity into real-world skills.
        </p>
      </div>
    </div>
  );
}

export default function SolutionDetail({ solution }) {
  if (!solution) return null;

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[#0b1220] text-white">
        <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-orange-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 right-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="container-max relative mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
            <div className="min-w-0 text-center lg:text-left">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-orange-400" />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-orange-300">
                  Solution {solution.number}
                </span>
              </div>

              <h1 className="mx-auto max-w-2xl text-3xl font-extrabold leading-[1.12] tracking-tight sm:text-4xl md:text-5xl lg:mx-0 lg:text-[3rem]">
                {solution.title}
              </h1>

              <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8 lg:mx-0">
                {solution.short}
              </p>

              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap lg:justify-start">
                <Link
                  to="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-orange-500 px-6 py-3 font-bold text-white shadow-lg shadow-orange-950/20 transition hover:-translate-y-0.5 hover:bg-orange-600"
                >
                  {solution.cta} <span aria-hidden="true">↗</span>
                </Link>

                <a
                  href="#overview"
                  className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/20 px-6 py-3 font-semibold text-white transition hover:border-white/50 hover:bg-white/5"
                >
                  Explore the solution
                </a>
              </div>

              <div className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-slate-300 lg:justify-start">
                <span><span className="mr-2 text-orange-400">✓</span>Practical learning</span>
                <span><span className="mr-2 text-orange-400">✓</span>School-focused planning</span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">
              <div className="absolute -inset-3 rotate-2 rounded-[2rem] bg-orange-500/20 blur-sm" />
              <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-slate-800 shadow-2xl shadow-black/30">
                <StemIllustration />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS STRIP */}
      <section className="border-b border-slate-200 bg-white">
        <div className="container-max mx-auto grid grid-cols-2 divide-x divide-y divide-slate-200 px-4 sm:px-6 md:grid-cols-4 md:divide-y-0 lg:px-10">
          {processSteps.map((step, index) => (
            <div key={step.title} className="px-4 py-5 sm:px-6 sm:py-7">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-orange-500">
                0{index + 1}
              </p>
              <h2 className="mt-2 text-base font-bold text-[#111827] sm:text-lg">{step.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* OVERVIEW */}
      <section id="overview" className="bg-[#f7f6f2] py-14 sm:py-20">
        <div className="container-max mx-auto grid gap-6 px-4 sm:px-6 md:grid-cols-[0.75fr_1.25fr] md:gap-12 lg:px-10">
          <div>
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-orange-600">The big picture</p>
            <h2 className="max-w-md text-2xl font-extrabold leading-tight tracking-tight text-[#111827] sm:text-3xl lg:text-4xl">
              Built around your school’s goals.
            </h2>
          </div>

          <div className="md:border-l md:border-slate-300 md:pl-8 lg:pl-12">
            <p className="text-base leading-8 text-slate-600 sm:text-lg">{solution.overview}</p>
            <Link to="/contact" className="mt-5 inline-flex items-center gap-2 font-bold text-orange-600 transition hover:gap-3">
              Discuss your requirements <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* OFFERINGS */}
      <section className="bg-white py-14 sm:py-20">
        <div className="container-max mx-auto px-4 sm:px-6 lg:px-10">
          <div className="mb-9 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-orange-600">What we offer</p>
              <h2 className="text-2xl font-extrabold tracking-tight text-[#111827] sm:text-3xl lg:text-4xl">
                {solution.offeringsTitle}
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-slate-600 sm:text-base">
              Explore practical options that can be shaped around your students, staff and learning goals.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {solution.offerings.map((item, index) => (
              <article key={item.title} className="group relative overflow-hidden rounded-xl border border-slate-200 bg-[#fbfaf7] p-5 transition duration-300 hover:-translate-y-1 hover:border-orange-300 hover:bg-white hover:shadow-xl hover:shadow-slate-900/5 sm:p-6">
                <div className="mb-5 flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#101827] text-lg font-extrabold text-orange-400 transition group-hover:text-white">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-2xl text-slate-300 transition group-hover:translate-x-1 group-hover:text-orange-500" aria-hidden="true">↗</span>
                </div>

                <h3 className="text-lg font-bold text-[#111827]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.desc}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERABLES + APPROACH */}
      <section className="bg-[#0b1220] py-14 text-white sm:py-20">
        <div className="container-max mx-auto grid gap-10 px-4 sm:px-6 md:grid-cols-2 lg:gap-16 lg:px-10">
          <div>
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-orange-300">What we provide</p>
            <h2 className="mb-7 text-2xl font-extrabold tracking-tight sm:text-3xl">A clear scope of support.</h2>

            <ul className="space-y-4">
              {solution.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-300">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500/15 font-bold text-orange-300">✓</span>
                  <span className="leading-7">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-orange-300">Our approach</p>
            <h2 className="mb-7 text-2xl font-extrabold tracking-tight sm:text-3xl">From planning to implementation.</h2>

            <ol className="space-y-5">
              {solution.approach.map((item, index) => (
                <li key={item} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-orange-400/40 text-sm font-extrabold text-orange-300">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="pt-1 font-semibold leading-6 text-slate-100">{item}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="bg-[#f7f6f2] py-14 sm:py-20">
        <div className="container-max mx-auto px-4 sm:px-6 lg:px-10">
          <div className="mb-8 max-w-2xl">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-orange-600">Expected outcomes</p>
            <h2 className="text-2xl font-extrabold tracking-tight text-[#111827] sm:text-3xl lg:text-4xl">
              Designed for practical progress.
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {solution.outcomes.map((item, index) => (
              <div key={item} className="border-t-2 border-orange-500 bg-white p-5 sm:p-6">
                <p className="mb-5 text-xs font-extrabold tracking-[0.18em] text-orange-600">
                  OUTCOME 0{index + 1}
                </p>
                <p className="font-bold leading-7 text-[#111827]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY IGNITRON */}
      <section className="bg-white py-14 sm:py-20">
        <div className="container-max mx-auto px-4 sm:px-6 lg:px-10">
          <div className="mb-9 max-w-2xl">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-orange-600">Why Ignitron</p>
            <h2 className="text-2xl font-extrabold tracking-tight text-[#111827] sm:text-3xl lg:text-4xl">
              A connected ecosystem for future-ready education.
            </h2>
          </div>

          <div className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {whyIgnitron.map((item, index) => (
              <div key={item} className="flex gap-4 border-t border-slate-200 py-5">
                <span className="text-sm font-extrabold text-orange-600">0{index + 1}</span>
                <span className="font-semibold leading-6 text-slate-800">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#f7f6f2] py-14 sm:py-20">
        <div className="container-max mx-auto max-w-4xl px-4 sm:px-6 lg:px-10">
          <div className="mb-8">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-orange-600">FAQs</p>
            <h2 className="text-2xl font-extrabold tracking-tight text-[#111827] sm:text-3xl">
              Frequently asked questions
            </h2>
          </div>

          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {solution.faqs.map((faq) => (
              <details key={faq.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-[#111827] marker:hidden">
                  <span>{faq.q}</span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-300 text-xl font-normal text-orange-600 transition group-open:rotate-45 group-open:border-orange-400">+</span>
                </summary>
                <p className="max-w-3xl pt-4 pr-10 text-sm leading-7 text-slate-600 sm:text-base">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-white px-4 py-10 sm:px-6 sm:py-14">
        <div className="container-max relative mx-auto overflow-hidden rounded-2xl bg-orange-500 px-6 py-9 text-center sm:px-10 sm:py-12 lg:px-14">
          <div className="pointer-events-none absolute -right-12 -top-20 h-56 w-56 rounded-full border-[28px] border-white/10" />
          <div className="pointer-events-none absolute -bottom-24 -left-12 h-56 w-56 rounded-full border-[28px] border-white/10" />

          <div className="relative mx-auto max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-orange-100">Let’s build something meaningful</p>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Ready to bring this solution to your school?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/90 sm:text-base">
              Tell us about your goals and we’ll help you plan the next step.
            </p>

            <Link to="/contact" className="mt-6 inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-[#0b1220] px-6 py-3 font-bold text-white transition hover:bg-slate-800">
              Talk to our team <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
