
export function CssVar(param: string): PropertyDecorator {
  return function(target: any, key: string | symbol) {
    Object.defineProperty(target, key, {
      get: () => {
        return document.querySelector<HTMLElement>(':root')?.style.getPropertyValue(param) ?? '';
      },
      set: function(val: string) {
        document.querySelector<HTMLElement>(':root')?.style.setProperty(param, val);
      }
    });
  }
}

export class CssState {
  constructor() {
    window.CSS
  }
}

