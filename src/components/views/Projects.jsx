import React from 'react';
import { ExternalLink, Github, Globe } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "JWT"],
      image: "/api/placeholder/300/200",
      githubUrl: "https://github.com/username/ecommerce",
      liveUrl: "https://myecommerce.com",
      status: "Completed"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      technologies: ["React", "Socket.io", "Express", "PostgreSQL"],
      image: "/api/placeholder/300/200",
      githubUrl: "https://github.com/username/taskmanager",
      liveUrl: "https://mytaskapp.com",
      status: "Completed"
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "A responsive weather dashboard that provides detailed weather information, forecasts, and interactive maps using multiple weather APIs.",
      technologies: ["Vue.js", "Weather API", "Chart.js", "Tailwind CSS"],
      image: "/api/placeholder/300/200",
      githubUrl: "https://github.com/username/weather-dashboard",
      liveUrl: "https://myweather.com",
      status: "Completed"
    },
    {
      id: 4,
      title: "AI Chat Bot",
      description: "An intelligent chatbot using natural language processing to provide customer support and answer frequently asked questions.",
      technologies: ["Python", "TensorFlow", "Flask", "OpenAI API"],
      image: "/api/placeholder/300/200",
      githubUrl: "https://github.com/username/ai-chatbot",
      liveUrl: null,
      status: "In Progress"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-900 text-green-300';
      case 'In Progress':
        return 'bg-yellow-900 text-yellow-300';
      default:
        return 'bg-gray-700 text-gray-300';
    }
  };

  return (
    <div className="projects-container p-6 bg-black text-white" style={{ height: '100%', overflowY: 'auto' }}>
      <div className="projects-header mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">My Projects</h1>
        <p className="text-gray-400">Here are some of the projects I've worked on recently.</p>
      </div>

      <div className="projects-grid grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="project-card bg-gray-800 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-700 transition duration-300 overflow-hidden">
            <div className="project-image">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMjUgNzVIMTc1VjEyNUgxMjVWNzVaIiBmaWxsPSIjRDFEOURCIi8+CjwvZXZnPg==';
                }}
              />
            </div>
            
            <div className="project-content p-5">
              <div className="project-header flex justify-between items-start mb-3">
                <h3 className="project-title text-xl font-semibold text-white">{project.title}</h3>
                <span className={`project-status px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
              
              <p className="project-description text-gray-300 mb-4 text-sm leading-relaxed">
                {project.description}
              </p>
              
              <div className="project-technologies mb-4">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index} 
                      className="tech-tag bg-blue-900 text-blue-300 px-2 py-1 rounded text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="project-links flex gap-3">
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-link flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
                >
                  <Github size={16} />
                  <span className="text-sm">Code</span>
                </a>
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link flex items-center gap-1 text-blue-400 hover:text-blue-200 transition-colors"
                  >
                    <Globe size={16} />
                    <span className="text-sm">Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="projects-footer mt-8 text-center">
        <p className="text-gray-400 mb-4">Want to see more projects or collaborate?</p>
        <a 
          href="https://github.com/vanshkallra" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
        >
          <Github size={18} />
          <span>View All Projects on GitHub</span>
        </a>
      </div>
    </div>
  );
};

export default Projects;
