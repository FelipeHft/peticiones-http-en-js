

const jokeUrl       = 'https://api.chucknorris.io/jokes/random';
const usuariosUrl   = 'https://reqres.in/api/users?page=2';

//cloudinary
const cloudPreset   = 'rcdzc7mq';
const cloudUrl      = 'https://api.cloudinary.com/v1_1/dbwjeqmpf/upload';

// fetch(jokeUrl).then(resp => {

//     resp.json().then( ({id, value}) => {
//         console.log(id);
//         console.log(value);
//     })

// });

// fetch(jokeUrl)
//     .then(resp => resp.json())
//     .then( ({id, value}) => {
//         console.log(id, value)
// });

const obtenerChiste = async () => {

    try{
        const resp = await fetch(jokeUrl);
    
        if(!resp.ok) throw('No se pudo realizar la peticion');

        const {icon_url, id, value} = await resp.json();

        return {icon_url, id, value};

    }catch(err){
        throw err;
    }
}

const obtenerUsuarios = async () => {
    try {
        const resp = await fetch(usuariosUrl);
        const {data: usuarios} = await resp.json();
        return usuarios;
    } catch (error) {
        throw Error(error);
    }
}

//archivo :: file
const subirImagen = async (archivo) => {

    const formData = new FormData();
    formData.append('upload_preset', cloudPreset);
    formData.append('file', archivo);

    try {
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });

        if(resp.ok){
            const cloudResp = await resp.json();
            console.log(cloudResp);
            return cloudResp.secure_url;
        }else{
            throw await resp.json();
        }

    } catch (error) {
        throw Error(error);
    }

}

export{
    obtenerChiste,
    obtenerUsuarios,
    subirImagen
}