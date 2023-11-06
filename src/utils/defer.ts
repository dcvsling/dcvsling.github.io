
export class Defer<T, E = never> implements Promise<T> {
  private _task: Promise<T> | null = null;
  private _resolvedValue: T | undefined = undefined;
  private get task(): Promise<T> {
    return this._task ??= new Promise<T>((resolve, reject) => this.executor()
      .then(val => val ?? this.defaultValue)
      .then(val => this._resolvedValue = val)
      .then(val => resolve(val!))
      .then(() => this._task)
      .catch(e => this.onError?.(e) ?? reject(e)));
  }
  constructor(private executor: () => Promise<T | undefined>, private onError?: (err: E) => void, private defaultValue?: T) {}
  then<TResolve = T, TReject = never>(onfulfilled?: ((value: T) => TResolve | PromiseLike<TResolve>) | null | undefined, onrejected?: ((reason: any) => TReject | PromiseLike<TReject>) | null | undefined): Promise<TResolve | TReject> {
    return this.task.then(onfulfilled, onrejected);
  }
  catch<TReject = E>(onrejected?: ((reason: any) => TReject | PromiseLike<TReject>) | null | undefined): Promise<T | TReject> {
    return this.task.catch(onrejected);
  }
  finally(onfinally?: (() => void) | null | undefined): Promise<T> {
    return this.task.finally(onfinally);
  }
  get [Symbol.toStringTag](): string {
    return this.task[Symbol.toStringTag];
  }
  reset() {
    this._task = null;
  }
  toJSON() {
    return this._resolvedValue;
  }
}

export function defer<T = void, E = Error>(executor: () => Promise<T | undefined>, onError?: (err: E) => void, defaultValue?: T): Defer<T, E> {
  return new Defer<T, E>(executor, onError, defaultValue);
}

export namespace Defer {
  export function resolve<T, E = Error>(val: T): Defer<T, E> {
    return new Defer<T, E>(() => Promise.resolve(val));
  }
}
