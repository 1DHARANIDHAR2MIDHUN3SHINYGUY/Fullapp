import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Admin/DashboardEventEdit.css'
import { useRef } from 'react';
import { TokenContext } from '../Context/TokenProvider';

const EventEdit = () => {

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
    trend: 0,
    name: '',
    venue: '',
    date: '',
    image: '',
    capacity: 0,
    description: '',
    location: '',
    gmap: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/corporate-events/${id}/`,{
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

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const uploadImageToCloudinary = async () => {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'newmanreact'); // Replace with your upload preset
    formData.append('cloud_name', 'dfiyrqut1'); // Replace with your Cloudinary cloud name

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/dfiyrqut1/image/upload', formData);
      return response.data.secure_url; // Return the secure URL of the uploaded image
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      return null;
    }
  };

  const handleSave = async () => {
    setLoading(true); // Start loading
    try {
      let imageUrl = event.image;

      if (imageFile) {
        imageUrl = await uploadImageToCloudinary();
        if (!imageUrl) {
          console.error('Error uploading image');
          setLoading(false); // Stop loading if there's an error
          return;
        }
      }
      
      const updatedEvent = {
        ...event,
        image: imageUrl,
      };

      await axios.patch(`http://localhost:8000/corporate-events/${id}/`, updatedEvent,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      navigate('/admin/events');
    } catch (error) {
      console.error('Error updating event:', error);
    } finally {
      setLoading(false); // Stop loading after request completes
    }
  };

  const handleDelete = async () => {
    setLoading(true); // Start loading
    try {
      await axios.delete(`http://localhost:8000/corporate-events/${id}/`,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization':  `Bearer ${token}`,
        },
      });
      navigate('/admin/events');
    } catch (error) {
      console.error('Error deleting event:', error);
    } finally {
      setLoading(false); // Stop loading after request completes
    }
  };

  return (
    <div className="eventEditFull">
      <table className='eventEditTable'>
      <section ref={(el) => (sectionsRef.current[0] = el)} className="EventReghidden1">
      <p className='eventEditp'>EDIT EVENT</p>
      <form className='eventEditForm'>
        <tr>
          {/* <div className="eventEditdiv1"> */}
          <td><label className="eventEditl">Name</label></td>
          <td><input
            type="text"
            className="eventEditInput"
            name="name"
            value={event.name}
            onChange={handleChange}
          /></td>
        
        </tr>
        <tr>
        <td><label className="eventEditl">Venue</label></td>
        <td><input
            type="text"
            className="eventEditInput"
            name="venue"
            value={event.venue}
            onChange={handleChange}
          /></td>
        </tr>
        <tr>
        <td><label className="eventEditl">Date</label></td>
        <td><input
            type="text"
            className="eventEditInput"
            name="date"
            value={event.date}
            onChange={handleChange}
          /></td>
        </tr>
        <tr>
        <td><label className="eventEditl">Location</label></td>
        <td><input
            type="text"
            className="eventEditInput"
            name="location"
            value={event.location}
            onChange={handleChange}
          /></td>
        </tr>
        <tr>
        <td><label className="eventEditl">Capacity</label></td>
        <td><input
            type="number"
            className="eventEditInput"
            name="capacity"
            value={event.capacity}
            onChange={handleChange}
          /></td>
        </tr>
        <tr>
        <td><label className="eventEditl">Image</label></td>
        <td><input
            type="file"
            className="eventEditInput"
            accept="image/*"
            onChange={handleFileChange}
          /></td>
          {imageFile && (
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Selected"
              style={{ marginTop: '10px', maxWidth: '100%' }}
            />
          )}
        </tr>
        <tr>
        <td><label className="eventEditl">Google Map</label></td>
        <td><input
            type="text"
            className="eventEditInput"
            name="gmap"
            value={event.gmap}
            onChange={handleChange}
          /></td>
        </tr>
        <button onClick={handleSave} disabled={loading} className='eventEditBtn1'>
          {loading ? 'Saving...' : 'Save'}
        </button>
        <button onClick={handleDelete} disabled={loading} className='eventEditBtn2'>
          {loading ? 'Deleting...' : 'Delete'}
        </button>
      </form>
      </section>
        </table>
    </div>
  );
};

export default EventEdit;
