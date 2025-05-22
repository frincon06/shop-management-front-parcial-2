function getUsers(){
    fetch('https://fakestoreapi.com/users'), {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
    }
    .then((result) =>{
        return result.json().then(
            data => {
                return {
                    status: result.status,
                    data: data
                }
            }
        )
    })
    .then((response) => {
        if(response.status === 200){
            document.getElementById('info').innerHTML = '<h3>Lista de Usuarios</h3>'
        }
        else{
            document.getElementById('info').innerHTML = '<h3>No se encontraron usuarios</h3>'
        }
    })
    
}

function getProducts(){
    document.getElementById('info').innerHTML = '<h3>Lista de Productos</h3>'
}


function logout(){
    localStorage.removeItem('token')
    location.href = '../index.html'

}