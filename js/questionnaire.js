const data = [
    {
        question: 'Какой национальный вид спорта Канады?',
        answers: [
            {
                id: '1',
                value: 'Боулинг',
                correct: false,
            },
            {
                id: '2',
                value: 'Баскетбол',
                correct: false,
            },
            {
                id: '3',
                value: 'Лакросс',
                correct: true,
            },
            {
                id: '4',
                value: 'Футбол',
                correct: false,
            },
        ]
    },
    {
        question: 'Какой боксер был известен как “The Greatest” и “The People’s Champion”?',
        answers: [
            {
                id: '5',
                value: 'Майк Тайсон',
                correct: false,
            },
            {
                id: '6',
                value: 'Мухаммед Али',
                correct: true,
            },
            {
                id: '7',
                value: 'Флойд Мейвезер',
                correct: false,
            },
            {
                id: '8',
                value: 'Виталий Кличко',
                correct: false,
            },

        ]
    },
    {
        question: 'Сколько минут длится матч по регби?',
        answers: [
            {
                id: '9',
                value: 'Восемьдесят минут',
                correct: true,
            },
            {
                id: '10',
                value: 'Тридцать минут',
                correct: false,
            },
            {
                id: '11',
                value: 'Сто двадцать минут',
                correct: false,
            },
            {
                id: '12',
                value: 'Шестьдесят минут',
                correct: false,
            },
        ]
    },
    {
        question: 'В какой стране были проведены первые Олимпийские игры?',
        answers: [
            {
                id: '13',
                value: 'Италия',
                correct: false,
            },
            {
                id: '14',
                value: 'Япония',
                correct: false,
            },
            {
                id: '15',
                value: 'Греция',
                correct: true,
            },
            {
                id: '16',
                value: 'Франция',
                correct: false,
            },
        ]
    },
    {
        question: 'Сколько игроков в бейсбольной команде?',
        answers: [
            {
                id: '17',
                value: '8 игроков',
                correct: false,
            },
            {
                id: '18',
                value: '9 игроков',
                correct: true,
            },
            {
                id: '19',
                value: '10 игроков',
                correct: false,
            },
            {
                id: '20',
                value: '11 игроков',
                correct: false,
            },
        ]
    },
    {
        question: 'Какая единственная страна принимала участие во всех чемпионатах мира по футболу?',
        answers: [
            {
                id: '21',
                value: 'Бразилия',
                correct: true,
            },
            {
                id: '22',
                value: 'Англия',
                correct: false,
            },
            {
                id: '23',
                value: 'Испания',
                correct: false,
            },
            {
                id: '24',
                value: 'Аргентина',
                correct: false,
            },
        ]
    },
    {
        question: 'Олимпийские игры проводятся каждые сколько лет?',
        answers: [
            {
                id: '25',
                value: 'Шесть лет',
                correct: false,
            },
            {
                id: '26',
                value: 'Четыре года',
                correct: true,
            },
            {
                id: '27',
                value: 'Пять лет',
                correct: false,
            },
            {
                id: '28',
                value: 'Семь лет',
                correct: false,
            },
        ]
    },
    {
        question: 'Сколько колец на олимпийском флаге?',
        answers: [
            {
                id: '29',
                value: 'Семь',
                correct: false,
            },
            {
                id: '30',
                value: 'Шесть',
                correct: false,
            },
            {
                id: '31',
                value: 'Пять',
                correct: true,
            },
            {
                id: '32',
                value: 'Четыре',
                correct: false,
            },
        ]
    },
    {
        question: 'За какую страну играл Дэвид Бекхэм?',
        answers: [
            {
                id: '33',
                value: 'Испания',
                correct: false,
            },
            {
                id: '34',
                value: 'Бразилия',
                correct: false,
            },
            {
                id: '35',
                value: 'Англия',
                correct: true,
            },
            {
                id: '36',
                value: 'США',
                correct: false,
            },
        ]
    },
];

let localResults = {};  //сохраняем ответы в переменную

const questionnaire = document.querySelector('#questionnaire');
const questions = document.querySelector('#questions');
const indicator = document.querySelector('#indicator');
const results = document.querySelector('#results');
const btnNext = document.querySelector('#btn__next');
const btnRestart = document.querySelector('#btn__restart');

function renderQuestions(index) {  //получаем вопросы из массива data по data[index].question и выводим его в <div class="questionnaire__questions_aitem--question">
    renderIndicator(index + 1);  // вызов счетчика вопросов (+1 чтобы выводился не 0й вопрос а 1й)

    questions.dataset.currentStep = index; //добавляем датаатрибут текущему вопросу

    function renderAnswers() {
        return data[index].answers.map((answer) => {
            return `
                <li>
                    <label>
                        <input class="answer__input" type="radio" name=${index} value=${answer.id}>
                        ${answer.value}
                    </label>
                </li>
        `}).join('');
    }
    questions.innerHTML = `
        <div class="questionnaire__questions_aitem">
            <div class="questionnaire__questions_aitem--question">${data[index].question}</div>  
            <ul class="questionnaire__questions_aitem--answers">${renderAnswers()}</ul>
        </div>
    `;
};

function renderResults() {
    let content = '';

    function getClassName(answer, questionIndex) {
        let className = '';

        if (!answer.correct && answer.id === localResults[questionIndex]) {
            className = 'answer__invalid';
        }
        else if (answer.correct) {
            className = 'answer__valid';
        }
        return className;
    }

    function getAnswers(questionIndex) {
        return data[questionIndex].answers.map((answer) => {
            return `<li class="${getClassName(answer, questionIndex)}">${answer.value}</li>`;
        }).join('');
    }

    data.forEach((question, index) => {  // проходим по всем вопросам
        content += `
            <div class="questionnaire__results_aitem">
                <div class="questionnaire__results_aitem--question">${question.question}</div>
                <ul class="questionnaire__results_aitem--answers">${getAnswers(index)}</ul>
            </div>
        `;
    });

    results.innerHTML = content;
};

function renderIndicator(currentStep) {
    indicator.innerHTML = `Вопрос №${currentStep}/ из ${data.length}`; //currentStep - шаг счетчика вопросов
};

//слушаем события на обертке, используем всплытие
questionnaire.addEventListener('change', (event) => {      
    //логика ответа
    if (event.target.classList.contains('answer__input')) {
        localResults[event.target.name] = event.target.value; // в localResults записываем ключ name/ значение value
        btnNext.disabled = false; // включаем кнопку далее

        console.log(localResults);
    }
});

questionnaire.addEventListener('click', (event) => {
    //вперед или с начала
    if (event.target.classList.contains('btn__next')) {
        const nextQestionIndex = Number(questions.dataset.currentStep) + 1;
        if (data.length === nextQestionIndex) {
            questions.classList.add('questions_hidden');
            indicator.classList.add('indicator_hidden');
            results.classList.add('results_visible');
            btnNext.classList.add('btn__next_hidden');
            btnRestart.classList.add('btn__restart_visible');

            renderResults(); //переход к результатам
        }
        else {
            //переход к следующему вопросу
            renderQuestions(nextQestionIndex);
        }
        btnNext.disabled = true;
    }

    if (event.target.classList.contains('btn__restart')) {
        localResults = {};  // обнуляем сохраненные ответы опроса
        results.innerHTML = '';  // обнуляем выведенные результаты опроса

        questions.classList.remove('questions_hidden');
        indicator.classList.remove('indicator_hidden');
        results.classList.remove('results_visible');
        btnNext.classList.remove('btn__next_hidden');
        btnRestart.classList.remove('btn__restart_visible');

        renderQuestions(0);
    }

});

renderQuestions(0);