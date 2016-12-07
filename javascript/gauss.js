window.onload = function () {
    var ans = [];
    document.getElementById('resolver-gauss').onclick = function () {
        var a = [[2.0,3.0,1.0],  [3.0,-2.0,-4.0], [5.0,-1.0,-1.0]];
        var b = [1.0, -3.0, 4.0];

        gauss(a, b);
        addHTML();
        showMartix(a, b);
    }

    function gauss(a, b){

        for(var i = 0; i < a.length; i++){
            for(var k = 0; k < a.length; k++){
                if(k != i){
                    b[k] = b[k] - ((a[k][i]/a[i][i])*b[i]);
                    for(var j = i+1; j < a.length; j++){
                        a[k][j] = a[k][j] - ((a[k][i]/a[i][i])*a[i][j]);
                        addHTML();
                    }
                    a[k][i] = 0;
                }
            }
        }

        for(var i= 0; i < b.length; i++){
            ans[i] = (b[i] / a[i][i]);
        }

    }

    function addHTML(){

        var text = " ";
        for(var i = 0; i < ans.length; i++){
            text += "<center>x<sup>"+i+"</sup> = "+ans[i]+"           </center>";
        }
        document.getElementById('answer').innerHTML = text;
        text = "";

    }

    function showMartix(a, b){
        var table1 = "";
        var table2 = "";

        for(var i = 0; i < a.length; i++){
            for(var o = 0; o < a.length; o++){

            }
        }
        for(var i = 0; i < b.length; i++){
            table2 += "<tr>";
            var j = b[i];
            alert(j);
            table2 += "<td><center>"+j+"</center></td>";
            table2 += "</tr>";
        }

        document.getElementById('answer1').innerHTML = table2;
    }

}
