const db = require("../config/db.config");

const createshop_tool = (req, res) => {
  const { shop_id, tool_id, rent_price } =
    req.body;
  db.query(
    `INSERT INTO shop_tool (shop_id, tool_id, rent_price ) VALUES (?,?,?)`,
    [shop_id, tool_id, rent_price],
    (error, results) => {
      if (error) {
        console.log(error);

        return res.status(500).json({
          message: "Error adding new shop_tool",
          error: "Internal Server Error",
        });
      }
      console.log(results);
      res.status(201).json({
        statusCode: 201,
        message: "New shop_tool added",
        id: results.insertId,
      });
    }
  );
};

const getshop_tool = (req, res) => {
  const getQuery = `SELECT * FROM shop_tool`;
  db.query(getQuery, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error getting shop_tool",
        error: "Internal Server Error",
      });
    }

    if (!result.length) {
      return res.status(404).json({
        message: "shop_tool not found",
      });
    }

    res.status(200).json({
      statusCode: 200,
      message: "shop_tool s retrieved successfully",
      data: result,
    });
  });
};

const getOneshop_tool = (req, res) => {
  const id = req.params.id;
  const getOneQuery = `SELECT * FROM shop_tool WHERE id = ?`;
  db.query(getOneQuery, [id], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error getting one shop_tool",
        error: "Internal Server Error",
      });
    }

    if (!result.length) {
      return res.status(404).json({
        message: "shop_tool not found",
      });
    }

    res.json({
      statusCode: 200,
      message: "a shop_tool retrieved successfully",
      data: result[0],
    });
  });
};

const updateshop_tool = (req, res) => {
  const id = req.params.id;
  const { shop_id, tool_id, rent_price } =
    req.body;

  const updateQuery = `UPDATE shop_tool SET shop_id = ?, tool_id = ?, rent_price = ? WHERE id = ?`;

  db.query(
    updateQuery,
    [shop_id, tool_id, rent_price, id],
    (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          message: "Error updating one shop_tool",
          error: "Internal Server Error",
        });
      }
      if (result.affectedRows == 0) {
        return res.status(404).json({ message: "shop_tool not found" });
      }

      res.json({ message: "a shop_tool updated successfully" });
    }
  );
};

const deleteshop_tool = (req, res) => {
  const id = req.params.id;
  const deleteQuery = `DELETE FROM shop_tool where id = ?`;
  db.query(deleteQuery, [id], (error, result) => {
    if (error) {
      return res.status(500).json({
        message: "Error deleting one shop_tool",
        error: "Internal Server Error",
      });
    }

    if (result.affectedRows == 0) {
      return res.status(404).json({ message: "shop_tool not found" });
    }

    res.json({ message: "a shop_tool deleted successfully" });
  });
};

module.exports = {
  createshop_tool,
  getshop_tool,
  getOneshop_tool,
  updateshop_tool,
  deleteshop_tool,
};
