# Cypress End-To-End-Testing

This folder contains setup code and fixtures for end-to-end-testing (e2e) using Cypress.
Below you will find answers to questions that came up during development of the initial test suite.
They may help you when fixing or developing tests for fixmy.frontend.

The main place to go when in doubt about how Cypress works are [its docs](https://docs.cypress.io),
especially pay attention to the [faq section](https://docs.cypress.io/faq/questions/using-cypress-faq.html).

Before starting with the FAQ, here is a short link list about the topic.

- [best practices for cypress tests 1](https://docs.cypress.io/guides/references/best-practices.html)
- [best practices for cypress tests 2](https://itnext.io/cypress-io-best-practices-for-maintainable-tests-e9b9f392f117)
- [best practices for general e2e testing](https://www.ranorex.com/de/blog/10-best-practices-9-end-to-end-tests-richtig-nutzen/)
- [lessons learned with cypress](https://levelup.gitconnected.com/what-ive-learnt-using-cypress-io-for-the-past-three-weeks-c1597999cd2f)
- [Cypress CI (incl. Parallelization)](https://medium.com/@ludmila.nesvitiy/cypress-parallelization-case-study-results-5a01da095fe)

# FAQ

## 1. How can I get started? Is there some kind of High Level introduction article?

Yep, checkout [Der Softwerker: Frontend Spezial by CodeCentric](https://info.codecentric.de/softwerker-frontend-spezial).
The german article "Cypress und Redux" from Enno Lohmann explains the basics of Cypress (how to reference and interact
with elements and more) and how it can be used in a Redux-driven app. As of now it is my primary source besides the Cypress docs.

## 2. Redux integration: How can I manipulate the store to put the app in a certain state before I can interact with the UI to test it?

It is an anti-pattern to set the app in a certain, testable state just by changing routes and simulating user interactions.
In a redux-based app, the store can be mainpulated directly to configure the app with the desired state before tests are run.

There are two options:

1. Within a test, the store can be retrieved in order to dispatch actions that manipulate state.
2. An object can be provided as initial state to be loaded during initialization of the app.

### 1. Within a test, get a reference to the store and dispatch actions

During Cypress tests, the Redux store is globally made available by attaching it to the window object.
During a test, the store can be bound to an [alias](https://docs.cypress.io/guides/core-concepts/variables-and-aliases.html#Return-Values) that may then be used by other Cypress commands:

```javascript
cy.window()
  .its('store')
  .as('store');
```

Having aliased the store, an action could be dispatched like so:

```javascript
cy.get('@store') // get the store using the alias defined before
  .invoke('dispatch', { type: types.ADD_TODO, text: 'Einkaufen' }); // invoke the dispatch method and pass the action
```

Of course we can also read the store using `getState()`.

### 2. Before a test, provide an initialState and let the reducer pick it up

This option is already used in the KatasterKI tests.

The idea here is to set `window.initialState` to a certain object,
e.g. retrieved by loading a JSON using a [fixture](https://docs.cypress.io/api/commands/fixture.html#Syntax).

The top-level reducer is configured so that it initializes the app's state from
`window.initialState` if `window.Cypress` is defined.

Providing this `initialState` should be done before UI tests are fired, e.g. by
using `before` \ `beforeEach` hooks or by hooking into the beginning of a
route change like so:

```javascript
cy.visit('/', {
  onBeforeLoad: (win) => {
    win.initialState = {
      // some state
    };
  }
});
```

## 3. A test fails. How can I debug it?

The following way worked for me, there surely are smarter ways.

1. Set a debugger statement somewhere before you think the error resides.
2. Start the dev server, then run `npm run cypress -- run --browser chrome` in another console / run window
   This will launch chrome with open dev tools which should stop at the entered break point.
