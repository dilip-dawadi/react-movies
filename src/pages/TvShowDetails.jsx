import { useNavigate, useParams } from "react-router-dom";
import { useEntertainmentContext } from "../contextApi/Context";

import DetailPage from "../components/reuse/DetailPage";
import Spinner from "../components/Spinner";

const TvShowDetails = () => {
  const { id } = useParams();
  const { tvShows, loading, error } = useEntertainmentContext();

  if (loading) return <Spinner />;
  if (error)
    return <div className="text-red-500 text-center">Error: {error}</div>;
  const tvShow = tvShows?.find((m) => Number(m.id) === Number(id));

  if (!tvShow)
    return <div className="text-gray-400 text-center">TvShow not found.</div>;

  return <DetailPage data={tvShow} shows={"tvShow"} />;
};

export default TvShowDetails;
