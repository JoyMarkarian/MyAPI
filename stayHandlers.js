const database = require("./db");

const getStays = (req, res) => {
  database
    .query("select * from stay")
    .then(([stay]) => {
      res.json(stay);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getStayById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from stay where id = ?", [id])
    .then(([stay]) => {
      if (stay[0] != null) {
        res.json(stay[0]);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const postStay = (req, res) => {
  const { country, departureDate, returnDate, price } = req.body;

database
    .query(
      "INSERT INTO stay(country, departureDate, returnDate, price) VALUES (?, ?, ?)",
      [country, departureDate, returnDate, price]
    )
    .then(([result]) => {
      res.location(`/api/stay/${result.insertId}`).sendStatus(201);})
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the booking");
    });
  };

  const updateStay = (req, res) => {
    const id = parseInt(req.params.id);
    const { country, departureDate, returnDate, price } = req.body;
  
    database
      .query(
        "UPDATE stay set country = ?, departureDate = ?, returnDate = ?, price = ? where id = ?",
        [country, departureDate, returnDate, price, id]
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
        res.status(500).send("Error editing the stay");
      });
  };

  const deleteStay = (req, res) => {
    const id = parseInt(req.params.id);
  
    database
      .query("DELETE from stay where id = ?", [id])
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
  getStays,
  getStayById,
  postStay,
  updateStay,
  deleteStay,
};