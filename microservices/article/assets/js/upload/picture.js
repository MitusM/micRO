/* eslint-disable no-prototype-builtins */

const hash = (obj, int) => obj.hasOwnProperty(int)

/**
 * Создаём элемент picture
 * @param {Object} obj
 * @param {Object} obj.name имя файла
 * @param {Object} obj.size объём изображения
 * @param {Object} obj.width ширина изображения
 * @param {*} width ширина исходного изображения
 */
export const picture = (obj, width) => {
    'use strict'
    let pictureElem = '<picture>';
    console.log('arr', obj);

    let path = '/public/images/article/resize/'
    let name = obj[width].name
    let img2x = hash(obj, 2700) ? obj[2700].name : name
    let img768x = hash(obj, 768) ? obj[768].name : name
    let img960x = hash(obj, 960) ? obj[960].name : name
    let img1024x = hash(obj, 1024) ? obj[1024].name : name
    let img1280x = hash(obj, 1280) ? obj[1280].name : name
    let img2700x = hash(obj, 2700) ? obj[2700].name : name
    let img1536x = hash(obj, 1536) ? obj[1536].name : name

    //* > 480 (phone landscape & smaller)
    pictureElem += `<source srcset="${path + obj['480'].name} 1x, ${path + img960x} 2x" media="(max-width: 480px)">`;
    //* 4k
    pictureElem += `<source srcset="${path + img2x}" media="(min-width: 1920px)">`;
    //* FullHD 1080p (desktop)
    pictureElem += `<source srcset="${path + img1280x} 1x, ${path + img2700x} 2x" media="(min-width: 1024px)">`;
    //* 480 - 768 (tablett)
    pictureElem += `<source srcset="${path + img768x} 1x, ${path + img1536x} 2x" media="(min-width: 480px) and (max-width: 767px)">`
    //* 768 - 1024 (tablet landscape)
    pictureElem += `<source srcset="${path + img1024x} 1x, ${path + img1536x} 2x" media="(min-width: 768px) and (max-width: 1023px)">`
    // BUG:#8 Описание картинки в alt=""
    pictureElem += `<img src="${path + img1280x}" alt="" srcset="${img2x} 2x">`
    pictureElem += '</picture>'

    return pictureElem;
};