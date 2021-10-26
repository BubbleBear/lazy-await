import proxy from '../'

describe('lazy-promise', () => {
    class A {
        public self = this;

        async b(val: any) {
            console.log(val);

            return new Promise<B>((resolve) => {
                setTimeout(() => {
                    resolve(new B);
                });
            });
        }
    }

    class B {
        public p = 'primitive';

        async a(val: any) {
            console.log(val);

            return new Promise<A>((resolve) => {
                setTimeout(() => {
                    resolve(new A);
                });
            });
        }
    }

    it('should chain up promise resolves', async () => {
        const a = new A;

        const x = (await (await (await a.b(1)).a(2)).self.b(3)).p;

        const pa = proxy(new A);

        const rpa = pa.b(1).a(2).self().b(3).p();

        const px = await rpa;

        expect(px).toEqual(x);
    })
})
