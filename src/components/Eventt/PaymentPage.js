
import React, { useContext,useState } from 'react';
import '../Eventt/PaymentPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faUniversity, faMoneyCheckAlt } from '@fortawesome/free-solid-svg-icons';
import { faGooglePay } from '@fortawesome/free-brands-svg-icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import { Toast } from 'react-bootstrap';
// import { toast } from 'react-toastify';
// import { Toaster,toast } from 'react-hot-toast';
import { TokenContext } from '../Context/TokenProvider';
import 'react-toastify/dist/ReactToastify.css';
// import { Axios } from 'axios';
import axios from 'axios';



const PaymentPage = () => {


  const [selectedTab, setSelectedTab] = useState('creditCard');
  const [amount, setAmount] = useState('₹.00');
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const {id}=useParams();

  // const notify = () => toast("Payment Successful");
  const {token}=useContext(TokenContext);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    // Reset values when changing tabs
    if (tab !== 'netBanking') setSelectedBank('');
  };
  const navigate=useNavigate();

  const handlePayment = async (e) => {
    e.preventDefault();
    if (selectedTab === 'creditCard' && cardNumber && expiryMonth && expiryYear && cvv) {
      setConfirmationMessage('Payment successful! Your booking is confirmed.');
      
      try {
        const response=await axios.patch(`http://localhost:8000/event-registers/${id}/`, {
          paymentStatus:"made"
        },{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response);
        alert("success");
      }
      catch(error){
        console.log(error);
      }
      navigate('/organizer');
    } else if (selectedTab === 'upi' && upiId) {
      setConfirmationMessage('Payment successful! Your booking is confirmed.');
      try {
        const response=await axios.patch(`http://localhost:8000/event-registers/${id}/`, {
          paymentStatus:"made"
        },{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response);
        alert("success");
      }
      catch(error){
        console.log(error);
      }
      // alert("success");
      // toast.success("Payment Successful");
      navigate('/organizer');
    } else if (selectedTab === 'netBanking' && selectedBank) {
      setConfirmationMessage('Payment successful! Your booking is confirmed.');
      try {
        const response=await axios.patch(`http://localhost:8000/event-registers/${id}/`, {
          paymentStatus:"made"
        },{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response);
        alert("success");
      }
      catch(error){
        console.log(error);
      }
      // alert("success");
      // toast.success("Payment Successful");
      navigate('/organizer');
    } else if (selectedTab === 'debitCard' && cardNumber && expiryMonth && expiryYear && cvv) {
      setConfirmationMessage('Payment successful! Your booking is confirmed.');
      try {
        const response=await axios.patch(`http://localhost:8000/event-registers/${id}/`, {
          paymentStatus:"made"
        },{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response);
        alert("success");
      }
      catch(error){
        console.log(error);
      }
      // alert("success");
      // toast.success("Payment Successful");
      navigate('/organizer');
    } 
    
    else {
      setConfirmationMessage('Please fill in all required fields.');
    }
    


    

    
  };

  return (
    <div className="payment-container">
      <div className="pay-tabs">
        <p className='Paymenth2'>Select Payment Method</p>
        <ul className="resp-tabs-list">
          <li onClick={() => handleTabChange('creditCard')} className={selectedTab === 'creditCard' ? 'active' : ''}>
            <FontAwesomeIcon icon={faCreditCard} /> <span>Credit Card</span>
          </li>
          <li onClick={() => handleTabChange('netBanking')} className={selectedTab === 'netBanking' ? 'active' : ''}>
            <FontAwesomeIcon icon={faUniversity} /> <span>Net Banking</span>
          </li>
          <li onClick={() => handleTabChange('upi')} className={selectedTab === 'upi' ? 'active' : ''}>
            {/* <SiUpi /> */}
            <FontAwesomeIcon icon={faGooglePay} /><span>UPI</span>
          </li>
          <li onClick={() => handleTabChange('debitCard')} className={selectedTab === 'debitCard' ? 'active' : ''}>
            <FontAwesomeIcon icon={faMoneyCheckAlt} /> <span>Debit Card</span>
          </li>
          
        </ul>
      </div>

      <div className="resp-tabs-container">
        {selectedTab === 'creditCard' && (
          <div className="tab-content">
            <h3 className='Paymenth3'>Credit Card Info</h3>
            <form>
              <div className="tab-for">
                <h5 className='Paymenth5'>Amount</h5>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className='PaymentInput'
                />
              </div>
              <div className="tab-for">
                <h5 className='Paymenth5'>Name on Card</h5>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='PaymentInput'
                />
                <h5 className='Paymenth5'>Card Number</h5>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className='PaymentInput'
                />
              </div>
              <div className="transaction">
                <div className="tab-form-left">
                  <h5>Expiration</h5>
                  <ul className='PaymentUl'>
                    <li className='PaymentLi'>
                      <input
                        type="number"
                        value={expiryMonth}
                        onChange={(e) => setExpiryMonth(e.target.value)}
                        placeholder="MM"
                        className='PaymentTabInput'
                      />
                    </li>
                    <li>
                      <input
                        type="number"
                        value={expiryYear}
                        onChange={(e) => setExpiryYear(e.target.value)}
                        placeholder="YYYY"
                        className='PaymentTabInput'
                      />
                    </li>
                  </ul>
                </div>
                <div className="tab-form-right">
                  <h5>CVV Number</h5>
                  <input
                    type="password"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className='PaymentTabrInput'
                  />
                </div>
              </div>
              <button className="PaymentSendbtn" onClick={handlePayment}>SEND</button>
              <Link to="/organizer"><button className="notPayBtn">PAY LATER</button></Link>
            </form>
          </div>
        )}

        {selectedTab === 'netBanking' && (
          <div className="tab-content">
            <h3>Net Banking</h3>
            <div className="radio-btns">
              <label>
                <input 
                  type="radio" 
                  name="bank" 
                  value="sbi Bank"
                  checked={selectedBank === 'sbi Bank'}
                  onChange={(e) => setSelectedBank(e.target.value)}
                /> SBI Bank
              </label>
              <label>
                <input 
                  type="radio" 
                  name="bank" 
                  value="canara Bank"
                  checked={selectedBank === 'canara Bank'}
                  onChange={(e) => setSelectedBank(e.target.value)}
                /> Canara Bank
              </label>
              <label>
                <input 
                  type="radio" 
                  name="bank" 
                  value="HDFC Bank"
                  checked={selectedBank === 'HDFC Bank'}
                  onChange={(e) => setSelectedBank(e.target.value)}
                /> HDFC Bank
              </label>
              <label>
                <input 
                  type="radio" 
                  name="bank" 
                  value="ICICI Bank"
                  checked={selectedBank === 'ICICI Bank'}
                  onChange={(e) => setSelectedBank(e.target.value)}
                /> ICICI Bank
              </label>
              {/* Repeat for other banks */}
            </div>
            <button className='PaymentSendbtn' onClick={handlePayment}>CONTINUE</button>
            <Link to="/organizer"><button className="notPayBtn">PAY LATER</button></Link>
          </div>
        )}

        {selectedTab === 'upi' && (
          <div className="tab-content">
            <h3>UPI Payment</h3>
            <h4>Enter your UPI ID to pay:</h4>
            <form>
              <input
                type="text"
                placeholder="example@upi"
                value={upiId}
                className='UpiInput'
                onChange={(e) => setUpiId(e.target.value)}
              />
              <button className='PaymentSendbtn' onClick={handlePayment}>PAY NOW</button>
              <Link to="/organizer"><button className="notPayBtn">PAY LATER</button></Link>
            </form>
          </div>
        )}

        {selectedTab === 'debitCard' && (
          <div className="tab-content">
            <h3>Debit Card Info</h3>
            <form>
              <div className="tab-for">
                <h5>Amount</h5>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <h5>Name on Card</h5>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                
              />
              <h5>Card Number</h5>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                // className='PaymentInput'
              />
              <div className="transaction">
                <div className="tab-form-left">
                  <h5>Expiration</h5>
                  <ul>
                    <li>
                      <input
                        type="number"
                        value={expiryMonth}
                        onChange={(e) => setExpiryMonth(e.target.value)}
                        placeholder="MM"
                      />
                    </li>
                    <li>
                      <input
                        type="number"
                        value={expiryYear}
                        onChange={(e) => setExpiryYear(e.target.value)}
                        placeholder="YYYY"
                      />
                    </li>
                  </ul>
                </div>
                <div className="tab-form-right">
                  <h5>CVV Number</h5>
                  <input
                    type="password"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                  />
                </div>
              </div>
              {/* <button onClick={notify}>Notify!</button> */}
              <button className='PaymentSendbtn' onClick={handlePayment}>SEND</button>
              <Link to="/organizer"><button className="notPayBtn">PAY LATER</button></Link>
              
              {/* <Toaster /> */}
              
              
            </form>
          </div>
        )}
      </div>

      {confirmationMessage && <p className="confirmation-message">{confirmationMessage}</p>}
    </div>
  );
};

export default PaymentPage;

