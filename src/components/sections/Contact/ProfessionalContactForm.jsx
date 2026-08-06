import { useState } from "react";
import PropTypes from "prop-types";
import { CheckCircle2, Send } from "lucide-react";
import { CONTACT } from "../../../constants/constants";
import { focusRingClasses } from "../../../utils/accessibility";

const MESSAGE_TYPES = [
  { id: "role", label: "Full-time role" },
  { id: "contract", label: "Contract role" },
  { id: "freelance", label: "Freelance build" },
  { id: "general", label: "General chat" },
];

const inputClassName = `w-full rounded-lg border border-neutral-500 bg-neutral-950 px-4 py-3 text-sm text-white placeholder-neutral-500 transition-colors focus:border-cyan-300 focus:outline-none ${focusRingClasses}`;

const FormField = ({ label, error = "", children, required = false }) => (
  <div className="space-y-2">
    <label className="block text-sm font-semibold text-white">
      {label}
      {required && <span className="text-cyan-300"> *</span>}
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
};

const MessageTypeSelector = ({ selected, onSelect }) => (
  <div className="grid gap-2 sm:grid-cols-2">
    {MESSAGE_TYPES.map((type) => {
      const isSelected = selected === type.id;

      return (
        <button
          key={type.id}
          type="button"
          onClick={() => onSelect(type.id)}
          aria-pressed={isSelected}
          className={`rounded-lg border p-3 text-left text-sm transition-colors ${focusRingClasses} ${
            isSelected
              ? "border-cyan-300 font-semibold text-white"
              : "border-neutral-500 text-neutral-300 hover:border-neutral-300 hover:text-white"
          }`}
        >
          {type.label}
        </button>
      );
    })}
  </div>
);

MessageTypeSelector.propTypes = {
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

const DraftOpenedNotice = ({ onReset }) => (
  <div className="rounded-lg border border-neutral-800 p-6">
    <div className="flex gap-3">
      <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-cyan-300" aria-hidden="true" />
      <div>
        <h3 className="text-lg font-bold text-white">Email draft opened</h3>
        <p className="mt-2 text-sm leading-relaxed text-neutral-300">
          Your mail app should now contain a pre-filled message. Review it, attach anything useful, then send it from
          your own inbox.
        </p>
        <button
          type="button"
          onClick={onReset}
          className={`mt-4 rounded-lg border border-neutral-500 px-4 py-2.5 text-sm font-semibold text-neutral-200 transition-colors hover:border-neutral-300 hover:text-white ${focusRingClasses}`}
        >
          Prepare another draft
        </button>
      </div>
    </div>
  </div>
);

DraftOpenedNotice.propTypes = {
  onReset: PropTypes.func.isRequired,
};

export default function ProfessionalContactForm() {
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
    return <DraftOpenedNotice onReset={resetDraft} />;
  }

  return (
    <div className="rounded-lg border border-neutral-800 p-6 md:p-7">
      <h3 className="text-xl font-bold text-white">Prepare a role note</h3>
      <p className="mt-2 text-sm leading-relaxed text-neutral-300">
        This opens a pre-filled email draft to {CONTACT.email}. It is intentionally lightweight so recruiters and
        hiring managers can start a real conversation quickly.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <FormField label="Message focus" required>
          <MessageTypeSelector
            selected={formData.messageType}
            onSelect={(messageType) => setFormData((previous) => ({ ...previous, messageType }))}
          />
        </FormField>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Your name" required error={errors.name}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Hiring manager name"
              className={inputClassName}
            />
          </FormField>

          <FormField label="Email address" required error={errors.email}>
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

        <FormField label="Company or team">
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            placeholder="Company name"
            className={inputClassName}
          />
        </FormField>

        <FormField label="Subject" required error={errors.subject}>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            placeholder="Full-stack software engineer opportunity"
            className={inputClassName}
          />
        </FormField>

        <FormField label="Message" required error={errors.message}>
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
          className={`inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-semibold text-neutral-950 transition-colors hover:bg-neutral-200 ${focusRingClasses}`}
        >
          Open email draft
          <Send size={16} aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}
