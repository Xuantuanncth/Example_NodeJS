console.log('This is code test')

fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})

fetch('http://localhost:3000/weather?address=DaNang').then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
        } else {
            console.log(data.location)
            console.log(data.temperature)
        }
    })
})

const watherform = document.querySelector('form')
watherform.addEventListener('',() =>{
    
})