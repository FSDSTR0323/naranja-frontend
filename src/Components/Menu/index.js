import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import '../Menu/style.css'
import { NavLink } from 'react-router-dom';



const Menu = () => {

  return (
   <>
   
   <div className='d-flexMenu'>
   <Navbar className='menu' bg='light' variant='light' expand="sm" fixed="top">
    <Container>
      <Navbar.Brand>Orange Tracker</Navbar.Brand>
      <Nav className='me-auto'>
          <Nav.Link> <NavLink to='/dashboard'>Dashboard</NavLink></Nav.Link> 
          <Nav.Link> <NavLink to='/expenses'>Expenses</NavLink></Nav.Link> 
          <Nav.Link> <NavLink to='/incomes'>Incomes</NavLink></Nav.Link> 
          <Nav.Link> <NavLink to='/viewTransactions'>View Transactions</NavLink></Nav.Link> 
      </Nav>
    </Container>
   </Navbar>
   </div>
   </>
  )
}

export default Menu
