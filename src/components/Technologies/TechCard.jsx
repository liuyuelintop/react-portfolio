export default function TechCard({ name, icon: Icon, color }) {
  return (
    <div
      className="
        w-[92px] h-[80px] md:w-[100px] md:h-[100px]
        flex flex-col items-center justify-center 
        bg-neutral-900 rounded-xl border border-neutral-800
        shadow-sm hover:shadow-lg transition-shadow duration-150 mx-auto
      "
    >
      <Icon className={`text-2xl md:text-3xl ${color} mb-1`} />
      <span className="text-[12px] md:text-sm text-white text-center truncate w-full">{name}</span>
    </div>
  );
}
