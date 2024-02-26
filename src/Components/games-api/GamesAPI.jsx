import { useEffect, useState } from "react";

export function useFetchGames({page, genreIds = [], platformIds = [], search, reset}) {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const key = "5ffa67b24d57450bac3d502bf1583204";
    const genresParameter = genreIds.length > 0 ? "&genres=" + genreIds : "";
    const pagesParameter = page ? "&page=" + page : "";
    const platformsParameter = platformIds.length > 0 ? "&parent_platforms=" + platformIds : "";
    const searchParameter = search ? "&search=" + search : "";
    const query = "https://api.rawg.io/api/games?key=" + key + genresParameter + platformsParameter + pagesParameter + searchParameter + "&search_exact=1";
    console.log(query);
    useEffect(() => {
        const abortController = new AbortController();
        setLoading(true);
        fetch(query, { mode: "cors", signal: abortController.signal})
        .then(response => response.json())
        .then(response => {
            if(page == 1 || reset) {
                setGames(response.results);
            }
            else {
                setGames(previousGames => [...previousGames, ...response.results]);
            }
            setHasMore(response.next != null);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
        });
        return () => {
            abortController.abort();
        }
    }, [page, query]);
    return {games, loading, hasMore};
}

export default useFetchGames;