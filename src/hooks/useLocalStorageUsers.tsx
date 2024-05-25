import { Character, User, Location, Favourite } from "../types"

const useLocalStorageUsers = () => {



    const logInUser = (userN:string, password:string) => {
        const usersJson: string | null = localStorage.getItem("users")
                
        if(!usersJson){
            return false
        }else{
            const users: User[] = JSON.parse(usersJson)

            if(users.find((user) => (user.userName === userN && user.password === password))){
                return true
            }else {
                return false
            }
        }
    }

    const signUpUser = (user:string, password:string) => {
        const usersJson: string | null = localStorage.getItem("users")
        
        const newUser:User = {
            userName: user,
            password: password,
            favourites: [],
        }

        
        if(!usersJson){
            localStorage.setItem("users", JSON.stringify([newUser]))
            return true
        }

        const users: User[] = JSON.parse(usersJson)
        const userExist = users.find((user) => user.userName === newUser.userName )

        if(userExist)
            return false
        
        users.push(newUser)
        console.log(users);
        
        localStorage.setItem("users", JSON.stringify(users))
        return true
        

        
    }

    function isCharacter(element: Character | Location): element is Character{
        return (element as Character).gender !==undefined
    }

    const addToFavourites = (userN:string, element: Character | Location) => {
        const usersJson: string | null = localStorage.getItem("users")

        if(!usersJson)
            return false

        const newFavorite:Favourite = {
            type: isCharacter(element) ? "Character" : "Location",
            element:element
        }

        let users: User[] = JSON.parse(usersJson)
        const userExist = users.find((user) => user.userName === userN )

        if(!userExist)
            return false
        
        const favExist = userExist.favourites.find((favourite) => favourite === newFavorite)

        if(favExist)
            return false
        
        userExist.favourites.push(newFavorite)
        console.log(userExist);
        
        users = users.map((user) => user.userName === userN ? userExist : user)
        localStorage.setItem("users", JSON.stringify(users))

        return userExist
    }

    const removeFromFavourites = (userN:string,  element: Character | Location) => {
        const usersJson: string | null = localStorage.getItem("users")

        if(!usersJson)
            return false

        let users: User[] = JSON.parse(usersJson)
        const userExist = users.find((user) => user.userName === userN )

        if(!userExist)
            return false
    
        const type = isCharacter(element) ? "Character" : "Location"
        userExist.favourites = userExist.favourites.filter((favourite) => favourite.element.id !== element.id || favourite.type !== type)
        //console.log(clean);
        

        users = users.map((user) => user.userName === userN ? userExist : user)
        localStorage.setItem("users", JSON.stringify(users))

        return userExist
    }

    const getFavourites = (userN:string) => {
        const usersJson: string | null = localStorage.getItem("users")

        if(!usersJson)
            return false

        const users: User[] = JSON.parse(usersJson)
        const userExist = users.find((user) => user.userName === userN )

        if(!userExist)
            return false
        
        return userExist.favourites
    }

    return {
        logInUser,
        signUpUser,
        addToFavourites,
        removeFromFavourites,
        getFavourites
    }
}

export default useLocalStorageUsers
