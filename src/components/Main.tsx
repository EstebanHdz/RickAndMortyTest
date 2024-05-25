import { useEffect, useRef, useState } from 'react'
import { Character } from '../types'
import { Globals } from '../helpers/Globals'
import CharacterItem from './CharacterItem'
import useInfiniteScroller from '../hooks/useInfiniteScroller'

const Main = () => {
    const [characters, setCharacters] = useState<Character[]>([])
    const observerTarget = useRef(null);
    const {page, isLoading, setIsLoading} = useInfiniteScroller(observerTarget)


    async function fetchCharacters() {
        const petition = await fetch(Globals.apiURL + "/character?page=" + page )

        if (petition.status === 200) {
            const result = await petition.json()

            if(result.Error)
                return result
            
            setCharacters( (chars) => ( [ ...chars, ...result.results]))
            

        }else{
            setCharacters([...characters])
        }
        
        setIsLoading(false)

    }

    useEffect(() => {
        setIsLoading(true)
        window.setTimeout(fetchCharacters, 500);  
    }, [page])

    return (
        <div className="main__hero text-center">
            <h1>Characters</h1>
            <div className="container text-center px-4">
                <div className="row row-cols-4 gy-3">
                </div>
                <div className="row row-cols-4 gy-3">
                    {characters.map((character, key) => {
                        return(
                            <div className="col gx-3" key={key}>
                                <CharacterItem character={character}/>
                            </div>
                        )
                    })}
                </div>

                <br />
                {isLoading && <p><b>Loading...</b></p>}
                <div ref={observerTarget}></div>
            </div>
            <br />
            <br />
            <br />
        </div>
    )
}

export default Main