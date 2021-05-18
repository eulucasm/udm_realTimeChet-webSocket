/* importando as configurações do servidor */
var app = require('./config/server');

/*parametrizar a porta de escuta */
var server = app.listen(8080, function(){
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

		/*Eventos de dialogo*/
		socket.emit(
			'msgParacliente',
			{apelido: data.apelido, mensagem: data.mensagem}
		);//aqui a msg enviada aparecera para quem enviou

		socket.broadcast.emit(
			'msgParacliente',
			{apelido: data.apelido, mensagem: data.mensagem}
		);//aqui a msg enviada aparecera para os demais participantes do chat
		
		/* Relação de participantes*/
		if(parseInt(data.apelido_atualizado_nos_clientes) == 0){
			socket.emit(
				'participantesParaCliente',
				{apelido: data.apelido}
			);

			socket.broadcast.emit(
				'participantesParaCliente',
				{apelido: data.apelido}
			);
		}
	}); 
});
/* Basicamente, a função 'emit' faz um pedido parar executar alguma ação
e o 'on' fica ouvindo os pedidos de execução*/