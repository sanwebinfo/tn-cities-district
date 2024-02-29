# Tnweb

![build-test](https://github.com/sanwebinfo/tn-cities-district/workflows/build-test/badge.svg) ![npm](https://github.com/sanwebinfo/tn-cities-district/workflows/npm/badge.svg)  

Tnweb - Search and get the list of district and Major Cities of Tamil Nadu.  

A Simple tool to Search district and Major Cities of Tamil Nadu.  

## Built using

- Typescript
- JSON for store district and Major Cities data `(/database/districts.json)`
- Python to Manage Database
- pnpm package manager

## Usage

- Download or Clone the Repo

```sh
git clone https://github.com/sanwebinfo/tn-cities-district

## Open Project Folder
cd tn-cities-district

## install packages
pnpm install

## build CLI
pnpm build
```

- Link and Test the CLI Locally

```sh
npm link or pnpm link --global
```

- unlink CLI

```sh
npm rm --global tnweb or pnpm uninstall --global tnweb
```

- Access CLI Globally

```sh
tnweb district "madurai" (or) tnweb city "madurai"
```

- Access via **`NPX`**

```sh
npx tnweb district "madurai" (or) npx tnweb city "madurai"
```

- install via **`NPM`**

```sh

## install globally
npm install -g tnweb

## Remove Package
npm uninstall -g tnweb

````

- install and Manage via **`pnpm`**

```sh

## install globally
pnpm install -g tnweb

## update package
pnpm update -g tnweb

## Remove Package
pnpm uninstall -g tnweb

```

## LICENSE

MIT
