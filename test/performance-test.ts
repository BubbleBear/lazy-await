import proxy from '../'

class A {
    public self = this;

    async b(val: number) {

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

        return new Promise<A>((resolve) => {
            setTimeout(() => {
                resolve(new A);
            });
        });
    }
}

async function native() {
    const a = new A;
    await (await (await (await a.b(1)).a(2)).self.b(3)).primitive;
}

async function lazyPromise() {
    const pa = proxy(new A);
    await pa.b(1).a(2).self().b(3).primitive();
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
