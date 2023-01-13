const TOKEN = "1858844290:AAG4xVcUFcD6nNnKqz1biKvcGrhwNCsOHMk";
const CHAT_ID = "-519873227";
const URI_API = 'https://api.telegram.org/bot' + TOKEN + '/sendMessage';


/* ================ DRAG & DROP ================*/

let elems = document.querySelectorAll('.elem');
let parent = document.querySelector('#parent');
let current;

let points = 0;

let dr_ans = [];


let usname = "";

let surname = "";
let group = "";
let emaill = "";





elems.forEach(function (elem) {
   elem.addEventListener('dragstart', function (event) {
      //console.log(this);
      //(elem.dataset.answerNum);
      dr_ans.push(elem.dataset.answerNum);
      current = this;
   });

});

parent.addEventListener('dragover', function (event) {
   event.preventDefault();
});

parent.addEventListener('drop', function (event) {
   this.appendChild(current);

});

let mes_result;

let b = false;

let divs = document.querySelectorAll('.testItem');

//метод для дій натискання кнопки check
let button = document.querySelector('#bt');
button.addEventListener('click', function (e) {
   usname += document.getElementsByTagName("input")[0].value;
   surname += document.getElementsByTagName("input")[1].value;
   emaill += document.getElementsByTagName("input")[2].value;

   let select = document.getElementById("group");
   group = select.options[select.selectedIndex].value;

   if (usname.length == 0 || surname.length == 0 || emaill.length == 0) {
      alert('Заповніть особисті данні');
   }
   else if (b == false) {
      alert('Ви не натиснули "застосувати" в №10');
   }
   else {


      let forms = document.querySelectorAll('#qwest form');

      let k = 0;
      for (let form of forms) {
         let div = divs[k];
         if (form.dataset.type == 'radio') {
            check_radio(form, div);
         }
         else if (form.dataset.type == 'checkbox') {
            check_checkbpx(form, div);
         }
         else if (form.dataset.type == 'select') {
            check_select(form, div);
         }
         k++;
      }


      check_drdrop();

      check_grid();

      mes_result = "Результати тестування:\n" +
         "  Користувач: " + surname + " " + usname +
         "\n  Група: " + group +
         "\n  Кількість балів: " + points + "/10";

      sendMail();
      sendTelegram();
      console.log('p=' + points);
   }



});

let css_text;



//застосування введеного коду одразу в CSS
let button2 = document.querySelector('#bt2');
button2.addEventListener('click', function () {
   //alert(document.getElementById('textArea').value);
   let grid = document.querySelector('.wrapper');
   css_text = document.getElementById('textArea').value;
   b = true;
   grid.style.cssText = document.getElementById('textArea').value; // тренувальне застосування коду до кнопки
   let tr = document.querySelector('#try');
   tr.classList.add('tryChanged');
});


let css_text2 = ['display: grid;', 'grid-template-columns: repeat(9, 1fr);', 'grid-auto-rows: minmax(100px, auto);', 'grid-template-areas:', '"hd hd hd hd   hd   hd   hd   hd   hd"', '"sd sd sd main main main main main main"', '"sd sd sd  ft  ft   ft   ft   ft   ft";'];

function check_grid() {
   let div = document.querySelector('#grid');
   let index = 0;
   for (let i = 0; i < css_text2.length; i++) {
      index = css_text.indexOf(css_text2[i]);
      if (index == -1) {
         //alert(index + " " + i);
         break;
      }
   }
   if (index != -1) {
      div.classList.add('correct');
      points++;
   }
   else {
      div.classList.add('incorrect');
   }
}



//перевірка радіо
function check_radio(form, div) {
   let inputs = form.querySelectorAll('input');
   for (let input of inputs) {
      if (input.checked) {

         if (input.dataset.answerNum == form.dataset.right) {
            div.classList.add('correct');
            points++;
            //console.log('da');
         }
         else {
            div.classList.add('incorrect');
            //console.log('net');
         }
      }
   }
}

//перевірка чекбоксів
function check_checkbpx(form, div) {

   var checkList = document.querySelectorAll('input[type="checkbox"]:checked'); //кількість обраних варіантів
   //alert(checkList.length);
   let n_checked = 0;
   let nn = 2;
   let inputs = form.querySelectorAll('input');
   for (let input of inputs) {
      if (input.checked) {

         if (input.dataset.answerNum == form.dataset.right1 || input.dataset.answerNum == form.dataset.right2) {
            //form.classList.add('correct');
            if (checkList.length != 3) {
               points += 0.5; //підрахунок балів тесту
            }
            n_checked++;
            //console.log('da ' + n_checked);
         }
         else {
            //form.classList.add('incorrect');

            //console.log('net');
         }
      }
   }
   if (n_checked == 2 && checkList.length != 0) {
      div.classList.add('correct');
   }
   else if (n_checked == 1) {
      div.classList.add('incorrectT')
   }

   else if (n_checked == 0 && checkList.length != 0) {
      div.classList.add('incorrect')
   }

}

//перевірка випадаючого списку
function check_select(form, div) {
   let select = form.querySelector('select');
   //console.log(select.value); //перевірка обраного елементу
   if (select.value == form.dataset.right) {
      div.classList.add('correct');
      points++; //підрахунок балів тесту
      //console.log('da');
   }
   else {
      div.classList.add('incorrect');
      //console.log('net');
   }
}



//метод перевірки  DRAG & DROP
let dr_right = [4, 1, 3, 2]
let dr_right2 = [3, 2, 4, 1]
function check_drdrop() {
   let n = 0;
   let nn = 0;
   for (let i = 0; i < dr_ans.length; i++) {
      if (dr_ans[i] == dr_right[i]) {
         console.log('dr')
         n++;
      }
      else if (dr_ans[i] == dr_right2[i]) {
         console.log('dr2')
         n++;
      }

   }
   let divv = document.querySelector('#parent');
   if (n == dr_right.length) {
      divv.classList.add('drP');
      divs[8].classList.add('correct');
      console.log('drP');
      points++; //підрахунок балів тесту
   }
   else if (n != dr_right.length && dr_ans != 0) {
      divv.classList.add('drM');
      divs[8].classList.add('incorrect');
      console.log('drM')
   }
}








//відправка на пошту
function sendMail() {
   Email.send({
      SecureToken: "d13741bd-a3b0-48f9-ade6-15619bf4388a",
      To: emaill,
      From: "yarikbachokpotik210@gmail.com",
      Subject: "Результ тесту :)",
      Body: "<h1>Привіт " + usname + "!</h1>" +
         "<h3>Результати тестування:</h3>" +
         "<br>Користувач: " + surname + " " + usname +
         "<br>Група: " + group +
         "<br>Кількість балів: " + points + "/10"
   }).then(
      message => alert(mes_result)
   );
};

function sendTelegram() {

   let mes_telegram = "<b>Результати тестування:</b>\n" +
      "  Користувач: " + surname + " " + usname +
      "\n  Група: " + group +
      "\n  Кількість балів: " + points + "/10";
   axios.post(URI_API, {
      chat_id: CHAT_ID,
      parse_mode: 'html',
      text: mes_telegram
   });
}