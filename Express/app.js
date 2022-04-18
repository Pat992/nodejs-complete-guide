// @ts-check
const express = require('express');
const path = require('path');
// Get routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();
const port = process.env.PORT || 3000;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.use(express.urlencoded());
// Serve CSS with static
app.use(express.static(path.join(__dirname, 'public')));
// use Routes
app.use('/admin', adminRoutes.router);
app.use(shopRoutes);

// 404 router
app.use((req, res, next) => {
    res
        .status(404)
        .sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(port, () => {
    console.log(`Server started on port port`);
});