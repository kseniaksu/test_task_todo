import express  from 'express';
import bodyParser from 'body-parser';

const app = express();

let nextId = 1;

// Require minimongo
import minimongo from "minimongo"; 

var LocalDb = minimongo.MemoryDb;
 
// Create local db (in memory database with no backing)
var db = new LocalDb();
 
// Add a collection to the database
db.addCollection("todos");
 
var doc = { id: 0, title: "Write new tasks", completed: false };
 
// Always use upsert for both inserts and modifies
db.todos.upsert(doc, function() {
    
});

app.use(bodyParser.json());

app.get('/api/todos', (req, res) => {
	db.todos.find().fetch(function(result) {
       res.send(result);
    });   
});

app.post('/api/todos', (req, res) => {
    const todo = {
        id: nextId++,
        title: req.body.title,
        completed: false
    };
    db.todos.upsert(todo, function(doc) {
    	delete doc._id;
       res.send(doc);
    });
});

app.put('/api/todos/:id', (req, res) => {    
    db.todos.find({id: parseInt(req.params.id)}).fetch(function(todo) {
    	if (todo.length < 1) {
			return res.sendStatus(404);
		}
    	
    	todo = todo[0];	
    	todo.title = req.body.title || todo.title;
		db.todos.upsert(todo, function(doc) {
			delete doc._id;
       		res.send(doc);
    	});
    }, function(){res.sendStatus(404);});   
});

app.post('/api/todos/:id', (req, res) => {
	db.todos.find({id: parseInt(req.params.id)}).fetch(function(todo) {
		if (todo.length < 1) {
			return res.sendStatus(404);
		}
    	
    	todo = todo[0];	
    	todo.completed = !todo.completed;
		db.todos.upsert(todo, function(doc) {
			delete doc._id;
       		res.send(doc);
    	});
    }, function(){res.sendStatus(404);});  
});

app.delete('/api/todos/:id', (req, res) => {
	db.todos.find({id: parseInt(req.params.id)}).fetch(function(todo) {
		if (todo.length < 1) {
			return res.sendStatus(404);
		}
    	
    	todo = todo[0];
    	db.todos.remove(todo._id, function(){   	
    		res.sendStatus(204);   	
    	});
    }, function(){res.sendStatus(404);}); 
});


export default app;