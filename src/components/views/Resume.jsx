// import React from 'react';
// import { Download, ExternalLink, Mail, Phone, MapPin, Calendar } from 'lucide-react';

// const Resume = () => {
//   const handleDownload = () => {
//     const resumeUrl = '/assets/resume.pdf';
//     const link = document.createElement('a');
//     link.href = resumeUrl;
//     link.download = 'John_Doe_Resume.pdf';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const handleOpenInNewTab = () => {
//     const resumeUrl = '/assets/resume.pdf';
//     window.open(resumeUrl, '_blank');
//   };

//   const resumeData = {
//     personalInfo: {
//       name: "John Doe",
//       title: "Full Stack Developer",
//       email: "john.doe@email.com",
//       phone: "+1 (555) 123-4567",
//       location: "San Francisco, CA",
//       website: "www.johndoe.dev"
//     },
//     summary: "Passionate Full Stack Developer with 5+ years of experience building scalable web applications. Expertise in React, Node.js, and cloud technologies. Strong problem-solving skills and commitment to writing clean, maintainable code.",
//     experience: [
//       {
//         title: "Senior Full Stack Developer",
//         company: "Tech Innovations Inc.",
//         location: "San Francisco, CA",
//         period: "2022 - Present",
//         achievements: [
//           "Led development of microservices architecture serving 100k+ daily users",
//           "Mentored 3 junior developers and improved team productivity by 30%",
//           "Implemented CI/CD pipelines reducing deployment time by 60%"
//         ]
//       },
//       {
//         title: "Full Stack Developer",
//         company: "Digital Solutions LLC",
//         location: "San Francisco, CA",
//         period: "2020 - 2022",
//         achievements: [
//           "Built responsive web applications using React and Node.js",
//           "Collaborated with design team to implement pixel-perfect UIs",
//           "Optimized database queries improving application performance by 40%"
//         ]
//       },
//       {
//         title: "Frontend Developer",
//         company: "StartupXYZ",
//         location: "San Francisco, CA",
//         period: "2019 - 2020",
//         achievements: [
//           "Developed user-friendly interfaces for B2B SaaS platform",
//           "Implemented responsive design principles across all platforms",
//           "Reduced page load times by 50% through code optimization"
//         ]
//       }
//     ],
//     education: [
//       {
//         degree: "Bachelor of Science in Computer Science",
//         school: "University of California, Berkeley",
//         period: "2015 - 2019",
//         details: "Relevant Coursework: Data Structures, Algorithms, Software Engineering"
//       }
//     ],
//     skills: {
//       "Frontend": ["React", "Vue.js", "JavaScript", "TypeScript", "HTML5", "CSS3", "Tailwind CSS"],
//       "Backend": ["Node.js", "Python", "Express.js", "Django", "RESTful APIs", "GraphQL"],
//       "Database": ["MongoDB", "PostgreSQL", "MySQL", "Redis"],
//       "Cloud & DevOps": ["AWS", "Docker", "Kubernetes", "Jenkins", "Git", "CI/CD"],
//       "Tools": ["VS Code", "Figma", "Postman", "Jira", "Slack"]
//     },
//     certifications: [
//       {
//         name: "AWS Certified Solutions Architect",
//         issuer: "Amazon Web Services",
//         date: "2023"
//       },
//       {
//         name: "Google Cloud Professional Cloud Architect",
//         issuer: "Google Cloud",
//         date: "2022"
//       }
//     ]
//   };

//   return (
//     <div className="resume-container bg-black text-white" style={{ height: '100%', overflowY: 'auto' }}>
//       {/* Header with action buttons */}
//       <div className="resume-header bg-gray-900 p-4 border-b border-gray-700 sticky top-0 z-10">
//         <div className="flex justify-between items-center">
//           <h1 className="text-2xl font-bold">Resume</h1>
//           <div className="flex gap-3">
//             <button
//               onClick={handleDownload}
//               className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               <Download size={16} />
//               Download PDF
//             </button>
//             <button
//               onClick={handleOpenInNewTab}
//               className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
//             >
//               <ExternalLink size={16} />
//               Open in New Tab
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="resume-content p-6">
//         {/* Personal Information */}
//         <div className="personal-info mb-8">
//           <h1 className="text-4xl font-bold mb-2">{resumeData.personalInfo.name}</h1>
//           <h2 className="text-xl text-blue-400 mb-4">{resumeData.personalInfo.title}</h2>

//           <div className="contact-info flex flex-wrap gap-4 text-sm text-gray-300">
//             <div className="flex items-center gap-1">
//               <Mail size={14} />
//               <span>{resumeData.personalInfo.email}</span>
//             </div>
//             <div className="flex items-center gap-1">
//               <Phone size={14} />
//               <span>{resumeData.personalInfo.phone}</span>
//             </div>
//             <div className="flex items-center gap-1">
//               <MapPin size={14} />
//               <span>{resumeData.personalInfo.location}</span>
//             </div>
//           </div>
//         </div>

//         {/* Professional Summary */}
//         <section className="summary mb-8">
//           <h3 className="text-xl font-semibold text-white mb-3 border-b-2 border-blue-600 pb-1">
//             Professional Summary
//           </h3>
//           <p className="text-gray-300 leading-relaxed">{resumeData.summary}</p>
//         </section>

//         {/* Experience */}
//         <section className="experience mb-8">
//           <h3 className="text-xl font-semibold text-white mb-4 border-b-2 border-blue-600 pb-1">
//             Professional Experience
//           </h3>

//           {resumeData.experience.map((job, index) => (
//             <div key={index} className="job mb-6">
//               <div className="mb-2">
//                 <h4 className="text-lg font-semibold text-white">{job.title}</h4>
//                 <div className="flex justify-between items-center text-sm text-gray-400">
//                   <span>{job.company} • {job.location}</span>
//                   <span className="flex items-center gap-1">
//                     <Calendar size={14} />
//                     {job.period}
//                   </span>
//                 </div>
//               </div>
//               <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
//                 {job.achievements.map((achievement, idx) => (
//                   <li key={idx}>{achievement}</li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </section>

//         {/* Skills */}
//         <section className="skills mb-8">
//           <h3 className="text-xl font-semibold text-white mb-4 border-b-2 border-blue-600 pb-1">
//             Technical Skills
//           </h3>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {Object.entries(resumeData.skills).map(([category, skillList]) => (
//               <div key={category}>
//                 <h4 className="font-medium text-white mb-2">{category}</h4>
//                 <div className="flex flex-wrap gap-2">
//                   {skillList.map((skill, index) => (
//                     <span 
//                       key={index}
//                       className="bg-blue-900 text-blue-300 px-2 py-1 rounded text-xs font-medium"
//                     >
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Education */}
//         <section className="education mb-8">
//           <h3 className="text-xl font-semibold text-white mb-4 border-b-2 border-blue-600 pb-1">
//             Education
//           </h3>

//           {resumeData.education.map((edu, index) => (
//             <div key={index} className="mb-4">
//               <h4 className="text-lg font-semibold text-white">{edu.degree}</h4>
//               <div className="flex justify-between items-center text-sm text-gray-400 mb-1">
//                 <span>{edu.school}</span>
//                 <span className="flex items-center gap-1">
//                   <Calendar size={14} />
//                   {edu.period}
//                 </span>
//               </div>
//               <p className="text-sm text-gray-300">{edu.details}</p>
//             </div>
//           ))}
//         </section>

//         {/* Certifications */}
//         <section className="certifications mb-6">
//           <h3 className="text-xl font-semibold text-white mb-4 border-b-2 border-blue-600 pb-1">
//             Certifications
//           </h3>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {resumeData.certifications.map((cert, index) => (
//               <div key={index} className="bg-gray-800 p-3 rounded-lg">
//                 <h4 className="font-medium text-white">{cert.name}</h4>
//                 <p className="text-sm text-gray-400">{cert.issuer}</p>
//                 <p className="text-xs text-gray-500">{cert.date}</p>
//               </div>
//             ))}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Resume;


import React from 'react';
import { Download, ExternalLink } from 'lucide-react';

const Resume = () => {
  const resumeSrc = '/assets/Resume/Resume_Apr_2025.pdf';
  const resumeUrl = 'https://drive.google.com/file/d/1qzaGGQCIBM7JEdbiWuKrEkh9WV8b-qPP/preview';

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumeSrc;
    link.download = 'Vansh_Kalra_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenInNewTab = () => {
    window.open(resumeUrl, '_blank');
  };

  return (
    <div className="resume-container bg-black text-white h-full flex flex-col">
      {/* Header */}
      <div className="bg-gray-900 p-3 border-b border-gray-700 flex justify-between items-center sticky top-0 z-10">
        <h3 className="text-2xl font-bold">Resume</h3>
        <div className="flex gap-3">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download size={16} />
            Download PDF
          </button>
          {/* <button
            onClick={handleOpenInNewTab}
            className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ExternalLink size={16} />
            Open in New Tab
          </button> */}
        </div>
      </div>

      {/* Embedded PDF Viewer */}
      <div className="flex-1 overflow-hidden">
        <iframe
          src= {resumeUrl}
          title="Resume PDF"
          width="100%"
          height="100%"
          style={{ border: 'none' }}
        ></iframe>
      </div>
    </div>
  );
};

export default Resume;
