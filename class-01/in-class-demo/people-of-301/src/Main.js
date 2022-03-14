import React from 'react';
import Person from './Person.js';

class Main extends React.Component {
  render() {
    return (
        <main>
          <Person 
            name="Sheyna" 
            hometown="Seattle" 
            hairColor="Brown"
          />
          <Person name="Cole"/>
          <Person name="Nathan"/>
          <Person name="Eden"/>
        </main>
    );
  }
}

export default Main;
