import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../Eventt/EventRegister.css';
import VirtualPart from '../../image/virtual-participation.png';
import { TokenContext } from '../Context/TokenProvider';
import UserContext from '../Context/UserContext';

const EventRegister = () => {
  const sectionsRef = useRef([]);
  const { user } = useContext(UserContext);
  const { token } = useContext(TokenContext);
  const { id } = useParams();
  const navigate = useNavigate();

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

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    city: '',
    state: '',
    zipcode: '',
    eventId: parseInt(id),
    userId: user.id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { ...formData };

    console.log('Data sent to server:', data);

    try {
      const response = await axios.post('http://localhost:8000/event-registers/', data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const paymentId=response.data.id;
      if (response.status === 200 || response.status === 201) {
        alert('Registration successful!');
        navigate(`/payment/${paymentId}`);
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting registration:', error.response);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="EventRegFull">
      <table className="EventRegTable">
        <section ref={(el) => (sectionsRef.current[0] = el)} className="EventReghidden1">
          <img className="EventRegImg" src={VirtualPart} alt="Virtual Participation" />
          <p className="EventRegh1">Event Registration</p>
          <form className="eventRegForm" onSubmit={handleSubmit}>
            <tr>
              <td><label className="eventRegLabel" htmlFor="firstName">First Name: </label></td>
              <td><input
                type="text"
                id="firstName"
                className="eventRegInput"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              /></td>
            </tr>
            <tr>
              <td><label className="eventRegLabel" htmlFor="lastName">Last Name: </label></td>
              <td><input
                type="text"
                id="lastName"
                className="eventRegInput"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              /></td>
            </tr>
            <tr>
              <td><label className="eventRegLabel" htmlFor="email">Email: </label></td>
              <td><input
                type="email"
                id="email"
                className="eventRegInput"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              /></td>
            </tr>
            <tr>
              <td><label className="eventRegLabel" htmlFor="age">Age: </label></td>
              <td><input
                type="number"
                id="age"
                className="eventRegInput"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
              /></td>
            </tr>
            <tr>
              <td><label className="eventRegLabel" htmlFor="city">City: </label></td>
              <td><input
                type="text"
                id="city"
                className="eventRegInput"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              /></td>
            </tr>
            <tr>
              <td><label className="eventRegLabel" htmlFor="state">State: </label></td>
              <td><input
                type="text"
                id="state"
                className="eventRegInput"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              /></td>
            </tr>
            <tr>
              <td><label className="eventRegLabel" htmlFor="zipcode">Zipcode: </label></td>
              <td><input
                type="text"
                id="zipcode"
                className="eventRegInput"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleChange}
                required
              /></td>
            </tr>

            <button className="eventRegbtn">Register</button>
          </form>
        </section>
      </table>
    </div>
  );
};

export default EventRegister;
