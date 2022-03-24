const arrayPersonagens = [];

function buscaPor(por, id) {    
    if (id === "" || id === '0') {
        $('#container-personagens').html("");
        return ""
    } else {
        if (por === "personagem") {
            return fetch(`https://rickandmortyapi.com/api/character/${id}`)
                   .then((req) => req.json())
                   .then(objeto => objeto)
                   .catch(err => console.log(err));
        } else if (por === "episode") {
            return fetch(`${id}`)
                   .then(data => data.json())
                   .then(data => data)
                   .catch(err => console.log(err))

        }
    }
}

async function montaCartões() {    
    const personagem = await buscaPor( "personagem" , $('#id-personagem').val() );
    if (personagem === "") {
        arrayPersonagens.length = 0;
        $('#adcionado').text(`O deck de personagens foi limpo`)
        return true;        
    }    
    personagem.episode['0'] = await buscaPor("episode", personagem.episode['0']);
    arrayPersonagens.push(personagem);    
    $('#container-personagens').html("");
    arrayPersonagens.forEach(element => {        
        $('#adcionado').text(`${element.name} adcionado ao deck`)
        $('#container-personagens').append(`
                                <div class="cartao-personagem">
                                    <img class="photo" src=${element.image} />
                                    <h3>${element.name}</h3>
                                    <span>${element.status} - ${element.species}</span>
                                    <span class="cartao-label">Last Known Location</span>
                                    <span>${element.location.name}</span>
                                    <span class="cartao-label">First seen in:</span>
                                    <span>${element.episode['0'].name}</span>
                                </div>                                   
                                `)
    });
}

$('#btn-go').on('click', montaCartões);