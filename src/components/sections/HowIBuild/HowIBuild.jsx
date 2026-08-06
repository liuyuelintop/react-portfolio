import { HOW_I_BUILD } from "../../../constants/constants";
import Reveal from "../../ui/common/Reveal";

export default function HowIBuild() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-20 md:px-8 md:py-24">
      <Reveal>
        <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl">How I Build</h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-400 md:text-lg">
          {HOW_I_BUILD.intro}
        </p>

        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {HOW_I_BUILD.principles.map((principle) => (
            <article key={principle.title}>
              <h3 className="text-lg font-semibold leading-snug text-white">{principle.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-300">{principle.statement}</p>
              <ul className="mt-4 space-y-2 border-l border-neutral-800 pl-4">
                {principle.evidence.map((item) => (
                  <li key={item} className="text-sm leading-relaxed text-neutral-400">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-16 border-t border-neutral-800 pt-8">
          <dl className="space-y-4">
            {HOW_I_BUILD.toolbox.map((group) => (
              <div key={group.label} className="grid gap-1 sm:grid-cols-[10rem_minmax(0,1fr)]">
                <dt className="text-sm font-semibold text-white">{group.label}</dt>
                <dd className="text-sm leading-relaxed text-neutral-400">{group.tools.join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </div>
  );
}
