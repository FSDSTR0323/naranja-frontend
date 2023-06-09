import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import '../Menu/Menu.css'
import { NavLink } from 'react-router-dom';



const Menu = () => {

  return (
   <>
   
  <div className='d-flexMenu'>
  <Navbar className='menu' bg='light' variant='light'  fixed='top'>
    <Container>
      <Navbar.Brand  as='h1' className='title__app'>Orange Tracker</Navbar.Brand>
      <Nav className='me-auto'>
          <Nav.Link> <NavLink className='routes' to='/dashboard'>Dashboard</NavLink></Nav.Link> 
          <Nav.Link> <NavLink className='routes' to='/expenses'>Expenses</NavLink></Nav.Link> 
          <Nav.Link> <NavLink className='routes' to='/incomes'>Incomes</NavLink></Nav.Link> 
          <Nav.Link> <NavLink className='routes' to='/viewTransactions'>View Transactions</NavLink></Nav.Link> 
          <Nav.Link> <NavLink className='routes' to='/'>Sing Out</NavLink></Nav.Link> 
      </Nav>
    </Container>
  </Navbar>
  </div>
  </>
  )
}

export default Menu
