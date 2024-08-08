import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Eventt/BookOrganizer.css';

function BookOrganizer() {
  const [selectedOrganizer, setSelectedOrganizer] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus !== 'true') {
      navigate('/BookOrganizer');
    }
  }, [navigate]);

  const handleBooking = () => {
    if (selectedOrganizer && eventName && eventDate) {
      setConfirmationMessage(`You have successfully booked ${selectedOrganizer} for your ${eventName} event on ${eventDate}.`);
      navigate('/payment'); 
    } else {
      setConfirmationMessage('Please fill in all fields.');
    }
  };

  return (
    <div className="book-organizer-container">
      <h2 className='BookOrgh2'>Book an Organizer</h2>
      <form className='BookOrgForm'>
        <label className="BookOrgLabel"htmlFor="organizer">Select Organizer:</label>
        <input
          type="text"
          id="organizer"
          value={selectedOrganizer}
          onChange={(e) => setSelectedOrganizer(e.target.value)}
          className='BookOrgInput'
        />

        <label className="BookOrgLabel"htmlFor="event-name">Event Name:</label>
        <input
          type="text"
          id="event-name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          className='BookOrgInput'
        />

        <label className="BookOrgLabel"htmlFor="event-date">Event Date:</label>
        <input
          type="date"
          id="event-date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          className='BookOrgInput'
        />

        <button className="BookOrgbtn"type="button" onClick={handleBooking}>Book Now</button>
      </form>
      {confirmationMessage && <p className="confirmation-message">{confirmationMessage}</p>}
    </div>
  );
}

export default BookOrganizer;
