$(document).ready(function () {
    //Trae todos los usuarios registrados
    getUsers();
});

function activaNuevo(){
    $("#useremail").focus();
}
activaNuevo();

function getUsers() {

    try {
        fetch("http://129.151.108.133:8080/api/user/all").then(function (res) {
            return res.json()
        }).then(function (usuarios) {
            console.log(usuarios)
            localStorage.setItem('Users', JSON.stringify(usuarios))
        })
    } catch (error) {
        console.log(error)
    }
}
async function ingresar(){
    const valueEmail = $("#useremail").val();
    const valuePassword = $("#password").val();
    try {
        const date = await fetch("http://129.151.108.133:8080/api/user/" + valueEmail);
        const dateJsonFormat =await date.json();
        console.log('response in Json format ', dateJsonFormat)
        const date_reponse = await fetch("http://129.151.108.133:8080/api/user/" +valueEmail +"/" +valuePassword,);
        const date_reponseJsonFormat = await date_reponse.json();
        console.log('response 2: ', date_reponseJsonFormat)
        
        //Validacion
        if(dateJsonFormat){

            console.log('El usuario si esta en nustra db')
            console.log(date_reponseJsonFormat.name)
            if(date_reponseJsonFormat.name !== "NO DEFINIDO"){
                alert("Bienvenido "+ date_reponseJsonFormat.name)
            }else{
                alert('El ususario '+ date_reponseJsonFormat.email+" si esta registrado, pero la contraseña es incorrecta.")
            }

        }else{ 
            alert("Correo o constraseña invalido, intentelo nuevamente")
        }

    } catch (error) {
        console.log(error)
    }

}

let email = document.getElementById('useremail')
let password = document.getElementById('password')

email.addEventListener('keyup', (e)=>{
    const valEmial = $("#useremail").val();
    const valPassword = $("#password").val();
    let getU = localStorage.getItem('Users')
    getU = JSON.parse(getU)
    for(let i=0; i<getU.length; i++){
        console.log(getU[i])
    }
    console.log(getU) 
})
