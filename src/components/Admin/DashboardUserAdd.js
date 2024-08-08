import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DashboardUserAdd = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState({
     
      name: '',
      email: '',
      password: '',
    
      
    });
  
    useEffect(() => {
      const fetchEvent = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/users/${id}`);
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
        await axios.post(`http://localhost:8080/users/`, event);
        navigate('/admin/users');
      } catch (error) {
        console.error('Error Adding users:', error);
      }
    };
  
    const handleDelete = async () => {
      try {
        await axios.delete(`http://localhost:8080/users/${id}`);
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
      <div className="container mt-4">
        <h2>Add User</h2>
        <form>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={event.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={event.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="text"
              className="form-control"
              name="password"
              value={event.password}
              onChange={handleChange}
            />
          </div>
         
          <button type="button" className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
        
        </form>
      </div>
    );
};

export default DashboardUserAdd;