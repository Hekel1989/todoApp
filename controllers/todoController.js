var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// 1.Connect to the database
mongoose.connect('mongodb://test:test@ds149855.mlab.com:49855/todo-database');


// 2.Create a schema - this is like a blueprint for our data
var todoSchema = new mongoose.Schema({
    item: String
});

// 3.Create a model(collection) for the database
var Todo = mongoose.model('Todo', todoSchema);


// 4.Test item to see if it gets added to the collection
// var itemOne = Todo({item: 'diosbrandellato'}).save(function(err){
//     if (err) throw err;
//     console.log('item saved');
// })


// var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some ass'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});


//CRUD

module.exports = function(app){

app.get('/todo', function(req, res){
    //Get data from mongodb and pass it to view
    //This goes and finds all the items in a collection ({}), and then a callback function(err, data)
    Todo.find({}, function(err, data){
        if (err) throw err;
        //Render the newly found data
        res.render('todo', {todos:data});
    });
    // res.render('todo', {todos:data});
});

app.post('/todo', urlencodedParser, function(req, res){
    //Get data from the view and add it to mongoDB
    //New var to store new items to Todo and save it to the DB with callback function
    var newTodo = Todo(req.body).save(function(err, data){
        if(err) throw err;
        //Pass updated data back to the view
        res.json(data);
    });
    // data.push(req.body);
    // res.json(data);
});
    
app.delete('/todo/:item', function(req, res){
    //Delete the requested item from MongoDB
    Todo.find({item: req.params.item}).remove(function(err,data){
        if (err) throw err;
        res.json(data);
    });
    // data = data.filter(function(todo){
    //     return todo.item.replace(/ /g, '-') !== req.params.item;
    // });
    // res.json(data);
});

};