import { FURTHER_OUT } from "../../../constants/constants";
import HourMark from "../../ui/common/HourMark";
import DiscThrow from "./DiscThrow";

export default function FurtherOut() {
  return (
    <>
      <DiscThrow />
      <div className="wrap">
        <HourMark at="golden">{FURTHER_OUT.hour}</HourMark>
        <h2 className="sec">{FURTHER_OUT.heading}</h2>
        <p className="standfirst">{FURTHER_OUT.standfirst}</p>

        {/* A sideways scroller has to be reachable from the keyboard. */}
        <div className="strip" tabIndex="0" role="region" aria-label={FURTHER_OUT.stripLabel}>
          <ol>
            {FURTHER_OUT.places.map(({ place, detail, link, after, photo }) => (
              <li key={place} style={{ "--ratio": photo.ratio }}>
                <figure className={photo.object ? "object" : undefined}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- static export, pre-sized local asset */}
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    loading="lazy"
                    style={photo.focus ? { objectPosition: photo.focus } : undefined}
                  />
                  <figcaption>
                    <b>{place}</b>
                    {detail}
                    {link && (
                      <>
                        {" "}
                        <a className="quiet" href={link.href} target="_blank" rel="noopener noreferrer">
                          {link.label}
                        </a>{" "}
                        {after}
                      </>
                    )}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}
