const arrayPersonagens = [];

function buscaPor(id) {
    if (id === "" || id === '0') {
        $('#container-personagens').html("");
        return "";
    } else {
        return fetch(`https://rickandmortyapi.com/api/character/${id}`)
               .then((req) => req.json())
               .then(objeto => objeto.name)
               .catch(err => console.log(err));
    }
}

async function montaCartões() {
    const personagem = await buscaPor($('#id-personagem').val());
    if (personagem === "") {
        arrayPersonagens.length = 0;
        $('#adcionado').text(`O deck de personagens foi limpo`);
        return true;
    }
    arrayPersonagens.push(personagem);
    $('#adcionado').text(`${personagem} foi adcionado ao deck de personagens`);
    $('#container-personagens').html("");
    arrayPersonagens.forEach(nome => {
        fetch(`https://rickandmortyapi.com/api/character/?name=${nome}`)
        .then(data => data.json())
        .then(filtro => {
            for (key in filtro.results) {
                $('#container-personagens').append(`
                            <div class="cartao-personagem">
                                <img class="photo" src=${filtro.results[key].image} />
                                <h3>${filtro.results[key].name}</h3>
                                <span>${filtro.results[key].status} - ${filtro.results[key].species}</span>
                                <span class="cartao-label">Last Known Location</span>
                                <span>${filtro.results[key].location.name}</span>
                                <span class="cartao-label">First seen in:</span>
                                <span>${filtro.results[key].episode['0']}</span>
                            </div>
                            `)
            }
        })
        .catch(err => console.log(err));
    });
}

$('#btn-go').on('click', montaCartões);