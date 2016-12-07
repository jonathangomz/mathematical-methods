window.onload = function () {
    var ans = [];
    var table1 = "";
    var cont = 0;

    document.getElementById('resolver-gauss').onclick = function () {
        var a = [[2.0,3.0,1.0],  [3.0,-2.0,-4.0], [5.0,-1.0,-1.0]];
        var b = [1.0, -3.0, 4.0];

        table1 += gauss(table1, a, b);
        addHTML();


        document.getElementById('answer1').innerHTML = table1;
    }

    function gauss(table1, a, b){

        for(var i = 0; i < a.length; i++){
            for(var k = 0; k < a.length; k++){
                if(k != i){
                    b[k] = b[k] - ((a[k][i]/a[i][i])*b[i]);
                    for(var j = i+1; j < a.length; j++){
                        a[k][j] = a[k][j] - ((a[k][i]/a[i][i])*a[i][j]);
                        table1 += showMartix(table1, a, b);
                    }
                    a[k][i] = 0;
                }
            }
        }

        for(var i= 0; i < b.length; i++){
            ans[i] = (b[i] / a[i][i]);
        }
        return table1;
    }

    function addHTML(){

        var text = " ";
        for(var i = 0; i < ans.length; i++){
            text += "<center>x<sup>"+i+"</sup> = "+ans[i]+"           </center>";
        }
        document.getElementById('answer').innerHTML = text;
        text = "";

    }

    function showMartix(table1, a, b){
        table1 += "<p>"+cont+"</p>"+'<table><tr><th colspan="3" style="text-align: center;">A</th></tr>';
        cont++;

        for(var i = 0; i < a.length; i++){
            table1 += "<tr>";
            for(var o = 0; o < a.length; o++){
                var j = a[i][o];
                table1 += "<td id='a'><center>"+j+"</center></td>";
            }
            var j = b[i];
            table1 += "<td id='b'><center>"+j+"</center></td>";
            table1 += "</tr></table>";
        }

        table1 += "<br>"
        return table1;
    }

}
