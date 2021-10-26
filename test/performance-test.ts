import proxy from '../';
import { A } from './common';

async function native() {
    const a = new A;
    (await (await (await (await a.b(1)).a(2)).self.b(3)).promiseThis).primitive;
}

async function lazyPromise() {
    const pa = proxy(new A);
    await pa.b(1).a(2).self().b(3).promiseThis().primitive();
}

async function duration(fn: Function, rounds = 1) {
    console.time(fn.name);

    while (rounds--) {
        await fn();
    }

    console.timeEnd(fn.name);
}

const rounds = 1e3;

duration(native, rounds);
duration(lazyPromise, rounds);
