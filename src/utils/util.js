export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

export const sum = (a, b) => a + b

export function formatStr(str){
  const ary = str.split('');
  return ary.reduce((prev, item) => {
    const temp = item * 1
    if(temp.toString() == 'NaN') {
      prev += item
      return prev
    }else{
      for(let i = temp-1; i >= 1; i--){
        prev += prev.length ? prev[prev.length - 1] : ''
      }
      return prev
    }
  }, '')
}

export class Test{}