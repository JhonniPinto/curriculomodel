const usuarioToView = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.usuario = req.usuario
    }
    next()
}

const loginForm = (req, res) => res.render('login')

const loginProcess = (passport) => passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: false
})

const logout = (req, res) => {
    req.session.destroy()
    res.redirect('/')
}

module.exports = {
    usuarioToView,
    loginForm,
    loginProcess,
    logout
}