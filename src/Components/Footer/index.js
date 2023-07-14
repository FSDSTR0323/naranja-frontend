import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import '../Footer/Footer.css';

const Footer = () => {
  return (
    <footer>
      <div id="container__footer">
        <div>
          <ul className="contact__list">

            <h6 id='contact__footer'>Contact</h6>
            <li className='li__footer__contact'>
              <FaMapMarkerAlt className="contact__icon" />
              <span> 123 Nuclio, City</span>
            </li>
            <li className='li__footer__contact'>
              <FaPhone className="contact__icon" />
              <span>+1 555-123456</span>
            </li>
            <li className='li__footer__contact'>
              <FaEnvelope className="contact__icon" />
              <span> orangetracker05@gmail.com</span>
            </li>
          </ul>
          
          <ul className="contact__list">
            <h6 id='support__footer'>Support</h6>
            <li className='li__footer__support'>
              <span>Contact us</span>
            </li>
            <li className='li__footer__support'>
              <span>Web chat</span>
            </li>
            <li className='li__footer__support'>
              <span></span>
            </li>
          </ul>

          <ul className="followUs__list">
            <h6 id='followUs__footer'>Follow us</h6>
            <li className='li__footer__followUs'>
              <span>Instagram</span>
            </li>
            <li className='li__footer__followUs'>
              <span>Twitter</span>
            </li>
            <li className='li__footer__followUs'>
              <span>Facebook</span>
            </li>
            <li className='li__footer__followUs'>
              <span>LinkedIn</span>
            </li>
          </ul>

          


          <p id='copyRight__text'>© 2023 OrangeTracker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;