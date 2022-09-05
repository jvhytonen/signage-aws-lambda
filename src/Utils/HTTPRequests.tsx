type fetchDataType = () => object | string

export const fetchApiData: fetchDataType = async () => {
    try {
        const response = await fetch('https://4r294n67b7.execute-api.eu-north-1.amazonaws.com/dev/flight-data')
        const data = await response.json()     
        return data
    }
   catch(error) {
    console.log(error)   
    return null
   }
}

/*
const response = await fetch('https://4r294n67b7.execute-api.eu-north-1.amazonaws.com/dev/flight-data')
const response = await fetch('http://localhost:3000/schedulesTEST.json')
*/