import React, { Component } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';
import './App.css';

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
        <header className="App-header">
          <div>
            {this.state.datas.map((dynamicComponent, i) => <Content
              key={i} componentData={dynamicComponent} />)}
          </div>
        </header>
      </div>
    );
  }
}

class Content extends Component {
  render() {
    return (
      <div className="card w-100">
        <h5 className="card-header">{this.props.componentData.subject}</h5>
        <div className="card-body">
          {/* <div className="card-text"></div> */}
          {/* <a href="#" className="btn btn-primary">{}</a> */}
        </div>
      </div>
    );
  }
}

export default App;
