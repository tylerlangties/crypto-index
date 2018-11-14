import React, { Component } from 'react';
import moment from 'moment';
import {Line} from 'react-chartjs-2';
import _ from 'lodash';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

export default class App extends Component {
  state = {
    historicalData: null, 
    eth_historicalData: null,
    ltc_historicalData: null,
    currency: 'USD',
    isLoading: 'false',
    error: null,
  }
  
  componentDidMount = async () => {
    const {currency} = this.state;
    this.setState({ isLoading: true });
    var ts = Math.round((new Date()).getTime() / 1000) - 2678400;
    console.log(ts)
    
    const api_call_bpi = await fetch(`http://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}`)
    const data = await api_call_bpi.json();

    const api_call_eth = await fetch(`https://poloniex.com/public?command=returnChartData&currencyPair=USDT_ETH&start=${ts}&end=9999999999&period=14400`)
    const eth_data = await api_call_eth.json();

    const api_call_ltc = await fetch(`https://poloniex.com/public?command=returnChartData&currencyPair=USDT_LTC&start=${ts}&end=9999999999&period=14400`)
    const ltc_data = await api_call_ltc.json();

    const new_ltc_data = ltc_data.reduce((map, { date, high }) => {
      var newDate = moment.unix(date).format("YYYY/MM/DD");
          map[newDate] = Math.round(high * 100) / 100;
          return map
    }, {});
    
    const new_eth_data = eth_data.reduce((map, { date, high }) => {
      var newDate = moment.unix(date).format("YYYY/MM/DD");
          map[newDate] = Math.round(high * 100) / 100;
          return map
    }, {});

    this.setState({
      historicalData: data,
      eth_historicalData: new_eth_data,
      ltc_historicalData: new_ltc_data,
      isLoading: false,
    })
  }

  formatChartData () {
    const {bpi} = this.state.historicalData
    const ethData = this.state.eth_historicalData
    const ltcData = this.state.ltc_historicalData
    console.log({bpi});

    return {
      labels:  _.map(_.keys(bpi), date => moment(date).format("ll")),
      datasets: [
        {
          label: "Bitcoin",
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(114, 155, 121, .4)',
          borderColor: 'rgba(114, 155, 121, 1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBackgroundColor: 'black',
          pointBorderWidth: 5,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(114, 155, 121, 1)',
          pointHoverBorderColor: 'rgba(114, 155, 121, 1)',
          pointBackgroundColor: 'black',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: _.values(bpi)
        },
        {
          label: "Etherium",
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(139, 133, 193, .4)',
          borderColor: 'rgba(85,20,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(85,20,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 5,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(85,20,192,1)',
          pointHoverBorderColor: 'rgba(131,111,255,0.4)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: _.values(ethData)
        },
        {
          label: "LiteCoin",
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(40,40,40, 0.4)',
          borderColor: 'rgba(0,0,0,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(0,0,0,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 5,
          pointHoverRadius: 5,
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: _.values(ltcData)
        },
      ]
    }
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return <div className="loading-land"><p>Loading...</p></div>;
    }
      return (
      <div className="App">
        <Header />
        <div>
          <div className="chart-container">
            <h3>USD:</h3>
            <Line data={this.formatChartData()} height={85} width={250}/>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}