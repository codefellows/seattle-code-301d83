import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Modal from 'react-bootstrap/Modal';
import './App.css';
import data from './data.json';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hearts: '',
      name: 'firstName lastName',
      showModal: false
    };
  }
  addHearts = () => {
    this.setState({
      hearts: this.state.hearts + '❤️'
    });
  };
  hideModal = () => {
    this.setState({
      showModal: false,
    });
  };
  openModal = (name) => {
    this.setState({
      showModal: true,
      name: name
    });
  };
  render() {
    return (
      <>
        <Header
          hearts={this.state.hearts}
        />
        <Main
          data={data}
          addHearts={this.addHearts}
          openModal={this.openModal}
        />
        <footer>
          &copy; Code Fellows, 2022
        </footer>
        <Modal
          show={this.state.showModal}
          onHide={this.hideModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>{this.state.name}</Modal.Title>
          </Modal.Header>
        </Modal>
      </>
    );
  }
}

export default App;
