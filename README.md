# commandhandler
Very simple but very useful command handler. 

<h1>Installation</h1>

To install the node-module

``
npm install commandhandler.js
``

Code:
```js
let ch = new (require('commandhandler.js'))();
```

<h1>Methods</h1>

 - `.init(path, extension)`
 ```js 
//Gets all commands on specified path then initialize all files if file extension correct 
```
 - `.has(commandName)`
 ```js 
 //Checks if command exist. If Exist: returns command. If not Exits returns false
 ```
 - `.get()`
  ```js 
 // Returns all initialized files
 ```
 - `.files`
 ```js 
 // Returns all initialized files
 ```
 - `.path` 
 ```js 
 // Returns folder path
 ```
 
<h1>Example (with a <a href="https://discord.js.org/">Discord.js</a>) </h1>

``Main File:``

```js
let ch = new (require('commandhandler.js'))();

let Discord= require('discord.js');
let client = new Discord.Client();

let prefix = "+";

client.on('ready',()=>console.log('Bot Ready'));


client.on('message', (message) => {
   if(message.author.bot) return;
   if (!message.content.startsWith(prefix)) return;
   const args = message.content.slice().trim().split(/ +/g);
   let cmd = ch.has(args.shift().slice(prefix.length).toLowerCase());
   if (cmd) cmd(client, message, args);
});

client.login("YOUR BOT TOKEN");

ch.init(__dirname+'/commands/','.js');
```

``./commands/say.js``

```js
exports.run = (client,message,args) => {
    message.channel.send('['+message.author.tag+ ']: ' +args.join(' '));

}

exports.name= "say"; 
```


<h1>Example 2</h1>

 ``Main File:``

~~~ js
let ch = new (require('commandhandler.js'))();

ch.on('ready',()=>{

   console.log('Command handler are initialized');
   
     console.log('All Files: ',ch.files,'Running "log.js" ');
     ch.files.log('./log.txt', '['+Date.now()+'] Test Function Working!');
     
});


ch.init(__dirname+'/commands/','.js');
~~~

 ``./commands/log.js:``

~~~ js
let fs =require('fs');

exports.run = (path,data) => {

    fs.writeFileSync(path, data+'\n', { flag: 'a' });
    
    let file =fs.readFileSync(path).toString();
    
    if(!file) file= data;
    
    return file;
};

exports.name= "log";
~~~

Then look at the log.txt file:
~~~
[1634320812437] Test Function Working!
[1634320817816] Test Function Working!
[1634320819018] Test Function Working!
[1634320819813] Test Function Working!
~~~
It works
