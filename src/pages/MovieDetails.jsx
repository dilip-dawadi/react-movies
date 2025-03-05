import { useNavigate, useParams } from "react-router-dom";
import { useEntertainmentContext } from "../contextApi/Context";
import DetailPage from "../components/reuse/DetailPage";
import Spinner from "../components/Spinner";

const MovieDetails = () => {
  const { id } = useParams();
  const { movies, loading, error } = useEntertainmentContext();
  if (loading) return <Spinner />;
  if (error)
    return <div className="text-red-500 text-center">Error: {error}</div>;
  const movie = movies?.find((m) => Number(m.id) === Number(id));

  if (!movie)
    return <div className="text-gray-400 text-center">Movie not found.</div>;

  return <DetailPage data={movie} shows={"movie"} />;
};

export default MovieDetails;
