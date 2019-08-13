import React, { Component } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      datas: [],
    }
    this.handleClick = this.handleClick.bind(this)
  }

  getStuff() {
    axios.get(`http://localhost:5000/api/getdetails`)
      .then(res => {
        this.setState({ datas: this.state.datas.concat(res.data) });
        for (var i = 0; i < this.state.datas.length; i++) {
          console.log(this.state.datas[i].subject)
          const $ = cheerio.load(this.state.datas[i].msgbody);
          $('li').each(function (i, e) {
            console.log($(this).text());
          })
        }
      })
      .catch(err => console.log(err))
  }

  handleClick() {
    console.log(this.state.datas);
  }

  componentDidMount() {
    this.getStuff();
    //console.log(this.state);
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.handleClick}>Click Me</button>
        <div>
          {this.state.datas.map((dynamicComponent, i) => <Content
            key={i} componentData={dynamicComponent} />)}
        </div>
      </div>
    );
  }
}

class Content extends Component {
  render() {
    return (
      <div className="card">
        <div>{this.props.componentData.subject}</div>
      </div>
    );
  }
}

export default App;
