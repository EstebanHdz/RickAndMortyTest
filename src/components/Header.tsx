import { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../providers/AuthProvider'

const Header = () => {

    const location = useLocation()

    const {isLoggedIn, userName} = useAuth()

    useEffect(() => {
        /*
        const queryParameters = new URLSearchParams(window.location.search)
        if(queryParameters.get("query") != null){

            setQueryValue(queryParameters.get("query"))
        }else{
            setQueryValue("")
        }
        */
    }, [location])
    
    return (
        <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink className="nav-link active" aria-current="page" to="/">Inicio</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/locations">Locaciones</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/favourites">Favoritos</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/login">{isLoggedIn ? userName : "Login"}</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    </>
  )
}

export default Header