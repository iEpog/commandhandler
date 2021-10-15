const {EventEmitter} = require('events')
let fs = require('fs')
class Client extends EventEmitter {
    constructor(){

        super();
        this.files = {}
        this.path = null
        EventEmitter.call(this);
		this.setMaxListeners(0);

      }
      get()
      {
          return this.files
      }
      has(command){
        if(this.files[command]) return this.files[command]
        return false
        
        }
      init(path,extension){
          this.path = path
        let fC = 0
        fs.readdir(path, (err, allFiles) => {

            allFiles.forEach(file => {
                fC++
                if (!file.endsWith(extension)) return
                let cName = file.split(".")[0]
                let props = require(path + file)
                if (!props) {
                    if(fC == allFiles.length) this.emit('ready')
                    return 
                }
                let obj = {}
                let name = props.name
                this.files[name] = props.run
                if(fC == allFiles.length) this.emit('ready')
    
            })
      })
    }
}

module.exports = Client


/*let files = {}
let fs = require('fs')
const {EventEmitter} = require('events')

const b1337 = new EventEmitter()
const has = (command)=>{
if(files[command]) return files[command]
return false

}

module.exports.commands= {
    has: has,
    all: files,
}
exports.hand = b1337;
exports.initCommands = (hName,path,extension) => {
    let fC = 0
    fs.readdir(path, (err, allFiles) => {
        console.log(allFiles.length)
        allFiles.forEach(file => {
            fC++
            if (!file.endsWith(extension)) return
            let cName = file.split(".")[0]
            let props = require(path + file)
            if (!props.command) {
                if(fC == allFiles.length) b1337.emit('ready')
                console.log('asd')
                return 
            }
            let obj = {}
            let name = props.command.name

            files[hName] = {}
            files[hName].ts ={ run: props.run }
            if(fC == allFiles.length) b1337.emit('ready')

        })
    })

}*/