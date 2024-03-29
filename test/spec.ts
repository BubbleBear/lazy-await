import proxy from '../';
import { A } from './common';

describe('lazy-promise', () => {
    it('should chain up promise resolves', async () => {
        const a = new A;

        const ra = (await (await (await (await a.self.b(1)).a(2)).self.b(3)).promiseThis).primitive;

        const pa = proxy(new A);

        const rpa = await pa.self.b(1).a(2).self.b(3).promiseThis.primitive;

        expect(rpa).toEqual(ra);
    });
});
