    import React, { useEffect, useState }  from 'react';
    import {navbarStyles} from '../assets/dummyStyles.js';
    import { Clock, BaggageClaim, User } from 'lucide-react';
    import {Link, useLocation, useNavigate} from 'react-router-dom';
    import { useCart } from '../CartContext.jsx';

    const navItems = [
    { name: "Home", href: "/" },
    { name: "Watches", href: "/watches" },
    { name: "Contact", href: "/contact" },
    ];

    const Navbar = () => {
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [active, setActive] = useState(location.pathname || "/");
    const {totalItems} = useCart();
    const [loggedIn, setLoggedIn] = useState(() =>{
        try{
            return(
    localStorage.getItem("isLoggedIn") === "true" ||
    !!localStorage.getItem("authToken")
            );
        
        }
        catch {
    return false;
        }
    })

    useEffect(() =>{
        setActive(location.pathname  || "/")
    }, [location])


    // to keep the user logged in for all the pages
    useEffect(() => {
        const onStorage = (e) => {
        if (e.key === "isLoggedIn" || e.key === "authToken") {
            try {
            const isNowLoggedIn =
                localStorage.getItem("isLoggedIn") === "true" ||
                !!localStorage.getItem("authToken");
            setLoggedIn(isNowLoggedIn);
            } catch {
            setLoggedIn(false);
            }
        }
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);


    const handleNavClick = (href) => {
        setActive(href);
        setOpen(false);
    };


    // to Logout 
    const handleLogout = () =>{

        try{
            localStorage.removeItem("isLoggedIn")
            localStorage.removeItem("authToken")
        }
        catch(e){
    setLoggedIn(false)
    setOpen(false)
    navigate("/")
        }

    }

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
    {

        //Desktop Navigation

    }

    <div className={navbarStyles.desktopNav}>

    {navItems.map((item)=> { const isActive = active ===  item.href;

    return (

        <Link key={item.name} to ={item.href} onClick={() => handleNavClick(item.href)} className={`${navbarStyles.navItemBase} ${isActive ? navbarStyles.navItemActive: navbarStyles.navItemInactive}`}>
    <span>{item.name}</span>

    <span className={`${navbarStyles.activeIndicator} ${
    isActive ? navbarStyles.activeIndicatorVisible : navbarStyles.activeIndicatorHidden
    }`}></span>

        </Link>
    )



    }  )}
    </div>
    {
        // Right Side

        <div className={navbarStyles.rightActions}> 
    <Link to='/cart' className={navbarStyles.cartLink}>
    <BaggageClaim className={navbarStyles.cartIcons}/>


    {
        totalItems > 0 && ( 
            <span className={navbarStyles.cartBadge}>
                {totalItems}

            </span>
        )
    }
    </Link>

    {
        !loggedIn ?(
            <Link to='/login' className={navbarStyles.accountLink}>

    <User className={navbarStyles.accountIcon} />
    <span className={navbarStyles.accountText}>Account</span>
    </Link>
        ):(
            <button onClick={handleClick} className={navbarStyles.accountLink}>

    <User className={navbarStyles.accountIcon} />
    <span className={navbarStyles.accountText}>Logout </span>


            </button>
        )
        
        
    }
    </div>
    }
    </div>
    </nav>
    </header>
        )
    }

    export default Navbar;