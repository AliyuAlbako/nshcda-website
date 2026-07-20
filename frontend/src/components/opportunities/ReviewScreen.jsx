import {
  FaUser,
  FaAddressBook,
  FaGraduationCap,
  FaBriefcase,
  FaTools,
  FaFileAlt,
  FaCheckCircle
} from "react-icons/fa";

import ReviewCard from "./ReviewCard";


function ReviewScreen({
  formData,
  onBack,
  onSubmit,
  onEditPersonal,
  onEditContact,
  onEditEducation,
  onEditEmployment,
  onEditSkills,
  onEditCV,
}) {
    return (

        <div className="review-screen">

            <div className="review-header">

                <div className="review-success-icon">
                    <FaCheckCircle />
                </div>

                <h1>Review & Confirm Your Employment Profile</h1>

                    <p>

                    Before creating your profile, please review all the information below.
                    If you notice any mistakes, use the <strong>Edit</strong> button on the relevant section to make changes.

                    </p>
            </div>

            {/* Personal Information */}

           <ReviewCard
    icon={<FaUser />}
    title="Personal Information"
    onEdit={onEditPersonal}
>

    <div className="review-grid">

        <div className="review-item">
            <span className="review-label">First Name</span>
            <span className="review-value">
                {formData.firstName || "Not Provided"}
            </span>
        </div>

        <div className="review-item">
            <span className="review-label">Last Name</span>
            <span className="review-value">
                {formData.lastName || "Not Provided"}
            </span>
        </div>

        <div className="review-item">
            <span className="review-label">Gender</span>
            <span className="review-value">
                {formData.gender || "Not Provided"}
            </span>
        </div>

        <div className="review-item">
            <span className="review-label">Date of Birth</span>
            <span className="review-value">
                {formData.dateOfBirth || "Not Provided"}
            </span>
        </div>

        <div className="review-item">
            <span className="review-label">Nationality</span>
            <span className="review-value">
                {formData.nationality || "Not Provided"}
            </span>
        </div>

        <div className="review-item">
            <span className="review-label">LGA</span>
            <span className="review-value">
                {formData.lga || "Not Provided"}
            </span>
        </div>

    </div>

</ReviewCard>

            {/* contact information */}
          <ReviewCard
    icon={<FaAddressBook />}
    title="Contact Information"
    onEdit={onEditContact}
>

    <div className="review-grid">

        <div className="review-item">
            <span className="review-label">Email Address</span>
            <span className="review-value">
                {formData.email || "Not Provided"}
            </span>
        </div>

        <div className="review-item">
            <span className="review-label">Phone Number</span>
            <span className="review-value">
                {formData.phone || "Not Provided"}
            </span>
        </div>

        <div className="review-item full-width">
            <span className="review-label">Residential Address</span>
            <span className="review-value">
                {formData.address || "Not Provided"}
            </span>
        </div>

    </div>

</ReviewCard>

{/* Education  */}
<ReviewCard
    icon={<FaGraduationCap />}
    title="Education Information"
    onEdit={onEditEducation}
>

    <div className="review-grid">

        <div className="review-item">
            <span className="review-label">Highest Qualification</span>
            <span className="review-value">{formData.qualification || "Not Provided"}</span>
        </div>

        <div className="review-item">
            <span className="review-label">Field of Study</span>
            <span className="review-value">{formData.fieldOfStudy || "Not Provided"}</span>
        </div>

        <div className="review-item">
            <span className="review-label">Institution</span>
            <span className="review-value">
              {formData.institution || "Not Provided"}
            </span>
        </div>

        <div className="review-item">
            <span className="review-label">Graduation Year</span>
            <span className="review-value">{formData.graduationYear || "Not Provided"}</span>
        </div>

        <div className="review-item">
            <span className="review-label">Grade/Class</span>
            <span className="review-value">
         {formData.grade || "Not Provided"}
            </span>
        </div>

        <div className="review-item">
            <span className="review-label">NYSC Status</span>
            <span className="review-value">
         {formData.nyscStatus || "Not Provided"}
            </span>
        </div>

    </div>

</ReviewCard>

{/* employment */}

<ReviewCard
    icon={<FaBriefcase />}
    title="Employment Information"
    onEdit={onEditEmployment}
>

    <div className="review-grid">

        <div className="review-item">
            <span className="review-label">Employment Status</span>
            <span className="review-value">{formData.employmentStatus || "Not Provided"}</span>
        </div>

        <div className="review-item">
            <span className="review-label">Experience</span>
            <span className="review-value">{formData.experience || "Not Provided"}</span>
        </div>

        <div className="review-item">
            <span className="review-label">Employment Type</span>
            <span className="review-value">{formData.employmentType || "Not Provided"}</span>
        </div>

        <div className="review-item">
            <span className="review-label">Preferred Sector</span>
            <span className="review-value">{formData.sector || "Not Provided"}</span>
        </div>

        <div className="review-item">
            <span className="review-label">Preferred Location</span>
            <span className="review-value">{formData.preferredLocation || "Not Provided"}</span>
        </div>

        <div className="review-item">
            <span className="review-label">Available To Start</span>
            <span className="review-value">{formData.availability || "Not Provided"}</span>
        </div>

    </div>

</ReviewCard>

{/* skills */}

<ReviewCard
    icon={<FaTools />}
    title="Skills & Interests"
    onEdit={onEditSkills}
>

    <div className="review-grid">

        <div className="review-item">
            <span className="review-label">Primary Skill</span>
            <span className="review-value">
               {formData.primarySkill || "Not Provided"}
            </span>
        </div>

        <div className="review-item">
            <span className="review-label">Languages</span>
            <span className="review-value">
                {formData.languages || "Not Provided"}
            </span>
        </div>

        <div className="review-item full-width">
            <span className="review-label">
                Professional Skills
            </span>
            <span className="review-value">
               {formData.professionalSkills || "Not Provided"}
            </span>
        </div>

        <div className="review-item full-width">
            <span className="review-label">
                Certifications
            </span>
            <span className="review-value">
            {formData.certifications || "Not Provided"}
            </span>
        </div>

        <div className="review-item full-width">
            <span className="review-label">
                Career Interests
            </span>
            <span className="review-value">
               {formData.careerInterests || "Not Provided"}
            </span>
        </div>

    </div>

</ReviewCard>

{/* Cv card */}

<ReviewCard
    icon={<FaFileAlt />}
    title="Uploaded CV"
    onEdit={onEditCV}
>

    <div className="uploaded-cv">

        <FaFileAlt className="cv-icon" />

        <div>

           <h4>
    {formData.cv?.name || "No CV Uploaded"}
</h4>

           <p>
       {formData.cv
        ? "Your CV is ready for submission."
        : "Please upload your CV before submitting."}
        </p>

        </div>

    </div>

</ReviewCard>


<div className="review-notice">

    <strong>Declaration</strong>

    <p>

        By creating this employment profile, you confirm that the
        information provided is accurate to the best of your knowledge.
        Providing false information may affect your eligibility for
        employment opportunities.

    </p>

</div>
<div className="review-actions">

    <button
    type="button"
    className="review-back-btn"
    onClick={onBack}
>
    ← Back to Form
</button>

<button
    type="button"
    className="review-submit-btn"
    onClick={onSubmit}
>
    Create Employment Profile
</button>

</div>

 </div>

    );

}

export default ReviewScreen;