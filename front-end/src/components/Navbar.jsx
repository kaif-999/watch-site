import React from 'react'
import {navbarStyles} from '../assets/dummyStyles.js';
import { Clock } from 'lucide-react';
import {Link} from 'react-router-dom';


const Navbar = () => {


    return (
<header className={navbarStyles.header}>
    <nav className={navbarStyles.nav} role='navigation'>
<div className={navbarStyles.container}>
    <div className={navbarStyles.brandContainer}>
        <div className={navbarStyles.logoContainer}>

<Clock />
        </div>
<Link to="/" onClick={()=> handleNavClick("/")} className={navbarStyles.logoLink}>


<span style={navbarStyles.logoTextStyle} className={navbarStyles.logoText}>
ChronoElite
</span>


</Link>

    </div>


</div>



    </nav>




</header>
    )
}

export default Navbar