import { FaQuoteLeft } from "react-icons/fa";
import { FiLinkedin } from "react-icons/fi";
import QuoteText from "../ui/QuoteText";
import { useTheme } from "../../contexts/ThemeContext";

const ReferenceCard = ({ name, title, company, quote, image, linkedIn }) => {
  const { currentTheme } = useTheme();
  
  return (
  <div className={`max-w-[520px] w-full min-h-[400px] rounded-2xl shadow-xl border hover:shadow-2xl transition-all duration-300 mx-auto flex flex-col justify-between ${
    currentTheme === 'minimal'
      ? 'bg-white border-gray-200 hover:border-gray-300'
      : 'bg-gradient-to-br from-[#232347] to-[#181825] border-purple-800/30 hover:border-purple-700/40'
  }`}>
    <div className="flex flex-col flex-1 p-6 md:p-8">
      <FaQuoteLeft className={`text-2xl mb-3 ${
        currentTheme === 'minimal' ? 'text-gray-500' : 'text-purple-400'
      }`} />
      <QuoteText text={quote} />
    </div>
    <div className="flex items-center gap-4 px-6 pb-6 md:px-8">
      <img
        src={image}
        alt={name}
        loading="lazy"
        className={`w-16 h-16 rounded-full object-cover border-2 shadow-md ${
          currentTheme === 'minimal' ? 'border-gray-300' : 'border-purple-700/40'
        }`}
      />
      <div className="flex-1 min-w-0">
        <p className={`font-semibold text-base truncate ${
          currentTheme === 'minimal' ? 'text-gray-900' : 'text-white'
        }`}>{name}</p>
        <p className={`text-xs truncate ${
          currentTheme === 'minimal' ? 'text-gray-600' : 'text-gray-400'
        }`}>
          {title} at {company}
        </p>
        {linkedIn && (
          <a
            href={linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1 text-xs hover:underline mt-1 ${
              currentTheme === 'minimal' ? 'text-blue-600' : 'text-purple-400'
            }`}
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
