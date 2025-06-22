import React from 'react';

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      skills: [
        { name: "React", level: 90 },
        { name: "JavaScript", level: 85 },
        { name: "TypeScript", level: 80 },
        { name: "CSS/SCSS", level: 85 },
        { name: "HTML5", level: 95 },
        { name: "Vue.js", level: 75 }
      ]
    },
    {
      title: "Backend Development",
      skills: [
        { name: "Node.js", level: 80 },
        { name: "Python", level: 75 },
        { name: "Express.js", level: 85 },
        { name: "MongoDB", level: 70 },
        { name: "PostgreSQL", level: 75 }
      ]
    },
    {
      title: "Tools & Technologies",
      skills: [
        { name: "Git", level: 90 },
        { name: "Webpack", level: 70 },
        { name: "Vite", level: 85 },
        { name: "Docker", level: 65 },
        { name: "AWS", level: 60 }
      ]
    }
  ];

  return (
    <div className="skills-content">
      <h2>Technical Skills</h2>
      {skillCategories.map((category, index) => (
        <div key={index} className="skill-category">
          <h3>{category.title}</h3>
          <div className="skills-grid">
            {category.skills.map((skill, skillIndex) => (
              <div key={skillIndex} className="skill-item">
                <div className="skill-header">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-percentage">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div 
                    className="skill-progress" 
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      <div className="certifications">
        <h3>Certifications & Education</h3>
        <ul>
          <li>React Developer Certification</li>
          <li>JavaScript ES6+ Certification</li>
          <li>Full Stack Web Development</li>
          <li>Computer Science Degree</li>
        </ul>
      </div>
    </div>
  );
};

export default Skills;