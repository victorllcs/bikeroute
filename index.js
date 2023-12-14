document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('.login-form');
    const cadastroForm = document.querySelector('.login-form');
    let usuarioExistente;


    // Login //
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const usuario = document.getElementById('usuario').value;
        const senha = document.getElementById('senha').value;

        fetch('https://bikeroute-json.bikeroute.repl.co/usuarios')
            .then(response => response.json())
            .then(usuarios => {
                usuarioExistente = usuarios.find(user => user.username === usuario && user.senha === senha);

                if (usuarioExistente) {
                    window.location.href = 'homepage.html';
                    localStorage.setItem('username', usuarioExistente.username);
                } else {
                    alert('Usuário ou senha incorretos. Tente novamente.');
                }
            })
            .catch(error => console.error('Erro ao fazer login:', error));
    });


    // Cadastro //
    cadastroForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const novoNome = document.getElementById('nome').value;
        const novoEmail = document.getElementById('email').value;
        const novoUsuario = document.getElementById('usuario').value;
        const novaSenha = document.getElementById('senha').value;

        const data = {
            nome: novoNome,
            email: novoEmail,
            username: novoUsuario,
            senha: novaSenha,
        };

        fetch('https://bikeroute-json.bikeroute.repl.co/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(responseData => {
                alert('Cadastro bem-sucedido!');
                window.location.href = 'homepage.html';
                localStorage.setItem('username', usuarioExistente.username);
            })
            .catch(error => {
                console.error('Erro ao cadastrar usuário:', error);
                alert('Erro ao cadastrar usuário. Tente novamente.');
            });
    });
});


// Comunidade //
fetch('https://bikeroute-json.bikeroute.repl.co/comunidade/')
    .then(response => response.json())
    .then(usuarios => {
        const lista = document.getElementById('preencher-comunidade');

        usuarios.forEach(usuario => {
            lista.innerHTML += `
            <div class="col-md-4 col-sm-6 col-12">
                <div class="card-com">
                <div>
                    <img src="https://bikeroute-json.bikeroute.repl.co/uploads/${usuario.fotos}" id="fotos-rotas" class="img-fluid">
                </div>
                <div>
                    <h5 style="margin-left: 13px;">@${usuario.username}</h5>
                    <div>
                        <img style="width: 37px; padding: 10px 0px 10px 15px;" src="https://bikeroute-json.bikeroute.repl.co/uploads/curtir.png">
                        <img style="width: 37px; padding: 10px 0px 10px 15px;" src="https://bikeroute-json.bikeroute.repl.co/uploads/favorito.png">
                        <img style="width: 37px; padding: 10px 0px 10px 15px;" src="https://bikeroute-json.bikeroute.repl.co/uploads/compartilhar.png">
                    </div>
                </div>
            </div>
`;
        });
    })
    .catch(error => console.error('Erro ao buscar dados do servidor JSON:', error));

fetch('https://bikeroute-json.bikeroute.repl.co/usuarios/')
    .then(response => response.json())
    .then(usuarios => {
        const lista = document.getElementById('preencher-usuarios');

        usuarios.forEach(usuario => {
            lista.innerHTML += `
            <div class="profile">
                <div class="profile-info">
                    <img class="perfil" src="https://bikeroute-json.bikeroute.repl.co/uploads/perfil.png">
                    <div>
                        <h2>${usuario.nome}</h2>
                        <span>@${usuario.username}</span>
                    </div>
                </div>
                <a href="#"><img src="https://bikeroute-json.bikeroute.repl.co/uploads/seguir.png" class="follow-button"></a>
            </div>
            `;
        });
    })
    .catch(error => console.error('Erro ao buscar dados do servidor JSON:', error));


// Rotas //
fetch('https://bikeroute-json.bikeroute.repl.co/rotas')
    .then(response => response.json())
    .then(rotas => {
        const listaRotas = document.getElementById('preencher-rotas');

        rotas.forEach(rota => {
            listaRotas.innerHTML += `
            <div class="col-md-3 col-sm-4 col-6">
                <div class="card-rotas">
                    <div id="map${rota.id}" class="map-container"></div>
                    <div style="margin: 0px 15px;">
                        <h4>${rota.nome}</h4>
                        <h6>@${rota.username}</h6>
                        <p>${rota.descricao}</p>
                    </div>
                </div>
            </div>
            
            <script>
                mapboxgl.accessToken = 'pk.eyJ1IjoiYnJ1bm9nc3Rhdm8iLCJhIjoiY2xwZzExZGVzMDQ4ZTJrcDlpNjhhZHFndCJ9.2K7_eS_i1m2nLs16bPgoaw';
                
                var map${rota.id} = new mapboxgl.Map({
                    container: 'map${rota.id}',
                    style: 'mapbox://styles/mapbox/streets-v11',
                    center: [${rota.partida}],
                    zoom: 8
                });

                map${rota.id}.addControl(new mapboxgl.NavigationControl());

                addRoute(map${rota.id}, [${rota.partida}], [${rota.chegada}]);

                function addRoute(map, start, end) {
                    var directionsRequest = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + start[1] + ',' + start[0] + ';' + end[1] + ',' + end[0] + '?steps=true&geometries=geojson&access_token=' + mapboxgl.accessToken;

                    fetch(directionsRequest)
                        .then(response => response.json())
                        .then(data => {
                            map.addLayer({
                                'id': 'route',
                                'type': 'line',
                                'source': {
                                    'type': 'geojson',
                                    'data': {
                                        'type': 'Feature',
                                        'properties': {},
                                        'geometry': data.routes[0].geometry
                                    }
                                },
                                'layout': {
                                    'line-join': 'round',
                                    'line-cap': 'round'
                                },
                                'paint': {
                                    'line-color': '#3887be',
                                    'line-width': 5
                                }
                            });
                        })
                        .catch(error => console.error('Erro ao obter direções:', error));
                }
            </script>
        `;
        });
    })
    .catch(error => console.error('Erro ao buscar rotas do servidor JSON:', error));