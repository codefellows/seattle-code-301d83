import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import './App.css';
import data from './data.json';

class App extends React.Component {
  render() {
    return (
      <>
        <Header/>
        <Main
          data={data}
        />
        <footer>
          &copy; Code Fellows, 2022
        </footer>
      </>
    );
  }
}

export default App;
