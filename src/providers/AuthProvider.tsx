import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorageUsers from "../hooks/useLocalStorageUsers";

type AuthData = {
    userName: string,
    loading: boolean,
    isLoggedIn: boolean,
    logOut: () => void
    signUp: (user:string, password:string) => boolean,
    logIn: (user:string, password:string) => boolean,
}

const AuthContext = createContext<AuthData>({
    userName: "",
    loading: true,
    isLoggedIn: false,
    logOut: () => {}, 
    signUp: () => false, 
    logIn: () => false, 
});

export default function AuthProvider({ children }: PropsWithChildren){

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [userName, setUserName] = useState("")
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    const {logInUser, signUpUser} = useLocalStorageUsers()


    const signUp = (user:string, password:string) => {
        const res = signUpUser(user, password)

        if(res){
            setIsLoggedIn(true)
            setUserName(user)
    
            const activeUser = { 
                userName: user,
                isLoggedIn: true,
            }
            localStorage.setItem("activeUser", JSON.stringify(activeUser))
    
            return true
        }

        return false
        
    }

    const logIn = (userN:string, password:string) => {
        const res = logInUser(userN, password)
        if(res){
            setIsLoggedIn(true)
            setUserName(userN)
    
            const activeUser = { 
                userName: userN,
                isLoggedIn: true,
            }
            localStorage.setItem("activeUser", JSON.stringify(activeUser))
            
            return true
        }else{
            return false
        }
    }

    const logOut = () => { 
        localStorage.removeItem("activeUser")
        setIsLoggedIn(false)
        setUserName("")
        return navigate("/")
    }

    useEffect(() => {
        console.log("AUTH PROVIDER IS MOUNTED")


        const fetchSession = () => {
            //ADD TOKENS OR COOKIES TO SAVE SESSION AND SHOULD VALIDATE SESSION WITH BACK END
            //IGNORING FOR TEST PURPOSES
            const activeUser: string | null = localStorage.getItem("activeUser")

            if(!activeUser){
                setLoading(false)
                return false
            }

            const userObj = JSON.parse(activeUser)
            setUserName (userObj.userName)
            setIsLoggedIn (userObj.isLoggedIn)
        }

        fetchSession();

    }, [])

    return(
        <AuthContext.Provider value={{isLoggedIn, loading, userName, logOut, signUp, logIn}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
