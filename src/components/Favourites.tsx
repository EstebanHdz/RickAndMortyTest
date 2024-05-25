import { useAuth } from "../providers/AuthProvider"
import { Character, Location } from "../types"
import LocationItem from "./LocationItem"
import CharacterItem from "./CharacterItem"
import { useFavourites } from "../providers/FavouritesProvider"

export const Favourites = () => {

    const {isLoggedIn} = useAuth()

    const {favourites} = useFavourites()


    function isCharacter(element: Character | Location): element is Character{
        return (element as Character).gender !==undefined
    }


    if(!isLoggedIn){
        return (
            <div className="container-sm text-center">
                <h2>Login to see your favourites</h2>
            </div>
        )
    }

    return (
        <div className="main__hero text-center">
            <h1>Favourites</h1>
            <div className="container text-center px-4">
                <div className="row row-cols-4 gy-3">
                    {favourites.map((favourite, key) => {
                        return(
                            <div className="col gx-3" key={key}>
                                {isCharacter(favourite.element) ? <CharacterItem character={favourite.element}/> : <LocationItem location={favourite.element}/> }
                            </div>
                        )
                    })}
                </div>
            </div>
            
        </div>
    )
}
