var nomeSelecionado=undefined
const Container=document.querySelector(".Container")
function ADDmicrofone(mics){
    for(let i of mics){
        console.log(i)
        let caixaMic = document.createElement("div")
        caixaMic.classList.add("Microfone")
        caixaMic.attributes.id = i.num 
        let imagem = document.createElement("img")
        imagem.src="images/1965468.svg"
        imagem.style.backgroundColor = i.cor
        imagem.style.borderRadius = "100px"
        let Nome = document.createElement("i")
        Nome.classList.add("nome")
        Nome.innerText = i.nome
        let Num = document.createElement("i")
        Num.innerText=i.num
        caixaMic.appendChild(imagem)
        caixaMic.appendChild(Nome)
        caixaMic.appendChild(Num)
        Container.querySelector(".Microfones").appendChild(caixaMic)
    }
}

function ADDnomes(Nomes){
    for(let i of Nomes){
        let div = document.createElement("div")
        let h = document.createElement("a")
        h.innerText = i
        div.appendChild(h)
        div.addEventListener("click",setNome)
        Container.querySelector(".Nomes").appendChild(div)
    }
}

function setNome(event){
    nomeSelecionado = event.target.querySelector('a').text
    const Micros = document.querySelectorAll(".Microfone")
    for(let i of Micros){
        i.addEventListener("click",setMicro)
    }
}

function setMicro(event){
    event.target.querySelector(".nome").innerText = nomeSelecionado
    const Micros = document.querySelectorAll(".Microfone")
    console.log(event.target.attributes.id)
    socket.emit("setMic",{"num":event.target.attributes.id,"nome":nomeSelecionado,"cor":event.target.querySelector('img').style.backgroundColor})
    nomeSelecionado = undefined
    for(let x of Micros){
        x.removeEventListener("click",setMicro,false)
    }
}

function UpdateMics(arg){
    console.log(Container.querySelector(".Microfones").innerHTML)
    Container.querySelector(".Microfones").innerHTML=""
    socket.emit("getMicrofones",undefined)
}

socket = io('http://45.166.246.136:3000')

socket.emit("getMicrofones",undefined)
socket.emit("getNomes",undefined)

socket.on('Newmic',ADDmicrofone)
socket.on('Nomes',ADDnomes)
socket.on('UpdateMics',UpdateMics)