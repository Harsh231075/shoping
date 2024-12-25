require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config');
const orderRoutes = require('./routes/orders');
const user = require('./routes/user');
const records = require('./routes/records');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors(
  {
    origin: process.env.FRONTEND_URL || "*"
  }
));

// Connect to MongoDB
connectDB();
app.use('/api/', user);
app.use('/api/orders', orderRoutes);
app.use('/api/record/', records);




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
