import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starWarsData: [],
      cityData: {},
      error: false,
      errorMessage: ''
    }
  }

  handleStarWars = async (e) => {
    e.preventDefault();
    try {
      // get the data from the API
      let starWarsCharacter = await axios.get('https://swapi.dev/api/people/?page=1');
      // console.log(starWarsCharacter);
      // save that data into state
      this.setState({
        starWarsData: starWarsCharacter.data.results
      });
    } catch (error) {
      console.log('error', error);
      console.log('error.response', error.response);
      this.setState({
        error: true,
        errorMessage: `An error occurred: ${error.response.status}`
      })
    }
  };

  handleCityInput = (event) => {
    this.setState({
      city: event.target.value
    })
  }

  getCityData = async (e) => {
    e.preventDefault();
    // get the data from the API
    let cityData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`);
    console.log(cityData.data[0]);
    // save that data into state
  }

  render() {

    console.log(this.state);
    let starWarsListItems = this.state.starWarsData.map((character, idx) => <li key={idx}>{character.name}</li>);
    return (
      <>
        <h1>Data from an API</h1>
        <form>
          <button onClick={this.handleStarWars}>Display Star Wars data</button>
        </form>
        {this.state.error 
          ?
          <p>{this.state.errorMessage}</p>
          :
          <ul>
            {starWarsListItems}
          </ul>
        }
        <form onSubmit={this.getCityData}>
          <label>Pick a city:
            <input type="text" onInput={this.handleCityInput} />
            <button type="submit">Get city data</button>
          </label>
        </form>
      </>
    );
  }
}

export default App;
