import { HERO_CONTENT } from "../../../constants";

export default function Hero() {
  const { photo, caption } = HERO_CONTENT;

  return (
    <div className="wrap">
      <div className="hero">
        <div className="hero-text">
          <p className="who">
            <b>{HERO_CONTENT.name}</b> {HERO_CONTENT.role}
          </p>
          <h1>{HERO_CONTENT.headline}</h1>
          <p className="lede">
            {HERO_CONTENT.summary} {HERO_CONTENT.before}
          </p>
          <div className="actions">
            <a className="btn" href="#projects">{HERO_CONTENT.workLink}</a>
            <a className="btn ghost" href={HERO_CONTENT.resumeUrl} download="Yuelin-Liu-Resume.pdf">
              Download résumé
            </a>
          </div>
        </div>

        <figure className="hero-art">
          {/* eslint-disable-next-line @next/next/no-img-element -- static export, pre-sized local asset */}
          <img
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            fetchPriority="high"
          />
          <figcaption className="cap">
            <b>{caption.place}</b> {caption.detail} {caption.note}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
