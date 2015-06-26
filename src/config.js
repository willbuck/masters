const config = {
  'localhost': {
    authUrl: 'https://wb-spa-deconstruct.herokuapp.com/authenticate/',
    clientId: 'c19515e6140b9844ab8b'
  },

  'wb-spa-deconstruct.surge.sh': {
    authUrl: 'https://wb-spa-deconstruct-prod.herokuapp.com/authenticate/',
    clientId: '3ca012ecc21fc03c079c'
  }
}[window.location.hostname]

export default config
