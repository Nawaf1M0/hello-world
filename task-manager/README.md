# Task Manager

A small, customizable task management app. It ships with the basics you'd
expect — a kanban-style board, statuses, priorities, tags, due dates — but
almost everything is meant to be reshaped from the Settings screen instead of
the code:

- **Statuses** — the columns on your board. Add, rename, recolor, reorder,
  or delete them to match whatever workflow you use.
- **Priorities** — as many levels as you want, in whatever order and colors
  you like.
- **Tags** — free-form labels you can attach to any task.
- **Custom fields** — add extra fields to every task: text, number, date,
  dropdown, or checkbox.
- **Appearance** — light/dark/system theme, an accent color, card density,
  and even what a "task" is called (e.g. rename to "Ticket" or "Story").
- **Data** — export everything to a JSON file, import it back (in this or
  another browser), or reset to the defaults.

Data is stored in the browser's `localStorage`, so it persists across
reloads without needing a backend.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL. Other useful scripts:

```bash
npm run build     # type-check and produce a production build in dist/
npm run preview   # serve the production build locally
npm run lint       # lint the source
```

## Project structure

```
src/
  types/            Domain types (Task, StatusDef, PriorityDef, TagDef, CustomFieldDef, AppConfig)
  defaultConfig.ts  The starting statuses/priorities/tags and two example tasks
  storage.ts        localStorage persistence + JSON export/import
  context/          AppProvider — the single source of truth for tasks + config
  components/       Board, Column, TaskCard, TaskModal, Header
  components/settings/  Settings screens for each customizable area
```

Everything a user can customize lives in `AppConfig` (see `src/types/index.ts`)
and is edited through `useApp()` from `src/context/AppContext.tsx` — there's
no hardcoded list of statuses or priorities anywhere in the UI layer, so
adding a new kind of customization mostly means extending `AppConfig` and
adding a settings section for it.
