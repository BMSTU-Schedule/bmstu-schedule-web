/**
 * Created by ed on 10/11/2018.
 */

'use strict';

export class FetchErrorError extends Error {
  constructor() {
    super();
    this.message = 'Network error. Please, check your network connection.';
  }
}

export class NotFoundError extends Error {
  constructor(group) {
    super();
    this.message = `Group ${group.toString()} not found.`;
  }
}
