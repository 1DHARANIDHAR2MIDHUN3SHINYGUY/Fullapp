import React, { useState, useEffect,useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Admin/DashboardEventRegEdit.css';
import { useRef } from 'react';
import { TokenContext } from '../Context/TokenProvider';

const DashboardEventRegEdit= () => {

  const sectionsRef = useRef([]);
  const {token}=useContext(TokenContext);

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


  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState({
   
  firstName: "",
      lastName: "",
      email: "",
      age: "",
      // businessName: "",
      // organizationName: "",
      // businessAddress: "",
      city: "",
      state: "",
      zipcode: "",
      userId: 0,
      eventId: 0,
      id:0
  
    
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/event-registers/${id}/`,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };

    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleListChange = (type, index, value) => {
    setEvent((prevEvent) => {
      const list = [...prevEvent[type]];
      list[index] = value;
      return { ...prevEvent, [type]: list };
    });
  };

  const handleSave = async () => {
    try {
      await axios.patch(`http://localhost:8000/event-registers/${id}/`, event,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      navigate('/admin/event-register');
    } catch (error) {
      console.error('Error updating Contact Form:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/event-registers/${id}/`,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      navigate('/admin/event-register');
    } catch (error) {
      console.error('Error deleting users:', error);
    }
    // navigate('/admin/event-register');
  };

  const handleAddField = (type) => {
    setEvent((prevEvent) => ({
      ...prevEvent,
      [type]: [...prevEvent[type], ''],
    }));
  };

  const handleRemoveField = (type, index) => {
    setEvent((prevEvent) => ({
      ...prevEvent,
      [type]: prevEvent[type].filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="eventRegEditFull">
        <table className='eventRegEditTable'>
        <section ref={(el) => (sectionsRef.current[0] = el)} className="EventReghidden1">
      <p className="eventRegEditp">Edit Registered Data</p>
      <form className='eventRegEditForm'>
        <tr>
          <td><label className="eventRegEditl">First Name</label></td>
          <td><input
            type="text"
            className="eventRegEditInput"
            name="firstName"
            value={event.firstName}
            onChange={handleChange}
          /></td>
        </tr>
        <tr>
          <td><label className="eventRegEditl">Last Name</label></td>
          <td><input
            type="text"
            className="eventRegEditInput"
            name="lastName"
            value={event.lastName}
            onChange={handleChange}
          /></td>
        </tr>
        <tr>
          <td><label className="eventRegEditl">Age</label></td>
          <td><input
            type="text"
            className="eventRegEditInput"
            name="age"
            value={event.age}
            onChange={handleChange}
          /></td>
          </tr>
        
        {/* 
          <label className="eventRegEditl">BusinessName</label>
          <input
            type="text"
            className="eventRegEditInput"
            name="businessName"
            value={event.businessName}
            onChange={handleChange}
          />
         */}
        {/* 
          <label className="eventRegEditl">OrganizationName</label>
          <input
            type="text"
            className="eventRegEditInput"
            name="organizationName"
            value={event.organizationName}
            onChange={handleChange}
          />
         */}
        <tr>
          <td><label className="eventRegEditl">city</label></td>
          <td><input
            type="text"
            className="eventRegEditInput"
            name="city"
            value={event.city}
            onChange={handleChange}
          /></td>
          </tr>
        
        <tr>
          <td><label className="eventRegEditl">state</label></td>
          <td><input
            type="text"
            className="eventRegEditInput"
            name="state"
            value={event.state}
            onChange={handleChange}
          /></td>
          </tr>
        
        <tr>
          <td><label className="eventRegEditl">zipcode</label></td>
          <td><input
            type="text"
            className="eventRegEditInput"
            name="businessName"
            value={event.zipcode}
            onChange={handleChange}
          /></td>
          </tr>
        
       
       
        <button className="eventRegEditBtn1" onClick={handleSave}>
          Save
        </button>
        <button className="eventRegEditBtn2" onClick={handleDelete}>
          Delete
        </button>
      </form>
      </section>
        </table>
        </div>
    
  );
};

export default DashboardEventRegEdit;