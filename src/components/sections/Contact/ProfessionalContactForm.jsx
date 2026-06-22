import { useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  Handshake,
  Mail,
  MessageSquareText,
  Send,
} from "lucide-react";
import { CONTACT } from "../../../constants/constants";
import { useTheme } from "../../../contexts/ThemeContext";
import { getThemeFocusRing } from "../../../utils/accessibility";

const MESSAGE_TYPES = [
  { id: "role", label: "Full-time role", icon: BriefcaseBusiness },
  { id: "contract", label: "Contract role", icon: Code2 },
  { id: "freelance", label: "Freelance build", icon: Handshake },
  { id: "general", label: "General chat", icon: MessageSquareText },
];

const FormField = ({ label, error, children, required, styles }) => (
  <div className="space-y-2">
    <label className={`block text-sm font-semibold ${styles.heading}`}>
      {label}
      {required && <span className={styles.accent}> *</span>}
    </label>
    {children}
    {error && <p className="text-xs font-medium text-red-400">{error}</p>}
  </div>
);

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  children: PropTypes.node.isRequired,
  required: PropTypes.bool,
  styles: PropTypes.shape({
    heading: PropTypes.string.isRequired,
    accent: PropTypes.string.isRequired,
  }).isRequired,
};

FormField.defaultProps = {
  error: "",
  required: false,
};

const MessageTypeSelector = ({ selected, onSelect, styles, focusRing }) => (
  <div className="grid gap-2 sm:grid-cols-2">
    {MESSAGE_TYPES.map((type) => {
      const Icon = type.icon;
      const isSelected = selected === type.id;

      return (
        <button
          key={type.id}
          type="button"
          onClick={() => onSelect(type.id)}
          className={`flex items-center gap-3 rounded-lg border p-3 text-left transition-colors ${focusRing} ${
            isSelected ? styles.selectedOption : styles.option
          }`}
        >
          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${styles.icon}`}>
            <Icon size={18} aria-hidden="true" />
          </span>
          <span className={`text-sm font-semibold ${isSelected ? styles.selectedText : styles.text}`}>
            {type.label}
          </span>
        </button>
      );
    })}
  </div>
);

MessageTypeSelector.propTypes = {
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  styles: PropTypes.shape({
    selectedOption: PropTypes.string.isRequired,
    option: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    selectedText: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  focusRing: PropTypes.string.isRequired,
};

const DraftOpenedNotice = ({ onReset, styles, focusRing }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    className={`rounded-lg border p-5 ${styles.successPanel}`}
  >
    <div className="flex gap-3">
      <CheckCircle2 size={20} className={`mt-0.5 shrink-0 ${styles.accent}`} aria-hidden="true" />
      <div>
        <h3 className={`text-lg font-bold ${styles.heading}`}>Email draft opened</h3>
        <p className={`mt-2 text-sm leading-relaxed ${styles.text}`}>
          Your mail app should now contain a pre-filled message. Review it, attach anything useful, then send it from
          your own inbox.
        </p>
        <button
          type="button"
          onClick={onReset}
          className={`mt-4 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${styles.secondaryButton} ${focusRing}`}
        >
          Prepare another draft
        </button>
      </div>
    </div>
  </motion.div>
);

DraftOpenedNotice.propTypes = {
  onReset: PropTypes.func.isRequired,
  styles: PropTypes.shape({
    successPanel: PropTypes.string.isRequired,
    accent: PropTypes.string.isRequired,
    heading: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    secondaryButton: PropTypes.string.isRequired,
  }).isRequired,
  focusRing: PropTypes.string.isRequired,
};

export default function ProfessionalContactForm() {
  const { currentTheme } = useTheme();
  const isMinimal = currentTheme === "minimal";
  const focusRing = getThemeFocusRing(currentTheme);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    messageType: "role",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [draftOpened, setDraftOpened] = useState(false);

  const styles = {
    heading: isMinimal ? "text-gray-950" : "text-white",
    text: isMinimal ? "text-gray-700" : "text-neutral-300",
    muted: isMinimal ? "text-gray-500" : "text-neutral-400",
    card: isMinimal
      ? "bg-white border-gray-200 shadow-lg shadow-gray-200/40"
      : "bg-neutral-900/65 border-neutral-800 shadow-xl shadow-black/20",
    panel: isMinimal ? "bg-gray-50 border-gray-200" : "bg-neutral-950/55 border-neutral-800",
    icon: isMinimal ? "bg-blue-50 text-blue-700" : "bg-cyan-400/10 text-cyan-300",
    accent: isMinimal ? "text-blue-600" : "text-cyan-300",
    input: isMinimal
      ? "bg-white border-gray-300 text-gray-950 placeholder-gray-400 focus:border-blue-500"
      : "bg-neutral-950/60 border-neutral-800 text-white placeholder-neutral-500 focus:border-cyan-300",
    option: isMinimal
      ? "bg-white border-gray-200 hover:border-gray-300"
      : "bg-neutral-950/40 border-neutral-800 hover:border-neutral-700",
    selectedOption: isMinimal
      ? "bg-blue-50 border-blue-200"
      : "bg-cyan-400/10 border-cyan-400/25",
    selectedText: isMinimal ? "text-blue-800" : "text-cyan-100",
    primaryButton: isMinimal ? "bg-gray-950 text-white hover:bg-gray-800" : "bg-white text-neutral-950 hover:bg-neutral-200",
    secondaryButton: isMinimal
      ? "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
      : "bg-neutral-800 border border-neutral-700 text-neutral-300 hover:bg-neutral-700",
    successPanel: isMinimal ? "bg-blue-50 border-blue-200" : "bg-cyan-400/10 border-cyan-400/20",
  };

  const inputClassName = `w-full rounded-lg border px-4 py-3 text-sm transition-colors focus:outline-none ${styles.input} ${focusRing}`;

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.name.trim()) nextErrors.name = "Name is required";
    if (!formData.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nextErrors.email = "Please enter a valid email";
    }
    if (!formData.subject.trim()) nextErrors.subject = "Subject is required";
    if (formData.message.trim().length < 20) {
      nextErrors.message = "Please include at least 20 characters";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));

    if (errors[name]) {
      setErrors((previous) => ({ ...previous, [name]: "" }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    const messageTypeLabel = MESSAGE_TYPES.find((type) => type.id === formData.messageType)?.label || "General";
    const body = [
      `Message focus: ${messageTypeLabel}`,
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Company: ${formData.company || "Not specified"}`,
      "",
      "Message:",
      formData.message,
    ].join("\n");

    const mailtoLink = `mailto:${CONTACT.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, "_blank", "noopener,noreferrer");
    setDraftOpened(true);
  };

  const resetDraft = () => {
    setDraftOpened(false);
  };

  if (draftOpened) {
    return <DraftOpenedNotice onReset={resetDraft} styles={styles} focusRing={focusRing} />;
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={`rounded-lg border p-5 md:p-6 ${styles.card}`}
    >
      <div className="flex items-start gap-3">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${styles.icon}`}>
          <Mail size={21} aria-hidden="true" />
        </div>
        <div>
          <h3 className={`text-xl font-bold ${styles.heading}`}>Prepare a role note</h3>
          <p className={`mt-2 text-sm leading-relaxed ${styles.text}`}>
            This opens a pre-filled email draft to {CONTACT.email}. It is intentionally lightweight so recruiters and
            hiring managers can start a real conversation quickly.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <FormField label="Message focus" required styles={styles}>
          <MessageTypeSelector
            selected={formData.messageType}
            onSelect={(messageType) => setFormData((previous) => ({ ...previous, messageType }))}
            styles={styles}
            focusRing={focusRing}
          />
        </FormField>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Your name" required styles={styles} error={errors.name}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Hiring manager name"
              className={inputClassName}
            />
          </FormField>

          <FormField label="Email address" required styles={styles} error={errors.email}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="name@company.com"
              className={inputClassName}
            />
          </FormField>
        </div>

        <FormField label="Company or team" styles={styles}>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            placeholder="Company name"
            className={inputClassName}
          />
        </FormField>

        <FormField label="Subject" required styles={styles} error={errors.subject}>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            placeholder="Full-stack software engineer opportunity"
            className={inputClassName}
          />
        </FormField>

        <FormField label="Message" required styles={styles} error={errors.message}>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Share the role, team, stack, interview process or any specific context you want me to respond to."
            rows={6}
            className={inputClassName}
          />
        </FormField>

        <button
          type="submit"
          className={`inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${styles.primaryButton} ${focusRing}`}
        >
          Open email draft
          <Send size={16} aria-hidden="true" />
        </button>
      </form>
    </motion.article>
  );
}
