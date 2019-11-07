// TODO: Переименовать файл
const service = require('./serviceLayer')


let setAuthorization = async (sessionID, req, res) => {
  if (req.sessionID) {
    /** Запись в сесию об авторизованности пользователя */
    const auth = await service('auth', {
      server: {
        action: 'login',
        meta: {
          id: sessionID
        }
      }
    }, res.app)
    console.log(':::[ auth ]:::', auth)
    return auth
  }
}

let authorization = async (req, res) => {
  if (req.session.auth === true) {
    return true
  } else {
    // const redirect = await service('auth', {
    //   server: {
    //     action: 'redirect',
    //     meta: {
    //       csrf: req.session.csrfSecret,
    //       session: req.session
    //     }
    //   }
    // }, res.app)
    // return res.end(redirect.response)
    return false
  }
}

module.exports = {
  setAuthorization: setAuthorization,
  authorization: authorization
}