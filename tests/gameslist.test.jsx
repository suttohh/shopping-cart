import { render, screen } from "@testing-library/react";
import {GameCard} from "../src/GamesList.jsx";
import {describe, it, expect} from 'vitest';
import fetch from "node-fetch";
import windowsIcon from '../src/assets/icons/Windows_logo.svg';
import xboxIcon from '../src/assets/icons/Xbox_logo.svg';
import playstationIcon from '../src/assets/icons/PlayStation_logo_white.svg';

globalThis.fetch = fetch;

const icons = [windowsIcon, xboxIcon, playstationIcon];
const backgroundImage = "./src/assets/icons/PlayStation_logo.svg";
const name = "game-name-test";

describe("Games card component", () => {
    it("renders background image", async () => {
        render(<GameCard title={name} backgroundImage={backgroundImage} icons={icons}/>);
        expect(screen.getAllByRole("img")[2].getAttribute('src')).toEqual(backgroundImage);
    });
    it("renders window icon", () => {
        render(<GameCard title={name} backgroundImage={backgroundImage} icons={icons}/>);
        expect(screen.getAllByRole("img")[3].getAttribute('src')).toEqual(windowsIcon);
    });
    it("renders playstation icon", () => {
        render(<GameCard title={name} backgroundImage={backgroundImage} icons={icons}/>);
        expect(screen.getAllByRole("img")[5].getAttribute('src')).toEqual(playstationIcon);
    });
    it("renders xbox icon", () => {
        render(<GameCard title={name} backgroundImage={backgroundImage} icons={icons}/>);
        expect(screen.getAllByRole("img")[4].getAttribute('src')).toEqual(xboxIcon);
    });
    it("renders title", () => {
        render(<GameCard title={name} backgroundImage={backgroundImage} icons={icons}/>);
        expect(screen.getByText(name)).toBeTruthy();
    });
});