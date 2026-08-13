---
sidebar_position: 4
---

# Reusable components

Before building any UI, check `generic/GenericTemplates.ts` and the `jess-components` package. Most widgets you need already exist and are used across the app.

The screenshots on this page come from the web app's hidden `/component-gallery` page (route `RoutePath.componentGallery` in `lyda-ui-web-js`). It renders every widget below with sample data. To refresh them: run the app locally, open `http://localhost:3030/component-gallery`, screenshot the `#gallery-*` sections, and drop the files in `static/img/development/`.

## jess-components

Pre-built controls from `@targoninc/jess-components`. All take a config object; the interesting properties accept signals (`disabled`, `value`, `checked`, ...), so a control can be driven entirely by state.

| Function | Use |
|---|---|
| `button({text, icon, onclick, disabled, classes})` | The standard button. `disabled` accepts a signal. |
| `icon({icon, adaptive, isUrl})` | Material symbol or image. Returns a signal of elements. |
| `input({type, name, label, value, onchange, validators, required, debounce})` | Labeled input with validation, error list, debounce. |
| `textarea({name, value, onchange, required})` | Same, for text areas. |
| `select({options, value, onchange})` | Non-searchable dropdown over `SelectOption` (`{id, name, image}`). |
| `searchableSelect({options, value})` | Filterable dropdown with keyboard navigation. |
| `checkbox({checked, onchange, text, required})` | Checkbox with validation. |
| `toggle({checked, onchange, text})` | On/off switch. |
| `heading({level, text})`, `text({text})` | h1-h6 and styled text. |
| `container({children})`, `area({children})` | Generic wrappers. |

Passing `validators` (an array of `(value) => Promise<string[] | undefined>`) to `input`/`textarea`/`checkbox` gives you inline error display for free.

![jess-components controls](/img/development/jess-components.webp)

## GenericTemplates

The shared toolbox in `Templates/generic/GenericTemplates.ts`. Everything below is used in multiple places; reuse instead of rebuilding.

Layout:

- `vertical(...)`, `horizontal(...)`, `card()`
- `fixedBar(children)` for sticky toolbars
- `menu(shownSignal, ...children)` for dropdown menus

Buttons:

- `pill(option, state)`, `pills(options, state)` for tab-like option rows
- `roundIconButton(config, onclick)`, `playButton(trackId, start)`
- `deleteIconButton(id, cb)`, `uploadIconButton(id, cb)`
- `textButton(text, onclick, icon)`, `logoutButton()`, `newTrackButton()`, `modalCancelButton()`

![GenericTemplates layout and buttons](/img/development/generic-buttons.webp)

Forms:

- `checkbox(...)`, `toggle(...)`, `fileInput(...)`
- `combinedSelector(tabs, callback, selectedIndex)` for tab bars
- `steppedSlider(...)`, `releaseDateInput(state)`, `paginationControls(pageState, nextDisabled)`
- `searchWithFilter(...)`: search box, filter inputs, pagination and result list in one

Display:

- `icon(name, adaptive, classes, title)`: accepts a material symbol name or a URL and picks the right rendering. Prefer this over the raw `jess-components` icon.
- `title(text, icons)`, `text(...)`, `textWithHtml(...)`, `cardLabel(...)`, `tag(text, type)`, `timestamp(date)`
- `verifiedWithDate(date)`, `lock()`, `checkInCorner()`
- `loadingSpinner()` / `loadingBlobs()`, `noTracks()` for empty states, `missingPermission()`, `updateAvailable(version)`, `progressSectionPart(partSignal)`
- `gif8831(url, link)` for the 88x31 buttons, `benefit(text, icon)`, `graphic(url)`

![Display widgets](/img/development/display.webp)

If you write a generic widget in a feature file that another feature needs, move it to `GenericTemplates` instead of importing across feature files.

## Interactions

`InteractionTemplates.interactions(entityType, entity, options?)` renders the like/repost/comment buttons for any entity (track, album, playlist, comment). It handles counts, current-user state, and toggling via the API. Every list and page that shows interactions uses this. Do not roll your own like button.

![Like, repost and comment buttons](/img/development/interactions.webp)

## Entity widgets

Common per-entity building blocks, reused by feeds, pages and modals:

- `UserTemplates.userWidget(user, ...)`: avatar plus name, links to the profile. Also `followButton(...)`, `userIcon(...)`, `username(...)`, `displayname(...)`, `verificationBadge()`, `badges(...)`, `followsBackIndicator()`.
- `TrackTemplates.trackInList(listTrack, canEdit, list)`: one row of a track list with play and edit actions. Also `waveform(track, data)`, `playButton(track)`.
- `CommentTemplates.commentBox(trackId, commentsSignal)` and `commentInList(comment, commentsSignal)` for comment threads.
- `NotificationTemplates.notificationInList(notification)` and `notificationLink(notification, part)` for the notification page.

![User widgets](/img/development/user-widgets.webp)

## Feeds

`FeedTemplates.create(config)` builds a whole paginated, sortable, filterable feed from a `FeedConfig`. Explore, following, history, profile tabs, album and playlist pages all use it. Before writing a custom list page, check whether a `FeedConfig` covers it. Look at existing calls in `PageTemplates.ts` for the config shape.

![A feed built from a FeedConfig](/img/development/feed.webp)

## Menus and popovers

- `PopoverTemplates.popover(id, ...children)` creates a native popover; `show`, `hide`, `toggle`, `showAtPoint`, `showContextMenu` position and display it.
- `ContextMenuTemplates.create(item, buildActions, id?)` gives a right-click menu for an item.

![Context menu, modals and notifications](/img/development/menus-modals.webp)

## Modals and notifications

Use the `Ui` class from `Classes/Ui.ts` instead of hand-mounting `GenericTemplates.modal`:

- `Ui.getConfirmationModal(title, text, confirmText, cancelText, onConfirm, onCancel)`
- `Ui.getTextInputModal(title, text, initialValue, confirmText, cancelText, onConfirm)`: calls back with the entered value
- `Ui.getTextAreaInputModal(...)`: same, multiline
- `Ui.deleteWithConfirmation(event, title, text, onDelete)`: confirmation plus closing any popover
- `Ui.showImageModal(url)`
- `notify(text, NotificationType, timeoutMs)`: transient toast, deduplicated. Use it for errors and confirmations.

## Tables and charts

`TableTemplates` (`table`, `tableHeaders`, `tr`) for sortable data tables and `ChartTemplates` (`barChart`, `boxPlotChart`, `paginatedBarChart`, `noData`) for statistics. Both are used by the statistics and transactions pages.

![Table and charts](/img/development/tables-charts.webp)

## Forms

`FormTemplates.fileField`, `textField`, `moneyField`, `dropDownField`, `checkBoxField`, `titleInput`, `descriptionInput`, `visibilityToggle`: the standard form fields for track/album/playlist editors, wired to signals so form state lives outside the DOM.

![Form fields](/img/development/forms.webp)
