import { toHaveAccessibleDescription } from '@testing-library/jest-dom/dist/matchers';
import React from 'react';
import Button from 'react-bootstrap/Button';
import './Person.css';

class Person extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      waves: 0,
      needsHelp: false
    }
  }
  handleWaves = () => {
    this.setState({
      waves: this.state.waves + 1
    });
  };
  needsHelp = () => {
    this.setState({
      needsHelp: true
    });
  };
  helpGiven = () => {
    this.setState({
      needsHelp: false
    });
  }
  handleShowModal = () => {
    this.props.openModal(this.props.name);
  }
  render() {
    //console.log(this.props);
    // console.log(this.state);
    return (
      <article>
        <h3 onClick={this.handleShowModal}>{this.props.name}</h3>
        <p>{this.state.waves} 👋 greetings</p>
        <p onClick={this.handleWaves}>Say hello!</p>
        <img 
          src={this.props.imageURL}
          alt={this.props.name}
          onClick={this.props.addHearts}
        />
        <div>{this.state.needsHelp ? 'I need help' : ''}</div>
        <Button 
          className="article-button"
          onClick={this.needsHelp}
        >
          I need help
        </Button>
        <Button 
          variant="success"
          className="article-button"
          onClick={this.helpGiven}
        >
          I got help
        </Button>
      </article>
    );
  }
}

export default Person;
