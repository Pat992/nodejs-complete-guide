// @ts-check
const express = require('express');
const path = require('path');
// const expressHbs = require('express-handlebars');
// Get routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const { get404 } = require('./controllers/404');
const db = require('./util/database');

const app = express();

db.execute('SELECT * FROM products').then(res => {
    console.log(res[0]);
}).catch(e => { console.log(e); });

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
app.use(get404);

app.listen(port, () => {
    console.log(`Server started on port port`);
});