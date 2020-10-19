const express = require('express');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const db = mysql.createConnection({
	 host : 'localhost',
	 user : 'root',
	 password : <your local system password>,
	 database : 'nodemysql'
});

db.connect((err) => {
	if(err){
		throw err;
	}
	console.log('MySql connected...')
})
const app = express();
app.get('/',(req,res)=>
{
	res.send('hello world');
});

//Data Base creation
app.get('/createdb',(req,res) => {
	let sql ='CREATE DATABASE nodemysql';
	db.query(sql,(err,result) => {
		if(err) throw err;
		console.log(result);
		res.send('DataBase created');
	});
});

//query to display every user_auth_types
app.get('/api/user_auth_types',verifyToken,(req,res) => {
	jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    }else{
	let sql = 'select * from `user_auth_types`';
	let query = db.query(sql,(err,results) => {
		if(err) throw err;

		console.log(results);
		res.send(results);
	});}
});
});

//query to display particular user_auth_type according to 'id'
app.get('/api/user_auth_types/:id',verifyToken,(req,res) => {
	jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    }
	else{
	var c = req.params.id;
	console.log(c);
	
	let query = db.query('select * from user_auth_types where id=?',[c],(err,results) => {
		if(err) throw err;

		console.log(results);
		res.send(results);
	});
	}
  });
});


//query to display every user_details
app.get('/api/user_details',verifyToken,(req,res) => {
	jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    }else{
	let sql = 'select * from `user_details`';
	let query = db.query(sql,(err,results) => {
		if(err) throw err;

		console.log(results);
		res.send(results);
	});}
});
});


app.post('/api/user/login', (req, res) => {
  // Mock user
  //Real user information generated from login page 
  const user = {
    user_id: 'abc',
    password: '12345'
  }

  jwt.sign({user}, 'secretkey', (err, token) => {
    res.json({
      token
    });
  });
});


//query to display particular user_details according to 'id'
app.get('/api/user_details/:id',verifyToken,(req,res) => {
	jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    }
	else{
	var c = req.params.id;
	console.log(c);
	
	let query = db.query('select * from user_details where id=?',[c],(err,results) => {
		if(err) throw err;

		console.log(results);
		res.send(results);
	});
	}
  });
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }

}

app.listen('3000',() => {
console.log('Server is running at port 3000');
});
