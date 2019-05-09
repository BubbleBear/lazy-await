declare type ThenInfer<T> = T extends Promise<infer U> ? U : T;
declare type ReturnThenInfer<T> = (args?: any) => LazyPromise<ThenInfer<T extends (args: any) => any ? ReturnType<T> : T>>;
declare type LazyPromise<T> = {
    [P in keyof T]: ReturnThenInfer<T[P]>;
};
export default function proxy<T extends object>(object: T): LazyPromise<T>;
export {};
