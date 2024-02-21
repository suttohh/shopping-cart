import { useEffect, useState } from "react";

export function useFetchGames({page, genres}) {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const key = "5ffa67b24d57450bac3d502bf1583204";
    const genresParameter = genres ? "?genres=" + genres : "";
    const pagesParameter = page ? "&page=" + page : "";
    useEffect(() => {
        const abortController = new AbortController();
        fetch("https://api.rawg.io/api/games?key=" + key + genresParameter + pagesParameter, { mode: "cors", signal: abortController.signal})
        .then(response => response.json())
        .then(response => {
            setGames(previousGames => [...previousGames, ...response.results]);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
        });
        return () => {
            abortController.abort();
        }
    }, [genresParameter, pagesParameter]);
    return {games, loading};
}

export default useFetchGames;