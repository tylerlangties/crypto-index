import moment from "moment";

export const formatData = data => {
  return data.reduce((map, { date, high }) => {
    var newDate = moment.unix(date).format("YYYY/MM/DD");
    map[newDate] = Math.round(high * 100) / 100;
    return map;
  }, {});
};
