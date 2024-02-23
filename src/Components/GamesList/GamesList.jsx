import { useState, useRef, useCallback} from "react";
import {useFetchGames} from '../games-api/GamesAPI.jsx';
import './GamesList.css';
import windowsIcon from '../../assets/icons/Windows_logo.svg';
import xboxIcon from '../../assets/icons/Xbox_logo.svg';
import playstationIcon from '../../assets/icons/PlayStation_logo_white.svg';
import plusIcon from '../../assets/icons/plus.svg';
import plusIconInverted from '../../assets/icons/plus_inverted.svg';

export function GamesList({cartItems, cartItemHandler}) {
    const [pageNumber, setPageNumber] = useState(1);
    const {games, loading} = useFetchGames({page: pageNumber});
    const setPageNumberHandler = () => {
        setPageNumber(prevNumber => prevNumber + 1);
    }
    console.log(games);
    const observer = useRef();
    const lastCardElementRef = useCallback(node => {
        if(loading) return;
        if(observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting) {
                console.log("Intersecting!");
                setPageNumberHandler();
            }
        })
        if(node) observer.current.observe(node);
    }, [loading]);
    return (
        <>
            {games && <GameCardList games={games} lastCardElementRef={lastCardElementRef} loading={loading} cartItems={cartItems} cartItemHandler={cartItemHandler}/>}
        </>
    )
}

function GameCardList({games, lastCardElementRef, loading, cartItems, cartItemHandler}) {
    const gameCards = games.map((game, index) => {
            const parentPlatforms = game.parent_platforms;
            const icons = parentPlatforms?.map(parentPlatform => {
                const platformName = parentPlatform.platform.name;
                if(platformName == "PC") {
                    return windowsIcon;
                } else if (platformName == "PlayStation") {
                    return playstationIcon;
                } else if (platformName == "Xbox") {
                    return xboxIcon;
                }
            });
            const addToCartButton = <AddToCartButton game={game} cartItems={cartItems} cartItemHandler={cartItemHandler}/>;
            return <GameCard lastCardElementRef={lastCardElementRef} key={index} title={game.name} backgroundImage={game.background_image} icons={icons} button={addToCartButton}/>;
        }
    );
    return (
        <>
        <div className="game-card-list">
            {gameCards}
            {loading && <Loading/>}
        </div>
        </>
    );
}

export function GameCard({title, backgroundImage, icons, lastCardElementRef, button}) {
    return(
        <div ref={lastCardElementRef} className="game-card-container">
            <div className="game-card-image-container">
                <img className="game-card-image" src={backgroundImage}/>
                {button}
            </div>
            <div className="game-card-details">
                <div className="game-card-1st-row">
                    {icons.map((icon, index) => icon && <img key={index} className="platform-icon" src={icon}/>)}
                </div>
                <span className="game-card-title">{title}</span>
                <span style={{margin: "0 auto", fontSize: "1.5rem"}}>$30</span>
            </div>
        </div>
    );
}

function AddToCartButton({game, cartItems, cartItemHandler}) {
    let addedToCart = cartItems.includes(game);
    let source = addedToCart ? plusIconInverted : plusIcon;
    return(
        <button className="add-to-cart-button" onClick={() => {
            if(addedToCart) {
                cartItemHandler(game, "REMOVE");
            } else if (!addedToCart) {
                cartItemHandler(game, "ADD");
            }
        }}>
            <img className="add-to-cart-icon" src={source}/>
        </button>
    );
}

function Loading() {
    return <span className="material-symbols-outlined loading-icon">progress_activity</span>;
}

export default GamesList;