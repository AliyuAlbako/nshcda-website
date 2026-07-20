import { FaEdit } from "react-icons/fa";

function ReviewCard({
  icon,
  title,
  children,
  onEdit,
}) {
  return (
    <div className="review-card">

      <div className="review-card-header">

        <div className="review-card-title">

          <span className="review-card-icon">
            {icon}
          </span>

          <h3>{title}</h3>

        </div>

        <button
          type="button"
          className="review-edit-btn"
          onClick={onEdit}
        >
          <FaEdit />
          Edit
        </button>

      </div>

      <div className="review-card-body">

        {children}

      </div>

    </div>
  );
}

export default ReviewCard;