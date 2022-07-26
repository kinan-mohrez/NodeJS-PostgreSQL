const dotenv = require('dotenv');
const express = require('express');
const app = express();
const port = 3000;
const { Pool } = require('pg');
var bodyParser = require('body-parser');
app.use(bodyParser.json());

const pool = new Pool({
	user: 'postgres',
	host: '127.0.0.1',
	database: 'DBNodePostgre',
	password: 'kinan',
	port: 5432,
});

//users

app.get('/users', (req, res) => {
	// res.send('To get all the users ');
	pool
		.query('SELECT * FROM users;')
		.then((data) => res.json(data))
		.catch((err) => res.send(err));
});
app.get('/users/:id', (req, res) => {
	// res.send('To get one user (with the id)');
	const { id } = req.params;
	pool
		.query('SELECT * FROM users WHERE id=$1;', [id])
		.then((data) => res.json(data))
		.catch((err) => res.send(err));
});
app.post('/users', (req, res) => {
	// res.send('To create a new user');
	const { first_name } = req.body;
	const { last_name } = req.body;
	const { age } = req.body;
	pool
		.query('INSERT INTO users (first_name,last_name,age) VALUES ($1,$2,$3) ;', [
			first_name,
			last_name,
			age,
		])
		.then((data) => res.status(201).json(data))
		.catch((err) => res.send(err));
});
app.put('/users/:id', (req, res) => {
	// res.send('To edit one user (with the id) ');
	const { id } = req.params;
	const { first_name } = req.body;
	const { last_name } = req.body;
	const { age } = req.body;

	pool
		.query(
			'UPDATE users SET first_name=$1, last_name=$2, age=$3 WHERE id=$4 ;',
			[first_name, last_name, age, id]
		)
		.then((data) => res.status(201).json(data))
		.catch((err) => res.send(err));
});
app.delete('/users/:id', (req, res) => {
	// res.send('To delete one user (with the id)');
	const { id } = req.params;
	pool
		.query('DELETE users WHERE id=$1 ;', [id])
		.then((data) => res.status(201).json(data))
		.catch((err) => res.send(err));
});

//orders
app.get('/orders', (req, res) => {
	// res.send('To get all the orders ');
	pool
		.query('SELECT * FROM orders;')
		.then((data) => res.json(data))
		.catch((err) => res.send(err));
});
app.get('/orders/:id', (req, res) => {
	// res.send('To get one order (with the id)');
	const { id } = req.params;
	pool
		.query('SELECT * FROM orders WHERE id=$1;', [id])
		.then((data) => res.json(data))
		.catch((err) => res.send(err));
});
app.post('/orders', (req, res) => {
	// res.send('To create a new order');
	const { price } = req.body;
	const { date } = req.body;
	const { user_id } = req.body;
	pool
		.query('INSERT INTO orders (price,date,user_id) VALUES ($1,$2,$3) ;', [
			price,
			date,
			user_id,
		])
		.then((data) => res.status(201).json(data))
		.catch((err) => res.send(err));
});
app.put('/orders/:id', (req, res) => {
	// res.send('To edit one order (with the id) ');
	const { id } = req.params;
	const { price } = req.body;
	const { date } = req.body;
	const { user_id } = req.body;

	pool
		.query('UPDATE orders SET price=$1, date=$2, user_id=$3 WHERE id=$4 ;', [
			price,
			date,
			user_id,
			id,
		])
		.then((data) => res.status(201).json(data))
		.catch((err) => res.send(err));
});
app.delete('/orders/:id', (req, res) => {
	// res.send('To delete one order (with the id)');
	const { id } = req.params;
	pool
		.query('DELETE orders WHERE id=$1 ;', [id])
		.then((data) => res.status(201).json(data))
		.catch((err) => res.send(err));
});

app.listen(port, () => {
	console.log(`app listening on port ${port}`);
});
