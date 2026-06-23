import { useState } from 'react';
import PropTypes from 'prop-types';
import { UIContext } from './UIContextCore';

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
