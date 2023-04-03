import { useRouteError } from "react-router-dom";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  console.error(error);
  const handleImageClick = () => {
    navigate(`/`);
  };
  return (
    <div id="error-page">
      <img src="/images/NotFound.jpg" className="h-[92vh] w-screen " />
    </div>
  );
}
