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
const customersHandlers = require("./customersHandlers");
const stayHandlers = require("./stayHandlers");

app.get("/api/booking", bookingHandlers.getBookings);
app.get("/api/booking/:id", bookingHandlers.getBookingById);

app.get("/api/customers", customersHandlers.getCustomers);
app.get("/api/customers/:id", customersHandlers.getCustomerById);

app.get("/api/stay", stayHandlers.getStays);
app.get("/api/stay/:id", stayHandlers.getStayById);

app.post("/api/booking", bookingHandlers.postBooking);
app.post("/api/customers", customersHandlers.postCustomer);
app.post("/api/stay", stayHandlers.postStay);

app.put("/api/booking/:id", bookingHandlers.updateBooking);
app.put("/api/customers/:id", customersHandlers.updateCustomer);
app.put("/api/stay/:id", stayHandlers.updateStay);

app.delete("/api/booking/:id", bookingHandlers.deleteBooking);
app.delete("/api/customers/:id", customersHandlers.deleteCustomer);
app.delete("/api/stay/:id", stayHandlers.deleteStay);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
