import React from 'react';

const Modal = ({ children, onClose, isLocked }) => {
  return (
    <dialog className="modal-overlay" aria-modal="true">
      {!isLocked && (
        <span className="modal-bg-close" onClick={onClose} aria-hidden="true"></span>
      )}
      <span className="modal-content">
        {children}
      </span>
    </dialog>
  );
};

export default Modal;
