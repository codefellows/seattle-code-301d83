import React from 'react';
import axios from 'axios';
import { withAuth0 } from "@auth0/auth0-react";

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  getBooks = async () => {
    // JSON Web Token = JWT (pronounced JOT)
    if (this.props.auth0.isAuthenticated) {
      // get token:
      const res = await this.props.auth0.getIdTokenClaims();


      // MUST use double underscores
      const jwt = res.__raw;
      // a console.log of the token // this is as far as you need to go for the lab. Get the jwt to log to the console.

      // as per axios docs, we can send an config object to make our call as well
      const config = {
        method: 'get',
        baseURL: process.env.REACT_APP_SERVER,
        url: '/books',
        headers: {"Authorization": `Bearer ${jwt}`}
      };
      const bookResults = await axios(config);    


      //  // the way we have been doing it:
      // let url = `${process.env.REACT_APP_SERVER}/books`;
      // const bookResults = await axios.get(url);
      console.log(bookResults.data);
    }
  }
  componentDidMount() {
    this.getBooks();
  }

  render() {
    // not working:
    // const { user } = withAuth0();
    //console.log(user);
    console.log(this.props.auth0.user);
    return (
      <h3>Content</h3>
    )
  }
}

export default withAuth0(Content);
