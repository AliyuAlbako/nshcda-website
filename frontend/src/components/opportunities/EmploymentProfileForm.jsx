import { useEffect, useRef, useState } from "react";

import RegistrationProgress from "./RegistrationProgress";
import PersonalInformation from "./PersonalInformation";
import ContactInformation from "./ContactInformation";
import EducationInformation from "./EducationInformation";
import EmploymentInformation from "./EmploymentInformation";
import SkillsInformation from "./SkillsInformation";
import ProfileNote from "./ProfileNote";
import CVUpload from "./CVUpload";
import { createEmploymentProfile } from "../../services/employmentProfileService";


import ReviewScreen from "./ReviewScreen";
import RegistrationSuccess from "./RegistrationSuccess";

import { initialFormData } from "../../data/formData";




function EmploymentProfileForm({ registrationRef }) {
  const [formData, setFormData] = useState(initialFormData);
  const [currentStep, setCurrentStep] = useState("form");
  const [sectionToEdit, setSectionToEdit] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
  const { name, value, type, checked } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value,
  }));
};

//    const confirmed = window.confirm(
//     "Are you sure you want to create your employment profile?"
// );

const handleSubmit = async () => {

  if (isSubmitting) return;

  setIsSubmitting(true);

  try {

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key !== "cv") {
        data.append(key, formData[key]);
      }
    });

    if (formData.cv) {
      data.append("cv", formData.cv);
    }

    await createEmploymentProfile(data);

    setCurrentStep("success");

  } catch (error) {

    alert(
      error.response?.data?.message ||
      "Registration failed."
    );

  } finally {

    setIsSubmitting(false);

  }

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

 {/* ================= TALENT POOL VISIBILITY ================= */}

<div className="talent-pool-visibility">

  <label className="talent-pool-checkbox">

    <input
      type="checkbox"
      name="talentPoolVisible"
      checked={formData.talentPoolVisible}
      onChange={handleChange}
    />

    <span>
      Make my profile visible to employers through the NSHCDA Talent Pool.
    </span>

  </label>

  <p className="talent-pool-help">
    Your phone number, email address and CV will not be publicly displayed.
    NSHCDA will only share your CV with verified employers upon request.
  </p>

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
    onSubmit={handleSubmit}
    onEditPersonal={() => goToSection("personal")}
  onEditContact={() => goToSection("contact")}
  onEditEducation={() => goToSection("education")}
  onEditEmployment={() => goToSection("employment")}
  onEditSkills={() => goToSection("skills")}
  onEditCV={() => goToSection("cv")}
  isSubmitting={isSubmitting}
  
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