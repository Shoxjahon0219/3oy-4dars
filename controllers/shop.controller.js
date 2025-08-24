const db = require("../config/db.config");

const createshop = (req, res) => {
  const { name, owner_id, phone_number, district_id, address, location } =
    req.body;
  db.query(
    `INSERT INTO shop (name, owner_id, phone_number, district_id, address, location ) VALUES (?,?,?,?,?,?)`,
    [name, owner_id, phone_number, district_id, address, location],
    (error, results) => {
      if (error) {
        console.log(error);

        return res.status(500).json({
          message: "Error adding new shop",
          error: "Internal Server Error",
        });
      }
      console.log(results);
      res.status(201).json({
        statusCode: 201,
        message: "New shop added",
        id: results.insertId,
      });
    }
  );
};

const getshop = (req, res) => {
  const getQuery = `SELECT * FROM shop`;
  db.query(getQuery, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error getting shop",
        error: "Internal Server Error",
      });
    }

    if (!result.length) {
      return res.status(404).json({
        message: "shop not found",
      });
    }

    res.status(200).json({
      statusCode: 200,
      message: "shop s retrieved successfully",
      data: result,
    });
  });
};

const getOneshop = (req, res) => {
  const id = req.params.id;
  const getOneQuery = `SELECT * FROM shop WHERE id = ?`;
  db.query(getOneQuery, [id], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error getting one shop",
        error: "Internal Server Error",
      });
    }

    if (!result.length) {
      return res.status(404).json({
        message: "shop not found",
      });
    }

    res.json({
      statusCode: 200,
      message: "a shop retrieved successfully",
      data: result[0],
    });
  });
};

const updateshop = (req, res) => {
  const id = req.params.id;
  const { name, owner_id, phone_number, district_id, address, location } =
    req.body;

  const updateQuery = `UPDATE shop SET name = ?, owner_id = ?, phone_number = ?, district_id = ?, address = ?, location = ? WHERE id = ?`;

  db.query(
    updateQuery,
    [name, owner_id, phone_number, district_id, address, location, id],
    (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          message: "Error updating one shop",
          error: "Internal Server Error",
        });
      }
      if (result.affectedRows == 0) {
        return res.status(404).json({ message: "shop not found" });
      }

      res.json({ message: "a shop updated successfully" });
    }
  );
};

const deleteshop = (req, res) => {
  const id = req.params.id;
  const deleteQuery = `DELETE FROM shop where id = ?`;
  db.query(deleteQuery, [id], (error, result) => {
    if (error) {
      return res.status(500).json({
        message: "Error deleting one shop",
        error: "Internal Server Error",
      });
    }

    if (result.affectedRows == 0) {
      return res.status(404).json({ message: "shop not found" });
    }

    res.json({ message: "a shop deleted successfully" });
  });
};

module.exports = {
  createshop,
  getshop,
  getOneshop,
  updateshop,
  deleteshop,
};
