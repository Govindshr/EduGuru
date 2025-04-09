import { FaStar, FaRegStar } from "react-icons/fa";

const StarRating = ({ value }) => {
  const filledStars = Math.floor(value);
  const totalStars = 5;

  return (
    <div className="starRatingWrapper">
      {[...Array(totalStars)].map((_, index) =>
        index < filledStars ? (
          <FaStar key={index} className="starIcon" />
        ) : (
          <FaRegStar key={index} className="starIcon" />
        )
      )}
    </div>
  );
};
export default StarRating