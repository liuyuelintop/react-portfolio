// Technologies.jsx
import { useMediaQuery } from "react-responsive";
import { TECH_STACK } from "../../constants/technologies";
import TechCard from "./TechCard";
import "swiper/css";
import "swiper/css/navigation";
import TechnologiesCarousel from "./TechnologiesCarousel";
import { useState } from "react";

export default function Technologies() {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const [showAll, setShowAll] = useState(false);

    // Show first 4 groups on mobile, all groups if showAll is true or on desktop
    const visibleTechStack = isMobile && !showAll ? TECH_STACK.slice(0, 4) : TECH_STACK;

    return (
        <section className="border-b border-neutral-900/50 py-24 px-4 md:px-8">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent text-center mb-12">
                    Tech Stack
                </h2>
                {visibleTechStack.map(({ group, items }) => (
                    <div key={group} className="mb-12">
                        <h3 className={`text-xl md:text-2xl font-semibold mb-6 ${group === "Learning & Next Focus" ? "text-blue-300" : "text-purple-300"}`}>{group}</h3>
                        {isMobile ? (
                            <TechnologiesCarousel items={items} />
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-2">
                                {items.map((tech) => (
                                    <TechCard key={tech.name} {...tech} />
                                ))}
                            </div>
                        )}
                    </div>
                ))}

                {/* Show the "Show All" button only on mobile if not showing all */}
                {isMobile && !showAll && (
                    <div className="flex justify-center mt-4">
                        <button
                            className="text-sm px-4 py-2 bg-neutral-800 rounded-lg text-purple-300 hover:bg-purple-800 transition"
                            onClick={() => setShowAll(true)}
                        >
                            Show All
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}