import React, { Component } from 'react';
import './App.css';
import moment from 'moment';
import {Line} from 'react-chartjs-2';
import _ from 'lodash';
import Header from './components/Header';
import Footer from './components/Footer';

export default class App extends Component {

  state = {
    ethData: null,
    historicalData: null, 
    currency: 'USD',
    isLoading: 'false',
    error: null,
  }
  
  componentDidMount = async () => {
    const {currency} = this.state;
    this.setState({ isLoading: true });
    
    const api_call_bpi = await fetch(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}`)
    const data = await api_call_bpi.json();

    const api_call_eth = await fetch (`https://poloniex.com/public?command=returnTradeHistory&currencyPair=USDT_ETH&start=1532822400&end=9999999999&period=14400`)
    const data_0 = await api_call_eth.json();
    
    this.setState({
      historicalData: data,
      ethData: data_0,
      isLoading: false,
    })
  }

  formatChartData () {
    const {bpi} = this.state.historicalData

    return {
      labels: _.map(_.keys(bpi), date => moment(date).format("ll")),
      datasets: [
        {
          label: "Bitcoin",
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: _.values(bpi)
        },

      ]
    }
  }

  render() {
    const {historicalData, isLoading, ethData} = this.state;
    if (isLoading) {
      return <p>Loading...</p>;
    }

      return (
      <div className="App">
      <Header />
      <div>{console.log(historicalData, ethData)}</div>
        <div style={{marginTop: 10}}>
          <Line data={this.formatChartData()} height={100} />
        </div>
        <Footer />
      </div>
    );
  }
}


