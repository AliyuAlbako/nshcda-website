import {
  FaUser,
  FaAddressBook,
  FaGraduationCap,
  FaBriefcase,
  FaTools,
  FaFileUpload,
} from "react-icons/fa";

function RegistrationProgress() {

  const steps = [

    {
      id: 1,
      title: "Personal",
      icon: <FaUser />,
      active: true,
    },

    {
      id: 2,
      title: "Contact",
      icon: <FaAddressBook />,
    },

    {
      id: 3,
      title: "Education",
      icon: <FaGraduationCap />,
    },

    {
      id: 4,
      title: "Employment",
      icon: <FaBriefcase />,
    },

    {
      id: 5,
      title: "Skills",
      icon: <FaTools />,
    },

    {
      id: 6,
      title: "CV Upload",
      icon: <FaFileUpload />,
    },

  ];

  return (

    <div className="registration-progress">

      <div className="registration-progress-header">

        <h2>Employment Profile Registration</h2>

        <p>
          Complete the sections below to create your employment profile.
        </p>

      </div>

      <div className="progress-steps">

  {steps.map((step, index) => (

    <div
      key={step.id}
      className={`progress-step ${step.active ? "active" : ""}`}
    >

      <div className="progress-circle">

        <div className="progress-icon">
          {step.icon}
        </div>

        {index < steps.length - 1 && (
          <div className="progress-line"></div>
        )}

      </div>

      <span>{step.title}</span>

    </div>

  ))}

</div>

    </div>

  );

}

export default RegistrationProgress;