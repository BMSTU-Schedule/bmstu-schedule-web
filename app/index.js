/**
 * Created by ed on 04/11/2017.
 */

'use strict';

import './styles.scss';

import {saveAs} from 'file-saver';
import {trackPageView, trackScheduleRequest, trackScheduleResult} from './analytics';

import Group from './models/group';
import getIcs from './utils/get-ics';
import parseGroup from './utils/parse-group-str';

import {NotFoundError} from './exceptions/network';
import {SavingIcsError} from './exceptions/saving';

trackPageView();

const getIcsSafe = async function(group) {
  try {
    return await getIcs(group);
  } catch (e) {
    return null;
  }
};

const getSchedule = async function(input) {
  const group = new Group(input);

  let ics = await getIcsSafe(group);
  if (!ics && !group.type) {
    const groups = [group.toString()];
    group.makeBachelor();
    ics = await getIcsSafe(group);

    if (!ics) {
      groups.push(group.toString());
      group.makeMaster();
      ics = await getIcsSafe(group);
    }

    if (!ics) {
      groups.push(group.toString());
      throw new Error(`none of the groups ${groups.join(', ')} found`);
    }
  }

  if (!ics) {
    throw new NotFoundError(group);
  }

  try {
    const blob = new Blob([ics], {type: 'text/calendar;charset=utf-8'});
    saveAs(blob, `${group.toString()}.ics`);
  } catch (e) {
    trackScheduleResult('error save', group.toString());
    throw new SavingIcsError();
  }

  trackScheduleResult('ok', input);
};

const animInvalidInput = function() {
  const input = document.getElementById('group');
  const btn = document.getElementById('btn');

  btn.classList.add('btn__hidden');
  input.classList.add('form__field__invalid');
};

const animValidInput = function() {
  const input = document.getElementById('group');
  const btn = document.getElementById('btn');

  btn.classList.remove('btn__hidden');
  input.classList.remove('form__field__invalid');
};

const animFetching = function() {
  const input = document.getElementById('group');
  const btn = document.getElementById('btn');

  input.classList.add('form__field__hidden');
  btn.classList.remove('btn__hidden');
  btn.innerHTML = '...';
};

const animUserInput = function() {
  const input = document.getElementById('group');
  const btn = document.getElementById('btn');

  input.classList.remove('form__field__hidden');
  if (!input.value || parseGroup(input.value)) {
    btn.classList.remove('btn__hidden');
  } else {
    btn.classList.add('btn__hidden');
  }
  btn.innerHTML = 'Get';
};

window.onInputInput = function() {
  const input = document.getElementById('group');

  if (!input.value || parseGroup(input.value)) {
    animValidInput();
  } else {
    animInvalidInput();
  }
};

let isFetching = false;

window.onInputKeyPress = async function(e) {
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

window.onButtonClick = async function() {
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
