export default class DateFormatter {
  static relativeTimeFormat(date) {
    if (typeof date === 'string' || date instanceof String) {
      date = +(new Date(date))
    } 
    else if (date instanceof Date) {
      date = +date
    }
    else if (!Number.isInteger(date)) throw 'Invalid date format'

    const nowDate = +(new Date())
    const relativeTimeFormatter = new Intl
      .RelativeTimeFormat(undefined, { style: 'long', numeric: 'auto' })
    
    let timeDiff = Math.abs(Math.round((date - nowDate) / 1000))
    
    let timeUnit = 'second'
    if (timeDiff > 3600 * 24 * 365) {
      timeUnit = 'month'
      timeDiff = Math.round(timeDiff / (3600 * 24 * 30))
    } 
    else if (timeDiff > 3600 * 24) {
      timeUnit = 'day'
      timeDiff = Math.round(timeDiff / (3600 * 24))
    }
    else if (timeDiff > 3600) {
      timeUnit = 'hour'
      timeDiff = Math.round(timeDiff / 3600)
    }
    else if (timeDiff > 60) {
      timeUnit = 'minute'
      timeDiff = Math.round(timeDiff / 60)
    }

    return relativeTimeFormatter.format(-timeDiff, timeUnit)
  }
}