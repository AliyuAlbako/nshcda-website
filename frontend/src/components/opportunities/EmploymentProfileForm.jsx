import { useEffect, useRef, useState } from "react";

import RegistrationProgress from "./RegistrationProgress";
import PersonalInformation from "./PersonalInformation";
import ContactInformation from "./ContactInformation";
import EducationInformation from "./EducationInformation";
import EmploymentInformation from "./EmploymentInformation";
import SkillsInformation from "./SkillsInformation";
import ProfileNote from "./ProfileNote";
import CVUpload from "./CVUpload";


import ReviewScreen from "./ReviewScreen";
import RegistrationSuccess from "./RegistrationSuccess";

import { initialFormData } from "../../data/formData";




function EmploymentProfileForm({ registrationRef }) {
  const [formData, setFormData] = useState(initialFormData);
  const [currentStep, setCurrentStep] = useState("form");
  const [sectionToEdit, setSectionToEdit] = useState(null);
  
  const personalRef = useRef(null);
  const contactRef = useRef(null);
  const educationRef = useRef(null);
  const employmentRef = useRef(null);
  const skillsRef = useRef(null);
  const cvRef = useRef(null);
 

const sectionRefs = {
  personal: personalRef,
  contact: contactRef,
  education: educationRef,
  employment: employmentRef,
  skills: skillsRef,
  cv: cvRef,
};
  const goToSection = (section) => {
  setSectionToEdit(section);
  setCurrentStep("form");
};


useEffect(() => {
    if (currentStep !== "form" || !sectionToEdit) {
        registrationRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }
}, [currentStep, sectionToEdit]);


useEffect(() => {

  if (
    currentStep === "form" &&
    sectionToEdit &&
    sectionRefs[sectionToEdit]?.current
  ) {

    sectionRefs[sectionToEdit].current.scrollIntoView({

      behavior: "smooth",

      block: "start",

    });

    setSectionToEdit(null);

  }

}, [currentStep, sectionToEdit]);


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      {/* ================= FORM ================= */}
      {currentStep === "form" && (
        <div className="employment-profile-form">

          <RegistrationProgress />

          <div ref={personalRef}>
          <PersonalInformation
            formData={formData}
            handleChange={handleChange}
          />
          </div>

        
          <div ref={contactRef}>
          <ContactInformation
            formData={formData}
            handleChange={handleChange}
          />
          </div>
      <div ref={educationRef}>
          <EducationInformation
            formData={formData}
            handleChange={handleChange}
          />
          </div>
    <div ref={employmentRef}>
          <EmploymentInformation
            formData={formData}
            handleChange={handleChange}
          />
          </div>
  <div ref={skillsRef}>
          <SkillsInformation
            formData={formData}
            handleChange={handleChange}
          />
          </div>

          <ProfileNote />

    <div ref={cvRef}>    
         <CVUpload
          formData={formData}
          setFormData={setFormData}
          />
          </div>

          <button
            type="button"
            className="submit-profile-btn"
            onClick={() => setCurrentStep("review")}
          >
            Continue
          </button>

        </div>
      )}

      {/* ================= REVIEW ================= */}
{currentStep === "review" && (
  <ReviewScreen
    formData={formData}
    onBack={() => setCurrentStep("form")}
    onSubmit={() => setCurrentStep("success")}
    onEditPersonal={() => goToSection(personalRef)}
    onEditContact={() => goToSection(contactRef)}
    onEditEducation={() => goToSection(educationRef)}
    onEditEmployment={() => goToSection(employmentRef)}
    onEditSkills={() => goToSection(skillsRef)}
    onEditCV={() => goToSection(cvRef)}
  />
)}

      {/* ================= SUCCESS ================= */}
      {currentStep === "success" && (
        <RegistrationSuccess />
      )}
    </>
  );
}

export default EmploymentProfileForm;