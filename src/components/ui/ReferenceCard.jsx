import { FaQuoteLeft } from "react-icons/fa";
import { FiLinkedin } from "react-icons/fi";
import QuoteText from "./QuoteText";

const ReferenceCard = ({ name, title, company, quote, image, linkedIn }) => {
  return (
    <div className="bg-gradient-to-br from-[#232347] to-[#181825] max-w-[480px] w-full rounded-2xl shadow-xl border border-purple-800/30 hover:shadow-2xl transition-all duration-200 mx-auto flex flex-col justify-between">
      <div className="flex flex-col flex-1 p-6 md:p-8">
        <FaQuoteLeft className="text-purple-400 text-2xl mb-3" />
        <QuoteText text={quote} />
      </div>

      <div className="flex items-center gap-4 px-6 pb-6 md:px-8">
        <img
          src={image}
          alt={name}
          className="w-14 h-14 rounded-full object-cover border-2 border-purple-700/40 shadow"
        />
        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold text-base truncate">{name}</p>
          <p className="text-xs text-gray-400 truncate">
            {title} at {company}
          </p>
          {linkedIn && (
            <a
              href={linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-purple-400 hover:underline mt-1"
            >
              <FiLinkedin /> LinkedIn
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReferenceCard;
