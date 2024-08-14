import React from 'react'
import '../Admin/Admin.css';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import '../Admin/Admin.css'
import admin from '../../image/image.png'
import 'intersection-observer'
import { useEffect, useRef } from 'react';
import Footer from '../Footer/Footer';


const Admin = () => {
  const sectionsRef = useRef([]);

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
  return (
    <div className='adminBody'>
      <Header />
      <img className="adminImg" src={admin} />
      <p className='adminh1'>Admin</p>
      <div className='admindiv1'>
        <Link to="/admin/events"><button className='adminbtn1'>Manage events</button></Link>
        <Link to="/admin/users"><button className='adminbtn1'>Manage user</button></Link>
        
        <Link to="/admin/event-register"><button className='adminbtn3'>Manage registeration</button></Link>
      </div>
      <p className='adminp1'>  I am responsible for planning, organizing, and executing events of various types and scales.<br /> Their role involves coordinating all aspects of an event to ensure it runs smoothly and<br /> meets the objectives of the clients or organization they represent.</p>
      <section ref={(el) => (sectionsRef.current[0] = el)} className="Ahidden1">
        <p className='adminp2'>Experience:</p>

        <p className='adminp3'>Years in the Industry: 10 years</p>
        <p className='adminp4'>Types of Events Managed: Corporate events, weddings, trade shows, conferences, festivals, private parties, and product launches.</p>
      </section>
      {/* <section ref={(el) => (sectionsRef.current[1] = el)} className="Ahidden1"> */}
      <p className='adminNota'>Notable Projects:</p>
      <ul className='ull'>
        <li>Coordinated the annual Tech Innovators Conference with over 5,000 attendees.</li>
        <li>Managed high-profile weddings for celebrity clients.</li>
        <li>Organized the Global Sustainability Summit, featuring international speakers and exhibitors.</li>
      </ul>
      {/* </section> */}
      <section ref={(el) => (sectionsRef.current[2] = el)} className="Ahidden1">
      <p className='adminp5'>Skills:</p>
      <p className='adminp6'>Organizational Skills: Mastery in handling complex logistics and multitasking across various aspects of event planning.</p>
      <p className='adminp7'>Communication Skills: Excellent verbal and written communication abilities for seamless interaction with clients, vendors, and team members.</p>
      <p className='adminp8'>Budget Management: Skilled in creating and managing event budgets, ensuring cost-effectiveness without compromising quality.</p>
      <p className='adminp9'>Creative Thinking: Innovative in developing unique event themes, designs, and activities that captivate attendees.</p>
      <p className='adminp10'>Negotiation Skills: Proficient in negotiating favorable terms and contracts with vendors and suppliers.</p>
      <p className='adminp11'>Problem-Solving: Adept at handling unforeseen issues and emergencies efficiently.</p>
      <p className='adminp12'>Attention to Detail: Meticulous in planning and executing every detail to ensure flawless events.</p>
      </section>
      <section ref={(el) => (sectionsRef.current[3] = el)} className="Ahidden1">
      <p className='adminp13'>Areas of Expertise:</p>

      <p className='adminp14'>Event Planning and Coordination: Comprehensive knowledge of end-to-end event planning, from conceptualization to execution.</p>
      <p className='adminp15'>Vendor Management: Extensive experience in sourcing, hiring, and coordinating with diverse vendors, including catering, entertainment, and décor.</p>
      <p className='adminp16'>Marketing and Promotion: Expertise in promoting events through various channels, including social media, email campaigns, and traditional advertising.</p>
      <p className='adminp17'>Logistics Management: Proficient in handling all logistical elements, including venue selection, transportation, and accommodation.</p>
      <p className='adminp18'>On-Site Management: Skilled at overseeing event setup, execution, and teardown to ensure smooth operations.</p>
      </section>
      <section ref={(el) => (sectionsRef.current[4] = el)} className="Ahidden1">
      <p className='adminp19'>Case Studies:</p>

      <p className='adminp20'>Tech Innovators Conference: Detailed description of the event planning process, including objectives, challenges faced, solutions implemented, and outcomes achieved.</p>
      <p className='adminp21'>Celebrity Wedding: Insights into the personalized planning, unique themes, and special arrangements made for a high-profile wedding.</p>
      <p className='adminp22'>Global Sustainability Summit: Highlighting the coordination of international speakers, exhibitors, and the impact of the event on the industry.</p>
      </section>
      <section ref={(el) => (sectionsRef.current[5] = el)} className="Ahidden1">
      <p className='adminp23'>Event Highlights:</p>

      <p className='adminp24'>Key features and unique aspects of various events, such as innovative stage designs, interactive attendee experiences, and successful product launches.</p>
      </section>

      <section ref={(el) => (sectionsRef.current[6] = el)} className="Ahidden1">
      <p className='adminp25'>Client Reviews:
      </p>

      <p className='adminp26'>Testimonials:</p>
      <p className='adminp27'>"Sarah was exceptional in planning our wedding. She took care of every detail, allowing us to enjoy our special day without any stress." - Emily and John Doe</p>
      <p className='adminp28'>"The annual conference managed by Sarah was a huge success. Her organizational skills and attention to detail were evident in every aspect of the event." - Mark Johnson, CEO, Tech Innovations Inc.</p>
      </section>
      <section ref={(el) => (sectionsRef.current[7] = el)} className="Ahidden1">
      <p className='adminp29'>Ratings:</p>
      <p className='adminp30'>Consistently receives 5-star ratings from clients for her professionalism, creativity, and execution.</p>
      </section>
      <section ref={(el) => (sectionsRef.current[8] = el)} className="Ahidden1">
      <p className='adminp31'>Success Stories:</p>
      <p className='adminp32'>Detailed accounts of how Sarah exceeded client expectations, such as transforming a last-minute venue change into a seamless transition and creating a standout trade show booth that attracted significant foot traffic and media attention.</p>
      </section>

      {/* <div className='admindiv1'>
       <Link to="/admin/events"><button className='adminbtn1'>manage events</button></Link>
       
       <Link to="/admin/users"><button className='adminbtn1'>manage user</button></Link>
       <Link to="/admin/event-register"><button className='adminbtn1'>manage registeration</button></Link>
       </div> */}
       <Footer />

    </div>
  )
}

export default Admin