function contarVar(){
	var arrText = [];
	var arrVar = [];
	var texto = "1";
    var x = 0;
	texto = document.getElementById('proposicion').value;
    if(checkText(texto)){
        for (var i = 0; i < texto.length; i++){
		  var caracter = texto.charAt(i);
		  if(caracter != "(" && caracter != ")" && caracter != "v" && caracter != "!" && caracter != "^" && caracter != "+" && caracter != "*"){
              noReply(x, caracter, arrVar);
              x++;
		  }
		  arrText[i] = caracter;
	   }
	   var numVar = arrVar.length;

// -----------------Crea el html que hará¡ la tabla
	// Crea la tabla de las opciones-------------------------
	   var tag = "<tr>";
	   for(var i = 0; i < arrVar.length; i++){
		  tag += "<th>" + arrVar[i] + "</th>";
	   }
	   tag += "</tr>";

	   var arrayOp = new Array(numVar);
	   for (var i = 0; i < numVar; i++) {
           arrayOp[i] = [];
	   }
	   var numTotal = Math.pow(2, numVar);
	   for(var i=0; i < numTotal;i++){
           tag += "<tr>";
		  for(var o = numVar-1; o >= 0; o--){
              tag += "<td>";
                var numero = Math.trunc(i/Math.pow(2, o)%2);
                switch(numero){
                    case 1:
                        numero = true;
                        break;
                    case 0:
                        numero = false;
                        break;
                }
                arrayOp[o][i] = numero;
                tag += numero;
                tag += "</td>";
            }
            tag += "</tr>";
        }
        //asigna la tabla de opciones posibles*******************
        document.getElementById("table_options").style.display = 'inline';
        document.getElementById("table_options").innerHTML = tag;

    //************* hasta aquí termina el code que hace la tabla de las opciones
        //empieza el code que hace la tabla de las respuestas---------------------------------
        var posfijo = posFijo(texto);

        var text = "<tr><th><center>"+texto+"</center></th></tr>";

        var textHTML = resolver(posfijo, numTotal, arrayOp, text);

        // Agrega la tabla al html***********************************
        document.getElementById("table_proposicion").innerHTML = textHTML;
    }
}
// *********** Checa que no se repitan las variables en las tabla
// ***********        de opciones
function noReply(x, caracter, arrVar){
    var tempBol = true;
    for(var i =0 ; i < arrVar.length; i++){
        if(arrVar[i] == caracter){
                      tempBol = false;
        }
    }
    if(tempBol){
        arrVar[x] = caracter;
    }
}

// ***************** RESUELVE EL POSFIJO ***********************

function resolver(posfijo, numTotal, arrayOp, text){
    var signos = new Stack();
    var variables = new Stack();
    var respuestas = [];
    var arrPosition = [];
    var cont = 0;
    for(var fila = 0; fila < numTotal; fila++){
        var varA = null;
        var varB = null;
        var varSim = "";
        for(var i = 0; i < posfijo.length; i++){
            var columna = 0;
            var char = posfijo.charAt(i);
            if(char == 'v' || char == '*' || char == '+' || char == '^' || char == '!'){
                signos.add(char);
                if(variables.size() >= 2){
                    // CREA LAS VARIABLES A EVALUAR
                    varSim = signos.pop();
                    switch(varSim){
                        case '^':
                            varSim = '*';
                            break;
                        case 'v':
                            varSim = '+';
                            break;
                    }
                    // EVALÚA LAS VARIABLES
                    var answer = eval(varA+varSim+varB);
                    switch(answer){
                        case 0:
                            respuestas[fila] = 'false';
                            break;
                        default:
                            respuestas[fila] = 'true';
                            break;
                    }
                    variables.add(answer);
                }
            }else if(char != '(' || char != ')'){
                //variables.add(char);
                var position = char.charCodeAt(0) - 97;
                if(arrPosition[position] == null){
                    arrPosition[position] = cont;
                    cont++;
                }
                columna = arrPosition[position];
                if(varB == null){
                    varB = arrayOp[columna][fila];
                    variables.add(varB);
                }else{
                    varA = arrayOp[columna][fila];
                    variables.add(varA);
                }
            }
        }
    }
    //----------------------------- CREA EL HTML ------------
    for(var i = 0; i < fila; i++){
            text += "<tr>";
            var j = respuestas[i];
            text += "<td><center>"+j+"</center></td>";
            text += "</tr>";
        }
    return text;
}

// ***************** CREA EL POSFIJO ***************************

function posFijo(text){
    var pila = new Stack();
    var posFijo = "";
    for(var i = 0; i<text.length; i++){
        var y = text.charAt(i);
		if(y == '('){
             pila.add(y);
        }
        else if(y == 'v' || y == '*' || y == '+' || y == '^' || y == '!'){
            if(pila.size() > 0){
				var l = pila.pop();
				if(l == '('){
					pila.add(l);
					pila.add(y);
				}else{alert("Error 206: separe sus operaciones con paréntesis");}
			}
		}
        else if(y == ')'){

			if(pila.size() > 0){
				var l = pila.pop();
                posFijo += l;
				pila.pop();
			}
		}
		else{
            posFijo += y;
		}
	}
    //alert(posFijo);
    return posFijo;
}

// ***************** CHECA LOS PARENTESIS Y QUE LAS VARIABLES SEAN LETRAS **********************
function checkText(x){
    var regExp = /^[a-z]/i;
    for(var h = 0; h < x.length; h++){
        var char = x.charAt(h);
        if(!(char == '(' || char == '{' || char == '[' || char == 'v' || char == '*' || char == '+' || char == '^' || char == '!' || char == ')'|| char == '}'|| char == ']')){
            var bol = char.search(/[^a-zA-Z]+/);
            if(bol == 0){
                alert("Error 201: Solo puedes ingresar letras como variables");
                return false;
            }
        }
    }
    var pila = new Stack();
    for(var h = 0; h < x.length; h++){
			var y = x.charAt(h);
			if(h == 0 && !(y == '(' || y == '{' || y == '[')){alert("Error 202: Debe de colocar paréntesis de Inicio");return false;}
			else if(y == '(' || y == '{' || y == '['){
				pila.add(y);
			}
			else if(y == ')' || y == '}' || y == ']'){
				if(pila.size() > 0){
					var z = pila.getTopElement();
					if((z == '(' && y == ')') || (z == '{' && y == '}') || (z == '[' && y == ']')){
						pila.pop();
					}else{alert("Error 203: Debe de colocar del mismo tipo");return false;}
                }
				else{alert("Error 204: Debe de colocar paréntesis de Inicio");return false;}
			}
    }
    if(pila.size() > 0){alert("Error 205: Debe de colocar bien los paréntesis");return false;}
    else{
        //alert("Todo salió bien, felicidades");
        return true;
    }
}
// ***************** PILA **********************
function Stack() {
    var elements = [];


    this.add = add;
    this.pop = pop;
    this.getTopElement = getTopElement;
    this.hasElements = hasElements;
    this.removeAll = removeAll;
    this.size = size;

    function add(element) {
        elements.push(element);
    }

    function pop() {
        return elements.pop();
    }

    function getTopElement() {
        return elements[elements.length - 1];
    }

    function hasElements() {
        return elements.length > 0;
    }

    function removeAll() {
        elements = [];
    }

    function size() {
        return elements.length;
    }
}
