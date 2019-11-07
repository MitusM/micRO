// var fn = require('funclib')

/** Конфиг */
const config = require('../config/config.json')

const Users = new(require('../service/userServices'))(config)

module.exports = (app) => {
  'use strict'
  // === === === === === === === === === === === ===
  // GET
  // === === === === === === === === === === === === 
  /** Страница html со списком пользователей */
  app.get("/users/", async (req, res) => {
      await Users.getUsers(req, res)
    // }
  })

  /** Профиль пользователя  */
  app.get("/users/id-:id?.html", async (req, res) => {
    await Users.getUsers(req, res)
  })

  /** Постраничная паганация */
  app.get("/users/:page?-:number?.html", async (req, res) => {
    await Users.getUsersList(req, res)
  })

  /** Получаем данныео пользователе */
  app.get('/users/info-:id', async (req, res) => {
    await Users.getUserId(req, res)
  })
  // === === === === === === === === === === === ===
  //  POST, PUT, DELETE
  // === === === === === === === === === === === ===
  /** Добовдение нового пользователя */
  app.post("/users/create", async (req, res) => {
    await Users.setUsersCreate(req, res)
  })

  /** Удаление пользователя */
  app.delete("/users/", async (req, res) => {
    await Users.delete(req, res)
  })

  /** Обновление данных пользователя */
  app.put("/users/", async (req, res) => {
    await Users.update(req, res)
  })
  return app
}