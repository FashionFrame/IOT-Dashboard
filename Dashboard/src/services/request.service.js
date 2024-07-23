/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import { saveService } from '../services/save.service.js'

function MakeRequest(request) {
  const login = saveService.ReturnLogin()
  let user = login.username
  let pass = login.password
  let encode = `${user}:${pass}`
  encode = `Basic ${btoa(encode)}`
  request=JSON.stringify(request)
  return fetch('http://localhost:1025/data',
    {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': encode,
        request,
      },
    })
    .then((response) => {
      if (response.status === 200)
        return response.json()
      else if (response.status === 404)
        return '[]'.json()
      else if (response.status === 400)
        throw 'Bad Request'
      else
        throw 'Something went wrong'
    })
    .then((resJson) => {
      let bit = []
      let res = []
      resJson.forEach(element => {
        bit.push(element.bit)
        res.push(element.result)
      });
      let chartData = {
        labels: bit,
        datasets: [
          {
            label: 'Enviro Indoor',
            backgroundColor: '#f87979',
            data: res
          }
        ]}
      //console.log(chartData)
      return chartData
    })
    .catch((error) => {
      console.log('Err', error)
      return Promise.reject(error)
    })
}

export const requestService = {
    MakeRequest
}

