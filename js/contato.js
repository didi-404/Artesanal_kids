// função simples do formulário
document.getElementById('contatoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // pego os valores dos campos
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const mensagem = document.getElementById('mensagem').value;
    
    // verifico se está tudo preenchido
    if (!nome || !email || !telefone || !mensagem) {
        // mostro o alert de erro
        document.getElementById('alertErro').classList.remove('d-none');
        document.getElementById('alertSucesso').classList.add('d-none');
        return;
    }
    
    // envio o email com EmailJS
    emailjs.send('service_emexeff', 'template_iquuxht', {
        from_name: nome,
        from_email: email,
        phone: telefone,
        message: mensagem,
        to_email: 'contato@artesanalkids.com.br'
    })
    .then(function() {
        // deu certo, mostro sucesso
        document.getElementById('alertSucesso').classList.remove('d-none');
        document.getElementById('alertErro').classList.add('d-none');
        // limpo o formulário
        document.getElementById('contatoForm').reset();
    })
    .catch(function(error) {
        // deu erro
        console.log('Erro:', error);
        document.getElementById('alertErro').classList.remove('d-none');
        document.getElementById('alertSucesso').classList.add('d-none');
    });
});