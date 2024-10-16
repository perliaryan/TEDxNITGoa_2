import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Navbar = () => {
    const [showContent, setShowContent] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1100);
    const hamburgerRef = useRef(null);

    const toggleContent = () => {
        setShowContent((prev) => !prev);
    };

    const handleClickOutside = (event) => {
        if (hamburgerRef.current && !hamburgerRef.current.contains(event.target)) {
            setShowContent(false);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1100);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className="navbar_nav">
            <div className="navbar_left">
                <Link to="/"><img src="/tedXnitgoa_logo.png" alt="Logo" className="navbar_logo1__mHDkT" /></Link>
            </div>
            {isMobile ? (
                <div className="innerok">
                    <div className="navbar_btn__HkUOK" ref={hamburgerRef} onClick={(e) => { toggleContent(); e.stopPropagation(); }}>
                        {!showContent && (
                            <button className="navbar_toggle__1Pu10">
                                <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth="0"
                                    viewBox="0 0 512 512"
                                    className="navbar_ll__nKuuS"
                                    height="1em"
                                    width="1em"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="48"
                                          d="M88 152h336M88 256h336M88 360h336"></path>
                                </svg>
                            </button>
                        )}
                    </div>
                    {showContent && (
                        <div className="innerless">
                            <button className="navbar_toggle__1Pu10" onClick={toggleContent}>
                                <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth="0"
                                    viewBox="0 0 512 512"
                                    className="navbar_ll__nKuuS"
                                    height="1em"
                                    width="1em"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z"></path>
                                </svg>
                            </button>
                            <div className="navbar_sidehead__HVrOC">
                                <div className="navbar_head__Un2yU">
                                    <Link className="navbar_lin1__bGONE" to="/">HOME</Link>
                                    <Link className="navbar_lin1__bGONE" to="/AboutUs">ABOUT US</Link>
                                    <Link className="navbar_lin1__bGONE" to="/Teams">TEAMS</Link>
                                    <Link className="navbar_lin1__bGONE active" to="/Sponsors">SPONSORS</Link>
                                    <Link id="navbar_red1__MWKWk" className="navbar_lin1__bGONE" to="/BuyTickets">BUY TICKETS</Link>
                                    <Link className="navbar_lin1__bGONE" to="/ContactUs">CONTACT US</Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="innermore">
                    <div className="navbar_right__5z6Ih">
                        <Link className="navbar_lin__yrOtl" to="/">HOME</Link>
                        <Link aria-current="page" className="navbar_lin__yrOtl active" to="/AboutUs">ABOUT US</Link>
                        <Link className="navbar_lin__yrOtl" to="/Teams">TEAMS</Link>
                        <Link className="navbar_lin__yrOtl" to="/Sponsors">SPONSORS</Link>
                        <Link id="navbar_red__gXnY4" className="navbar_lin__yrOtl" to="/BuyTickets">BUY TICKETS</Link>
                        <Link className="navbar_lin__yrOtl" style={{ color: '#eb0028' }} to="/ContactUs">CONTACT US</Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Navbar;
