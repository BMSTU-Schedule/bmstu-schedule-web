/**
 * Created by ed on 04/11/2017.
 */

'use strict';

import './styles.scss';

import {saveAs} from 'file-saver';
import {trackPageView, trackScheduleRequest, trackScheduleResult} from './analytics';

const ERROR_INVALID_FORMAT = 'Указан неверный формат номера группы.';
const ERROR_NOT_FOUND = 'Чёт я ничего не нашел для этой группы, кажется. Если ты не уточнил тип группы (Б/М/А), сделай это и попробуй ещё раз.';
const ERROR_UNKNOWN_ERROR = 'Уупс. У нас что-то пошло не так. Скоро всё поправим';

trackPageView();

const normalizeInput = function (input) {
    input = input.toUpperCase();
    const regex = /^[а-яА-Я]{1,4}\d{0,2}\-\d{1,3}[а-яА-Я]?$$/;
    const match = regex.exec(input);

    if (!match) {
        return;
    }

    return input;
};

const getSchedule = async function (input) {
    input = normalizeInput(input);

    if (input === undefined) {
        throw ERROR_INVALID_FORMAT;
    }

    let ics;
    try {
      const response = (await fetch(`/ics/${input}.ics`));

      if (response.status !== 200) {
          throw ERROR_NOT_FOUND;
      }

      ics = await response.text()
    } catch (e) {
      trackScheduleResult('error fetch', input);
      if (typeof e === 'string') {
          throw e;
      }
      throw ERROR_UNKNOWN_ERROR;
    }

    try {
        const blob = new Blob([ics], {type: 'text/calendar;charset=utf-8'});
        saveAs(blob, `${input}.ics`);
    } catch (e) {
        trackScheduleResult('error save', input);
        throw ERROR_UNKNOWN_ERROR;
    }

    trackScheduleResult('ok', input);
};

const animInvalidInput = function () {
    const input = document.getElementById('group');
    const btn = document.getElementById('btn');

    btn.classList.add('btn__hidden');
    input.classList.add('form__field__invalid');
};

const animValidInput = function () {
    const input = document.getElementById('group');
    const btn = document.getElementById('btn');

    btn.classList.remove('btn__hidden');
    input.classList.remove('form__field__invalid');
};

const animFetching = function () {
    const input = document.getElementById('group');
    const btn = document.getElementById('btn');

    input.classList.add('form__field__hidden');
    btn.classList.remove('btn__hidden');
    btn.innerHTML = '...';
};

const animUserInput = function () {
    const input = document.getElementById('group');
    const btn = document.getElementById('btn');

    input.classList.remove('form__field__hidden');
    if (!input.value || normalizeInput(input.value)) {
        btn.classList.remove('btn__hidden');
    } else {
        btn.classList.add('btn__hidden');
    }
    btn.innerHTML = 'Get';
};

window.onInputInput = function () {
    const input = document.getElementById('group');

    if (!input.value || normalizeInput(input.value)) {
        animValidInput();
    } else {
        animInvalidInput();
    }
};

let isFetching = false;

window.onInputKeyPress = async function (e) {
    if (e.keyCode === 13) {
        if (isFetching) return;

        const input = document.getElementById('group');

        trackScheduleRequest('enter', input.value);

        animFetching();

        isFetching = true;
        try {
            await getSchedule(input.value);
        } catch (e) {
            alert(e);
        }
        isFetching = false;

        animUserInput();
    }
};

window.onButtonClick = async function () {
    if (isFetching) return;

    const input = document.getElementById('group');

    trackScheduleRequest('click', input.value);

    animFetching();

    isFetching = true;
    try {
        await getSchedule(input.value);
    } catch (e) {
        alert(e);
    }
    isFetching = false;

    animUserInput();
};
