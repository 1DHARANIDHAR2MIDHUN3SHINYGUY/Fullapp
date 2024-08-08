import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../Eventt/EventRegister.css';
import { useEffect, useRef } from 'react';
import VirtualPart from '../../image/virtual-participation.png';
import PaymentPage from './PaymentPage';

const EventRegister = () => {

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

    const elements = sectionsRef.current.filter(Boolean); // Filter out null values

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);


    let { eventId } = useParams(); // Extract eventId from the URL parameters
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId'); // Get userId from localStorage
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        age: '',
        businessName: '',
        organizationName: '',
        businessAddress: '',
        city: '',
        state: '',
        zipcode: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();



        const data = { ...formData, userId, eventId }; // Include userId and eventId in the data sent to the server

        console.log('Data sent to server:', data); // Log data to verify eventId inclusion

        try {
            const response = await axios.post('http://localhost:8080/event_register', data);

            if (response.status === 200 || response.status === 201) {
                alert('Registration successful!');
                navigate('/payment');
            } else {
                alert('Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting registration:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div className='EventRegFull'>
            <table>
            <section ref={(el) => (sectionsRef.current[0] = el)} className="EventReghidden1">
            <img className="EventRegImg"src={VirtualPart} />
            <h1 className='EventRegh1'>Event Registration</h1>
            <form className="registration-form" onSubmit={handleSubmit}>
                <tr>
                <td><label className="EventRegLabel" htmlFor="firstName">First Name: </label></td>
                <td><input
                    type="text"
                    id="firstName"
                    className="form-control"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
                </td>
                </tr>
                <br />
                <tr>
                <td><label className="EventRegLabel" htmlFor="lastName">Last Name: </label></td>
                <td><input
                    type="text"
                    id="lastName"
                    className="form-control"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
                </td>
                </tr>

                <br />
                <tr>
                <td><label className="EventRegLabel" htmlFor="email">Email: </label></td>
                <td><input
                    type="email"
                    id="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                </td>
                </tr>
                <br />
                <tr>
                <td><label className="EventRegLabel" htmlFor="age">Age: </label></td>
                <td><input
                    type="number"
                    id="age"
                    className="form-control"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                />
                </td>
                </tr>

                <br />
                <tr>
                <td><label className="EventRegLabel" htmlFor="businessName">Business Name: </label></td>
                <td><input
                    type="text"
                    id="businessName"
                    className="form-control"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                />
                </td>
                </tr>
                <br />
                <tr>
                <td><label className="EventRegLabel" htmlFor="organizationName">Organization Name: </label></td>
                <td><input
                    type="text"
                    id="organizationName"
                    className="form-control"
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleChange}
                />
                </td>
                </tr>

<br />
<tr>
<td><label className="EventRegLabel" htmlFor="businessAddress">Business Address: </label></td>
                <td><textarea
                    id="businessAddress"
                    className="form-control"
                    rows={4}
                    name="businessAddress"
                    value={formData.businessAddress}
                    onChange={handleChange}
                    required
                /></td>
                </tr>
                <br />
                <tr>
                <td><label className="EventRegLabel" htmlFor="city">City: </label></td>
                <td><input
                    type="text"
                    id="city"
                    className="form-control"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                /></td>
                </tr>
<br />
<tr>
<td><label className="EventRegLabel" htmlFor="state">State: </label></td>
                <td><input
                    type="text"
                    id="state"
                    className="form-control"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                /></td>
                </tr>
                <br />
                <tr>
                <td><label className="EventRegLabel" htmlFor="zipcode">Zipcode: </label></td>
                <td><input
                    type="text"
                    id="zipcode"
                    className="form-control"
                    name="zipcode"
                    value={formData.zipcode}
                    onChange={handleChange}
                    required
                />
                </td>
                </tr>
                <br />
<tr>
                <button type="submit" className="">Register</button>
                </tr>
            </form>
            </section>
            </table>
            {/* <PaymentPage /> */}
        </div>
    );
};

export default EventRegister;
