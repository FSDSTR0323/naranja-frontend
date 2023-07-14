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
            <li className='li__footer'>
              <FaMapMarkerAlt className="contact__icon" />
              <span> 123 Nuclio, City</span>
            </li>
            <li className='li__footer'>
              <FaPhone className="contact__icon" />
              <span> +1 555-123456</span>
            </li>
            <li className='li__footer'>
              <FaEnvelope className="contact__icon" />
              <span> orangeTracker05@gmail.com</span>
            </li>
          </ul>
          <p id='copyRight__text'>© 2023 OrangeTracker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;