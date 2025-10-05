import React, { useEffect } from "react";

export default function Movie({ movies }) {
  return (
    <div>
      <p>{movies.title}</p>
      <p>{movies.overview}</p>
      <p>{movies.release_date}</p>
      <p>{movies.vote_average}</p>
    </div>
  );
}
