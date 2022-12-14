const API_KEY = process.env.REACT_APP_API_KEY;

export const searchGames = async (query) => {
    return await fetch(`https://api.rawg.io/api/games?search=${query}&exclude_stores=4,5,7,8,9,10&key=${API_KEY}`);
};

export const popularGames = async () => {
    const response = await fetch(`https://api.rawg.io/api/games?dates=2022-01-01,2022-12-31&ordering=-added&page_size=6&key=${API_KEY}`);
    return response.json();
};

export const searchGenre = async (id, page) => {
    const response = await fetch(`https://api.rawg.io/api/games?page_size=6&genres=${id}&page=${page}&key=${API_KEY}`);
    return response.json();
};

//let query ='';

//genre id's:
// Action = 4
// Indie = 51
// Adventure = 3
// RPG = 5
// Strategy = 10
// Shooter = 2
// Casual = 40
// Simulation = 14
// Puzzle = 7
// Arcade = 11
// Platformer = 83
// Racing = 1
// Sports = 15
// Fighting = 6
// Family = 19
// Board Games = 28