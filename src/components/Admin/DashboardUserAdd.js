import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Admin/DashboardUserAdd.css';
import { useRef } from 'react';
import { TokenContext } from '../Context/TokenProvider';

const DashboardUserAdd = () => {


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

    username: '',
    email: '',
    password: '',


  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/users/${id}/`,{
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
      await axios.post(`http://localhost:8000/users/`, event,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      navigate('/admin/users');
    } catch (error) {
      console.error('Error Adding users:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/users/${id}/`);
      navigate('/admin/users');
    } catch (error) {
      console.error('Error deleting users:', error);
    }
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
    <div className="userAddFull">
      <table className='userAddTable'>
      <section ref={(el) => (sectionsRef.current[0] = el)} className="EventReghidden1">
      <p className="userAddp">Add User</p>
      <form className='userAddForm'>
          <tr>
            <td><label className="userAddl">Name</label></td>
            <td><input
              type="text"
              className="userAddInput"
              name="username"
              value={event.username}
              onChange={handleChange}
            /></td>
          </tr>
          <tr>
            <td><label className="userAddl">Email</label></td>
            <td><input
              type="email"
              className="userAddInput"
              name="email"
              value={event.email}
              onChange={handleChange}
            /></td>
          </tr>
          <tr>
            <td><label className="userAddl">Password</label></td>
            <td><input
              type="text"
              className="userAddInput"
              name="password"
              value={event.password}
              onChange={handleChange}
            /></td>
          </tr>

          <button className='userAddBtn' onClick={handleSave}>
            Save
          </button>
      </form>
      </section>
      </table>
    </div>
  );
};

export default DashboardUserAdd;