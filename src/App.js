import React, { Component } from "react";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: "",
      destination: "",
      exchangeRate: ""
    };
  }

  updateInput = (event) => {
    const { name, value } = event.target
    this.setState({[name]: value })
  }

  render() {
    return (
      <form>
        <input 
          name="origin"
          value={this.state.origin}
          placeholder="current currency"
          onChange={this.updateInput}
          />
        <input 
          name="destination"
          value={this.state.destination}
          placeholder="convert to"
          onChange={this.updateInput}
          />
        <button> submit </button>
      </form>
    )
  }
}

export default App;