    //Тсходный массив картинок
    var images = [
        "https://kde.link/test/0.png",
        "https://kde.link/test/1.png",
        "https://kde.link/test/2.png",
        "https://kde.link/test/3.png",
        "https://kde.link/test/4.png",
        "https://kde.link/test/5.png",
        "https://kde.link/test/6.png",
        "https://kde.link/test/7.png",
        "https://kde.link/test/8.png",
        "https://kde.link/test/9.png"
    ];
     //Берем исходные данные
    var source = new XMLHttpRequest();
    //приводим к строке и делаем все буквы маленькими, для простоты проверок в дальнейшем
    var request = "https://kde.link/test/get_field_size.php";
    source.open("GET", request, false);
    source.send();
    if (source.status != 200) {
            alert('Ошибка ' + gcn.status + ': ' + gcn.statusText);
          }else{
            var value = JSON.parse(source.responseText);
           
     var x = value.width;
     var y = value.height;
     }
        
     //карта картинок
     var map = [];
     map.length = (x*y);
     var j = 0;
     var i = 0;
     var timer = 0;
     var doneCol = 0;
        //заполняем массив последовальено по 2 элемента
        while(i<(x*y)){
            if (j<10){
                map[i] = j;
                map[i+1] = j;
                j++;
                i=i+2;
            }else{
                j = 0;
                map[i] = j;
                map[i+1] = j;
                j++;
                i=i+2;
            }
     }
      //мешаем массив
    function shuffle(arr) {
    return arr.sort(function() {return 0.5 - Math.random()});
      }
        shuffle(map);
        var i = 0;

        //выстраиваем таблицу
        for (col = 1; col<=x; col++){
            //формируем строку
            var currentColumn = document.createElement('tr');
            var table = document.querySelector('table');

            table.appendChild(currentColumn);
        
            for (row = 1; row<=y; row++){
                //формируем столбцы
                var currentRow = document.createElement('td');

                currentColumn.appendChild(currentRow);
                var image = document.createElement('img');
                var number = map[i];
                image.setAttribute('src',images[number]);
                image.setAttribute('class','image');
                image.setAttribute('dataimg',map[i]);
                currentRow.appendChild(image);
                i++;
        }

    }
        
        var setTimer = function(){
            timer++;
            timerBlock.innerHTML= "Timer:"+timer;
        }
  
  //timer
        
  var timerBlock = document.createElement('p');
  document.querySelector('body').appendChild(timerBlock);
  var interval = setInterval(setTimer,1000);
  var classname = document.getElementsByClassName("image");
        


function gameFunc() {
    
    this.setAttribute('class', "active");
    
    var active =  document.getElementsByClassName("active");
    
    if (active[2]!=undefined){
        var length = active.length;
                    for (var i = 0; i < length; i++) {
                        active[0].setAttribute('class', "image");
                    }
    }else{
    if ((active[0]!=undefined) && (active[1]!=undefined)){
        if (active[0].getAttribute('dataimg') == active[1].getAttribute('dataimg'))
            {
                
                setTimeout(function(){
                    var length = active.length;
                    for (var i = 0; i < length; i++) {
                        var parent = active[0].parentElement;
                        parent.setAttribute('class', "done");
                        active[0].setAttribute('class', "done");
                        doneCol++;
                        end();
                        
                }}, 300);
                
                
            }
        else{

            setTimeout(function(){
                var length = active.length;
                    for (var i = 0; i < length; i++) {
                        active[0].setAttribute('class', "image");
                    }

                }
            ,500);}
        } 
    }
}


function end(){
if (doneCol == map.length){
    var restart = confirm("Вы - Победитель! Результат - "+timer+"с. Еще раз?");
    if (restart == true){
        location.reload();
    }else{
        clearInterval(interval);
    }
}
}
        
for (var i = 0; i < classname.length; i++) {
    classname[i].addEventListener('click', gameFunc, false);
}
