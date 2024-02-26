import {useState, useRef, useEffect} from "react";
import {GamesList} from '../GamesList/GamesList.jsx';
import './FrontPage.css';
import {SidebarFilters} from '../SidebarFilters/SidebarFilters.jsx';
import {NavBar} from '../NavBar/NavBar.jsx';

export function FrontPage() {
    const [pageNumber, setPageNumber] = useState(1);
    const setPageNumberHandler = () => {
        setPageNumber(prevNumber => prevNumber + 1);
    }
    const [searchTerm, setSearchTerm] = useState("");
    const searchTermHandler = (searchTerm) => {
        setSearchTerm(searchTerm);
    }
    const [submittedSearchTerm, setSubmittedSearchTerm] = useState("");
    const submittedSearchTermHandler = (searchTerm) => {
        setSubmittedSearchTerm(searchTerm);
        setPageNumber(1);
    }
    const [cartItems, setCartItems] = useState([]);
    const [cartVisible, setCartVisible] = useState(false);
    const [activePlatformFilters, setActivePlatformFilters] = useState([]);
    const [activeGenreFilters, setActiveGenreFilters] = useState([]);
    const activePlatformFiltersHandler = (filter, action) => {
        if(action == "ADD") setActivePlatformFilters(previousFilters => [...previousFilters, filter]);
        else if(action == "REMOVE") setActivePlatformFilters(previousFilters => {
            return previousFilters.filter(prevFilter => {
                return prevFilter != filter;
            })
        });
        setPageNumber(1);
    }
    const activeGenreFiltersHandler = (filter, action) => {
        if(action == "ADD") setActiveGenreFilters(previousFilters => [...previousFilters, filter]);
        else if(action == "REMOVE") setActiveGenreFilters(previousFilters => {
            return previousFilters.filter(prevFilter => {
                return prevFilter != filter;
            })
        });
        setPageNumber(1);
    }
    const cartItemHandler = (item, action) => {
        if(action == "ADD") setCartItems(previousItems => [...previousItems, item]);
        else if(action == "REMOVE") setCartItems(previousItems => {
            return previousItems.filter(prevItem => {
                return prevItem.id != item.id;

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
            <NavBar cartTotal={cartItems.length} cartVisibleHandler={cartVisibleHandler} searchTerm={searchTerm} searchTermHandler={searchTermHandler} submittedSearchTermHandler={submittedSearchTermHandler}/>
            <CartContents cartItems={cartItems} cartItemHandler={cartItemHandler} cartVisible={cartVisible} wrapperRef={wrapperRef}/>
            <div className="site-container">
                <SidebarFilters 
                    platformFilterHandler={activePlatformFiltersHandler} 
                    genreFiltersHandler={activeGenreFiltersHandler}
                />
                <ContextHeading/>
                <GamesList 
                    cartItems={cartItems} 
                    cartItemHandler={cartItemHandler} 
                    pageNumber={pageNumber} 
                    setPageNumberHandler={setPageNumberHandler} 
                    platformFilters={activePlatformFilters} 
                    genreFilters={activeGenreFilters} 
                    submittedSearchTerm={submittedSearchTerm}
                />
            </div>
        </>
    );
}

function ContextHeading() {
    return(
        <div className="context-heading">
            <h1>Games</h1>
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
                <span className="cart-card-price">$30</span>
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