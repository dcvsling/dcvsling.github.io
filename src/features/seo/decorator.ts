
export function Meta(name: string): PropertyDecorator {

  return function(target: any, key: string | symbol) {
    Object.defineProperty(target, key, {
      get: () => {
        const dom = document.head.querySelector<HTMLElement>(`meta[name=${name}]`);
        return dom?.getAttribute('content') ?? '';
      },
      set: (val: string) => {
        if(val?.length === 0 ?? true)
          return;
        let dom = document.head.querySelector<HTMLElement>(`meta[name=${name}]`);
        if(!dom) {
          dom = document.createElement('meta');
          document.head.appendChild(dom);
        }
        dom.setAttribute('name', name);
        dom.setAttribute('content', val);
      }
    });
  }
}

export function Head(name: string): PropertyDecorator {

  return function(target: any, key: string | symbol) {
    Object.defineProperty(target, key, {
      get: () => {
        const dom = document.head.querySelector<HTMLElement>(name);
        return dom?.innerText;
      },
      set: (val: string) => {
        if(val?.length === 0 ?? true)
          return;
        let dom = document.head.querySelector<HTMLElement>(name);
        if(!dom) {
          dom = document.createElement(name);
          document.head.appendChild(dom);
        }
        dom!.innerHTML = val;
      }
    });
  }
}
