
const getBackground = code => {
  let bg
  switch (code) {
    case '0': //晴
    case '1':
    case '2':
    case '3':
    case '38':
      bg = 'http://ww1.sinaimg.cn/large/005M7QYPly1fhg131jp03j30ku1dv3zv.jpg'
      break
    case  '5': //阴天
    case  '6':
    case  '7':
    case  '8':
      bg = 'http://ww1.sinaimg.cn/large/005M7QYPly1fhg13oovmvj30ku1dvabu.jpg'
      break
    case '4': //浓云
    case '9':
      bg = 'http://ww1.sinaimg.cn/large/005M7QYPly1fhg13oovmvj30ku1dvabu.jpg'
      break
    case '16': //闪电
    case '17':
    case '18':
    case '34':
    case '35':
    case '36':
      bg = 'http://ww1.sinaimg.cn/large/005M7QYPly1fhg13oovmvj30ku1dvabu.jpg'
      break
    case '23': //雪
    case '24':
    case '25':
    case '37':
      bg = 'http://ww1.sinaimg.cn/large/005M7QYPly1fhg150ry7dj30ku1dvn0t.jpg'
      break
    case '10': //雨
    case '11': 
    case '12': 
    case '13': 
    case '14': 
    case '15': 
      bg = 'http://ww1.sinaimg.cn/large/005M7QYPly1fhg150ry7dj30ku1dvn0t.jpg'
      break
    case '26':  //雾霾
    case '27':
    case '28':
    case '29':
    case '30':
    case '31':
      bg = 'http://ww1.sinaimg.cn/large/005M7QYPly1fhg16b52wwj30ku1dvjtp.jpg'
      break
    default: 
      bg = 'http://ww1.sinaimg.cn/large/005M7QYPly1fhg15ynb4tj30ku1dvgnc.jpg'
      break 
  }
  return bg
}

const formatTime = timeStr => {
   const time = new Date(timeStr).getTime(),
          now = Date.now(),
          timeDiff = now - time,
          min = 60 * 1000,
          hour = min * 60,
          day = hour * 24 

   let str 
   if(timeDiff < min) {
     str = '刚刚'
   } else if (timeDiff < hour) {
     str = parseInt(timeDiff / min) + '分钟前'
   } else if (timeDiff < day) {
     str = parseInt(timeDiff / hour) + '小时前'
   } else {
     str = parseInt(timeDiff / day ) + '天前'
   } 
    return str
}


const formatHour = timeStr => {
    const targetDate = new Date(timeStr),
          nowDate = new Date(),
          targetHour = targetDate.getHours(),
          nowHour = nowDate.getHours()
    let str 
    if(nowHour === targetHour) {
      str = '现在'
    } else {
      str = `${targetHour}点`
    }
    return str
}


module.exports = {
  getBackground,
  formatTime,
  formatHour
}

