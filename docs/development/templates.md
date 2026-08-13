---
sidebar_position: 3
---

# Templates

A template is a function that returns a DOM element. All UI code in the repo is templates. DOM is built with jess's `create` builder.

## The builder

```ts
create("div")
    .classes("flex-v", "padded")
    .id("settings-modal")
    .attributes("aria-label", "Settings")
    .styles("width", "100%")
    .text("Some text")      // sets innerText
    .html("<b>bold</b>")    // sets innerHTML, sanitize user input first
    .children(...nodes)
    .build();
```

Chain the methods and finish with `.build()` to get the real element. Event handlers are builder methods too: `.onclick(fn)`, `.oninput(fn)`, `.onchange(fn)`, `.ondragenter(fn)` and so on.

Every setter accepts a plain value or a signal. Pass a signal and jess keeps the DOM in sync:

```ts
create("span").text(compute(p => `Page ${p}`, pageState));
create("div").classes(activeClass);   // class list swapped when the signal changes
```

`create` knows SVG tags (`svg`, `path`, `circle`, ...) and creates them in the SVG namespace.

## Layout helpers

`vertical(...children)` and `horizontal(...children)` from `generic/GenericTemplates.ts` create a div with the `flex-v` or `flex` class. They accept elements, builder nodes, and signals of elements. Nearly every page starts with one:

```ts
return vertical(
    heading({level: 1, text: t("BATCH_EDIT")}),
    when(tabSelected(selectedTab, 0), TrackEditTemplates.batchEditTracksPage()),
).build();
```

## File organization

Each feature area has one file containing a class of static methods. Methods take data plus signals and return elements: `TrackTemplates.ts`, `UserTemplates.ts`, `CommentTemplates.ts`. Small helpers everything uses live in `generic/GenericTemplates.ts`; bigger shared blocks get their own file (`InteractionTemplates.ts`, `NotificationTemplates.ts`, `FeedTemplates.ts`).

A typical component follows three steps:

1. Create signals for anything that changes.
2. Fetch data and write it into the signals.
3. Return DOM built from the signals.

```ts
static profile(route: Route, params: Record<string, string>) {
    const user = signal<User|null>(null);

    Api.getUser(params.name).then(u => user.value = u);

    return vertical(...).build();
}
```

Pages are built synchronously and update themselves as data arrives. Do not make the page function wait on its own fetches; that only delays the first paint.

## Translations

Every user-visible string goes through `t()` from `locales/`:

```ts
create("span").text(t("LOG_OUT"))
```

`t` returns a signal computed from the current language, so text updates when the language changes. Keys live in `locales/en.ts`, `de.ts`, `ga.ts`; add new keys to all three. Function values receive the arguments passed to `t`: `t("N_RESULTS", count)`. Never hardcode an English string in a template.
