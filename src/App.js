import React, { Component } from 'react';
import './App.css';
import moment from 'moment';
import _ from 'lodash';

export default class App extends Component {

  state = {
    historicalData: 'null', 
    currency: 'USD',
    isLoading: 'false',
    error: null,
}
  
  componentDidMount = async () => {
    const {currency} = this.state;
    this.setState({ isLoading: true });
    
    const api_call = await fetch(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}`)
    const data = await api_call.json();

    this.setState({
      historicalData: data,
      isLoading: false,
    })
  }

  formatChartData () {
    const {bpi} = this.state.historicalData

    return {
      labels: _.map(_.keys(bpi), date => moment(date).format("ll")),
    }
  }

  render() {
    const {historicalData, isLoading} = this.state;
    if (isLoading) {
      return <p>Loading...</p>;
    }

      return (
      <div className="App">
      <div>{console.log(historicalData)}</div>
      </div>
    );
  }
}


