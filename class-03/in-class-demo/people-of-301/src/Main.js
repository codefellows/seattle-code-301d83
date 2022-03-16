import React from 'react';
import Person from './Person.js';
import './Main.css';

class Main extends React.Component {
  
  render() {
    //console.log(this.props);
    let people =[];
    this.props.data.forEach((person, index) => {
      people.push(
        <Person
          name={person.name}
          imageURL={person.imageURL}
          key={index}
          addHearts={this.props.addHearts}
          openModal={this.props.openModal}
        />
      )
    })

    return (
        <main>
          {people}
        </main>
    );
  }
}

export default Main;
