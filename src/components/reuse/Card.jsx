import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({
  data: { id, title, poster, releaseYear, genre, rating },
  shows,
}) => {
  const navigate = useNavigate();

  return (
    <div className="card" onClick={() => navigate(`/${shows}/${id}`)}>
      <img
        src={
          poster
            ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${poster}`
            : "/no-movie.png"
        }
        className="h-64 object-contain"
        alt={title}
      />

      <div className="mt-4">
        <h3>{title}</h3>

        <div className="content">
          <div className="rating">
            <img src="/star.svg" alt="Star Icon" />
            <p>{rating ? rating.toFixed(1) : "N/A"}</p>
          </div>

          <span>•</span>
          <p className="lang">{genre?.split(",")[0]}</p>

          <span>•</span>
          <p className="year">{releaseYear ? releaseYear : "N/A"}</p>
        </div>
      </div>
    </div>
  );
};
export default Card;
