import proxy from '../';
import { A } from './common';

describe('lazy-promise', () => {
    it('should chain up promise resolves', async () => {
        const a = new A;

        const x = (await (await (await (await a.b(1)).a(2)).self.b(3)).promiseThis).primitive;

        const pa = proxy(new A);

        const rpa = pa.b(1).a(2).self().b(3).promiseThis().primitive();

        const px = await rpa;

        expect(px).toEqual(x);
    });
});
