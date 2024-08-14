import React, { useState, useEffect, useContext} from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Admin/DashboardEventReg.css';
import { TokenContext } from '../Context/TokenProvider';

const DashboardEventReg = () => {
  const [data, setData] = useState([]);
  const {token}=useContext(TokenContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/event-registers/',{
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
    navigate(`/event-register-edit/${id}`);
  };

  const handleAddNewEvent = () => {
    navigate('/dashboard/adduser');
  };

  return (
    
      <div className="manageRegister">
        <p className='manageRegisterp'>REGISTERATION</p>
        <table className="table3">
          <tr className="table3tr">
              <th className='table3th'>ID</th>
              <th className='table3th'>Name</th>
              <th className='table3th'>Email</th>
              {/* <th className='table3th'>Bussniess Name</th> */}
              <th className='table3th'>City</th>
              <th className='table3th'>Edit</th>
          </tr>
          <tbody>
            {data.map((item) => (
              <tr className="table3tr"key={item.id}>
                <td className='table3td'>{item.id}</td>
                <td className='table3td'>{item.firstName}</td>
                <td className='table3td'>{item.email}</td>
                {/* <td className='table3td'>{item.businessName}</td> */}
                <td className='table3td'>{item.city}</td>
               
                <td className='table3td'>
                  <a href={`/event-register-edit/${item.id}`}>
                  
                  <button className='manageRegisterbtn1'>
                    View
                  </button>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};

export default DashboardEventReg;
