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
### Cosmetic additions

- Light and dark mode
- Back to top button
- More Pokemon relevant status


### Performance fix (Question 6)

Two things reduce load on the API as the user types in the search box:

- Debouncing — [useDebounce.ts](src/hooks/useDebounce.ts) delays reacting to the search input by 350ms, so a filter pass only runs once the user pauses typing instead of on every keystroke.
- **Caching + local filtering** — [api/pokemon.ts](src/api/pokemon.ts) fetches the full name index once (`fetchAllPokemonIndex`) and caches Pokémon detail responses in memory (`fetchPokemonDetail`). Search then filters that cached index client-side, so typing further, backspacing, or re-searching a name never re-hits the network.

Both spots are marked with a comment in the source pointing back to this requirement.

## Deployment

Live at **https://dandober.github.io/Pokemon-Explorer/** — deployed automatically via GitHub Actions ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)) on every push to `master`. The workflow builds with `npm run build` and publishes the `dist/` folder with `actions/deploy-pages`.

This is a static Vite build, so it deploys just as easily to Netlify or Vercel:

```bash
npm run build   # outputs to dist/
```

- **Vercel/Netlify**: point the project at this folder, build command `npm run build`, output directory `dist`. Remove the `base: '/Pokemon-Explorer/'` line in [vite.config.ts](vite.config.ts) first — that's only needed for GitHub Pages' subpath hosting.

## Use of an AI code editor/assistant (Question 9)


- Read and parse the test brief (PDF) to extract the 9 requirements and check if everything was covered.
- Assisted on bug searching
- Write this readme
- Clear unnecessary code
- Added missing source comments across components/contexts, and set up the GitHub Pages deploy workflow (vite `base` path, router `basename`, 404.html SPA-routing fallback, and the Actions workflow itself)

