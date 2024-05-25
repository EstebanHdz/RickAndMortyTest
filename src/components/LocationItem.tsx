import { useFavourites } from '../providers/FavouritesProvider';
import { Location } from '../types'
import FavouritesButton from './FavouritesButton';

type LocationListItemProps = {
    location: Location,
};

const LocationItem = ({location}:LocationListItemProps) => {

    const {favourites} = useFavourites()   

    return (
        <div className="card">
            <div className="card-body">
                <h3 className="card-title">{location.name}</h3>

                <div className="container px-2 text-start gy-1">
                    <div className="row gx-1 row-cols-1">
                        <div className="col">
                            <p><b>Type: </b> {location.type}</p>
                            <p><b>Dimensions: </b> {location.dimension}</p>
                        </div>
                    </div>
                </div>
                <FavouritesButton isFavourite={favourites.find((fav) => (fav.element.id == location.id && fav.type === "Location")) ? true : false} element={location}/>
            </div>
        </div>
    )
}

export default LocationItem