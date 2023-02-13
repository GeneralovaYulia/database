(function() {
  // для работы с localstorage
  let arrayLocal = [];
  //let listName = '';

  let worker = [
    {
      birthDate: "1999-09-11",
      faculty: "Гуманитарный",
      fio: "Иосиф Давыдович Кобзон",
      id: 1,
      workStart: "2019",
      workEnd: "2023",
    },
    {
      birthDate: "1992-10-07",
      faculty: "Гуманитарный",
      fio: "Владимир Владимирович Путин",
      id: 2,
      workStart: "2015",
      workEnd: "2019",
    },
    {
      birthDate: "2009-02-28",
      faculty: "Менеджмента",
      fio: "Иванов Иван Иванович",
      id: 3,
      workStart: "2020",
      workEnd: "2024",
    },
    {
      birthDate: "1987-03-06",
      faculty: "Информационных технологий",
      fio: "Кузьмич Михаил Петрович",
      id: 4,
      workStart: "2018",
      workEnd: "2022",
    }];

  // создаем и возвращаем заголовок приложения
  function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.classList.add('mb-4');
    appTitle.innerHTML = title;
    return appTitle;
  }

  function getWorkPeriod(worker) {
    const currentTime = new Date();
    let studiTime = currentTime.getFullYear() - worker.workStart;

    if (studiTime > 4) {
      return 'закончил';
    }
    return studiTime + ' курс';
  };

  // функция получения возраста
  function getbirthDateString(worker) {
    let date = new Date(worker.birthDate);
    let yyyy = date.getFullYear();
    let mm = date.getMonth();
    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    return dd + '.' + mm + '.' + yyyy;
  };

  function getAge(worker) {
    const today = new Date();
    let date = new Date(worker.birthDate);
    let age = today.getFullYear() - date.getFullYear();
    let m = today.getMonth() - date.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
      age--;
    };
    return age;
  };

  // создаем и возвращаем форму для создания новой позиции
  function createStudentItemForm() {
    let container = document.querySelector('.container');
    let form = document.createElement('form');
    let formTitle = document.createElement('h2');
    let inputName = document.createElement('input');
    let nameLabel = document.createElement('label');
    let inputSurename = document.createElement('input');
    let surenameLabel = document.createElement('label');
    let inputLastname = document.createElement('input');
    let lastnameLabel = document.createElement('label');
    let inputFaculty = document.createElement('input');
    let facultyLabel = document.createElement('label');
    let inputOffBirth = document.createElement('input');
    let birthLabel = document.createElement('label');
    let inputStartStudy = document.createElement('input');
    let startStadyLabel = document.createElement('label');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    formTitle.textContent = 'Форма добавления студентов в базу данных';
    nameLabel.textContent = 'Имя';
    surenameLabel.textContent = 'Фамилия';
    lastnameLabel.textContent = 'Отчество';
    facultyLabel.textContent = 'Название факультета';
    birthLabel.textContent = 'Дата рождения';
    startStadyLabel.textContent = 'Год начала обучения';

    inputName.placeholder = 'Имя';
    inputSurename.placeholder = 'Фамилия';
    inputLastname.placeholder = 'Отчество';
    inputFaculty.placeholder = 'Факультет';
    inputOffBirth.placeholder = 'mm/dd/yyyy';
    inputStartStudy.placeholder = 'Год начала учебы';

    inputName.setAttribute('id', 'firstname')
    inputSurename.setAttribute('id', 'surename')
    inputLastname.setAttribute('id', 'lastname')
    inputFaculty.setAttribute('id', 'faculty');
    inputOffBirth.setAttribute('id', 'dateofbirth');
    inputStartStudy.setAttribute('id', 'start');

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    inputName.setAttribute('type', 'text')
    inputFaculty.setAttribute('type', 'text');
    inputOffBirth.setAttribute('type', 'date');
    inputOffBirth.setAttribute('max', `${year-1}-${month+1}-${day}`);
    inputStartStudy.setAttribute('type', 'number');
    inputStartStudy.setAttribute('min', '2000');
    inputStartStudy.setAttribute('max', `${new Date().getFullYear()}`);

    form.classList.add('form_add', 'mb-3', 'd-flex', 'flex-wrap');
    inputName.classList.add('form-control');
    inputSurename.classList.add('form-control');
    inputLastname.classList.add('form-control');
    inputFaculty.classList.add('form-control');
    inputOffBirth.classList.add('form-control');
    inputStartStudy.classList.add('form-control');

    nameLabel.classList.add('mb-3');
    surenameLabel.classList.add('mb-3');
    lastnameLabel.classList.add('mb-3');
    facultyLabel.classList.add('mb-3');
    birthLabel.classList.add('mb-3');
    startStadyLabel.classList.add('mb-3');

    // кнопка
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить новые данные';
    buttonWrapper.append(button);

    container.append(form);
    form.append(formTitle, surenameLabel, nameLabel, lastnameLabel, facultyLabel, birthLabel, startStadyLabel, buttonWrapper);
    surenameLabel.append(inputSurename);
    nameLabel.append(inputName);
    lastnameLabel.append(inputLastname);
    facultyLabel.append(inputFaculty);
    birthLabel.append(inputOffBirth);
    startStadyLabel.append(inputStartStudy);

    return {
      form,
      formTitle,
      inputName,
      inputFaculty,
      inputOffBirth,
      inputStartStudy,
      button
    };
  };

  // создает функцию получения нового id
  function getNewID(arr) {
    let max = 0;
    for (const item of arr) {
        if (item.id > max) max = item.id
    }
    return max + 1;
  }

  // создаем функцию сохранения в localStorage
  function saveList(arr, key) {
    localStorage.setItem(key, JSON.stringify(arr));
  }

  // функция создания новой позиции
  function newWorkerTR(user) {
    let workersList = document.querySelector('.workers-list');
    let row = document.createElement('tr');
    let fioTD = document.createElement('td');
    let birthDateTD = document.createElement('td');
    let workStartTD = document.createElement('td');
    let facultyTD = document.createElement('td');

    let buttonGroup = document.createElement('td');
    let deleteButton = document.createElement('button');

    deleteButton.textContent = 'Удалить';
    deleteButton.classList.add('btn', 'btn-sm','btn-danger');
    buttonGroup.append(deleteButton);

    //добавляем все значения инпутов в ячейки
    fioTD.textContent = user.fio;
    birthDateTD.textContent = `${getbirthDateString(user)} (${getAge(user)} лет/года)`;
    workStartTD.textContent = `${user.workStart} (${getWorkPeriod(user)})`;
    facultyTD.textContent = user.faculty;

    deleteButton.addEventListener('click', function() {
      if (confirm('Вы уверены?')) {
          row.remove();

          for (let i = 0; i < arrayLocal.length; i++) {
              if (arrayLocal[i].id == user.id) arrayLocal.splice(i, 1)
          };

          saveList(arrayLocal, key);
      }
    });

    //добавляем в колонку все ячейки и кнопку
    row.append(fioTD, birthDateTD, workStartTD, facultyTD, buttonGroup);

    // добовляем позицию студента
    workersList.append(row);

    return {
      workersList,
      row,
      fioTD,
      facultyTD,
      birthDateTD,
      workStartTD,
      deleteButton,
      buttonGroup,
    }
  };

  function render(studentsArr) {
    document.getElementById('workers-list').innerHTML = '';

      for (let object of studentsArr) {
        newWorkerTR(object);
      };
  };

  //функция получения позиций из ls
  function createItemsFromLS() {
    if (localStorage.getItem('students')) {
    arrayLocal = JSON.parse(localStorage.getItem('students'));
        for (let object of arrayLocal) {
          newWorkerTR(object);
        };
    };
  };

  // функция создания дефолтного списка
  function createDeafultItems() {
    const storageArr = JSON.parse(localStorage.getItem(key));
      if (localStorage.getItem(key) === null || storageArr.length === 0) {
        arrayLocal = worker;
        localStorage.setItem('students', JSON.stringify(arrayLocal));
      for (let object of arrayLocal) {
        newWorkerTR(object);
      };
    };
  };

  // функция по созданию приложения базы данных
  function createStudentsApp(container, title = 'База данных студентов', key) {
    //createStudentItemForm();
    let studentsAppTitle = createAppTitle(title);
    let studentItemForm = createStudentItemForm();

    container.append(studentsAppTitle);
    container.append(studentItemForm.form);

    //отрисовка из ls
    createItemsFromLS();

    //отрисовка дефолтного массива
    createDeafultItems();

    //браузер создает событие submit на форме по нажатию на enter или на  кнопку создания дела
    document.querySelector('.form_add').addEventListener('submit', function(e) {
      e.preventDefault();

      let checkResult = validateForm({dateofbirth: dateofbirth, start: start});

      if (!checkResult) {
        return;
      }

      // данные в localstorage
      let LocStorageData = localStorage.getItem(key);
      if (LocStorageData === null) {
          arrayLocal = [];
      } else {
          arrayLocal = JSON.parse(LocStorageData);
      }

      // функция которая будет пушить позицию в массив для localstorage
      function createObjArr() {
        let studentname = document.querySelector('#firstname');
        let surename = document.querySelector('#surename');
        let lastname = document.querySelector('#lastname');
        let faculty = document.querySelector('#faculty');
        let dateofbirth = document.querySelector('#dateofbirth');
        let start = document.querySelector('#start');

        const itemObj = {};
        itemObj.id = getNewID(arrayLocal);
        itemObj.fio = surename.value + ' ' + studentname.value + ' ' + lastname.value;
        itemObj.faculty = faculty.value;
        itemObj.birthDate = dateofbirth.value;
        itemObj.workStart = start.value;
        arrayLocal.push(itemObj);
        return itemObj;
      }

      // создаем констату нового студента
      const user = createObjArr();

      // передаем ее в функцию создания новой позиции
      newWorkerTR(user);

      // дефлотные позиции
      const storageArr = JSON.parse(localStorage.getItem(key));
      if (localStorage.getItem(key) === null || storageArr.length === 0) {
        localStorage.setItem(key, JSON.stringify(worker));
      }

      localStorage.setItem(key, JSON.stringify(arrayLocal));

      surename.value = '';
      firstname.value = '';
      lastname.value = '';
      faculty.value = '';
      dateofbirth.value = '';
      start.value = '';
    });
  }

  function validateForm(inputs) {
    const curDate = new Date();
    const errorsMap = {
      firstname: 'Заполните имя студента',
      surename: 'Фамилия студента должна быть заполнена',
      lastname: 'Заполните отчество',
      dateofbirth: 'Когда студент родился?',
      start: 'Когда начал учиться?',
      faculty: 'На каком факультете?'
    };

    // Если поле пустое то добавляем класс с ошибкой и выходим из функции
    document.querySelectorAll('.form-control').forEach((i) => {
      const invalidMessage = i.parentElement.querySelector('.invalid-feedback');

      if (invalidMessage) {
        invalidMessage.remove();
      }

      i.classList.remove('is-invalid');

      if (!i.value.trim().length){
        const errorMessage = document.createElement('span');

        errorMessage.classList.add('invalid-feedback');
        errorMessage.textContent = errorsMap[i.id];
        i.parentElement.append(errorMessage);
        i.classList.add('is-invalid');
        return false;
      }
    })

      // Если дата рождения не в промежутке тоже вешаем ошибку
      const checkBirthDate = new Date('01.01.1900');
      if ((inputs.dateofbirth.valueAsDate < checkBirthDate) || (inputs.dateofbirth.valueAsDate > curDate)){
        inputs.dateofbirth.classList.add('is-invalid');
      }

      // Если дата обучения не в промежутке тоже вешаем ошибку
      if ((inputs.start.value < 1910) || (inputs.start.value > curDate.getFullYear())){
        inputs.start.classList.add('is-invalid');
      }

      // Если есть хоть 1 поле с ошибкой то выходим из слушателя
      // и не выполняем дальнейший код
      if (document.querySelectorAll('.is-invalid').length) {
        return false;
      }

      return true;
  }

  document.querySelectorAll('.form-control').forEach((i) => {
    i.addEventListener('input', () => {
      validateForm({dateofbirth: dateofbirth, start: start});
    });
  });

  // Сортировка по имени
  function sortByName(a, b) {
    if (a.fio < b.fio) { return -1;}
    if (a.fio > b.fio) { return 1;}
    return 0;
  }

  // Сортировка по факультету
  function sortByFaculty(a, b) {
    if (a.faculty < b.faculty) { return -1;}
    if (a.faculty > b.faculty) { return 1;}
    return 0;
  }

  // Сортировка по дате рождения
  function sortByBirth(a, b) {
    if (a.birthDate > b.birthDate) { return -1;}
    if (a.birthDate < b.birthDate) { return 1;}
    return 0;
  }

  // Сортировка по началу обучения
  function sortByStart(a, b) {
    if (a.workStart > b.workStart) { return -1;}
    if (a.workStart < b.workStart) { return 1;}
    return 0;
  }

  function sortBy(typeOfsort) {
    switch(typeOfsort) {
      case 'name':
        arrayLocal.sort(sortByName);
        break;
      case 'date':
        arrayLocal.sort(sortByBirth);
        break;
      case 'startstudy':
        arrayLocal.sort(sortByStart);
        break;
      case 'facultet':
        arrayLocal.sort(sortByFaculty);
        break;
      default: break;
    };
    render(arrayLocal);
  }

  document.getElementById('name').addEventListener('click', function() {
    sortBy('name');
  })

  document.getElementById('date').addEventListener('click', function() {
    sortBy('date');
  })

  document.getElementById('startstudy').addEventListener('click', function() {
    sortBy('startstudy');
  })

  document.getElementById('facultet').addEventListener('click', function() {
    sortBy('facultet');
  })

  // функция фильтрации по значению
  function filter(input, value) {
    let result = [...arrayLocal];

    switch (input) {
      case 'name':
        result = arrayLocal.filter(function(user) {
            return user.fio.toLowerCase().includes(value.toLowerCase())
          });
          break;
      case 'faculty':
        result = arrayLocal.filter(function(user) {
            return user.faculty.toLowerCase().includes(value.toLowerCase())
          });
          break;
      case 'start':
        result = arrayLocal.filter(function(user) {
            return user.workStart === value
          });
          break;
      case 'end':
        result = arrayLocal.filter(function(user) {
            return user.workEnd === value
          });
          break;
      default: break;
    }
    if (value === '') {
      result = arrayLocal;
      }

      render(result);
    }

    document.getElementById('search-name').addEventListener('input', function () {
      filter('name', this.value);
    })
    document.getElementById('search-faculty').addEventListener('input', function() {
        filter('faculty', this.value)
    })
    document.getElementById('search-start').addEventListener('input', function () {
        filter('start', this.value)
    })
    document.getElementById('search-end').addEventListener('input', function () {
        filter('end', this.value)
    })

    window.createStudentsApp = createStudentsApp;
})();
