import _ from "lodash";

export const datasets = (btc, eth, ltc) => {
  return [
    {
      label: "Bitcoin",
      fill: true,
      lineTension: 0.1,
      backgroundColor: "rgba(114, 155, 121, .4)",
      borderColor: "rgba(114, 155, 121, 1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderWidth: 5,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(114, 155, 121, 1)",
      pointHoverBorderColor: "rgba(114, 155, 121, 1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: _.values(btc)
    },
    {
      label: "Etherium",
      fill: true,
      lineTension: 0.1,
      backgroundColor: "rgba(139, 133, 193, .4)",
      borderColor: "rgba(85,20,192,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(85,20,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 5,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(85,20,192,1)",
      pointHoverBorderColor: "rgba(131,111,255,0.4)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: _.values(eth)
    },

    {
      label: "LiteCoin",
      fill: true,
      lineTension: 0.1,
      backgroundColor: "rgba(40,40,40, 0.4)",
      borderColor: "rgba(0,0,0,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(0,0,0,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 5,
      pointHoverRadius: 5,
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: _.values(ltc)
    }
  ];
};
