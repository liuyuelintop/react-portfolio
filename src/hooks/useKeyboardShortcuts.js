import { useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { scrollToSection } from '../utils/accessibility';
import { useToast } from '../components/ui/common/Toast';

export const useKeyboardShortcuts = () => {
  const { toggleTheme } = useTheme();
  const { toast } = useToast();

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Only trigger shortcuts with Alt key to avoid conflicts
      if (e.altKey && !e.ctrlKey && !e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 'h':
            e.preventDefault();
            scrollToSection('hero');
            break;
          case 'p':
            e.preventDefault();
            scrollToSection('projects');
            break;
          case 'e':
            e.preventDefault();
            scrollToSection('experience');
            break;
          case 's':
            e.preventDefault();
            scrollToSection('skills');
            break;
          case 'a':
            e.preventDefault();
            scrollToSection('chatbot');
            break;
          case 'c':
            e.preventDefault();
            scrollToSection('contact');
            break;
          case 't':
            e.preventDefault();
            toggleTheme();
            break;
          case '?':
            e.preventDefault();
            showKeyboardShortcuts();
            break;
        }
      }
      
      // Escape key handling for modals
      if (e.key === 'Escape') {
        const modal = document.querySelector('[role="dialog"]');
        if (modal) {
          const closeButton = modal.querySelector('[data-close]');
          if (closeButton) {
            closeButton.click();
          }
        }
      }
    };

    const showKeyboardShortcuts = () => {
      toast.info('Keyboard shortcuts available', {
        title: 'Navigation Help',
        message: 'Alt + H/P/E/S/A/C for sections, Alt + T for theme, Alt + ? for help',
        duration: 4000
      });
    };
    
    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [toggleTheme]);
};

export default useKeyboardShortcuts;