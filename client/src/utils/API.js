export const searchGames = (query) => {
    return fetch(`https://api.rawg.io/api/games?search=${query}&key=441bc230dd484d378172728bd72cc4b5`)
};

export const popularGames = () => {
    return fetch(`https://api.rawg.io/api/games?page_size=6&key=441bc230dd484d378172728bd72cc4b5`)
};

export const searchGenre = (id, page, page_size) => {
    return fetch(`https://api.rawg.io/api/games?${page_size}=6&genres=${id}&page=${page}&key=441bc230dd484d378172728bd72cc4b5`)
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