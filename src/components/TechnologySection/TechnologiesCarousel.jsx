import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import TechCard from "./TechCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TechnologiesCarousel({ items }) {

  return (
    <div className="relative">
      <Swiper
        spaceBetween={10}
        slidesPerView={3}
        loop={true}
        navigation={{
          nextEl: ".swiper-next",
          prevEl: ".swiper-prev",
        }}
        modules={[Navigation]}
        className="!px-1"
      >
        {items.map((tech) => (
          <SwiperSlide key={tech.name}>
            <TechCard {...tech} />
          </SwiperSlide>
        ))}
        {/* Custom arrows: show if more than 3 techs */}
        {items.length > 3 && (
          <>
            <button aria-label="Previous" className="swiper-prev absolute left-[-8px] top-1/2 -translate-y-1/2 z-10 bg-black/30 p-1 rounded-full">
              <ChevronLeft size={20} />
            </button>
            <button aria-label="Next" className="swiper-next absolute right-[-8px] top-1/2 -translate-y-1/2 z-10 bg-black/30 p-1 rounded-full">
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </Swiper>
    </div>
  );
}
