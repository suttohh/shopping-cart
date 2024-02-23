import {useState, useRef, useEffect} from "react";
import {GamesList} from '../GamesList/GamesList.jsx';
import './FrontPage.css';
import windowsIcon from '../../assets/icons/Windows_logo.svg';
import xboxIcon from '../../assets/icons/Xbox_logo.svg';
import playstationIcon from '../../assets/icons/PlayStation_logo_white.svg';

export function FrontPage() {
    const [cartItems, setCartItems] = useState([]);
    const [cartVisible, setCartVisible] = useState(false);
    console.log(cartVisible);
    const cartItemHandler = (item, action) => {
        if(action == "ADD") setCartItems(previousItems => [...previousItems, item]);
        if(action == "REMOVE") setCartItems(previousItems => {
            console.log("triggered");
            return previousItems.filter(prevItem => {
                return prevItem != item;
            });
        })
    }
    const cartVisibleHandler = () => {
        setCartVisible(prevValue => !prevValue);
    }
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, cartVisible, cartVisibleHandler);
    return (
        <>
            {cartVisible && <div className="disable-div"/>}
            <NavBar cartTotal={cartItems.length} cartVisibleHandler={cartVisibleHandler}/>
            <CartContents cartItems={cartItems} cartItemHandler={cartItemHandler} cartVisible={cartVisible} wrapperRef={wrapperRef}/>
            <div className="site-container">
                <SideBar/>
                <ContextHeading/>
                <GamesList cartItems={cartItems} cartItemHandler={cartItemHandler}/>
            </div>
        </>
    );
}

function SideBar() {
    return (
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
    );
}

function ContextHeading() {
    return(
        <div className="context-heading">
            <h1>Filter</h1>
        </div>
    );
}

function NavBar({cartTotal, cartVisibleHandler}) {
    return(
        <div className="nav-bar">
            <img className="site-icon" src={xboxIcon}/>
            <button className="shopping-cart-icon-container" onClick={cartVisibleHandler}>
                <span className="material-symbols-outlined shopping-cart-icon">shopping_cart</span>
                <span className="shopping-cart-total-items">{cartTotal}</span>
            </button>
        </div>
    );
}

function CartContents({cartItems, cartItemHandler, cartVisible, wrapperRef}) {
    const cards = cartItems.map((item, index) => {
        const button = <RemoveCartItemButton cartItem={item} cartItemHandler={cartItemHandler}/>
        return <CartCard key={index} title={item.name} image={item.background_image} cartItemHandler={cartItemHandler} button={button}/>;
    });
    return(
        <div ref={wrapperRef} className={ cartVisible ? "cart-sidebar-container visible" : "cart-sidebar-container"}>
            <div className="cart-sidebar-heading-container">
                <h2>{cartItems.length} Games</h2>
            </div>
            {cards}
        </div>
    );
}

function CartCard({title, image, button}) {
    return (
        <div className="shopping-cart-card">
            <img className="cart-card-image" src={image}/>
            <div className="cart-card-details">
                {button}
                <span className="cart-card-title">{title}</span>
                <span>$30</span>
            </div>
        </div>
    );
}

function RemoveCartItemButton({cartItem, cartItemHandler}) {
    return (
        <button className="remove-item-button" onClick={() => {
            cartItemHandler(cartItem, "REMOVE");
        }}>
            <span className="material-symbols-outlined remove-item-icon">do_not_disturb_on</span>
        </button>
    );
}

function useOutsideAlerter(ref, cartVisible, cartVisibleHandler) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target) && cartVisible) {
            cartVisibleHandler();
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, cartVisible]);
  }

export default FrontPage;