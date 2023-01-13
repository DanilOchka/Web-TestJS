let test = document.querySelector('#test');


//масив об'єктів завдань тесту
let questions = [
   {
      text: 'Чи може грід-елемент бути грід-контейнером?',
      right: 3,
      ansvers: ['Може, якщо до нього застосувати технологію Flex', 'Ні', 'Так'],
      type: 'radio'
   },

   {
      text: "Які існують варіанти об'явлення grid-контейнера",
      right1: 1,
      right2: 2,
      ansvers: ['display: grid;', 'display: inline-grid;', 'display: flex-grid;'],
      type: 'checkbox'
   },

   {
      text: 'Чи можна використовувати технологію Flex та Grid в одному проекті?',
      right: 2,
      ansvers: ['Ні', 'Так', 'Якщо для них створити окремі файли стилів'],
      type: 'select'
   },

   {
      text: 'Якщо до грід елементу застосувати z-index. Чи це працюватиме?',
      right: 1,
      ansvers: ['Так', 'Ні', 'У грідах є шнші спеціальні для цього властивості'],
      type: 'radio'
   },

   {
      text: 'Чи можна змішувати різні одиниці виміру при роботі з grid?',
      right: 1,
      ansvers: ['Так', 'Ні', 'Тільки в різних грід-таблицях'],
      type: 'radio'
   },

   {
      text: 'Скільки аргументів приймає фйнкція minmax?',
      right: 3,
      ansvers: ['0', '3', '2'],
      type: 'select'
   },

   {
      text: 'Які одиниці виміру застосовують при роботі з grid?',
      right1: 1,
      right2: 3,
      ansvers: ['px', 'mm', 'fr'],
      type: 'checkbox'
   },

   {
      text: 'Які функції дозволяють вирівнювати сітку гріду відносно горизонтальної та вертикальної осей',
      right1: 2,
      right2: 3,
      ansvers: ['align-items: *;', 'justify-content: *;', 'align-content: *;'],
      type: 'checkbox'
   }

];


let arr = [];

//отримання випадкового числа
function getRandomInt(min, max) {
   min = Math.ceil(min);
   max = Math.floor(max);

   return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}



let n = 1; // счетчик номер вопросов 

crate_test(questions);

function crate_test(questions) {
   for (var i = 0; i < questions.length; i++) {


      let randN = getRandomInt(0, questions.length); //створення рандомного номеру масиву

      //переввірка чи цей номер вже був використаний
      let b = new Boolean(true);
      while (b) {
         let check = 0;
         for (var i = 0; i < arr.length; i++) {

            if (arr[i] == randN) {
               check = -1;


            }
         }
         if (check == -1) {
            randN = getRandomInt(0, questions.length);
         }
         else {
            arr.push(randN);
            b = false;
         }
      }


      let question = questions[randN];
      let div = document.createElement('div');
      let p = document.createElement('p');
      let form = document.createElement('form');


      test.appendChild(div);


      p.innerHTML = "<b>№" + (i + 1) + "</b> " + question.text;
      div.appendChild(p);
      div.id = 'qwest'
      div.className = 'testItem'


      div.appendChild(form);

      if (question.type == 'checkbox') {
         form.dataset.right1 = question.right1;
         form.dataset.right2 = question.right2;
      }
      else {
         form.dataset.right = question.right;
      }
      form.dataset.type = question.type;

      if (question.type == 'radio') {
         create_radio(question, form);
      }
      else if (question.type == 'checkbox') {
         create_checkbox(question, form);
      }
      else if (question.type == 'select') {
         create_select(question, form);
      }
      n++;
   }
}
//alert(arr);

function create_radio(question, form) {
   let i = 0;
   for (let answer of question.ansvers) {

      let input = document.createElement('input');
      input.type = 'radio';
      input.name = n;
      input.dataset.answerNum = i + 1;

      form.appendChild(input);
      let span = document.createElement('span');
      span.innerHTML = question.ansvers[i] + "<br \/>";
      form.appendChild(span);
      i++;
   }
}

// <input type="checkbox" name="remember" id = "remember">
function create_checkbox(question, form) {
   let i = 0;
   for (let answer of question.ansvers) {

      let input = document.createElement('input');
      input.type = 'checkbox';
      input.name = n;
      input.dataset.answerNum = i + 1;

      form.appendChild(input);
      let span = document.createElement('span');
      span.innerHTML = question.ansvers[i] + "<br \/>";
      form.appendChild(span);
      i++;
   }
}



/*
      <select name="city">
        <option value="---">---</option>
        <option value="lviv">Lviv</option>
        <option value="shostka">Shostka</option>
        <option value="dubai">Dubai</option>
      </select>
*/
function create_select(question, form) {
   let select = document.createElement('select');
   select.name = n;
   select.id = 'sel'

   form.appendChild(select);
   let i = 0;
   for (let answer of question.ansvers) {
      let option = document.createElement('option');
      option.value = i + 1;
      option.innerHTML = question.ansvers[i];
      option.dataset.answerNum = i + 1;

      select.appendChild(option);
      i++;
   }


}



