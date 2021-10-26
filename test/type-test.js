const proxy = require('../')

class A {
    constructor() {
        this.self = this;
    }

    async b(val) {
        console.log(val);

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(new B);
            }, 100);
        });
    }
}

class B {
    constructor() {
        this.primitive = 'primitive';
    }

    async a(val) {
        console.log(val);

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(new A);
            }, 100);
        });
    }
}

!async function () {
    const a = new A;

    const x = (await (await (await a.b(1)).a(2)).self.b(3)).primitive;

    console.log(x);

    const pa = proxy(new A);

    const rpa = pa.b(1).a(2).self().b(3).primitive();

    const px = await rpa;

    console.log(px);
}();
