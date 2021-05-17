const config = {
    user:'sa',
    password:'dj;4y7cj06',
    server:'ryankuang.ddns.net',  
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
