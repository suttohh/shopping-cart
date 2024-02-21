import { useState } from "react";
import {useFetchGames} from './games-api/GamesAPI.jsx';
import './GamesList.css';
import windowsIcon from './assets/icons/Windows_logo.svg';
import xboxIcon from './assets/icons/Xbox_logo.svg';
import playstationIcon from './assets/icons/PlayStation_logo_white.svg';

export function GamesList() {
    const [pageNumber, setPageNumber] = useState(1);
    const {games, loading} = useFetchGames({page: pageNumber});
    const setPageNumberHandler = () => {
        setPageNumber(prevNumber => prevNumber + 1);
    }
    return (
        <>
            {loading && <Loading/>}
            {!loading && <GameCardList games={games} setPageNumberHandler={setPageNumberHandler}/>}
        </>
    )
}

function GameCardList({games, setPageNumberHandler}) {
    const gameCards = games.map((game, index) => {
            return <GameCard key={index} gameInfo={game}/>;
        }
    );
    return (
        <div className="game-card-list">
            {gameCards}
            <button onClick={() => {
                setPageNumberHandler(2);
            }}>Load More</button>
        </div>
    );
}

function GameCard({gameInfo}) {
    const parentPlatforms = gameInfo.parent_platforms;
    const platformNames = parentPlatforms?.map(parentPlatform => {
        return parentPlatform.platform.name;
    });
    return(
        <div className="game-card-container">
            <img className="game-card-image" src={gameInfo.background_image}/>
            <div className="game-card-details">
                <div className="game-card-1st-row">
                    {platformNames.includes("PC") && <img className="platform-icon" src={windowsIcon}/>}
                    {platformNames.includes("Xbox") && <img className="platform-icon" src={xboxIcon}/>}
                    {platformNames.includes("PlayStation") && <img className="platform-icon" src={playstationIcon}/>}
                </div>
                <span className="game-card-title">{gameInfo.name}</span>
            </div>
        </div>
    );
}

function Loading() {
    //TO-DO loading wheel animation
    return <></>
}

export default GamesList;