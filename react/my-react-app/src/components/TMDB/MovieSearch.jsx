import { useState } from "react";
import axios from "axios";
import Movie from "./Movie";
// BASE_URL 과 API_KEY 를 선언하고, 적절한 값을 할당한다
const BASE_URL = `https://api.themoviedb.org/3`;
const API_KEY = import.meta.env["VITE_TMDB_API_KEY"];
export default function MovieSearch() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  async function searchM(event) {
    event.preventDefault();
    const config = {
      method: "GET",
      url: `${BASE_URL}/search/movie`,
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      params: {
        language: "ko-KR",
        page: 1,
        query: query,
      },
    };

    const res = await axios(config);
    console.log(res);
    setMovies(res["data"]["results"]);
  }
  // 검색 결과와 검색어를 관리할 적절한 상태를 생성한다

  // onSubmit 이벤트와 onChange 이벤트의 핸들러 함수를 정의한다
  function handleSubmit(e) {
    searchM(search);
    e.preventDefault();
  }
  function handleChange(e) {
    setSearch(e["target"]["value"]);
  }
  return (
    <div>
      <form
        onSubmit={() => {
          // form 태그의 onSubmit 속성에서 실행할 함수를 정의하고, 호출한다
          handleSubmit();
        }}
      >
        <input
          type="text"
          placeholder="영화 이름"
          onChange={() => {
            // input 태그의 onChange 속성에서 실행할 함수를 정의하고, 호출한다
            handleChange();
          }}
        />
        <input type="submit" value={search} />
      </form>
      <ul>
        {/* Movie 컴포넌트를 활용하여 검색된 영화 데이터를 반복 생성하여 표시 */}
        {movies.map((movie) => {
          <Movie key={movie.id} moives={movie}></Movie>;
        })}
      </ul>
    </div>
  );
}
