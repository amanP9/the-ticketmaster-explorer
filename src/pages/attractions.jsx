import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../tailwind.css";
import SearchAttractions from "../components/searchAttractions";
import { API_KEY } from "../config/config.js";

const Attractions = () => {
  const { page } = useParams();
  const navigate = useNavigate();
  const [attractions, setAttractions] = useState([]);
  const [pageNumber, setPageNumber] = useState(Number(page) - 1 || 0);
  const [pageSize, setPageSize] = useState(12);
  const [searchData, setSearchData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        const res = await axios.get(
          `https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=${API_KEY}&page=${pageNumber}&size=${pageSize}`
        );
        setAttractions(res.data._embedded.attractions);
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    };
    fetchAttractions();
  }, [pageNumber, pageSize]);

  const nextPage = () => {
    setPageNumber(pageNumber + 1);
    const nextPage = parseInt(page) + 1;
    navigate(`/attractions/page/${nextPage}`);
  };

  const prevPage = () => {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
      const prevPage = parseInt(page) - 1;
      navigate(`/attractions/page/${prevPage}`);
    }
  };

  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        const response = await axios.get(
          `https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=${API_KEY}&countryCode=US&keyword=${searchTerm}`
        );
        setSearchData(response.data._embedded.attractions);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAttractions();
  }, [searchTerm]);

  const searchValue = async (value) => {
    setSearchTerm(value);
  };

  const handleImageClick = (id) => {
    navigate(`/attractions/${id}`);
  };

  if (loading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  } else {
    if (searchTerm && searchData) {
      const attractionsWithImages = searchData.map((attraction) => {
        const image = attraction.images.find(
          (img) => img.ratio === "3_2" && img.width === 640
        );
        const imageUrl = image ? image.url : attraction.images[0].url;

        return {
          ...attraction,
          imageUrl: imageUrl,
        };
      });
      return (
        <div className="grid grid-cols-3 gap-4 overflow-hidden">
          <h1 className="text-3xl font-bold text-center my-4 md:my-12 md:text-5xl md:tracking-tight md:font-extrabold md:text-gray-900 md:leading-tight col-span-3">
            <span className="block text-indigo-800 xl:inline">Attractions</span>
          </h1>
          <div className="col-span-3 flex justify-center">
            <SearchAttractions searchValue={searchValue} />
          </div>
          <div className="col-span-3 my-4 text-center">
            <span className="bg-gray-200 text-gray-900 font-bold py-2 px-4 rounded-md mx-4">
              Search Results for "{searchTerm}"
            </span>
          </div>
          {attractionsWithImages.map((attraction) => (
            <div className="w-[300px] h-[400px] min-w-0 mx-auto">
              <div
                key={attraction.id}
                className="bg-purple-50 rounded-md shadow-lg hover:shadow-xl"
              >
                <img
                  src={attraction.images[0].url}
                  alt={attraction.name}
                  className="object-cover w-full h-40 rounded-t-md"
                  onClick={() => handleImageClick(attraction.id)}
                />
                <div className="p-4">
                  <h2 className="text-2xl font-bold">{attraction.name}</h2>
                  {attraction.classifications[0]?.genre?.name ? (
                    <p className="mt-2">
                      {attraction.classifications[0].genre.name}
                    </p>
                  ) : (
                    <p className="mt-2">Genre Name Not Found</p>
                  )}
                </div>
                <div>
                  <button
                    onClick={() => {
                      handleImageClick(attraction.id);
                    }}
                    className="text-white border hover:text-purple-600 hover:bg-white hover:border-purple-600 bg-purple-600 font-medium rounded-xl text-center py-3 px-6 mt-3 w-full"
                  >
                    More Info
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      const attractionsWithImages = attractions.map((attraction) => {
        const image = attraction.images.find(
          (img) => img.ratio === "3_2" && img.width === 640
        );
        const imageUrl = image ? image.url : attraction.images[0].url;

        return {
          ...attraction,
          imageUrl: imageUrl,
        };
      });
      return (
        <div className="grid grid-cols-3 gap-4 overflow-hidden">
          <h1 className="text-3xl font-bold text-center my-4 md:my-4 md:text-5xl md:tracking-tight md:font-extrabold md:text-gray-900 md:leading-tight col-span-3">
            <span className="block text-indigo-800 xl:inline">Attractions</span>
          </h1>
          <div className="col-span-3 flex justify-center">
            <SearchAttractions searchValue={searchValue} />
          </div>
          <div className="col-span-3 my-8 text-center">
            <button
              onClick={prevPage}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-l-md text-sm"
            >
              Prev
            </button>
            <span className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-md mx-4">
              {pageNumber + 1}
            </span>
            <button
              onClick={nextPage}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-r-md text-sm"
            >
              Next
            </button>
          </div>
          {attractionsWithImages.map((attraction) => (
            <div className="w-[300px] h-[400px] min-w-0 mx-auto">
              <div
                key={attraction.id}
                className="bg-purple-50 rounded-md shadow-lg hover:shadow-xl"
              >
                <img
                  src={attraction.imageUrl}
                  alt={attraction.name}
                  className="object-cover w-full h-40 rounded-t-md"
                  onClick={() => handleImageClick(attraction.id)}
                />
                <div className="p-4">
                  <h2 className="text-2xl font-bold">{attraction.name}</h2>
                  <p className="mt-2">
                    {attraction.classifications[0].genre.name}
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => {
                      handleImageClick(attraction.id);
                    }}
                    className="text-white border hover:text-purple-600 hover:bg-white hover:border-purple-600 bg-purple-600 font-medium rounded-xl text-center py-3 px-6 mt-3 w-full"
                  >
                    More Info
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  }
};

export default Attractions;
