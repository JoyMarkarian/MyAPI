const database = require("./db");

const getCustomers = (req, res) => {
  database
    .query("select * from customers")
    .then(([customers]) => {
      res.json(customers);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getCustomerById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from customers where id = ?", [id])
    .then(([customers]) => {
      if (customers[0] != null) {
        res.json(customers[0]);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const postCustomer = (req, res) => {
  const { firstname, lastname, mailAdress } = req.body;

database
    .query(
      "INSERT INTO customers(firstname, lastname, mailAdress) VALUES (?, ?, ?)",
      [firstname, lastname, mailAdress]
    )
    .then(([result]) => {
      res.location(`/api/customers/${result.insertId}`).sendStatus(201);})
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the customer");
    });
  };

  const updateCustomer = (req, res) => {
    const id = parseInt(req.params.id);
    const { firstname, lastname, mailAdress } = req.body;
  
    database
      .query(
        "UPDATE customers set firstname = ?, lastname = ?, mailAdress = ? where id = ?",
        [firstname, lastname, mailAdress, id]
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
        res.status(500).send("Error editing the user");
      });
  };

  const deleteCustomer = (req, res) => {
    const id = parseInt(req.params.id);
  
    database
      .query("DELETE from customers where id = ?", [id])
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.status(404).send("Not Found");
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error deleting the customer");
      });
  };

module.exports = {
  getCustomers,
  getCustomerById,
  postCustomer,
  updateCustomer,
  deleteCustomer,
};