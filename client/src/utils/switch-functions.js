import PCLogo from '../assets/PC_Logo.svg';
import XboxLogo from '../assets/Xbox_Logo.svg';
import PSLogo from '../assets/PlayStation_logo.svg';
import NintendoLogo from '../assets/Nintendo_Logo.svg';

export function platform(id){
    const platforms = {
        1: PCLogo,
        3: XboxLogo,
        2: PSLogo,
        7: NintendoLogo
    };
    return platforms[id];
}

export function store(id) {
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