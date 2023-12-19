import { useEffect, useState } from "react";
import TitlePage from "../components/TitlePage";
import { Link, useParams } from "react-router-dom";
import { useHttp } from "../hooks/useHttp";
import { Test } from "../types";

const FinalizePage = () => {
  const [results, setResults] = useState<Test | null>(null);

  const { slug } = useParams();
  const { request } = useHttp();

  useEffect(() => {
    request(`tests/${slug}`)
      .then((data) => setResults(data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="other-page">
      <TitlePage>Results</TitlePage>
      {results ? (
        <div className="other-main">
          <h2>{results.name}</h2>
          <p>
            Type: <span>{results.type}</span>
          </p>
          <p>
            Status: <span>{results.status}</span>
          </p>
          <p>
            Test ID: <span>{results.id}</span>
          </p>
        </div>
      ) : (
        <div className="other-main"></div>
      )}
      <Link to="/">
        <button className="button-back">
          <svg
            style={{
              transform: "rotate(-90deg)",
            }}
            width="9"
            height="6"
            viewBox="0 0 7 4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 3.50001L3.13529 0.364716L3.5 7.15256e-06L3.86471 0.364716L7 3.50001L6.63529 3.86472L3.5 0.729424L0.364708 3.86472L0 3.50001Z"
              fill="#999999"
            />
          </svg>
          <span>Back</span>
        </button>
      </Link>
    </div>
  );
};

export default FinalizePage;
