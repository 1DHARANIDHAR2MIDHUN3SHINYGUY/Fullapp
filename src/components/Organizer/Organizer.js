import React from 'react'
import Header from '../Header/Header';
import 'intersection-observer'
import { useEffect, useRef } from 'react';
import OrgBanner from '../../image/Org.png'
import { useNavigate } from 'react-router-dom';
import '../Organizer/Organizer.css';

const Organizer = () => {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        } else {
          entry.target.classList.remove('show');
        }
      });
    });

    const elements = sectionsRef.current.filter(Boolean);

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const navigate = useNavigate();
  const events = [
    {
      id:1,
      title: 'Club parties',
      imageUrl: `${process.env.PUBLIC_URL}event_party1.jpg`,
    },
    {
      id:2,
      title: 'Marriage Events',
      imageUrl: `${process.env.PUBLIC_URL}event_party2.jpg`,
    },
    {
      id:3,
      title: 'Birthday Celebrations',
      imageUrl: `${process.env.PUBLIC_URL}event_party3.jpg`,
    },
    {
      id:4,
      title: 'Conference Events',
      imageUrl: `${process.env.PUBLIC_URL}conference.jpg`,
    },
    {
      id:5,
      title: 'Product Launch',
      imageUrl: `${process.env.PUBLIC_URL}Product_launch.jpeg`,
    },
    {
      id:6,
      title: 'Trade Show',
      imageUrl: `${process.env.PUBLIC_URL}TradaShow.jpg`,
    },
  ];

  const handleBookNowClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <div className='Org'>
      <Header />
      <div className='Odiv1'>
        <section ref={(el) => (sectionsRef.current[0] = el)} className="Ohidden1">
          <p className='subOrgPara1'>Faster check-in, better <br />event experience</p>
          <p className='subOrgPara2'>
            Get your attendees through the line and in the door faster with <br /> our powerful, easy-to-use, and contactless check-in and  <br />badging solutions. Even better: it’s all mobile.</p>
          <pre></pre>
          <img src={OrgBanner} className='OrgImg1' />
        </section>
      </div>

        <div className="featured-events">
          <section ref={(el) => (sectionsRef.current[1] = el)} className='Ohidden2'>
            <h2 className='Orgh2'>Featured Events</h2>
            <div className="events-grid">
              {events.map((event, index) => (
                <div key={index} className="event-card">
                  <img className="OrgImg"src={event.imageUrl} alt={event.title} />
                  <h3>{event.title}</h3>
                  <button className="Orgbtn" onClick={() => handleBookNowClick(event.id)}>Book Now</button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
  )
}

export default Organizer;