window.onload = function () {


    var C = [];

    document.getElementById('boton').onclick = function () {

        var A = [ [ document.getElementById("1-0-0").value, document.getElementById("1-0-1").value, document.getElementById("1-0-2").value ], [ document.getElementById("1-1-0").value, document.getElementById("1-1-1").value, document.getElementById("1-1-2").value ], [ document.getElementById("1-2-0").value, document.getElementById("1-2-1").value, document.getElementById("1-2-2").value ] ];
	    var B = [ [ document.getElementById("2-0-0").value, document.getElementById("2-0-1").value, document.getElementById("2-0-2").value ], [ document.getElementById("2-1-0").value, document.getElementById("2-1-1").value, document.getElementById("2-1-2").value ], [ document.getElementById("2-2-0").value, document.getElementById("2-2-1").value, document.getElementById("2-2-2").value ] ];
        multi(A, B);

        addHTML(C);
    }

    function multi (A, B) {
        var n = A.length;
        var n2 = B.length;
        var m2 = B[0].length;

        for(var i = 0; i < m2; i++) {
            C[i] = [];
            for(var o = 0; o < n; o++){
                C[i][o] = 0.0;
            }
        }

        if(n != n2){
            return null;
        }

        for(var i = 0; i < n; i++){
            for(var o = 0; o < m2; o++){
                for(var k = 0; k < n; k++){
                    C[i][o] += A[i][k] * B[k][o];
                }
            }
        }
    }

    function addHTML (C) {
        var text = "";
        for(var i = 0; i < C.length; i++){
            text += "<tr>";
            for(var o = 0; o < C[0].length; o++){
                text += "<td>"+C[i][o]+"</td>";
            }
            text += "</tr>";
        }
        document.getElementById('answer1').innerHTML = text;
        document.getElementById('res').style.display = 'block';
    }

}
