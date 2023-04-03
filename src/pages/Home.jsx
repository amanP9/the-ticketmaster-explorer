const Home = () => {
  return (
    <div className="px-12 h-[80vh] flex flex-col gap-y-3 justify-center items-center">
      <div className="flex justify-center items-center gap-28 mb-10">
        <img src="images/t.svg" className="w-48" />
        <img src="images/react.png" className="h-36" />
        <img src="images/tm.png" className="w-48" />
      </div>
      <div>
        <h1>Welcome to my React app!💜</h1>
      </div>
      <div>
        <p>
          Welcome to our React app, where we're all about the music, the energy,
          and the excitement that comes with live events.
        </p>
      </div>
      <div>
        <p>
          This app is majorly built using React, Tailwind CSS, and the
          TicketMaster API!💙
        </p>
      </div>
      <div>
        <p>
          It let's users view various events with some important details about
          them like venues, some guidelines, seat maps, and much more.
        </p>
      </div>
      <div className="px-52">
        <p>
          So come on in, take a look around, and let's celebrate the power of
          music together. Whether you're here to learn more about Ticketmaster's
          API or to share your own favorite concert stories, we're excited to
          have you as part of our community. Let's rock!
        </p>
      </div>
    </div>
  );
};

export default Home;
