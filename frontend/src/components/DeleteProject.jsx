import React, { useState } from 'react';
import Modal from './Modal';

const DeleteProject = ({ projectId, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const handleDeleteProject = (projectId) => {
    setShowModal(true);
    setProjectToDelete(projectId);
  };

  const handleConfirmDelete = async () => {
    await onDelete(projectToDelete); // oтправка запроса на удаление
    setShowModal(false);
  };

  return (
    <div>
      {showModal && (
        <Modal 
          message="Вы уверены, что хотите удалить этот проект?" 
          onConfirm={handleConfirmDelete} 
          onCancel={() => setShowModal(false)} 
        />
      )}
      <button onClick={() => handleDeleteProject(projectId)}>Удалить проект</button>
    </div>
  );
};

export default DeleteProject;
