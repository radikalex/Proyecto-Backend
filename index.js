const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001

app.use(express.json(), cors())

app.use('/users', require('./routes/users'));
app.use('/products', require('./routes/products'));
app.use('/categories', require('./routes/categories'));
app.use('/orders', require('./routes/orders'));
app.use('/reviews', require('./routes/reviews'));

app.use(express.static('./product_images'))


app.listen(PORT, () => console.log('Servidor levantado en el puerto ' + PORT))
