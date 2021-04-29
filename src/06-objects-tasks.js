/* ************************************************************************************************
 *                                                                                                *
 * Plese read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Returns the rectagle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.getArea = function getArea() {
    return this.width * this.height;
  };
  return this;
}


/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}


/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  function Wrapper(params) {
    Object.assign(this, params);
  }
  Wrapper.prototype = proto;

  return new Wrapper(JSON.parse(json));
}


/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurences
 *
 * All types of selectors can be combined using the combinators ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string repsentation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

function Element() {
  const flags = {
    el: false,
    id: false,
    class: false,
    attribute: false,
    pseudoClass: false,
    pseudoEl: false,
  };
  let string = '';
  // const order = ['element', 'id', 'class', 'attribute', 'pseudo-class', 'pseudo-element'];
  // const invoked = [];
  return {
    element(el) {
      if (flags.el === true) {
        throw Error('Element, id and pseudo-element should not occur more then one time inside the selector');
      }
      if (flags.id || flags.class || flags.attribute || flags.pseudoClass || flags.pseudoEl) {
        throw Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
      }
      flags.el = true;
      string += el;
      return this;
    },

    id(value) {
      if (flags.id === true) {
        throw Error('Element, id and pseudo-element should not occur more then one time inside the selector');
      }
      if (flags.class || flags.attribute || flags.pseudoClass || flags.pseudoEl) {
        throw Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
      }
      flags.id = true;
      string += `#${value}`;
      return this;
    },

    class(value) {
      if (flags.attribute || flags.pseudoClass || flags.pseudoEl) {
        throw Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
      }
      flags.class = true;
      string += `.${value}`;
      return this;
    },

    attr(value) {
      if (flags.pseudoClass || flags.pseudoEl) {
        throw Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
      }
      flags.attribute = true;
      string += `[${value}]`;
      return this;
    },

    pseudoClass(value) {
      if (flags.pseudoEl) {
        throw Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
      }
      flags.pseudoClass = true;
      string += `:${value}`;
      return this;
    },

    pseudoElement(value) {
      if (flags.pseudoEl === true) {
        throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
      }
      flags.pseudoEl = true;
      string += `::${value}`;
      return this;
    },

    stringify() {
      const temp = string;
      string = '';
      return temp;
    },
  };
}

const cssSelectorBuilder = {
  string: '',

  element(el) {
    const selector = new Element();
    selector.element(el);
    return selector;
  },

  id(value) {
    const selector = new Element();
    selector.id(value);
    return selector;
  },

  class(value) {
    const selector = new Element();
    selector.class(value);
    return selector;
  },

  attr(value) {
    const selector = new Element();
    selector.attr(value);
    return selector;
  },

  pseudoClass(value) {
    const selector = new Element();
    selector.pseudoClass(value);
    return selector;
  },

  pseudoElement(value) {
    const selector = new Element();
    selector.pseudoElement(value);
    return selector;
  },

  stringify() {
    const temp = this.string;
    this.string = '';
    return temp;
  },

  combine(selector1, combinator, selector2) {
    if (this.string === '') {
      this.string = `${selector1.stringify()} ${combinator} ${selector2.stringify()}`;
    } else {
      const right = this.string;
      this.string = `${selector1.stringify()} ${combinator} ${right}`;
    }

    return this;
  },
};


module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  cssSelectorBuilder,
};
