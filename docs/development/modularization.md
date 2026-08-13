---
sidebar_position: 5
---

# Modularization

## Where code goes

| Directory | Contents | Rules |
|---|---|---|
| `Templates/` | DOM building, one file per feature | No business logic. Fetches happen by triggering actions or Api calls that write into signals. |
| `Actions/` | User-facing operations: call the API, mutate state | Imported by templates and other actions. |
| `Api/` | One static method per endpoint in `Api.ts`, URLs in `ApiRoutes.ts` | Thin. `ApiClient.ts` handles fetch, JSON, and error toasts. Do not fetch from templates. |
| `state.ts` | App-wide signals | Only state shared across features. Local state stays in the page function. |
| `Classes/` | Helpers with no DOM: `Ui`, `Util`, `InteractionStateManager`, `ColorExtractor`, ... | No rendering. |
| `Models/` | Small UI-only types (`FeedConfig`, `TrackList`) | Shared DB models come from `lyda-shared`. |
| `Enums/` | Constants: icons, images, text sizes | No logic. |
| `Streaming/` | Playback and queues | UI talks to it through `PlayManager` or `Actions/MusicActions`. |
| `Cache/` | localStorage and image caching | |

Rules of thumb:

- A template imports from `Api`, `Actions`, `state`, `Classes`. Not the other way around. Actions never build DOM.
- Logic needed by more than one template belongs in `Actions` (user intent) or `Classes` (pure helper), not duplicated.
- A widget needed by more than one feature belongs in `generic/GenericTemplates.ts`, or in its own `Templates/` file if it is large.
- Never import one feature's template file from another feature's template file. Go through `generic/` or lift the widget there.

## Adding a page

1. Add the path to the `RoutePath` enum in `Routing/routes.ts`.
2. Add a route entry: `{path: RoutePath.myPage, title: "My Page", params: ["id"]}`. `params` maps path segments after the page name, so `/mypage/42` gives `params.id = "42"`.
3. Create the page function in `Templates/<area>/MyTemplates.ts` (or a fitting existing file). Signature: `(route: Route, params: Record<string, string>) => AnyElement | Promise<AnyElement>`.
4. Register it in `PageTemplates.mapping`: `[RoutePath.myPage]: MyTemplates.myPage`.
5. If the page needs a login, add the path to `PageTemplates.needLoginPages`; the router redirects to login after render.
6. If it fetches data, add a method to `Api.ts` using the existing `get`/`post` helpers and an `ApiRoutes` constant.

In-app navigation uses `navigate(RoutePath.myPage, ["param=value"])` from `Routing/Router.ts`, which pushes history and re-runs the router. `reload()` re-renders the current page.

The router matches the first path segment, then maps the remaining segments and query parameters onto `params`.

## Styling

Two files hold all styling: `styles/style.css` (layout, cards, utilities) and `styles/elements.css` (element defaults). Themes in `styles/themes/` (dark, light, flexoki) only override the base variables.

- Never hardcode colors. Use the CSS variables from `style.css`: backgrounds `--bg-0` through `--bg-5`, text `--fg-0` through `--fg-5`, accents `--red`, `--green`, `--blue`, `--purple`, borders `--border`, plus spacing and radius variables (`--gap`, `--base-padding`, `--border-radius`, `--default-shadow`).
- Use utility classes (`flex`, `flex-v`, `card`, `padded`, `small-gap`, `align-children`, `clickable`, `hoverable`, `rounded-max`, `bordered`, `hidden`, ...) instead of inline styles.
- Inline `.styles()` only for values computed at runtime, like the progress circle's `conic-gradient` in `GenericTemplates.progressSectionPart`.
- Text sizes: use the `TextSize` enum classes (`TextSize.large`, `TextSize.small`) rather than pixel font sizes.
- Icons: material symbol names through `GenericTemplates.icon("queue_music", ...)`, or `Icons.ICON("name")` for SVGs in `/img/icons/`. No emojis, no inline SVG.
- New CSS goes into `style.css` or `elements.css`. Do not create per-feature stylesheets.
