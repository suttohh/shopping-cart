import {useFetchGames} from '../games-api/GamesAPI.jsx';
import { FaSearch } from "react-icons/fa";
import './NavBar.css';

export function NavBar({cartTotal, cartVisibleHandler, searchTerm, searchTermHandler, submittedSearchTermHandler}) {
    return(
        <div className="nav-bar">
            <div className="navbar-site-details">
                <span className="material-symbols-outlined site-icon">joystick</span>
                <span className="site-title">We Do Games</span>
            </div>
                <SearchBar searchTerm={searchTerm} searchTermHandler={searchTermHandler} submittedSearchTermHandler={submittedSearchTermHandler}/>
            <button className="shopping-cart-icon-container" onClick={cartVisibleHandler}>
                    <span className="material-symbols-outlined shopping-cart-icon">shopping_cart</span>
                <span className="shopping-cart-total-items">{cartTotal}</span>
            </button>
        </div>
    );
}

function SearchBar({searchTerm, searchTermHandler, submittedSearchTermHandler}) {
    const {games} = useFetchGames({search: searchTerm, reset: true});
    return(
        <form className="navbar-form" onSubmit={(e) => {
            submittedSearchTermHandler(searchTerm);
            e.preventDefault();
        }}>
            <input className="navbar-search-input" value={searchTerm} onChange={(e) => {
                searchTermHandler(e.target.value)
            }}/>
            <button type="button" className="search-submit-button" onClick={() => {
                submittedSearchTermHandler(searchTerm);
            }}>
                <FaSearch className={"search-icon"}/>
            </button>
            { games.length > 0 && searchTerm && <GameSuggestionContainer games={games}/>}
        </form>
    );
}

function GameSuggestionContainer({games}) {
    console.log(games);
    return(
        <div className="game-suggestion-container">
            {games.map(game => {
                return <GameSuggestion key={game.id} title={game.name} image={game.background_image}/>
            })}
        </div>
    );
}

function GameSuggestion({title, image}) {
    return(
        <div className="game-suggestion">
            <img className="game-suggestion-image" src={image}/>
            <span className="game-suggestion-title">{title}</span>
        </div>
    );
}

export default NavBar;