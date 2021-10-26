import proxy from '../src';
import { A } from './common';

!async function () {
    const a = new A;

    const x = (await (await (await (await a.b(1)).a(2)).self.b(3)).promiseThis).primitive;

    console.log(x);

    const pa = proxy(new A);

    const rpa = pa.b(1).a(2).self().b(3).promiseThis().primitive();

    const px = await rpa;

    console.log(px);
}();
