import React from 'react';

interface SpinnerProps {
  small?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ small }) => (
  <span
    className={`inline-block border-2 border-t-2 border-gray-200 border-t-primary-500 rounded-full animate-spin ${small ? 'w-4 h-4 mr-2' : 'w-8 h-8'}`}
    role="status"
    aria-label="Cargando"
  />
);

export default Spinner; 