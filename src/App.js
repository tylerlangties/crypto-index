import React, { Component } from "react";
import moment from "moment";
import { Line } from "react-chartjs-2";
import _ from "lodash";
import { api } from "./api";
import { formatData } from "./formatData";
import { datasets } from "./datasets";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";

export default class App extends Component {
  state = {
    btc_historicalData: null,
    eth_historicalData: null,
    ltc_historicalData: null,
    isLoading: "false",
    error: null
  };

  componentDidMount = async () => {
    this.setState({ isLoading: true });

    //Calculates next 30 days
    let ts = Math.round(new Date().getTime() / 1000) - 2678400;
    const BTC = "BTC";
    const ETH = "ETH";
    const LTC = "LTC";

    //Bitcoin call
    const api_call_btc = await fetch(api(BTC, ts));
    const new_btc_data = formatData(await api_call_btc.json());

    //Etherium call
    const api_call_eth = await fetch(api(ETH, ts));
    const new_eth_data = formatData(await api_call_eth.json());

    //Litecoin call
    const api_call_ltc = await fetch(api(LTC, ts));
    const new_ltc_data = formatData(await api_call_ltc.json());

    this.setState({
      eth_historicalData: new_eth_data,
      ltc_historicalData: new_ltc_data,
      btc_historicalData: new_btc_data,
      isLoading: false
    });
  };

  formatChartData() {
    const {
      btc_historicalData,
      eth_historicalData,
      ltc_historicalData
    } = this.state;

    return {
      labels: _.map(_.keys(btc_historicalData), date =>
        moment(date).format("ll")
      ),
      datasets: datasets(
        btc_historicalData,
        eth_historicalData,
        ltc_historicalData
      )
    };
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return (
        <div className="loading-land">
          <p>Loading...</p>
        </div>
      );
    }
    return (
      <div className="App">
        <Header />
        <div>
          <div className="chart-container">
            <h3>USD:</h3>
            <Line data={this.formatChartData()} height={85} width={250} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
