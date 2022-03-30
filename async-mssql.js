const sql = require("mssql");

/*
const configForLocalhost = {
  server: "localhost",
  //port: 1433,
  user: "sa",
  password: "pass123",
  database: "Northwind",
  options: {
    enableArithAbort: true,
    trustServerCertificate: true, // change to true for local dev / self-signed certs
    //encrypt:true // for azure
  },
  connectionTimeout: 150000,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};
*/

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

sql.on("error", (err) => {
  console.log(err.message);
});

// Async Await ile veri alma örnekleri

// Async Await Example 1
async function getDbProductsAsync1() {
  try {
    //let pool = await sql.connect(configForLocalhost);
    let pool = await sql.connect(configForOtherPc);
    let result1 = await pool.request().query("SELECT TOP 3 * FROM Products");
    //console.log(result1);
    console.log(result1.recordset[0]);
    sql.close();
  } catch (error) {
    console.log(error.message);
    sql.close();
  }
}

//getDbProductsAsync1();

// Async Await Example 2
async function getDbProductsAsync2() {
  try {
    //let pool = await sql.connect(configForLocalhost);
    let pool = await sql.connect(configForOtherPc);
    let result2 = await pool
      .request()
      .input("id", sql.Int, 2)
      .query("SELECT * FROM Products where ProductId = @id");
    //console.log(result2);
    console.log(result2.recordset[0]);
    sql.close();
  } catch (error) {
    console.log(error.message);
    sql.close();
  }
}

//getDbProductsAsync2()

// Async Await Example 3
async function getDbProductsAsync3() {
  try {
    //let pool = await sql.connect(configForLocalhost);
    let pool = await sql.connect(configForOtherPc);
    let result3 = await pool
      .request()
      //.input("id", sql.Int, 2)
      .execute("sp_EnPahaliBesUrun");
    console.log(result3);
    sql.close();
  } catch (error) {
    console.log(error.message);
    sql.close();
  }
}

//getDbProductsAsync3();

// Async Await Example 4
async function getDbProductsAsync4() {
  try {
    //let pool = await sql.connect(configForLocalhost);
    let pool = await sql.connect(configForOtherPc);
    let result4 = await pool
      .request()
      .input("UnitsInStock", sql.Int, 3)
      .execute("sp_StoktakiXtenAzUrunler");
    console.log(result4);
    sql.close();
  } catch (error) {
    console.log(error.message);
    sql.close();
  }
}

//getDbProductsAsync4();

// Async Await Example 5
async function getDbProductsAsync5() {
  try {
    //let pool = await sql.connect(configForLocalhost);
    let pool = await sql.connect(configForOtherPc);
    let result5 = await pool
      .request()
      .input("X", sql.Int, 2)
      .input("Y", sql.Int, 5)
      .execute("sp_StoktakiXileYArasindakiUrunler");
    console.log(result5);
    sql.close();
  } catch (error) {
    console.log(error.message);
    sql.close();
  }
}
//getDbProductsAsync5();

// Promise ile veri alma örnekleri

// Promise Example 1
sql
  .connect(configForOtherPc)
  .then((pool) => {
    return pool
      .request()
      .input("id", sql.Int, 9)
      .query("SELECT * FROM Products where ProductId = @id");
  })
  .then((result) => {
    console.log(result.recordset[0]);
    sql.close();
  })
  .catch((err) => {
    console.log(err.message);
    sql.close();
  });

// Promise Example 2
sql
  .connect(configForOtherPc)
  .then((pool) => {
    return pool
      .request()
      .input("X", sql.Int, 2)
      .input("Y", sql.Int, 5)
      .execute("sp_StoktakiXileYArasindakiUrunler");
  })
  .then((result) => {
    console.log(result);
    sql.close();
  })
  .catch((err) => {
    console.log(err.message);
    sql.close();
  });

// Callback ile veri alma örnekleri

// Callback Example 1
sql.connect(configForOtherPc, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    new sql.Request()
      .input("id", sql.Int, 21)
      .query("SELECT * FROM Products where ProductId = @id", (err, result) => {
        if (err) {
          console.log(err.message);
          sql.close();
        } else {
          console.log(result);
          sql.close();
        }
      });
  }
});

// Callback Example 2
sql.connect(configForOtherPc, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    new sql.Request()
      .input("UnitsInStock", sql.Int, 15)
      .execute("sp_StoktakiXtenAzUrunler", (err, result) => {
        if (err) {
          console.log(err.message);
          sql.close();
        } else {
          console.log(result);
          sql.close();
        }
      });
  }
});
