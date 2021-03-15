import Vlex from './../src/index';

describe('Vlex test', () => {
  test('basic test', () => {
    const vlex = new Vlex();
    expect(vlex.parse('this is {{a}}', { a: 123 })).toBe('this is 123');
    expect(vlex.parse('v: {{obj.a}}', { obj: {a: 1} })).toBe('v: 1');
    expect(vlex.parse('vlex: 1===1')).toBe(true);
    expect(vlex.parse('vlex: x-1===0', { x: 1})).toBe(true);
  });

  test('filter test', () => {
    const vlex = new Vlex();


    vlex.filter('capitalize', function (value: string) {
      if (!value) return '';
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
    });

    vlex.filter('join', function (value: string, append1: string, append2: string) {
      return `${value}-${append1}-${append2}`;
    });

    expect(vlex.parse('hello {{ name | unknown}}', { name: 'jim'})).toBe('hello jim');
    expect(vlex.parse('hello {{ name | capitalize}}', { name: 'jim'})).toBe('hello Jim');
    expect(vlex.parse('hello {{ name | join("a", "b")}}', { name: 'jim'})).toBe('hello jim-a-b');
    expect(vlex.parse('vlex: join(name, x, y)', { name: 'jim', x: 'x', y: 'y'})).toBe('jim-x-y');
  });
});