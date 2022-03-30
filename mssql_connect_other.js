const sql = require("mssql"); // tedious güncellendi

let getProduct = async (value) => {
  try {
    // make sure that any items are correctly URL encoded in the connection string
	// Uzak pc için
    await sql.connect("Server=192.168.1.2,1433;Database=Northwind;User Id=sa;Password=pass123;Encrypt=false;trustServerCertificate=true;");
	// Localhost için
	//await sql.connect("Server=localhost,1433;Database=Northwind;User Id=sa;Password=pass123;Encrypt=true;trustServerCertificate=true");
    const result = await sql.query`select * from Products where ProductId = ${value}`;
    console.log(result);
    sql.close();
  } catch (err) {
    console.log(err);
    sql.close();
  }
};

getProduct(2);
