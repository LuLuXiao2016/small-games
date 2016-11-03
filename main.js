var board = new Array();
var score=0;
$(document).ready(function () {

    init();
    generatenewNumber();
    generatenewNumber();
    updateView();
    $("button").click(function(){
        score=0;
        init();
        generatenewNumber();
        generatenewNumber();
        updateView();
    });

});



//初始化
function init(){
    var tr = $('tr');
    var td = $('td');
    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j]=0;
        }
    }
    updateView()
}

function changescore(score){
    $('#score').text(score)
}
//生成随机数字
function generatenewNumber() {
    if (!nospace(board)) {
        //生成随机位置
        var x = parseInt(Math.floor(Math.random() * 4));
        var y = parseInt(Math.floor(Math.random() * 4));
        if(board[x][y]===0) {
            var romNumber = Math.random() < 0.6 ? 2 : 4;
            var ocell = $('#cell-' + x + '-' + y);
            board[x][y] = romNumber;
            ocell.text(romNumber);
        }
    }

}
function nospace(board){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if(board[i][j]===0){
                return false
            }
        }
    }
   return true
}

function updateView(){
    //$('.cell').remove();
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            var ocell=$('#cell-'+i+'-'+j);
            ocell.text(board[i][j]);
            ocell.css('background-color',getocellbgcolor(board[i][j]));
            ocell.css('color',getocellcolor(board[i][j]))
        }
    }
}
function getocellbgcolor(number){
    switch(number){
        case 2:return "#eee4da"; break;
        case 4:return "#ede0c8"; break;
        case 8:return "#f2b179"; break;
        case 16:return "#f59563"; break;
        case 32:return "#f67c5f"; break;
        case 64:return "#ec6544"; break;
        case 128:return "#e44d29"; break;
        case 256:return "#edcf72"; break;
        case 512:return "#c8a145"; break;
        case 1024:return "#a8832b"; break;
        case 2048:return "#86aa9c"; break;
        case 4096:return "#a6c"; break;
        case 8192:return "#791e6f"; break;
    }
    return "aliceblue";
}
function getocellcolor(number){
    if(number<2){
        return "aliceblue"
    }else if (number<8 && number >=2){
        return "black"
    }else{
        return "white"
    }
}
$(document).keydown(function(event){
    switch (event.keyCode){
        case 37:
            event.preventDefault();
            moveLeft();
            break;
        case 38:
            event.preventDefault();
            moveUp();
            break;
        case 39:
            event.preventDefault();
            moveRight();
            break;
        case 40:
            event.preventDefault();
            moveDown();
            break;
    }
});
function moveUp(){
    setTimeout("generatenewNumber()",210);
    for(var j=0;j<4;j++){
        for(var i=1;i<4;i++){
            if(board[i][j]!=0){
                for(var k=0;k<i;k++){
                    if(board[k][j]===0&&noUpblock(i,j,k,board)){
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                    }else if(board[k][j]==board[i][j]&&noUpblock(i,j,k,board)){
                        board[k][j]+=board[i][j];
                        board[i][j]=0;
                        score+=board[k][j];
                        setTimeout("changescore(score)",200)
                    }
                }
            }

        }
    }
    setTimeout("updateView()",200);

}
function moveDown(){
    setTimeout("generatenewNumber()",210);
    for(var j=0;j<4;j++){
        for(var i=2;i>=0;i--){
            if(board[i][j]!=0){
                for(var k=3;k>i;k--){
                    if(board[k][j]==0&&noDownblock(i,j,k,board)){
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                    }else if(board[k][j]==board[i][j]&&noDownblock(i,j,k,board)){
                        board[k][j]+=board[i][j];
                        board[i][j]=0;
                        score+=board[k][j];
                        setTimeout("changescore(score)",200)
                    }
                }
            }

        }
    }
    setTimeout("updateView()",200);

}
function moveLeft(){
    setTimeout("generatenewNumber()",210);
    for(var i=0;i<4;i++){
        for(var j=1;j<4;j++){
            if(board[i][j]!=0){
                for(var k=0;k<j;k++){
                    if(board[i][k]===0&&noLeftblock(i,j,k,board)){
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }else if(board[i][k]===board[i][j]&&noLeftblock(i,j,k,board)){
                        board[i][k]+=board[i][j];
                        board[i][j]=0;
                        score+=board[i][k];
                        setTimeout("changescore(score)",200);
                        continue;
                    }
                }
            }

        }
    }
    setTimeout("updateView()",200);

}
function moveRight(){
    setTimeout("generatenewNumber()",210);
    for(var i=0;i<4;i++){
        for(var j=2;j>=0;j--){
            if(board[i][j]!=0){
                for(var k=3;k>j;k--){
                    if(board[i][k]===0&&noRightblock(i,j,k,board)){
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                    }else if(board[i][k]==board[i][j]&&noRightblock(i,j,k,board)){
                        board[i][k]+=board[i][j];
                        board[i][j]=0;
                        score+=board[i][k];
                        setTimeout("changescore(score)",200)
                    }
                }
            }

        }
    }
    setTimeout("updateView()",200);

}
function noUpblock(i,j,k,board){
    for(var m=k+1;m<i;m++){
        if(board[m][j]!=0){
            return false
        }
    }
    return true
}
function noDownblock(i,j,k,board){
    for(var m=k-1;m>i;m--){
        if(board[m][j]!=0){
            return false
        }
    }
    return true
}
function noLeftblock(i,j,k,board){
    for(var m=k+1;m<j;m++){
        if(board[i][m]!=0){
            return false
        }
    }
    return true
}
function noRightblock(i,j,k,board){
    for(var m=k-1;m>j;m--){
        if(board[i][m]!=0){
            return false
        }
    }
    return true
}








