import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import "../Eventt/EventDetails.css";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/corporateEvents/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (!event) {
    return <div>Loading...</div>;
  }

  const handleRegister = () => {
    
      navigate(`/event-register/${id}`);
  }
  

  return (
    <div className='EventDetailesDIV'>
      <h1 className='EvDetailh1'>{event.name}</h1>
      <img className="EvDetailimg"src={event.image} alt={event.name} />
      <p className='EvDetailp1'>{event.description}</p>
      <p className='EvDetailp2'>Date: {event.date}</p>
      <p className='EvDetailpt'>Time: {event.time}</p>
      <p className='EvDetailp3'>Venue: {event.venue}</p>
      <iframe className="EvDetailIframe"src={event.gmap} width="600" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
      {/* <h3 className='EvDetailh3'>Inclusive:</h3>
      <ul>
        {event.inclusive.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <h3 className='EvDetailh3'>Exclusive:</h3>
      <ul>
        {event.exclusive.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul> */}
      {/* <p className='EvDetailp4'>Organizer: {event.organizer}</p> */}
      {/* <p className='EvDetailp5'>Organization: {event.organization}</p> */}
      <p className='EvDetailp6'>Location: {event.location}</p>
      {/* <p className='EvDetailp7'>Guest: {event.guest}</p> */}
      <p className='EvDetailp8'>Capacity: {event.capacity}</p>
      <button className="EventDetBtn"onClick={handleRegister}>Book Now</button>
      
    </div>
  );
};
export default EventDetails;
