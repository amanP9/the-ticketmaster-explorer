import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Events from "./pages/events.jsx";
import Venues from "./pages/venues.jsx";
import Attractions from "./pages/attractions.jsx";
import NotFound from "./pages/NotFound.jsx";
import AttractionDetails from "./pages/attractionDetails";
import EventDetails from "./pages/eventDetails";
import VenueDetails from "./pages/venueDetails";
import "./tailwind.css";
import Navbar from "./components/navbar.jsx";

fetch(
  "https://app.ticketmaster.com/discovery/v2/events.json?apikey=RoG3a8wbJc3aPxLMrI3KEQF7GiYdi3ZN"
)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" errorElement={<NotFound />} element={<Root />}>
        <Route index element={<Home />} />
        <Route
          path="/venues"
          element={<Navigate to="/venues/page/1" replace />}
        />
        <Route
          path="/events"
          element={<Navigate to="/events/page/1" replace />}
        />
        <Route
          path="/attractions"
          element={<Navigate to="/attractions/page/1" replace />}
        />
        <Route path="/NotFound.jsx" element={<NotFound />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/attractions/:id" element={<AttractionDetails />} />
        <Route path="/venues/:id" element={<VenueDetails />} />
        <Route path="/attractions/page/:page" element={<Attractions />} />
        <Route path="/events/page/:page" element={<Events />} />
        <Route path="/venues/page/:page" element={<Venues />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};

const Root = () => {
  return (
    <>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </>
  );
};
export default App;
