import React from 'react';
import { Container, Button, ListGroup } from 'react-bootstrap';
import UpdateCatForm from './UpdateCatForm';

class Cats extends React.Component {

  render() {
    let cats = this.props.cats.map(cat => (
      <Cat 
        cat={cat} 
        key={cat._id} 
        deleteCat={this.props.deleteCat}
        updateCat={this.props.updateCat} 
      />
    ))
    return (
      <Container>
        <ListGroup>
          {cats}
        </ListGroup>
      </Container>
    )
  }
}

class Cat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showUpdateForm: false
    }
  }
// helper method could go here

  render() {
    return(
      <>
      <ListGroup.Item>
        {this.props.cat.name} is {this.props.cat.color}
        <div>
        <Button 
          variant="dark" 
          onClick={() => this.props.deleteCat(this.props.cat._id)}
        >
          Delete Cat
        </Button>
        <Button 
          onClick={() => this.setState({showUpdateForm: true})}
        >
          Update Cat
        </Button>
        </div>
      </ListGroup.Item>
      {
        this.state.showUpdateForm 
        &&
        <UpdateCatForm 
          cat={this.props.cat}
          updateCat={this.props.updateCat}
        />
      }
      </>
    )
  }
}

export default Cats;
