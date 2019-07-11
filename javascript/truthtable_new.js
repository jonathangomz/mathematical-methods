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

        var numTotal = Math.pow(2, numVar);
        var dicByRows = new Array(numVar);
        
        [...Array(numTotal)].forEach(function(val, i){
            dicByRows[i] = {};
        });

        for(var i=0; i < numTotal; i++){
            tag += "<tr>";

            let posChar = 0;
            for(let o = numVar-1; o >= 0; o--){
                tag += "<td>";
                
                let varBoolean;

                let numero = Math.trunc(i/Math.pow(2, o)%2);
                switch(numero){
                    case 1:
                        varBoolean = true;
                        break;
                    case 0:
                        varBoolean = false;
                        break;
                }

                let varCharacter = arrVar[posChar];
                dicByRows[i][varCharacter] = varBoolean;
                posChar++;
                
                tag += varBoolean;
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

        var textHTML = resolver(posfijo, numTotal, dicByRows, text);

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

function resolver(posfijo, numTotal, dicByRows, text){
    var signos = new Stack();
    var variables = new Stack();
    var respuestas = [];

    for(var fila = 0; fila < numTotal; fila++){
        var varA = null;
        var varB = null;
        var varSim = "";
        for(var i = 0; i < posfijo.length;) {
            let char = posfijo.charAt(i);

            i++;

            if(char == 'v' || char == '*' || char == '+' || char == '^' || char == '!')
            {
                signos.add(char);
                if(variables.size() >= 2){
                    // CREA LAS VARIABLES A EVALUAR
                    varA = variables.pop();
                    varB = variables.pop();
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
                    let answer = !!eval(varA+varSim+varB);

                    if (i === posfijo.length)
                    {
                        respuestas[fila] = answer;
                    }
                    else
                    {
                        variables.add(answer);
                    }
                }
            }
            else
            {
                variables.add(dicByRows[fila][char]);
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
