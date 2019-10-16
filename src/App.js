import React, { Component } from "react";
import { key } from "./apiKey"
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: "",
      destination: "",
      exchangeRate: {}
    };
  }

  updateInput = (event) => {
    const { name, value } = event.target
    this.setState({[name]: value })
  }

  submitForm = async (event, apiKey) => {
    event.preventDefault()
    const data = await fetch(`https://free.currconv.com/api/v7/convert?q=${this.state.origin}_${this.state.destination}&compact=ultra&apiKey=${key}`);
    const response = await data.json();
    this.setState({exchangeRate: response})
    return response;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitForm}>
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
        <p>{Object.values(this.state.exchangeRate)}</p>
      </div>
    )
  }
}

export default App;