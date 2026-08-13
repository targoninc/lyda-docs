---
sidebar_position: 2
---

# Signals

All reactivity comes from `@targoninc/jess`. A signal is a value container with subscribers:

```ts
import {signal} from "@targoninc/jess";

const volume = signal(0.25);              // Signal<number>
const currentUser = signal<User|null>(null);

volume.value = 0.5;       // set and notify
const v = volume.value;   // read
```

Read `.value` where you need the current value, subscribe where you need to react. Setting the same value again still notifies subscribers, but with `changed = false`.

## Subscribing

```ts
volume.subscribe((newValue, changed) => {
    if (!changed) {
        return;
    }
    LydaCache.set(UserCacheKey.volume, new CacheItem(newValue));
});
```

This is the canonical `state.ts` pattern: export a signal, subscribe once at module level to persist side effects (cache, footer classes, interaction state). Side effects belong in subscriptions, not at every call site of `x.value = ...`.

`subscribe(callback, key?)` adds a callback, `unsubscribe(callback)` removes it. Passing a key lets a later subscription replace an earlier one under the same key.

## Derived values: compute

`compute(valueFunction, ...signals)` returns a signal that recomputes when any input changes to a different value:

```ts
const isPlaying = compute((c, p) => c === trackId && p, currentTrackId, playingHere);
```

The function receives the current values of all inputs as arguments. Use `compute` for anything small and derived from other signals.

A common helper from `GenericTemplates.ts`:

```ts
export const tabSelected = (current: Signal<number>, i: number) =>
    compute(c => c === i, current);
```

## Conditions: when

`when(condition, element)` shows an element when the condition is truthy, otherwise a hidden placeholder. With a signal condition it returns a `Signal<element>` and updates the DOM whenever the condition flips:

```ts
when(hasError, warningIcon())               // static element
when(hasError, () => warningIcon())         // built lazily, only when true
when(isLast, breadcrumbSeparator(), true)   // inverted: show when falsy
```

Because it returns either an element or a signal of an element, it can go anywhere `.children()` accepts a node. For conditional classes rather than whole elements, use `compute` with `.classes()`:

```ts
create("div").classes(compute(h => h ? "error" : "_", hasError))
```

The `"_"` class is a placeholder: `classes()` treats `""` as `"_"`, and signal-driven conditional classes should emit `"_"` when inactive.

## Lists: signalMap

`signalMap(arraySignal, wrapper, itemCallback)` renders the array and re-renders whenever the signal changes:

```ts
signalMap(filteredResults, create("div").classes("flex-v", "fixed-bar-content"), entryFunction)
```

It returns the built wrapper. The fourth argument, `renderSequentially`, makes updates append one item at a time instead of replacing all children; feeds use it to stream in results. `signalMap` throws if the first argument is not a signal.

Keep array state in signals. Never build a list by calling a per-item render function yourself.

## Accepting value or signal

Shared components often take `StringOrSignal` or `TypeOrSignal<T>` parameters (both from jess). Convert with `asSignal(value)` to get a signal either way, and check with `isSignal(value)`.

## Rules

- App-wide state: export the signal from `state.ts`. Component-local state: create the signal inside the page function.
- Do not subscribe inside functions that run on every render. Subscriptions accumulate.
- Do not update the DOM directly. Change the signal the element was built from.
- Prefer `compute` over subscribing to one signal to set another.
