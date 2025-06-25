// Pull Preact exports off the global `preact` object
const { h, render, Component } = preact;

class App extends Component {
  render() {
    return h("div", null,
      h("h1", null, "Hello from Preact!"),
      h("p", null, "Edit main.js & reload to see changes.")
    );
  }
}

// Mount <App /> into <div id="root">
render(h(App), document.getElementById("root"));
