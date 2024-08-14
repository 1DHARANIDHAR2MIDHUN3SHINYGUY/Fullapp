import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Admin/DashboardEventAdd.css';
import { useRef } from 'react';
import { TokenContext } from '../Context/TokenProvider';

const DashboardEventAdd = () => {

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
    // organizer: '',
    // organization: '',
    // description: '',
    image: '',
    capacity: 0,
    description: '',
    location: '',
    type: '',
    // guest: '',
    gmap: '',
    // organization_details: '',
    // inclusive: [],
    // exclusive: [],
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
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
    }
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    // Generate a preview URL
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
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
      console.log(imageFile)
      if (imageFile) {
        imageUrl = await uploadImageToCloudinary();
        if (!imageUrl) {
          console.error('Error uploading image');
          setLoading(false); // Stop loading if there's an error
          return;
        }
      }

      // Combine inclusive and exclusive lists into a single string
      // const combinedInclusions = [
      //   ...event.inclusive
      // ].join('; ');
      // const combinedExclusions = [
      //   ...event.exclusive
      // ].join('; ');
      
      const updatedEvent = {
        ...event,
        image: imageUrl,
        // inclusions: combinedInclusions, // Use the combined string here
        // exclusions: combinedExclusions, // Use the combined string here
      };

      const method = id ? 'put' : 'post';
      const url = id ? `http://localhost:8000/corporate-events/${id}/` : 'http://localhost:8000/corporate-events/';

      await axios['post']('http://localhost:8000/corporate-events/', updatedEvent,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      navigate('/admin/events');
    } catch (error) {
      console.error('Error saving event:', error);
    } finally {
      setLoading(false); // Stop loading after request completes
    }
  };

  const handleDelete = async () => {
    setLoading(true); // Start loading
    try {
      if (id) {
        await axios.delete(`http://localhost:8000/corporate-events/${id}/`,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
      }
      navigate('/admin/events');
    } catch (error) {
      console.error('Error deleting event:', error);
    } finally {
      setLoading(false); // Stop loading after request completes
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
    <div className="eventAddFull">
      {/* <h2>{id ? 'Edit Event' : 'Add Event'}</h2> */}
      <table className='eventAddTable'>
      <section ref={(el) => (sectionsRef.current[0] = el)} className="EventReghidden1">
      <p className='eventAddp'>ADD EVENT</p>
      <form className='eventAddForm'>
       
        {/* Other fields */}
        <tr>
          <td><label className="eventAddl">Name</label></td>
          <td><input
            type="text"
            className="eventAddInput"
            name="name"
            value={event.name}
            onChange={handleChange}
          /></td>
        </tr>
        <tr>
          <td><label className="eventAddl">Venue</label></td>
          <td><input
            type="text"
            className="eventAddInput"
            name="venue"
            value={event.venue}
            onChange={handleChange}
          /></td>
        </tr>
        {/* Repeat similar blocks for other fields */}
        <tr>
          <td><label className="eventAddl">Date</label></td>
          <td><input
            type="text"
            className="eventAddInput"
            name="date"
            value={event.date}
            onChange={handleChange}
          /></td>
        </tr>
        
        
        <tr>
          <td><label className="eventAddlsmall">Description</label></td>
          <td><textarea
            className="eventAddInputSmall"
            name="description"
            value={event.description}
            onChange={handleChange}
          /></td>
        </tr>
       
        <tr>
          <td><label className="eventAddl">Location</label></td>
          <td><input
            type="text"
            className="eventAddInput"
            name="location"
            value={event.location}
            onChange={handleChange}
          /></td>
        </tr>
        <tr>
          <td><label className="eventAddl">Google Map</label></td>
          <td><input
            type="text"
            className="eventAddInput"
            name="gmap"
            value={event.gmap}
            onChange={handleChange}
          /></td>
        </tr>
        
        
        <tr>
          <td><label className="eventAddl">Capacity</label></td>
          <td><input
            type="number"
            className="eventAddInput"
            name="capacity"
            value={event.capacity}
            onChange={handleChange}
          /></td>
        </tr>
        <tr>
          <td><label className="eventAddl">Image</label></td>
          <td><input
            type="file"
            className="eventAddInput"
            accept="image/*"
            onChange={handleFileChange}
          /></td>
          {imagePreview && (
            <img
              src={imagePreview} // Display the preview URL
              alt="Image Preview"
              className="mt-2"
              style={{ maxWidth: '200px' }}
            />
          )}
        </tr>
        
        {loading ? (
          <div className="d-flex justify-content-center mb-3">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <button className='eventAddBtn' onClick={handleSave} disabled={loading}>
            Save
          </button>
        )}
        
      </form>
      </section>
      </table>
    </div>
  );
};

export default DashboardEventAdd;
