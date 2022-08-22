<div align="center">

<img width="64" src="docs/img/logo.svg">

# Slinky

[![CI](https://github.com/jaynewey/slinky/workflows/CI/badge.svg)](https://github.com/jaynewey/slinky/actions)
[![GitHub](https://img.shields.io/github/license/jaynewey/slinky)](https://github.com/jaynewey/slinky/blob/main/LICENSE)
[![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?logo=yarn&logoColor=white)](https://github.com/yarnpkg/yarn)

[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?logo=typescript&logoColor=white)](https://github.com/microsoft/TypeScript)
[![React](https://img.shields.io/badge/react-%2320232a.svg?logo=react&logoColor=%2361DAFB)](https://github.com/facebook/react)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?logo=tailwind-css&logoColor=white)](https://github.com/tailwindlabs/tailwindcss)
[![Charm Icons](https://img.shields.io/badge/charm%20icons-%2350C878.svg?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAANpJREFUOI2tk7FNA0EQRd/i7ERC4oQ6aAC3cCJyJW4Dd+HQEj2ckYCEAkhw5ogAEj8H/BOLpUPA+Us/mfn7Z3ZmF04NdaY+qJ3ahl1is2N9OTpcgFdgB7wBV0ndA+fABXBZSnGo+tRPLNSJehdOElOdDrW99QsvalPlm8R6bNXr2uBJfU6VXrhSS7iqjBfRPtYGnbpJq0114DbsDZtoNmpXG7TqXl33w1SXVcvLDBh1HW0LcPbDRn+PU1xh9BDHrbES/vkhjX7K37aQxBz4SOgmBHgH5oP/4L84AFJ3wx0yZi/SAAAAAElFTkSuQmCC)](https://github.com/jaynewey/charm-icons)
[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?logo=vite&logoColor=white)](https://github.com/vitejs/vite)


</div>

> In browser graphical Graph editor

[Try it out!](https://jaynewey.github.io/slinky)

---

Slinky allows you to graphically build and edit (currently unweighted, directed) graphs via a GUI in the browser, and import/export into CSV format (more formats are planned!).

## Roadmap

- [ ] More serialisation formats
  - [x] CSV
  - [ ] JSON
  - [ ] XML
  - [ ] Something else? Open an issue!
- [ ] Arbitrary node metadata
- [ ] Keyboard shortcuts
- [ ] Editor settings
- [ ] Edge labels
- [ ] Less bugs :¬)

## Contributing

Contributions are welcome. Please open an issue discussing the change before sending a PR.

### Development

Run the [Vite](https://github.com/vitejs/vite) dev server with:

```bash
$ yarn dev
```

### Building

The project is written in [TypeScript](https://github.com/microsoft/TypeScript). Build the project with:

```bash
$ yarn build
```

### Formatting

The project is formatted with [Prettier](https://github.com/prettier/prettier). Format all files using:

```bash
$ yarn format
```

Check formatting with:

```bash
$ yarn format:check
```

## Technologies and libraries

* [**TypeScript**](https://github.com/microsoft/TypeScript): Slinky is written in TypeScript.
* [**React**](https://github.com/facebook/react): Slinky is written with React.
* [**Tailwind CSS**](https://github.com/tailwindlabs/tailwindcss): Slinky is styled with Tailwind CSS.
* [**Charm icons**](https://github.com/jaynewey/charm-icons): Icons are provided by Charm Icons.
* [**vis-network**](https://github.com/visjs/vis-network): The graph visualisation is provided by `vis-network` with the help of [`react-vis-graph-wrapper`](https://github.com/Wokstym/react-vis-graph-wrapper).


