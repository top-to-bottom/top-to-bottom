const isAuth = req => req.user && !!req.user.id
const isAdmin = req => req.user && req.user.isAdmin

const isAuthMW = (req, res, next) => {
  if (isAuth(req)) {
    return next()
  }
  const error = new Error("Don't forget to log in")
  error.status = 403
  next(error)
}

const isAdminMW = (req, res, next) => {
  if (isAdmin(req)) {
    return next()
  }
  const error = new Error('Unsificients autorization ask the Admin')
  error.status = 403
  next(error)
}

module.exports = {isAdminMW, isAuthMW}
