import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../tailwind.css";
import { API_KEY } from "../config/config.js";

const VenueDetails = () => {
  const [venues, setVenues] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://app.ticketmaster.com/discovery/v2/venues/${id}.json?apikey=${API_KEY}&countryCode=US`
      );
      setVenues(response.data);
    };
    fetchData();
  }, [id]);

  const handleBackClick = () => {
    navigate(`/venues/`);
  };

  return (
    <div>
      <button
        className="text-white border hover:text-purple-600 hover:bg-white hover:border-purple-600 bg-purple-600 font-medium rounded-xl text-center py-3 px-6 mt-3 w-96 ml-12"
        onClick={() => {
          handleBackClick();
        }}
      >
        Back to Venues
      </button>
      <div
        key={venues.id}
        className="max-w-md mx-auto bg-white rounded-xl shadow-md p-4 overflow-hidden mt-5 ml-5 mr-5 mb-5"
      >
        <div className="grid items-center justify-between mb-4 mr-5 ml-8">
          <button>
            <h2 className="text-lg font-medium mb-2">
              {venues?.name ?? <p>No Name</p>}
            </h2>
          </button>
          <div>
            <button className="w-full h-64 object-cover object-center">
              <img
                src={venues.images ? venues.images[0].url : "/images/404.png"}
                alt={venues.name}
                className="h-60 w-full object-fill"
              />
            </button>
            <div className="p-4">
              <p>
                Address: {venues.address ? venues.address.line1 : <br />},{" "}
                {venues.city ? venues.city.name : ""},{" "}
                {venues.state ? venues.state.stateCode : ""}
                <br />
                {venues.country ? venues.country.name : ""}
              </p>
            </div>
            <div>
              <a
                href={venues.url ? venues.url : ""}
                target="_blank"
                className="w-96 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold py-1 px-4 rounded-md mt-4 hover:bg-purple-600"
              >
                Get Tickets
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueDetails;
