import React, { Component } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      datas: [],
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/api/getdetails`)
      .then(res => {
        this.setState({ datas: res.data });
        console.log(this.state.datas);
        for (var i = 2; i < this.state.datas[1].totalcount; i++) {
          console.log(this.state.datas[i].subject)
          const $ = cheerio.load(this.state.datas[i].msgbody);
          $('li').each(function (i, e) {
            console.log($(this).text());
          })
        }
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="App">
      </div>
    );
  }
}

export default App;
