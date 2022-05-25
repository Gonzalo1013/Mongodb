//cliente socket
const socket = io()

//Recibo mensaje de saludo desde el back
socket.on('message_to_client', (data) => {
    console.log(data);
    //Respondo el saludo al back
    socket.emit('message_to_back', 'Hola BACK!!')
})

//Envio 
//recibo el array para luego pintar en el front por medio de la funcion render
socket.on('messages' , (data)=>{
    render(data)
})

const render = (data) =>{
    let html = data.map((x)=>{
        return `
            <p> <strong>${x.name}</strong>: ${x.msn}</p>
        `
    }).join(' ')
    document.querySelector('#caja').innerHTML = html
}

const addMsn = () => {
    let msnObj = {
        id: socket.id,
        name: document.querySelector('#name').value,
        msn: document.querySelector('#msn').value
    }
    socket.emit('text' , msnObj)
    document.getElementById('msn').value= ' ';
    return false
}