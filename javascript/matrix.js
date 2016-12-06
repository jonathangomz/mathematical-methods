window.onload = function () {

    var A = [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ];
	var B = [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ];
    var C = [];

    document.getElementById('boton').onclick = function () {

        alert(A);

        for(var i=0; i<3; i++) {
            C[i] = [];
        }

    }

}
