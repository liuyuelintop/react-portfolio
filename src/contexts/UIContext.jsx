import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const UIContext = createContext();

export function UIProvider({ children }) {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const value = {
    isProjectModalOpen,
    setIsProjectModalOpen
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

export function useUI() {
  const context = useContext(UIContext);
  
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  
  return context;
}