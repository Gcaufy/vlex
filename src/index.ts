import { render } from "./render";

const vlexReg = /^vlex:/;

export default class Vlex {

  public filters: { [key: string]: Function } = {};

  parse(expr: string, scope: any = {}) {
    expr = expr.trim();
    if (vlexReg.test(expr)) {
      expr = expr.replace(vlexReg, '');
      const newScope = {...scope};
      for(let k in this.filters) {
        if (!scope.hasOwnProperty(k)) {
          newScope[k] = this.filters[k];
        }
      }
      const fn = new Function(`with (this) { return ${expr} }`).bind(newScope);
      return fn();
    } else {
      return render(scope, expr, this.filters);
    }
  }

  filter(id: string, definition: Function) {
    this.filters[id] = definition;
  }
}