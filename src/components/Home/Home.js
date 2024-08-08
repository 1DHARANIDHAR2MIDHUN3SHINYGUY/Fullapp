import React from 'react'
import 'intersection-observer'
import { useEffect, useRef } from 'react';
// import Header from '../Header/Header'
import '../Home/Home.css';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import bg1video from '../../video/intro.webm'
import sub3video from '../../video/hybrid-event.webm'
import sub1video from '../../video/inperson-event.webm'
import sub2video from '../../video/virtual-event.webm'
import tic1 from '../../image/ticketing-1.png'
import tic2 from '../../image/ticketing-2.png'

const Home = () => {
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
    <div className="home">

      <Header />
      <div className='div1'>
        <section ref={(el) => (sectionsRef.current[0] = el)} className="hidden1">
          <p className='homePara1'>ALL-IN-ONE EVENT MANAGEMENT SOFTWARE</p>
          <p className='subHomePara1'>Built for the events<br /> of today—and <br />tomorrow</p>
          <p className='subHomePara2'>

            Everything you need to craft impactful event<br /> experiences all while staying technologically<br /> relevant, now and always.</p>
          <pre></pre>
          <Link to='/register'><button className='homeBtn1'>SIGN UP FOR FREE</button></Link>
          <video className="video1" src={bg1video} autoPlay loop muted />
        </section>
      </div>

      <section className="grid-section">
        <h2 className="grid-title">The simplest way to host all your events</h2>
        <div className="grid-container">
          <div className="grid-item1">
            <h3>In-person events</h3>
            <p className='grid-sub-para'>Keep it all together at the venue</p>
            <button className="explore-button">Explore More</button>
            <video className="grid-image" src={sub1video} autoPlay loop muted />
          </div>
          <div className="grid-item2">
            <h3>Virtual events</h3>
            <p className='grid-sub-para'>Go beyond webinars and workshops</p>
            <button className="explore-button">Explore More</button>
            <video className="grid-image" src={sub2video} autoPlay loop muted />
          </div>
          <div className="grid-item3">
            <h3>Hybrid events</h3>
            <p className='grid-sub-para'>Merge the physical with the virtual</p>
            <button className="explore-button">Explore More</button>
            <video className="grid-image" src={sub3video} autoPlay loop muted />
          </div>
        </div>
      </section>
      <div className='div11'>
        <div>
          {/* <p className='turn'>Turn a Profit</p> */}
        <p className='pdiv'>0% commission<br/> event ticketing</p>
        <p className='paytmPara'>Our ticketing platform supports a wide range <br />of payment options and 10+ payment gateways, so you<br /> can sell tickets exactly the way you want. Plus, you’ll <br />never be penalized for your success—there are no<br /> commissions, and payouts happen instantly.</p>
        </div>
        <img className="tic1" src={tic1} />
        <img className="tic1" src={tic2} />

      </div>

      <div className='div2'>
        <section ref={(el) => (sectionsRef.current[1] = el)} className="hidden2">
          <h1>We’ve got your back—in more ways than one</h1>
          <pre></pre>
          <p className='homePara2'>
            Security by design
            <pre></pre>
            We take your online safety very seriously. Not only are <br />we committed to the highest international standards <br />of security, but we also own our entire tech stack and <br />all of our data centers. So go ahead and plan your <br />event—we’ll secure it, for you and your attendees.
          </p>

        </section>
      </div>
      <div className='div2'>
        <section ref={(el) => (sectionsRef.current[2] = el)} className="hidden3">
          <p className='homePara3'>
            Privacy by default
            <pre></pre>
            When we say we value privacy, we mean that we won’t show you any ads, use third-party cookies to track you, or mine your data. Plus, we’ll do our best to support you in protecting your attendees’ information and staying compliant with data privacy regulations.
          </p>

        </section>
      </div>
      <div className="div3">
        <section ref={(el) => (sectionsRef.current[3] = el)}>
          <h1 className='h3div'>Ready to manage your events <br />smarter, better?</h1>
          <Link to='/register'><button className='homeBtn2'>GET STARTED NOW</button></Link>

        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Home;