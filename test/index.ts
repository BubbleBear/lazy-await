import proxy from '../src/index';

!async function() {
    class A {
        async a() {
            return new Promise<B>((resolve, reject) => {
                resolve(new B);
            });
        }
    
        
    }
    
    class B {
        async b() {
            return new Promise<A>((resolve, reject) => {
                resolve(new A);
            });
        }
    }

    const pa = proxy(new A);

    const rpa = await pa.a().b().a().b();

    console.log('~~~~~~~~~~~~~~~~~~~~~~')

    console.log('AAAAAAA', rpa);
}()
