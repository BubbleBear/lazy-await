export class A {
    public self: this;

    b(val: number): Promise<B>
}

export class B {
    public primitive: string;

    public promiseThis: Promise<this>;

    a(val: number): Promise<A>;
}
