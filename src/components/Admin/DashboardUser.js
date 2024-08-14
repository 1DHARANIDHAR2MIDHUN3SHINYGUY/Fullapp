import React, { useState, useEffect, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Admin/DashboardUser.css';
import { Link } from 'react-router-dom';
import { TokenContext } from '../Context/TokenProvider';

const DashboardUser = () => {
  const [data, setData] = useState([]);
  const {token}=useContext(TokenContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/users/',{
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
    navigate(`/users-edit/${id}`);
  };

  const handleAddNewEvent = () => {
    navigate('/admin/adduser');
  };

  return (
    <div className="manageUser">
      <p className='manageUserp'>USERS</p>
        <table className='table2'>
            <tr className='table2tr'>
              <th className='table2th'>ID</th>
              <th className='table2th'>Username</th>
              <th className='table2th'>Email</th>
              <th className='table2th'>Edit</th>
             
            </tr>
          <tbody>
            {data.map((item) => (
              <tr className='table2tr' key={item.id}>
                <td className='table2td'>{item.id}</td>
                <td className='table2td'>{item.username}</td>
                <td className='table2td'>{item.email}</td>
               
                <td className='table2td'>
                  <a href={`/users-edit/${item.id}`}>
                  
                  <button className='manageUserbtn1'>
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
        }} href='/users-add'> */}
        <Link to="/users-add"><button className='manageUserbtn2'>Add New User</button></Link>



      {/* <Button
        variant="danger"
   
      >
        Add New User
      </Button> */}
        {/* </a> */}
    </div>
  );
};

export default DashboardUser;
