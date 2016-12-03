function methods(clicked_id) {
    var valMin = document.getElementById('valMin').value;
    var valMax = document.getElementById('valMax').value;
    var partitions = document.getElementById('partitions').value;
    var ans;
    //change string to Number;
    valMin = Number(valMin);
    valMax = Number(valMax);
    partitions = Number(partitions);

    if(clicked_id == "simpson"){
        ans = simpson(valMin, valMax, partitions);
    }else if(clicked_id == "trapecios"){
        ans = trapezoidal(valMin, valMax, partitions);
    }

    doHTML(ans);
}
// ---------- TRAPECIOS

function trapezoidal(a, b, n) {
    var h = (b - a) / n;
    var suma = 0;
    var fx0 = funcion (a);
    var fxn = funcion (b);
    var xi, fi;

    for(var i = 1; i <= n - 1; i++){
        xi = a + h;
        fi = 2* funcion (xi);
        suma = suma+fi;
        a = xi;
    }

    var ans = (h / 2)*(fx0+fxn+suma);
    return ans;
}

// -------- SIMPSON

function simpson(a, b, n){
    var h = (b - a) / n;
    var suma = 0;
    var suma2 = 0;
    var fx0 = funcion (a);
    var fxn = funcion (b);
    var xi = 0;

    for(var i = 1; i <= n - 1; i++){
        xi = a + h;

        if(i % 2 == 0){
            suma += funcion (xi);
         }else{
            suma2 +=  funcion (xi);
         }
         a = xi;
    }

    suma *= 2;
    suma2 *= 4;

    var ans = (h / 3)*(fx0+fxn+suma+suma2);
    return ans;
}


function funcion(x){
    return 2 * x;
}

function doHTML(ans){
    alert("The answer is "+ans);
    document.getElementById("answer").style.display = 'inline';
    document.getElementById("answer").innerHTML = "The answer is: "+ans;
}
