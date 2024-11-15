import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="mx-2 text-justify">
      <h2 className="text-xl font-bold underline text-sky-400">Who We Are</h2>
      <p>
        The Society of Marine Engineers is a community dedicated to the
        advancement of marine engineering, naval architecture, offshore
        engineering, and energy engineering. We bring together professionals,
        researchers, and students who share a passion for the marine industry,
        providing a platform for collaboration, innovation, and education.
      </p>
      <h2 className="text-xl font-bold underline text-sky-400">Our Mission</h2>
      <p>
        Our mission is to support and enhance the professional growth of marine
        engineers by fostering an environment of learning, innovation, and
        excellence. We aim to drive the industry forward by promoting
        cutting-edge research, offering networking opportunities, and advocating
        for sustainable practices in marine engineering.
      </p>
      <h2 className="text-xl font-bold underline text-sky-400">What We Offer</h2>
      <ul className="list-disc">
        <li className="ms-20">
          <span className="font-bold">Professional Development:</span> Access a wealth of resources, including
          technical papers, webinars, and certifications, to advance your
          knowledge and skills.
        </li>
        <li className="ms-20">
          <span className="font-bold">Networking Opportunities:</span> Connect with fellow marine engineers,
          industry leaders, and experts through our events, conferences, and
          online forums.
        </li>
        <li className="ms-20">
          <span className="font-bold">Industry Insights:</span> Stay informed of the latest news, trends, and
          developments in marine engineering and related fields.
        </li>
        <li className="ms-20">
          <span className="font-bold">Career Support:</span> Explore job opportunities, receive career guidance,
          and find mentorship to help you achieve your professional goals.
        </li>
        <li className="ms-20">
          <span className="font-bold">Policy development:</span> Assistance to the lawmakers and policymakers to
          develop a sustainable and green environment in terms of society,
          professionalism, and competency mapping for mankind.
        </li>
      </ul>

      <h2 className="text-xl font-bold underline text-sky-400">
        Join us to Explore, Learn and Connect
      </h2>
      <p>
        Become a part of a vibrant and growing community that’s shaping the
        future of marine and energy engineering. Whether you’re a seasoned
        professional, a recent graduate, or a student aspiring to enter the
        field, the Society of Marine Engineers offers valuable resources and
        opportunities for everyone. Together, we can chart the course for the
        future of marine and energy engineering.
      </p>
      <div className="flex gap-2 my-2">
        <Link to='/signup' className="btn btn-sm bg-blue-400 hover:bg-sky-300">Become a Member</Link>
        <button className="btn btn-sm bg-sky-300 hover:bg-blue-400" onClick={()=>alert("Button Under Maintenance!")}>Become an Alliance</button>
      </div>
    </div>
  );
};

export default Home;
