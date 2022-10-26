type fetchDataType = (user:string) => object | string

const API = 'https://4r294n67b7.execute-api.eu-north-1.amazonaws.com/dev/flight-data'

export const fetchApiData: fetchDataType = async (user) => {
    const URL = API + '/' + user
    try {
        const response = await fetch(URL)
        const data = await response.json()     
        return data
    }
   catch(error) {
    console.log(error)   
    return null
   }
}
