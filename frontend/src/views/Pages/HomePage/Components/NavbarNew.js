import React, {  } from 'react';
import {
  Navbar,
  NavbarBrand
} from 'reactstrap';

const NavbarBaru = (props) => {

  return (
    <div>
      <Navbar color="blue" light expand="md">
        <NavbarBrand href="/">Home</NavbarBrand>
        <NavbarBrand href="/#/login">Login</NavbarBrand>
        <NavbarBrand href="/#/register">Register</NavbarBrand>
         </Navbar>
    </div>
  );
}

export default NavbarBaru;