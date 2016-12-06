window.onload = function () {

    var A = [ [ 3, 5, 11 ], [ 3, 10, 6 ], [ 7, 81, 19 ] ];
	var B = [ [ 1, 9, 12 ], [ 42, 5, 6 ], [ 2, 8, 31 ] ];
    var C = [];

    document.getElementById('boton').onclick = function () {

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
    }

}
