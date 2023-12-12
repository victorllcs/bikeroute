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
.catch(error => console.error('Erro ao buscar álbuns do servidor JSON:', error));