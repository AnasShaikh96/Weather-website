const express = require("express");
const path = require("path");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "some",
    name: "anas ",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "me",
    name: "anas",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "this is a message to you",
    title: "something",
    name: "name",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "address was not found",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error: "unable to provide geocode services",
        });
      } else {
        forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
            return console.log("unable to provide forecast services");
          } else {
            res.send({
              message: "yay code ran",
              latitude,
              longitude,
              location,
              forecast: forecastData,
            });
          }
        });
      }
    }
  );

  // res.send({
  //   forecast: "it is raining",
  //   location: req.query.address,
  //   message: "your address was found",
  // });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: {},
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "help page not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "page not found",
  });
});

app.listen(3000, () => {
  console.log("server is up on port 3000");
});
