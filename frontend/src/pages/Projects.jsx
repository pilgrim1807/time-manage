import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Потом не забыть заменить на реальный запрос к API для получения списка проектов
    const fetchProjects = async () => {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      });
      const data = await response.json();
      setProjects(data);
    };

    fetchProjects();
  }, []);

  const handleDelete = async (projectId) => {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`http://localhost:5000/api/projects/${projectId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    });
    
    if (response.ok) {
      setProjects(projects.filter(project => project.id !== projectId));
    }
  };

  return (
    <div>
      <h1>Projects</h1>
      <Link to="/projects/new">Create New Project</Link>
      <ul>
        {projects.length > 0 ? (
          projects.map(project => (
            <li key={project.id}>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <Link to={`/projects/${project.id}`}>View Details</Link>
              <button onClick={() => handleDelete(project.id)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No projects found</p>
        )}
      </ul>
    </div>
  );
}

export default Projects;
