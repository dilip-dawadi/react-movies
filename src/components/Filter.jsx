import React, { useState } from "react";

const FilterCom = ({ show = "Movie" }) => {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  const handleRatingChange = (e) => {
    setSelectedRating(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  return (
    <div>
      <h5 className="text-xl font-bold text-dark-100 mb-2">{show} Filter</h5>

      {/* Filter Controls */}
      <div className="space-y-4">
        {/* Genre Filter */}
        <div>
          <label htmlFor="genre" className="block text-md font-medium mb-2">
            Filter by Genre:
          </label>
          <select
            id="genre"
            value={selectedGenre}
            onChange={handleGenreChange}
            className="w-full px-4 py-2 border rounded-lg bg-light-100"
          >
            <option value="All">All</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Action">Action</option>
            <option value="Romance">Romance</option>
          </select>
        </div>

        {/* Rating Filter */}
        <div>
          <label htmlFor="rating" className="block text-md font-medium mb-2">
            Filter by Rating (Above):
          </label>
          <select
            id="rating"
            value={selectedRating}
            onChange={handleRatingChange}
            className="w-full px-4 py-2 border rounded-lg bg-light-100"
          >
            <option value="All">All</option>
            <option value="8.0">8.0</option>
            <option value="8.5">8.5</option>
            <option value="9.0">9.0</option>
          </select>
        </div>

        {/* Year Filter */}
        <div>
          <label htmlFor="year" className="block text-md font-medium mb-2">
            Filter by Release Year:
          </label>
          <select
            id="year"
            value={selectedYear}
            onChange={handleYearChange}
            className="w-full px-4 py-2 border rounded-lg bg-light-100"
          >
            <option value="All">All</option>
            <option value="1997">1997</option>
            <option value="1999">1999</option>
            <option value="2008">2008</option>
            <option value="2010">2010</option>
            <option value="2012">2012</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterCom;
