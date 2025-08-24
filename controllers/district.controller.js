const db = require("../config/db.config");

const createdistrict = (req, res) => {
  const { name } = req.body;
  db.query(
    `INSERT INTO district (name) VALUES (?)`,
    [name],
    (error, results) => {
      if (error) {
        console.log(error);

        return res.status(500).json({
          message: "Error adding new district",
          error: "Internal Server Error",
        });
      }
      console.log(results);
      res.status(201).json({
        statusCode: 201,
        message: "New district added",
        id: results.insertId,
      });
    }
  );
};

const getdistrict = (req, res) => {
  const getQuery = `SELECT * FROM district`;
  db.query(getQuery, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error getting district",
        error: "Internal Server Error",
      });
    }

    if (!result.length) {
      return res.status(404).json({
        message: "district not found",
      });
    }

    res.status(200).json({
      statusCode: 200,
      message: "district s retrieved successfully",
      data: result,
    });
  });
};

const getOnedistrict = (req, res) => {
  const id = req.params.id;
  const getOneQuery = `SELECT * FROM district WHERE id = ?`;
  db.query(getOneQuery, [id], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error getting one district",
        error: "Internal Server Error",
      });
    }

    if (!result.length) {
      return res.status(404).json({
        message: "district not found",
      });
    }

    res.json({
      statusCode: 200,
      message: "a district retrieved successfully",
      data: result[0],
    });
  });
};

const updatedistrict = (req, res) => {
  const id = req.params.id;
  const { name } = req.body;

  const updateQuery = `UPDATE district SET name = ? WHERE id = ?`;

  db.query(updateQuery, [name, id], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error updating one district",
        error: "Internal Server Error",
      });
    }
    if (result.affectedRows == 0) {
      return res.status(404).json({ message: "district not found" });
    }

    res.json({ message: "a district updated successfully" });
  });
};

const deletedistrict = (req, res) => {
  const id = req.params.id;
  const deleteQuery = `DELETE FROM district where id = ?`;
  db.query(deleteQuery, [id], (error, result) => {
    if (error) {
      return res.status(500).json({
        message: "Error deleting one district",
        error: "Internal Server Error",
      });
    }

    if (result.affectedRows == 0) {
      return res.status(404).json({ message: "district not found" });
    }

    res.json({ message: "a district deleted successfully" });
  });
};

module.exports = {
  createdistrict,
  getdistrict,
  getOnedistrict,
  updatedistrict,
  deletedistrict,
};
