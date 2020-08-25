//TODO: Расширить список правил, для автоматического форматирования текста
let textPattern =  [
  {
    start: '---',
    replacement: '<hr/>'
  },
  {
    start: '--',
    replacement: '—'
  },
  {
    start: '-',
    replacement: '—'
  },
  {
    start: '(c)',
    replacement: '©'
  },
  {
    start: '(с)',
    replacement: '©'
  },
  {
    start: '(tm)',
    replacement: '&trade;'
  },
  {
    start: '(тм)',
    replacement: '&trade;'
  },
  {
    start: '//brb',
    replacement: 'Be Right Back'
  },
  {
    start: '//heading',
    replacement: '<h1 style="color: blue">Heading here</h1> <h2>Author: Name here</h2> <p><em>Date: 01/01/2000</em></p> <hr />'
  },
  {
    start: '* ',
    cmd: 'InsertUnorderedList'
  },
  {
    start: '- ',
    cmd: 'InsertUnorderedList'
  },
  {
    start: '1. ',
    cmd: 'InsertOrderedList',
    value: {
      'list-style-type': 'decimal'
    }
  },
  {
    start: '1) ',
    cmd: 'InsertOrderedList',
    value: {
      'list-style-type': 'decimal'
    }
  },
  {
    start: 'a. ',
    cmd: 'InsertOrderedList',
    value: {
      'list-style-type': 'lower-alpha'
    }
  },
  {
    start: 'a) ',
    cmd: 'InsertOrderedList',
    value: {
      'list-style-type': 'lower-alpha'
    }
  },
  {
    start: 'i. ',
    cmd: 'InsertOrderedList',
    value: {
      'list-style-type': 'lower-roman'
    }
  },
  {
    start: 'i) ',
    cmd: 'InsertOrderedList',
    value: {
      'list-style-type': 'lower-roman'
    }
  }
]

export default textPattern