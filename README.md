VLEX (Vue Like Expressions)

# Features
* Support vue dynamic expressions
* Support all vue filters

# Install

```
npm install vlex --save
```

# Usage

```
import Vlex from 'vlex';

const vlex = new Vlex();

vlex.parse('hello {{ world }}', { world: 'vlex'}); // return hello vlex
vlex.parse('vlex: a + 1', { a: 1 }); // return 2
```

# Test
```
npm run test
```

# License
MIT

