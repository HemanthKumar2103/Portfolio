import styles from './ProjectsStyles.module.css';

function Projects() {
  const projectList = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce application with React, Node.js, and MongoDB. Features user authentication, shopping cart, payment integration with Stripe, and admin dashboard.",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe API", "JWT"],
      githubLink: "https://github.com/HemanthKumar2103",
      liveLink: "#",
      status: "Completed",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Responsive task management application with drag-and-drop functionality, real-time updates, task categorization, and team collaboration features.",
      technologies: ["React", "TypeScript", "Firebase", "Material-UI", "React DnD"],
      githubLink: "https://github.com/HemanthKumar2103",
      liveLink: "#",
      status: "In Progress",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop"
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "Modern weather application with location-based forecasts, interactive maps, weather alerts, and beautiful data visualizations using Chart.js.",
      technologies: ["React", "OpenWeather API", "Chart.js", "Geolocation", "CSS3"],
      githubLink: "https://github.com/HemanthKumar2103/weather-dashboard",
      liveLink: "https://weatherdashboard213.netlify.app/",
      status: "Completed",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=250&fit=crop"
    },
    {
      id: 4,
      title: "Social Media Dashboard",
      description: "Analytics dashboard for social media management with real-time data visualization, post scheduling, and engagement tracking across platforms.",
      technologies: ["Next.js", "Tailwind CSS", "Prisma", "PostgreSQL", "Chart.js"],
      githubLink: "https://github.com/HemanthKumar2103",
      liveLink: "#",
      status: "Planning",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop"
    },
    {
      id: 5,
      title: "Portfolio Website",
      description: "Modern, responsive portfolio website with interactive animations, theme switching, and optimized performance. Built with React and modern CSS.",
      technologies: ["React", "CSS3", "Vite", "Responsive Design", "Animations"],
      githubLink: "https://github.com/HemanthKumar2103",
      liveLink: "#",
      status: "Completed",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=250&fit=crop"
    },
    {
      id: 6,
      title: "Chat Application",
      description: "Real-time chat application with Socket.io, user authentication, file sharing, emoji support, and responsive design for seamless communication.",
      technologies: ["React", "Socket.io", "Node.js", "Express", "MongoDB"],
      githubLink: "https://github.com/HemanthKumar2103",
      liveLink: "#",
      status: "In Progress",
      image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=400&h=250&fit=crop"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return '#00ff88';
      case 'In Progress': return '#ffd93d';
      case 'Planning': return '#ff6b6b';
      default: return '#667eea';
    }
  };

  return (
    <section id="projects" className={styles.container}>
      <h1 className="sectionTitle">Projects</h1>
      <div className={styles.projectsContainer}>
        {projectList.map((project) => (
          <div key={project.id} className={styles.projectCard}>
            <div className={styles.projectImage}>
              <img src={project.image} alt={project.title} />
              <div className={styles.projectOverlay}>
                <div className={styles.projectLinks}>
                  <a 
                    href={project.githubLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.projectLink}
                  >
                    GitHub
                  </a>
                  <a 
                    href={project.liveLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.projectLink}
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
            <div className={styles.projectContent}>
              <div className={styles.projectHeader}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <span 
                  className={styles.projectStatus}
                  style={{ backgroundColor: getStatusColor(project.status) }}
                >
                  {project.status}
                </span>
              </div>
              <p className={styles.projectDescription}>{project.description}</p>
              <div className={styles.technologies}>
                {project.technologies.map((tech, index) => (
                  <span key={index} className={styles.techTag}>{tech}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
