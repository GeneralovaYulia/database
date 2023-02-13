// Форма для добавления
const formAddInit = () => {
  const inputs = {};

  const form = document.createElement('form');
  form.classList.add('form_add', 'mb-5', 'd-flex', 'flex-wrap');

  const fields = [
    {
      type: 'text',
      label: 'Имя',
      id: 'name'
    },
    {
      type: 'text',
      label: 'Фамилия',
      id: 'surname'
    },
    {
      type: 'text',
      label: 'Отчество',
      id: 'patronymic'
    },
    {
      type: 'date',
      label: 'дата рождения',
      id: 'birthday'
    },
    {
      type: 'number',
      label: 'год начала обучения',
      id: 'education_start'
    },
    {
      type: 'text',
      label: 'факультет',
      id: 'faculty'
    }
  ];

  fields.forEach((item) => {
    // console.log(item)
    const label =  document.createElement('label');
    label.classList.add('mb-3');

    const span = document.createElement('span');
    span.innerText = item.label;

    const input = document.createElement('input');
    input.setAttribute('id', item.id);
    input.setAttribute('type', item.type);
    input.classList.add('form-control');


    label.append(span);
    label.append(input);
    form.append(label)
  })


  const btn = document.createElement('button');
  btn.classList.add('btn', 'btn-primary', 'btn_add');
  btn.innerHTML = 'Добавить дело'

  form.append(btn);

  return form;
}

// создаем всю разметку
const htmlInit = () => {
  const container = document.createElement('div');
  container.classList.add('container', 'pt-5')

  const formAdd = formAddInit();
  container.append(formAdd);

  return {
    container,
    formAdd
  };
}

// Сохраняем то что вернула функция в переменную, чтобы можно было обращастья к вернувшимся объектам
const htmlLayout = htmlInit();

// Вставляем в html
document.body.append(htmlLayout.container);

const errorsMap = {
  name: 'Заполните имя студента',
  surname: 'Фамилия студента должна быть заполнена',
  patronymic: 'Заполните отчество',
  birthday: 'Когда студент родился?',
  education_start: 'Когда начал учиться?',
  faculty: 'На каком факультете?'
};

const checkInputs = (inputs) => {
  const curDate = new Date();

  // Если поле пустое то добавляем класс с ошибкой и выходим из функции
  htmlLayout.formAdd.querySelectorAll('input').forEach((i)=>{
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
  if ((inputs.birthday.valueAsDate < checkBirthDate) || (inputs.birthday.valueAsDate > curDate)){
    inputs.birthday.classList.add('is-invalid');
  }

  // Если дата обучения не в промежутке тоже вешаем ошибку
  console.log(inputs.educationStart.value)
  console.log(curDate.getFullYear())
  if ((inputs.educationStart.value < 1910) || (inputs.educationStart.value > curDate.getFullYear())){
    inputs.educationStart.classList.add('is-invalid');
  }

  // Если есть хоть 1 поле с ошибкой то выходим из слушателя
  // и не выполняем дальнейший код
  if (htmlLayout.formAdd.querySelectorAll('.is-invalid').length) {
    return false;
  }

  return true;
}

const studentName = document.querySelector('#name');
const surname = document.querySelector('#surname');
const patronymic = document.querySelector('#patronymic');
const birthday = document.querySelector('#birthday');
const educationStart = document.querySelector('#education_start');
const faculty = document.querySelector('#faculty');

htmlLayout.formAdd.querySelectorAll('input').forEach((i) => {
  i.addEventListener('input', () => {
    checkInputs({birthday: birthday, educationStart: educationStart});
  });
});

// отправка формы на добавление
htmlLayout.formAdd.addEventListener('submit', e => {
  e.preventDefault();

  let checkResult = checkInputs({birthday: birthday, educationStart: educationStart});

  if (!checkResult) {
    return;
  }

  // пихаем в таблицу все значения. Так как порядок у нас всегда один, просто все по порядку вставляем

  const student = {
    name: studentName.value,
    surname: surname.value,
    patronymic: patronymic.value,
    birthday: birthday.valueAsDate,
    educationStart: educationStart.value,
    faculty: faculty.value
  }

  htmlLayout.formAdd.reset();

  console.log(student);
})
