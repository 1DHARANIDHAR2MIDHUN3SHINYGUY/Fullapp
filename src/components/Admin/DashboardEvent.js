import React, { useState, useEffect, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Admin/DashboardEvent.css'
import { Link } from 'react-router-dom';
import { TokenContext } from '../Context/TokenProvider';
// import UserContext from '../Context/UserContext';

const DashEvent = () => {
  const [data, setData] = useState([]);
  const {token}=useContext(TokenContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/corporate-events/',{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (id) => {
    navigate(`/events-edit/${id}`);
  };

  const handleAddNewEvent = () => {
    navigate('/admin/addevent');
  };

  return (
    
      <div className="manageEvent">
        <p className='manageEventp'>EVENTS</p>
        <table className="table1">
            <tr className='table1tr'>
              <th className='table1th'>ID</th>
              <th className='table1th'>Name</th>
              <th className='table1th'>Venue</th>
              <th className='table1th'>Location</th>
              <th className='table1th'>Date</th>
              <th className='table1th'>Edit</th>
            </tr>
        
          <tbody>
            {data.map((item) => (
              <tr className='table1tr'key={item.id}>
                <td className='table1td'>{item.id}</td>
                <td className='table1td'>{item.name}</td>
                <td className='table1td'>{item.venue}</td>
                <td className='table1td'>{item.location}</td>
                <td className='table1td'>{item.date}</td>
                <td className='table1td'>
                  {/* <a href={`/events-edit/${item.id}`}> */}
                  <a href={`/events-edit/${item.id}`}>
                  
                  <button className='manageEventbtn1'>
                    Edit
                  </button>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      
      {/* <a style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1000
        }} href='/event-add'> */}

<Link to="/event-add"><button className='manageEventbtn2'>Add New Event</button></Link>
      {/* <Button
        variant="danger"
   
      >
        
      </Button>
        </a> */}
    </div>
    
  );
};

export default DashEvent;
