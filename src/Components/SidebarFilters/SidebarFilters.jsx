import {useState, useRef} from "react";
import "./SidebarFilters.css";

export function SidebarFilters({platformFilterHandler, genreFiltersHandler}) {
    //Use ref so as to not repeatedly get new set of filters every render
    const platformFilters = useRef(getPlatformFilters());
    const genreFilters = useRef(getGenreFilters());
    return (
        <div className="sidebar">
            <div className="sidebar-section">
                <FilterDropdown filterCategory="Platform" filters={platformFilters.current} filterClickHandler={platformFilterHandler}/>
                <FilterDropdown filterCategory="Genre" filters={genreFilters.current} filterClickHandler={genreFiltersHandler}/>
            </div>
        </div>
    );
}

function FilterDropdown({filterCategory, filters, filterClickHandler}) {
    const [expanded, setExpanded] = useState(true);
    return(
        <div className="filter-dropdown-container">
            <button className="filter-dropdown" onClick={() => {
                setExpanded(!expanded);
            }}>
                <span className="sidebar-section-title">{filterCategory}</span>
                <span className={expanded ? "material-symbols-outlined expanded" : "material-symbols-outlined"}>expand_more</span>
            </button>
            {
            filters.map(filter => {
                return <FilterButton key={filter.filterId} isHidden={!expanded} filterName={filter.filterName} filterId={filter.filterId} onClick={(isHighlighted) => {
                    if(isHighlighted) filterClickHandler(filter, "ADD");
                    else if (!isHighlighted) filterClickHandler(filter, "REMOVE");
                }}/>;
            })
            }
        </div>
    );
}

function FilterButton({filterName, onClick, isHidden}) {
    const [highlighted, setHighlighted] = useState(false);
    const classNames = ["filter-button"];
    if(isHidden) {
        classNames.push("hidden");
    }
    if(highlighted) {
        classNames.push("highlighted");
    }
    return(
        <button className={classNames.join(" ")} onClick={() => {
            if(!highlighted) {
                onClick(true);
                setHighlighted(true);
            } else if (highlighted) {
                onClick(false);
                setHighlighted(false);
            }
        }}>
            <span>{filterName}</span>
            {highlighted && <span className="material-symbols-outlined highlighted-icon">check</span>}
        </button>
    );
}

//Should be replaced by a database query if app is expanded to include a backend
function getPlatformFilters() {
    return [
        {
            filterName: "PC",
            filterId: 1
        },
        {
            filterName: "PlayStation",
            filterId: 2
        },
        {
            filterName: "Xbox",
            filterId: 3
        }
    ];
}

//Should be replaced by a database query if app is expanded to include a backend
function getGenreFilters() {
    return [
        {
            filterName: "Action",
            filterId: 4
        },
        {
            filterName: "Indie",
            filterId: 51
        },
        {
            filterName: "Adventure",
            filterId: 3
        },
        {
            filterName: "RPG",
            filterId: 5
        },
        {
            filterName: "Strategy",
            filterId: 10
        },
        {
            filterName: "Shooter",
            filterId: 2
        },
        {
            filterName: "Casual",
            filterId: 40
        },
        {
            filterName: "Simulation",
            filterId: 14
        },
        {
            filterName: "Puzzle",
            filterId: 7
        },
        {
            filterName: "Arcade",
            filterId: 11
        },
        {
            filterName: "Platformer",
            filterId: 83
        },
        {
            filterName: "Racing",
            filterId: 1
        },
        {
            filterName: "Massively Multiplayer",
            filterId: 59
        },
        {
            filterName: "Sports",
            filterId: 15
        },
        {
            filterName: "Fighting",
            filterId: 6
        },
        {
            filterName: "Family",
            filterId: 19
        },
        {
            filterName: "Board Games",
            filterId: 28
        },
        {
            filterName: "Educational",
            filterId: 34
        },
        {
            filterName: "Card",
            filterId: 17
        },
    ];
}

export default SidebarFilters;