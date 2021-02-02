# Component Library

`components2` contains React components that are reused in more than one app
or subsite. They should be implemented using

- Typescript
- unit tests
- Storyboard story

## Module exports

Every component should be contained in its own folder, spelling the component
name in CamelCase. Inside the folder should be an `index.ts` file that re-exports
any modules that make up this component _as named exports_. Using named exports
ensures that IDEs can find component import paths and autocomplete them when
you spell a component's name.
