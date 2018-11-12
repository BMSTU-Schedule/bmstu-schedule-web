/**
 * Created by ed on 10/11/2018.
 */

'use strict';

import {InvalidGroupFormatError} from 'app/exceptions/validation';
import parseGroup from 'app/utils/parse-group-str';

export default class Group {
  constructor(str) {
    const parseResult = parseGroup(str);
    if (!parseResult) {
      throw new InvalidGroupFormatError(str);
    }

    this.department = parseResult.department;
    this.groupNumber = parseResult.groupNumber;
    this.type = parseResult.type;
  }

  makeBachelor() {
    this.type = 'Б';
  }

  makeMaster() {
    this.type = 'М';
  }

  toString() {
    return `${this.department}-${this.groupNumber}${this.type}`;
  }
}
