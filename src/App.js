import React, { Component } from "react";
import { key, currencySymbols } from "./apiKey"
import { countries } from "./countriesList"
import { countryNames } from "./countryNames"
import Autocomplete from "./autocomplete";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryList: {},
      origin: "",
      destination: "",
      exchangeRate: {},
      countryNames: [],
      test: "",
    };
  }

  updateInput = (event) => {
    const { name, value } = event.target
    if (value.length >= 3) {
      this.checkInput()
    }
    this.setState({[name]: value })
  }

  componentDidMount = () => {
    this.setState({countryNames: countryNames})
  }

  completeTest = (x) => {
    let z, y
    console.log(x)
    let current = this.state.test
    let arr = [...current]
    arr.push(x)
    this.setState({test: arr})
    console.log("this is ARRRRRR", arr, arr[0], arr[1])
    if (arr.length) {
      z = arr[0]
      y = arr[1]

      let originCountry = countries.find((x) => {
        return (z === x.name || z === x.abbr)
      })

      let destinationCountry = countries.find((x) => {
        return (y === x.name || y === x.abbr)
      })

      if (originCountry) {
        this.setState({origin: originCountry.abbr})
      }

      if (destinationCountry) {
        this.setState({destination: destinationCountry.abbr})
      }
    }
  }

  checkInput = () => {
    let country = countries.find((x) => {
      return (this.state.origin === x.name || this.state.origin === x.abbr) || (this.state.destination === x.name || this.state.destination === x.abbr)
    })
    console.log(country)
    if (country) {
      this.setState({origin: country.abbr, destination: country.abbr})
    }
  }

  submitForm = async (event, apiKey) => {
    console.log(this.state.origin)
    console.log(this.state.destination)
    event.preventDefault()
    const data = await fetch(`https://free.currconv.com/api/v7/convert?q=${this.state.origin}_${this.state.destination}&compact=ultra&apiKey=${key}`);
    const response = await data.json();
    console.log(response)
    this.setState({exchangeRate: response})
    console.log(currencySymbols.USD)
    this.setState({test: []})
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
          <label>current currency</label>
          <Autocomplete 
            suggestions={this.state.countryNames}
            completeTest={this.completeTest}
            />
          <label>convert to</label>
          <Autocomplete 
            suggestions={this.state.countryNames}
            completeTest={this.completeTest}
            />
          <button onClick={this.submitForm}> submit </button>
        </form>
        <p>{Object.values(this.state.exchangeRate)}</p>
      </div>
    )
  }
}

export default App;