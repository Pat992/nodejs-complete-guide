// @ts-check
const express = require('express');
const path = require('path');
// const expressHbs = require('express-handlebars');
// Get routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

// Set templating engine with view-engine -> if built-in in express
app.set('view-engine', 'ejs');

// Set views folder, if not in view-folder
app.set('views', 'views');

const port = process.env.PORT || 3000;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.use(express.urlencoded());
// Serve CSS staticly
app.use(express.static(path.join(__dirname, 'public')));
// use Routes
app.use('/admin', adminRoutes.router);
app.use(shopRoutes);

// 404 router
app.use((req, res, next) => {
    res
        .status(404)
        .render('404.ejs', { pageTitle: 'Page not found', path: '/not-found' });
});

app.listen(port, () => {
    console.log(`Server started on port port`);
});