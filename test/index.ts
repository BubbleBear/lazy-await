import proxy from '../src/index';

!async function() {
    class A {
        async a(str: string) {
            console.log(str);

            return new Promise<B>((resolve, reject) => {
                setTimeout(() => {
                    resolve(new B);
                }, 1000);
            });
        }
    
        public x = this;
    }
    
    class B {
        async b(str: string) {
            console.log(str);

            return new Promise<A>((resolve, reject) => {
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
}()
