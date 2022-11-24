require('dotenv').config();
const API_KEY = process.env.API_KEY

export const searchGames = (query, API_KEY) => {
    return fetch(`https://api.rawg.io/api/games?search=${query}&key=${API_KEY}`)
};

export const popularGames = (API_KEY) => {
    return fetch(`https://api.rawg.io/api/games?page_size=6&key=${API_KEY}`)
};

export const searchGenre = (id, page, page_size, API_KEY) => {
    return fetch(`https://api.rawg.io/api/games?${page_size}=6&genres=${id}&page=${page}&key=${API_KEY}`)
};

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