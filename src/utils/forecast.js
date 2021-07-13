const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.weatherapi.com/v1/forecast.json?key=dfcc4dae9fbf4332a11152309211007&q=" +
    latitude +
    "," +
    longitude;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to forecast services", undefined);
    } else if (body.error) {
      callback("unable to find location", undefined);
    } else {
      callback(
        undefined,
        "It is " +
          body.forecast["forecastday"][0]["day"]["avgtemp_c"] +
          " degrees in " +
          body.location.name +
          " .There is " +
          body.forecast["forecastday"][0]["day"]["daily_chance_of_rain"] +
          "% chance of rain, and " +
          body.forecast["forecastday"][0]["day"]["daily_chance_of_snow"] +
          "% chance of snow today."
      );
    }
  });
};

module.exports = forecast;
