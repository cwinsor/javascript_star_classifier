This is a star classifier web application.  Frontend node.js and Angular(?) with backend node/javascript/express and Postgres

Following https://mherman.org/blog/postgresql-and-nodejs/   

The procedure uses the "express generator" to lay out initial files
then proceeds to add postgres and make the CRUD methods

Note to access the postgres database set the following (windows-specific):
$env:PGUSER='postgres'
$env:PGHOST='localhost'
$env:PGPASSWORD='supersecretpassword'
$env:PGDATABASE='plasticc'
$env:PGPORT='3000'

To perform the equivalent of "curl" follow:
https://docs.microsoft.com/en-us/powershell/module/Microsoft.PowerShell.Utility/Invoke-RestMethod?view=powershell-5.1
