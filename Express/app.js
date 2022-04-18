// @ts-check
const express = require('express');
// Get routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();
const port = process.env.PORT || 3000;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.use(express.urlencoded());
// use Routes
app.use(adminRoutes);
app.use(shopRoutes);

app.listen(port, () => {
    console.log(`Server started on port port`);
});