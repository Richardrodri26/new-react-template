import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from './button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-lg max-w-lg w-full mx-4">
        <button
          className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          ×
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

interface ModalHeaderProps {
  children: React.ReactNode;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ children }) => (
  <div className="p-4 border-b border-gray-200">
    {children}
  </div>
);

interface ModalBodyProps {
  children: React.ReactNode;
}

export const ModalBody: React.FC<ModalBodyProps> = ({ children }) => (
  <div className="p-4">
    {children}
  </div>
);

interface ModalFooterProps {
  children: React.ReactNode;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({ children }) => (
  <div className="p-4 border-t border-gray-200 flex justify-end space-x-2">
    {children}
  </div>
);

export const ModalExample: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalHeader>
          <h2>Modal Title</h2>
        </ModalHeader>
        <ModalBody>
          <p>This is the modal body content.</p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleClose}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
