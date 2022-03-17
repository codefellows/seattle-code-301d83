import React from 'react';
import { Form, Button } from 'react-bootstrap';
import './App.css';

let starRatings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Thing to rate',
      numberOfStars: '',
      starRatings: starRatings,
      favorites: []
    }
  }

  handleName = (event) => {
    this.setState({
      name: event.target.value
    });
  };
  handleStars = (event) => {
    this.setState({
      numberOfStars: event.target.value
    });
  };
  handleSelect = (e) => {
    console.log(e.target.value);
    let selected = e.target.value;

    if (selected === 'even') {
      let newStars = starRatings.filter(num => num % 2 === 0);
      this.setState({ starRatings: newStars });
    } else if (selected === 'odd') {
      let newStars = starRatings.filter(num => num % 2 !== 0);
      this.setState({ starRatings: newStars });
    } else { // ALL
      this.setState({ starRatings: starRatings });
    }
  }
  handleSubmit = (event) => {
    event.preventDefault();
    // console.log(this.state);
    //console.log(event.target.name.value);


    console.log(`${this.state.name} is ${this.state.numberOfStars} stars!`);

    this.setState({
      submittedName: event.target.name.value,
      submittedStars: event.target.star.value,
      submittedSelected: event.target.selected.value
    });
   // // This will not work, because setState doens't finish fast enough
   // console.log('handleSubmit: ', this.state.submittedName, this.state.submittedStars);

  }

  render() {
    //console.log('render: ', this.state);
    let listItems = this.state.starRatings.map((item, idx) => {
      return <li key={idx}>{item}</li>
    })
    return (
      <>
        <header>
          <h1>You are a Star</h1>
        </header>
        <main>
          <section>
            <header className='star' style={{ backgroundImage: "url(/Gold_Star.svg)" }}>
              <h2>{this.state.name}</h2>
              <p>{this.state.numberOfStars}</p>
            </header>

            <Form onSubmit={this.handleSubmit}>
              <Form.Group >
                <Form.Label htmlFor="yourName">Name
                </Form.Label>
                <Form.Control 
                  type="text"
                  name="name"
                  id="yourName"
                  onInput={this.handleName}
                />
              </Form.Group>
              <Form.Group controlId="star">
                <Form.Label>How many stars
                </Form.Label>
                <Form.Control 
                  type="number"
                  // name="star"
                  onInput={this.handleStars}
                />
              </Form.Group>
              <Form.Group >
                <Form.Select name="selected" onChange={this.handleSelect}>
                  <option value="all">All</option>
                  <option value="even">Even</option>
                  <option value="odd">Odd</option>
                </Form.Select>
              </Form.Group>

              <Button type="submit">submit</Button>
            </Form>

            {/* <form onSubmit={this.handleSubmit}>
              <fieldset>
                <legend>Make Yourself a Star</legend>
                <label>Name
                  <input
                    name="name"
                    type="text"
                    onInput={this.handleName} 
                  />
                </label>
                <label htmlFor="numberOfStars">How many stars?</label>
                <input 
                  name="star" 
                  id="numberOfStars" 
                  type="number" 
                  onChange={this.handleStars} 
                />
              </fieldset>
              <fieldset>
                <legend>Track Ratings</legend>
                <select 
                  name="selected" 
                  onChange={this.handleSelect}
                >
                  <option value="all">All</option>
                  <option value="even">Even</option>
                  <option value="odd">Odd</option>
                </select>
              </fieldset>
              <button type="submit">Submit</button>
            </form> */}


          </section>
          <aside>
            <ul>{listItems}</ul>
          </aside>
        </main>
      </>
    );
  }
}

export default App;
