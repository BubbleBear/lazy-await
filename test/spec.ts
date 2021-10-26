import proxy from '../'

class A {
    public self = this;

    async b(val: number) {
        console.log(val);

        return new Promise<B>((resolve) => {
            setTimeout(() => {
                resolve(new B);
            });
        });
    }
}

class B {
    public primitive = 'primitive';

    async a(val: number) {
        console.log(val);

        return new Promise<A>((resolve) => {
            setTimeout(() => {
                resolve(new A);
            });
        });
    }
}

describe('lazy-promise', () => {
    it('should chain up promise resolves', async () => {
        const a = new A;

        const x = (await (await (await a.b(1)).a(2)).self.b(3)).primitive;

        const pa = proxy(new A);

        const rpa = pa.b(1).a(2).self().b(3).primitive();

        const px = await rpa;

        expect(px).toEqual(x);
    });
});
