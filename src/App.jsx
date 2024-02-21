import './App.css';
import {GamesList} from './GamesList.jsx';
import windowsIcon from './assets/icons/Windows_logo.svg';
import xboxIcon from './assets/icons/Xbox_logo.svg';
import playstationIcon from './assets/icons/PlayStation_logo_white.svg';

function App() {
    return (
        <div className="site-container">
            <div className="sidebar">
                <div className="sidebar-section">
                    <span className="sidebar-section-title">Platforms</span>
                    <button className="sidebar-button">
                        <img className="platform-icon" src={windowsIcon}/>
                        <span>PC</span>
                    </button>
                    <button className="sidebar-button">
                        <img className="platform-icon" src={xboxIcon}/>
                        <span>Xbox</span>
                    </button>
                    <button className="sidebar-button">
                        <img className="platform-icon" src={playstationIcon}/>
                        <span>Playstation</span>
                    </button>
                </div>
            </div>
            <h1>Filter</h1>
            <GamesList/>
        </div>
    );
}
export default App;
