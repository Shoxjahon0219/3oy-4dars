const db = require("../config/db.config");

const createtool = (req, res) => {
  const { name, brand, description, tool_price } = req.body;
  db.query(
    `INSERT INTO tool (name, brand, description, tool_price) VALUES (?, ?, ?, ?)`,
    [name, brand, description, tool_price],
    (error, results) => {
      if (error) {
        console.log(error);

        return res.status(500).json({
          message: "Error adding new tool",
          error: "Internal Server Error",
        });
      }
      console.log(results);
      res.status(201).json({
        statusCode: 201,
        message: "New tool added",
        id: results.insertId,
      });
    }
  );
};

const gettool = (req, res) => {
  const getQuery = `SELECT * FROM tool`;
  db.query(getQuery, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error getting tool",
        error: "Internal Server Error",
      });
    }

    if (!result.length) {
      return res.status(404).json({
        message: "tool not found",
      });
    }

    res.status(200).json({
      statusCode: 200,
      message: "tool s retrieved successfully",
      data: result,
    });
  });
};

const getOnetool = (req, res) => {
  const id = req.params.id;
  const getOneQuery = `SELECT * FROM tool WHERE id = ?`;
  db.query(getOneQuery, [id], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error getting one tool",
        error: "Internal Server Error",
      });
    }

    if (!result.length) {
      return res.status(404).json({
        message: "tool not found",
      });
    }

    res.json({
      statusCode: 200,
      message: "a tool retrieved successfully",
      data: result[0],
    });
  });
};

const updatetool = (req, res) => {
  const id = req.params.id;
  const { name, brand, description, tool_price } = req.body;

  const updateQuery = `UPDATE tool SET name = ?, brand = ?, description = ?, tool_price = ? WHERE id = ?`;

  db.query(updateQuery, [name, brand, description, tool_price, id], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error updating one tool",
        error: "Internal Server Error",
      });
    }
    if (result.affectedRows == 0) {
      return res.status(404).json({ message: "tool not found" });
    }

    res.json({ message: "a tool updated successfully" });
  });
};

const deletetool = (req, res) => {
  const id = req.params.id;
  const deleteQuery = `DELETE FROM tool where id = ?`;
  db.query(deleteQuery, [id], (error, result) => {
    if (error) {
      return res.status(500).json({
        message: "Error deleting one tool",
        error: "Internal Server Error",
      });
    }

    if (result.affectedRows == 0) {
      return res.status(404).json({ message: "tool not found" });
    }

    res.json({ message: "a tool deleted successfully" });
  });
};

module.exports = {
  createtool,
  gettool,
  getOnetool,
  updatetool,
  deletetool,
};
