const watherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne =document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

console.log('Client javascrpit loader')

const getWather = (location)=>{

    const url = 'http://localhost:3000/weather?address='+location
    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                console.log(data.error)
                messageOne.textContent = data.error
            } else {
                console.log(data.location)
                console.log(data.temperature)
                messageOne.textContent = data.location
                messageTwo.textContent = data.temperature
            }
        })
    })
}

watherform.addEventListener('submit',(e) =>{
    e.preventDefault()
    const location = search.value
    messageTwo.textContent = ''
    messageOne.textContent = 'Loading'
    getWather(location)
    
})