const config = {
    user:'sa',
    password:'dj;4y7cj06',
    server:'DESKTOP-0H89BJT\\SQLEXPRESS_RYAN',  
    database:'PDT',
    port:1433,
    options: {
      cryptoCredentialsDetails: {
          minVersion: 'TLSv1',
      },
      enableArithAbort: true,
      encrypt: true
  }
}
module.exports = config;
