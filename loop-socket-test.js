var server = "my-rocket-chat-server.com"; // server name
// var serverPort = 3000; // port no
var request = require("request");
var DDP = require("ddp");
var login = require("ddp-login");

var username = "myusername";
var pswd = "mypassword";

var options = {
  method: 'POST',
  url: 'https://' + server + '/api/v1/login',
  headers: {
    'cache-control': 'no-cache',
    'content-type': 'application/json'
  },
  body: {
    username: username,
    password: pswd
  },
  json: true
};
var escritor = process.argv[2];
var MESSAGES_AMOUNT = 25;

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

        var counter = 1;

        function testloop() {
          if (typeof escritor === 'undefined') {
            escritor = 0;
          }

          const data2 = [{
            //rid: "aXCSsqSqxFhXLsh6r",
            rid: "GENERAL",
            msg: "I'm sender number " + escritor + ". This is my message number " + counter
          }];
          ddpClient.call(
            'sendMessage', // name of method to test
            data2, // parameters
            function(err, result) { // callback
              if (err) {
                console.log("error");
                console.log(err);
              } else {
                console.log('called function, result: ')
                console.log(result);
                //                ddpClient.close();
              }
            },
            function() { // callback for updated documents if any
              console.log('updated');
              console.log(ddpClient.collections);
            }
          );
          if (counter < MESSAGES_AMOUNT) {
            counter++;
            console.log(counter);
            setTimeout(testloop, 1100);
          } else {
            ddpClient.close();
          }
        }
        testloop();
      }

    });
  });

  console.log(body);
});