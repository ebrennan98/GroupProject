const express = require("express");
const app = express();
const PORT = 8080;
var router = express.Router();

// middleware
app.use(express.json()); // this tells express to parse json before the data hits the function that we're using

app.listen(PORT, () => console.log(`it's alive on http://localhost:${PORT}`)); // app.listen will start up the API on the server, on port 8080

app.get("/", (req, res) => {
  res.send("hello postman"); // this will be displayed when we are at http://localhost:8080/
});

app.post("/", (req, res) => {
  res.status(200).json({
    success: true,
    msg: req.body.msg,
  });
});

// adding an endpoint to the API, GET is the endpoint, http://localhost:8080/tshirt is the route
app.get("/tshirt", (req, res) => {
  // req(incoming data), res(outgoing data)
  res.status(200).send({
    tshirt: "👕",
    size: "large",
    //logo: `${logo}`,
  });
});

// adding a new route http://localhost:8080/tshirt/23 with some json data
app.get("/tshirt/23", (req, res) => {
  // req(incoming data), res(outgoing data)
  res.status(200).send({
    tshirt: "👚",
    size: "small",
    //logo: `${logo}`,
  });
});

// so far only able to get this to work in postman
// POST endpoint creates new data,  :id is a Dynamic URL Parameter
app.post("/tshirt/:id", (req, res) => {
  const { id } = req.params;
  const { logo } = req.body;

  // if there isn't a logo in the request body
  if (!logo) {
    res.status(418).send({ message: "We need a logo!" }); // 418 status response & an error message
  }

  // if there is a logo
  res.send({
    tshirt: `🎽 with your ${logo} and ID of ${id}`,
  });
});

/*
// from postman code snippets
var axios = require("axios");
var data = JSON.stringify({
  logo: "🔥",
});

var config = {
  method: "post",
  maxBodyLength: Infinity,
  url: "http://localhost:8080/tshirt/23",
  headers: {
    "Content-Type": "application/json",
  },
  data: data,
};
*/

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
