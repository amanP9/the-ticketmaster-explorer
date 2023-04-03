import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../tailwind.css";
import { FaFacebookF } from "react-icons/im";
import { BsInstagram, BsTwitter, BsSpotify } from "react-icons/bs";
import { BiLinkExternal } from "react-icons/bi";
import { API_KEY } from "../config/config.js";

const AttractionDetails = () => {
  const { id } = useParams();
  const [attractions, setAttractions] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://app.ticketmaster.com/discovery/v2/attractions/${id}.json?apikey=${API_KEY}&countryCode=US`
      );
      console.log(id);
      setAttractions(response.data);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const handleBackClick = () => {
    navigate(`/attractions/`);
  };

  const handleImageClick = (id) => {
    navigate(`/attractions/${id}`);
    console.log("this got hit");
  };

  console.log("data", attractions);

  if (loading) {
    return (
      <div>
        <h2>Loading...</h2>
        {console.log("Still laoding")}
      </div>
    );
  } else {
    const image = attractions.images.find(
      (img) => img.ratio === "3_2" && img.width === 640
    );
    const imageUrl = image ? image.url : attractions.images[0].url;
    return (
      <div>
        <div className="grid grid-cols-3 gap-4 overflow-hidden">
          <h1 className="text-3xl font-bold text-center my-4 md:my-4 md:text-5xl md:tracking-tight md:font-extrabold md:text-gray-900 md:leading-tight col-span-3">
            <span className="block text-indigo-800 xl:inline">Attractions</span>
          </h1>
          <div className="col-span-3 mx-auto">
            <button
              className="text-white border hover:text-purple-600 hover:bg-white hover:border-purple-600 bg-purple-600 font-medium rounded-xl text-center py-3 px-6 mt-3 w-full"
              onClick={() => {
                handleBackClick();
              }}
            >
              Back to Attractions
            </button>
          </div>
          <div className="col-span-3 my-8 text-center"></div>
          <div className="col-span-3 mx-auto">
            <div className="w-[300px] h-[400px] min-w-0 mx-auto">
              <div
                key={attractions.id}
                className="bg-purple-50 rounded-md shadow-lg hover:shadow-xl"
              >
                <img
                  src={imageUrl}
                  alt={attractions.name}
                  className="object-cover w-full h-40 rounded-t-md"
                  onClick={() => handleImageClick(attractions.id)}
                />

                <div className="p-4">
                  <h2 className="text-2xl font-bold">{attractions.name}</h2>
                  <p className="mt-2">
                    {attractions.classifications ? (
                      attractions.classifications[0] ? (
                        <p>
                          Segment: {attractions.classifications[0].segment.name}
                        </p>
                      ) : null
                    ) : null}
                  </p>
                  <p className="mt-2">
                    {attractions.classifications ? (
                      attractions.classifications[0] ? (
                        <p>
                          Genre: {attractions.classifications[0].genre.name}
                        </p>
                      ) : null
                    ) : null}
                  </p>

                  <h2
                    className="text-lg font-medium mb-2"
                    onClick={() => handleImageClick(attractions.id)}
                  ></h2>
                  {attractions.url ? (
                    <a target={"_blank"} href={attractions.url}>
                      <BiLinkExternal className="mr-1 h-10 hover:text-purple-600" />
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default AttractionDetails;
