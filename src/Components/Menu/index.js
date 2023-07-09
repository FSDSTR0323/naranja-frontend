import React, { useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../Menu/Menu.css'
import { NavLink } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
library.add(faBars, faTimes);

    // Logout
    const logout = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
  }

const Menu = () => {

  const [isMenuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen)
  }
  return (
    <header>
      <div className='menu__container'>
        <div className='img__profile'>
        <NavLink className='routes' to='/profile'>
          <img id='user__avatar' 
            className='routes' to='/profile'
            src='https://cdn1.iconfinder.com/data/icons/vibrancie-action/30/action_081-account-user-profile-avatar-512.png' 
            alt='Bootstrap 5'/>
        </NavLink>
      </div>
        <div id='title__app'>
          <h3> <NavLink  className='route__title' to='/dashboard'>Orange Tracker</NavLink></h3>
        </div>
        <input type='checkbox' id='nav__check' hidden></input>
        <nav className='navigation__menu'>
          <div className='menu-toggle' onClick={toggleMenu}>
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            <FontAwesomeIcon className='bars' icon="bars" />
          </div>
          <div id='routes__menu'>
            <ul className={`menu-items ${isMenuOpen ? 'open' : ''}`}>
              <li><NavLink className='routes' to='/dashboard' href='#'>Dashboard</NavLink><div className='menu-text no-reverse'>Dashboard</div></li>

              <li><NavLink className='routes' to='/expenses'>Expenses</NavLink><span className='menu-text'>Expenses</span></li>

              <li><NavLink className='routes' to='/incomes'>Incomes</NavLink><span className='menu-text'>Incomes</span></li>

              <li><NavLink className='routes' to='/viewTransactions'>View Transactions</NavLink><span className='menu-text'>View Transactions</span></li>

              <li><NavLink id='sign__out' className='routes' to='/' onClick={logout}>Sign Out</NavLink><span className='menu-text'>Sign Out</span></li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Menu
