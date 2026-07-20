import {
    FaUser,
    FaPhone,
    FaGraduationCap,
    FaBriefcase,
    FaTools,
    FaFileAlt,
    FaEdit,
    FaCheckCircle
} from "react-icons/fa";

function ProfileReview({
    profile,
    onEdit,
    onSubmit
}) {

    return (

        <section className="form-card">

            <div className="review-header">

                <FaCheckCircle />

                <div>

                    <h2>Review Your Employment Profile</h2>

                    <p>

                        Please review your information carefully before
                        submitting your registration.

                    </p>

                </div>

            </div>

            {/* PERSONAL */}

            <div className="review-section">

                <h3>

                    <FaUser />

                    Personal Information

                </h3>

                <div className="review-grid">

                    <span>

                        <strong>Name</strong>

                        {profile.fullName}

                    </span>

                    <span>

                        <strong>Gender</strong>

                        {profile.gender}

                    </span>

                    <span>

                        <strong>Date of Birth</strong>

                        {profile.dateOfBirth}

                    </span>

                    <span>

                        <strong>LGA</strong>

                        {profile.lga}

                    </span>

                </div>

            </div>

            {/* CONTACT */}

            <div className="review-section">

                <h3>

                    <FaPhone />

                    Contact Information

                </h3>

                <div className="review-grid">

                    <span>

                        <strong>Email</strong>

                        {profile.email}

                    </span>

                    <span>

                        <strong>Phone</strong>

                        {profile.phone}

                    </span>

                    <span>

                        <strong>Address</strong>

                        {profile.address}

                    </span>

                </div>

            </div>

            {/* EDUCATION */}

            <div className="review-section">

                <h3>

                    <FaGraduationCap />

                    Education

                </h3>

                <div className="review-grid">

                    <span>

                        <strong>Qualification</strong>

                        {profile.qualification}

                    </span>

                    <span>

                        <strong>Institution</strong>

                        {profile.institution}

                    </span>

                    <span>

                        <strong>Field</strong>

                        {profile.fieldOfStudy}

                    </span>

                    <span>

                        <strong>Graduation Year</strong>

                        {profile.graduationYear}

                    </span>

                </div>

            </div>

            {/* EMPLOYMENT */}

            <div className="review-section">

                <h3>

                    <FaBriefcase />

                    Employment

                </h3>

                <div className="review-grid">

                    <span>

                        <strong>Status</strong>

                        {profile.employmentStatus}

                    </span>

                    <span>

                        <strong>Experience</strong>

                        {profile.experience}

                    </span>

                    <span>

                        <strong>Employment Type</strong>

                        {profile.employmentType}

                    </span>

                    <span>

                        <strong>Sector</strong>

                        {profile.sector}

                    </span>

                </div>

            </div>

            {/* SKILLS */}

            <div className="review-section">

                <h3>

                    <FaTools />

                    Skills

                </h3>

                <div className="review-grid">

                    <span>

                        <strong>Primary Skill</strong>

                        {profile.primarySkill}

                    </span>

                    <span>

                        <strong>Languages</strong>

                        {profile.languages}

                    </span>

                </div>

            </div>

            {/* CV */}

            <div className="review-section">

                <h3>

                    <FaFileAlt />

                    Uploaded CV

                </h3>

                <p>

                    {profile.cvName}

                </p>

            </div>

            <div className="review-actions">

                <button
                    className="edit-btn"
                    onClick={onEdit}
                >

                    <FaEdit />

                    Edit Information

                </button>

                <button
                    className="submit-profile-btn"
                    onClick={onSubmit}
                >

                    Submit Registration

                </button>

            </div>

        </section>

    );

}

export default ProfileReview;