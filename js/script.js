let money = document.getElementById("money");
let display = document.getElementById("display");
let bill_acc = document.getElementById("bill_acc");
let displayInfo = document.getElementById("displayInfo");
let displayBalace = document.getElementById("displayBalance");
let progressBar = document.getElementsByClassName("progress-bar")[0];
let progress = 0;

function getCoffee(coffeeName,coffeePrice){
  if(+money.value>=coffeePrice){
    money.value = +money.value-coffeePrice;
    displayBalance.innerText = money.value;
    let audio = new Audio("audio/c-m2.mp3");
    audio.play();
    coffee_box.innerHTML += `<img src="img/cap2.png" style="width:200px; margin-top:200px; position:absolute;" onclick='this.style.display="none";'>`;
    let timerId = setInterval(()=>{
                  if (progress>110){
        clearInterval(timerId);
        progressBar.hidden = true;
        progressBar.style.width = 0+'%';
        displayInfo.innerHTML = `<i class="fas fa-coffee"></i> Кофе ${coffeeName} готов`;
        progress = 0;
      }
      else if(progress<40) displayInfo.innerHTML = `<i class="fas fa-hourglass-start"></i> Приготовление...`;
      else if(progress<80) displayInfo.innerHTML = `<i class="fas fa-hourglass-half"></i> Приготовление...`;
      else displayInfo.innerHTML = `<i class="fas fa-hourglass-end"></i> Приготовление...`;
        progressBar.hidden = false;
        progressBar.style.width = ++progress+'%';
    },70);
    
  }else{
    displayInfo.innerHTML = `<i class="far fa-sad-tear"></i> Недостаточно средств`;
  }
}

function getChange(num){
  let change_box_h = change_box.getBoundingClientRect().height-60;
  let change_box_w = change_box.getBoundingClientRect().width-60;
  let change = 0;
  let top = Math.random()*change_box_h;
  let left = Math.random()*change_box_w;
  if(num>=10) change = 10;
  else if(num>=5) change = 5;
  else if(num>=2) change = 2;
  else if(num>=1) change = 1;
  else{
    let audio = new Audio("audio/coins1.mp3");
    audio.play();
  }
  if(change>0){
    let img = document.createElement('img');
    img.src = `img/${change}rub.png`;
    img.style.top = top+'px';
    img.style.left = left+'px';
    img.onclick = function(){this.hidden=true;}
    //img.onclick = ()=>{img.hidden=true;} функция стрелка не работатет с this//
    change_box.append(img);
    getChange(num-change);
    money.value = +money.value-change;
    displayBalance.innerText = money.value;
    //displayBalance.innerText = money.value=0;//
    
  }
  
}

//Реализация перемещения купюр//
let banknotes = document.querySelectorAll("[src$='rub.jpg']");
let zIndex = 1;
for(let i=0; i<banknotes.length; i++){ 
  let banknote = banknotes[i]; 
  banknote.onmousedown = function(e){
    this.ondragstart = function(){return false;}
    this.style.position = 'absolute';
    this.style.zIndex = ++zIndex;
    this.style.transform = 'rotate(90deg)';
    moveAt(e);
    function moveAt(event){
      banknote.style.top = (event.clientY-banknote.offsetHeight/2)+'px';
      banknote.style.left = (event.clientX-banknote.offsetWidth/2)+'px';
    }
    document.addEventListener('mousemove',moveAt);
    this.onmouseup = function(){
      document.removeEventListener('mousemove',moveAt);
      let bill_acc_left = bill_acc.getBoundingClientRect().left;
      let bill_acc_top = bill_acc.getBoundingClientRect().top;
      let bill_acc_right = bill_acc.getBoundingClientRect().right;
      let bill_acc_bottom = bill_acc.getBoundingClientRect().bottom - (bill_acc.getBoundingClientRect().height*2/3);
      let banknote_left = banknote.getBoundingClientRect().left;
      let banknote_right = banknote.getBoundingClientRect().right;
      let banknote_top = banknote.getBoundingClientRect().top;
      if (bill_acc_left<banknote_left && bill_acc_top<banknote_top && bill_acc_right>banknote_right && banknote_top<bill_acc_bottom){
        money.value = (+money.value)+(+this.dataset.value);
        displayBalance.innerText = money.value;
        this.hidden = true;
        let audio = new Audio("audio/kupuropriemnik.mp3");
        audio.play();
      }
      this.style.zIndex = '1';
      this.style.transform = 'rotate(0deg)';
      
    }
  } 
} 