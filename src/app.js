const express = require("express");
const path = require("path");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Anas ",
  });
});

app.get("/about", (req, res) => {
  res.render("About", {
    title: "About",
    name: "Anas",
  });
});

app.get("/help", (req, res) => {
  res.render("Help", {
    message: "this is a message to you",
    title: "Help",
    name: "Anas",
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

app.listen(port, () => {
  console.log("server is up on port" + port);
});
