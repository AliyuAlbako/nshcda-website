import React from 'react'

import {
  FaTools,
} from "react-icons/fa";

function SkillsInformation({ formData, handleChange }) {
  return (
    <section className="form-card">
    
      <div className="form-section-header">
        <span className="section-number">
         05
         </span>
    
        <div className="section-icon">
          <FaTools />
        </div>
    
        <div>
    
          <h2>Skills & Interests</h2>
    
          <p>
            Tell us about your professional skills and career interests.
          </p>
    
        </div>
    
      </div>
    
      <div className="form-grid">
    
        <div className="form-group">
    
          <label>Primary Skill Area</label>
    
         <select
    name="primarySkill"
    value={formData.primarySkill}
    onChange={handleChange}
>
    
            <option>Select Skill Area</option>
    
            <option>Administration</option>
            <option>Agriculture</option>
            <option>Business Development</option>
            <option>Construction</option>
            <option>Customer Service</option>
            <option>Data Analysis</option>
            <option>Education</option>
            <option>Engineering</option>
            <option>Finance & Accounting</option>
            <option>Healthcare</option>
            <option>Human Resources</option>
            <option>ICT / Software Development</option>
            <option>Marketing</option>
            <option>Project Management</option>
            <option>Research</option>
            <option>Sales</option>
            <option>Security</option>
            <option>Skilled Trades</option>
            <option>Other</option>
    
          </select>
    
        </div>
    
        <div className="form-group">
    
          <label>Languages Spoken</label>
    
          <input
    type="text"
    name="languages"
    value={formData.languages}
    onChange={handleChange}
    placeholder="English, Hausa, Eggon..."
/>
    
        </div>
    
        <div className="form-group full-width">
    
          <label>Professional Skills</label>
    
          <textarea
    rows="4"
    name="professionalSkills"
    value={formData.professionalSkills}
    onChange={handleChange}
    placeholder="Example: Microsoft Excel, Graphic Design..."
></textarea>
    
        </div>
    
        <div className="form-group full-width">
    
          <label>Professional Certifications (Optional)</label>
    
          <textarea
    rows="3"
    name="certifications"
    value={formData.certifications}
    onChange={handleChange}
></textarea>
    
        </div>
    
        <div className="form-group full-width">
    
          <label>Career Interests</label>
    
         <textarea
    rows="3"
    name="careerInterests"
    value={formData.careerInterests}
    onChange={handleChange}
></textarea>
        </div>
    
      </div>
    
    </section>
  );
}






export default SkillsInformation;