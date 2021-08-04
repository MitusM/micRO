/**
 * Фильтруем размеры. Оставляем только те что меньше заданного 
 * @param {array} arr массив с размерами по ширине
 * @param {number} width ширина относительно которого фильтруем
 */
const minFilter = (arr, width) => {
  return arr.filter(w => w <= width)
}

const arrayToObject = (arr, name) => {
  return arr.reduce((obj, item) => {
    return (obj[item[name]] = item, obj)
  }, {})
}

/**
 * Динамическое исключение свойств.
 * Функция removeProperty берёт props как аргумент.Используя вычисление имен свойств prop может быть исключен динамически из объекта клона.
 * @param {object} prop 
 * @returns {object} клон объекта с исключенным свойством
 * @example const user = {id: 100, name: 'Howard Moon', password: 'query'}

 */
const removeProperty = prop => ({
  // eslint-disable-next-line no-unused-vars
  [prop]: _,
  ...rest
}) => rest

const util = {}

util.minFilter = minFilter
util.arrayToObject = arrayToObject
util.removeProperty = removeProperty

module.exports = util