import React, { useState } from 'react'
import { useAuth } from '../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useFavourites } from '../providers/FavouritesProvider';

const Auth = () => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const {setFavourites} = useFavourites()

    const navigate = useNavigate()

    const handleUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserName((event.target as HTMLInputElement).value);
    };
    const handlePassword = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setPassword((target as HTMLInputElement).value);
    };


    const {isLoggedIn, userName:activeUser, logOut, signUp, logIn} = useAuth()


    const validateLogIn  = () => {
        if (logIn(userName, password)){
            navigate("/")
        }else{
            alert("Incorrect credentials!")
            setPassword("")
            setUserName("")
        }
    }

    const validateSignUp  = () => {
        if (password.length > 0 && userName.length > 0){
            if(signUp(userName, password)){
                navigate("/")
            }else{
                alert("Username already in use!")
            }
        }else{
            alert("Please enter a Username and Password!")
        }
    }

    const validateLogOut  = () => {
        logOut()     
        setFavourites([])  
    }

    if (!isLoggedIn){
        return (
            <div className="container-sm text-center">
                <h1>Login</h1>
                <div className="card">
                    
                    <div className="card-body">
                        <div className="mb-1">
                            <label htmlFor="userName" className="form-label">User Name</label>
                            <input type="text" className="form-control" id="userName" value={userName} onChange={handleUserName} required/>
                        </div>
                        <div className="mb-1">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" value={password} onChange={handlePassword} required/>
                        </div>
                        <button onClick={validateLogIn} className="btn btn-primary">Login</button>
                        <button onClick={validateSignUp} className="btn btn-primary">Sign Up</button>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <div className="container-sm text-center">
            <h1>Hello: {activeUser}</h1>
            <div className="card">
                
                <button onClick={validateLogOut} className="btn btn-primary">Logout</button>
                
            </div>
        </div>
    )
    
}

export default Auth