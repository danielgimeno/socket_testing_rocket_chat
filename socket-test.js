var server = "pre.medsbla.net"; // server name
// var serverPort = 3000; // port no
var request = require("request");
var DDP = require("ddp");
var login = require("ddp-login");

var options = {
  method: 'POST',
  url: 'https://pre.medsbla.net/api/v1/login',
  headers: {
    'cache-control': 'no-cache',
    'content-type': 'application/json'
  },
  body: {
    username: 'sergio',
    password: 'Asdf1234'
  },
  json: true
};

request(options, function(error, response, body) {
  if (error) throw new Error(error);
  process.env.METEOR_TOKEN = body.data.authToken;

  var ddpClient = new DDP({
    host: server,
    //port: serverPort,
    maintainCollections: true
  });

  ddpClient.connect(function(err) {
    if (err) throw err;

    login(ddpClient, {
      env: "METEOR_TOKEN",
      method: "token",
      retry: 5
    }, function(error, info) {

      if (error) {
        console.log("error");
        console.log(error);
      } else {
        console.log("aunthentication successful");
        // var deviceToken = "cHr7RjfpJFw:APA91bH3NF1tDt6LtD6I9L8QfLlfHlcA3aApfbzjsjMiYoIeHBIQXJa-xHr02xYwH4ODLmRPSDOW3Cs8vBisnK1_nWH2WIk_8ok5WwL3FeYthOxBWtBjbdcKPQdBYZva3fFXxqe1Ggdy"
        const data = [{

          name: 'allaudin', //this is full name
          email: 'a.dharmadhikar@medlabmg.com',

        }, {
          name: 'allaudin', //this is full name
          email: 'a.dharmadhikar123@medlabmg.com',

        }];
        const data2 = [{
          rid: "GENERAL",
          msg: "abcdefghijklmnñoprstuvwxyz"
        }];
        console.log(data);
        setTimeout(function() {
          // var customFields = {
          //   "avtar-url" : "test"
          // };
          //var members = [];
          ddpClient.call(
            'sendMessage', // name of method to test
            data2, // parameters
            function(err, result) { // callback
              if (err) {
                console.log("error");
                console.log(error);
              } else {
                console.log('called function, result: ')
                console.log(result);
                ddpClient.close();
              }
            },
            function() { // callback for updated documents if any
              console.log('updated');
              console.log(ddpClient.collections);
            }
          );
        }, 3000);
      }

    });
  });

  console.log(body);
});

//authToken for user by calling rocket chat api
// curl https://dev.medsbla.net/api/v1/login \
//      -d "username=myusername&password=mypassword"
// use any username and passowrd for calling the curl request and you'll get an authentication token paste that below
