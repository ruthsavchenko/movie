import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../style/Header.css'
import Menu from '../style/user-solid.svg'
import {useSelector} from "react-redux";


export const Header = () => {
    let user = useSelector(state => state.user)
    const location = useLocation();

    return (
        <div>
            <div className="header sticky">
                <div className="logo">
                    <h2><Link to="/">movie</Link></h2>
                </div>
                <nav>
                    <ul>
                        <li><Link to="/" className={ location.pathname === '/' ? 'nav-selected' : ''}>Главная</Link></li>
                        <li><Link to="/schedule" className={ location.pathname === '/schedule' ? 'nav-selected' : ''}>Сейчас в кино</Link></li>
                        <li>{user[0] ? <p className="user">{user[0]}</p> : <img style={{filter: "brightness(0) invert(1)"}} className="user" src={Menu} alt="" width="20" />}</li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Header
