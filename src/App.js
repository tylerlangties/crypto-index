import React, { Component } from 'react';
import './App.css';
import moment from 'moment';
import {Line} from 'react-chartjs-2';
import _ from 'lodash';
import Header from './components/Header';
import Footer from './components/Footer';

export default class App extends Component {

  state = {
    historicalData: null, 
    ethData: null,
    currency: 'USD',
    isLoading: 'false',
    error: null,
  }
  
  componentDidMount = async () => {
    const {currency} = this.state;
    this.setState({ isLoading: true });
    
    const api_call_bpi = await fetch(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}`)
    const data = await api_call_bpi.json();

    const api_call_eth = await fetch(`https://poloniex.com/public?command=returnChartData&currencyPair=USDT_ETH&start=1530316689&end=9999999999&period=14400`)
    const eth_data = await api_call_eth.json();
    
    // const new_eth_data = eth_data.map(({ date, high }) => {
    //   var newDate = moment.unix(date).format("YYYY/MM/DD");
    //   return {
    //       [newDate]: high
    //   }
    // }) 
    const new_eth_data = eth_data.reduce((map, { date, high }) => {
      var newDate = moment.unix(date).format("YYYY/MM/DD");
          map[newDate] = high;
          return map
    }, {});

    this.setState({
      historicalData: data,
      ethHistoricalData: new_eth_data,
      isLoading: false,
    })
  }
  formatEtheriumData () {

  }
  formatChartData () {
    const {bpi} = this.state.historicalData
    const ethData = this.state.ethHistoricalData

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
        {
          label: "Etherium",
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(85,20,192,0.4)',
          borderColor: 'rgba(85,20,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(85,20,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(85,20,192,1)',
          pointHoverBorderColor: 'rgba(220,20,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: _.values(ethData)
        },

      ]
    }
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return <p>Loading...</p>;
    }

      return (
      <div className="App">
      <Header />
        <div style={{marginTop: 10}}>
          <Line data={this.formatChartData()} height={100} />
        </div>
        <Footer />
      </div>
    );
  }
}


