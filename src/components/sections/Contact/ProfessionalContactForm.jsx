import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';

// Form configuration
const CONTACT_TYPES = [
  { id: 'job', label: 'Job Opportunity', icon: '💼', color: 'from-green-500 to-emerald-500' },
  { id: 'project', label: 'Project Collaboration', icon: '🤝', color: 'from-blue-500 to-cyan-500' },
  { id: 'consultation', label: 'Consultation', icon: '💡', color: 'from-purple-500 to-pink-500' },
  { id: 'other', label: 'Other', icon: '💬', color: 'from-orange-500 to-red-500' }
];

const URGENCY_LEVELS = [
  { id: 'low', label: 'Low Priority', color: 'text-gray-500' },
  { id: 'medium', label: 'Medium Priority', color: 'text-yellow-500' },
  { id: 'high', label: 'High Priority', color: 'text-orange-500' },
  { id: 'urgent', label: 'Urgent', color: 'text-red-500' }
];

const FormField = ({ label, error, children, required = false, theme }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-2"
  >
    <label className={`block text-sm font-medium ${
      theme.currentTheme === 'minimal' ? 'text-gray-700' : 'text-neutral-300'
    }`}>
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    {children}
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="text-red-400 text-xs"
        >
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  </motion.div>
);

const ContactTypeSelector = ({ selected, onSelect, theme }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
    {CONTACT_TYPES.map((type) => (
      <motion.button
        key={type.id}
        type="button"
        onClick={() => onSelect(type.id)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`
          relative p-4 rounded-lg text-center transition-all duration-200 border
          ${selected === type.id
            ? theme.currentTheme === 'minimal'
              ? 'bg-gray-100 border-gray-300 text-gray-800'
              : 'bg-neutral-700 border-purple-500 text-white'
            : theme.currentTheme === 'minimal'
              ? 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
              : 'bg-neutral-800/50 border-neutral-700 text-neutral-400 hover:border-neutral-600'
          }
        `}
      >
        <div className="text-2xl mb-2">{type.icon}</div>
        <div className="text-xs font-medium">{type.label}</div>
        
        {selected === type.id && (
          <motion.div
            layoutId="contactTypeSelector"
            className={`absolute inset-0 rounded-lg bg-gradient-to-r ${type.color} opacity-10`}
            transition={{ duration: 0.2 }}
          />
        )}
      </motion.button>
    ))}
  </div>
);

const SubmissionSuccess = ({ onReset, theme }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className={`text-center py-12 px-6 rounded-xl ${
      theme.currentTheme === 'minimal'
        ? 'bg-green-50 border border-green-200'
        : 'bg-green-900/20 border border-green-500/30'
    }`}
  >
    <div className="text-6xl mb-4">✅</div>
    <h3 className={`text-xl font-bold mb-2 ${
      theme.currentTheme === 'minimal' ? 'text-green-800' : 'text-green-400'
    }`}>
      Message Sent Successfully!
    </h3>
    <p className={`mb-6 ${
      theme.currentTheme === 'minimal' ? 'text-green-700' : 'text-green-300'
    }`}>
      Thank you for reaching out! I'll get back to you within 24 hours.
    </p>
    <motion.button
      onClick={onReset}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        px-6 py-2 rounded-lg font-medium transition-colors
        ${theme.currentTheme === 'minimal'
          ? 'bg-green-600 hover:bg-green-700 text-white'
          : 'bg-green-500 hover:bg-green-400 text-black'
        }
      `}
    >
      Send Another Message
    </motion.button>
  </motion.div>
);

export default function ProfessionalContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    contactType: '',
    urgency: 'medium',
    subject: '',
    message: '',
    budget: '',
    timeline: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef(null);
  const theme = useTheme();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.contactType) newErrors.contactType = 'Please select a contact type';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to first error
      const firstError = Object.keys(errors)[0];
      const errorElement = formRef.current?.querySelector(`[name="${firstError}"]`);
      errorElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In real implementation, you would send to your backend or email service
      // For now, we'll create a mailto link as fallback
      const mailtoBody = `
Contact Type: ${CONTACT_TYPES.find(t => t.id === formData.contactType)?.label}
Company: ${formData.company || 'Not specified'}
Urgency: ${URGENCY_LEVELS.find(u => u.id === formData.urgency)?.label}
Budget: ${formData.budget || 'Not specified'}
Timeline: ${formData.timeline || 'Not specified'}

Message:
${formData.message}
      `.trim();
      
      const mailtoLink = `mailto:liuyuelin.dev@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(mailtoBody)}`;
      
      // Open mailto as fallback
      window.open(mailtoLink);
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ submit: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '', email: '', company: '', contactType: '', urgency: 'medium',
      subject: '', message: '', budget: '', timeline: ''
    });
    setErrors({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return <SubmissionSuccess onReset={resetForm} theme={theme} />;
  }

  const inputClassName = `
    w-full px-4 py-3 rounded-lg border transition-colors duration-200
    ${theme.currentTheme === 'minimal'
      ? 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-gray-500 focus:ring-1 focus:ring-gray-500'
      : 'bg-neutral-800 border-neutral-600 text-white placeholder-neutral-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500'
    }
    focus:outline-none
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`
        max-w-2xl mx-auto p-6 rounded-xl
        ${theme.currentTheme === 'minimal'
          ? 'bg-white border border-gray-200'
          : 'bg-neutral-900/50 border border-neutral-700'
        }
      `}
    >
      <div className="text-center mb-8">
        <h3 className={`text-2xl font-bold mb-2 ${
          theme.currentTheme === 'minimal' ? 'text-gray-900' : 'text-white'
        }`}>
          Let's Work Together
        </h3>
        <p className={`${
          theme.currentTheme === 'minimal' ? 'text-gray-600' : 'text-neutral-400'
        }`}>
          Tell me about your project and let's discuss how I can help bring your ideas to life.
        </p>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        {/* Contact Type Selection */}
        <FormField label="What type of collaboration are you interested in?" required theme={theme} error={errors.contactType}>
          <ContactTypeSelector
            selected={formData.contactType}
            onSelect={(type) => setFormData(prev => ({ ...prev, contactType: type }))}
            theme={theme}
          />
        </FormField>

        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Your Name" required theme={theme} error={errors.name}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="John Doe"
              className={inputClassName}
            />
          </FormField>

          <FormField label="Email Address" required theme={theme} error={errors.email}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="john@company.com"
              className={inputClassName}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Company/Organization" theme={theme}>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              placeholder="Your Company"
              className={inputClassName}
            />
          </FormField>

          <FormField label="Priority Level" theme={theme}>
            <select
              name="urgency"
              value={formData.urgency}
              onChange={handleInputChange}
              className={inputClassName}
            >
              {URGENCY_LEVELS.map(level => (
                <option key={level.id} value={level.id}>
                  {level.label}
                </option>
              ))}
            </select>
          </FormField>
        </div>

        {/* Project Details */}
        <FormField label="Subject" required theme={theme} error={errors.subject}>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            placeholder="Brief description of your project"
            className={inputClassName}
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Budget Range (Optional)" theme={theme}>
            <select
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              className={inputClassName}
            >
              <option value="">Select budget range</option>
              <option value="under-5k">Under $5,000</option>
              <option value="5k-10k">$5,000 - $10,000</option>
              <option value="10k-25k">$10,000 - $25,000</option>
              <option value="25k-plus">$25,000+</option>
              <option value="discuss">Let's discuss</option>
            </select>
          </FormField>

          <FormField label="Timeline (Optional)" theme={theme}>
            <select
              name="timeline"
              value={formData.timeline}
              onChange={handleInputChange}
              className={inputClassName}
            >
              <option value="">Select timeline</option>
              <option value="asap">ASAP</option>
              <option value="1-month">Within 1 month</option>
              <option value="1-3-months">1-3 months</option>
              <option value="3-6-months">3-6 months</option>
              <option value="flexible">Flexible</option>
            </select>
          </FormField>
        </div>

        <FormField label="Project Details" required theme={theme} error={errors.message}>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Please describe your project, requirements, and any specific questions you have..."
            rows={6}
            className={inputClassName}
          />
          <div className={`text-xs mt-1 ${
            theme.currentTheme === 'minimal' ? 'text-gray-500' : 'text-neutral-500'
          }`}>
            {formData.message.length}/500 characters
          </div>
        </FormField>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          className={`
            w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200
            ${isSubmitting
              ? theme.currentTheme === 'minimal'
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-neutral-700 text-neutral-500 cursor-not-allowed'
              : theme.currentTheme === 'minimal'
                ? 'bg-gray-900 hover:bg-gray-800 text-white'
                : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 text-white'
            }
          `}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-t-transparent border-current rounded-full"
              />
              Sending Message...
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <span>Send Message</span>
              <span>→</span>
            </div>
          )}
        </motion.button>

        {errors.submit && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 text-center text-sm"
          >
            {errors.submit}
          </motion.p>
        )}
      </form>
    </motion.div>
  );
}