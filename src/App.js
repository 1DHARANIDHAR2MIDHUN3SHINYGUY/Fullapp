import logo from './logo.svg';
// import './App.css';
import Login from './components/Login/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register/Register';
import Appp from './components/Appp';
import Home from './components/Home/Home';
import Organizer from './components/Organizer/Organizer';
import Admin from './components/Admin/Admin';
// import EventPlannerCard from './components/Eventt/EventPlannerCard';
// import EventPlannerList from './components/Eventt/EventPlannerList';
import PrivateRouter from './components/Context/PrivateRouter';
import EventOrganizer from './components/Eventt/EventOrganizer';
// import EventList from './components/Eventt/EventList';
import BookOrganizer from './components/Eventt/BookOrganizer';
import PaymentPage from './components/Eventt/PaymentPage';
import EventDetails from './components/Eventt/EventDetails';
import EventRegister from './components/Eventt/EventRegister';
import DashboardEvent from './components/Admin/DashboardEvent';
import DashboardUser from './components/Admin/DashboardUser';
import DashboardEventReg from './components/Admin/DashboardEventReg';
import DashboardEventEdit from './components/Admin/DashboardEventEdit';
import DashboardEventAdd from './components/Admin/DashboardEventAdd';
import DashboardEventRegEdit from './components/Admin/DashboardEventRegEdit';
import DashboardUserAdd from './components/Admin/DashboardUserAdd';
import DashboardUserEdit from './components/Admin/DashboardUserEdit';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Appp/>} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/organizer" element={
            // <PrivateRouter>
            <Organizer />
            // </PrivateRouter>
            } />
          <Route path="/admin" element={<Admin />} />
          <Route path="/event-register/:id" element={<EventOrganizer />} />
          <Route path="/events/:id" element={<EventDetails />} />
          {/* <Route path="/events" element={<EventList />} /> */}
          <Route path="/bookorganizer" element={<EventRegister />} />
          <Route path="/payment" element={<PaymentPage />} />


          <Route path="/admin/events" element={<DashboardEvent />} />
          <Route path="/events-edit/:id" element={<DashboardEventEdit />} />
          <Route path="/event-add" element={ <DashboardEventAdd /> }/>
          <Route path="/admin/users" element={<DashboardUser /> }/>
          {/* <Route path="/admin/users" element={<DashboardUser />} /> */}
          <Route path="/users-add" element={<DashboardUserAdd />}/>
          <Route path="/users-edit/:id" element={<DashboardUserEdit /> }/>
          <Route path="/admin/event-register" element={<DashboardEventReg />} />
          <Route path="/event-register-edit/:id" element={<DashboardEventRegEdit /> }/>




        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
