const get404 = (req, res, next) => {
    res
        .status(404)
        .render('404.ejs', { pageTitle: 'Page not found', path: '/not-found' });
}

module.exports = { get404 }