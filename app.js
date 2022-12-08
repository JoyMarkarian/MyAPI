require("dotenv").config();

const express = require("express");

const app = express();
app.use(express.json());
const port = process.env.APP_PORT ?? 5001;

const welcome = (req, res) => {
  res.send("Welcome to my favourite travel");
};

app.get("/", welcome);


const bookingHandlers = require("./bookingHandlers");

app.post("/api/booking", bookingHandlers.postBooking);


app.put("/api/booking", bookingHandlers.updateBooking);
app.put("/api/booking/:id", bookingHandlers.updateBooking);


app.get("/api/booking", bookingHandlers.getBookings);
app.get("/api/booking/:id", bookingHandlers.getBookingById);


app.delete("/api/booking/:id", bookingHandlers.deleteBooking);


app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
