const weatherForm = document.getElementById("form");
const search = document.getElementById("search");
const messageOne = document.getElementById("one");
const messageTwo = document.getElementById("two");

// messageOne.textContent = "from js";

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = "...loading";
  messageTwo.textContent = "";

  fetch("/weather?address=" + location).then((response) => {
    response.json().then(({ error, location, forecast }) => {
      if (error) {
        messageOne.textContent = error;
      } else {
        messageOne.textContent = location;
        messageTwo.textContent = forecast;
      }
    });
  });
});
