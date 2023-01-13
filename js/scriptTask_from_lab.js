//завдання по об’єктам і класам


//===Об'єкти==
console.log("===Об'єкти==");
console.log('\n');

let user = {
   name: 'Danylo',
   surname: 'Holosnyi'
}

let student = {
   profession: 'IT',
   group: 'TR-11',


   //замінити данні у початкових властивостях об'єкту
   change_data: function (one, two) {
      this.profession = one;
      this.group = two;
   },

   //додати нову властивість
   add_prop: function (prop, val) {
      this[prop] = val;
   },

   //видалення всіх властивостей
   delete__all: function () {
      for (let key in this) {
         delete this[key];
      }
   }
}


console.log('Вивід user: ');
console.log(user);
console.log('\n');


console.log('Вивід student: ');
console.log(student);
console.log('\n');

//додання нової властивості в об'єкт
student.add_prop('age', 1007);

console.log('Перевірка новоствореної валстивосіт student.age');
console.log(student.age);
console.log('\n');

//перевірка методу заміни даних
student.change_data('svarshik', 'PTU');
console.log('перевірка методу заміни даних student.change_data');
console.log(student);
console.log('\n');

//клонування об'єкту юзер в новий ою'єект
let user_copy = {};
for (let key in user) {
   user_copy[key] = user[key];
}
console.log('Клон user: ');
console.log(user_copy);
console.log('\n');

//клонування об'єкту студент в новий ою'єект
let student_copy = {};
for (let key in user) {
   student_copy[key] = student[key];
}

console.log('Клон student: ');
console.log(student_copy);
console.log('\n');

// створення прототтпу студент
function Stud(profession, group) {
   this.profession = profession;
   this.group = group;

   //замінити данні у початкових властивостях об'єкту
   this.change_data = function (one, two) {
      this.profession = one;
      this.group = two;
   };

   //додати нову властивість
   this.add_prop = function (prop, val) {
      this[prop] = val;
   };

   //видалення всіх властивостей
   this.delete__all = function () {
      for (let key in this) {
         delete this[key];
      }
   }
}

let person1 = new Stud('Bob', 'Smith');
console.log(person1);
console.log(person1.hello);


//додання до прототипу об’єкту «Студент» метод «Показати дані»
Stud.prototype.show_data = function () {
   for (let key in this) {
      console.log(this[key]);
   }
};

console.log('Демонстарція роботи доданого методу в прототип Студента методу Показ даних');
person1.show_data(); //демонстрація роботи методу ПОКАЗ ДАНИХ
console.log('\n');



function Succ(profession, group, test, score, tryy) {
   Stud.call(this, profession, group);
   this.test = test;
   this.score = score;
   this.tryy = tryy;
   this.name = user.name;
   this.surname = user.surname;

   //Розрахунок середнього балу
   this.calkulate = function () {
      return (this.score / this.tryy);
   }
}


Succ.prototype = Object.defineProperty(Succ.prototype,
   'constructor', {
   value: Succ,
   enumerable: false,
   writable: true,


});

//Перевизначити в об’єкті «Успішність» метод «Показати дані»
Succ.prototype.show_data = function () {
   for (let key in this) {
      console.log(this[key]);
   }
}



let s = new Succ('професия', 'група', 'test', 100, 5);

console.log('Демонстарція обєкту УСПІШНІСТЬ');
console.log(s);
console.log('\n');

console.log('Демонстарція роботи методуСЕРЕДНІЙ БАЛ');
console.log(s.calkulate());
console.log('\n');





//===Класи==
console.log("===Класи==");
console.log('\n');


class StudentS {
   _name = 0;
   _surname = 0;
   //сетер для імені та прізвища (якщо дані закороткі, то вони буду автоматично дописані)
   set name(value) {
      if (value.length < 3) {
         value += '1234';
      }
      this._name = value;
   }
   set surname(value) {
      if (value.length < 3) {
         value += '1234';
      }
      this._surname = value;
   }
   constructor(name, surname, profession, group) {
      this.name = name;
      this.surname = surname;
      this.profession = profession;
      this.group = group;
   }

   //метод перезапису даних
   updata_data(name, surname, profession, group) {
      this.name = name;
      this.surname = surname;
      this.profession = profession;
      this.group = group;
   }

   //метод видалення даних
   delete_all_data() {
      this.name = '---';
      this.surname = '---';
      this.profession = '---';
      this.group = '---';
   }

   set_new(data) {
      this.new_data = data;
   }

   show__data() {
      console.log('Показ даних з класу Студент');
      console.log("Ім'я" + this._name);
      console.log("Прізвище" + this._surname);
      console.log("Професія " + this.profession);
      console.log("Група " + this.group);
      console.log('\n');

   }

}

//Клас УСПІШНГСТІ
class SuccessS extends StudentS {
   _tryy = 0;
   _score = 0;
   set tryy(value) {
      if (value < 0) {
         value = Math.abs(value);
      }
      this._tryy = value;
   }

   set score(value) {
      if (value < 0) {
         value = Math.abs(value);
      }
      this._score = value;
   }


   set_test_rsult(test, tryy, score) {
      this.test = test;
      this.tryy = tryy;
      this.score = score;
   }

   //перевизначення методу виводу
   show__data() {
      console.log('Показ даних з класу УСПІШНІСТЬ');
      console.log("Ім'я" + this._name);
      console.log("Прізвище" + this._surname);
      console.log("Професія " + this.profession);
      console.log("Група " + this.group);
      console.log('\n');

   }

   //мутод підрахунку середнього
   calkulateE() {
      console.log('/n Підрахунок середнього з класу успішність');
      console.log(this._score + '/' + this._tryy + '=' + this._score / this._tryy + '\n');

   }
}


let stst = new StudentS('Кевін', 'Жовтий', 'Програміст', 'ТР');
console.log('Вивід класу СТУДЕНТ: ');
console.log(stst);
console.log('\n');




let ggg = new SuccessS('Бандерас', 'Алдо', 'Художник', 'ХР');
ggg.set_test_rsult('Контрольна', -5, -100);

console.log('Вивід класу Успішість: ');
console.log(ggg);
console.log('\n');

ggg.calkulateE();

stst.show__data();
ggg.show__data();
