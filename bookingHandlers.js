const database = require("./db");

const getBookings = (req, res) => {
  database
    .query("select * from booking")
    .then(([booking]) => {
      res.json(booking);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getBookingById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from booking where id = ?", [id])
    .then(([booking]) => {
      if (booking[0] != null) {
        res.json(booking[0]);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const postBooking = (req, res) => {
  const { customers_id, stay_id, bookingDate } = req.body;

database
    .query(
      "INSERT INTO booking(customers_id, stay_id, bookingDate) VALUES (?, ?, ?)",
      [customers_id, stay_id, bookingDate]
    )
    .then(([result]) => {
      res.location(`/api/booking/${result.insertId}`).sendStatus(201);})
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the booking");
    });
  };

  const updateBooking = (req, res) => {
    const id = parseInt(req.params.id);
    const { customers_id, stay_id, bookingDate } = req.body;
  
    database
      .query(
        "UPDATE users set customers_id = ?, stay_id = ?, bookingDate = ?, where id = ?",
        [customers_id, stay_id, bookingDate, id]
      )
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.status(404).send("Not Found");
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error editing the booking");
      });
  };

  const deleteBooking = (req, res) => {
    const id = parseInt(req.params.id);
  
    database
      .query("DELETE from booking where id = ?", [id])
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.status(404).send("Not Found");
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error deleting the booking");
      });
  };

module.exports = {
  getBookings,
  getBookingById,
  postBooking,
  updateBooking,
  deleteBooking,
};