export default function platform(id){
    switch (id) {
        case 1:
            return {PC};
            break;
        case 2: 
            return {playstation}
            break
        case 3:
            return {xbox}
            break
        case 7: 
            return {nintendo}
            break
    }
}

export default function store(id) {
    switch (id) {
        case 1:
            return `https://store.steampowered.com/`;
            break;
        case 2: 
            return `https://www.xbox.com/en-CA/microsoft-store`
            break
        case 3:
            return `https://store.playstation.com/en-ca/pages/latest`
            break
        case 6: 
            return `https://www.nintendo.com/en-ca/store/`
            break
        case 11: 
            return `https://store.epicgames.com/en-US/`
    }
}