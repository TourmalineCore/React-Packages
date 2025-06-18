# Tourmaline Core react packages monorepo

## Demo
[React-Packages Storybook](https://tourmalinecore.github.io/React-Packages/)

## This monorepo container following packages
follow links to see packages usage details
- [UI-kit](packages/react-tc-ui-kit)
- [Modal](packages/react-tc-modal)
- [Table](packages/react-table-responsive)
- [Auth](packages/react-tc-auth)

## Contributing
more info about packages development\
[CONTRIBUTING](CONTRIBUTING.md)

## Dev Containers

### Prerequisites

- [Docker](https://www.docker.com/get-started/)
- [VSCode](https://code.visualstudio.com/)
- [Dev Containers Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

### Run Cypress tests

IMPORTANT! Before running the tests, run the command:

```bash
npm run build-packages
```

## Component tests

To run component tests, run the command:

```bash
npm run cypress:run:component
```

To open cypress UI to run component tests, run the command:

```bash
npm run cypress:open:component
```

### Start

If you open this project in VSCode please install Dev Containers extension and agree to re-open this project's folder in it with installing all the rest of recommended extensions.

```bash
# run once to install dependencies
npm ci

# to start storybook 
npm start

# to run linting
npm run lint
```