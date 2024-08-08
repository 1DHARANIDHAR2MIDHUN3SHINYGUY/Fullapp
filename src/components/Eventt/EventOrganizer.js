import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Eventt/EventOrganizer.css';

const organizers = [
  { 
    name: 'John Doe', 
    email: 'john@example.com', 
    phone: '+123 456 7890',
    events: 'Marriage, Birthday Parties',
    description: 'Experienced in organizing large-scale marriage events and fun-filled birthday parties.',
    rating: 3.8
  },
  { 
    name: 'Jane Smith', 
    email: 'jane@example.com', 
    phone: '+123 456 7891',
    events: 'Corporate Events, Conferences',
    description: 'Specializes in organizing corporate events and professional conferences.',
    rating: 4.4
  },
  { 
    name: 'Alice Johnson', 
    email: 'alice@example.com', 
    phone: '+123 456 7892',
    events: 'Festivals, Workshops',
    description: 'Expert in managing cultural festivals and interactive workshops.',
    rating: 3.9
  },
  { 
    name: 'Bob Brown', 
    email: 'bob@example.com', 
    phone: '+123 456 7893',
    events: 'Concerts, Charity Events',
    description: 'Passionate about organizing concerts and charity events to support good causes.',
    rating: 4.8
  },
  { 
    name: 'Charlie White', 
    email: 'charlie@example.com', 
    phone: '+123 456 7894',
    events: 'Weddings, Private Parties',
    description: 'Known for organizing memorable weddings and exclusive private parties.',
    rating:4.2
  },
  { 
    name: 'Dave Black', 
    email: 'dave@example.com', 
    phone: '+123 456 7895',
    events: 'All Events',
    description: 'Versatile event manager with experience in handling all types of events.',
    rating:4.4
  },
  { 
    name: 'Eve Green', 
    email: 'eve@example.com', 
    phone: '+123 456 7896',
    events: 'Product Launches, Trade Shows',
    description: 'Skilled in coordinating product launches and trade shows to perfection.',
    rating:4.9
  },
  { 
    name: 'Frank Blue', 
    email: 'frank@example.com', 
    phone: '+123 456 7897',
    events: 'Sporting Events, Competitions',
    description: 'Specializes in organizing sporting events and various competitions.',
    rating:3.8
  },
  { 
    name: 'Grace Purple', 
    email: 'grace@example.com', 
    phone: '+123 456 7898',
    events: 'Themed Parties, Holiday Events',
    description: 'Creative organizer for themed parties and festive holiday events.',
    rating:4.9
  },
  { 
    name: 'Hank Red', 
    email: 'hank@example.com', 
    phone: '+123 456 7899',
    events: 'Music Festivals, Art Exhibitions',
    description: 'Experienced in organizing large-scale music festivals and art exhibitions.',
    rating:4.9
  },
  { 
    name: 'Ivy Yellow', 
    email: 'ivy@example.com', 
    phone: '+123 456 7800',
    events: 'Networking Events, Meetups',
    description: 'Expert in organizing networking events and community meetups.',
    rating:3.7
  },
  { 
    name: 'Jack Orange', 
    email: 'jack@example.com', 
    phone: '+123 456 7801',
    events: 'Family Reunions, Picnics',
    description: 'Enjoys organizing fun family reunions and outdoor picnics.',
    rating:5.3
  },
  { 
    name: 'Kara Pink', 
    email: 'kara@example.com', 
    phone: '+123 456 7802',
    events: 'Exhibitions, Fairs',
    description: 'Skilled in managing exhibitions and fairs with great attention to detail.',
    rating:4.8
  },
  { 
    name: 'Leo Gray', 
    email: 'leo@example.com', 
    phone: '+123 456 7803',
    events: 'Tech Conferences, Hackathons',
    description: 'Tech-savvy organizer for tech conferences and hackathons.',
    rating:3.9
  },
  { 
    name: 'Mona Cyan', 
    email: 'mona@example.com', 
    phone: '+123 456 7804',
    events: 'Cultural Events, Dance Shows',
    description: 'Specializes in organizing cultural events and spectacular dance shows.',
    rating:4.4
  },
  { 
    name: 'Nick Brown', 
    email: 'nick@example.com', 
    phone: '+123 456 7805',
    events: 'Food Festivals, Cooking Classes',
    description: 'Loves organizing food festivals and interactive cooking classes.',
    rating:4.4
  },
  { 
    name: 'Olivia White', 
    email: 'olivia@example.com', 
    phone: '+123 456 7806',
    events: 'Book Launches, Literary Events',
    description: 'Passionate about organizing book launches and literary events.',
    rating:4.7
  },
  { 
    name: 'Paul Black', 
    email: 'paul@example.com', 
    phone: '+123 456 7807',
    events: 'Photography Exhibitions, Art Shows',
    description: 'Experienced in organizing photography exhibitions and art shows.',
    rating:4.5
  },
  { 
    name: 'Quinn Green', 
    email: 'quinn@example.com', 
    phone: '+123 456 7808',
    events: 'Fashion Shows, Modeling Events',
    description: 'Expert in managing fashion shows and modeling events.',
    rating:4.9
  },
  { 
    name: 'Ruth Blue', 
    email: 'ruth@example.com', 
    phone: '+123 456 7809',
    events: 'Charity Galas, Fundraisers',
    description: 'Passionate about organizing charity galas and fundraising events.',
    rating:3.3
  },
  { 
    name: 'Sam Purple', 
    email: 'sam@example.com', 
    phone: '+123 456 7810',
    events: 'Academic Conferences, Seminars',
    description: 'Specializes in organizing academic conferences and educational seminars.',
    rating:4.0
  },
  { 
    name: 'Tina Red', 
    email: 'tina@example.com', 
    phone: '+123 456 7811',
    events: 'Community Events, Social Gatherings',
    description: 'Enjoys organizing community events and social gatherings.',
    rating:4.0
  },
  { 
    name: 'Uma Yellow', 
    email: 'uma@example.com', 
    phone: '+123 456 7812',
    events: 'Carnivals, Street Fairs',
    description: 'Expert in organizing lively carnivals and street fairs.',
    rating:4.3
  },
  // { 
  //   name: 'Vince Orange', 
  //   email: 'vince@example.com', 
  //   phone: '+123 456 7813',
  //   events: 'Wellness Retreats, Yoga Workshops',
  //   description: 'Specializes in organizing wellness retreats and yoga workshops.',
  //   rating:4.6
  // },
  // { 
  //   name: 'Wendy Pink', 
  //   email: 'wendy@example.com', 
  //   phone: '+123 456 7814',
  //   events: 'Pet Shows, Animal Events',
  //   description: 'Loves organizing pet shows and animal-themed events.',
  //   rating:4.9
  // },
];

function EventOrganizer({ isAuthenticated }) {
  const navigate = useNavigate();

  const handleOrganizerClick = (organizer) => {
    // if (isAuthenticated) {
    // } else {
    //   navigate('/login');
    // }
    // navigate('/book-organizer', { state: { organizer } });
    navigate('/bookorganizer');
  };
  return (
    <div className="organizers-container">
      <h2 className='EventOrgh2'>Event Organizers</h2>
      <ul className="organizers-list">
        {organizers.map((organizer, index) => (
          <li key={index} className="organizer-card" onClick={() => handleOrganizerClick(organizer)}>
            <h3 className='EventOrgh3'>{organizer.name}</h3>
            <p className='EventOrgPara'>Email: {organizer.email}</p>
            <p>Phone: {organizer.phone}</p>
            <p>Events: {organizer.events}</p>
            <p>{organizer.description}</p>
            <div className="rating">
              <span className='EventOrgSpan'>Rating: {organizer.rating.toFixed(1)}</span>
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`star ${i < Math.floor(organizer.rating) ? 'filled' : ''}`}>★</span>
                ))}
              </div>
            </div>
            <button className='EventOrgbtn' onClick={() => handleOrganizerClick(organizer)}>Register</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventOrganizer;