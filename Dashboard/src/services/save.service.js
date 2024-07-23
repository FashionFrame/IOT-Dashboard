function SaveRequest(request) {
  let savedRequests = localStorage.getItem('requestsIOT')

  savedRequests = JSON.parse(savedRequests)

  if (savedRequests == null) {
    savedRequests = {
      requests: [],
    }
  }
  savedRequests.requests.push(request)
  const index = savedRequests.requests.length - 1
  savedRequests = JSON.stringify(savedRequests)
  localStorage.setItem('requestsIOT', savedRequests)
  return (index)
}

function ClearRequests() {
  localStorage.removeItem('requestsIOT')
}

function ReturnRequests() {
  let savedRequests = JSON.parse(localStorage.getItem('requestsIOT'))
  if (savedRequests == null) {
    savedRequests = {
      requests: [],
    }
  }
  return (savedRequests)
}

function ReturnRequest(index) {
  const savedRequests = JSON.parse(localStorage.getItem('requestsIOT'))
  const indexedRequest = savedRequests.requests[index]
  return (indexedRequest)
}

function DeleteRequest(index) {
  let savedRequests = JSON.parse(localStorage.getItem('requestsIOT'))
  const newRequests = savedRequests.requests
  const removed = newRequests.splice(index, 1)
  savedRequests = JSON.stringify(savedRequests)
  localStorage.setItem('requestsIOT', savedRequests)
}

export function SaveLogin(user, pass) {
  let login = { username: user, password: pass }
  login = JSON.stringify(login)
  localStorage.setItem('loginIOT', login)
}

function ReturnLogin() {
  const login = JSON.parse(localStorage.getItem('loginIOT'))

  return login
}

export const saveService = {
  SaveRequest,
  ReturnRequests,
  DeleteRequest,
  SaveLogin,
  ReturnLogin,
  ClearRequests,
  ReturnRequest,
}
