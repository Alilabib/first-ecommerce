let HomeController = {};


HomeController.home = (req, res, next) => {
    res.render('pages/index');
}



module.exports.HomeController = HomeController;