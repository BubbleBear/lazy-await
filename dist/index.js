"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function proxy(object) {
    const agent = new Proxy(object, {
        get(target, key, _) {
            if (target instanceof Promise) {
                if (target[key] !== undefined) {
                    return target[key].bind(target);
                }
                else {
                    return () => proxy(target.then((result) => {
                        return result[key].call(result);
                    }));
                }
            }
            else {
                return () => proxy(target[key].bind(target)());
            }
        },
    });
    return agent;
}
exports.default = proxy;
