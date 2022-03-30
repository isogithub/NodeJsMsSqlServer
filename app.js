const sql = require("mssql");
const express = require("express");
const app = express();

const configForOtherPc = {
  server: "192.168.1.2",
  //port: 1433,
  user: "sa",
  password: "pass123",
  database: "Northwind",
  options: {
    enableArithAbort: true,
    trustServerCertificate: true, // change to true for local dev / self-signed certs
    encrypt: false, // for azure
  },
  connectionTimeout: 150000,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

// Body parser middleware
app.use(express.json());

app.get("/api/product-detail/:id", (req, res) => {
  sql
    .connect(configForOtherPc)
    .then((pool) => {
      return pool
        .request()
        .input("id", sql.Int, parseInt(req.params.id))
        .query("SELECT * FROM Products where ProductId = @id");
    })
    .then((result) => {
      res.status(200).json({
        result: result.recordset[0],
      });
      sql.close();
    })
    .catch((err) => {
      console.log(err.message);
      sql.close();
    });
});

app.get("/api/allproducts", (req, res) => {
  sql
    .connect(configForOtherPc)
    .then((pool) => {
      return pool.request().query("SELECT TOP 10 * FROM Products");
    })
    .then((result) => {
      res.status(200).json({
        results: result.recordset,
      });
      sql.close();
    })
    .catch((err) => {
      console.log(err.message);
      sql.close();
    });
});

app.use((req, res) => {
  res.status(404).json({
    result: "Sayfa bulunamadı",
  });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
