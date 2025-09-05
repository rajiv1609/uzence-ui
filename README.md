# Uzence UI — React + TS + Tailwind + Storybook

Two from-scratch components: **InputField** and **DataTable**, built with React, TypeScript, Tailwind, and Storybook. No UI libraries used.

## Requirements satisfied
- ✅ React + TypeScript + Tailwind + Storybook only
- ✅ Two components with states/variants/sizes (InputField) and sorting/selection/loading (DataTable)
- ✅ Basic accessibility, responsiveness, tests, and docs

## Getting Started
```bash
# install (pnpm recommended)
pnpm install

# run demo app
pnpm dev

# run Storybook
pnpm storybook

# run tests
pnpm test

# build Storybook for deployment
pnpm build-storybook
```

## Project structure
See `src/components` for component source, `src/*.stories.*` for Storybook stories, and tests alongside components.

## Notes
- No external component libraries used. All styling written with Tailwind classes.
- Dark mode supported via `.dark` class on root.
- Accessibility: aria-invalid, aria-describedby, labeled sort buttons, checkbox labels.
