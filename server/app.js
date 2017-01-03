var express = require( 'express' );
var app = express();
var path = require( 'path' );
var bodyParser = require( 'body-parser' );
var urlEncodedParser = bodyParser.urlencoded( { extended: false } );
var port = process.env.PORT || 3003;
var pg = require ('pg');
var connectionString = 'postgres://localhost:5432/inventory';

// spin up server
app.listen( port, function(){
  console.log( 'server up on:', port );
}); // end spin up server

// base url
app.get( '/', function( req, res ){
  console.log( 'base url hit' );
  res.sendFile( path.resolve( 'views/index.html' ) );
}); // end home base

//--------add new objects to the inventory database---------//
app.post( '/addItem', urlEncodedParser, function( req, res ){
  console.log( 'addItem route hit:', req.body );
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log('error connecting to db');
    } else {
      // add the item from req.body to the table
      client.query('INSERT INTO items(name, color, size) VALUES($1, $2, $3)', [req.body.name, req.body.color, req.body.size]);
      done();
    }
  });//end pg.connect
}); // end addItem route

//------get data from database and store in an array---------//
app.get( '/getInventory', function( req, res ){
  console.log( 'getInventory route hit' );
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log('error getting info from db' + err);
    } else {
      var allTheStuff = [];
      var query = client.query('SELECT * FROM items');
      query.on('row', function(row){
        allTheStuff.push(row);
      }); //end query.on row
      query.on('end', function(){
        done();
        console.log('sending array back to client' + allTheStuff);
        res.send(allTheStuff);
      });//end query.on end
    }
  });//end pg.connect
}); // end getInventory route

  //------get all items in the table and return them to client-------//


// static folder
app.use( express.static( 'public' ) );
