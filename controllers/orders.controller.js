const db = require("../config/db.config");

const createorders = (req, res) => {
  const { client_id, shop_tool_id, period } = req.body;
  let total_price = 0;

  db.query(
    "SELECT rent_price from shop_tool where id=?",
    [shop_tool_id],
    (error, result) => {
      if (error) {
        console.log(error);

        return res.status(500).json({
          message: "Error getting rent_price",
          error: "Internal Server Error",
        });
      }

      total_price += result[0].rent_price * period;
      
      db.query(
        `INSERT INTO orders (client_id, shop_tool_id, period, total_price) VALUES (?, ?, ?, ?)`,
        [client_id, shop_tool_id, period, total_price],
        (error, results) => {
          if (error) {
            console.log(error);

            return res.status(500).json({
              message: "Error adding new order",
              error: "Internal Server Error",
            });
          }
          console.log(results);
          res.status(201).json({
            statusCode: 201,
            message: "New order added",
            id: results.insertId,
          });
        }
      );
    }
  );
};

const getorders = (req, res) => {
  const getQuery = `SELECT * FROM orders`;
  db.query(getQuery, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error getting order",
        error: "Internal Server Error",
      });
    }

    if (!result.length) {
      return res.status(404).json({
        message: "order not found",
      });
    }

    res.status(200).json({
      statusCode: 200,
      message: "order retrieved successfully",
      data: result,
    });
  });
};

const getOneorders = (req, res) => {
  const id = req.params.id;
  const getOneQuery = `SELECT * FROM orders WHERE id = ?`;
  db.query(getOneQuery, [id], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error getting one order",
        error: "Internal Server Error",
      });
    }

    if (!result.length) {
      return res.status(404).json({
        message: "order not found",
      });
    }

    res.json({
      statusCode: 200,
      message: "a order retrieved successfully",
      data: result[0],
    });
  });
};

const updateorders = (req, res) => {
  const id = req.params.id;
  const { client_id, shop_tool_id, period } = req.body;

  const updateQuery = `UPDATE orders SET client_id = ?, shop_tool_id = ?, period = ? WHERE id = ?`;

  db.query(
    updateQuery,
    [client_id, shop_tool_id, period, id],
    (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          message: "Error updating one order",
          error: "Internal Server Error",
        });
      }
      if (result.affectedRows == 0) {
        return res.status(404).json({ message: "order not found" });
      }

      res.json({ message: "order updated successfully" });
    }
  );
};

const deleteorders = (req, res) => {
  const id = req.params.id;
  const deleteQuery = `DELETE FROM orders where id = ?`;
  db.query(deleteQuery, [id], (error, result) => {
    if (error) {
      return res.status(500).json({
        message: "Error deleting one order",
        error: "Internal Server Error",
      });
    }

    if (result.affectedRows == 0) {
      return res.status(404).json({ message: "order not found" });
    }

    res.json({ message: "order deleted successfully" });
  });
};

module.exports = {
  createorders,
  getorders,
  getOneorders,
  updateorders,
  deleteorders,
};
