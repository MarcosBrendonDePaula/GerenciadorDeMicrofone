const express=require('express')
const path=require('path')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname,'public')))
app.set('views',path.join(__dirname,'public'))
app.engine('html',require('ejs').renderFile)
app.set('view engine','html')
app.use('/',(req,res)=>{
    res.render('index.html')
})
Microfones = []
Nomes = ["Marcos","Ze","Eric","Gislaine","Diego","Jose","Mateus"]
Microfones.push({"num":1,"cor":"green","nome":"None"})
Microfones.push({"num":2,"cor":"red","nome":"None"})
Microfones.push({"num":3,"cor":"yellow","nome":"None"})
Microfones.push({"num":4,"cor":"orange","nome":"None"})
Microfones.push({"num":5,"cor":"purple","nome":"None"})
Microfones.push({"num":6,"cor":"gray","nome":"None"})
Microfones.push({"num":7,"cor":"blue","nome":"None"})

io.on("connect",socket =>{
    socket.on('getMicrofones',data=>{
        socket.emit('Newmic',Microfones)
    })
    socket.on('getNomes',data=>{
        socket.emit("Nomes",Nomes)
    })

    socket.on('setMic',data=>{
        Microfones[data.num-1]={"num":data.num,"cor":data.cor,"nome":data.nome}
        socket.broadcast.emit("UpdateMics",undefined)
    })
})

server.listen(3000)