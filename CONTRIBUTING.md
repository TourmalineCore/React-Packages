# Contributing

## Reporting Issues

If you have found what you think is a bug, please [file an issue](https://github.com/TourmalineCore/React-Packages/issues).

## Suggesting new features

If you are here to suggest a feature, first create an issue if it does not already exist. From there, we will discuss use-cases for the feature and then finally discuss how it could be implemented.

## Development

### Init
this command will install all required packages, specified in root package.json
```
npm i
```

this command runs `lerna bootstrap`\
it should create symlinks between packages and install all their dependencies\
[More about lerna bootstrap](https://github.com/lerna/lerna/tree/main/commands/bootstrap#readme)
```
npm run lerna:init
```

### Starting work
run all packages combined storybook
```
npm start
```

### Create new package
please use `tc-` prefix for packages names
```
npm run package:create <new-package-name>
```
after package created you should go to created directory and add description in package.json \
index.js is an entrypoint for your package, all parts should be exported from this file

### Adding external deps or creating inner dependencies between packages
this will add dependency to your `--scope` package\
if it inner dependency, lerna will add symlink to target package\
if you want all packages to be affected - run without `--scope` arg\
package-name - `package.json#name` (not folder name)\
[More about lerna add](https://github.com/lerna/lerna/tree/main/commands/add#readme)
```
npx lerna add <dependency-you-want-to-add> --scope=<package-name> --exact

// external npm package example
npx lerna add react-table  --scope=<package-name> --exact
```

### removing dependencies
it simply runs command for all or just scoped packages\
[More about lerna exec](https://github.com/lerna/lerna/tree/main/commands/exec#readme)
```
npx lerna exec --scope=<package-name> -- npm un <dependency-name>
```


### Build packages
you can run it to preview result before publishing (`es/` folders inside packages)
```
npm run build-packages
```

### Publishing
build es5 and publish all changed and affected packages
```
npm run lerna:publish
```

this will publish canary version
```
npm run lerna:publish-canary
```

### Test run versions update (versions bump and changelogs generation)
it can be useful if you not sure about result\
after it you can simply discard all changes
```
npx lerna version --no-git-tag-version --no-push
```

### Build storybook
this command creates storybook build (ex: to deploy demo page with stories)
```
npm run build
```


### Testing and linting
run tests
```
npm test
```

run eslint + stylint
```
npm run lint
```

read more about eslint plugin approval flow\
[Eslint approval flow update](https://github.com/Microsoft/vscode-eslint#version-2110)


#### another useful commands
```
npm run lint:js
npm run lint:js:fix
npm run lint:css
npm run lint:css:fix
```

## Commit message conventions

We are using [Angular Commit Message Conventions](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines).

We have very precise rules over how our git commit messages can be formatted. This leads to **more readable messages** that are easy to follow when looking through the **project history**.

### Commit Message Format

Each commit message consists of a **header**, a **body** and a **footer**. The header has a special
format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

Any line of the commit message cannot be longer than 100 characters! This allows the message to be easier to read on GitHub as well as in various git tools.

### Type

Must be one of the following:

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing
  semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools and libraries such as documentation
  generation

### Scope

The scope could be anything specifying place of the commit change. For example `useQuery`, `useMutation` etc...

You can use `*` when the change affects more than a single scope.

### Subject

The subject contains succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize first letter
- no dot (.) at the end

### Body

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes". The body should include the motivation for the change and contrast this with previous behavior.

### Footer

The footer should contain any information about **Breaking Changes** and is also the place to [reference GitHub issues that this commit closes](https://help.github.com/en/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue).

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.

### Example

Here is an example of the release type that will be done based on a commit messages:

| Commit message                                                                                                                                                                                   | Release type               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------- |
| `fix(pencil): stop graphite breaking when too much pressure applied`                                                                                                                             | Patch Release              |
| `feat(pencil): add 'graphiteWidth' option`                                                                                                                                                       | ~~Minor~~ Feature Release  |
| `perf(pencil): remove graphiteWidth option`<br><br>`BREAKING CHANGE: The graphiteWidth option has been removed.`<br>`The default graphite width of 10mm is always used for performance reasons.` | ~~Major~~ Breaking Release |

### Revert

If the commit reverts a previous commit, it should begin with `revert:`, followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

## Pull requests

Maintainers merge pull requests by squashing all commits and editing the commit message if necessary using the GitHub user interface.

Use an appropriate commit type. Be especially careful with breaking changes.
