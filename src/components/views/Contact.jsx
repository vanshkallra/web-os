// import React from 'react';
// import { Mail, Github, Globe, Phone } from 'lucide-react';

// const Contact = () => {
//   return (
//     <div className="contact-content">
//       <h2>Contact Information</h2>
//       <div className="contact-card">
//         <div className="contact-item">
//           <Mail className="contact-icon" />
//           <div>
//             <h4>Email</h4>
//             <p>your.email@example.com</p>
//           </div>
//         </div>
        
//         <div className="contact-item">
//           <Github className="contact-icon" />
//           <div>
//             <h4>GitHub</h4>
//             <p>github.com/yourusername</p>
//           </div>
//         </div>
        
//         <div className="contact-item">
//           <Globe className="contact-icon" />
//           <div>
//             <h4>Website</h4>
//             <p>www.yourwebsite.com</p>
//           </div>
//         </div>
        
//         <div className="contact-item">
//           <Phone className="contact-icon" />
//           <div>
//             <h4>Phone</h4>
//             <p>+1 (555) 123-4567</p>
//           </div>
//         </div>
//       </div>
      
//       <div className="contact-form">
//         <h3>Send a Message</h3>
//         <form>
//           <div className="form-group">
//             <label htmlFor="name">Name:</label>
//             <input type="text" id="name" name="name" />
//           </div>
//           <div className="form-group">
//             <label htmlFor="email">Email:</label>
//             <input type="email" id="email" name="email" />
//           </div>
//           <div className="form-group">
//             <label htmlFor="message">Message:</label>
//             <textarea id="message" name="message" rows="4"></textarea>
//           </div>
//           <button type="submit" className="submit-btn">Send Message</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Contact;

import React from 'react';
import { Mail, Github, Globe, Phone } from 'lucide-react';

const Contact = () => {
  return (
    <div className="contact-content p-6 text-white">
      <h2 className="text-3xl font-bold mb-6">Contact Information</h2>

      <div className="contact-card mb-10 space-y-4">
        <div className="contact-item flex items-center gap-4">
          <Mail className="contact-icon" />
          <div>
            <h4 className="font-semibold">Email</h4>
            <p>vanshkalra.pro@gmail.com</p>
          </div>
        </div>
        
        <div className="contact-item flex items-center gap-4">
          <Github className="contact-icon" />
          <div>
            <h4 className="font-semibold">GitHub</h4>
            <p><a href="https://github.com/vanshkallra" target='_blank'>github.com/vanshkallra</a></p>
          </div>
        </div>
        
        <div className="contact-item flex items-center gap-4">
          <Globe className="contact-icon" />
          <div>
            <h4 className="font-semibold">Website</h4>
            <p><a href="https://weboslive.vercel.app" target='_blank'>weboslive.vercel.app</a></p>
          </div>
        </div>
        
        <div className="contact-item flex items-center gap-4">
          <Phone className="contact-icon" />
          <div>
            <h4 className="font-semibold">Phone</h4>
            <p>+91 9667564592</p>
          </div>
        </div>
      </div>
 
      <div className="contact-form">
        <h3 className="text-2xl font-bold mb-4">Send a Message</h3>
        
        <form 
          action="https://formsubmit.co/7d076b9c6bc8d3c43106578da27627fd" 
          method="POST"
          className="space-y-4 max-w-lg"
        >
          {/* Disable CAPTCHA and set subject */}
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_subject" value="New Message from Contact Form" />

          <div className="form-group flex flex-col">
            <label htmlFor="name">Name:</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              required 
              className="bg-gray-800 border border-gray-600 p-2 rounded text-white"
            />
          </div>

          <div className="form-group flex flex-col">
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required 
              className="bg-gray-800 border border-gray-600 p-2 rounded text-white"
            />
          </div>

          <div className="form-group flex flex-col">
            <label htmlFor="message">Message:</label>
            <textarea 
              id="message" 
              name="message" 
              rows="4" 
              required 
              className="bg-gray-800 border border-gray-600 p-2 rounded text-white"
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="submit-btn bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
