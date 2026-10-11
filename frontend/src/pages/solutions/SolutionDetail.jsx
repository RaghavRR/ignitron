import React from 'react';
import { Link } from 'react-router-dom';
import { whyIgnitron } from './solutionData';

export default function SolutionDetail({ solution }) {
  if (!solution) return null;

  return (
    <>


<section className="relative overflow-hidden bg-[#f8f7f4]">
  <div className="container-max mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

      {/* Hero content */}
      <div className="min-w-0 text-center lg:text-left">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2">
          {/* <span className="h-2 w-2 rounded-full bg-orange-500" /> */}
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 sm:text-sm">
            Solution {solution.number}
          </span>
        </div>

        <h1 className="mx-auto max-w-3xl break-words text-3xl font-extrabold leading-tight tracking-tight text-ignitron-navy sm:text-4xl md:text-5xl lg:mx-0 lg:text-6xl">
          {solution.title}
        </h1>

        <p className="mx-auto mt-5 max-w-2xl break-words text-base leading-7 text-gray-600 sm:text-lg sm:leading-8 lg:mx-0">
          {solution.short}
        </p>

        <div className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:justify-start">
          <Link
            to="/contact"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-ignitron-orange px-5 py-3 text-center font-semibold text-white shadow-sm transition hover:bg-orange-600 sm:px-6"
          >
            {solution.cta}
            <span aria-hidden="true">→</span>
          </Link>

          <a
            href="#overview"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-3 font-semibold text-ignitron-navy transition hover:border-orange-400 hover:text-orange-600 sm:px-6"
          >
            Explore Details
          </a>
        </div>

        <div className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-3 text-sm text-gray-600 lg:justify-start">
          <span>✓ Practical learning</span>
          <span>✓ School-focused planning</span>
        </div>
      </div>

      {/* Roadmap card */}
      <div className="mx-auto w-full min-w-0 max-w-xl lg:mx-0 lg:max-w-none">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.07)]">

          <div className="border-b border-gray-100 px-5 py-5 text-center sm:px-7 sm:py-6 lg:text-left">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-500">
              How we work
            </p>
            <h2 className="mt-2 text-xl font-bold text-ignitron-navy sm:text-2xl">
              From idea to implementation
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              A clear process designed around your school's needs.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-0 sm:grid-cols-2">
 
{[
  {
    title: "Understand",
    description: "Identify your goals and challenges.",
  },
  {
    title: "Design",
    description: "Plan a suitable solution.",
  },
  {
    title: "Implement",
    description: "Turn the plan into action.",
  },
  {
    title: "Support",
    description: "Help your team move forward.",
  },
].map((step, index) => (
  <div
    key={step.title}
    className={`p-5 text-center sm:p-6 lg:text-left ${
      index < 2 ? "border-b border-gray-100" : ""
    } ${
      index % 2 === 0 ? "sm:border-r sm:border-gray-100" : ""
    }`}
  >
    <h3 className="font-bold text-ignitron-navy">
      {step.title}
    </h3>

    <p className="mt-2 text-sm leading-6 text-gray-600">
      {step.description}
    </p>
  </div>
))}

          </div>

          <div className="border-t border-gray-100 bg-[#fbfaf8] px-5 py-4 text-center sm:px-7 lg:text-left">
            <p className="text-sm leading-6 text-gray-600">
              Structured support for your school's learning goals.
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>



      <section id="overview" className="section bg-white">
        <div className="container-max mx-auto grid gap-5 text-center md:grid-cols-1 md:justify-items-center">
          <div>
            <p className="eyebrow mb-3">OVERVIEW</p>
            <h2 className="heading-md">Built around your school’s goals.</h2>
          </div>
         <p className="mx-auto max-w-3xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
  {solution.overview}
</p>
        </div>
      </section>

      <section className="section bg-ignitron-light">
        <div className="container-max mx-auto">
          <div className="mx-auto mb-9 max-w-3xl text-center">
            <p className="eyebrow mb-3">WHAT WE OFFER</p>
            <h2 className="heading-md mb-3">{solution.offeringsTitle}</h2>
            <p className="text-base leading-7 text-gray-600 sm:text-lg">
  Explore the areas that can be included in a solution plan for your school.
</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {solution.offerings.map((item, index) => (
              <article
  key={item.title}
  className="rounded-2xl border border-gray-200 bg-white p-4 text-center transition hover:-translate-y-1 hover:shadow-lg sm:p-6"
>
                <span className="mx-auto mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 font-bold text-ignitron-orange">
  {String(index + 1).padStart(2, "0")}
</span>
                <h3 className="mb-3 text-lg font-bold text-ignitron-navy">{item.title}</h3>
                <p className="mb-5 leading-7 text-gray-600">{item.desc}</p>
                <div className="flex flex-wrap justify-center gap-2">
  {item.tags.map((tag) => (
    <span
      key={tag}
      className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
    >
      {tag}
    </span>
  ))}
</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-max mx-auto grid gap-10 md:grid-cols-2">
          <div>
            <p className="eyebrow mb-3">WHAT WE PROVIDE</p>
            <h2 className="heading-md mb-6">A clear scope of support.</h2>
            <ul className="space-y-4">
              {solution.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-700">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-50 font-bold text-ignitron-orange">✓</span>
                  <span className="leading-6">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-ignitron-light p-6 md:p-8">
            <p className="eyebrow mb-3">OUR APPROACH</p>
            <h2 className="heading-md mb-6">From planning to implementation.</h2>
            <ol className="space-y-4">
              {solution.approach.map((item, index) => (
                <li key={item} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ignitron-navy text-sm font-bold text-white">{index + 1}</span>
                  <div className="pt-1 font-semibold text-ignitron-navy">{item}</div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section bg-ignitron-light">
        <div className="container-max mx-auto">
          <div className="mb-8 max-w-3xl">
            <p className="eyebrow mb-3">EXPECTED OUTCOMES</p>
            <h2 className="heading-md">Designed for practical progress.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {solution.outcomes.map((item, index) => (
              <div key={item} className="rounded-xl border border-gray-200 bg-white p-5">
                <p className="mb-3 text-sm font-bold text-ignitron-orange">0{index + 1}</p>
                <p className="font-semibold leading-6 text-ignitron-navy">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-max mx-auto">
          <div className="mb-8 max-w-3xl">
            <p className="eyebrow mb-3">WHY IGNITRON</p>
            <h2 className="heading-md">A connected ecosystem for future-ready education.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whyIgnitron.map((item, index) => (
              <div key={item} className="flex items-center gap-4 rounded-xl border border-gray-200 p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-50 font-bold text-ignitron-orange">{index + 1}</span>
                <span className="font-semibold text-ignitron-navy">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-ignitron-light">
        <div className="container-max mx-auto max-w-4xl">
          <p className="eyebrow mb-3">FAQ</p>
          <h2 className="heading-md mb-8">Frequently asked questions</h2>
          <div className="space-y-4">
            {solution.faqs.map((faq) => (
              <details key={faq.q} className="group rounded-xl border border-gray-200 bg-white p-5">
                <summary className="cursor-pointer list-none pr-6 font-bold text-ignitron-navy marker:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {faq.q}
                    <span className="text-xl text-ignitron-orange transition group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="mt-4 leading-7 text-gray-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
