# Pokédex Explorer

A Pokédex app to check and favorite Pokémon


## Tech stack

- React 19 + TypeScript
- Tailwind CSS 
- React Router

## Getting started

```bash
npm install
npm run dev      # start the dev server (http://localhost:5174)
npm run build     # production build
npm run preview   # preview the production build
```



### Performance fix (Question 6)

Two things reduce load on the API as the user types in the search box:

- Debouncing — [useDebounce.ts](src/hooks/useDebounce.ts) delays reacting to the search input by 350ms, so a filter pass only runs once the user pauses typing instead of on every keystroke.
- **Caching + local filtering** — [api/pokemon.ts](src/api/pokemon.ts) fetches the full name index once (`fetchAllPokemonIndex`) and caches Pokémon detail responses in memory (`fetchPokemonDetail`). Search then filters that cached index client-side, so typing further, backspacing, or re-searching a name never re-hits the network.

Both spots are marked with a comment in the source pointing back to this requirement.

## Deployment

This is a static Vite build, so it deploys as-is to Netlify, Vercel, or GitHub Pages:

```bash
npm run build   # outputs to dist/
```

- **Vercel/Netlify**: point the project at this folder, build command `npm run build`, output directory `dist`.
- **GitHub Pages**: set `base` in `vite.config.ts` to your repo name and deploy the `dist/` folder (e.g. via the `gh-pages` package).

## Use of an AI code editor/assistant (Question 9)

This project was built with **Claude Code** (Anthropic's CLI coding assistant) end-to-end, from a fresh `npm create vite` scaffold to the finished, browser-tested app. Specifically, it was used to:

- Read and parse the test brief (PDF) to extract the 9 requirements.
- Scaffold the project (Vite + React + TypeScript), install and configure Tailwind CSS v4 and React Router.
- Design the folder structure (`api`/`components`/`context`/`hooks`/`pages`/`types`/`utils`) and write every file in it — types for PokeAPI responses, the API layer with caching, the debounce/infinite-scroll hooks, the Favorites/CustomPokemon contexts, and all four pages.
- Iterate on a real bug found during testing: an initial pagination implementation double-fetched the first page under React StrictMode, producing duplicate list items. This was diagnosed from console warnings and fixed by guarding the fetch with a ref instead of relying solely on state.
- Drive an in-browser preview of the running dev server to manually test every feature (grid/list toggle, infinite scroll, search + clear, favoriting, the detail page, the cry button, and the create-Pokémon form) and confirm there were no console errors before considering the work done.
- Write this README.

All code was generated directly by the assistant based on natural-language instructions; no code was copy-pasted from other sources.
