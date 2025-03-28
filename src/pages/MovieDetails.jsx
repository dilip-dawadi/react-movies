import { useParams } from "react-router-dom";
import DetailPage from "../components/reuse/DetailPage";
import { useEffect, useState } from "react";
import api from "../API";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async (type, setState) => {
    try {
      setLoading(true);
      const response = await api.get(`/${type}/${id}`);
      setState(response.data);
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchData("movies", setMovie);
  }, [id]);

  if (error)
    return <div className="text-red-500 text-center">Error: {error}</div>;

  if (!movie)
    return <div className="text-gray-400 text-center">Movie not found.</div>;

  return <DetailPage data={movie} loading={loading} />;
};

export default MovieDetails;
