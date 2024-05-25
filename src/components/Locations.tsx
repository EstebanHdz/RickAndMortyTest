import { useEffect, useRef, useState } from 'react'
import { Location } from '../types'
import { Globals } from '../helpers/Globals'
import useInfiniteScroller from '../hooks/useInfiniteScroller'
import LocationItem from './LocationItem'

const Locations = () => {

    const [locations, setLocations] = useState<Location[]>([])

    const observerTarget = useRef(null);

    const {page, isLoading, setIsLoading} = useInfiniteScroller(observerTarget)

    async function fetchLocations() {
        const petition = await fetch(Globals.apiURL + "/location?page=" + page )

        if (petition.status === 200) {
            const result = await petition.json()

            if(result.Error)
                return result
            
            setLocations( (locs) => ( [ ...locs, ...result.results]))
            

        }else{
            setLocations([...locations])
        }

        setIsLoading(false)
    }

    useEffect(() => {
        setIsLoading(true)
        window.setTimeout(fetchLocations, 500);  
    }, [page])

    return (
        <div className="main__hero text-center">
            <h1>Locations</h1>
            <div className="container text-center px-4">
                <div className="row row-cols-4 gy-3">
                    {locations.map((location, key) => {
                        return(
                            <div className="col gx-3" key={key}>
                                <LocationItem location={location}/>
                            </div>
                        )
                    })}
                </div>

                <br />
                {isLoading && <p><b>Loading...</b></p>}
                <div ref={observerTarget}></div>
                {/*<Target/>*/}
            </div>
            <br />
            <br />
            <br />
        </div>
    )
}

export default Locations