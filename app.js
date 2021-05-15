/* importando as configurações do servidor */
var app = require('./config/server');

/*parametrizar a porta de escuta */
app.listen(80, function(){
	console.log('servidor online');
});