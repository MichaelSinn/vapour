import GamesList from '../components/GamesList';
import {useFetch} from 'react-async';
import {useParams} from 'react-router';

export default function Genre() {
    const {genreId} = useParams();
    const API_KEY = process.env.REACT_APP_API_KEY;

    const genres =
        {
            4: 'Action',
            51: 'Indie',
            3: 'Adventure',
            5: 'RPG',
            10: 'Strategy',
            2: 'Shooter',
            40: 'Casual',
            14: 'Simulation',
            7: 'Puzzle',
            11: 'Arcade',
            83: 'Platformer',
            1: 'Racing',
            15: 'Sports',
            6: 'Fighting',
            19: 'Family',
            28: 'Board Games'
        };

    const {
        data,
        error
    } = useFetch(`https://api.rawg.io/api/games?page_size=18&genres=${genreId}&page=1&key=${API_KEY}`, {headers: {accept: 'application/json'}});

    const displayGenre = () => {
        if (error) {
            return error.message;
        }
        if (data) {
            return data.results;
        }
        return null;
    };

    return (
        <GamesList games={displayGenre()} heroHeader={genres[genreId]}/>
    );
}