/**
 * Created by ed on 10/11/2018.
 */


'use strict';

export class InvalidGroupFormatError extends Error {
    constructor(group) {
        super();

        this.mesage = `Invalid group format: ${group.toString()}`;
    }
}