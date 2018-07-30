
## NODE APPLICATION FOR TESTING ROCKET.CHAT SOCKET STRESS


Run multiple clients in parallel using concurrently while sending messages in a loop


## Install concurrently

The tool is written in Node.js, but you can use it to run any commands.

npm install -g concurrently
or if you are using it from npm scripts:

npm install concurrently --save
Usage
Remember to surround separate commands with quotes:

concurrently "command1 arg" "command2 arg"

*******************
Configuration
*******************

**server**  
set the rocket chat serveer url  

**username**  
Set the username login  

**pswd**  
set the password  

*******************
Run one single client:
*******************

**node loop-socket-test.js [identifier_client]**

then executing

**node loop-socket-test.js 3**

It would produce in GENERAL room an output like this:

I'm sender number 3. This is my message number 1  
I'm sender number 3. This is my message number 2  
I'm sender number 3. This is my message number 3  
I'm sender number 3. This is my message number 4  
I'm sender number 3. This is my message number 5  
I'm sender number 3. This is my message number 6  
I'm sender number 3. This is my message number 7  
I'm sender number 3. This is my message number 8  
I'm sender number 3. This is my message number 9  

Up to the amount of 25 messages, feel free to update the MESSAGES_AMOUNT variable to change number of messages.

*******************
Run n clients:
*******************


After Concurrently installation you can launch Rocket Chat Socket test with

### concurrently  "node loop-socket-test.js 1" "node loop-socket-test.js 2"

And you will get an output like:

I'm sender number 2. This is my message number 1  
I'm sender number 1. This is my message number 1  
I'm sender number 2. This is my message number 2  
I'm sender number 1. This is my message number 2  
I'm sender number 2. This is my message number 3  
I'm sender number 1. This is my message number 3  
I'm sender number 2. This is my message number 4  
I'm sender number 1. This is my message number 4  
I'm sender number 2. This is my message number 5  
I'm sender number 1. This is my message number 5  
I'm sender number 2. This is my message number 6  
I'm sender number 1. This is my message number 6  
I'm sender number 2. This is my message number 7  
I'm sender number 1. This is my message number 7  
/../  
I'm sender number 1. This is my message number 25  
I'm sender number 2. This is my message number 25  
