import React, { Component } from "react";
import { key, currencySymbols } from "./apiKey"
import { countries } from "./countriesList"
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryList: {},
      origin: "",
      destination: "",
      exchangeRate: {}
    };
  }

  updateInput = (event) => {
    const { name, value } = event.target
    if (value.length >= 3) {
      this.checkInput()
    }
    this.setState({[name]: value })
  }

  checkInput = () => {
    let country = countries.find((x) => {
      return (this.state.origin === x.name || this.state.origin === x.abbr) || (this.state.destination === x.name || this.state.destination === x.abbr)
    })
    if (country) {
      this.setState({origin: country.abbr, destination: country.abbr})
    }
  }

  submitForm = async (event, apiKey) => {
    console.log(this.state.origin)
    event.preventDefault()
    const data = await fetch(`https://free.currconv.com/api/v7/convert?q=${this.state.origin}_${this.state.destination}&compact=ultra&apiKey=${key}`);
    const response = await data.json();
    this.setState({exchangeRate: response})
    console.log(currencySymbols.USD)
    return response;
  }

  getCountryData = async () => {
    const data = await fetch(`https://free.currconv.com/api/v7/countries?&apiKey=${key}`);
    const response = await data.json();
    this.setState({countryList: response.results})
    return response.results
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