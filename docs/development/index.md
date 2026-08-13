---
sidebar_position: 1
---

# Developing the web app

The public web app lives in [`lyda-ui-web-js`](https://github.com/targoninc/lyda-ui-web-js). It has no framework. Rendering is done with [jess](https://github.com/targoninc/jess), a small DOM builder with signals, plus its companion package [jess-components](https://github.com/targoninc/jess-components). If you know React or Solid, the concepts transfer, but there is no virtual DOM and no JSX. Everything is TypeScript functions that return DOM nodes.

You need [bun](https://bun.sh). The commands you will use:

```bash
bun run build-dev   # continuous build
bun run start-dev   # dev server with live reload
bun run lint        # eslint
```

Commits run eslint and formatting automatically via husky and lint-staged.

## How the app boots

`src/ui/main.ts` runs on page load:

1. Loads the current user into the `currentUser` signal.
2. Mounts the player (`PlayerTemplates.player()`) into the footer.
3. Creates the router with the route list from `Routing/routes.ts`.

The router looks up the current path, clears `.page-container`, calls the matching function from `Templates/PageTemplates.ts`, and appends the returned element. Everything else is that function building DOM.

## Directory map

```
src/ui/
  main.ts            entry point, router setup
  locales/           translations and t()
  styles/            style.css, elements.css, themes/
  js/
    Api/             HTTP client, endpoint URLs, one method per endpoint
    Actions/         user actions: API calls plus state changes
    Cache/           LydaCache (localStorage), CachingService (images)
    Classes/         Ui, Util, validators, helpers
    Enums/           icons, images, shared class-name constants
    Models/          UI-only types (FeedConfig, TrackList, ...)
    Routing/         routes.ts, Router.ts
    Streaming/       audio playback, queue management
    Templates/       all DOM building
    state.ts         global signals
```

Database models and shared enums come from the [`lyda-shared`](https://github.com/targoninc/lyda-shared) package, imported as `@targoninc/lyda-shared/src/Models/...`. Do not redefine a model that already exists there.

## The mental model

Data flows one way: `Api` fetches, `Actions` decide, `Templates` render. Cross-cutting state sits in `state.ts` as signals. If the DOM needs to change after render, a signal drives it and jess updates the element.

New here? Read the next pages in order: [Signals](signals), [Templates](templates), [Reusable components](components), [Modularization](modularization).
