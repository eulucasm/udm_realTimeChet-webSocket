/* importando as configurações do servidor */
var app = require('./config/server');

/*parametrizar a porta de escuta */
var server = app.listen(80, function(){
	console.log('servidor online');
})

var io = require('socket.io').listen(server);

app.set('io', io);

/*criar a conexão por websocket */
io.on('connection', function(socket){
	console.log('usuario conectou');

	socket.on('disconnect', function(){
		console.log('usuario desconectou');
	});

	socket.on('msgParaServidor', function(data){
		socket.emit(
			'msgParacliente',
			{apelido : data.apelido, mensagem : data.mensagem}
		);//aqui a msg enviada aparecera para quem enviou

		socket.broadcast.emit(
			'msgParacliente',
			{apelido : data.apelido, mensagem : data.mensagem}
		);//aqui a msg enviada aparecera para os demais participantes do chat
	});
});
/* Basicamente, a função 'emit' faz um pedido parar executar alguma ação
e o 'on' fica ouvindo os pedidos de execução*/