import { useFavourites } from '../providers/FavouritesProvider';
import { Character } from '../types'
import FavouritesButton from './FavouritesButton';

type CharacterListItemProps = {
    character:Character,
};

const CharacterItem = ({character}:CharacterListItemProps) => {

    const {favourites} = useFavourites() 
        
    return (
        <div className="card">
            <img src={character.image} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h3 className="card-title">{character.name}</h3>
                <p>{character.species}</p>

                <div className="container px-2 text-start gy-1">
                    <div className="row gx-1 row-cols-1">
                        <div className="col">
                            <p><b>Status: </b> {character.status}</p>
                            <p><b>Type: </b> {character.type == "" ? "N/A" :  character.type }</p>
                            <p><b>Gender: </b> {character.gender}</p>
                            <p><b>Gender: </b> {character.gender}</p>
                            <p><b>Origin: </b> {character.origin.name}</p>
                            <p><b>Last Location: </b> {character.location.name}</p>
                        </div>
                    </div>
                </div>
                <FavouritesButton isFavourite={favourites.find((fav) => (fav.element.id == character.id && fav.type === "Character")) ? true : false} element={character}/>
                
            </div>
        </div>
    )
}

export default CharacterItem