import React from 'react';
import { ExternalLink, Github, Globe } from 'lucide-react';

const Projects = () => {
  
  const projects = [
    {
      id: 1,
      title: "webOS",
      description: "Experience my portfolio site along with amazing cool applications in an OS-like environment on the web. Built with React and Redux Toolkit, it features draggable windows, multiple themes, and responsive design.",
      technologies: ["React 18", "Redux Toolkit", "Vite", "Interact.js", "Lucide React Icons", "Moment.js"],
      image: "/assets/images/webos.png",
      githubUrl: "https://github.com/vanshkallra/web-os", // replace with actual URL
      liveUrl: "https://weboslive.vercel.app", // replace with actual URL
      status: "Running"
    },
    {
      id: 2,
      title: "nextContest - Contest Tracker",
      description: "A Chrome extension to track upcoming and ongoing programming contests from multiple platforms. Get start times, durations, and live indicators, with the ability to pin contests and receive reminders.",
      technologies: ["HTML", "CSS", "Tailwind CSS", "JavaScript", "React", "Vite", "Clist API", "Node.js"],
      image: "/assets/images/nextcontest.png",
      githubUrl: "https://github.com/notixdevs/nextContest", // replace with actual URL
      liveUrl: "https://chromewebstore.google.com/detail/nextcontest-contest-track/iaegknohokdglkofffajgjogikgobban?utm_source=ext_app_menu", // Chrome extension, so no live site
      status: "Running"
    },
    {
      id: 3,
      title: "Dusk - TNP Cell of NSUT",
      description: "A placement management system streamlining the recruitment process for students, companies, and placement officers. Includes modules for job posting, applications, analytics, and notifications.",
      technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
      image: "/assets/images/dusk.png",
      githubUrl: "https://github.com/vanshkallra/Dusk---TnP-Cell-of-NSUT", // replace with actual URL
      liveUrl: null, // Localhost URL; replace if hosted
      status: "Completed"
    },
    {
      id: 4,
      title: "Line Buddy (Freelance)",
      description: "Line Buddy connects people who need someone to stand in line for them with those willing to help. Book line buddies for government offices, hospitals, events, and more with transparent pricing and flexible scheduling.",
      technologies: ["React 18", "Node.js", "Express.js", "Axios", "MongoDB", "JWT", "bcrypt"],
      image: "/assets/images/linebuddy.png",
      githubUrl: "https://github.com/vanshkallra/linebuddy-frontend", // replace with actual URL
      liveUrl: "https://linebuddyin.vercel.app", // replace with actual URL
      status: "Running"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-900 text-green-300';
      case 'Running':
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
