import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const UIContext = createContext();

export function UIProvider({ children }) {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isChatbotFocused, setIsChatbotFocused] = useState(false);

  const value = {
    isProjectModalOpen,
    setIsProjectModalOpen,
    isChatbotFocused,
    setIsChatbotFocused
  };

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  );
}

UIProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

