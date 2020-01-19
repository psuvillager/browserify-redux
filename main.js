const
// Imports node modules
  http = require('http'),
  fs = require('fs'),
  url = require('url'),
  { createStore } = require('redux'),

  // Imports app resources
  { todoApp } = require('./src/reducers'),
  { once } = require('./src/helpers'),
  {
    addTodo, toggleTodo, setVisibilityFilter,
    VisibilityFilters, ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER
  } = require('./src/actions'),
  { render } = require('./src/render');

// Defines the store by passing the root reducer to `createStore`
const store = createStore(todoApp);

// Defines a global history array and pushes the initial state to it
const stateHistory = [];
let state = store.getState();
//console.log(state);
stateHistory.push(state);

// Allows suppressing logs
let suppress; //suppress = true;

// Registers a listener for any changes to state (`.subscribe` returns a function for unregistering)
const unsubscribe = store.subscribe( (suppressLogs = suppress) => {
  stateHistory.push(store.getState());
  if(!suppressLogs){ console.log(store.getState()); }
});

// Dispatch some test actions
store.dispatch({ type: ADD_TODO, text: "Do a thing" });


