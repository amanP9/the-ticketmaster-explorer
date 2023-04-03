import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../tailwind.css";
import { BiLinkExternal } from "react-icons/bi";
import { BsPinMapFill } from "react-icons/bs";
import { API_KEY } from "../config/config.js";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${API_KEY}&countryCode=US`
      );
      setEvent(response.data);
    };
    fetchData();
  }, [id]);

  const handleVenueClick = (id) => {
    console.log(id);
    navigate(`/venues/${id}`);
  };

  const handleBackClick = () => {
    navigate(`/events/`);
  };

  console.log(event);
  return (
    <div className="max-w-md mx-auto mt-5">
      <button
        className="text-white border hover:text-purple-600 hover:bg-white hover:border-purple-600 bg-purple-600 font-medium rounded-xl text-center py-3 px-6 mt-3 w-full"
        onClick={() => {
          handleBackClick();
        }}
      >
        Back to Events
      </button>
      {event && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="flex items-center justify-between mb-4 px-8 py-6">
            <h3 className="text-2xl font-bold">{event.name}</h3>
            <button
              onClick={() =>
                handleVenueClick(
                  event._embedded?.venues ? event._embedded.venues[0].id : "N/A"
                )
              }
              className="text-white border hover:text-purple-600 hover:bg-white hover:border-purple-600 bg-purple-600 rounded-xl px-3 py-2"
            >
              View Venue
            </button>
          </div>

          <div className="w-full h-64">
            <img
              src={
                event.images.length > 0
                  ? event.images[0].url
                  : "/images/404.png"
              }
              alt={event.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="p-6">
            <h2 className="text-lg font-medium mb-2">{event.name}</h2>
            <p className="mb-2">Start Date: {event.dates.start.localDate}</p>

            {event._embedded ? (
              <p className="mb-2">
                Venue:{" "}
                <button
                  onClick={() => {
                    handleVenueClick(event._embedded.venues[0].id);
                  }}
                  className="text-indigo-900 hover:text-violet-600 cursor-pointer"
                >
                  {event._embedded.venues[0].name},{" "}
                  {event._embedded.venues[0].city.name},{" "}
                  {event._embedded.venues[0].country.countryCode}
                </button>
              </p>
            ) : (
              <p className="mb-2">Venue not available</p>
            )}

            {event.ageRestrictions && (
              <p className="mb-2">
                Age Restrictions:{" "}
                {event.ageRestrictions.legalAgeEnforced ? "Yes" : "No"}
              </p>
            )}

            <p className="mb-2">
              Price:{" "}
              {event.priceRanges ? (
                `${event.priceRanges[0].currency} ${event.priceRanges[0].min} - ${event.priceRanges[0].currency} ${event.priceRanges[0].max}`
              ) : (
                <p>Price Not Found</p>
              )}
            </p>

            {event.classifications[0] ? (
              event.classifications[0].genre ? (
                <p className="mb-2">
                  Genre: {event.classifications[0].genre.name}
                </p>
              ) : null
            ) : null}

            {event.dates ? (
              event.dates.status ? (
                <p className="mb-2">
                  Ticketing Status: {event.dates.status.code}
                </p>
              ) : null
            ) : null}

            {event.dates ? (
              event.dates.timezone ? (
                <p className="mb-2">Time Zone: {event.dates.timezone}</p>
              ) : null
            ) : null}

            {event.seatmap ? (
              <a
                target="_blank"
                href={event.seatmap.staticUrl}
                className="text-indigo-900 flex items-center hover:text-violet-600 cursor-pointer"
              >
                View Seat Map <BsPinMapFill className="mr-1 h-10 ml-1" />
              </a>
            ) : null}

            {event.ticketLimit ? (
              <p className="mb-2">Ticket Limit: {event.ticketLimit.info}</p>
            ) : null}

            {event.url ? (
              <a
                target="_blank"
                href={event.url}
                className="text-indigo-900 flex items-center hover:text-violet-600 cursor-pointer"
              >
                View External
                <BiLinkExternal className="mr-1 h-10 ml-1" />
              </a>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
