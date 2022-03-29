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
            filtro.results.forEach(filtro => {
                $('#container-personagens').append(`
                    <div class="cartao-personagem">
                        <img class="photo" src=${filtro.image} />
                        <h3>${filtro.name}</h3>
                        <span>${filtro.status} - ${filtro.species}</span>
                        <span class="cartao-label">Last Known Location</span>
                        <span>${filtro.location.name}</span>
                        <span class="cartao-label">First seen in:</span>
                        <span>${filtro.episode['0']}</span>
                    </div>
                `)
            })
        .catch(err => console.log(err));
        });
    })
}
$('#btn-go').on('click', montaCartões);