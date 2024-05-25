import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import useLocalStorageUsers from "../hooks/useLocalStorageUsers";
import { Character, Favourite, Location } from "../types";
import { useAuth } from "./AuthProvider";

type FavouritesData = {
    favourites: Favourite[],
    setFavourites: (arr: Favourite[]) => void,
    addFavourite: (element: Character | Location) => void
    removeFavourite: (element: Character | Location) => void
}

const FavouritesContext = createContext<FavouritesData>({
    favourites: [],
    setFavourites: () => {},
    addFavourite: () => {}, 
    removeFavourite: () => {}, 
});

export default function FavouritesProvider({ children }: PropsWithChildren){

    const [favourites, setFavourites] = useState<Favourite[]>([])

    const {getFavourites, addToFavourites, removeFromFavourites} = useLocalStorageUsers()

    const {userName} = useAuth()

    const addFavourite = (element: Character | Location) => {
        
        const res = addToFavourites(userName, element)

        if(!res)
            return favourites
        
        setFavourites(res.favourites)

        return res.favourites
    }

    const removeFavourite = (element: Character | Location) => {
        const res = removeFromFavourites(userName, element)
        if(!res)
            return true
        
        setFavourites(res.favourites)

        return res.favourites
    }

    const fetchFavourites = () => {
        //ADD TOKENS OR COOKIES TO SAVE SESSION AND SHOULD VALIDATE SESSION WITH BACK END
        //IGNORING FOR TEST PURPOSES
        const activeUser: string | null = localStorage.getItem("activeUser")

        if(!activeUser)
            return false
        
        const user = JSON.parse(activeUser)

        const res = getFavourites(user.userName)
        
        if (!res)
            setFavourites([])
        else{
            setFavourites(res)
        }
    }

    useEffect(() => {
        console.log("FAVS PROVIDER IS MOUNTED")


        

        fetchFavourites();

    }, [userName])

    return(
        <FavouritesContext.Provider value={{favourites, addFavourite, removeFavourite, setFavourites}}>
            {children}
        </FavouritesContext.Provider>
    )
}

export const useFavourites = () => useContext(FavouritesContext)
