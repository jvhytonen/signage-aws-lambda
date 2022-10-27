
export const secondsToTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    let minutes = (seconds % 3600) / 60;
    if (minutes < 10) {
        minutes = "0" + minutes.toString()
    }
    const time = hours.toString() + ':' + minutes.toString();
    return time
}

// For formatting public transport times.
export const formatPublicTransport = (transportArr) => {
    let formattedPtData = transportArr.data.station.stoptimesWithoutPatterns
      for (let i = 0; i < formattedPtData.length; i++){
        formattedPtData[i].scheduledDeparture = secondsToTime(formattedPtData[i].scheduledDeparture);
      }
      return formattedPtData
  }
  
  const formatNews = (news) => {
    const formattedNews = news.articles.map(o => ({ ...o, publishedAt: formatNewsDate(o.publishedAt) }))
    return formattedNews
  }

// This is used in formatNewsDate -function
export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/**
 * This function will format the date shown in the News-component.
 * 
 * @param {string} apiDate date coming from the API. 
 * @return {string} fullDate a string with only day, month, hours and minutes in clean order.
 */
 export const formatNewsDate = (apiDate) => {
    let incomingDate = new Date(apiDate)
    // Adding two hours in seconds to the time for being in Finland. 
    let localTime = new Date(incomingDate.getTime() + 7200)
    // The short name of the month in english from the array.
    let month = MONTHS[localTime.getMonth()]
    // We must add extra 0 to the time and days if they are under 10 because it looks better. 
    let day = localTime.getDate() < 10 ? "0" + localTime.getDate() : localTime.getDate() 
    let hours = localTime.getHours() < 10 ? "0"+ localTime.getHours() : localTime.getHours()
    let minutes = localTime.getMinutes() < 10 ? "0"+localTime.getMinutes() : localTime.getMinutes()
    let fullDate = month + ' ' + day + ' - ' + hours + ':' + minutes
    return fullDate
}

/**
 * This function picks the needed items from the object coming from weather API.
 * 
 * @param {object} rawData data coming from the API. 
 * @return {string, object, object} location: name of the city, currentCond: data from the current moment, tomorrow: forecast for tomorrow. 
 */

export const formatWeatherData = (rawData) => {
    let currentCond = {}
    let tomorrow = {}
    let location = rawData.address
    currentCond.temp = rawData.currentConditions.temp
    currentCond.icon = removeHyphens(rawData.currentConditions.icon)
    currentCond.description = rawData.currentConditions.conditions
    //The API gives a forecast with one decimal, but for the forecast, nearest full integer is enough.
    tomorrow.temp = Math.round(rawData.days[1].temp)
    //Icon images are saved in S3-bucket without hyphens, but there are some hyphens in the incoming data. 
    tomorrow.icon = removeHyphens(rawData.days[1].icon)
    tomorrow.description = rawData.days[1].description
    return {location, currentCond, tomorrow}
}

/**
 * This function removes hyphens (-) from the value of the icon property partly-cloudy-day --> partlycloudyday
 * so that it can be easier used with javaScript.
 * 
 * @param {string} data incoming data
 * @returns data that has hyphens removed (if it has some)
 */
 export const removeHyphens = (data) => {
    if (data.includes("-")) {
      data = data.split("-").join("")
    }
    return data
  }

  module.exports = {
    formatPublicTransport,
    formatNews,
    formatWeatherData
  }
  