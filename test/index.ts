import proxy from '../src/index';

!async function () {
    class A {
        public self = this;

        async b(val: any) {
            console.log(val);

            return new Promise<B>((resolve, reject) => {
                setTimeout(() => {
                    resolve(new B);
                }, 1000);
            });
        }
    }

    class B {
        public p = 'primitive';

        async a(val: any) {
            console.log(val);

            return new Promise<A>((resolve, reject) => {
                setTimeout(() => {
                    resolve(new A);
                }, 1000);
            });
        }
    }

    // const a = new A

    // const x = (await (await a.a(1)).b(2)).x

    // console.log(x)

    const pa = proxy(new A);

    const rpa = pa.b(1).a(2).self().b(3).p();

    const px = await rpa;

    console.log(px);
}()
