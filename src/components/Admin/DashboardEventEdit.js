import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EventEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    trend: 0,
    name: '',
    venue: '',
    date: '',
    image: '',
    capacity: 0,
    small_description: '',
    location: '',
    gmap: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/corporateEvents/${id}`);
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

      await axios.put(`http://localhost:8080/corporateEvents/${id}`, updatedEvent);
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
      await axios.delete(`http://localhost:8080/corporateEvents/${id}`);
      navigate('/admin/events');
    } catch (error) {
      console.error('Error deleting event:', error);
    } finally {
      setLoading(false); // Stop loading after request completes
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Event</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={event.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Venue</label>
          <input
            type="text"
            className="form-control"
            name="venue"
            value={event.venue}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="text"
            className="form-control"
            name="date"
            value={event.date}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={event.location}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Capacity</label>
          <input
            type="number"
            className="form-control"
            name="capacity"
            value={event.capacity}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Image</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleFileChange}
          />
          {imageFile && (
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Selected"
              style={{ marginTop: '10px', maxWidth: '100%' }}
            />
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Google Map</label>
          <input
            type="text"
            className="form-control"
            name="gmap"
            value={event.gmap}
            onChange={handleChange}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleSave} disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </button>
        <button type="button" className="btn btn-danger ms-2" onClick={handleDelete} disabled={loading}>
          {loading ? 'Deleting...' : 'Delete'}
        </button>
      </form>
    </div>
  );
};

export default EventEdit;
