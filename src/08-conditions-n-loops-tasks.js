/* *************************************************************************************************
 *                                                                                                *
 * Plese read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling  *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration              *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Returns the 'Fizz','Buzz' or an original number using the following rules:
 * 1) return original number
 * 2) but if number multiples of three return 'Fizz'
 * 3) for the multiples of five return 'Buzz'
 * 4) for numbers which are multiples of both three and five return 'FizzBuzz'
 *
 * @param {number} num
 * @return {any}
 *
 * @example
 *   2 =>  2
 *   3 => 'Fizz'
 *   5 => 'Buzz'
 *   4 => 4
 *  15 => 'FizzBuzz'
 *  20 => 'Buzz'
 *  21 => 'Fizz'
 *
 */
function getFizzBuzz(num) {
  if (num % 3 && num % 5) {
    return num;
  }
  let str = '';
  if (num % 3 === 0) {
    str += 'Fizz';
  }
  if (num % 5 === 0) {
    str += 'Buzz';
  }
  return str;
}


/**
 * Returns the factorial of the specified integer n.
 *
 * @param {number} n
 * @return {number}
 *
 * @example:
 *   1  => 1
 *   5  => 120
 *   10 => 3628800
 */
function getFactorial(n) {
  if (n === 1) {
    return n;
  }
  return n * getFactorial(n - 1);
}


/**
 * Returns the sum of integer numbers between n1 and n2 (inclusive).
 *
 * @param {number} n1
 * @param {number} n2
 * @return {number}
 *
 * @example:
 *   1,2   =>  3  ( = 1+2 )
 *   5,10  =>  45 ( = 5+6+7+8+9+10 )
 *   -1,1  =>  0  ( = -1 + 0 + 1 )
 */
function getSumBetweenNumbers(n1, n2) {
  let acc = 0;
  for (let index = n1; index <= n2; index += 1) {
    acc += index;
  }
  return acc;
}


/**
 * Returns true, if a triangle can be built with the specified sides a, b, c
 * and false in any other ways.
 *
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {bool}
 *
 * @example:
 *   1,2,3    =>  false
 *   3,4,5    =>  true
 *   10,1,1   =>  false
 *   10,10,10 =>  true
 */
function isTriangle(a, b, c) {
  const ab = a + b;
  const ac = a + c;
  const bc = b + c;

  if (ab <= c || ac <= b || bc <= a) {
    return false;
  }
  return true;
}


/**
 * Returns true, if two specified axis-aligned rectangles overlap, otherwise false.
 * Each rectangle representing by object
 *  {
 *     top: 5,
 *     left: 5,
 *     width: 20,
 *     height: 10
 *  }
 *
 *  (5;5)
 *    a-------------b
 *     |           |
 *     |           |  height = 10
 *    d-------------c
 *        width=20
 *
 * NOTE: Please use canvas coordinate space (https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#The_grid),
 * it differs from Cartesian coordinate system.
 *
 * @param {object} rect1
 * @param {object} rect2
 * @return {bool}
 *
 * @example:
 *   { top: 0, left: 0, width: 10, height: 10 },
 *   { top: 5, left: 5, width: 20, height: 20 }    =>  true
 *
 *   { top: 0, left: 0, width: 10, height: 10 },
 *   { top:20, left:20, width: 20, height: 20 }    =>  false
 *
 */
function doRectanglesOverlap(rect1, rect2) {
  const A = {
    a: [rect1.left, rect1.top],
    b: [rect1.left + rect1.width, rect1.top],
    c: [rect1.left + rect1.width, rect1.top + rect1.height],
    d: [rect1.left, rect1.top + rect1.height],
  };
  const B = {
    a: [rect2.left, rect2.top],
    b: [rect2.left + rect2.width, rect2.top],
    c: [rect2.left + rect2.width, rect2.top + rect2.height],
    d: [rect2.left, rect2.top + rect2.height],
  };

  // Horizontal match
  let horizontal = false;
  if (A.b[0] > B.a[0] && B.b[0] > A.a[0]) {
    horizontal = true;
  }
  // Vertical match
  let vertical = false;
  if (A.d[1] > B.a[1] && B.d[1] > A.a[0]) {
    vertical = true;
  }

  return horizontal && vertical;
}


/**
 * Returns true, if point lies inside the circle, otherwise false.
 * Circle is an object of
 *  {
 *     center: {
 *       x: 5,
 *       y: 5
 *     },
 *     radius: 20
 *  }
 *
 * Point is object of
 *  {
 *     x: 5,
 *     y: 5
 *  }
 *
 * @param {object} circle
 * @param {object} point
 * @return {bool}
 *
 * @example:
 *   { center: { x:0, y:0 }, radius:10 },  { x:0, y:0 }     => true
 *   { center: { x:0, y:0 }, radius:10 },  { x:10, y:10 }   => false
 *
 */
function isInsideCircle(circle, point) {
  const circleX = circle.center.x;
  const circleY = circle.center.y;
  const startY = circleY <= point.y ? circleY : point.y;
  const endY = circleY <= point.y ? point.y : circleY;
  const startX = circleX <= point.x ? circleX : point.x;
  const endX = circleX <= point.x ? point.x : circleX;
  const maxRange = circle.radius * circle.radius;
  const pointRange = (endX - startX) ** 2 + (endY - startY) ** 2;
  return maxRange > pointRange;
}


/**
 * Returns the first non repeated char in the specified strings otherwise returns null.
 *
 * @param {string} str
 * @return {string}
 *
 * @example:
 *   'The quick brown fox jumps over the lazy dog' => 'T'
 *   'abracadabra'  => 'c'
 *   'entente' => null
 */
function findFirstSingleChar(str) {
  const dict = {};
  return str
    .split('')
    .map((char) => {
      if (dict[char] === undefined) {
        dict[char] = 1;
      } else {
        dict[char] += 1;
      }
      return char;
    })
    .filter((char) => {
      if (dict[char] === 1) {
        return true;
      }
      return false;
    })
    .shift();
}


/**
 * Returns the string representation of math interval,
 * specified by two points and include / exclude flags.
 * See the details: https://en.wikipedia.org/wiki/Interval_(mathematics)
 *
 * Please take attention, that the smaller number should be the first in the notation
 *
 * @param {number} a
 * @param {number} b
 * @param {bool} isStartIncluded
 * @param {bool} isEndIncluded
 * @return {string}
 *
 * @example
 *   0, 1, true, true   => '[0, 1]'
 *   0, 1, true, false  => '[0, 1)'
 *   0, 1, false, true  => '(0, 1]'
 *   0, 1, false, false => '(0, 1)'
 * Smaller number has to be first :
 *   5, 3, true, true   => '[3, 5]'
 *
 */
function getIntervalString(a, b, isStartIncluded, isEndIncluded) {
  const left = isStartIncluded ? '[' : '(';
  const right = isEndIncluded ? ']' : ')';
  return `${left}${a < b ? a : b}, ${a < b ? b : a}${right}`;
}


/**
 * Reverse the specified string (put all chars in reverse order)
 *
 * @param {string} str
 * @return {string}
 *
 * @example:
 * 'The quick brown fox jumps over the lazy dog' => 'god yzal eht revo spmuj xof nworb kciuq ehT'
 * 'abracadabra' => 'arbadacarba'
 * 'rotator' => 'rotator'
 * 'noon' => 'noon'
 */
function reverseString(str) {
  return str.split('').reverse().join('');
}


/**
 * Reverse the specified integer number (put all digits in reverse order)
 *
 * @param {number} num
 * @return {number}
 *
 * @example:
 *   12345 => 54321
 *   1111  => 1111
 *   87354 => 45378
 *   34143 => 34143
 */
function reverseInteger(num) {
  return Number(String(num).split('').reverse().join(''));
}


/**
 * Validates the CCN (credit card number) and return true if CCN is valid
 * and false otherwise.
 *
 * See algorithm here : https://en.wikipedia.org/wiki/Luhn_algorithm
 *
 * @param {number} cnn
 * @return {boolean}
 *
 * @example:
 *   79927398713      => true
 *   4012888888881881 => true
 *   5123456789012346 => true
 *   378282246310005  => true
 *   371449635398431  => true
 *
 *   4571234567890111 => false
 *   5436468789016589 => false
 *   4916123456789012 => false
 */
function isCreditCardNumber(ccn) {
  const nEven = String(ccn).length % 2 === 0;
  return String(ccn)
    .split('')
    .map(Number)
    .map((n, i) => {
      if ((nEven && i % 2 !== 0) || (!nEven && i % 2 === 0)) {
        return n;
      }

      const dbl = n * 2;
      if (dbl < 10) {
        return dbl;
      }

      // const firstDigit = Number.parseInt(dbl / 10, 10);
      // const secondDigit = dbl % 10;
      return dbl - 9;
    })
    .reduce((acc, n) => acc + n, 0) % 10 === 0;
}

/**
 * Returns the digital root of integer:
 *   step1 : find sum of all digits
 *   step2 : if sum > 9 then goto step1 otherwise return the sum
 *
 * @param {number} n
 * @return {number}
 *
 * @example:
 *   12345 ( 1+2+3+4+5 = 15, 1+5 = 6) => 6
 *   23456 ( 2+3+4+5+6 = 20, 2+0 = 2) => 2
 *   10000 ( 1+0+0+0+0 = 1 ) => 1
 *   165536 (1+6+5+5+3+6 = 26,  2+6 = 8) => 8
 */
function getDigitalRoot(num) {
  let root = num;

  while (root > 10) {
    root = String(root)
      .split('')
      .map(Number)
      .reduce((acc, digit) => acc + digit, 0);
  }

  return root;
}


/**
 * Returns true if the specified string has the balanced brackets and false otherwise.
 * Balanced means that is, whether it consists entirely of pairs of opening/closing brackets
 * (in that order), none of which mis-nest.
 * Brackets include [],(),{},<>
 *
 * @param {string} str
 * @return {boolean}
 *
 * @example:
 *   '' => true
 *   '[]'  => true
 *   '{}'  => true
 *   '()   => true
 *   '[[]' => false
 *   ']['  => false
 *   '[[][][[]]]' => true
 *   '[[][]][' => false
 *   '{)' = false
 *   '{[(<{[]}>)]}' = true
 */
function isBracketsBalanced(str) {
  if (str === '') {
    return true;
  }

  const stack = [];
  const left = ['[', '(', '{', '<'];
  const right = [']', ')', '}', '>'];
  const len = str.length;
  for (let i = 0; i < len; i += 1) {
    const bracket = str[i];
    const leftIndex = left.indexOf(bracket);
    const rightIndex = right.indexOf(bracket);
    // Opening bracket
    if (leftIndex > -1) {
      stack.push(bracket);
    } else {
    // Closing bracket
      // Nothing to close
      if (stack.length === 0) {
        return false;
      }
      // Get previous bracket, it has to be an opening
      const prevBracket = stack[stack.length - 1];
      // Check for a pair
      if (rightIndex === left.indexOf(prevBracket)) {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  // Empty if all brackets were closed
  return stack.length === 0;
}


/**
 * Returns the string with n-ary (binary, ternary, etc, where n <= 10)
 * representation of specified number.
 * See more about
 * https://en.wikipedia.org/wiki/Binary_number
 * https://en.wikipedia.org/wiki/Ternary_numeral_system
 * https://en.wikipedia.org/wiki/Radix
 *
 * @param {number} num
 * @param {number} n, radix of the result
 * @return {string}
 *
 * @example:
 *   1024, 2  => '10000000000'
 *   6561, 3  => '100000000'
 *    365, 2  => '101101101'
 *    365, 3  => '111112'
 *    365, 4  => '11231'
 *    365, 10 => '365'
 */
function toNaryString(num, n) {
  const dicts = [
    [],
    [],
    [0, 1],
    [0, 1, 2],
    [0, 1, 2, 3],
    [0, 1, 2, 3, 4],
    [0, 1, 2, 3, 4, 5],
    [0, 1, 2, 3, 4, 5, 6],
    [0, 1, 2, 3, 4, 5, 6, 7],
    [0, 1, 2, 3, 4, 5, 6, 7, 8],
  ];
  if (n === 10) {
    return num;
  }
  const target = dicts[n];
  const reminders = [];
  let x = num;
  while (x >= n) {
    const rem = x % n;
    const temp = x / n;
    const whole = Math.trunc(temp);
    reminders.push(target[rem]);
    x = whole;
  }

  reminders.push(target[x % n]);
  return reminders.reverse().join('');
}


/**
 * Returns the commom directory path for specified array of full filenames.
 *
 * @param {array} pathes
 * @return {string}
 *
 * @example:
 *   ['/web/images/image1.png', '/web/images/image2.png']  => '/web/images/'
 *   ['/web/assets/style.css', '/web/scripts/app.js',  'home/setting.conf'] => ''
 *   ['/web/assets/style.css', '/.bin/mocha',  '/read.me'] => '/'
 *   ['/web/favicon.ico', '/web-scripts/dump', '/webalizer/logs'] => '/'
 */
function getCommonDirectoryPath(pathes) {
  const ps = pathes.map((path) => {
    const i = path.lastIndexOf('/');
    return path.slice(0, i + 1);
  });

  const minLength = ps.reduce((acc, path) => {
    if (path.length < acc) {
      return path.length;
    }
    return acc;
  }, ps[0].length);

  if (minLength === 1) {
    return '/';
  }

  let lastMatchIndex = 0;
  for (let i = 0; i < minLength; i += 1) {
    const charToCheck = ps[0][i];
    const matches = ps.map((path) => path[i] === charToCheck);
    if (matches.includes(false)) {
      break;
    }
    lastMatchIndex += 1;
  }

  if (lastMatchIndex === 0) {
    return '';
  }
  if (lastMatchIndex === 1) {
    return '/';
  }

  const path = ps[0].slice(0, lastMatchIndex);
  const i = path.lastIndexOf('/');
  return path.slice(0, i + 1);
}

/**
 * Returns the product of two specified matrixes.
 * See details: https://en.wikipedia.org/wiki/Matrix_multiplication
 *
 * @param {array} m1
 * @param {array} m2
 * @return {array}
 *
 * @example:
 *   [[ 1, 0, 0 ],       [[ 1, 2, 3 ],           [[ 1, 2, 3 ],
 *    [ 0, 1, 0 ],   X    [ 4, 5, 6 ],     =>     [ 4, 5, 6 ],
 *    [ 0, 0, 1 ]]        [ 7, 8, 9 ]]            [ 7, 8, 9 ]]
 *
 *                        [[ 4 ],
 *   [[ 1, 2, 3]]    X     [ 5 ],          =>     [[ 32 ]]
 *                         [ 6 ]]
 *
 */
function getRow(mx, i) {
  return mx[i];
}
function getCol(mx, j) {
  return mx.map((row) => row[j]);
}

function rowByCol(row, col) {
  const v = [];
  for (let i = 0; i < row.length; i += 1) {
    v.push(row[i] * col[i]);
  }
  return v.reduce((a, x) => a + x, 0);
}

function getMatrixProduct(m1, m2) {
  const result = [];
  for (let i = 0; i < m1.length; i += 1) {
    result[i] = [];
    const row = getRow(m1, i);
    for (let j = 0; j < m2[0].length; j += 1) {
      const col = getCol(m2, j);
      result[i][j] = rowByCol(row, col);
    }
  }
  return result;
}

/**
 * Returns the evaluation of the specified tic-tac-toe position.
 * See the details: https://en.wikipedia.org/wiki/Tic-tac-toe
 *
 * Position is provides as 3x3 array with the following values: 'X','0', undefined
 * Function should return who is winner in the current position according to the game rules.
 * The result can be: 'X','0',undefined
 *
 * @param {array} position
 * @return {string}
 *
 * @example
 *
 *   [[ 'X',   ,'0' ],
 *    [    ,'X','0' ],       =>  'X'
 *    [    ,   ,'X' ]]
 *
 *   [[ '0','0','0' ],
 *    [    ,'X',    ],       =>  '0'
 *    [ 'X',   ,'X' ]]
 *
 *   [[ '0','X','0' ],
 *    [    ,'X',    ],       =>  undefined
 *    [ 'X','0','X' ]]
 *
 *   [[    ,   ,    ],
 *    [    ,   ,    ],       =>  undefined
 *    [    ,   ,    ]]
 *
 */
function evaluateTicTacToePosition(position) {
  const match = [
    // rows
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    // rows
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    // diagonals
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]],
  ];

  for (let i = 0; i < match.length; i += 1) {
    const line = match[i].map((m) => position[m[0]][m[1]]);
    const set = new Set(line);
    if (set.size === 1) {
      if (set.has('X')) {
        return 'X';
      }
      if (set.has('0')) {
        return '0';
      }
    }
  }
  return undefined;
}


module.exports = {
  getFizzBuzz,
  getFactorial,
  getSumBetweenNumbers,
  isTriangle,
  doRectanglesOverlap,
  isInsideCircle,
  findFirstSingleChar,
  getIntervalString,
  reverseString,
  reverseInteger,
  isCreditCardNumber,
  getDigitalRoot,
  isBracketsBalanced,
  toNaryString,
  getCommonDirectoryPath,
  getMatrixProduct,
  evaluateTicTacToePosition,
};
