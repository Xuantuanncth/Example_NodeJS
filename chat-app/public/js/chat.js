const socket = io()

socket.on('countUpdate', ()=>{
    console.log('The count has been update')
})