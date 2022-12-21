
/**
 * Seconds-toTime converts seconds passed from midnight into a "human friendly" time "HH:MM".
 * This is used to show departure times of the public transport. 
 * 
 * @param {number} seconds Seconds from midnight. 
 * @return {string} time clock time in HH:MM -format. 
 */

const secondsToTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  let minutes = (seconds % 3600) / 60;
  if (minutes < 10) {
      minutes = "0" + minutes.toString()
  }
  const time = hours.toString() + ':' + minutes.toString();
  return time
}

/**
 * Departure-times of the public transport must be converted into a human friendly time format.
 * 
 * @param {object} transportObj containing data about public transport.
 * @return {array} The same array with converted departure times. 
 */
const formatPublicTransport = (transportArr) => {
  let formattedPtData = transportArr.data.station.stoptimesWithoutPatterns
    for (let i = 0; i < formattedPtData.length; i++){
      formattedPtData[i].scheduledDeparture = secondsToTime(formattedPtData[i].scheduledDeparture);
    }
    return formattedPtData
}
/**
 * 
 * @param {object} news object containing news from newsAPI. String showing the publishing time coming from the API is ugly. 
 * It must be formatted if we want to use it.
 * @returns {object} formattedNews -object with formatted publish times. 
 */  

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
const formatNewsDate = (apiDate) => {
  let incomingDate = new Date(apiDate)
  // Adding two hours in seconds to the time for being in Finland. This is BBC and it's in the different time zone. 
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

const formatWeatherData = (rawData) => {
  let currentCond = {}
  let tomorrow = {}
  let location = rawData.address
  currentCond.temp = rawData.currentConditions.temp
  currentCond.icon = removeHyphens(rawData.currentConditions.icon)
  currentCond.description = rawData.currentConditions.conditions
  //The API gives a forecast with one decimal, but for the forecast, nearest full integer is enough.
  tomorrow.temp = Math.round(rawData.days[1].temp)
  tomorrow.icon = removeHyphens(rawData.days[1].icon)
  tomorrow.description = rawData.days[1].description
  return {location, currentCond, tomorrow}
}

/**
 * In weather data, this function removes hyphens (-) from the value of the icon property partly-cloudy-day --> partlycloudyday
 * so that it can be easier used with javaScript.
 * 
 * @param {string} data incoming data
 * @returns data that has hyphens removed (if it has some)
 */
const removeHyphens = (data) => {
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

  