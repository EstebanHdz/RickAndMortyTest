import { Routes, Route, BrowserRouter } from "react-router-dom"
import MainLayout from '../components/layout/MainLayout'
import Main from '../components/Main'
import Locations from '../components/Locations'
import Auth from '../components/Auth'
import AuthProvider from '../providers/AuthProvider'
import { Favourites } from "../components/Favourites"
import FavouritesProvider from "../providers/FavouritesProvider"

const Routing = () => {
  return (
    <BrowserRouter>    
        <AuthProvider>
            <FavouritesProvider>
                <Routes>
                    <Route path="/" element={<MainLayout/>}>
                        <Route path="/" element={<Main/>}/>
                        <Route path="/home" element={<Main/>}/>

                        <Route path="/locations" element={<Locations/>}/>
                        <Route path="/login" element={<Auth/>}/>
                        <Route path="/favourites" element={<Favourites/>}/>
                        
                        {/*<Route path="/*" element={<Error/>}/>*/}
                    </Route>
                </Routes>
            </FavouritesProvider>
        </AuthProvider>
    </BrowserRouter>
  )
}

export default Routing