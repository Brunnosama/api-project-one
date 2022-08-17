app.post('/', function (req, res) {
    res.semd('Hello World 1.2');
});

app.post('/user', function (req, res) {

    console.log(req)

    res.semd('Hello World 1.2');
});

    //PUT

    //DELETE

    //PATH

//RESPONSE

const listener = app.listen(porta, function () {
    console.log("Node.js is listening on port " + listener.address().port);
});