/**
 * Created by ed on 10/11/2018.
 */

'use strict';

export class SavingIcsError extends Error {
  constructor() {
    super();
    this.message = 'Can not save the ics.';
  }
}
