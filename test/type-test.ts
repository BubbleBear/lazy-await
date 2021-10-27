import proxy from '../src';
import { A } from './common';

!async function () {
    const a = new A;

    const ra = (await (await (await (await a.self.b(1)).a(2)).self.b(3)).promiseThis).primitive;

    console.log(ra);

    const pa = proxy(new A);

    const rpa = await pa.self.b(1).a(2).self.b(3).promiseThis.primitive;

    console.log(rpa);
}();
