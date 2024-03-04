document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    
    // Aqui você pode adicionar lógica para verificar a senha
    if (username === 'user' && password === 'user123') {
        // Redireciona para a página após o login bem-sucedido
        window.location.href = './pages/character.html';
    } else {
        alert('Usuário ou senha inválidos. Por favor, tente novamente.');
    }
});
