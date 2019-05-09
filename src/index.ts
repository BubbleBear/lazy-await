type ThenInfer<T> = T extends Promise<infer U> ? U : T;

type Proxy<T> = {
    [P in keyof T]: ThenInfer<T[P]>;
}

export default function proxy<T extends object>(object: T) {
    const agent = new Proxy(object, {
        get(target, key, _) {
            if (target instanceof Promise) {
                if (target[key] !== undefined) {

                    return target[key].bind(target);
                } else {
                    return () => proxy(target.then((result) => {

                        return result[key].call(result);
                    }));
                }
            } else {
                return () => proxy(target[key].bind(target)());
            }
        },
    });

    return agent as Proxy<T>;
}
