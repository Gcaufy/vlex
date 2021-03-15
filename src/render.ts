import { compile } from 'vue-template-compiler';

const resolveFilter = (filters: { [key: string]: Function }) => {
  debugger;
  return function(id: string) {
    const fn = filters[id];
    if (!fn) {
      return (a: any) => a;
    } else {
      return function() {
        return fn.apply(null, arguments);
      }
    }
  }
}

/**
 * 
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
 */
export const render = (scope: object, template: string, filters: { [key: string]: Function }) => {
  const renderFns = {
    // {{ data.abc | base64('encode', 'p2') }}
    _f: resolveFilter(filters), // filter, e.g. _f('base64')(data.abc, 'encode', 'p2')
    _c: (_a: string, b: any) => b, // component, e.g. _c('div', [])
    _v: (a: any) => a, // text
    _s: (a: any) => a,
    _e: () => '', // comment
    _t: () => '', // slot
  };

  const renderStr = compile(`<i>${template}</i>`).render;
  // eslint-disable-next-line no-new-func
  const fn = new Function(renderStr).bind({
    ...renderFns,
    ...scope,
  });
  return fn()[0];
};

