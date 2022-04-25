### Node JS ile Ms MsSql Server Bağlantısı Örneği

Bu örnekte node js ile mssql server üzerinde oluşturulmuş bir northwind veritabanında sorgu işlemleri gerçekleştirildi.

npm üzerinden yüklenen "mssql" paketi içerisinde bulunan tedious bağımlılığının versiyonu eski olduğu için, tedious tekrar npm den kuruldu.

Örnekte yer alan "stored procedure" ler için ilgili kodlar aşağıda verilmiştir.
>Ms SQL Stored Procedure 1

```SQL
use Northwind
go

create proc sp_EnPahaliBesUrun
as
begin
select top 5 * from Products order by UnitPrice desc
end

exec sp_EnPahaliBesUrun
```
>Ms SQL Stored Procedure 2

```SQL
use Northwind
go

create procedure sp_EnUcuzYediUrun as
set rowcount 7 -- top 7 gibi 
select * from Products order by UnitPrice asc

exec sp_EnUcuzYediUrun
```

>Ms SQL Stored Procedure 3

```SQL
use Northwind
go

create proc sp_StoktakiXtenAzUrunler @UnitsInStock int
as
begin
select * from Products where UnitsInStock <= @UnitsInStock order by UnitsInStock
end

exec sp_StoktakiXtenAzUrunler @UnitsInStock = 5
```

>Ms SQL Stored Procedure 4

```SQL
use Northwind
go

create proc sp_StoktakiXileYArasindakiUrunler @X int, @Y int
as
begin
select * from Products where UnitsInStock >= @X and UnitsInStock <= @Y order by UnitsInStock
end

exec sp_StoktakiXileYArasindakiUrunler @X = 1, @Y = 5
```

------------


