import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../tailwind.css";
import SearchVenues from "../components/searchVenues";
import { API_KEY } from "../config/config.js";

const Venues = () => {
  const { page } = useParams();
  const navigate = useNavigate();
  const [venues, setVenues] = useState([]);
  const [pageNumber, setPageNumber] = useState(Number(page) - 1 || 0);
  const [pageSize, setPageSize] = useState(12);
  const [searchData, setSearchData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get(
          `https://app.ticketmaster.com/discovery/v2/venues.json?apikey=${API_KEY}&countryCode=US&size=${pageSize}&page=${pageNumber}`
        );
        setVenues(response.data._embedded.venues);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchVenues();
  }, [pageNumber, pageSize]);

  const nextPage = () => {
    setPageNumber(pageNumber + 1);
    const nextPage = parseInt(page) + 1;
    navigate(`/venues/page/${nextPage}`);
  };

  const prevPage = () => {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
      const prevPage = parseInt(page) - 1;
      navigate(`/venues/page/${prevPage}`);
    }
  };

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get(
          `https://app.ticketmaster.com/discovery/v2/venues.json?apikey=${API_KEY}&countryCode=US&keyword=${searchTerm}`
        );
        setSearchData(response.data._embedded.venues);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchVenues();
  }, [searchTerm]);

  const searchValue = async (value) => {
    setSearchTerm(value);
  };

  const handleImageClick = (id) => {
    navigate(`/venues/${id}`);
  };

  if (loading) {
    return (
      <div>
        <h2>Loading...</h2>
        {console.log("Still laoding")}
      </div>
    );
  } else {
    if (searchTerm && searchData) {
      return (
        <div className="grid grid-cols-3 gap-4 overflow-hidden">
          <h1 className="text-3xl font-bold text-center my-4 md:my-12 md:text-5xl md:tracking-tight md:font-extrabold md:text-gray-900 md:leading-tight col-span-3">
            <span className="block text-indigo-800 xl:inline">Venues</span>
          </h1>
          <div className="col-span-3 flex justify-center">
            <SearchVenues searchValue={searchValue} />
          </div>
          <div className="col-span-3 my-4 text-center">
            <span class="bg-gray-200 text-gray-900 font-bold py-2 px-4 rounded-md mx-4">
              Search Results for "{searchTerm}"
            </span>
          </div>
          {searchData.map((venue) => (
            <div
              key={venue.id}
              className="max-w-md mx-auto bg-white rounded-xl shadow-md p-4 overflow-hidden mt-5 ml-5 mr-5 mb-5"
            >
              <div className="grid items-center justify-between mb-4 mr-5 ml-8">
                <button onClick={() => handleImageClick(venue.id)}>
                  <h2 className="text-lg font-medium mb-2 hover:text-violet-600 cursor-pointer">
                    {venue.name}
                  </h2>
                </button>
                <div>
                  <button
                    onClick={() => handleImageClick(venue.id)}
                    className="w-full h-64 object-cover object-center"
                  >
                    <img
                      src={
                        venue.images ? venue.images[0].url : "/images/404.png"
                      }
                      alt={venue.name}
                      className="h-60 w-full object-fill"
                    />
                  </button>

                  <div className="p-4">
                    <p>
                      {venue.city.name}, {venue.state.stateCode}
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        handleImageClick(venue.id);
                      }}
                      className="text-white border hover:text-purple-600 hover:bg-white hover:border-purple-600 bg-purple-600 font-medium rounded-xl text-center py-3 px-6 mt-3 w-full"
                    >
                      More Info
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className="grid grid-cols-3 gap-4 overflow-hidden">
          <h1 className="text-3xl font-bold text-center my-4 md:my-4 md:text-5xl md:tracking-tight md:font-extrabold md:text-gray-900 md:leading-tight col-span-3">
            <span className="block text-indigo-800 xl:inline">Venues</span>
          </h1>
          <div className="col-span-3 flex justify-center">
            <SearchVenues searchValue={searchValue} />
          </div>
          <div className="col-span-3 my-8 text-center">
            <button
              onClick={prevPage}
              class="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-l-md text-sm"
            >
              Prev
            </button>
            <span class="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-md mx-4">
              {pageNumber + 1}
            </span>
            <button
              onClick={nextPage}
              class="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-r-md text-sm"
            >
              Next
            </button>
          </div>
          {venues.map((venue) => (
            <div
              key={venue.id}
              className="max-w-md mx-auto bg-white rounded-xl shadow-md p-4 overflow-hidden mt-5 ml-5 mr-5 mb-5"
            >
              <div className="grid items-center justify-between mb-4 mr-5 ml-8">
                <button onClick={() => handleImageClick(venue.id)}>
                  <h2 className="text-lg font-medium mb-2">{venue.name}</h2>
                </button>
                <div>
                  <button
                    onClick={() => handleImageClick(venue.id)}
                    className="w-full h-64 object-cover object-center"
                  >
                    <img
                      src={
                        venue.images ? venue.images[0].url : "/images/404.png"
                      }
                      alt={venue.name}
                      className="h-60 w-full object-fill"
                    />
                  </button>

                  <div className="p-4">
                    <p>
                      {venue.city.name}, {venue.state.stateCode}
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        handleImageClick(venue.id);
                      }}
                      className="text-white border hover:text-purple-600 hover:bg-white hover:border-purple-600 bg-purple-600 font-medium rounded-xl text-center py-3 px-6 mt-3 w-full"
                    >
                      More Info
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  }
};

export default Venues;
