import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import "../Eventt/EventDetails.css";
import { TokenContext } from '../Context/TokenProvider';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { token } = useContext(TokenContext);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/corporate-events/${id}/`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        setEvent(response.data);
      } catch (error) {
        setError('Error fetching event details.');
        console.error('Error fetching event details:', error);
      }
    };

    fetchEventDetails();
  }, [id, token]);

  if (!event) {
    return (
      <div>
        {error ? <p>{error}</p> : <p>Loading...</p>}
      </div>
    );
  }

  const handleRegister = () => {
    navigate(`/event-register/${id}`);
  };


  return (
    <div className='EventDetailesDIV'>
      <h1 className='EvDetailh1'>{event.name}</h1>
      <img className="EvDetailimg" src={event.image} alt={event.name} />
      <p className='EvDetailp1'>{event.description}</p>
      <p className='EvDetailp2'>Date: {event.date}</p>
      <p className='EvDetailpt'>Time: {event.time}</p>
      <p className='EvDetailp3'>Venue: {event.venue}</p>
      <iframe className="EvDetailIframe" src={event.gmap} width="600" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
      <p className='EvDetailp6'>Location: {event.location}</p>
      <p className='EvDetailp8'>Capacity: {event.capacity}</p>
      <button className="EventDetBtn" onClick={handleRegister}>Book Now</button>
    </div>
  );
};

export default EventDetails;
