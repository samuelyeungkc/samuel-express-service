import {Request} from 'express';
import * as core from 'express-serve-static-core';

type MyQRequestUrlParam = {
    key?: string;
};

export enum GarageDoorCommand {
    OPEN = 'open',
    CLOSE = 'close',
}

export type MyQRequest =
    Request<
        core.ParamsDictionary,
        any,
        any,
        MyQRequestUrlParam, Record<string, any>
    >;
