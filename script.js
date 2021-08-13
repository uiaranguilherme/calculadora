onload = () => {
	//Numeros
	document.getElementById("btn-9").onclick = () => { digito(9) };
	document.getElementById("btn-8").onclick = () => { digito(8) };
	document.getElementById("btn-7").onclick = () => { digito(7) };
	document.getElementById("btn-6").onclick = () => { digito(6) };
	document.getElementById("btn-5").onclick = () => { digito(5) };
	document.getElementById("btn-4").onclick = () => { digito(4) };
	document.getElementById("btn-3").onclick = () => { digito(3) };
	document.getElementById("btn-2").onclick = () => { digito(2) };
	document.getElementById("btn-1").onclick = () => { digito(1) };
	document.getElementById("btn-0").onclick = () => { digito(0) };
	
	//Limpar
	document.getElementById("clear").onclick = () => { limpa() };
	document.getElementById("btn-clear").onclick = () => { limpaHist()}
	document.getElementById("revers").onclick = () => { revers() }
	
	
	//Virgula
	document.getElementById("virg").onclick = () => { virgula(",") };
	
	//Funções
	document.getElementById("soma").onclick = () => operador('+');
	document.getElementById("multiplicacao").onclick = () => operador('*');
	document.getElementById("divisao").onclick = () => operador('/');
	document.getElementById("subtracao").onclick = () => operador('-');
	document.getElementById("igualdade").onclick = () => calcula('=');
	
	//Display
	var hist = document.querySelector('.display--hist');
	
}
  
  
 
//Variavel para armazenar o valor, o operador e o estado da calculadora

let sValor = 0; //valor que será apresentado
let eNovoNumero = true; // indica que proximo numero sera novo;
let valorAnterior = 0; //valor acumulado para uma operação
let operacaoPendente = null; //operacao acumulada

//atualização do visor
const atualizarValor = () => {
	
	let [parteInteira, parteDecimal] = sValor.split(',');
	let v = '';
	c = 0;
	for (let i = parteInteira.length - 1; i >= 0; i--) {
		if (++c > 3) {
			v = '.' + v;
			c = 1;
		}
		v = parteInteira[i] + v;
	}
	v = v + (parteDecimal ? ',' + parteDecimal : '');
	document.querySelector('.display').innerHTML = v;
}


//tratamento do click no botão de digito
const digito = (n) => {
	if (eNovoNumero) {
		sValor = '' + n;
		eNovoNumero = false;
	} else sValor += n;
	atualizarValor();
}

//tratamento do click no botão de ponto decimal
const virgula = (p) => {
	if (eNovoNumero) {
		sValor = '0' + p;
		eNovoNumero = false;
	} else if (sValor.indexOf(',') == -1) sValor += p;
	atualizarValor();
}

//tratamento do botão allClear
const limpa = () => {
	eNovoNumero = true;
	valorAnterior = 0;
	operacaoPendente = null
	sValor = "0";
	atualizarValor()
	hist.innerHTML = "0"
}

//limpa o numero atual somente
const limpaHist = ()=>{
	eNovoNumero = true;
	sValor = "0";
	atualizarValor()
};

//botão de limpar digito por digito
const revers = () => {
	let i = sValor.length;
	let retri = () => {return sValor.slice(-1);}
	console.log(i)
	console.log(retri);
	
}

//converte o valor para um numero real
const valorAtual = () => {
	return parseFloat(sValor.replace(',', '.'));
};
//apaga valor atual
const clearParc = () => {
	console.log("aqui estou")
	atualizarValor();
}
//tratamento do click nos botoes de operadores:
const operador = (op) => {
	calcula();
	valorAnterior = valorAtual(); //aculmula o valor anterior
	
	operacaoPendente = op; //
	
	hist.innerHTML = valorAnterior + op; //historico de valores
	
	eNovoNumero = true;
	atualizarValor()
}

const calcula = () => {
	
	if (operacaoPendente != null) {
		let resultado = 0;
		switch (operacaoPendente) {
			case '+': resultado = valorAnterior + valorAtual();
				break;
			case '-': resultado = valorAnterior - valorAtual();
				break;
			case '*': resultado = valorAnterior * valorAtual();
				break;
			case '/': resultado = valorAnterior / valorAtual();
				break;
		}
		hist.innerHTML = valorAnterior + operacaoPendente + valorAtual();
		sValor = resultado.toString().replace('.', ',');
		
	}
	
	eNovoNumero = true;
	operacaoPendente = null;
	valorAnterior = 0;
	atualizarValor();
}
