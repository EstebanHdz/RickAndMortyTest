import { useAuth } from '../providers/AuthProvider'
import { useFavourites } from '../providers/FavouritesProvider';
import { Character, Location } from '../types';

type FavouriteButttonProps = {
    isFavourite:boolean,
    element: Character | Location
};

const FavouritesButton = ({isFavourite, element}:FavouriteButttonProps) => {


    const {isLoggedIn} = useAuth()
    //const { addFavourite } = useLocalStorageUsers()
    const {addFavourite, removeFavourite} = useFavourites()

    const addToFavourites = () => {
        console.log(element);
        if(isLoggedIn){
            addFavourite(element)
        }
    }
    const removeFromFavourites = () => {
        console.log(element);
        if(isLoggedIn){
            removeFavourite(element)
        }
    }

    if(isFavourite){
        return (
            <button
                className={"btn btn-danger " + (isLoggedIn ? "" : "disabled")} 
                onClick={removeFromFavourites}
            > 
                {isLoggedIn ? "" : "Login to "} Remove from Favourites
            </button>
        )
    }

    return (
        <button
            className={"btn btn-primary " + (isLoggedIn ? "" : "disabled")} 
            onClick={addToFavourites}
        > 
            {isLoggedIn ? "" : "Login to "} Add to Favourites
        </button>
    )
}

export default FavouritesButton