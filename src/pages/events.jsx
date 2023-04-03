import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import SearchEvents from "../components/searchEvents";
import { API_KEY } from "../config/config.js";

const Events = () => {
  const { page } = useParams();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [pageNumber, setPageNumber] = useState(Number(page) - 1 || 0);
  const [pageSize, setPageSize] = useState(12);
  const [searchData, setSearchData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&countryCode=US&page=${pageNumber}&size=${pageSize}`
      );
      setEvents(response.data._embedded.events);
      setLoading(false);
    };
    fetchData();
  }, [pageNumber, pageSize]);

  const nextPage = () => {
    setPageNumber(pageNumber + 1);
    const nextPage = parseInt(page) + 1;
    navigate(`/events/page/${nextPage}`);
  };

  const prevPage = () => {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
      const prevPage = parseInt(page) - 1;
      navigate(`/events/page/${prevPage}`);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&countryCode=US&keyword=${searchTerm}`
        );
        setSearchData(response.data._embedded.events);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    if (searchTerm) {
      fetchData();
    }
  }, [searchTerm]);

  const searchValue = async (value) => {
    setSearchTerm(value);
  };

  const handleImageClick = (id) => {
    navigate(`/events/${id}`);
  };

  const handleVenueClick = (id) => {
    console.log(id);
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
            <span className="block text-indigo-800 xl:inline">Events</span>
          </h1>
          <div className="col-span-3 flex justify-center">
            <SearchEvents searchValue={searchValue} />
          </div>
          <div className="col-span-3 my-4 text-center">
            <span className="bg-gray-200 text-gray-900 font-bold py-2 px-4 rounded-md mx-4">
              Search Results for "{searchTerm}"
            </span>
          </div>
          {searchData.map((event) => (
            <div
              key={event.id}
              className="max-w-md mx-auto bg-white rounded-xl shadow-md p-4 overflow-hidden mt-5 ml-5 mr-5 mb-5"
            >
              <div className="flex items-center justify-between mb-4 mr-5 ml-8">
                <h3 className="text-2xl font-bold hover:text-violet-600 cursor-pointer">
                  {event.name}
                </h3>
                <button
                  onClick={() =>
                    handleVenueClick(
                      event._embedded?.venues
                        ? event._embedded.venues[0].id
                        : "N/A"
                    )
                  }
                  className="text-gray-700 hover:text-gray-900 bg-slate-500 rounded-xl"
                ></button>
              </div>
              <button
                onClick={() => handleImageClick(event.id)}
                className="w-full h-64 object-cover object-center "
              >
                <img
                  src={
                    event.images.length > 0
                      ? event.images[0].url
                      : "/images/404.png"
                  }
                  alt={event.name}
                  className="h-60 w-full object-fill rounded-2xl hover:text-violet-600 cursor-pointer"
                />
              </button>

              <div className="p-4">
                <button>
                  <h2
                    className="text-lg font-medium mb-2 hover:text-violet-600 cursor-pointer"
                    onClick={() => handleImageClick(event.id)}
                  >
                    {event.name}
                  </h2>
                </button>
                <p>Start Date: {event.dates.start.localDate}</p>

                {event._embedded ? (
                  <p className="hover:text-violet-600 cursor-pointer">
                    Venue:{" "}
                    <button
                      onClick={() => {
                        handleVenueClick(event._embedded.venues[0].id);
                      }}
                    >
                      {" "}
                      {event._embedded.venues[0].name},{" "}
                      {event._embedded.venues[0].city.name},{" "}
                      {event._embedded.venues[0].country.countryCode}
                    </button>
                  </p>
                ) : (
                  <p>Venue not available</p>
                )}
                {event.ageRestrictions && (
                  <p>
                    Age Restrictions:{" "}
                    {event.ageRestrictions.legalAgeEnforced ? "Yes" : "No"}
                  </p>
                )}
                <p>
                  Price:{" "}
                  {event.priceRanges
                    ? `${event.priceRanges[0].currency} ${event.priceRanges[0].min} - ${event.priceRanges[0].currency} ${event.priceRanges[0].max}`
                    : `Price Not Found`}
                </p>
                <br />
                <button
                  onClick={() => {
                    handleImageClick(event.id);
                  }}
                  className="text-white border hover:text-purple-600 hover:bg-white hover:border-purple-600 bg-purple-600 font-medium rounded-xl text-center py-3 px-6 mt-3 w-full"
                >
                  More Info
                </button>
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className="grid grid-cols-3 gap-4 overflow-hidden">
          <h1 className="text-3xl font-bold text-center my-4 md:my-4 md:text-5xl md:tracking-tight md:font-extrabold md:text-gray-900 md:leading-tight col-span-3">
            <span className="block text-indigo-800 xl:inline">Events</span>
          </h1>
          <div className="col-span-3 flex justify-center">
            <SearchEvents searchValue={searchValue} />
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
          {events.map((event) => (
            <div
              key={event.id}
              className="max-w-md mx-auto bg-white rounded-xl shadow-md p-4 overflow-hidden mt-5 ml-5 mr-5 mb-5"
            >
              <div className="flex items-center justify-between mb-4 mr-5 ml-8">
                <h3 className="text-2xl font-bold hover:text-violet-600 cursor-pointer">
                  {event.name}
                </h3>
                <button
                  onClick={() =>
                    handleVenueClick(
                      event._embedded?.venues
                        ? event._embedded.venues[0].id
                        : "N/A"
                    )
                  }
                  className="text-gray-700 hover:text-gray-900 bg-slate-500 rounded-xl"
                ></button>
              </div>
              <button
                onClick={() => handleImageClick(event.id)}
                className="w-full h-64 object-cover object-center "
              >
                <img
                  src={
                    event.images.length > 0
                      ? event.images[0].url
                      : "/images/404.png"
                  }
                  alt={event.name}
                  className="h-60 w-full object-fill rounded-2xl hover:text-violet-600 cursor-pointer"
                />
              </button>

              <div className="p-4">
                <button>
                  <h2
                    className="text-lg font-medium mb-2 hover:text-violet-600 cursor-pointer"
                    onClick={() => handleImageClick(event.id)}
                  >
                    {event.name}
                  </h2>
                </button>
                <p>Start Date: {event.dates.start.localDate}</p>

                {event._embedded ? (
                  <p className="hover:text-violet-600 cursor-pointer">
                    Venue:{" "}
                    <button
                      onClick={() => {
                        handleVenueClick(event._embedded.venues[0].id);
                      }}
                    >
                      {" "}
                      {event._embedded.venues[0].name},{" "}
                      {event._embedded.venues[0].city.name},{" "}
                      {event._embedded.venues[0].country.countryCode}
                    </button>
                  </p>
                ) : (
                  <p>Venue not available</p>
                )}
                {event.ageRestrictions && (
                  <p>
                    Age Restrictions:{" "}
                    {event.ageRestrictions.legalAgeEnforced ? "Yes" : "No"}
                  </p>
                )}
                <p>
                  Price:{" "}
                  {event.priceRanges
                    ? `${event.priceRanges[0].currency} ${event.priceRanges[0].min} - ${event.priceRanges[0].currency} ${event.priceRanges[0].max}`
                    : `Price Not Found`}
                </p>
                <br />
                <button
                  onClick={() => {
                    handleImageClick(event.id);
                  }}
                  className="text-white border hover:text-purple-600 hover:bg-white hover:border-purple-600 bg-purple-600 font-medium rounded-xl text-center py-3 px-6 mt-3 w-full"
                >
                  More Info
                </button>
              </div>
            </div>
          ))}
        </div>
      );
    }
  }
};

export default Events;
