import React from 'react';

const Modal = ({ message, onConfirm, onCancel }) => (
  <div className="modal">
    <div className="modal-content">
      <p>{message}</p>
      <button onClick={onConfirm}>Подтвердить</button>
      <button onClick={onCancel}>Отмена</button>
    </div>
  </div>
);

export default Modal;
