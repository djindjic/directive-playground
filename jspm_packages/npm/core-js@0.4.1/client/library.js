/* */ 
"format cjs";
(function(process) {
  !function(returnThis, framework, undefined) {
    'use strict';
    var global = returnThis(),
        OBJECT = 'Object',
        FUNCTION = 'Function',
        ARRAY = 'Array',
        STRING = 'String',
        NUMBER = 'Number',
        REGEXP = 'RegExp',
        DATE = 'Date',
        MAP = 'Map',
        SET = 'Set',
        WEAKMAP = 'WeakMap',
        WEAKSET = 'WeakSet',
        SYMBOL = 'Symbol',
        PROMISE = 'Promise',
        MATH = 'Math',
        ARGUMENTS = 'Arguments',
        PROTOTYPE = 'prototype',
        CONSTRUCTOR = 'constructor',
        TO_STRING = 'toString',
        TO_STRING_TAG = TO_STRING + 'Tag',
        TO_LOCALE = 'toLocaleString',
        HAS_OWN = 'hasOwnProperty',
        FOR_EACH = 'forEach',
        ITERATOR = 'iterator',
        FF_ITERATOR = '@@' + ITERATOR,
        PROCESS = 'process',
        CREATE_ELEMENT = 'createElement',
        Function = global[FUNCTION],
        Object = global[OBJECT],
        Array = global[ARRAY],
        String = global[STRING],
        Number = global[NUMBER],
        RegExp = global[REGEXP],
        Date = global[DATE],
        Map = global[MAP],
        Set = global[SET],
        WeakMap = global[WEAKMAP],
        WeakSet = global[WEAKSET],
        Symbol = global[SYMBOL],
        Math = global[MATH],
        TypeError = global.TypeError,
        setTimeout = global.setTimeout,
        setImmediate = global.setImmediate,
        clearImmediate = global.clearImmediate,
        process = global[PROCESS],
        nextTick = process && process.nextTick,
        document = global.document,
        html = document && document.documentElement,
        navigator = global.navigator,
        define = global.define,
        ArrayProto = Array[PROTOTYPE],
        ObjectProto = Object[PROTOTYPE],
        FunctionProto = Function[PROTOTYPE],
        Infinity = 1 / 0,
        DOT = '.';
    function isObject(it) {
      return it != null && (typeof it == 'object' || typeof it == 'function');
    }
    function isFunction(it) {
      return typeof it == 'function';
    }
    var isNative = ctx(/./.test, /\[native code\]\s*\}\s*$/, 1);
    var buildIn = {
      Undefined: 1,
      Null: 1,
      Array: 1,
      String: 1,
      Arguments: 1,
      Function: 1,
      Error: 1,
      Boolean: 1,
      Number: 1,
      Date: 1,
      RegExp: 1
    },
        toString = ObjectProto[TO_STRING];
    function setToStringTag(it, tag, stat) {
      if (it && !has(it = stat ? it : it[PROTOTYPE], SYMBOL_TAG))
        hidden(it, SYMBOL_TAG, tag);
    }
    function cof(it) {
      return it == undefined ? it === undefined ? 'Undefined' : 'Null' : toString.call(it).slice(8, -1);
    }
    function classof(it) {
      var klass = cof(it),
          tag;
      return klass == OBJECT && (tag = it[SYMBOL_TAG]) ? has(buildIn, tag) ? '~' + tag : tag : klass;
    }
    var call = FunctionProto.call,
        apply = FunctionProto.apply,
        REFERENCE_GET;
    function part() {
      var length = arguments.length,
          args = Array(length),
          i = 0,
          _ = path._,
          holder = false;
      while (length > i)
        if ((args[i] = arguments[i++]) === _)
          holder = true;
      return partial(this, args, length, holder, _, false);
    }
    function partial(fn, argsPart, lengthPart, holder, _, bind, context) {
      assertFunction(fn);
      return function() {
        var that = bind ? context : this,
            length = arguments.length,
            i = 0,
            j = 0,
            args;
        if (!holder && !length)
          return invoke(fn, argsPart, that);
        args = argsPart.slice();
        if (holder)
          for (; lengthPart > i; i++)
            if (args[i] === _)
              args[i] = arguments[j++];
        while (length > j)
          args.push(arguments[j++]);
        return invoke(fn, args, that);
      };
    }
    function ctx(fn, that, length) {
      assertFunction(fn);
      if (~length && that === undefined)
        return fn;
      switch (length) {
        case 1:
          return function(a) {
            return fn.call(that, a);
          };
        case 2:
          return function(a, b) {
            return fn.call(that, a, b);
          };
        case 3:
          return function(a, b, c) {
            return fn.call(that, a, b, c);
          };
      }
      return function() {
        return fn.apply(that, arguments);
      };
    }
    function invoke(fn, args, that) {
      var un = that === undefined;
      switch (args.length | 0) {
        case 0:
          return un ? fn() : fn.call(that);
        case 1:
          return un ? fn(args[0]) : fn.call(that, args[0]);
        case 2:
          return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);
        case 3:
          return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);
        case 4:
          return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
        case 5:
          return un ? fn(args[0], args[1], args[2], args[3], args[4]) : fn.call(that, args[0], args[1], args[2], args[3], args[4]);
      }
      return fn.apply(that, args);
    }
    function construct(target, argumentsList) {
      var instance = create(target[PROTOTYPE]),
          result = apply.call(target, instance, argumentsList);
      return isObject(result) ? result : instance;
    }
    var create = Object.create,
        getPrototypeOf = Object.getPrototypeOf,
        setPrototypeOf = Object.setPrototypeOf,
        defineProperty = Object.defineProperty,
        defineProperties = Object.defineProperties,
        getOwnDescriptor = Object.getOwnPropertyDescriptor,
        getKeys = Object.keys,
        getNames = Object.getOwnPropertyNames,
        getSymbols = Object.getOwnPropertySymbols,
        has = ctx(call, ObjectProto[HAS_OWN], 2),
        ES5Object = Object;
    function returnIt(it) {
      return it;
    }
    function get(object, key) {
      if (has(object, key))
        return object[key];
    }
    function ownKeys(it) {
      return getSymbols ? getNames(it).concat(getSymbols(it)) : getNames(it);
    }
    var assign = Object.assign || function(target, source) {
      var T = Object(assertDefined(target)),
          l = arguments.length,
          i = 1;
      while (l > i) {
        var S = ES5Object(arguments[i++]),
            keys = getKeys(S),
            length = keys.length,
            j = 0,
            key;
        while (length > j)
          T[key = keys[j++]] = S[key];
      }
      return T;
    };
    function keyOf(object, el) {
      var O = ES5Object(object),
          keys = getKeys(O),
          length = keys.length,
          index = 0,
          key;
      while (length > index)
        if (O[key = keys[index++]] === el)
          return key;
    }
    function array(it) {
      return String(it).split(',');
    }
    var push = ArrayProto.push,
        unshift = ArrayProto.unshift,
        slice = ArrayProto.slice,
        splice = ArrayProto.splice,
        indexOf = ArrayProto.indexOf,
        forEach = ArrayProto[FOR_EACH];
    function createArrayMethod(type) {
      var isMap = type == 1,
          isFilter = type == 2,
          isSome = type == 3,
          isEvery = type == 4,
          isFindIndex = type == 6,
          noholes = type == 5 || isFindIndex;
      return function(callbackfn) {
        var O = Object(assertDefined(this)),
            that = arguments[1],
            self = ES5Object(O),
            f = ctx(callbackfn, that, 3),
            length = toLength(self.length),
            index = 0,
            result = isMap ? Array(length) : isFilter ? [] : undefined,
            val,
            res;
        for (; length > index; index++)
          if (noholes || index in self) {
            val = self[index];
            res = f(val, index, O);
            if (type) {
              if (isMap)
                result[index] = res;
              else if (res)
                switch (type) {
                  case 3:
                    return true;
                  case 5:
                    return val;
                  case 6:
                    return index;
                  case 2:
                    result.push(val);
                }
              else if (isEvery)
                return false;
            }
          }
        return isFindIndex ? -1 : isSome || isEvery ? isEvery : result;
      };
    }
    function createArrayContains(isContains) {
      return function(el) {
        var O = ES5Object(assertDefined(this)),
            length = toLength(O.length),
            index = toIndex(arguments[1], length);
        if (isContains && el != el) {
          for (; length > index; index++)
            if (sameNaN(O[index]))
              return isContains || index;
        } else
          for (; length > index; index++)
            if (isContains || index in O) {
              if (O[index] === el)
                return isContains || index;
            }
        return !isContains && -1;
      };
    }
    function generic(A, B) {
      return typeof A == 'function' ? A : B;
    }
    var MAX_SAFE_INTEGER = 0x1fffffffffffff,
        ceil = Math.ceil,
        floor = Math.floor,
        max = Math.max,
        min = Math.min,
        random = Math.random,
        trunc = Math.trunc || function(it) {
          return (it > 0 ? floor : ceil)(it);
        };
    function sameNaN(number) {
      return number != number;
    }
    function toInteger(it) {
      return isNaN(it) ? 0 : trunc(it);
    }
    function toLength(it) {
      return it > 0 ? min(toInteger(it), MAX_SAFE_INTEGER) : 0;
    }
    function toIndex(index, length) {
      var index = toInteger(index);
      return index < 0 ? max(index + length, 0) : min(index, length);
    }
    function createReplacer(regExp, replace, isStatic) {
      var replacer = isObject(replace) ? function(part) {
        return replace[part];
      } : replace;
      return function(it) {
        return String(isStatic ? it : this).replace(regExp, replacer);
      };
    }
    function createPointAt(toString) {
      return function(pos) {
        var s = String(assertDefined(this)),
            i = toInteger(pos),
            l = s.length,
            a,
            b;
        if (i < 0 || i >= l)
          return toString ? '' : undefined;
        a = s.charCodeAt(i);
        return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? toString ? s.charAt(i) : a : toString ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
      };
    }
    var REDUCE_ERROR = 'Reduce of empty object with no initial value';
    function assert(condition, msg1, msg2) {
      if (!condition)
        throw TypeError(msg2 ? msg1 + msg2 : msg1);
    }
    function assertDefined(it) {
      if (it == undefined)
        throw TypeError('Function called on null or undefined');
      return it;
    }
    function assertFunction(it) {
      assert(isFunction(it), it, ' is not a function!');
      return it;
    }
    function assertObject(it) {
      assert(isObject(it), it, ' is not an object!');
      return it;
    }
    function assertInstance(it, Constructor, name) {
      assert(it instanceof Constructor, name, ": use the 'new' operator!");
    }
    function descriptor(bitmap, value) {
      return {
        enumerable: !(bitmap & 1),
        configurable: !(bitmap & 2),
        writable: !(bitmap & 4),
        value: value
      };
    }
    function simpleSet(object, key, value) {
      object[key] = value;
      return object;
    }
    function createDefiner(bitmap) {
      return DESC ? function(object, key, value) {
        return defineProperty(object, key, descriptor(bitmap, value));
      } : simpleSet;
    }
    function uid(key) {
      return SYMBOL + '(' + key + ')_' + (++sid + random())[TO_STRING](36);
    }
    function getWellKnownSymbol(name, setter) {
      return (Symbol && Symbol[name]) || (setter ? Symbol : safeSymbol)(SYMBOL + DOT + name);
    }
    var DESC = !!function() {
      try {
        return defineProperty({}, DOT, ObjectProto);
      } catch (e) {}
    }(),
        sid = 0,
        hidden = createDefiner(1),
        set = Symbol ? simpleSet : hidden,
        safeSymbol = Symbol || uid;
    function assignHidden(target, src) {
      for (var key in src)
        hidden(target, key, src[key]);
      return target;
    }
    var SYMBOL_ITERATOR = getWellKnownSymbol(ITERATOR),
        SYMBOL_TAG = getWellKnownSymbol(TO_STRING_TAG),
        SUPPORT_FF_ITER = FF_ITERATOR in ArrayProto,
        ITER = safeSymbol('iter'),
        KEY = 1,
        VALUE = 2,
        Iterators = {},
        IteratorPrototype = {},
        NATIVE_ITERATORS = SYMBOL_ITERATOR in ArrayProto,
        BUGGY_ITERATORS = 'keys' in ArrayProto && !('next' in [].keys());
    setIterator(IteratorPrototype, returnThis);
    function setIterator(O, value) {
      hidden(O, SYMBOL_ITERATOR, value);
      SUPPORT_FF_ITER && hidden(O, FF_ITERATOR, value);
    }
    function createIterator(Constructor, NAME, next, proto) {
      Constructor[PROTOTYPE] = create(proto || IteratorPrototype, {next: descriptor(1, next)});
      setToStringTag(Constructor, NAME + ' Iterator');
    }
    function defineIterator(Constructor, NAME, value, DEFAULT) {
      var proto = Constructor[PROTOTYPE],
          iter = get(proto, SYMBOL_ITERATOR) || get(proto, FF_ITERATOR) || (DEFAULT && get(proto, DEFAULT)) || value;
      if (framework) {
        setIterator(proto, iter);
        if (iter !== value) {
          var iterProto = getPrototypeOf(iter.call(new Constructor));
          setToStringTag(iterProto, NAME + ' Iterator', true);
          has(proto, FF_ITERATOR) && setIterator(iterProto, returnThis);
        }
      }
      Iterators[NAME] = iter;
      Iterators[NAME + ' Iterator'] = returnThis;
      return iter;
    }
    function defineStdIterators(Base, NAME, Constructor, next, DEFAULT, IS_SET) {
      function createIter(kind) {
        return function() {
          return new Constructor(this, kind);
        };
      }
      createIterator(Constructor, NAME, next);
      var entries = createIter(KEY + VALUE),
          values = createIter(VALUE);
      if (DEFAULT == VALUE)
        values = defineIterator(Base, NAME, values, 'values');
      else
        entries = defineIterator(Base, NAME, entries, 'entries');
      if (DEFAULT) {
        $define(PROTO + FORCED * BUGGY_ITERATORS, NAME, {
          entries: entries,
          keys: IS_SET ? values : createIter(KEY),
          values: values
        });
      }
    }
    function iterResult(done, value) {
      return {
        value: value,
        done: !!done
      };
    }
    function isIterable(it) {
      var O = Object(it),
          Symbol = global[SYMBOL],
          hasExt = !!(Symbol && Symbol[ITERATOR] && Symbol[ITERATOR] in O);
      return hasExt || SYMBOL_ITERATOR in O || has(Iterators, classof(O));
    }
    function getIterator(it) {
      var Symbol = global[SYMBOL],
          ext = Symbol && Symbol[ITERATOR] && it[Symbol[ITERATOR]],
          getIter = ext || it[SYMBOL_ITERATOR] || Iterators[classof(it)];
      return assertObject(getIter.call(it));
    }
    function stepCall(fn, value, entries) {
      return entries ? invoke(fn, value) : fn(value);
    }
    function forOf(iterable, entries, fn, that) {
      var iterator = getIterator(iterable),
          f = ctx(fn, that, entries ? 2 : 1),
          step;
      while (!(step = iterator.next()).done)
        if (stepCall(f, step.value, entries) === false)
          return;
    }
    var NODE = cof(process) == PROCESS,
        core = {},
        path = framework ? global : core,
        old = global.core,
        FORCED = 1,
        GLOBAL = 2,
        STATIC = 4,
        PROTO = 8,
        BIND = 16,
        WRAP = 32;
    function $define(type, name, source) {
      var key,
          own,
          out,
          exp,
          isGlobal = type & GLOBAL,
          target = isGlobal ? global : (type & STATIC) ? global[name] : (global[name] || ObjectProto)[PROTOTYPE],
          exports = isGlobal ? core : core[name] || (core[name] = {});
      if (isGlobal)
        source = name;
      for (key in source) {
        own = !(type & FORCED) && target && key in target && (!isFunction(target[key]) || isNative(target[key]));
        out = (own ? target : source)[key];
        if (type & BIND && own)
          exp = ctx(out, global);
        else if (type & WRAP && !framework && target[key] == out) {
          exp = function(param) {
            return this instanceof out ? new out(param) : out(param);
          };
          exp[PROTOTYPE] = out[PROTOTYPE];
        } else
          exp = type & PROTO && isFunction(out) ? ctx(call, out) : out;
        if (exports[key] != out)
          hidden(exports, key, exp);
        if (framework && target && !own) {
          if (isGlobal)
            target[key] = out;
          else
            delete target[key] && hidden(target, key, out);
        }
      }
    }
    if (typeof module != 'undefined' && module.exports)
      module.exports = core;
    if (isFunction(define) && define.amd)
      define(function() {
        return core;
      });
    if (!NODE || framework) {
      core.noConflict = function() {
        global.core = old;
        return core;
      };
      global.core = core;
    }
    !function(IS_ENUMERABLE, Empty, _classof, $PROTO) {
      if (!DESC) {
        getOwnDescriptor = function(O, P) {
          if (has(O, P))
            return descriptor(!ObjectProto[IS_ENUMERABLE].call(O, P), O[P]);
        };
        defineProperty = function(O, P, Attributes) {
          if ('value' in Attributes)
            assertObject(O)[P] = Attributes.value;
          return O;
        };
        defineProperties = function(O, Properties) {
          assertObject(O);
          var keys = getKeys(Properties),
              length = keys.length,
              i = 0,
              P,
              Attributes;
          while (length > i) {
            P = keys[i++];
            Attributes = Properties[P];
            if ('value' in Attributes)
              O[P] = Attributes.value;
          }
          return O;
        };
      }
      $define(STATIC + FORCED * !DESC, OBJECT, {
        getOwnPropertyDescriptor: getOwnDescriptor,
        defineProperty: defineProperty,
        defineProperties: defineProperties
      });
      var keys1 = [CONSTRUCTOR, HAS_OWN, 'isPrototypeOf', IS_ENUMERABLE, TO_LOCALE, TO_STRING, 'valueOf'],
          keys2 = keys1.concat('length', PROTOTYPE),
          keysLen1 = keys1.length;
      function createDict() {
        var iframe = document[CREATE_ELEMENT]('iframe'),
            i = keysLen1,
            iframeDocument;
        iframe.style.display = 'none';
        html.appendChild(iframe);
        iframe.src = 'javascript:';
        iframeDocument = iframe.contentWindow.document;
        iframeDocument.open();
        iframeDocument.write('<script>document.F=Object</script>');
        iframeDocument.close();
        createDict = iframeDocument.F;
        while (i--)
          delete createDict[PROTOTYPE][keys1[i]];
        return createDict();
      }
      function createGetKeys(names, length, isNames) {
        return function(object) {
          var O = ES5Object(object),
              i = 0,
              result = [],
              key;
          for (key in O)
            if (key != $PROTO)
              has(O, key) && result.push(key);
          while (length > i)
            if (has(O, key = names[i++])) {
              ~indexOf.call(result, key) || result.push(key);
            }
          return result;
        };
      }
      function isPrimitive(it) {
        return !isObject(it);
      }
      $define(STATIC, OBJECT, {
        getPrototypeOf: getPrototypeOf = getPrototypeOf || function(O) {
          if (has(assertObject(O), $PROTO))
            return O[$PROTO];
          if (isFunction(O[CONSTRUCTOR]) && O instanceof O[CONSTRUCTOR]) {
            return O[CONSTRUCTOR][PROTOTYPE];
          }
          return O instanceof Object ? ObjectProto : null;
        },
        getOwnPropertyNames: getNames = getNames || createGetKeys(keys2, keys2.length, true),
        create: create = create || function(O, Properties) {
          var result;
          if (O !== null) {
            Empty[PROTOTYPE] = assertObject(O);
            result = new Empty();
            Empty[PROTOTYPE] = null;
            if (result[CONSTRUCTOR][PROTOTYPE] !== O)
              result[$PROTO] = O;
          } else
            result = createDict();
          return Properties === undefined ? result : defineProperties(result, Properties);
        },
        keys: getKeys = getKeys || createGetKeys(keys1, keysLen1, false),
        seal: returnIt,
        freeze: returnIt,
        preventExtensions: returnIt,
        isSealed: isPrimitive,
        isFrozen: isPrimitive,
        isExtensible: isObject
      });
      $define(PROTO, FUNCTION, {bind: function(that) {
          var fn = assertFunction(this),
              partArgs = slice.call(arguments, 1);
          function bound() {
            var args = partArgs.concat(slice.call(arguments));
            return (this instanceof bound ? construct : invoke)(fn, args, that);
          }
          return bound;
        }});
      function arrayMethodFix(fn) {
        return function() {
          return fn.apply(ES5Object(this), arguments);
        };
      }
      if (!(0 in Object(DOT) && DOT[0] == DOT)) {
        ES5Object = function(it) {
          return cof(it) == STRING ? it.split('') : Object(it);
        };
        slice = arrayMethodFix(slice);
      }
      $define(PROTO + FORCED * (ES5Object != Object), ARRAY, {
        slice: slice,
        join: arrayMethodFix(ArrayProto.join)
      });
      $define(STATIC, ARRAY, {isArray: function(arg) {
          return cof(arg) == ARRAY;
        }});
      function createArrayReduce(isRight) {
        return function(callbackfn, memo) {
          assertFunction(callbackfn);
          var O = ES5Object(this),
              length = toLength(O.length),
              index = isRight ? length - 1 : 0,
              i = isRight ? -1 : 1;
          if (2 > arguments.length)
            for (; ; ) {
              if (index in O) {
                memo = O[index];
                index += i;
                break;
              }
              index += i;
              assert(isRight ? index >= 0 : length > index, REDUCE_ERROR);
            }
          for (; isRight ? index >= 0 : length > index; index += i)
            if (index in O) {
              memo = callbackfn(memo, O[index], index, this);
            }
          return memo;
        };
      }
      $define(PROTO, ARRAY, {
        forEach: forEach = forEach || createArrayMethod(0),
        map: createArrayMethod(1),
        filter: createArrayMethod(2),
        some: createArrayMethod(3),
        every: createArrayMethod(4),
        reduce: createArrayReduce(false),
        reduceRight: createArrayReduce(true),
        indexOf: indexOf = indexOf || createArrayContains(false),
        lastIndexOf: function(el, fromIndex) {
          var O = ES5Object(this),
              length = toLength(O.length),
              index = length - 1;
          if (arguments.length > 1)
            index = min(index, toInteger(fromIndex));
          if (index < 0)
            index = toLength(length + index);
          for (; index >= 0; index--)
            if (index in O)
              if (O[index] === el)
                return index;
          return -1;
        }
      });
      $define(PROTO, STRING, {trim: createReplacer(/^\s*([\s\S]*\S)?\s*$/, '$1')});
      $define(STATIC, DATE, {now: function() {
          return +new Date;
        }});
      if (_classof(function() {
        return arguments;
      }()) == OBJECT)
        classof = function(it) {
          var cof = _classof(it);
          return cof == OBJECT && isFunction(it.callee) ? ARGUMENTS : cof;
        };
    }('propertyIsEnumerable', Function(), classof, safeSymbol(PROTOTYPE));
    $define(GLOBAL + FORCED, {global: global});
    !function(TAG, SymbolRegistry, setter) {
      if (!isNative(Symbol)) {
        Symbol = function(description) {
          assert(!(this instanceof Symbol), SYMBOL + ' is not a ' + CONSTRUCTOR);
          var tag = uid(description);
          DESC && setter && defineProperty(ObjectProto, tag, {
            configurable: true,
            set: function(value) {
              hidden(this, tag, value);
            }
          });
          return set(create(Symbol[PROTOTYPE]), TAG, tag);
        };
        hidden(Symbol[PROTOTYPE], TO_STRING, function() {
          return this[TAG];
        });
      }
      $define(GLOBAL + WRAP, {Symbol: Symbol});
      var symbolStatics = {
        'for': function(key) {
          return has(SymbolRegistry, key += '') ? SymbolRegistry[key] : SymbolRegistry[key] = Symbol(key);
        },
        iterator: SYMBOL_ITERATOR,
        keyFor: part.call(keyOf, SymbolRegistry),
        toStringTag: SYMBOL_TAG = getWellKnownSymbol(TO_STRING_TAG, true),
        pure: safeSymbol,
        set: set,
        useSetter: function() {
          setter = true;
        },
        useSimple: function() {
          setter = false;
        }
      };
      forEach.call(array('hasInstance,isConcatSpreadable,match,replace,search,' + 'species,split,toPrimitive,unscopables'), function(it) {
        symbolStatics[it] = getWellKnownSymbol(it);
      });
      $define(STATIC, SYMBOL, symbolStatics);
      setToStringTag(Symbol, SYMBOL);
      $define(GLOBAL, {Reflect: {ownKeys: ownKeys}});
    }(safeSymbol('tag'), {}, true);
    !function(isFinite, tmp) {
      var RangeError = global.RangeError,
          isInteger = Number.isInteger || function(it) {
            return !isObject(it) && isFinite(it) && floor(it) === it;
          },
          sign = Math.sign || function sign(it) {
            return (it = +it) == 0 || it != it ? it : it < 0 ? -1 : 1;
          },
          pow = Math.pow,
          abs = Math.abs,
          exp = Math.exp,
          log = Math.log,
          sqrt = Math.sqrt,
          fcc = String.fromCharCode,
          at = createPointAt(true);
      var objectStatic = {
        assign: assign,
        is: function(x, y) {
          return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
        }
      };
      '__proto__' in ObjectProto && function(buggy, set) {
        try {
          set = ctx(call, getOwnDescriptor(ObjectProto, '__proto__').set, 2);
          set({}, ArrayProto);
        } catch (e) {
          buggy = true;
        }
        objectStatic.setPrototypeOf = setPrototypeOf = setPrototypeOf || function(O, proto) {
          assertObject(O);
          assert(proto === null || isObject(proto), proto, ": can't set as prototype!");
          if (buggy)
            O.__proto__ = proto;
          else
            set(O, proto);
          return O;
        };
      }();
      $define(STATIC, OBJECT, objectStatic);
      function asinh(x) {
        return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : log(x + sqrt(x * x + 1));
      }
      $define(STATIC, NUMBER, {
        EPSILON: pow(2, -52),
        isFinite: function(it) {
          return typeof it == 'number' && isFinite(it);
        },
        isInteger: isInteger,
        isNaN: sameNaN,
        isSafeInteger: function(number) {
          return isInteger(number) && abs(number) <= MAX_SAFE_INTEGER;
        },
        MAX_SAFE_INTEGER: MAX_SAFE_INTEGER,
        MIN_SAFE_INTEGER: -MAX_SAFE_INTEGER,
        parseFloat: parseFloat,
        parseInt: parseInt
      });
      $define(STATIC, MATH, {
        acosh: function(x) {
          return x < 1 ? NaN : log(x + sqrt(x * x - 1));
        },
        asinh: asinh,
        atanh: function(x) {
          return x == 0 ? +x : log((1 + +x) / (1 - x)) / 2;
        },
        cbrt: function(x) {
          return sign(x) * pow(abs(x), 1 / 3);
        },
        clz32: function(x) {
          return (x >>>= 0) ? 32 - x[TO_STRING](2).length : 32;
        },
        cosh: function(x) {
          return (exp(x) + exp(-x)) / 2;
        },
        expm1: function(x) {
          return x == 0 ? +x : x > -1e-6 && x < 1e-6 ? +x + x * x / 2 : exp(x) - 1;
        },
        fround: function(x) {
          return new Float32Array([x])[0];
        },
        hypot: function(value1, value2) {
          var sum = 0,
              length = arguments.length,
              value;
          while (length--) {
            value = +arguments[length];
            if (value == Infinity || value == -Infinity)
              return Infinity;
            sum += value * value;
          }
          return sqrt(sum);
        },
        imul: function(x, y) {
          var UInt16 = 0xffff,
              xl = UInt16 & x,
              yl = UInt16 & y;
          return 0 | xl * yl + ((UInt16 & x >>> 16) * yl + xl * (UInt16 & y >>> 16) << 16 >>> 0);
        },
        log1p: function(x) {
          return x > -1e-8 && x < 1e-8 ? x - x * x / 2 : log(1 + +x);
        },
        log10: function(x) {
          return log(x) / Math.LN10;
        },
        log2: function(x) {
          return log(x) / Math.LN2;
        },
        sign: sign,
        sinh: function(x) {
          return x == 0 ? +x : (exp(x) - exp(-x)) / 2;
        },
        tanh: function(x) {
          return isFinite(x) ? x == 0 ? +x : (exp(x) - exp(-x)) / (exp(x) + exp(-x)) : sign(x);
        },
        trunc: trunc
      });
      setToStringTag(Math, MATH, true);
      function assertNotRegExp(it) {
        if (isObject(it) && it instanceof RegExp)
          throw TypeError();
      }
      $define(STATIC, STRING, {
        fromCodePoint: function(x) {
          var res = [],
              len = arguments.length,
              i = 0,
              code;
          while (len > i) {
            code = +arguments[i++];
            if (toIndex(code, 0x10ffff) !== code)
              throw RangeError(code + ' is not a valid code point');
            res.push(code < 0x10000 ? fcc(code) : fcc(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00));
          }
          return res.join('');
        },
        raw: function(callSite) {
          var raw = ES5Object(assertDefined(callSite.raw)),
              len = toLength(raw.length),
              sln = arguments.length,
              res = [],
              i = 0;
          while (len > i) {
            res.push(String(raw[i++]));
            if (i < sln)
              res.push(String(arguments[i]));
          }
          return res.join('');
        }
      });
      $define(PROTO, STRING, {
        codePointAt: createPointAt(false),
        endsWith: function(searchString) {
          assertNotRegExp(searchString);
          var that = String(assertDefined(this)),
              endPosition = arguments[1],
              len = toLength(that.length),
              end = endPosition === undefined ? len : min(toLength(endPosition), len);
          searchString += '';
          return that.slice(end - searchString.length, end) === searchString;
        },
        includes: function(searchString) {
          assertNotRegExp(searchString);
          return !!~String(assertDefined(this)).indexOf(searchString, arguments[1]);
        },
        repeat: function(count) {
          var str = String(assertDefined(this)),
              res = '',
              n = toInteger(count);
          if (0 > n || n == Infinity)
            throw RangeError("Count can't be negative");
          for (; n > 0; (n >>>= 1) && (str += str))
            if (n & 1)
              res += str;
          return res;
        },
        startsWith: function(searchString) {
          assertNotRegExp(searchString);
          var that = String(assertDefined(this)),
              index = toLength(min(arguments[1], that.length));
          searchString += '';
          return that.slice(index, index + searchString.length) === searchString;
        }
      });
      defineStdIterators(String, STRING, function(iterated) {
        set(this, ITER, {
          o: String(iterated),
          i: 0
        });
      }, function() {
        var iter = this[ITER],
            O = iter.o,
            index = iter.i,
            point;
        if (index >= O.length)
          return iterResult(1);
        point = at.call(O, index);
        iter.i += point.length;
        return iterResult(0, point);
      });
      $define(STATIC, ARRAY, {
        from: function(arrayLike) {
          var O = Object(assertDefined(arrayLike)),
              result = new (generic(this, Array)),
              mapfn = arguments[1],
              that = arguments[2],
              mapping = mapfn !== undefined,
              f = mapping ? ctx(mapfn, that, 2) : undefined,
              index = 0,
              length;
          if (isIterable(O))
            for (var iter = getIterator(O),
                step; !(step = iter.next()).done; index++) {
              result[index] = mapping ? f(step.value, index) : step.value;
            }
          else
            for (length = toLength(O.length); length > index; index++) {
              result[index] = mapping ? f(O[index], index) : O[index];
            }
          result.length = index;
          return result;
        },
        of: function() {
          var index = 0,
              length = arguments.length,
              result = new (generic(this, Array))(length);
          while (length > index)
            result[index] = arguments[index++];
          result.length = length;
          return result;
        }
      });
      $define(PROTO, ARRAY, {
        copyWithin: function(target, start) {
          var O = Object(assertDefined(this)),
              len = toLength(O.length),
              to = toIndex(target, len),
              from = toIndex(start, len),
              end = arguments[2],
              fin = end === undefined ? len : toIndex(end, len),
              count = min(fin - from, len - to),
              inc = 1;
          if (from < to && to < from + count) {
            inc = -1;
            from = from + count - 1;
            to = to + count - 1;
          }
          while (count-- > 0) {
            if (from in O)
              O[to] = O[from];
            else
              delete O[to];
            to += inc;
            from += inc;
          }
          return O;
        },
        fill: function(value) {
          var O = Object(assertDefined(this)),
              length = toLength(O.length),
              index = toIndex(arguments[1], length),
              end = arguments[2],
              endPos = end === undefined ? length : toIndex(end, length);
          while (endPos > index)
            O[index++] = value;
          return O;
        },
        find: createArrayMethod(5),
        findIndex: createArrayMethod(6)
      });
      defineStdIterators(Array, ARRAY, function(iterated, kind) {
        set(this, ITER, {
          o: ES5Object(iterated),
          i: 0,
          k: kind
        });
      }, function() {
        var iter = this[ITER],
            O = iter.o,
            kind = iter.k,
            index = iter.i++;
        if (!O || index >= O.length)
          return iter.o = undefined, iterResult(1);
        if (kind == KEY)
          return iterResult(0, index);
        if (kind == VALUE)
          return iterResult(0, O[index]);
        return iterResult(0, [index, O[index]]);
      }, VALUE);
      Iterators[ARGUMENTS] = Iterators[ARRAY];
      setToStringTag(global.JSON, 'JSON', true);
      if (framework) {
        tmp[SYMBOL_TAG] = DOT;
        if (cof(tmp) != DOT)
          hidden(ObjectProto, TO_STRING, function() {
            return '[object ' + classof(this) + ']';
          });
        if (/./g.flags != 'g')
          defineProperty(RegExp[PROTOTYPE], 'flags', {
            configurable: true,
            get: createReplacer(/^.*\/(\w*)$/, '$1')
          });
      }
    }(isFinite, {});
    isFunction(setImmediate) && isFunction(clearImmediate) || function(ONREADYSTATECHANGE) {
      var postMessage = global.postMessage,
          addEventListener = global.addEventListener,
          MessageChannel = global.MessageChannel,
          counter = 0,
          queue = {},
          defer,
          channel,
          port;
      setImmediate = function(fn) {
        var args = [],
            i = 1;
        while (arguments.length > i)
          args.push(arguments[i++]);
        queue[++counter] = function() {
          invoke(isFunction(fn) ? fn : Function(fn), args);
        };
        defer(counter);
        return counter;
      };
      clearImmediate = function(id) {
        delete queue[id];
      };
      function run(id) {
        if (has(queue, id)) {
          var fn = queue[id];
          delete queue[id];
          fn();
        }
      }
      function listner(event) {
        run(event.data);
      }
      if (NODE) {
        defer = function(id) {
          nextTick(part.call(run, id));
        };
      } else if (addEventListener && isFunction(postMessage) && !global.importScripts) {
        defer = function(id) {
          postMessage(id, '*');
        };
        addEventListener('message', listner, false);
      } else if (isFunction(MessageChannel)) {
        channel = new MessageChannel;
        port = channel.port2;
        channel.port1.onmessage = listner;
        defer = ctx(port.postMessage, port, 1);
      } else if (document && ONREADYSTATECHANGE in document[CREATE_ELEMENT]('script')) {
        defer = function(id) {
          html.appendChild(document[CREATE_ELEMENT]('script'))[ONREADYSTATECHANGE] = function() {
            html.removeChild(this);
            run(id);
          };
        };
      } else {
        defer = function(id) {
          setTimeout(part.call(run, id), 0);
        };
      }
    }('onreadystatechange');
    $define(GLOBAL + BIND, {
      setImmediate: setImmediate,
      clearImmediate: clearImmediate
    });
    !function(Promise, test) {
      isFunction(Promise) && isFunction(Promise.resolve) && Promise.resolve(test = new Promise(Function())) == test || function(asap, DEF) {
        function isThenable(o) {
          var then;
          if (isObject(o))
            then = o.then;
          return isFunction(then) ? then : false;
        }
        function notify(def) {
          var chain = def.chain;
          chain.length && asap(function() {
            var msg = def.msg,
                ok = def.state == 1,
                i = 0;
            while (chain.length > i)
              !function(react) {
                var cb = ok ? react.ok : react.fail,
                    ret,
                    then;
                try {
                  if (cb) {
                    ret = cb === true ? msg : cb(msg);
                    if (ret === react.P) {
                      react.rej(TypeError(PROMISE + '-chain cycle'));
                    } else if (then = isThenable(ret)) {
                      then.call(ret, react.res, react.rej);
                    } else
                      react.res(ret);
                  } else
                    react.rej(msg);
                } catch (err) {
                  react.rej(err);
                }
              }(chain[i++]);
            chain.length = 0;
          });
        }
        function resolve(msg) {
          var def = this,
              then,
              wrapper;
          if (def.done)
            return;
          def.done = true;
          def = def.def || def;
          try {
            if (then = isThenable(msg)) {
              wrapper = {
                def: def,
                done: false
              };
              then.call(msg, ctx(resolve, wrapper, 1), ctx(reject, wrapper, 1));
            } else {
              def.msg = msg;
              def.state = 1;
              notify(def);
            }
          } catch (err) {
            reject.call(wrapper || {
              def: def,
              done: false
            }, err);
          }
        }
        function reject(msg) {
          var def = this;
          if (def.done)
            return;
          def.done = true;
          def = def.def || def;
          def.msg = msg;
          def.state = 2;
          notify(def);
        }
        Promise = function(executor) {
          assertFunction(executor);
          assertInstance(this, Promise, PROMISE);
          var def = {
            chain: [],
            state: 0,
            done: false,
            msg: undefined
          };
          hidden(this, DEF, def);
          try {
            executor(ctx(resolve, def, 1), ctx(reject, def, 1));
          } catch (err) {
            reject.call(def, err);
          }
        };
        assignHidden(Promise[PROTOTYPE], {
          then: function(onFulfilled, onRejected) {
            var react = {
              ok: isFunction(onFulfilled) ? onFulfilled : true,
              fail: isFunction(onRejected) ? onRejected : false
            },
                P = react.P = new this[CONSTRUCTOR](function(resolve, reject) {
                  react.res = assertFunction(resolve);
                  react.rej = assertFunction(reject);
                }),
                def = this[DEF];
            def.chain.push(react);
            def.state && notify(def);
            return P;
          },
          'catch': function(onRejected) {
            return this.then(undefined, onRejected);
          }
        });
        assignHidden(Promise, {
          all: function(iterable) {
            var Promise = this,
                values = [];
            return new Promise(function(resolve, reject) {
              forOf(iterable, false, push, values);
              var remaining = values.length,
                  results = Array(remaining);
              if (remaining)
                forEach.call(values, function(promise, index) {
                  Promise.resolve(promise).then(function(value) {
                    results[index] = value;
                    --remaining || resolve(results);
                  }, reject);
                });
              else
                resolve(results);
            });
          },
          race: function(iterable) {
            var Promise = this;
            return new Promise(function(resolve, reject) {
              forOf(iterable, false, function(promise) {
                Promise.resolve(promise).then(resolve, reject);
              });
            });
          },
          reject: function(r) {
            return new this(function(resolve, reject) {
              reject(r);
            });
          },
          resolve: function(x) {
            return isObject(x) && getPrototypeOf(x) === this[PROTOTYPE] ? x : new this(function(resolve, reject) {
              resolve(x);
            });
          }
        });
      }(nextTick || setImmediate, safeSymbol('def'));
      setToStringTag(Promise, PROMISE);
      $define(GLOBAL + FORCED * !isNative(Promise), {Promise: Promise});
    }(global[PROMISE]);
    !function() {
      var UID = safeSymbol('uid'),
          DATA = safeSymbol('data'),
          WEAK = safeSymbol('weak'),
          LAST = safeSymbol('last'),
          FIRST = safeSymbol('first'),
          SIZE = DESC ? safeSymbol('size') : 'size',
          uid = 0;
      function getCollection(C, NAME, methods, commonMethods, isMap, isWeak) {
        var ADDER = isMap ? 'set' : 'add',
            proto = C && C[PROTOTYPE],
            O = {};
        function initFromIterable(that, iterable) {
          if (iterable != undefined)
            forOf(iterable, isMap, that[ADDER], that);
          return that;
        }
        function fixSVZ(key, chain) {
          var method = proto[key];
          framework && hidden(proto, key, function(a, b) {
            var result = method.call(this, a === 0 ? 0 : a, b);
            return chain ? this : result;
          });
        }
        if (!isNative(C) || !(isWeak || (!BUGGY_ITERATORS && has(proto, 'entries')))) {
          C = isWeak ? function(iterable) {
            assertInstance(this, C, NAME);
            set(this, UID, uid++);
            initFromIterable(this, iterable);
          } : function(iterable) {
            var that = this;
            assertInstance(that, C, NAME);
            set(that, DATA, create(null));
            set(that, SIZE, 0);
            set(that, LAST, undefined);
            set(that, FIRST, undefined);
            initFromIterable(that, iterable);
          };
          assignHidden(assignHidden(C[PROTOTYPE], methods), commonMethods);
          isWeak || defineProperty(C[PROTOTYPE], 'size', {get: function() {
              return assertDefined(this[SIZE]);
            }});
        } else {
          var Native = C,
              inst = new C,
              chain = inst[ADDER](isWeak ? {} : -0, 1),
              buggyZero;
          if (!NATIVE_ITERATORS || !C.length) {
            C = function(iterable) {
              assertInstance(this, C, NAME);
              return initFromIterable(new Native, iterable);
            };
            C[PROTOTYPE] = proto;
          }
          isWeak || inst[FOR_EACH](function(val, key) {
            buggyZero = 1 / key === -Infinity;
          });
          if (buggyZero) {
            fixSVZ('delete');
            fixSVZ('has');
            isMap && fixSVZ('get');
          }
          if (buggyZero || chain !== inst)
            fixSVZ(ADDER, true);
        }
        setToStringTag(C, NAME);
        O[NAME] = C;
        $define(GLOBAL + WRAP + FORCED * !isNative(C), O);
        isWeak || defineStdIterators(C, NAME, function(iterated, kind) {
          set(this, ITER, {
            o: iterated,
            k: kind
          });
        }, function() {
          var iter = this[ITER],
              O = iter.o,
              kind = iter.k,
              entry = iter.l;
          while (entry && entry.r)
            entry = entry.p;
          if (!O || !(iter.l = entry = entry ? entry.n : O[FIRST]))
            return iter.o = undefined, iterResult(1);
          if (kind == KEY)
            return iterResult(0, entry.k);
          if (kind == VALUE)
            return iterResult(0, entry.v);
          return iterResult(0, [entry.k, entry.v]);
        }, isMap ? KEY + VALUE : VALUE, !isMap);
        return C;
      }
      function fastKey(it, create) {
        if (!isObject(it))
          return (typeof it == 'string' ? 'S' : 'P') + it;
        if (!has(it, UID)) {
          if (create)
            hidden(it, UID, ++uid);
          else
            return '';
        }
        return 'O' + it[UID];
      }
      function def(that, key, value) {
        var index = fastKey(key, true),
            data = that[DATA],
            last = that[LAST],
            entry;
        if (index in data)
          data[index].v = value;
        else {
          entry = data[index] = {
            k: key,
            v: value,
            p: last
          };
          if (!that[FIRST])
            that[FIRST] = entry;
          if (last)
            last.n = entry;
          that[LAST] = entry;
          that[SIZE]++;
        }
        return that;
      }
      function del(that, index) {
        var data = that[DATA],
            entry = data[index],
            next = entry.n,
            prev = entry.p;
        delete data[index];
        entry.r = true;
        if (prev)
          prev.n = next;
        if (next)
          next.p = prev;
        if (that[FIRST] == entry)
          that[FIRST] = next;
        if (that[LAST] == entry)
          that[LAST] = prev;
        that[SIZE]--;
      }
      var collectionMethods = {
        clear: function() {
          for (var index in this[DATA])
            del(this, index);
        },
        'delete': function(key) {
          var index = fastKey(key),
              contains = index in this[DATA];
          if (contains)
            del(this, index);
          return contains;
        },
        forEach: function(callbackfn) {
          var f = ctx(callbackfn, arguments[1], 3),
              entry;
          while (entry = entry ? entry.n : this[FIRST]) {
            f(entry.v, entry.k, this);
            while (entry && entry.r)
              entry = entry.p;
          }
        },
        has: function(key) {
          return fastKey(key) in this[DATA];
        }
      };
      Map = getCollection(Map, MAP, {
        get: function(key) {
          var entry = this[DATA][fastKey(key)];
          return entry && entry.v;
        },
        set: function(key, value) {
          return def(this, key === 0 ? 0 : key, value);
        }
      }, collectionMethods, true);
      Set = getCollection(Set, SET, {add: function(value) {
          return def(this, value = value === 0 ? 0 : value, value);
        }}, collectionMethods);
      function setWeak(that, key, value) {
        has(assertObject(key), WEAK) || hidden(key, WEAK, {});
        key[WEAK][that[UID]] = value;
        return that;
      }
      function hasWeak(key) {
        return isObject(key) && has(key, WEAK) && has(key[WEAK], this[UID]);
      }
      var weakMethods = {
        'delete': function(key) {
          return hasWeak.call(this, key) && delete key[WEAK][this[UID]];
        },
        has: hasWeak
      };
      WeakMap = getCollection(WeakMap, WEAKMAP, {
        get: function(key) {
          if (isObject(key) && has(key, WEAK))
            return key[WEAK][this[UID]];
        },
        set: function(key, value) {
          return setWeak(this, key, value);
        }
      }, weakMethods, true, true);
      WeakSet = getCollection(WeakSet, WEAKSET, {add: function(value) {
          return setWeak(this, value, true);
        }}, weakMethods, false, true);
    }();
    !function() {
      function Enumerate(iterated) {
        var keys = [],
            key;
        for (key in iterated)
          keys.push(key);
        set(this, ITER, {
          o: iterated,
          a: keys,
          i: 0
        });
      }
      createIterator(Enumerate, OBJECT, function() {
        var iter = this[ITER],
            keys = iter.a,
            key;
        do {
          if (iter.i >= keys.length)
            return iterResult(1);
        } while (!((key = keys[iter.i++]) in iter.o));
        return iterResult(0, key);
      });
      function wrap(fn) {
        return function(it) {
          assertObject(it);
          try {
            return fn.apply(undefined, arguments), true;
          } catch (e) {
            return false;
          }
        };
      }
      function reflectGet(target, propertyKey, receiver) {
        if (receiver === undefined)
          receiver = target;
        var desc = getOwnDescriptor(assertObject(target), propertyKey),
            proto;
        if (desc)
          return desc.get ? desc.get.call(receiver) : desc.value;
        return isObject(proto = getPrototypeOf(target)) ? reflectGet(proto, propertyKey, receiver) : undefined;
      }
      function reflectSet(target, propertyKey, V, receiver) {
        if (receiver === undefined)
          receiver = target;
        var desc = getOwnDescriptor(assertObject(target), propertyKey),
            proto;
        if (desc) {
          if (desc.writable === false)
            return false;
          if (desc.set)
            return desc.set.call(receiver, V), true;
        }
        if (isObject(proto = getPrototypeOf(target)))
          return reflectSet(proto, propertyKey, V, receiver);
        desc = getOwnDescriptor(receiver, propertyKey) || descriptor(0);
        desc.value = V;
        return defineProperty(receiver, propertyKey, desc), true;
      }
      var reflect = {
        apply: ctx(call, apply, 3),
        construct: construct,
        defineProperty: wrap(defineProperty),
        deleteProperty: function(target, propertyKey) {
          var desc = getOwnDescriptor(assertObject(target), propertyKey);
          return desc && !desc.configurable ? false : delete target[propertyKey];
        },
        enumerate: function(target) {
          return new Enumerate(assertObject(target));
        },
        get: reflectGet,
        getOwnPropertyDescriptor: getOwnDescriptor,
        getPrototypeOf: getPrototypeOf,
        has: function(target, propertyKey) {
          return propertyKey in target;
        },
        isExtensible: Object.isExtensible || function(target) {
          return !!assertObject(target);
        },
        ownKeys: ownKeys,
        preventExtensions: wrap(Object.preventExtensions || returnIt),
        set: reflectSet
      };
      if (setPrototypeOf)
        reflect.setPrototypeOf = function(target, proto) {
          return setPrototypeOf(assertObject(target), proto), true;
        };
      $define(GLOBAL, {Reflect: {}});
      $define(STATIC, 'Reflect', reflect);
    }();
    !function() {
      $define(PROTO, ARRAY, {includes: createArrayContains(true)});
      $define(PROTO, STRING, {at: createPointAt(true)});
      function createObjectToArray(isEntries) {
        return function(object) {
          var O = ES5Object(object),
              keys = getKeys(object),
              length = keys.length,
              i = 0,
              result = Array(length),
              key;
          if (isEntries)
            while (length > i)
              result[i] = [key = keys[i++], O[key]];
          else
            while (length > i)
              result[i] = O[keys[i++]];
          return result;
        };
      }
      $define(STATIC, OBJECT, {
        values: createObjectToArray(false),
        entries: createObjectToArray(true)
      });
      $define(STATIC, REGEXP, {escape: createReplacer(/([\\\-[\]{}()*+?.,^$|])/g, '\\$1', true)});
    }();
    !function(REFERENCE) {
      REFERENCE_GET = getWellKnownSymbol(REFERENCE + 'Get', true);
      var REFERENCE_SET = getWellKnownSymbol(REFERENCE + SET, true),
          REFERENCE_DELETE = getWellKnownSymbol(REFERENCE + 'Delete', true);
      $define(STATIC, SYMBOL, {
        referenceGet: REFERENCE_GET,
        referenceSet: REFERENCE_SET,
        referenceDelete: REFERENCE_DELETE
      });
      hidden(FunctionProto, REFERENCE_GET, returnThis);
      function setMapMethods(Constructor) {
        if (Constructor) {
          var MapProto = Constructor[PROTOTYPE];
          hidden(MapProto, REFERENCE_GET, MapProto.get);
          hidden(MapProto, REFERENCE_SET, MapProto.set);
          hidden(MapProto, REFERENCE_DELETE, MapProto['delete']);
        }
      }
      setMapMethods(Map);
      setMapMethods(WeakMap);
    }('reference');
    !function(DICT) {
      function Dict(iterable) {
        var dict = create(null);
        if (iterable != undefined) {
          if (isIterable(iterable)) {
            for (var iter = getIterator(iterable),
                step,
                value; !(step = iter.next()).done; ) {
              value = step.value;
              dict[value[0]] = value[1];
            }
          } else
            assign(dict, iterable);
        }
        return dict;
      }
      Dict[PROTOTYPE] = null;
      function DictIterator(iterated, kind) {
        set(this, ITER, {
          o: ES5Object(iterated),
          a: getKeys(iterated),
          i: 0,
          k: kind
        });
      }
      createIterator(DictIterator, DICT, function() {
        var iter = this[ITER],
            O = iter.o,
            keys = iter.a,
            kind = iter.k,
            key;
        do {
          if (iter.i >= keys.length)
            return iterResult(1);
        } while (!has(O, key = keys[iter.i++]));
        if (kind == KEY)
          return iterResult(0, key);
        if (kind == VALUE)
          return iterResult(0, O[key]);
        return iterResult(0, [key, O[key]]);
      });
      function createDictIter(kind) {
        return function(it) {
          return new DictIterator(it, kind);
        };
      }
      function createDictMethod(type) {
        var isMap = type == 1,
            isEvery = type == 4;
        return function(object, callbackfn, that) {
          var f = ctx(callbackfn, that, 3),
              O = ES5Object(object),
              result = isMap || type == 7 || type == 2 ? new (generic(this, Dict)) : undefined,
              key,
              val,
              res;
          for (key in O)
            if (has(O, key)) {
              val = O[key];
              res = f(val, key, object);
              if (type) {
                if (isMap)
                  result[key] = res;
                else if (res)
                  switch (type) {
                    case 2:
                      result[key] = val;
                      break;
                    case 3:
                      return true;
                    case 5:
                      return val;
                    case 6:
                      return key;
                    case 7:
                      result[res[0]] = res[1];
                  }
                else if (isEvery)
                  return false;
              }
            }
          return type == 3 || isEvery ? isEvery : result;
        };
      }
      function createDictReduce(isTurn) {
        return function(object, mapfn, init) {
          assertFunction(mapfn);
          var O = ES5Object(object),
              keys = getKeys(O),
              length = keys.length,
              i = 0,
              memo,
              key,
              result;
          if (isTurn)
            memo = init == undefined ? new (generic(this, Dict)) : Object(init);
          else if (arguments.length < 3) {
            assert(length, REDUCE_ERROR);
            memo = O[keys[i++]];
          } else
            memo = Object(init);
          while (length > i)
            if (has(O, key = keys[i++])) {
              result = mapfn(memo, O[key], key, object);
              if (isTurn) {
                if (result === false)
                  break;
              } else
                memo = result;
            }
          return memo;
        };
      }
      var findKey = createDictMethod(6);
      function includes(object, el) {
        return (el == el ? keyOf(object, el) : findKey(object, sameNaN)) !== undefined;
      }
      var dictMethods = {
        keys: createDictIter(KEY),
        values: createDictIter(VALUE),
        entries: createDictIter(KEY + VALUE),
        forEach: createDictMethod(0),
        map: createDictMethod(1),
        filter: createDictMethod(2),
        some: createDictMethod(3),
        every: createDictMethod(4),
        find: createDictMethod(5),
        findKey: findKey,
        mapPairs: createDictMethod(7),
        reduce: createDictReduce(false),
        turn: createDictReduce(true),
        keyOf: keyOf,
        includes: includes,
        has: has,
        get: get,
        set: createDefiner(0),
        isDict: function(it) {
          return isObject(it) && getPrototypeOf(it) === Dict[PROTOTYPE];
        }
      };
      if (REFERENCE_GET)
        for (var key in dictMethods)
          !function(fn) {
            function method() {
              for (var args = [this],
                  i = 0; i < arguments.length; )
                args.push(arguments[i++]);
              return invoke(fn, args);
            }
            fn[REFERENCE_GET] = function() {
              return method;
            };
          }(dictMethods[key]);
      $define(GLOBAL + FORCED, {Dict: assignHidden(Dict, dictMethods)});
    }('Dict');
    !function(ENTRIES, FN) {
      function $for(iterable, entries) {
        if (!(this instanceof $for))
          return new $for(iterable, entries);
        this[ITER] = getIterator(iterable);
        this[ENTRIES] = !!entries;
      }
      createIterator($for, 'Wrapper', function() {
        return this[ITER].next();
      });
      var $forProto = $for[PROTOTYPE];
      setIterator($forProto, function() {
        return this[ITER];
      });
      function createChainIterator(next) {
        function Iter(I, fn, that) {
          this[ITER] = getIterator(I);
          this[ENTRIES] = I[ENTRIES];
          this[FN] = ctx(fn, that, I[ENTRIES] ? 2 : 1);
        }
        createIterator(Iter, 'Chain', next, $forProto);
        setIterator(Iter[PROTOTYPE], returnThis);
        return Iter;
      }
      var MapIter = createChainIterator(function() {
        var step = this[ITER].next();
        return step.done ? step : iterResult(0, stepCall(this[FN], step.value, this[ENTRIES]));
      });
      var FilterIter = createChainIterator(function() {
        for (; ; ) {
          var step = this[ITER].next();
          if (step.done || stepCall(this[FN], step.value, this[ENTRIES]))
            return step;
        }
      });
      assignHidden($forProto, {
        of: function(fn, that) {
          forOf(this, this[ENTRIES], fn, that);
        },
        array: function(fn, that) {
          var result = [];
          forOf(fn != undefined ? this.map(fn, that) : this, false, push, result);
          return result;
        },
        filter: function(fn, that) {
          return new FilterIter(this, fn, that);
        },
        map: function(fn, that) {
          return new MapIter(this, fn, that);
        }
      });
      $for.isIterable = isIterable;
      $for.getIterator = getIterator;
      $define(GLOBAL + FORCED, {$for: $for});
    }('entries', safeSymbol('fn'));
    !function(MSIE) {
      function wrap(set) {
        return MSIE ? function(fn, time) {
          return set(invoke(part, slice.call(arguments, 2), isFunction(fn) ? fn : Function(fn)), time);
        } : set;
      }
      $define(GLOBAL + BIND + FORCED * MSIE, {
        setTimeout: setTimeout = wrap(setTimeout),
        setInterval: wrap(setInterval)
      });
    }(!!navigator && /MSIE .\./.test(navigator.userAgent));
    !function(_, toLocaleString) {
      core._ = path._ = path._ || {};
      $define(PROTO + FORCED, FUNCTION, {
        part: part,
        by: function(that) {
          var fn = this,
              _ = path._,
              holder = false,
              length = arguments.length,
              isThat = that === _,
              i = +!isThat,
              indent = i,
              it,
              args;
          if (isThat) {
            it = fn;
            fn = call;
          } else
            it = that;
          if (length < 2)
            return ctx(fn, it, -1);
          args = Array(length - indent);
          while (length > i)
            if ((args[i - indent] = arguments[i++]) === _)
              holder = true;
          return partial(fn, args, length, holder, _, true, it);
        },
        only: function(numberArguments, that) {
          var fn = assertFunction(this),
              n = toLength(numberArguments),
              isThat = arguments.length > 1;
          return function() {
            var length = min(n, arguments.length),
                args = Array(length),
                i = 0;
            while (length > i)
              args[i] = arguments[i++];
            return invoke(fn, args, isThat ? that : this);
          };
        }
      });
      function tie(key) {
        var that = this,
            bound = {};
        return hidden(that, _, function(key) {
          if (key === undefined || !(key in that))
            return toLocaleString.call(that);
          return has(bound, key) ? bound[key] : (bound[key] = ctx(that[key], that, -1));
        })[_](key);
      }
      hidden(path._, TO_STRING, function() {
        return _;
      });
      hidden(ObjectProto, _, tie);
      DESC || hidden(ArrayProto, _, tie);
    }(DESC ? uid('tie') : TO_LOCALE, ObjectProto[TO_LOCALE]);
    !function() {
      function define(target, mixin) {
        var keys = ownKeys(ES5Object(mixin)),
            length = keys.length,
            i = 0,
            key;
        while (length > i)
          defineProperty(target, key = keys[i++], getOwnDescriptor(mixin, key));
        return target;
      }
      ;
      $define(STATIC + FORCED, OBJECT, {
        isObject: isObject,
        classof: classof,
        define: define,
        make: function(proto, mixin) {
          return define(create(proto), mixin);
        }
      });
    }();
    $define(PROTO + FORCED, ARRAY, {turn: function(fn, target) {
        assertFunction(fn);
        var memo = target == undefined ? [] : Object(target),
            O = ES5Object(this),
            length = toLength(O.length),
            index = 0;
        while (length > index)
          if (fn(memo, O[index], index++, this) === false)
            break;
        return memo;
      }});
    !function(arrayStatics) {
      function setArrayStatics(keys, length) {
        forEach.call(array(keys), function(key) {
          if (key in ArrayProto)
            arrayStatics[key] = ctx(call, ArrayProto[key], length);
        });
      }
      setArrayStatics('pop,reverse,shift,keys,values,entries', 1);
      setArrayStatics('indexOf,every,some,forEach,map,filter,find,findIndex,includes', 3);
      setArrayStatics('join,slice,concat,push,splice,unshift,sort,lastIndexOf,' + 'reduce,reduceRight,copyWithin,fill,turn');
      $define(STATIC, ARRAY, arrayStatics);
    }({});
    !function(numberMethods) {
      function NumberIterator(iterated) {
        set(this, ITER, {
          l: toLength(iterated),
          i: 0
        });
      }
      createIterator(NumberIterator, NUMBER, function() {
        var iter = this[ITER],
            i = iter.i++;
        return i < iter.l ? iterResult(0, i) : iterResult(1);
      });
      defineIterator(Number, NUMBER, function() {
        return new NumberIterator(this);
      });
      numberMethods.random = function(lim) {
        var a = +this,
            b = lim == undefined ? 0 : +lim,
            m = min(a, b);
        return random() * (max(a, b) - m) + m;
      };
      forEach.call(array('round,floor,ceil,abs,sin,asin,cos,acos,tan,atan,exp,sqrt,max,min,pow,atan2,' + 'acosh,asinh,atanh,cbrt,clz32,cosh,expm1,hypot,imul,log1p,log10,log2,sign,sinh,tanh,trunc'), function(key) {
        var fn = Math[key];
        if (fn)
          numberMethods[key] = function() {
            var args = [+this],
                i = 0;
            while (arguments.length > i)
              args.push(arguments[i++]);
            return invoke(fn, args);
          };
      });
      $define(PROTO + FORCED, NUMBER, numberMethods);
    }({});
    !function() {
      var escapeHTMLDict = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&apos;'
      },
          unescapeHTMLDict = {},
          key;
      for (key in escapeHTMLDict)
        unescapeHTMLDict[escapeHTMLDict[key]] = key;
      $define(PROTO + FORCED, STRING, {
        escapeHTML: createReplacer(/[&<>"']/g, escapeHTMLDict),
        unescapeHTML: createReplacer(/&(?:amp|lt|gt|quot|apos);/g, unescapeHTMLDict)
      });
    }();
    !function(formatRegExp, flexioRegExp, locales, current, SECONDS, MINUTES, HOURS, MONTH, YEAR) {
      function createFormat(prefix) {
        return function(template, locale) {
          var that = this,
              dict = locales[has(locales, locale) ? locale : current];
          function get(unit) {
            return that[prefix + unit]();
          }
          return String(template).replace(formatRegExp, function(part) {
            switch (part) {
              case 's':
                return get(SECONDS);
              case 'ss':
                return lz(get(SECONDS));
              case 'm':
                return get(MINUTES);
              case 'mm':
                return lz(get(MINUTES));
              case 'h':
                return get(HOURS);
              case 'hh':
                return lz(get(HOURS));
              case 'D':
                return get(DATE);
              case 'DD':
                return lz(get(DATE));
              case 'W':
                return dict[0][get('Day')];
              case 'N':
                return get(MONTH) + 1;
              case 'NN':
                return lz(get(MONTH) + 1);
              case 'M':
                return dict[2][get(MONTH)];
              case 'MM':
                return dict[1][get(MONTH)];
              case 'Y':
                return get(YEAR);
              case 'YY':
                return lz(get(YEAR) % 100);
            }
            return part;
          });
        };
      }
      function lz(num) {
        return num > 9 ? num : '0' + num;
      }
      function addLocale(lang, locale) {
        function split(index) {
          var result = [];
          forEach.call(array(locale.months), function(it) {
            result.push(it.replace(flexioRegExp, '$' + index));
          });
          return result;
        }
        locales[lang] = [array(locale.weekdays), split(1), split(2)];
        return core;
      }
      $define(PROTO + FORCED, DATE, {
        format: createFormat('get'),
        formatUTC: createFormat('getUTC')
      });
      addLocale(current, {
        weekdays: 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday',
        months: 'January,February,March,April,May,June,July,August,September,October,November,December'
      });
      addLocale('ru', {
        weekdays: 'Воскресенье,Понедельник,Вторник,Среда,Четверг,Пятница,Суббота',
        months: 'Январ:я|ь,Феврал:я|ь,Март:а|,Апрел:я|ь,Ма:я|й,Июн:я|ь,' + 'Июл:я|ь,Август:а|,Сентябр:я|ь,Октябр:я|ь,Ноябр:я|ь,Декабр:я|ь'
      });
      core.locale = function(locale) {
        return has(locales, locale) ? current = locale : current;
      };
      core.addLocale = addLocale;
    }(/\b\w\w?\b/g, /:(.*)\|(.*)$/, {}, 'en', 'Seconds', 'Minutes', 'Hours', 'Month', 'FullYear');
    !function(console, enabled) {
      var _console = {
        enable: function() {
          enabled = true;
        },
        disable: function() {
          enabled = false;
        }
      };
      forEach.call(array('assert,clear,count,debug,dir,dirxml,error,exception,group,' + 'groupCollapsed,groupEnd,info,isIndependentlyComposed,log,markTimeline,profile,' + 'profileEnd,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn'), function(key) {
        var fn = console[key];
        _console[key] = function() {
          if (enabled && fn)
            return apply.call(fn, console, arguments);
        };
      });
      try {
        framework && delete global.console;
      } catch (e) {}
      $define(GLOBAL + FORCED, {console: _console});
    }(global.console || {}, true);
  }(Function('return this'), false);
})(require("github:jspm/nodelibs@0.0.8/process"));
