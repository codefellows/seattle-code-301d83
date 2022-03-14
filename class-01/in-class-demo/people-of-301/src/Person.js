import React from 'react';

class Person extends React.Component {
  render() {
    //console.log(this.props);
    return (
      <article>
        <h3>{this.props.name}</h3>
        <p>Some text will go here</p>
      </article>
    );
  }
}

export default Person;
