/**
 * Created by ed on 10/11/2018.
 */

'use strict';

const groupRegex = /^([А-Я]{1,4}\d{0,2})-(\d{1,3})([А-Я])?$/;

export default function(input) {
  const match = groupRegex.exec(input.toUpperCase());

  if (!match || match.length !== 4) {
    return undefined;
  }

  return {
    department: match[1],
    groupNumber: match[2],
    type: match[3] || '',
  };
}
