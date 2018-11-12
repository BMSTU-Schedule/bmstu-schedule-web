/**
 * Created by ed on 10/11/2018.
 */

'use strict';

import {FetchErrorError, NotFoundError} from 'app/exceptions/network';

import {BACKEND_HOST} from 'config';

export default async function(group) {
  const response = await fetch(`${BACKEND_HOST}ics/${group.toString()}.ics`).catch(() => {
    throw new FetchErrorError();
  });

  if (response.status !== 200) {
    throw new NotFoundError(group);
  }

  return await response.text();
}
