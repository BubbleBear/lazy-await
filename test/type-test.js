const proxy = require('../dist');

(async function () {
    class A {
        constructor() {
            this.x = this;
        }

        async a(str) {
            console.log(str);

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(new B);
                }, 1000);
            });
        }
    }

    class B {
        async b(str) {
            console.log(str);

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(new A);
                }, 1000);
            });
        }
    }

    const pa = proxy(new A);

    const rpa = pa.a(1).b(2).x().a(3).b(4);

    const x = await rpa;

    console.log(x);
})();
