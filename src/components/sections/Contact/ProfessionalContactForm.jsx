import { useState } from "react";
import PropTypes from "prop-types";
import { CONTACT } from "../../../constants/constants";

const MESSAGE_TYPES = [
  { id: "role", label: "Full-time role" },
  { id: "contract", label: "Contract role" },
  { id: "freelance", label: "Freelance build" },
  { id: "general", label: "General chat" },
];

const FormField = ({ fieldId, label, error = "", children }) => (
  <div className="field">
    <label htmlFor={fieldId}>{label}</label>
    {children}
    {error && <p className="err">{error}</p>}
  </div>
);

FormField.propTypes = {
  fieldId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  children: PropTypes.node.isRequired,
};

const MessageTypeSelector = ({ selected, onSelect }) => (
  <div className="focus">
    {MESSAGE_TYPES.map((type) => (
      <button
        key={type.id}
        type="button"
        onClick={() => onSelect(type.id)}
        aria-pressed={selected === type.id}
      >
        {type.label}
      </button>
    ))}
  </div>
);

MessageTypeSelector.propTypes = {
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

const DraftOpenedNotice = ({ onReset }) => (
  <div className="note">
    <h3>Email draft opened</h3>
    <p>
      Your mail app should now contain a pre-filled message. Review it, attach anything useful, then send it from
      your own inbox.
    </p>
    <button type="button" className="tog" style={{ marginTop: 0 }} onClick={onReset}>
      Prepare another draft
    </button>
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
    <form className="note" onSubmit={handleSubmit}>
      <h3>Prepare a role note</h3>
      <p>This opens a pre-filled email draft to {CONTACT.email}. Nothing is sent from this page.</p>

      <fieldset>
        <legend>Message focus</legend>
        <MessageTypeSelector
          selected={formData.messageType}
          onSelect={(messageType) => setFormData((previous) => ({ ...previous, messageType }))}
        />
      </fieldset>

      <div className="pair">
        <FormField fieldId="contact-name" label="Your name" error={errors.name}>
          <input
            id="contact-name"
            type="text"
            name="name"
            autoComplete="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </FormField>

        <FormField fieldId="contact-email" label="Email address" error={errors.email}>
          <input
            id="contact-email"
            type="email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="name@company.com"
          />
        </FormField>
      </div>

      <FormField fieldId="contact-company" label="Company or team">
        <input
          id="contact-company"
          type="text"
          name="company"
          autoComplete="organization"
          value={formData.company}
          onChange={handleInputChange}
        />
      </FormField>

      <FormField fieldId="contact-subject" label="Subject" error={errors.subject}>
        <input
          id="contact-subject"
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          placeholder="Full-stack software engineer opportunity"
        />
      </FormField>

      <FormField fieldId="contact-message" label="Message" error={errors.message}>
        <textarea
          id="contact-message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="The role, team, stack or interview process"
        />
      </FormField>

      <button type="submit" className="btn">
        Open email draft
      </button>
    </form>
  );
}
