export type CharacterStatus = 'Alive' | 'Dead' | 'unknown';
export type CharacterGender = 'Female' | 'Male' | 'genderless' | 'unknown';
export type FavouriteType = 'Location' | 'Character';
export const FavouriteTypeName: string[] = ['Location', 'Character'];

export type Location = {
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: string[];
    url: string;
    image: string;
}

export type Character = {
    id: number;
    name: string;
    status: CharacterStatus;
    species: string;
    type: string;
    gender: CharacterGender;
    image: string;
    location: {
        name: Location["name"];
    };
    origin: {
        name: Location["name"];
    }
};

export type Favourite = {
    type: FavouriteType;
    element: Character | Location;
}

export type User = {
    userName: string;
    favourites: Array<Favourite>;
    password: string
}