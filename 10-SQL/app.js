// @ts-check
const express = require('express');
const path = require('path');
// const expressHbs = require('express-handlebars');
// Get routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const { get404 } = require('./controllers/404');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');

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
app.use(get404);

// Create relationships
Product.belongsTo(User, {
    constraints: true,
    onDelete: 'CASCADE'
});
// Technically not necessary, but for readability
User.hasMany(Product);

// Add tables to DB automatically -> dont use force on production, will drop tables if necessary
sequelize.sync({ force: false })
    .then(res => {
        console.log(res);

        // Check if a user already exists
        User.findByPk(1)
            .then(user => {
                if (!user) {
                    return User.create({
                        name: 'Dummy',
                        email: 'dummy@test.com'
                    })
                }
                return Promise.resolve(user);
            })
            .then(result => {
                // Start the server
                app.listen(port, () => {
                    console.log(`Server started on port port`);
                });
            })
            .catch(err => console.log(err));
    })
    .catch(err => console.log(err));