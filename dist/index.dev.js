"use strict";

var express = require('express');

var cors = require('cors');

var app = express();
var PORT = 3001;
app.use(express.json(), cors());
app.use('/users', require('./routes/users'));
app.use('/products', require('./routes/products'));
app.use('/categories', require('./routes/categories'));
app.use('/orders', require('./routes/orders'));
app.use('/reviews', require('./routes/reviews'));
app.listen(PORT, function () {
  return console.log('Servidor levantado en el puerto ' + PORT);
});