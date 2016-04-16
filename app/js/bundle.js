(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
 * jQuery JavaScript Library v2.2.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-04-05T19:26Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var arr = [];

var document = window.document;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "2.2.3",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isPlainObject: function( obj ) {
		var key;

		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		// Not own constructor property must be Object
		if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype || {}, "isPrototypeOf" ) ) {
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {

			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf( "use strict" ) === 1 ) {
				script = document.createElement( "script" );
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {

				// Otherwise, avoid the DOM node creation, insertion
				// and removal by using an indirect global eval

				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {

						// Inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE9-10 only
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	register: function( owner, initial ) {
		var value = initial || {};

		// If it is a node unlikely to be stringify-ed or looped over
		// use plain assignment
		if ( owner.nodeType ) {
			owner[ this.expando ] = value;

		// Otherwise secure it in a non-enumerable, non-writable property
		// configurability must be true to allow the property to be
		// deleted with the delete operator
		} else {
			Object.defineProperty( owner, this.expando, {
				value: value,
				writable: true,
				configurable: true
			} );
		}
		return owner[ this.expando ];
	},
	cache: function( owner ) {

		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return an empty object.
		if ( !acceptData( owner ) ) {
			return {};
		}

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ prop ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :
			owner[ this.expando ] && owner[ this.expando ][ key ];
	},
	access: function( owner, key, value ) {
		var stored;

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase( key ) );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key === undefined ) {
			this.register( owner );

		} else {

			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );

				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {

					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;

			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <= 35-45+
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://code.google.com/p/chromium/issues/detail?id=378607
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data, camelKey;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// with the key as-is
				data = dataUser.get( elem, key ) ||

					// Try to find dashed key if it exists (gh-2779)
					// This is for 2.2.x only
					dataUser.get( elem, key.replace( rmultiDash, "-$&" ).toLowerCase() );

				if ( data !== undefined ) {
					return data;
				}

				camelKey = jQuery.camelCase( key );

				// Attempt to get data from the cache
				// with the key camelized
				data = dataUser.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			camelKey = jQuery.camelCase( key );
			this.each( function() {

				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = dataUser.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				dataUser.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf( "-" ) > -1 && data !== undefined ) {
					dataUser.set( this, key, value );
				}
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE9
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE9-11+
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android<4.1, PhantomJS<2
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android<4.1, PhantomJS<2
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0-4.3, Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY offsetX offsetY pageX pageY " +
			"screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {
	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <= 35-45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <= 35-45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {
		div.style.cssText =

			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );
	}

	jQuery.extend( support, {
		pixelPosition: function() {

			// This test is executed only once but we still do memoizing
			// since we can use the boxSizingReliable pre-computing.
			// No need to check if the test was already performed, though.
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			// We're checking for boxSizingReliableVal here instead of pixelMarginRightVal
			// since that compresses better and they're computed together anyway.
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		},
		reliableMarginRight: function() {

			// Support: Android 2.3
			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// This support function is only executed once so no memoizing is needed.
			var ret,
				marginDiv = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			marginDiv.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;box-sizing:content-box;" +
				"display:block;margin:0;border:0;padding:0";
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";
			documentElement.appendChild( container );

			ret = !parseFloat( window.getComputedStyle( marginDiv ).marginRight );

			documentElement.removeChild( container );
			div.removeChild( marginDiv );

			return ret;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );
	ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

	// Support: Opera 12.1x only
	// Fall back to style even without computed
	// computed is undefined for elems on document fragments
	if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
		ret = jQuery.style( elem, name );
	}

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// http://dev.w3.org/csswg/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE9-11+
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Support: IE11 only
	// In IE 11 fullscreen elements inside of an iframe have
	// 100x too small dimensions (gh-1764).
	if ( document.msFullscreenElement && window.top !== window ) {

		// Support: IE11 only
		// Running getBoundingClientRect on a disconnected node
		// in IE throws an error.
		if ( elem.getClientRects().length ) {
			val = Math.round( elem.getBoundingClientRect()[ name ] * 100 );
		}
	}

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = dataPriv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = dataPriv.access(
					elem,
					"olddisplay",
					defaultDisplay( elem.nodeName )
				);
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				dataPriv.set(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				style[ name ] = value;
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			dataPriv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = dataPriv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;

			dataPriv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ?
		opt.duration : opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );

	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// Handle most common string cases
					ret.replace( rreturn, "" ) :

					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// But now, this "simulate" function is used only for events
				// for which stopPropagation() is noop, so there is no need for that anymore.
				//
				// For the 1.x branch though, guard for "click" and "submit"
				// events is still used, but was moved to jQuery.event.stopPropagation function
				// because `originalEvent` should point to the original event for the constancy
				// with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" ).replace( rhash, "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE8-11+
			// IE throws exception if url is malformed, e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE8-11+
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


jQuery.expr.filters.hidden = function( elem ) {
	return !jQuery.expr.filters.visible( elem );
};
jQuery.expr.filters.visible = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	// Use OR instead of AND as the element is not visible if either is true
	// See tickets #10406 and #13132
	return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0;
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE9
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE9
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		box = elem.getBoundingClientRect();
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	},
	size: function() {
		return this.length;
	}
} );

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));

},{}],2:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:true});var etsydata={"count":32207,"results":[{"listing_id":156283831,"state":"active","user_id":5057420,"category_id":68887494,"title":"Whiskey Leather Toiletry Bag Travel Shaving Dopp Kit with Free Monogram and Optional Interior Message Gift for Man Groomsmen Groom Wedding","description":"Our leather bags will hold up to a lifetime of use. They are made with high quality, durable leather and constructed to our rigorous quality standards to provide you with a beautiful, sturdy, reliable bag.\n\nHandcrafted using high quality, vegetable tanned, full grain leather.\n\nEmbroidered initials are included in the price of all of our bags - up to 5 initials per bag, letters only. Please specify in &quot;note to seller&quot; when you place your order. Because we embroider all letters the same size, the proper formatting for initials is First, Middle, Last. We will embroider the initials in the order they are provided. If you would like your bag left blank, please let us know.\n\n- Measures 8.5&quot; wide, 3.5&quot; tall, 4&quot; deep\n- Fully lined in a water resistant nylon cloth\n- All seams are fully enclosed\n- Heavy duty YKK brass zipper closure and zipper pull\n\nOptional interior message:\n- Allow us to embroider a short (up to 30 characters – letters, numbers, standard punctuation only) message on the inside of your bag. Embroidery is done in white thread, and we can do red hearts as well. Please specify in &quot;note to seller&quot; when you place your order. \n\nPlease check Shipping & Policies tab for lead times and shipping costs","creation_tsz":1460661870,"ending_tsz":1471202670,"original_creation_tsz":1373405000,"last_modified_tsz":1460661870,"price":"65.00","currency_code":"USD","quantity":25,"tags":["gift for man","groom gift","dopp kit","shaving kit","groomsman gift","toiletry bag","travel bag","monogram","groomsmen gift","leather bag","leather","leather toiletry bag","man toiletry bag"],"category_path":["Weddings"],"category_path_ids":[68887494],"materials":["leather","200 denier nylon pack cloth","brass YKK zipper"],"shop_section_id":11504149,"featured_rank":null,"state_tsz":1460088647,"url":"https://www.etsy.com/listing/156283831/whiskey-leather-toiletry-bag-travel?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","views":57161,"num_favorers":3571,"shipping_template_id":119850794,"processing_min":5,"processing_max":5,"who_made":"collective","is_supply":"false","when_made":"made_to_order","item_weight":"8","item_weight_units":null,"item_length":"9","item_width":"6","item_height":"4","item_dimensions_unit":"in","is_private":false,"recipient":"men","occasion":"wedding","style":["Traditional","Mid Century"],"non_taxable":false,"is_customizable":true,"is_digital":false,"file_data":"","language":"en-US","has_variations":true,"taxonomy_id":1633,"taxonomy_path":["Weddings"],"used_manufacturer":false,"Images":[{"listing_image_id":774542811,"hex_code":"000000","red":0,"green":0,"blue":0,"hue":0,"saturation":0,"brightness":0,"is_black_and_white":null,"creation_tsz":1432062401,"listing_id":156283831,"rank":1,"url_75x75":"https://img1.etsystatic.com/066/0/5151494/il_75x75.774542811_t5uq.jpg","url_170x135":"https://img1.etsystatic.com/066/0/5151494/il_170x135.774542811_t5uq.jpg","url_570xN":"https://img1.etsystatic.com/066/0/5151494/il_570xN.774542811_t5uq.jpg","url_fullxfull":"https://img1.etsystatic.com/066/0/5151494/il_fullxfull.774542811_t5uq.jpg","full_height":613,"full_width":1024},{"listing_image_id":774542777,"hex_code":"000000","red":0,"green":0,"blue":0,"hue":0,"saturation":0,"brightness":0,"is_black_and_white":null,"creation_tsz":1432062401,"listing_id":156283831,"rank":2,"url_75x75":"https://img1.etsystatic.com/065/0/5151494/il_75x75.774542777_f437.jpg","url_170x135":"https://img1.etsystatic.com/065/0/5151494/il_170x135.774542777_f437.jpg","url_570xN":"https://img1.etsystatic.com/065/0/5151494/il_570xN.774542777_f437.jpg","url_fullxfull":"https://img1.etsystatic.com/065/0/5151494/il_fullxfull.774542777_f437.jpg","full_height":716,"full_width":1024},{"listing_image_id":722111187,"hex_code":"9C7661","red":156,"green":118,"blue":97,"hue":21,"saturation":37,"brightness":61,"is_black_and_white":false,"creation_tsz":1422989141,"listing_id":156283831,"rank":3,"url_75x75":"https://img1.etsystatic.com/054/0/5151494/il_75x75.722111187_by95.jpg","url_170x135":"https://img1.etsystatic.com/054/0/5151494/il_170x135.722111187_by95.jpg","url_570xN":"https://img1.etsystatic.com/054/0/5151494/il_570xN.722111187_by95.jpg","url_fullxfull":"https://img1.etsystatic.com/054/0/5151494/il_fullxfull.722111187_by95.jpg","full_height":534,"full_width":800},{"listing_image_id":721982172,"hex_code":"74513E","red":116,"green":81,"blue":62,"hue":21,"saturation":46,"brightness":45,"is_black_and_white":false,"creation_tsz":1422989141,"listing_id":156283831,"rank":4,"url_75x75":"https://img0.etsystatic.com/059/0/5151494/il_75x75.721982172_jihd.jpg","url_170x135":"https://img0.etsystatic.com/059/0/5151494/il_170x135.721982172_jihd.jpg","url_570xN":"https://img0.etsystatic.com/059/0/5151494/il_570xN.721982172_jihd.jpg","url_fullxfull":"https://img0.etsystatic.com/059/0/5151494/il_fullxfull.721982172_jihd.jpg","full_height":534,"full_width":800},{"listing_image_id":718437522,"hex_code":"43403A","red":67,"green":64,"blue":58,"hue":40,"saturation":13,"brightness":26,"is_black_and_white":false,"creation_tsz":1422395726,"listing_id":156283831,"rank":5,"url_75x75":"https://img0.etsystatic.com/054/0/5151494/il_75x75.718437522_tah4.jpg","url_170x135":"https://img0.etsystatic.com/054/0/5151494/il_170x135.718437522_tah4.jpg","url_570xN":"https://img0.etsystatic.com/054/0/5151494/il_570xN.718437522_tah4.jpg","url_fullxfull":"https://img0.etsystatic.com/054/0/5151494/il_fullxfull.718437522_tah4.jpg","full_height":436,"full_width":800}],"Shop":{"shop_id":5151494,"shop_name":"FelixStreetStudio","user_id":5057420,"creation_tsz":1170169282,"title":"Men&#39;s leather bags and accessories, handmade in the USA","announcement":"All items ready to ship in 1 week, shipping takes 2-3 business days \nLarge order? We have discounts available here: http://etsy.me/1mfUkRw\n$1 Gift Packaging! Add it to your order here: http://etsy.me/1U30zTY\n\nOur leather products are crafted of high quality, durable leather and constructed to our rigorous quality standards to provide you with a sturdy, beautiful, and reliable bag or accessory.\n\nAll orders ship within 1 week via USPS, or sooner if you select a rush upgrade at checkout. Standard shipping to US destinations takes 2-3 business days. Standard international shipping takes up to 15 business days. Tracking information will be provided once your order ships.","currency_code":"USD","is_vacation":false,"vacation_message":null,"sale_message":"Thank you for your purchase from Felix Street Studio! Your order will be carefully crafted and personalized to your specifications. We will review any notes included with your order and contact you through Etsy and email if we have any questions. \r\n\r\nAll orders ship within 1 week via USPS, or sooner if you selected a rush upgrade. Standard shipping to US destinations takes 2-3 business days. Standard international shipping takes up to 15 business days. Tracking information will be provided once your order ships. To check the status and ship date of your order, sign in to your Etsy account, click You, then click Purchases and reviews.\r\n\r\nWe really appreciate your business and your support of handcrafted goods!","digital_sale_message":null,"last_updated_tsz":1460663931,"listing_active_count":98,"digital_listing_count":0,"login_name":"FelixStreetStudio","accepts_custom_requests":true,"policy_welcome":null,"policy_payment":"We accept credit cards through Etsy&#39;s processing system or through PayPal.  \r\n\r\nWe collect and report sales taxes on all sales within Arizona.\r\n\r\nCancellation requests must be made within 24 hours of placing your order.","policy_shipping":"Please double check the ship-to address before you order. We cannot honor delivery commitments if you provide the wrong address.\r\n\r\nWe do not issue refunds or replacements on orders identified by USPS as delivered.  \r\n\r\nINTERNATIONAL SHIPMENTS:\r\nItems shipped via First Class International USPS mail cannot be tracked and will not be insured if your item is lost in the mail. Under these conditions we cannot offer refund or replacement. Estimated delivery time averages 15 business days from date shipped. When customs clearance procedures are required, it can cause delays beyond our original delivery estimates. International customers are responsible for all import taxes, customs duties and fees levied by the destination country. All international orders will have full value declared on customs forms, and will be marked as merchandise.","policy_refunds":"Orders cannot be returned or refunded unless the item is not as described in the listing or we have made a mistake.  In this rare event, your order will be promptly replaced or refunded. Please double check the spelling of any custom embroidery or embossing as we cannot offer a refund or an exchange of a customized product if you have made a mistake while ordering.","policy_additional":"Because leather is a natural material, slight variations in color and texture will occur. We do our best to match materials as closely as possible within each order, but we cannot guarantee identical leather between separate orders. All color options will be labelled in each product listing, please check before you select a color as we cannot replace or refund your order if you selected the wrong color.\r\n\r\nAny changes to your order must be made within 24 hours of placing your order. We cannot provide refunds or exchanges if you provided incorrect personalization instructions.","policy_seller_info":null,"policy_updated_tsz":1459805733,"policy_has_private_receipt_info":false,"vacation_autoreply":null,"url":"https://www.etsy.com/shop/FelixStreetStudio?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","image_url_760x100":"https://img1.etsystatic.com/046/0/5151494/iusb_760x100.14972643_sdsv.jpg","num_favorers":10638,"languages":["en-US"],"upcoming_local_event_id":null,"icon_url_fullxfull":"https://img1.etsystatic.com/127/0/5151494/isla_fullxfull.17200133_qxja52oj.jpg","is_using_structured_policies":false,"has_onboarded_structured_policies":false,"has_unstructured_policies":true,"custom_shops_state":3}},{"listing_id":276414876,"state":"active","user_id":10127804,"category_id":69150367,"title":"Jack and Coke Mini Bottle Drink Connector Rings Adult Birthday Party Favors 21 30 40 50 Bithday Cocktail Whiskey Shots Alcohol Liquor Gifts","description":"Combine your mini liquor bottles and favorite soda!  These make perfect favors for your next party, wedding, or event!  This is for the connectors only....liquor and soda bottles not included.  These connector rings are designed to couple standard sodas and mixers with 50 mL shooter style liquor bottles to create a variety of single serving beverage options.  \n\n***This is for the connectors only....liquor and soda bottles not included.***\n\nFeel free to give us a call with any questions (888) 959-2870 M-F 9am - 5pm Central or send us a convo anytime!\n\nKEEP SHOPPING:\nhttp://www.etsy.com/shop/LiquidCourage\nhttp://liquidcourageflasks.com\n\nThank you for visiting Liquid Courage!\nTyler & Amy Fisk","creation_tsz":1460661860,"ending_tsz":1471202660,"original_creation_tsz":1460661860,"last_modified_tsz":1460662024,"price":"0.25","currency_code":"USD","quantity":999,"tags":["jack daniels","whiskey","party favor","21st birthday","birthday favor","mens birthday","30th birthday","over the hill","guys birthday","women birthday","jack and coke","adult birthday","40th birthday"],"category_path":["Paper Goods"],"category_path_ids":[69150367],"materials":[],"shop_section_id":10946328,"featured_rank":null,"state_tsz":1460661860,"url":"https://www.etsy.com/listing/276414876/jack-and-coke-mini-bottle-drink?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","views":1,"num_favorers":0,"shipping_template_id":null,"processing_min":1,"processing_max":3,"who_made":"i_did","is_supply":"false","when_made":"made_to_order","item_weight":null,"item_weight_units":null,"item_length":null,"item_width":null,"item_height":null,"item_dimensions_unit":"in","is_private":false,"recipient":"unisex_adults","occasion":"birthday","style":["Retro","Traditional"],"non_taxable":false,"is_customizable":true,"is_digital":false,"file_data":"","language":"en-US","has_variations":false,"taxonomy_id":1349,"taxonomy_path":["Paper & Party Supplies","Party Supplies","Party Favors & Games","Party Favors"],"used_manufacturer":false,"Images":[{"listing_image_id":958202514,"hex_code":"7D5B58","red":125,"green":91,"blue":88,"hue":5,"saturation":29,"brightness":49,"is_black_and_white":false,"creation_tsz":1460661860,"listing_id":276414876,"rank":1,"url_75x75":"https://img0.etsystatic.com/118/0/5905696/il_75x75.958202514_ghb7.jpg","url_170x135":"https://img0.etsystatic.com/118/0/5905696/il_170x135.958202514_ghb7.jpg","url_570xN":"https://img0.etsystatic.com/118/0/5905696/il_570xN.958202514_ghb7.jpg","url_fullxfull":"https://img0.etsystatic.com/118/0/5905696/il_fullxfull.958202514_ghb7.jpg","full_height":1000,"full_width":1300},{"listing_image_id":958195164,"hex_code":"7C5753","red":124,"green":87,"blue":83,"hue":6,"saturation":33,"brightness":48,"is_black_and_white":false,"creation_tsz":1460661860,"listing_id":276414876,"rank":2,"url_75x75":"https://img0.etsystatic.com/123/0/5905696/il_75x75.958195164_c32f.jpg","url_170x135":"https://img0.etsystatic.com/123/0/5905696/il_170x135.958195164_c32f.jpg","url_570xN":"https://img0.etsystatic.com/123/0/5905696/il_570xN.958195164_c32f.jpg","url_fullxfull":"https://img0.etsystatic.com/123/0/5905696/il_fullxfull.958195164_c32f.jpg","full_height":1500,"full_width":1500},{"listing_image_id":958195128,"hex_code":"82625D","red":130,"green":98,"blue":93,"hue":8,"saturation":28,"brightness":50,"is_black_and_white":false,"creation_tsz":1460661860,"listing_id":276414876,"rank":3,"url_75x75":"https://img0.etsystatic.com/105/0/5905696/il_75x75.958195128_2q99.jpg","url_170x135":"https://img0.etsystatic.com/105/0/5905696/il_170x135.958195128_2q99.jpg","url_570xN":"https://img0.etsystatic.com/105/0/5905696/il_570xN.958195128_2q99.jpg","url_fullxfull":"https://img0.etsystatic.com/105/0/5905696/il_fullxfull.958195128_2q99.jpg","full_height":1500,"full_width":1500},{"listing_image_id":958195174,"hex_code":"767375","red":118,"green":115,"blue":117,"hue":320,"saturation":2,"brightness":46,"is_black_and_white":false,"creation_tsz":1460661861,"listing_id":276414876,"rank":4,"url_75x75":"https://img0.etsystatic.com/128/0/5905696/il_75x75.958195174_r41x.jpg","url_170x135":"https://img0.etsystatic.com/128/0/5905696/il_170x135.958195174_r41x.jpg","url_570xN":"https://img0.etsystatic.com/128/0/5905696/il_570xN.958195174_r41x.jpg","url_fullxfull":"https://img0.etsystatic.com/128/0/5905696/il_fullxfull.958195174_r41x.jpg","full_height":1500,"full_width":1500},{"listing_image_id":1004737271,"hex_code":"787576","red":120,"green":117,"blue":118,"hue":340,"saturation":2,"brightness":47,"is_black_and_white":false,"creation_tsz":1460661861,"listing_id":276414876,"rank":5,"url_75x75":"https://img1.etsystatic.com/136/0/5905696/il_75x75.1004737271_j5xo.jpg","url_170x135":"https://img1.etsystatic.com/136/0/5905696/il_170x135.1004737271_j5xo.jpg","url_570xN":"https://img1.etsystatic.com/136/0/5905696/il_570xN.1004737271_j5xo.jpg","url_fullxfull":"https://img1.etsystatic.com/136/0/5905696/il_fullxfull.1004737271_j5xo.jpg","full_height":1000,"full_width":1300}],"Shop":{"shop_id":5905696,"shop_name":"LiquidCourage","user_id":10127804,"creation_tsz":1275331311,"title":"Custom Flasks, Liquor Bottle Labels, & Bottle Openers","announcement":"We are a husband and wife team that left our corporate cubicles and started our business on Etsy in 2010.  We print our flask and liquor bottle label designs on high quality vinyl. Personalize any flask in our shop with your name, initials, or picture. Convo us or call us at (888) 959-2870 with any questions.\n\nBe sure to sign up for our newsletter to stay up to date with our latest designs, discounts, and giveaways!\n\nNEWSLETTER SIGNUP LINK:\nhttp://eepurl.com/FP_fT","currency_code":"USD","is_vacation":false,"vacation_message":"Thank you for visiting Liquid Courage!  We specialize in flasks to match every personality.  All flasks are now available in your choice if 8 oz, 6 oz, or 4 oz sizes for the same low price.  Don&#39;t see what you are looking for, have your own idea or image, or want multiples of certain designs?  Convo us for a custom listing.","sale_message":"Thank you for your purchase from Liquid Courage Flasks!  Be sure to sign up for our newsletter to stay up to date with our latest designs, discounts, and giveaways!\r\n\r\nNEWSLETTER SIGNUP LINK:\r\nhttp://eepurl.com/FP_fT\r\n\r\n-Shipping-\r\nOur items typically ship within 2 business days and have an estimated delivery time of 2-5 business days within the United States.  If you purchased a custom item, a convo will be sent to you shortly to request more information or to approve a mock up.  Please let us know if you have any questions.  \r\n\r\n-International Shipping-\r\nInternational shipments have an estimated delivery time of 6-10 business days from the time of shipment.  Please note that the shipping time may vary due to customs policies in your country.  International customers are responsible for all Destination Duties, Taxes, and Import Charges.\r\n\r\nIf you have any issues with your order at all.  Please be sure to reach out before leaving feedback.  We will do everything within our power to correct the situation.\r\n\r\nThanks!\r\nAmy and Tyler Fisk\r\nLiquid Courage\r\n888-959-2870\r\nsales@liquidcourageflasks.com","digital_sale_message":null,"last_updated_tsz":1460662718,"listing_active_count":616,"digital_listing_count":0,"login_name":"LiquidCourage","accepts_custom_requests":true,"policy_welcome":"Hello and welcome to our shop! My name is Amy, and my husband, Tyler and I are the owners and creators of Liquid Courage. We have been selling online since 2003. Recently, we decided to make the leap from selling items made by others to selling items that we make. We have been goofing around making all sorts of arts, crafts, scrapbooks, and clothing for many years and decided to combine my hobby with my online business experience. \r\n\r\nTyler has an Accounting degree from Tennessee Technological University, and I have a bachelor&#39;s degree in Marketing and an MBA in Accounting from TTU as well.  Upon graduating, we tried &quot;real, grown-up jobs&quot; - Tyler as a general manager at a greenhouse manufacturing company, and I as a staff accountant for a nationwide manufacturing company.  We spent a couple of years working for &quot;the man&quot;...at a desk eight hours a day...fifty weeks a year.\r\n\r\nWe finally decided to follow our dream of becoming entrepreneurs, pursue our passion, and determine our own future with hands on approach. We chose the path less traveled by, and that has made all the difference.\r\n\r\nPlease don&#39;t hesitate to ask if you have any questions or would like a custom item.\r\n\r\n(888) 959-2870 (M-F 9am - 5pm Eastern)\r\nor\r\nConvo us anytime! \r\n\r\nCheers! \r\nTyler and Amy","policy_payment":"SECURE OPTIONS\nEtsy keeps your payment information secure. Sellers don't receive your credit card information.\n- Visa\n- MasterCard\n- American Express\n- Discover\n- PayPal\n- Apple Pay\n- SOFORT Bank Transfer\n- iDEAL\n- Etsy Gift Card","policy_shipping":"PROCESSING TIME\nThe time I need to prepare an order for shipping varies. For details, see individual items.\n\nESTIMATED SHIPPING TIME\nNorth America: 2 - 5 business days\n\nI'll do my best to meet these shipping estimates, but cannot guarantee them. Actual delivery time will depend on the shipping method you choose.\n\nCUSTOMS AND DUTIES FEES\nBuyers are responsible for any customs or duties fees that may apply. Sellers aren't responsible for delays due to customs","policy_refunds":"I GLADLY ACCEPT RETURNS AND EXCHANGES\nJust contact me within: 7 days of delivery\nShip returns back to me within: 14 days of delivery\n\nI DON'T ACCEPT CANCELLATIONS\nBut please contact me if you have any problems with your order.\n\nTHE FOLLOWING ITEMS CAN'T BE RETURNED\nBecause of the nature of these items, unless they arrive damaged or defective, I can't accept returns for:\n- Custom or personalized orders\n\nCONDITIONS OF RETURN\nBuyers are responsible for return shipping costs.\nIf the item is not returned in its original condition, the buyer is responsible for any loss in value.","policy_additional":"I will only use your shipping and billing address, and contact information\n- To communicate with you about your order\n- To fulfill your order\n- For legal reasons (like paying taxes)\n- Email newsletter\n\nHOW MANY BOTTLES AND/OR LABELS DO I GET FOR $25?\nPlease see on the right hand side of the listing, there is a drop down menu called &quot;Label/Bottle Options&quot; with different quantities and pricing. Don&#39;t see a quantity that will work for you? That&#39;s not a problem. Please just contact me, and I will add a custom quantity for you.\n\nWHAT SIZE ARE THE BOTTLES?\nThe 50mL plastic bottles are approximately 4 inches tall.\n\nCAN I CHANGE THE WORDING/COLORS OF THE LABEL DESIGN?\nYes, we can change the wording any way that you would like. Please leave a note to seller at checkout with your preferences, and I will create a mock up for you to proof.\n\nWILL I GET TO SEE A PROOF OF THE DESIGN BEFORE THE LABELS ARE PRINTED?\nYes, we will send you a mock up to proof before the labels are printed and shipped.\n\nHOW DO I SEND YOU THE PERSONALIZATION THAT I WANT?\nAt checkout, please send us a note to seller with your custom preferences.\n\nSHIPPING/TURNAROUND TIME\nWe ship within 2 business days of the approval of the mock up. Shipping takes 2-5 business days. Upgraded/Overnight shipping is available upon request for an additional fee.","policy_seller_info":"","policy_updated_tsz":1372190570,"policy_has_private_receipt_info":false,"vacation_autoreply":"Thank you for visiting Liquid Courage!  We specialize in flasks to match every personality.  All flasks are now available in your choice if 8 oz, 6 oz, or 4 oz sizes for the same low price.  Don&#39;t see what you are looking for, have your own idea or image, or want multiples of certain designs?  Convo us for a custom listing.","url":"https://www.etsy.com/shop/LiquidCourage?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","image_url_760x100":"https://img1.etsystatic.com/117/0/5905696/iusb_760x100.18197553_6ty1.jpg","num_favorers":10196,"languages":["en-US"],"upcoming_local_event_id":null,"icon_url_fullxfull":"https://img1.etsystatic.com/135/0/5905696/isla_fullxfull.19708789_3jmxiyzk.jpg","is_using_structured_policies":true,"has_onboarded_structured_policies":true,"has_unstructured_policies":true}},{"listing_id":261731197,"state":"active","user_id":11174883,"category_id":68889876,"title":"The Germs - Whiskey Flyer - Darby Crash - Pre-shrunk, hand silk screened 100% cotton t-shirt","description":"We here at Dammit Tees would like you to know that each shirt you buy is printed to order just for you. We will usually print and send your shirt within one or two days of your order, but please be patient if, on occasion, we get a little behind.\n\nCare Instructions: Turn t-shirts inside-out before washing. Wash in cold water with like colors. Tumble dry low.\n\nMen’s shirts are the traditional cut (not slim fit), in a medium weight 100% black cotton knit.\n\nS: 36” Chest / 27” Long\n\nM: 40” Chest / 29” Long\n\nL: 43” Chest / 31” Long\n\nXL: 47” Chest / 32” Long\n\n2XL: 52” Chest / 33” Long\n\n3XL: 54” Chest / 33” Long\n\n4XL: 60” Chest / 35” Long\n\n5XL: 62” Chest / 36” Long","creation_tsz":1460661828,"ending_tsz":1471202628,"original_creation_tsz":1451328229,"last_modified_tsz":1460661828,"price":"19.00","currency_code":"USD","quantity":4,"tags":["Dammit Tees","Band Shirts","Punk Rock","Hardcore Punk","Slash Records"],"category_path":["Clothing","Shirt"],"category_path_ids":[69150353,68889876],"materials":["cotton","plastisol"],"shop_section_id":10205494,"featured_rank":null,"state_tsz":1451328229,"url":"https://www.etsy.com/listing/261731197/the-germs-whiskey-flyer-darby-crash-pre?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","views":59,"num_favorers":8,"shipping_template_id":16354248654,"processing_min":1,"processing_max":2,"who_made":"i_did","is_supply":"false","when_made":"2010_2016","item_weight":null,"item_weight_units":null,"item_length":null,"item_width":null,"item_height":null,"item_dimensions_unit":"in","is_private":false,"recipient":"unisex_adults","occasion":null,"style":["Goth"],"non_taxable":true,"is_customizable":false,"is_digital":false,"file_data":"","language":"en-US","has_variations":true,"taxonomy_id":482,"taxonomy_path":["Clothing","Unisex Adult Clothing","Tops & Tees","T-shirts"],"used_manufacturer":false,"Images":[{"listing_image_id":894276968,"hex_code":"33292A","red":51,"green":41,"blue":42,"hue":354,"saturation":19,"brightness":20,"is_black_and_white":false,"creation_tsz":1451328229,"listing_id":261731197,"rank":1,"url_75x75":"https://img0.etsystatic.com/105/0/6363482/il_75x75.894276968_cy3l.jpg","url_170x135":"https://img0.etsystatic.com/105/0/6363482/il_170x135.894276968_cy3l.jpg","url_570xN":"https://img0.etsystatic.com/105/0/6363482/il_570xN.894276968_cy3l.jpg","url_fullxfull":"https://img0.etsystatic.com/105/0/6363482/il_fullxfull.894276968_cy3l.jpg","full_height":1382,"full_width":1500}],"Shop":{"shop_id":6363482,"shop_name":"DammitTees","user_id":11174883,"creation_tsz":1307150628,"title":null,"announcement":null,"currency_code":"USD","is_vacation":false,"vacation_message":null,"sale_message":null,"digital_sale_message":null,"last_updated_tsz":1460661828,"listing_active_count":445,"digital_listing_count":0,"login_name":"tdammit","accepts_custom_requests":false,"policy_welcome":null,"policy_payment":null,"policy_shipping":null,"policy_refunds":null,"policy_additional":null,"policy_seller_info":null,"policy_updated_tsz":1307150628,"policy_has_private_receipt_info":false,"vacation_autoreply":null,"url":"https://www.etsy.com/shop/DammitTees?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","image_url_760x100":null,"num_favorers":756,"languages":["en-US"],"upcoming_local_event_id":null,"icon_url_fullxfull":null,"is_using_structured_policies":false,"has_onboarded_structured_policies":false,"has_unstructured_policies":false}},{"listing_id":121469688,"state":"active","user_id":15230037,"category_id":69150467,"title":"Whiskey Tango Foxtrot WTF Bumper Sticker / Window Decal - ORANGE","description":"All products are made using 3.0 mil thick 5 year Intermediate Calendered Vinyl for a long-lasting print.\n\nImage dimensions (approximate): 8.25&quot; wide x 1.75&quot; tall\n\nNEED IT BIGGER?  Write me at ragepaints@gmail.com or on here.\n\nSuggestions for use:\nCar window\nBumper sticker\nDry erase boards\nMirrors\nLaptop\nWalls (for a more permanent fixture!)\n\nEach piece comes as pictured with a layer of transfer tape over the top for easy application. Re-applying vinyl is ONLY EASY with transfer tape provided and on glass or plastic surfaces. Vinyl will tear if user attempts to remove from certain surfaces.\n\nInstructional video on how to apply vinyl:\nhttp://www.youtube.com/watch?v=5lXE_YvhWp0","creation_tsz":1460661628,"ending_tsz":1471202428,"original_creation_tsz":1358993626,"last_modified_tsz":1460661628,"price":"5.00","currency_code":"USD","quantity":38,"tags":["Reddit","bumper sticker","window decal","anti apple","joke","satire","tech gift","wtf","whiskey tango","what the fuck","techie gift","geekery"],"category_path":["Accessories"],"category_path_ids":[69150467],"materials":["Vinyl"],"shop_section_id":10355275,"featured_rank":4,"state_tsz":1436296960,"url":"https://www.etsy.com/listing/121469688/whiskey-tango-foxtrot-wtf-bumper-sticker?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","views":446,"num_favorers":45,"shipping_template_id":null,"processing_min":null,"processing_max":null,"who_made":"i_did","is_supply":"false","when_made":"made_to_order","item_weight":null,"item_weight_units":null,"item_length":null,"item_width":null,"item_height":null,"item_dimensions_unit":"in","is_private":false,"recipient":null,"occasion":null,"style":null,"non_taxable":false,"is_customizable":false,"is_digital":false,"file_data":"","language":"en-US","has_variations":false,"taxonomy_id":1,"taxonomy_path":["Accessories"],"used_manufacturer":false,"Images":[{"listing_image_id":419584528,"hex_code":"936128","red":147,"green":97,"blue":40,"hue":32,"saturation":72,"brightness":57,"is_black_and_white":false,"creation_tsz":1358993627,"listing_id":121469688,"rank":1,"url_75x75":"https://img0.etsystatic.com/009/0/6390327/il_75x75.419584528_ejnm.jpg","url_170x135":"https://img0.etsystatic.com/009/0/6390327/il_170x135.419584528_ejnm.jpg","url_570xN":"https://img0.etsystatic.com/009/0/6390327/il_570xN.419584528_ejnm.jpg","url_fullxfull":"https://img0.etsystatic.com/009/0/6390327/il_fullxfull.419584528_ejnm.jpg","full_height":1000,"full_width":1500},{"listing_image_id":419584448,"hex_code":"986434","red":152,"green":100,"blue":52,"hue":29,"saturation":65,"brightness":59,"is_black_and_white":false,"creation_tsz":1358993627,"listing_id":121469688,"rank":2,"url_75x75":"https://img0.etsystatic.com/009/0/6390327/il_75x75.419584448_4r7v.jpg","url_170x135":"https://img0.etsystatic.com/009/0/6390327/il_170x135.419584448_4r7v.jpg","url_570xN":"https://img0.etsystatic.com/009/0/6390327/il_570xN.419584448_4r7v.jpg","url_fullxfull":"https://img0.etsystatic.com/009/0/6390327/il_fullxfull.419584448_4r7v.jpg","full_height":1000,"full_width":1500}],"Shop":{"shop_id":6390327,"shop_name":"RagePaints","user_id":15230037,"creation_tsz":1308874971,"title":"Rage Paints","announcement":"Gifting season is just around the corner, look forward to next day shipping with RagePaints and all associated companies.  Contact me directly at any time for a shipping update!","currency_code":"USD","is_vacation":false,"vacation_message":null,"sale_message":"Thanks for your order.  A shipping confirmation number via USPS (excludes decals) will be sent to the email address associated with your Etsy account when order is shipped.  \r\n\r\nPlease allow time for paintings, as each is made to order.\r\n\r\nThank you for your purchase!  If you have a moment, I would truly appreciate your feedback.  100% strong!","digital_sale_message":null,"last_updated_tsz":1460661628,"listing_active_count":15,"digital_listing_count":0,"login_name":"RagePaints","accepts_custom_requests":false,"policy_welcome":null,"policy_payment":null,"policy_shipping":null,"policy_refunds":null,"policy_additional":null,"policy_seller_info":null,"policy_updated_tsz":1308874971,"policy_has_private_receipt_info":false,"vacation_autoreply":null,"url":"https://www.etsy.com/shop/RagePaints?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","image_url_760x100":"https://img1.etsystatic.com/016/0/6390327/iusb_760x100.11083839_l2os.jpg","num_favorers":546,"languages":["en-US","de"],"upcoming_local_event_id":null,"icon_url_fullxfull":null,"is_using_structured_policies":false,"has_onboarded_structured_policies":false,"has_unstructured_policies":false}},{"listing_id":260302860,"state":"active","user_id":74457921,"category_id":69150425,"title":"Whiskey Decanter Ram Figurine, Vintage Ceramic Brown Glazed Wine Pitcher, Pottery Jug, Old Ukrainian Wine Vessel, Bar Accessory, Bar ware","description":"Whiskey Decanter Ram figurine, vintage ceramic brown glazed wine pitcher, pottery jug, old Soviet Ukrainian wine vessel, bar accessory, collectible bar ware.\nThis decanter is completed with a lid. Good vintage condition- no chips or cracks only the glaze on the bottom scrapped off a little bit as you see on the photo #5.  Will be an original display piece for your bar or a great gift for collector, for whiskey lover.\nMeasurements approx. 7,5’’ height x 8’’ length x 5’’ width\nweight 1850 gr\ncontains 1750 ml\nWill be shipped carefully packed in the cardboard mailing box, wrapped in the bubble wrap, all free spaces in the box will be filled with the polystyrene pieces for a safe shipping.\nPlease look all pictures to determine condition to your satisfaction. The pictures are considered to be part of description. Choose carefully before purchase and ask me if you have any questions about this item. I will be happy to answer.\nThank you for visiting my shop!","creation_tsz":1460661512,"ending_tsz":1471202312,"original_creation_tsz":1449870118,"last_modified_tsz":1460661564,"price":"35.00","currency_code":"USD","quantity":1,"tags":["whiskey decanter","ram figurine","vintage ceramic","brown glazed pitcher","wine decanter","brown pottery jug","old wine vessel","Soviet Ukrainian","ceramic wine flask","bar accessory","whiskey lover gift","collectible barware","bar display piece"],"category_path":["Housewares"],"category_path_ids":[69150425],"materials":["glazed ceramic"],"shop_section_id":18260369,"featured_rank":null,"state_tsz":1460494225,"url":"https://www.etsy.com/listing/260302860/whiskey-decanter-ram-figurine-vintage?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","views":96,"num_favorers":28,"shipping_template_id":null,"processing_min":1,"processing_max":3,"who_made":"someone_else","is_supply":"false","when_made":"1980s","item_weight":null,"item_weight_units":null,"item_length":null,"item_width":null,"item_height":null,"item_dimensions_unit":"in","is_private":false,"recipient":"unisex_adults","occasion":"birthday","style":null,"non_taxable":false,"is_customizable":false,"is_digital":false,"file_data":"","language":"en-US","has_variations":false,"taxonomy_id":1054,"taxonomy_path":["Home & Living","Kitchen & Dining","Drink & Barware"],"used_manufacturer":false,"Images":[{"listing_image_id":887047321,"hex_code":"716254","red":113,"green":98,"blue":84,"hue":29,"saturation":25,"brightness":44,"is_black_and_white":false,"creation_tsz":1449870118,"listing_id":260302860,"rank":1,"url_75x75":"https://img1.etsystatic.com/121/0/11855283/il_75x75.887047321_1b3d.jpg","url_170x135":"https://img1.etsystatic.com/121/0/11855283/il_170x135.887047321_1b3d.jpg","url_570xN":"https://img1.etsystatic.com/121/0/11855283/il_570xN.887047321_1b3d.jpg","url_fullxfull":"https://img1.etsystatic.com/121/0/11855283/il_fullxfull.887047321_1b3d.jpg","full_height":1417,"full_width":1500},{"listing_image_id":887281342,"hex_code":"79604A","red":121,"green":96,"blue":74,"hue":28,"saturation":38,"brightness":47,"is_black_and_white":false,"creation_tsz":1449870118,"listing_id":260302860,"rank":2,"url_75x75":"https://img0.etsystatic.com/132/0/11855283/il_75x75.887281342_c26p.jpg","url_170x135":"https://img0.etsystatic.com/132/0/11855283/il_170x135.887281342_c26p.jpg","url_570xN":"https://img0.etsystatic.com/132/0/11855283/il_570xN.887281342_c26p.jpg","url_fullxfull":"https://img0.etsystatic.com/132/0/11855283/il_fullxfull.887281342_c26p.jpg","full_height":1443,"full_width":1500},{"listing_image_id":887047645,"hex_code":"7D6041","red":125,"green":96,"blue":65,"hue":31,"saturation":48,"brightness":49,"is_black_and_white":false,"creation_tsz":1449870118,"listing_id":260302860,"rank":3,"url_75x75":"https://img1.etsystatic.com/123/0/11855283/il_75x75.887047645_hfsg.jpg","url_170x135":"https://img1.etsystatic.com/123/0/11855283/il_170x135.887047645_hfsg.jpg","url_570xN":"https://img1.etsystatic.com/123/0/11855283/il_570xN.887047645_hfsg.jpg","url_fullxfull":"https://img1.etsystatic.com/123/0/11855283/il_fullxfull.887047645_hfsg.jpg","full_height":1500,"full_width":1494},{"listing_image_id":887282378,"hex_code":"68553F","red":104,"green":85,"blue":63,"hue":32,"saturation":39,"brightness":40,"is_black_and_white":false,"creation_tsz":1449870118,"listing_id":260302860,"rank":4,"url_75x75":"https://img0.etsystatic.com/130/0/11855283/il_75x75.887282378_m654.jpg","url_170x135":"https://img0.etsystatic.com/130/0/11855283/il_170x135.887282378_m654.jpg","url_570xN":"https://img0.etsystatic.com/130/0/11855283/il_570xN.887282378_m654.jpg","url_fullxfull":"https://img0.etsystatic.com/130/0/11855283/il_fullxfull.887282378_m654.jpg","full_height":1473,"full_width":1500},{"listing_image_id":887282644,"hex_code":"9C7D4F","red":156,"green":125,"blue":79,"hue":36,"saturation":49,"brightness":61,"is_black_and_white":false,"creation_tsz":1449870118,"listing_id":260302860,"rank":5,"url_75x75":"https://img0.etsystatic.com/103/0/11855283/il_75x75.887282644_1i6i.jpg","url_170x135":"https://img0.etsystatic.com/103/0/11855283/il_170x135.887282644_1i6i.jpg","url_570xN":"https://img0.etsystatic.com/103/0/11855283/il_570xN.887282644_1i6i.jpg","url_fullxfull":"https://img0.etsystatic.com/103/0/11855283/il_fullxfull.887282644_1i6i.jpg","full_height":1401,"full_width":1500}],"Shop":{"shop_id":11855283,"shop_name":"LigitasVintage","user_id":74457921,"creation_tsz":1445096040,"title":"Soviet, vintage, antique treasuries from Riga, Latvia","announcement":". Thank you for visiting my shop. I offer vintage and antique items for collection and home decorating. My items are old, vintage, previously owned and displays a normal signs of age and use. I`m selling As-Is. Please be sure to look at the pictures to determinate condition to your satisfaction. The pictures are considered to be part of description. Choose carefully before buying and don`t hesistate to ask me if you have any question. I will be happy to answer.","currency_code":"USD","is_vacation":false,"vacation_message":null,"sale_message":null,"digital_sale_message":null,"last_updated_tsz":1454587482,"listing_active_count":24,"digital_listing_count":0,"login_name":"ligitahercoga2","accepts_custom_requests":false,"policy_welcome":null,"policy_payment":"I accept PayPal. and Direct Checkout.\r\n\r\nPayment is expected upon order. Your ordered item will not be shipped until payment is received. If I do not receive a payment within 3 days, I will attempt to contact you. If no payment is received within 5 days, I will cancel your order and re-list the item.","policy_shipping":"World-wide shipping from Latvia with Latvian Post. Please note: The buyer is responsible for any duties, customs and taxes leaved by their individual countries.\r\nI will ship items ready for shipping within 1-3 working days after clearing of payment.  I&#39;ll send your tracking number of the package, so you will be able to track your item throughout shipping. Once shipped, here are possible reception delays, according to Latvian Post: EU- up to1-2 weeks, USA- up to 4 weeks, everywhere else: up to 2-6 weeks.","policy_refunds":"If you receive an item and there are any complaints of misunderstandings, please contact me within 3 working days after receiving. I will try to do my best to help you. No return if you think the colors are little different, lighter or darker than the photos in the listings. Everybody uses a different monitor settings. The item must be return in good and sell-able condition. Buyer pays returnt shipping.\r\nPlease choose carefully before you buy and don&#39;t hesistate to contact me with your questions.","policy_additional":null,"policy_seller_info":null,"policy_updated_tsz":1445104421,"policy_has_private_receipt_info":false,"vacation_autoreply":null,"url":"https://www.etsy.com/shop/LigitasVintage?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","image_url_760x100":"https://img0.etsystatic.com/137/0/11855283/iusb_760x100.16826232_f3wo.jpg","num_favorers":45,"languages":["en-US"],"upcoming_local_event_id":null,"icon_url_fullxfull":"https://img0.etsystatic.com/115/0/11855283/isla_fullxfull.19221868_tu0yk5br.jpg","is_using_structured_policies":false,"has_onboarded_structured_policies":false,"has_unstructured_policies":true}},{"listing_id":255925123,"state":"active","user_id":26071938,"category_id":69150425,"title":"Set of four custom whiskey glasses. Great gift idea for whiskey drinkers. Whiskey Lovers Gift Set.","description":"A well crafted whiskey glass is one of life&#39;s most basic and simple treasures. Our whiskey glasses have an elegant form with classic edges and a solid, heavy base. These well balanced whiskey glasses feel perfect in your hand and feature a buffalo, elk antlers, a rainbow trout and fly fishing fly. The glasses are a set of four and are crystal clear with rim tempered for extraordinary durability.\n\nCustom whiskey glasses make a fabulous gift idea. These glasses arrive in a lovely and thoughtfully prepared gift box.","creation_tsz":1460661252,"ending_tsz":1471202052,"original_creation_tsz":1447373484,"last_modified_tsz":1460661252,"price":"35.00","currency_code":"USD","quantity":9,"tags":["whiskey gift","whiskey lovers gift","gift idea for guys","gift idea for dad","whiskey glasses","gifts for men","whiskey glass set","whiskey gift ideas","gifts for him","gifts under 50","don draper","Mad Men glass set","mad men"],"category_path":["Housewares"],"category_path_ids":[69150425],"materials":["glass","screen print","black ink","high ball"],"shop_section_id":17095691,"featured_rank":null,"state_tsz":1447373484,"url":"https://www.etsy.com/listing/255925123/set-of-four-custom-whiskey-glasses-great?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","views":671,"num_favorers":44,"shipping_template_id":null,"processing_min":1,"processing_max":3,"who_made":"i_did","is_supply":"false","when_made":"2010_2016","item_weight":null,"item_weight_units":null,"item_length":null,"item_width":null,"item_height":null,"item_dimensions_unit":"in","is_private":false,"recipient":"men","occasion":null,"style":["Mid Century","Hipster"],"non_taxable":false,"is_customizable":false,"is_digital":false,"file_data":"","language":"en-US","has_variations":false,"taxonomy_id":1066,"taxonomy_path":["Home & Living","Kitchen & Dining","Drink & Barware","Barware","Martini & Cocktail Glasses"],"used_manufacturer":false,"Images":[{"listing_image_id":872624273,"hex_code":"C6C9C8","red":198,"green":201,"blue":200,"hue":160,"saturation":1,"brightness":78,"is_black_and_white":false,"creation_tsz":1448062203,"listing_id":255925123,"rank":1,"url_75x75":"https://img1.etsystatic.com/117/0/7426801/il_75x75.872624273_3sq1.jpg","url_170x135":"https://img1.etsystatic.com/117/0/7426801/il_170x135.872624273_3sq1.jpg","url_570xN":"https://img1.etsystatic.com/117/0/7426801/il_570xN.872624273_3sq1.jpg","url_fullxfull":"https://img1.etsystatic.com/117/0/7426801/il_fullxfull.872624273_3sq1.jpg","full_height":722,"full_width":1100},{"listing_image_id":867503563,"hex_code":"CCCDCB","red":204,"green":205,"blue":203,"hue":90,"saturation":0,"brightness":80,"is_black_and_white":false,"creation_tsz":1447373485,"listing_id":255925123,"rank":2,"url_75x75":"https://img1.etsystatic.com/122/0/7426801/il_75x75.867503563_eoez.jpg","url_170x135":"https://img1.etsystatic.com/122/0/7426801/il_170x135.867503563_eoez.jpg","url_570xN":"https://img1.etsystatic.com/122/0/7426801/il_570xN.867503563_eoez.jpg","url_fullxfull":"https://img1.etsystatic.com/122/0/7426801/il_fullxfull.867503563_eoez.jpg","full_height":624,"full_width":1100},{"listing_image_id":872855058,"hex_code":"E0ACA0","red":224,"green":172,"blue":160,"hue":11,"saturation":28,"brightness":87,"is_black_and_white":false,"creation_tsz":1448062203,"listing_id":255925123,"rank":3,"url_75x75":"https://img0.etsystatic.com/110/0/7426801/il_75x75.872855058_5kkx.jpg","url_170x135":"https://img0.etsystatic.com/110/0/7426801/il_170x135.872855058_5kkx.jpg","url_570xN":"https://img0.etsystatic.com/110/0/7426801/il_570xN.872855058_5kkx.jpg","url_fullxfull":"https://img0.etsystatic.com/110/0/7426801/il_fullxfull.872855058_5kkx.jpg","full_height":733,"full_width":1100},{"listing_image_id":867503443,"hex_code":"C4C7C2","red":196,"green":199,"blue":194,"hue":96,"saturation":2,"brightness":78,"is_black_and_white":false,"creation_tsz":1447373485,"listing_id":255925123,"rank":4,"url_75x75":"https://img1.etsystatic.com/102/0/7426801/il_75x75.867503443_6r5s.jpg","url_170x135":"https://img1.etsystatic.com/102/0/7426801/il_170x135.867503443_6r5s.jpg","url_570xN":"https://img1.etsystatic.com/102/0/7426801/il_570xN.867503443_6r5s.jpg","url_fullxfull":"https://img1.etsystatic.com/102/0/7426801/il_fullxfull.867503443_6r5s.jpg","full_height":733,"full_width":1100},{"listing_image_id":867503533,"hex_code":"C2C4C2","red":194,"green":196,"blue":194,"hue":120,"saturation":1,"brightness":76,"is_black_and_white":false,"creation_tsz":1447373485,"listing_id":255925123,"rank":5,"url_75x75":"https://img1.etsystatic.com/107/0/7426801/il_75x75.867503533_rlp4.jpg","url_170x135":"https://img1.etsystatic.com/107/0/7426801/il_170x135.867503533_rlp4.jpg","url_570xN":"https://img1.etsystatic.com/107/0/7426801/il_570xN.867503533_rlp4.jpg","url_fullxfull":"https://img1.etsystatic.com/107/0/7426801/il_fullxfull.867503533_rlp4.jpg","full_height":733,"full_width":1100}],"Shop":{"shop_id":7426801,"shop_name":"MeriwetherOfMontana","user_id":26071938,"creation_tsz":1350974299,"title":"Meriwether of Montana. Inspired Hard Goods for the Home","announcement":"Meriwether of Montana was founded in 2012 by Dan Brown and Barb Pfannkuch in the beautiful Rocky Mountain town of Whitefish, Montana. Meriwether designs and sells unique, one of kind gifts for people of all ages (but it helps if you are young at heart.) We have an immense appreciation for well crafted objects and we are drawn toward the nostalgic and the whimsical. Deep down we possess a deep yearning for the Good Ol&#39; Days and desperately wish we could go back...\r\n\r\nMeriwether offers a wonderfully eclectic array of beer gifts, wine gifts and gifts both odd and unique. We require that everything we sell be functional and beautiful (and if it makes you giggle just a bit that works too.) But our primary goal is to make the gift giver a hero -because we know that it feels so amazing when you get to give that perfect gift....\r\n\r\nIf you are in Whitefish, Montana we have a full retail gift boutique right in downtown Whitefish. Our retail store is a peachy (yes... peachy) place to shop for gifts and goodies of all kinds - especially for gifts for dads, gifts for beer lovers, gifts for wine lovers, gifts for coffee lovers... and gifts for people who love to laugh and love to own quality goods. (you get the point...)\r\n\r\nAs a special bonus, many of the gift items we sell can be engraved. Giving an engraved gift is a super way to add that personal touch to your gift. Be sure to read about our personalized gift and engraved gift options.\r\n\r\nAnd what about the name Meriwether? Our name is inspired by Meriwether Lewis... of Lewis and Clark fame. Dan is a huge aficionado of the Lewis and Clark expedition and the Corp of Discovery passed through our neck of the woods on their way to the Pacific coast.","currency_code":"USD","is_vacation":false,"vacation_message":null,"sale_message":"Thank you so much for your order... Enjoy!","digital_sale_message":null,"last_updated_tsz":1460662363,"listing_active_count":114,"digital_listing_count":0,"login_name":"MeirwetherOfMontana","accepts_custom_requests":false,"policy_welcome":"Welcome to our humble little Etsy Shop.  Having fun browsing and don&#39;t hesitate to convo us if you have any questions!","policy_payment":"We accept either Etsy&#39;s direct checkout or PayPal. However, we can accommodate special payment request if arranged prior to placing your order. \r\n\r\nAttention International customers: we are not responsible for custom duties or import tariffs, taxes, fees or delays caused by customs. Please be aware that you may be required to pay these additional charges when the package reaches your country. You may wish to verify with your local customs department for estimates of these charges and for further information. Please do not ask us to mark as gift or change the declared pricing on the customs form. We are a company that frequently ships international orders and are not able to put false information on customs documentation.\r\n","policy_shipping":"Orders generally leave our studio within 2 to 4 business days... add an extra day to this for custom engraved items. If for some reasons this is not possible, we will notify you with the scheduled ship date. All domestic orders are shipped by either FedEx Ground or Home Delivery OR first class USPS. If you&#39;d like insurance, please send a convo and we will get you a quote. \r\n","policy_refunds":"Global orders are shipped USPS First-Class Mail International. International shipping usually takes 1-2 weeks in transit, but varies by location (and can take up to a month or more). Tracking information IS NOT usually available and we are not responsible for customs charges, import duties, etc. Please be aware of your country&#39;s regulations before you order. We are not responsible for any lost international mail. If you have any concerns please contact us before you place your order. You may purchase additional shipping insurance for your package if you wish. \r\nInternational orders must be shipped to the confirmed PayPal address.\r\nHoliday shipping: ship-by date recommendations are on our shop announcement.","policy_additional":"If you are unhappy with your product, please contact us. We will provide a refund or exchange (domestic only) for unused items in original condition, less shipping charges. Credits or replacement items will not be sent until we receive the item to be returned. We need to be notified of returns or exchanges before you return the item and need to receive items within 30 days of original payment. \r\n\r\nRefunds are made to the original form of payment, and processing times vary.\r\n\r\nDamages, domestic shipping: If your item is lost or broken in shipping, we will happily send a replacement item. Damaged or lost custom printed items will be replaced or refunded at our discretion. \r\n\r\nDamages, international shipping: We do not offer refunds or replacements for damaged items or lost international packages unless you purchase additional shipping insurance at the time of ordering.","policy_seller_info":"Meriwether of Montana\r\n115 Central Ave.\r\nWhitefish, MT 59937","policy_updated_tsz":1446913168,"policy_has_private_receipt_info":true,"vacation_autoreply":null,"url":"https://www.etsy.com/shop/MeriwetherOfMontana?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","image_url_760x100":"https://img0.etsystatic.com/121/0/7426801/iusb_760x100.19522360_mkks.jpg","num_favorers":13190,"languages":["en-US"],"upcoming_local_event_id":null,"icon_url_fullxfull":"https://img1.etsystatic.com/132/0/7426801/isla_fullxfull.17831503_lntg1751.jpg","is_using_structured_policies":false,"has_onboarded_structured_policies":false,"has_unstructured_policies":true}},{"listing_id":217651365,"state":"active","user_id":14600185,"category_id":68891034,"title":"VINTAGE GLENLIVET PUZZLE Bottle - Sliding Twist - Plastic - Unique Display - Scotch Whiskey","description":"~~~GLENLIVET BOTTLE~~~ \n\nThis is a Vintage Glenlivet Scotch Whiskey Full Size Bottle.\n\nIt&#39;s plastic and the bottom portion contains 6 sections that rotate and slide like a puzzle.\n\nMade by Unique Display.\n\nThis item is the exact size of a Glenlivet Bottle, 12 3/4&quot; by 3 1/2&quot; wide.  \n\nPlease zoom in to assess condition.\n\nPlease ask your questions before purchasing. Thanks!","creation_tsz":1460661055,"ending_tsz":1471201855,"original_creation_tsz":1420692946,"last_modified_tsz":1460661057,"price":"25.00","currency_code":"USD","quantity":1,"tags":["vintage","glenlivet","scotch","bottle","plastic","unique display","puzzle","twist","sliding","rotating","whiskey","glenlivet scotch"],"category_path":["Vintage","Collectibles"],"category_path_ids":[69150437,68891034],"materials":["vintage","plastic","scotch","whiskey","bottle","twist","rotating","vintage scotch","glenlivet bottle","glenlivet scotch"],"shop_section_id":11042300,"featured_rank":null,"state_tsz":1447690868,"url":"https://www.etsy.com/listing/217651365/vintage-glenlivet-puzzle-bottle-sliding?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","views":165,"num_favorers":4,"shipping_template_id":null,"processing_min":null,"processing_max":null,"who_made":"someone_else","is_supply":"false","when_made":"before_1997","item_weight":null,"item_weight_units":null,"item_length":null,"item_width":null,"item_height":null,"item_dimensions_unit":"in","is_private":false,"recipient":null,"occasion":null,"style":["Retro","Industrial"],"non_taxable":false,"is_customizable":false,"is_digital":false,"file_data":"","language":"en-US","has_variations":false,"taxonomy_id":67,"taxonomy_path":["Art & Collectibles","Collectibles"],"used_manufacturer":false,"Images":[{"listing_image_id":708405442,"hex_code":"CCBFA2","red":204,"green":191,"blue":162,"hue":41,"saturation":20,"brightness":80,"is_black_and_white":false,"creation_tsz":1420692946,"listing_id":217651365,"rank":1,"url_75x75":"https://img0.etsystatic.com/046/0/6672370/il_75x75.708405442_mhir.jpg","url_170x135":"https://img0.etsystatic.com/046/0/6672370/il_170x135.708405442_mhir.jpg","url_570xN":"https://img0.etsystatic.com/046/0/6672370/il_570xN.708405442_mhir.jpg","url_fullxfull":"https://img0.etsystatic.com/046/0/6672370/il_fullxfull.708405442_mhir.jpg","full_height":1125,"full_width":1500},{"listing_image_id":708405386,"hex_code":"C1B7A7","red":193,"green":183,"blue":167,"hue":37,"saturation":13,"brightness":75,"is_black_and_white":false,"creation_tsz":1420692946,"listing_id":217651365,"rank":2,"url_75x75":"https://img0.etsystatic.com/050/0/6672370/il_75x75.708405386_npe4.jpg","url_170x135":"https://img0.etsystatic.com/050/0/6672370/il_170x135.708405386_npe4.jpg","url_570xN":"https://img0.etsystatic.com/050/0/6672370/il_570xN.708405386_npe4.jpg","url_fullxfull":"https://img0.etsystatic.com/050/0/6672370/il_fullxfull.708405386_npe4.jpg","full_height":1125,"full_width":1500},{"listing_image_id":708405410,"hex_code":"BCAA8F","red":188,"green":170,"blue":143,"hue":36,"saturation":23,"brightness":73,"is_black_and_white":false,"creation_tsz":1420692946,"listing_id":217651365,"rank":3,"url_75x75":"https://img0.etsystatic.com/046/0/6672370/il_75x75.708405410_13mq.jpg","url_170x135":"https://img0.etsystatic.com/046/0/6672370/il_170x135.708405410_13mq.jpg","url_570xN":"https://img0.etsystatic.com/046/0/6672370/il_570xN.708405410_13mq.jpg","url_fullxfull":"https://img0.etsystatic.com/046/0/6672370/il_fullxfull.708405410_13mq.jpg","full_height":1183,"full_width":1313},{"listing_image_id":708526855,"hex_code":"B2B8AB","red":178,"green":184,"blue":171,"hue":88,"saturation":7,"brightness":72,"is_black_and_white":false,"creation_tsz":1420692946,"listing_id":217651365,"rank":4,"url_75x75":"https://img1.etsystatic.com/048/0/6672370/il_75x75.708526855_ci36.jpg","url_170x135":"https://img1.etsystatic.com/048/0/6672370/il_170x135.708526855_ci36.jpg","url_570xN":"https://img1.etsystatic.com/048/0/6672370/il_570xN.708526855_ci36.jpg","url_fullxfull":"https://img1.etsystatic.com/048/0/6672370/il_fullxfull.708526855_ci36.jpg","full_height":1125,"full_width":1500},{"listing_image_id":708405498,"hex_code":"B3AD96","red":179,"green":173,"blue":150,"hue":48,"saturation":16,"brightness":70,"is_black_and_white":false,"creation_tsz":1420692946,"listing_id":217651365,"rank":5,"url_75x75":"https://img0.etsystatic.com/058/0/6672370/il_75x75.708405498_op3b.jpg","url_170x135":"https://img0.etsystatic.com/058/0/6672370/il_170x135.708405498_op3b.jpg","url_570xN":"https://img0.etsystatic.com/058/0/6672370/il_570xN.708405498_op3b.jpg","url_fullxfull":"https://img0.etsystatic.com/058/0/6672370/il_fullxfull.708405498_op3b.jpg","full_height":1125,"full_width":1500}],"Shop":{"shop_id":6672370,"shop_name":"absenceofcolor","user_id":14600185,"creation_tsz":1324780297,"title":"Absence of Color","announcement":null,"currency_code":"USD","is_vacation":false,"vacation_message":null,"sale_message":"Thank you for your purchase!  I appreciate your business.  Please contact me if you have any questions.  ","digital_sale_message":null,"last_updated_tsz":1459862554,"listing_active_count":100,"digital_listing_count":0,"login_name":"absenceofcolor","accepts_custom_requests":false,"policy_welcome":"Welcome to Absence Of Color where you will find my cool vintage treasures that have little or no color, but a lot of character.   ","policy_payment":"I accept Paypal, credit cards thru Etsy direct checkout, and money orders.  Payment is expected within 1 week for money orders.","policy_shipping":"All shipping charges are listed. I will ship using the most economical and safest way possible. I usually ship same day, or possibly next day, if you must have something by a certain date, please let me know.\r\n\r\nI will combine shipping at your request to save you money. Please contact me.\r\n\r\nAll purchases will be shipped to the registered Etsy address unless we have made arrangements otherwise. Please make sure that address is accurate.\r\n\r\nINTERNATIONAL:\r\nI will ship smaller, less fragile items internationally. Please ask me for a quote.\r\nAny charges associated with this will be your responsibility. \r\nPLEASE NOTE: I ship via USPS First Class or Priority Mail. International shipments will have custom forms attached with actual value declared. I WILL NOT mark items as gifts, so please don&#39;t ask or assume. Buyers will be responsible to pay for all duties, custom charges, or fees over and above the actual shipping cost of the item.\r\nI will add insurance at your request, and that is the only way I can help you if your package is lost or broken.\r\nI can not declare your purchase price for less than the actual price.\r\n","policy_refunds":"If you have a concern about an item that you purchased please contact me, generally there are no returns or refunds as all items are vintage.","policy_additional":"If you are looking for something in particular let me know, I just might have it. \r\nI am no longer doing RESERVES, I&#39;m sorry, so if you see something you like, grab it!\r\n\r\n","policy_seller_info":null,"policy_updated_tsz":1428535432,"policy_has_private_receipt_info":false,"vacation_autoreply":null,"url":"https://www.etsy.com/shop/absenceofcolor?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","image_url_760x100":"https://img1.etsystatic.com/119/0/6672370/iusb_760x100.20341557_l9ah.jpg","num_favorers":1270,"languages":["en-US"],"upcoming_local_event_id":null,"icon_url_fullxfull":null,"is_using_structured_policies":false,"has_onboarded_structured_policies":false,"has_unstructured_policies":true}},{"listing_id":276412826,"state":"active","user_id":39609575,"category_id":69150425,"title":"Pink Stoneware Chevron Cup","description":"Thrown on the wheel from smooth stoneware and then altered to slightly square shape.  Glazed in glossy pink glaze with wax resist chevron design. Glaze recipe is my own, very unique and carefully developed to last years in your kitchen for safe use.  Cup measures 3.25&quot; wide by 3&quot; high. Holds approximately 8 oz. Fired to 2350º F. in a reducing atmosphere.  Made to be used every day, completely food, dishwasher and microwave safe.  Looks fantastic mixed with other colors.  Check my other listings for black, cream and grey chevrons cups.  Keep in mind that each item is unique and may differ slightly as they are hand made.","creation_tsz":1460661040,"ending_tsz":1471201840,"original_creation_tsz":1460661040,"last_modified_tsz":1460661541,"price":"18.00","currency_code":"USD","quantity":2,"tags":["chevron","pink","teacup","pottery","wheel thrown","Emily Kiewel","wine cup","whiskey cup","stoneware","hand made","modern","functional","food safe"],"category_path":["Housewares"],"category_path_ids":[69150425],"materials":["stoneware","clay"],"shop_section_id":16740009,"featured_rank":null,"state_tsz":1460661040,"url":"https://www.etsy.com/listing/276412826/pink-stoneware-chevron-cup?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","views":0,"num_favorers":0,"shipping_template_id":null,"processing_min":1,"processing_max":3,"who_made":"i_did","is_supply":"false","when_made":"2010_2016","item_weight":null,"item_weight_units":null,"item_length":null,"item_width":null,"item_height":null,"item_dimensions_unit":"in","is_private":false,"recipient":null,"occasion":null,"style":["Modern"],"non_taxable":false,"is_customizable":false,"is_digital":false,"file_data":"","language":"en-US","has_variations":false,"taxonomy_id":1862,"taxonomy_path":["Home & Living","Kitchen & Dining","Drink & Barware","Drinkware"],"used_manufacturer":false,"Images":[{"listing_image_id":958187364,"hex_code":"A0898D","red":160,"green":137,"blue":141,"hue":350,"saturation":14,"brightness":62,"is_black_and_white":false,"creation_tsz":1460661040,"listing_id":276412826,"rank":1,"url_75x75":"https://img0.etsystatic.com/103/0/8786611/il_75x75.958187364_fbaq.jpg","url_170x135":"https://img0.etsystatic.com/103/0/8786611/il_170x135.958187364_fbaq.jpg","url_570xN":"https://img0.etsystatic.com/103/0/8786611/il_570xN.958187364_fbaq.jpg","url_fullxfull":"https://img0.etsystatic.com/103/0/8786611/il_fullxfull.958187364_fbaq.jpg","full_height":997,"full_width":1500},{"listing_image_id":958186874,"hex_code":"9B8386","red":155,"green":131,"blue":134,"hue":352,"saturation":15,"brightness":60,"is_black_and_white":false,"creation_tsz":1460661040,"listing_id":276412826,"rank":2,"url_75x75":"https://img0.etsystatic.com/138/0/8786611/il_75x75.958186874_hdxr.jpg","url_170x135":"https://img0.etsystatic.com/138/0/8786611/il_170x135.958186874_hdxr.jpg","url_570xN":"https://img0.etsystatic.com/138/0/8786611/il_570xN.958186874_hdxr.jpg","url_fullxfull":"https://img0.etsystatic.com/138/0/8786611/il_fullxfull.958186874_hdxr.jpg","full_height":997,"full_width":1500},{"listing_image_id":958186976,"hex_code":"937B80","red":147,"green":123,"blue":128,"hue":348,"saturation":16,"brightness":57,"is_black_and_white":false,"creation_tsz":1460661040,"listing_id":276412826,"rank":3,"url_75x75":"https://img0.etsystatic.com/109/0/8786611/il_75x75.958186976_po3v.jpg","url_170x135":"https://img0.etsystatic.com/109/0/8786611/il_170x135.958186976_po3v.jpg","url_570xN":"https://img0.etsystatic.com/109/0/8786611/il_570xN.958186976_po3v.jpg","url_fullxfull":"https://img0.etsystatic.com/109/0/8786611/il_fullxfull.958186976_po3v.jpg","full_height":997,"full_width":1500},{"listing_image_id":1004728541,"hex_code":"908085","red":144,"green":128,"blue":133,"hue":341,"saturation":11,"brightness":56,"is_black_and_white":false,"creation_tsz":1460661040,"listing_id":276412826,"rank":4,"url_75x75":"https://img1.etsystatic.com/131/0/8786611/il_75x75.1004728541_rxjp.jpg","url_170x135":"https://img1.etsystatic.com/131/0/8786611/il_170x135.1004728541_rxjp.jpg","url_570xN":"https://img1.etsystatic.com/131/0/8786611/il_570xN.1004728541_rxjp.jpg","url_fullxfull":"https://img1.etsystatic.com/131/0/8786611/il_fullxfull.1004728541_rxjp.jpg","full_height":839,"full_width":1500},{"listing_image_id":958187258,"hex_code":"73746E","red":115,"green":116,"blue":110,"hue":70,"saturation":5,"brightness":45,"is_black_and_white":false,"creation_tsz":1460661040,"listing_id":276412826,"rank":5,"url_75x75":"https://img0.etsystatic.com/130/0/8786611/il_75x75.958187258_q2f0.jpg","url_170x135":"https://img0.etsystatic.com/130/0/8786611/il_170x135.958187258_q2f0.jpg","url_570xN":"https://img0.etsystatic.com/130/0/8786611/il_570xN.958187258_q2f0.jpg","url_fullxfull":"https://img0.etsystatic.com/130/0/8786611/il_fullxfull.958187258_q2f0.jpg","full_height":997,"full_width":1500}],"Shop":{"shop_id":8786611,"shop_name":"Tombopottery","user_id":39609575,"creation_tsz":1384477253,"title":"Handmade Functional Pottery","announcement":null,"currency_code":"USD","is_vacation":false,"vacation_message":null,"sale_message":null,"digital_sale_message":null,"last_updated_tsz":1454425039,"listing_active_count":9,"digital_listing_count":0,"login_name":"emilykiewel","accepts_custom_requests":false,"policy_welcome":null,"policy_payment":null,"policy_shipping":null,"policy_refunds":null,"policy_additional":null,"policy_seller_info":null,"policy_updated_tsz":0,"policy_has_private_receipt_info":false,"vacation_autoreply":null,"url":"https://www.etsy.com/shop/Tombopottery?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","image_url_760x100":"https://img1.etsystatic.com/052/0/8786611/iusb_760x100.15027087_69pn.jpg","num_favorers":29,"languages":["en-US"],"upcoming_local_event_id":null,"icon_url_fullxfull":null,"is_using_structured_policies":false,"has_onboarded_structured_policies":false,"has_unstructured_policies":false}},{"listing_id":260405683,"state":"active","user_id":6221338,"category_id":69151567,"title":"Stamped Metals Collection: Oxidized sterling silver medium stamped disc with 14K goldfill wrapped whiskey quartz","description":"Oxidized sterling silver medium stamped disc with little footprints, wire-wrapped whiskey quartz and 14K goldfill wire - 16&quot; in length of oxidized sterling silver chain with 2&quot; of adjustment","creation_tsz":1460661027,"ending_tsz":1471201827,"original_creation_tsz":1450036828,"last_modified_tsz":1460661027,"price":"80.00","currency_code":"USD","quantity":1,"tags":["silver","disc","necklace","goldfill","simple","stamped","wire","oxidized","footprints","whiskey quartz","quartz"],"category_path":["Jewelry","Necklace"],"category_path_ids":[68887482,69151567],"materials":["sterling silver","goldfill","whiskey quartz"],"shop_section_id":5675511,"featured_rank":null,"state_tsz":1450036828,"url":"https://www.etsy.com/listing/260405683/stamped-metals-collection-oxidized?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","views":0,"num_favorers":0,"shipping_template_id":19762757219,"processing_min":1,"processing_max":3,"who_made":"i_did","is_supply":"false","when_made":"made_to_order","item_weight":null,"item_weight_units":null,"item_length":null,"item_width":null,"item_height":null,"item_dimensions_unit":"in","is_private":false,"recipient":null,"occasion":null,"style":null,"non_taxable":false,"is_customizable":false,"is_digital":false,"file_data":"","language":"en-US","has_variations":false,"taxonomy_id":1229,"taxonomy_path":["Jewelry","Necklaces","Pendants"],"used_manufacturer":false,"Images":[{"listing_image_id":888274166,"hex_code":"9B9997","red":155,"green":153,"blue":151,"hue":30,"saturation":2,"brightness":60,"is_black_and_white":false,"creation_tsz":1450036828,"listing_id":260405683,"rank":1,"url_75x75":"https://img0.etsystatic.com/104/0/5360603/il_75x75.888274166_msjz.jpg","url_170x135":"https://img0.etsystatic.com/104/0/5360603/il_170x135.888274166_msjz.jpg","url_570xN":"https://img0.etsystatic.com/104/0/5360603/il_570xN.888274166_msjz.jpg","url_fullxfull":"https://img0.etsystatic.com/104/0/5360603/il_fullxfull.888274166_msjz.jpg","full_height":1500,"full_width":1500},{"listing_image_id":888037177,"hex_code":"939190","red":147,"green":145,"blue":144,"hue":20,"saturation":2,"brightness":57,"is_black_and_white":false,"creation_tsz":1450036828,"listing_id":260405683,"rank":2,"url_75x75":"https://img1.etsystatic.com/129/0/5360603/il_75x75.888037177_qpal.jpg","url_170x135":"https://img1.etsystatic.com/129/0/5360603/il_170x135.888037177_qpal.jpg","url_570xN":"https://img1.etsystatic.com/129/0/5360603/il_570xN.888037177_qpal.jpg","url_fullxfull":"https://img1.etsystatic.com/129/0/5360603/il_fullxfull.888037177_qpal.jpg","full_height":1500,"full_width":1500}],"Shop":{"shop_id":5360603,"shop_name":"GMinerStudios","user_id":6221338,"creation_tsz":1220905342,"title":"Unique handmade jewelry","announcement":null,"currency_code":"USD","is_vacation":false,"vacation_message":null,"sale_message":"Thank you for your business! Please note that all products are carefully handmade one piece at a time. Due to this process, there may be slight variations from one item to the next. These variations are intrinsic to the manufacturing of handmade products and will make your purchase truly one of a kind. ","digital_sale_message":null,"last_updated_tsz":1460662236,"listing_active_count":12,"digital_listing_count":0,"login_name":"lisasprowls","accepts_custom_requests":false,"policy_welcome":"Welcome to my Etsy shop! I am a native Coloradan, born and raised in the beautiful Denver area. All of my jewelry is handmade with sterling silver, 14k goldfill, copper, semi-precious stones and freshwater pearls. I am a detail-oriented artist that strives to create contrasting textures, dynamic forms, strong color awareness and fine craftsmanship in my work. I frequently challenge myself and learn new techniques to bring to my collections.\r\nPlease contact me if you have any questions! Thanks for looking!","policy_payment":"I accept payments via Paypal. I require payment within 48 hours of purchase. If payment is not received, I reserve the right to cancel the transaction. If you for some reason cannot make payment within 48 hours, please contact me. \r\nAll purchases in Florida are subject to state sales tax.","policy_shipping":"Packages are shipped by USPS first-class mail with delivery confirmation. Please allow 7 days to receive your package. (Usually 3-4 days). I ship as soon as payment is received and most orders go out within 48 hours of purchase. However, please allow for at least 7 days for shipment in case I need to order special materials. All jewelry is carefully wrapped in tissue and is shipped in a small flat rate box.\r\nI am not responsible for items lost of damaged during shipping.\r\nIf you are in need of faster shipping please contact me and we can make arrangements. This may require an extra shipping charge.","policy_refunds":"Returns or exchanges are accepted within 30 days of purchase. All jewelry must be returned in it&#39;s original state with receipt. Buyer is responsible for return shipping costs. \r\nIf you are unsatisfied with a specific part of your purchase, contact me and we can discuss reworking the piece to meet your needs.","policy_additional":"Due to the nature of handmade items, some pieces may differ slightly from images on postings. Also please remember that semi-precious stones and freshwater pearls tend to vary in appearance (color and texture). \r\nFeel free to contact me about custom orders! I have completed numerous custom and bridal order requests and am more than happy to work with you!","policy_seller_info":null,"policy_updated_tsz":1450025059,"policy_has_private_receipt_info":false,"vacation_autoreply":null,"url":"https://www.etsy.com/shop/GMinerStudios?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","image_url_760x100":"https://img1.etsystatic.com/128/0/5360603/iusb_760x100.17462295_9lbg.jpg","num_favorers":4,"languages":["en-US"],"upcoming_local_event_id":null,"icon_url_fullxfull":"https://img0.etsystatic.com/134/0/5360603/isla_fullxfull.17466786_st8k935k.jpg","is_using_structured_policies":false,"has_onboarded_structured_policies":false,"has_unstructured_policies":true}},{"listing_id":289922641,"state":"active","user_id":19130787,"category_id":68887546,"title":"Soy Candle in Reusable Whiskey Glass, 9 ounce","description":"Our hand-made candles are crafted using 100% soy wax, premium fragrances, and a cotton wick, which results in a great smelling candle that burns clean and long. We hand pour all of these in small batches ensuring the quality of each candle we produce. Plus, they come in a reusable tumbler glass, perfect for your favorite cocktail. Once you experience the delightful scents and long burn times of our candles, we are sure you will be back again.\n\nScents:\nShorebreak - Our shorebreak scent is comprised of tropical fruits, sweetened orange, lemon, and lime. Smells like sipping a cocktail on the beach. \n\nDriftwood - Our driftwood candle smells of teak and bergamot.  A nice subtle scent with hints of tobacco.  \n\n- 100% Soy Candle with Lead Free Cotton Wick\n- Reusable glass tumbler\n- Approx. burn time: 40+ hours\n- Made in the USA","creation_tsz":1460661018,"ending_tsz":1471201818,"original_creation_tsz":1460661018,"last_modified_tsz":1460662404,"price":"28.00","currency_code":"USD","quantity":5,"tags":["candle","soy candle","container candle","candles","manly","soy","whiskey","masculine","soy candles","glass","handmade","gift","scented"],"category_path":["Candles","Container"],"category_path_ids":[69150375,68887546],"materials":["wax","soy wax","fragrance","scents","cotton wick","glass tumbler"],"shop_section_id":null,"featured_rank":null,"state_tsz":1460661018,"url":"https://www.etsy.com/listing/289922641/soy-candle-in-reusable-whiskey-glass-9?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","views":1,"num_favorers":0,"shipping_template_id":null,"processing_min":1,"processing_max":2,"who_made":"i_did","is_supply":"false","when_made":"made_to_order","item_weight":"32","item_weight_units":null,"item_length":"4","item_width":"4","item_height":"4","item_dimensions_unit":"in","is_private":false,"recipient":null,"occasion":null,"style":null,"non_taxable":false,"is_customizable":false,"is_digital":false,"file_data":"","language":"en-US","has_variations":true,"taxonomy_id":1005,"taxonomy_path":["Home & Living","Home Décor","Candles & Holders","Candles","Container Candles"],"used_manufacturer":false,"Images":[{"listing_image_id":1004742479,"hex_code":"A99287","red":169,"green":146,"blue":135,"hue":19,"saturation":20,"brightness":66,"is_black_and_white":false,"creation_tsz":1460661019,"listing_id":289922641,"rank":1,"url_75x75":"https://img1.etsystatic.com/140/0/6711617/il_75x75.1004742479_2oc7.jpg","url_170x135":"https://img1.etsystatic.com/140/0/6711617/il_170x135.1004742479_2oc7.jpg","url_570xN":"https://img1.etsystatic.com/140/0/6711617/il_570xN.1004742479_2oc7.jpg","url_fullxfull":"https://img1.etsystatic.com/140/0/6711617/il_fullxfull.1004742479_2oc7.jpg","full_height":1018,"full_width":1500},{"listing_image_id":958201144,"hex_code":"B9ACA7","red":185,"green":172,"blue":167,"hue":17,"saturation":9,"brightness":72,"is_black_and_white":false,"creation_tsz":1460661019,"listing_id":289922641,"rank":2,"url_75x75":"https://img0.etsystatic.com/113/0/6711617/il_75x75.958201144_jt1i.jpg","url_170x135":"https://img0.etsystatic.com/113/0/6711617/il_170x135.958201144_jt1i.jpg","url_570xN":"https://img0.etsystatic.com/113/0/6711617/il_570xN.958201144_jt1i.jpg","url_fullxfull":"https://img0.etsystatic.com/113/0/6711617/il_fullxfull.958201144_jt1i.jpg","full_height":1500,"full_width":1433},{"listing_image_id":1004742477,"hex_code":"BFBEBC","red":191,"green":190,"blue":188,"hue":40,"saturation":1,"brightness":74,"is_black_and_white":false,"creation_tsz":1460661019,"listing_id":289922641,"rank":3,"url_75x75":"https://img1.etsystatic.com/139/0/6711617/il_75x75.1004742477_ax0f.jpg","url_170x135":"https://img1.etsystatic.com/139/0/6711617/il_170x135.1004742477_ax0f.jpg","url_570xN":"https://img1.etsystatic.com/139/0/6711617/il_570xN.1004742477_ax0f.jpg","url_fullxfull":"https://img1.etsystatic.com/139/0/6711617/il_fullxfull.1004742477_ax0f.jpg","full_height":1500,"full_width":1375}],"Shop":{"shop_id":6711617,"shop_name":"nancynewton1","user_id":19130787,"creation_tsz":1326754217,"title":"Something Fishy","announcement":null,"currency_code":"USD","is_vacation":false,"vacation_message":null,"sale_message":null,"digital_sale_message":null,"last_updated_tsz":1458756937,"listing_active_count":1,"digital_listing_count":0,"login_name":"nancynewton1","accepts_custom_requests":false,"policy_welcome":"Welcome - All of my artwork is original and handmade.  My collages are created from recycled torn paper and found items.  I try to describe each piece accurately and depict the colors for you.  If you have any questions, please contact me.  Most are nautical or shore designs. The gyotaku prints are from shrimp and fish caught in the gulf coast \r\n","policy_payment":"I accept Paypal","policy_shipping":"All items shipped UPS or FedEx, depending on the size.  \r\n","policy_refunds":"I hope you will be delighted with your purchase.  However, if for any reason you are not satisfied with your item, please contact me. Please return the item for a refund of your payment less the return shipping amount.  \r\n","policy_additional":"Thank you for viewing my artwork and please feel free to contact me.  Have fun shopping!\r\n","policy_seller_info":null,"policy_updated_tsz":1337619225,"policy_has_private_receipt_info":false,"vacation_autoreply":null,"url":"https://www.etsy.com/shop/nancynewton1?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","image_url_760x100":"https://img1.etsystatic.com/002/0/6711617/iusb_760x100.9439251_kict.jpg","num_favorers":4,"languages":["en-US"],"upcoming_local_event_id":null,"icon_url_fullxfull":null,"is_using_structured_policies":false,"has_onboarded_structured_policies":false,"has_unstructured_policies":true}},{"listing_id":268877892,"state":"active","user_id":48268636,"category_id":69201265,"title":"I&#39;m Sorry for what i said when i was hungry  custom made Ultra soft Ladies muscle tank yoga tank barre class tank concert top","description":"Designed in Brooklyn NYC . Our items are Printed in the United States.. They are  an original inspired design .The words used in the title and/or search terms are not intended to imply they are licensed by any rights holders.\n\nI&#39;m Sorry for what i said when i was hungry  \nBlack MARBLE - FIRST IMAGE \nBlue  MARBLE -SECOND IMAGE \nGrey 3rd image \nblack- 4th\nwhite- not shown  \n \n  custom made  on a ladies MUSCLE tank\n\n we use bella and canvas- 8803 muscle tanks \nruns true to size (\nperfect for the gym, hanging around or a cover up for the summer !\n\n\nthis item is custom made to order-","creation_tsz":1460660998,"ending_tsz":1471201798,"original_creation_tsz":1455829492,"last_modified_tsz":1460660998,"price":"14.99","currency_code":"USD","quantity":15,"tags":["muscle","FLEEK","MUSCLE TEE","barre tank top","funny tank","barre","exercise tank","pizza","funny pizza top","spirit animal","whiskey"],"category_path":["Clothing","Women","Tank"],"category_path_ids":[69150353,69152559,69201265],"materials":["cotton"],"shop_section_id":17026272,"featured_rank":null,"state_tsz":1455829492,"url":"https://www.etsy.com/listing/268877892/im-sorry-for-what-i-said-when-i-was?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","views":165,"num_favorers":34,"shipping_template_id":20247850416,"processing_min":3,"processing_max":5,"who_made":"i_did","is_supply":"false","when_made":"made_to_order","item_weight":"9","item_weight_units":null,"item_length":null,"item_width":null,"item_height":null,"item_dimensions_unit":"in","is_private":false,"recipient":"women","occasion":null,"style":null,"non_taxable":false,"is_customizable":false,"is_digital":false,"file_data":"","language":"en-US","has_variations":true,"taxonomy_id":558,"taxonomy_path":["Clothing","Women's Clothing","Tops & Tees","Tanks"],"used_manufacturer":false,"Images":[{"listing_image_id":924726883,"hex_code":"74746E","red":116,"green":116,"blue":110,"hue":60,"saturation":5,"brightness":45,"is_black_and_white":false,"creation_tsz":1455829492,"listing_id":268877892,"rank":1,"url_75x75":"https://img1.etsystatic.com/102/0/9509677/il_75x75.924726883_c7ip.jpg","url_170x135":"https://img1.etsystatic.com/102/0/9509677/il_170x135.924726883_c7ip.jpg","url_570xN":"https://img1.etsystatic.com/102/0/9509677/il_570xN.924726883_c7ip.jpg","url_fullxfull":"https://img1.etsystatic.com/102/0/9509677/il_fullxfull.924726883_c7ip.jpg","full_height":594,"full_width":706},{"listing_image_id":924981762,"hex_code":"848187","red":132,"green":129,"blue":135,"hue":270,"saturation":4,"brightness":52,"is_black_and_white":false,"creation_tsz":1455829493,"listing_id":268877892,"rank":2,"url_75x75":"https://img0.etsystatic.com/102/0/9509677/il_75x75.924981762_fle0.jpg","url_170x135":"https://img0.etsystatic.com/102/0/9509677/il_170x135.924981762_fle0.jpg","url_570xN":"https://img0.etsystatic.com/102/0/9509677/il_570xN.924981762_fle0.jpg","url_fullxfull":"https://img0.etsystatic.com/102/0/9509677/il_fullxfull.924981762_fle0.jpg","full_height":725,"full_width":849},{"listing_image_id":924726881,"hex_code":"A79C8D","red":167,"green":156,"blue":141,"hue":35,"saturation":15,"brightness":65,"is_black_and_white":false,"creation_tsz":1455829493,"listing_id":268877892,"rank":3,"url_75x75":"https://img1.etsystatic.com/101/0/9509677/il_75x75.924726881_pzw3.jpg","url_170x135":"https://img1.etsystatic.com/101/0/9509677/il_170x135.924726881_pzw3.jpg","url_570xN":"https://img1.etsystatic.com/101/0/9509677/il_570xN.924726881_pzw3.jpg","url_fullxfull":"https://img1.etsystatic.com/101/0/9509677/il_fullxfull.924726881_pzw3.jpg","full_height":900,"full_width":900},{"listing_image_id":924981830,"hex_code":"99938C","red":153,"green":147,"blue":140,"hue":32,"saturation":8,"brightness":60,"is_black_and_white":false,"creation_tsz":1455829493,"listing_id":268877892,"rank":4,"url_75x75":"https://img0.etsystatic.com/136/0/9509677/il_75x75.924981830_k09f.jpg","url_170x135":"https://img0.etsystatic.com/136/0/9509677/il_170x135.924981830_k09f.jpg","url_570xN":"https://img0.etsystatic.com/136/0/9509677/il_570xN.924981830_k09f.jpg","url_fullxfull":"https://img0.etsystatic.com/136/0/9509677/il_fullxfull.924981830_k09f.jpg","full_height":975,"full_width":1300},{"listing_image_id":825018157,"hex_code":"000000","red":0,"green":0,"blue":0,"hue":0,"saturation":0,"brightness":0,"is_black_and_white":null,"creation_tsz":1455829493,"listing_id":268877892,"rank":5,"url_75x75":"https://img1.etsystatic.com/075/0/9509677/il_75x75.825018157_spik.jpg","url_170x135":"https://img1.etsystatic.com/075/0/9509677/il_170x135.825018157_spik.jpg","url_570xN":"https://img1.etsystatic.com/075/0/9509677/il_570xN.825018157_spik.jpg","url_fullxfull":"https://img1.etsystatic.com/075/0/9509677/il_fullxfull.825018157_spik.jpg","full_height":1159,"full_width":1500}],"Shop":{"shop_id":9509677,"shop_name":"WickedCustomApparel","user_id":48268636,"creation_tsz":1400115533,"title":"Affordable premium quality custom apparel for everyone ","announcement":" FREE SHIPPING  PROMO CODE: WICKED16 \r\n (WITH ITEM TOTAL OF $40 OR MORE)\r\nOFFER EXTENDED to  APRIL 17 2016\r\n(US Customers ONLY )\r\n1 promo code allowed per order \r\n\r\n10% OFF !\r\nSPEND $20 USD OR MORE (BEFORE SHIPPING)\r\nSAVE 10% - USE PROMO CODE : CHONCE  @ CHECKOUT\r\n\r\nFollow us on Instagram @wickedcustomapparel for exclusive  deals\r\nAnd tag us in a pic wearing our tops for a chance to be featured on our page ! \r\n - \r\nWelcome to Wicked Custom Apparel! \r\nSPRING 2016 DEALS ! !!\r\nPrices dramatically reduced ! and some deals below !\r\n\r\n \r\n\r\nwholesale pricing now available for boutiques/gyms/ studios/events/ birthdays and bachelorettes !\r\nFor wholesale/bulk  ordering information  please message us through etsy \r\n\r\n\r\nCREATE YOUR OWN SWEATSHIRT \r\nhttps://www.etsy.com/listing/250830644/customize-your-own-sweatshirt-ultra-soft\r\nCreate your own tank top \r\nhttps://www.etsy.com/listing/268274198/customize-your-own-ladies-muscle-tank\r\nCreate Your own tee ! \r\nhttps://www.etsy.com/listing/288272895/customize-your-own-t-shirt-choose-your\r\nOffering the most up to the minute pop culture inspired clothing !\r\n\r\nHAVE US CREATE CUSTOM APPAREL FOR YOUR BACHELORETTE PARTY, SWEET 16, BAT OR BAR MITZVAH , BIRTHDAY PARTY OR FOR ANY Occasion!\r\nMESSAGE US FOR MORE INFO !- \r\n\r\n\r\n\r\n\r\n\r\n CREATE CUSTOM SHIRTS FOR YOUR PARTY, BUSINESS OR FOR ANY EVENT !\r\nDISCOUNT FOR BULK ORDERS !\r\nMESSAGE US FOR MORE INFO ! AND WE WILL GET BACK TO YOU WITHIN MINUTES WITH A QUOTE AND MOCKUPS !\r\n\r\n\r\n\r\n\r\n\r\n\r\nDesigned in Brooklyn NYC . Our items are Printed in the United States.  . They are  an original inspired design.  The words used in the title and/or search terms are not intended to imply they are licensed by any rights holders.\r\n\r\n\r\n\r\nINTERNATIONAL CUSTOMERS: FREE SHIPPING ON ALL ORDERS $150 AND UP\r\nPROMO CODE: WICKEDFREESHIPPING27\r\n\r\n\r\n\r\nNEW!\r\nCREATE YOUR OWN SWEATSHIRT \r\nhttps://www.etsy.com/listing/250830644/customize-your-own-sweatshirt-ultra-soft\r\n\r\nGreat Birthday,  Christmas gifts or just something for yourself !\r\n\r\nWe ship worldwide - please see our shipping profile for international shipping costs \r\nAll Orders shipped within the United States, Ship USPS Priority mail \r\nAll International Order ship-USPS First Class mail\r\n\r\nProducts we use:\r\nCrew-Neck sweater; Jerzees OR GILDAN  brand style 562\r\n50% cotton, 50% polyester NuBlend® preshrunk fleece\r\nHooded PULLOVER sweatshirt: Jerzees OR GILDANbrand style 996 \r\n50% cotton, 50% polyester NuBlend® preshrunk fleece; Virtually pill-free with a high-stitch density\r\n\r\n\r\nMost designs are hand made using a vinyl laser cutter. This is a lengthy and detailed process, however we believe in delivering the very best quality of goods to our customers at the lowest price possible and quickest delivery possible. \r\n \r\n\r\n\r\n\r\n\r\n\r\nCan&#39;t find a design that you want ?\r\nCheck out the below listings or message us and we can probably create it for you ! \r\nhttps://www.etsy.com/listing/201431140/customize-your-own-sweatshirt-ultra-soft?\r\n\r\nhttps://www.etsy.com/listing/201431140/customize-your-own-sweatshirt-ultra-soft?","currency_code":"USD","is_vacation":false,"vacation_message":" We are working hard getting out christmas orders we will be back after the holidays !\r\n\r\n\r\nbest,\r\n\r\njake","sale_message":"TAG US ON OUR INSTAGRAM  @WICKEDCUSTOMAPPAREL\r\nWEARING YOUR NEW TOPS ! #WICKEDSTYLE\r\n\r\nThank you for ordering from Wicked Custom Apparel. We appreciate your business and hope you are satisfied with your purchase. Feel free to review your purchase on Etsy. Keep looking out for new items on our page !\r\nFollow us on Instagram and Twitter!  @Wickedcustomapparel \r\nWASHING INSTRUCTIONS:\r\nMachine wash cold wash inside out . Hang Dry\r\nFor our exchange and return policy \r\nplease see our shops page (policy section )\r\nGET *10% OFF YOUR NEXT ORDER WITH US !! \r\n USE CODE : WICKEDCUSTOM12\r\n* spend $20 or more (before shipping)\r\nsincerely,\r\nJake \r\nWicked Custom Apparel","digital_sale_message":null,"last_updated_tsz":1460663455,"listing_active_count":1868,"digital_listing_count":0,"login_name":"jakefallas","accepts_custom_requests":true,"policy_welcome":"Welcome to Wicked Custom Apparel\r\n\r\nAll items are custom made to order\r\nWe use only first quality garments. \r\nAdult and youth sizes available \r\n\r\n\r\n If you have any questions about any of our products or your order , please message us and we will get back to you asap \r\n  \r\n\r\n\r\nCustomize your own sweatshirt, t-shirt, or tank !\r\n\r\nhttps://www.etsy.com/listing/200526171/styles-94-dob-jersey-type-sweater-irwin","policy_payment":"PAYPAL,CREDIT CARDS( Discover,Amex,Visa,Mastercard ) and ETSY GIFT CARDS.\r\n\r\nFor International customers- (outside of the US)\r\nduties and other government imposed taxes are the responsibility of the purchaser\r\n\r\nOrder cancellation will only be accepted within 24 hours of placing the order\r\n","policy_shipping":"SELECT ITEMS SHIP OUT FROM OUR SHOP IN 3-5 BUSINESS DAYS \r\nmost items ship out in 5-7 business days \r\n\r\nFor International order (outside of USA)\r\nWe use USPS First Class Mail\r\nPlease make sure the address entered is correct. \r\nWe are not responsible for any orders that are returned to us (returned to sender)\r\nWE STRESS THE IMPORTANCE OF MAKING SURE THE ADDRESS IS ENTERED CORRECTLY AS THE CHANCES OF YOUR ORDER GETTING LOST IS HIGHLY LIKELY IF ANY DETAIL IS MISSING. \r\nDUTIES IMPOSED BY YOUR COUNTRY ARE ALSO NOT INCLUDED IN OUR PRICES AND MAY BE COLLECTED AT THE TIME OF SHIPMENT -BY YOUR COUNTRY \r\n \r\n\r\n\r\nALL OF US AT WICKED CUSTOM APPAREL WORK NON-STOP \r\nTO HAVE ALL ORDERS SHIPPED OUT IN a \r\nTimely manner \r\nPLEASE UNDERSTAND WE CUSTOM MAKE EACH ITEM AND IT MAY TAKE SOME TIME TO ARRIVE AT YOUR DOOR\r\n WE STRIVE ON OFFERING  HIGH QUALITY ITEMS TO YOU FOR LESS \r\nWE APPRECIATE YOUR BUSINESS AND WILL DO WHATEVER IT TAKES TO MAKE YOUR EXPERIENCE SHOPPING WITH US A GREAT ONE !\r\n\r\n\r\n\r\n\r\nIf you need your order rushed please contact us And we will be do our best to  \r\n\r\nU.S. CUSTOMERS )\r\n\r\n\r\n\r\nCustom name or create your own items   are custom made and take approximately 10 -12 business days  to make \r\nON THE DAY YOUR ORDER SHIPS YOU WILL RECEIVE AN EMAIL CONFIRMATION  WITH A TRACKING NUMBER. \r\n\r\nDuring holiday season (e.g. Christmas, New Years), shipping may incur delay. \r\n\r\n\r\nSHIPPING TIME\r\nFor U.S orders :\r\nONCE YOUR ORDER HAS SHIPPED\r\nWe ship USPS priority mail or First class mail depending on weight and Destination\r\nWhich usually takes 1-5 business days to arrive at your door ONCE the item has shipped .\r\nOur items are made using high quality garments / materials and we are able to offer you this at an affordable price \r\n\r\n\r\nUS CUSTOMERS- SPEND $75 OR MORE AND GET FREE SHIPPING\r\nUSE PROMO CODE - WICKED \r\n\r\n\r\nWE WILL Do our best to have it shipped out on time  \r\nIf you need it rushed please contact us \r\n\r\n\r\nON THE DAY YOUR ORDER SHIPS YOU WILL RECEIVE AN EMAIL CONFIRMATION  WITH A TRACKING NUMBER. \r\n\r\nSHIPPING TIME\r\nFor U.S orders :\r\nONCE YOUR ORDER HAS SHIPPED\r\nWe ship USPS priority mail or First class mail depending on weight and Destination\r\nWhich usually takes 1-4 business days to arrive at your door ONCE the item has shipped .\r\n\r\nInternational :\r\n7-21 days depending on the destination \r\n \r\n\r\nPlease make sure the address entered is correct and accurate \r\nWe are not responsible for any orders that are returned to us (returned to *we will ship to the address specified on your order. We are not responsible  If it is returned to us please make sure to double check the address is complete. \r\n\r\n\r\nFor International:\r\nWe use USPS First Class Mail\r\nPlease make sure the address entered is correct. \r\nWe are not responsible for any orders that are returned to us (returned to sender ) \r\n\r\n\r\n\r\nOnce your order is ready to ship you will receive an email notification as well as a tracking number for your order ","policy_refunds":"We strive to satisfy each and every customer\r\nWe will gladly Replace any item that is damaged \r\nPlease make sure the address entered is correct. \r\nSize measurements provided may not be exact as each garment is made differently  \r\n\r\nWe are not responsible for any orders that are returned to us (returned to sender ) \r\n\r\nitems cannot be returned as they are Custom made to order and are not stocked in our shop. Please pay attention to listing details and size charts we provide in the listing photos\r\nif you would like to exchange an item , the buyer is responsible for the shipping costs\r\nWe accept exchanges for size-  On select items- (tattoo sweatshirts , saying shirts ) we do not accept exchanges on  custom name items, and free items  ,\r\nOr any items that include a name and number on the back side of the shirt. if you have any questions please message us. (shipping is at the customers in expense) \r\nif you’d like to exchange your item please mail back to the return address listed.(using your own postage )\r\nOnce the item is shipped back to us please contact us and we will activate the exchange label for  purchase in our shop \r\n\r\n\r\nplease message us when you are ready to purchase the label and we will activate the listing \r\nexchange shipping label available  at the link below\r\nhttps://www.etsy.com/listing/205086257/this-listing-is-for-exchange-postage?\r\n\r\nplease email us with any questions:\r\nwickedcustomapparel@gmail.com","policy_additional":"For wholesale inquiries  and or    large quantity orders please message us for lower pricing or email us @\r\njake@wickedcustomapparel.com@\r\n\r\nMost of  our items are custom made in our shop using a vinyl laser cutter - with premium plus fashion film \r\nAlthough it&#39;s a lengthy and expensive process, we make sure to delivery to our customers the very best quality possible at the lowest price and fastest delivery possible. ","policy_seller_info":null,"policy_updated_tsz":1459799130,"policy_has_private_receipt_info":false,"vacation_autoreply":" We will do our best to get your order out as soon as possible. we received a lot more orders than expected and we will try our best to have it shipped out in the time specified. \r\nwe hope you can understand that each item is custom made and we strive to give you our customer the very best quality possible. \r\nI hope you can understand if your order is delayed a few days\r\nfeel free to contact me with any questions \r\njakefallas@gmail.com\r\n917-553-3185\r\n\r\nbest,\r\n\r\njake","url":"https://www.etsy.com/shop/WickedCustomApparel?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","image_url_760x100":"https://img1.etsystatic.com/112/0/9509677/iusb_760x100.20163943_qwsx.jpg","num_favorers":14591,"languages":["en-US"],"upcoming_local_event_id":null,"icon_url_fullxfull":"https://img0.etsystatic.com/135/0/9509677/isla_fullxfull.18037508_o1sm9fru.jpg","is_using_structured_policies":false,"has_onboarded_structured_policies":false,"has_unstructured_policies":true,"custom_shops_state":4}},{"listing_id":198434092,"state":"active","user_id":51495486,"category_id":68933690,"title":"Whiskey Tshirt, Nautical flag T shirt, American Apparel T-shirt, Country Fashion, Signal Flag, W t-shirt, graphic tee from Signal Whiskey.","description":"American Apparel Tee Nautical flag T shirt from Signal Whiskey.\n\nColor: Heather Charcoal.\n\nMake a subtle statement with the original Whiskey navel flag shirt. \n\nOn the open sea the Whiskey flag tells others &quot;I require medical assistance.&quot; But on your night out it may just mean.. I need Whiskey. Hey.. it&#39;s medicine right.\n\nMade from an American Apparel Tri-Blend Jersey with 50% Polyester, 25% Cotton and 25% Rayon. This shirt has the fit, feel and durability of a vintage Tshirt.\n\nAllow one week for processing.","creation_tsz":1460660883,"ending_tsz":1471201683,"original_creation_tsz":1406923649,"last_modified_tsz":1460660883,"price":"26.50","currency_code":"USD","quantity":7,"tags":["Signal Whiskey","Nautical Tshirt","signal flag tshirt","nautical flags","Men's Tshirt","graphic tee","black tshirt","nautical tee","Whiskey tshirt","Whiskey","silkscreen tshirt","American Apparel T","Country Fashion"],"category_path":["Clothing","Men","Tshirt"],"category_path_ids":[69150353,69153053,68933690],"materials":["American Apparel Tee"],"shop_section_id":15951771,"featured_rank":2,"state_tsz":1406923649,"url":"https://www.etsy.com/listing/198434092/whiskey-tshirt-nautical-flag-t-shirt?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","views":255,"num_favorers":25,"shipping_template_id":5006673564,"processing_min":null,"processing_max":null,"who_made":"i_did","is_supply":"false","when_made":"made_to_order","item_weight":null,"item_weight_units":null,"item_length":null,"item_width":null,"item_height":null,"item_dimensions_unit":"in","is_private":false,"recipient":"men","occasion":null,"style":null,"non_taxable":false,"is_customizable":false,"is_digital":false,"file_data":"","language":"en-US","has_variations":true,"taxonomy_id":449,"taxonomy_path":["Clothing","Men's Clothing","Shirts","T-shirts"],"used_manufacturer":false,"Images":[{"listing_image_id":661748512,"hex_code":"675E5C","red":103,"green":94,"blue":92,"hue":11,"saturation":10,"brightness":40,"is_black_and_white":false,"creation_tsz":1412285890,"listing_id":198434092,"rank":1,"url_75x75":"https://img0.etsystatic.com/045/0/9816948/il_75x75.661748512_75fo.jpg","url_170x135":"https://img0.etsystatic.com/045/0/9816948/il_170x135.661748512_75fo.jpg","url_570xN":"https://img0.etsystatic.com/045/0/9816948/il_570xN.661748512_75fo.jpg","url_fullxfull":"https://img0.etsystatic.com/045/0/9816948/il_fullxfull.661748512_75fo.jpg","full_height":1200,"full_width":803},{"listing_image_id":634938872,"hex_code":"796E68","red":121,"green":110,"blue":104,"hue":21,"saturation":14,"brightness":47,"is_black_and_white":false,"creation_tsz":1406943654,"listing_id":198434092,"rank":2,"url_75x75":"https://img0.etsystatic.com/041/0/9816948/il_75x75.634938872_bbff.jpg","url_170x135":"https://img0.etsystatic.com/041/0/9816948/il_170x135.634938872_bbff.jpg","url_570xN":"https://img0.etsystatic.com/041/0/9816948/il_570xN.634938872_bbff.jpg","url_fullxfull":"https://img0.etsystatic.com/041/0/9816948/il_fullxfull.634938872_bbff.jpg","full_height":1111,"full_width":1111},{"listing_image_id":635054461,"hex_code":"9F8673","red":159,"green":134,"blue":115,"hue":26,"saturation":27,"brightness":62,"is_black_and_white":false,"creation_tsz":1406943654,"listing_id":198434092,"rank":3,"url_75x75":"https://img1.etsystatic.com/035/0/9816948/il_75x75.635054461_79ch.jpg","url_170x135":"https://img1.etsystatic.com/035/0/9816948/il_170x135.635054461_79ch.jpg","url_570xN":"https://img1.etsystatic.com/035/0/9816948/il_570xN.635054461_79ch.jpg","url_fullxfull":"https://img1.etsystatic.com/035/0/9816948/il_fullxfull.635054461_79ch.jpg","full_height":716,"full_width":716}],"Shop":{"shop_id":9816948,"shop_name":"SignalWhiskey","user_id":51495486,"creation_tsz":1406920586,"title":"Vintage Style Nautical T-shirts and Signal Flag Tees","announcement":"Our signal flag tshirts are a great way to make a statement without saying a word. All of our nautically inspired tees are from our original designs and are lovingly made here in the US. Make sure you&#39;re sending the right signal, with Signal Whiskey. Custom orders are welcome.","currency_code":"USD","is_vacation":false,"vacation_message":null,"sale_message":"*** PLEASE READ *** *** VERY IMPORTANT INFORMATION ****\r\n\r\nThank you for your order! Due to high demand my current production time, before shipping, is running (about) 21 days.\r\n\r\n*** If you need it sooner, please do let me know right away so I can accommodate you.\r\n\r\nPlease use Etsy convo only for communication. Thank you.\r\n","digital_sale_message":null,"last_updated_tsz":1460660883,"listing_active_count":64,"digital_listing_count":0,"login_name":"SignalWhiskey","accepts_custom_requests":false,"policy_welcome":"Thank for stopping in at Signal Whiskey. Custom orders are welcome and we are constantly adding new designs, so stop back often.","policy_payment":null,"policy_shipping":"All items not requested for rush are custom, print on demand and take about three weeks for production. If you need it sooner please let us know at the time you place the order and we will work to accommodate you the best we can. ","policy_refunds":null,"policy_additional":null,"policy_seller_info":null,"policy_updated_tsz":1450715743,"policy_has_private_receipt_info":false,"vacation_autoreply":null,"url":"https://www.etsy.com/shop/SignalWhiskey?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","image_url_760x100":"https://img0.etsystatic.com/039/0/9816948/iusb_760x100.14167628_ik7o.jpg","num_favorers":121,"languages":["en-US"],"upcoming_local_event_id":null,"icon_url_fullxfull":"https://img0.etsystatic.com/126/0/9816948/isla_fullxfull.19540690_gywpk9iu.jpg","is_using_structured_policies":false,"has_onboarded_structured_policies":false,"has_unstructured_policies":true}},{"listing_id":93677215,"state":"active","user_id":7806860,"category_id":69150425,"title":"Personalized Whiskey Glasses, Groomsmen Rocks Glass, Groomsmen Gift Ideas, Personalized Low Ball Drinking Glasses, Bourbon, Bachelor","description":"Personalized Whiskey Groomsman Gifts double as Custom Glasses and Cool Groomsmen Favors. \n\nQuality personalized laser etched Whiskey Glasses from ScissorMill on Etsy.\n\nOur Laser Etched Rocks Glasses are thick walled with a Heavy Base & hold 10oz while featuring original designs by ScissorMill. \n\nQuestions?? - Just send us a Convo! We&#39;re here to help M-F 9am-5pm PST\n\n~This Listing is for (1) Personalized Glasses\n\nHow To Place An Order:\n1. Choose the Quantity needed (use the drop-down menu).\n2. Choose the Design Style (use the drop-down menu).\nNote: Design Styles are shown in the last picture.\n3. Add it to your cart.\n4. Write the Name, Title, Date, etc in the &quot;Note to ScissorMill&quot; when you check out.\n\nListings for Sets:\n(1) Glass https://www.etsy.com/listing/89549904/groomsmen-pilsner-glassesetched-giftbest?ref=shop_home_active_10\nSet of (2) - https://www.etsy.com/listing/225467392/2-groomsmen-glasses-set-of-2-beer-mugs?ref=shop_home_active_23\nSet of (3) - https://www.etsy.com/listing/225470901/set-of-3-groomsmen-gifts-gift-for?ref=shop_home_active_12\nSet of (4) - https://www.etsy.com/listing/225469904/set-of-4-groomsmen-gifts-father-of-the?ref=shop_home_active_15\nSet of (5) - https://www.etsy.com/listing/225473213/set-of-5-groomsmen-gifts-best-man-gift?ref=shop_home_active_20\nSet of (6) - https://www.etsy.com/listing/226511990/set-of-6-groomsmen-gifts-wedding-party?ref=shop_home_active_2\nSet of (7) - https://www.etsy.com/listing/226514295/set-of-7-groomsmen-favors-personalized?ref=shop_home_active_24\nSet of (8) - https://www.etsy.com/listing/226517901/set-of-8-groomsman-gift-ideas-gifts-for?ref=shop_home_active_21\nSet of (9) - https://www.etsy.com/listing/176269073/set-of-9-groomsmen-gift-ideas-best-man?ref=shop_home_active_20\nSet of (10) - https://www.etsy.com/listing/226654798/set-of-10-party-cups-corporate-gift?ref=shop_home_active_24\n\nSpecifications:\n~Rocks Glass is 3.875&quot; tall, holds 10 ounces of liquor, and has a a thick solid base.\n~Glasses are made in the USA by Libbey.\n~Gift Boxes are plain White. (2) Sheets of tissue paper are included for each Gift Box purchased.\n~We personalize each glass for you in our shop located in Temecula, California.\n\nAbout ScissorMill:\nAll of my items are new. I design each one myself. Every Glass is etched by laser. This makes for a truly unique piece you just can&#39;t find anywhere else. \n\nWe ship our personalized glass in USPS Priority Mail & FedEx Home Delivery. Each piece is individually bubble wrapped and all contents are packed tight. Glass is risky to ship, so I always take the time to do the best packing possible. (Rarely accidents happen, so I always save your images just in case another piece is needed.)\n\n••• By purchasing this listing you are agreeing to the store&#39;s terms found in the &quot;Shipping & Policies&quot; tab within this listing. •••","creation_tsz":1460660690,"ending_tsz":1471201490,"original_creation_tsz":1330013274,"last_modified_tsz":1460660690,"price":"10.00","currency_code":"USD","quantity":44,"tags":["gifts for groomsmen","personalized gifts","wedding party","groomsmen gifts","custom wedding","groomsman","Best man Gift","groomsman gift","rocks glass","whiskey glass","drinking glasses","personalized whiskey","groomsmen glass"],"category_path":["Housewares"],"category_path_ids":[69150425],"materials":["Glass","etched Glass"],"shop_section_id":14355454,"featured_rank":null,"state_tsz":1438586445,"url":"https://www.etsy.com/listing/93677215/personalized-whiskey-glasses-groomsmen?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","views":11436,"num_favorers":559,"shipping_template_id":null,"processing_min":3,"processing_max":5,"who_made":"i_did","is_supply":"false","when_made":"made_to_order","item_weight":null,"item_weight_units":null,"item_length":null,"item_width":null,"item_height":null,"item_dimensions_unit":"in","is_private":false,"recipient":"men","occasion":"wedding","style":["Traditional","Industrial"],"non_taxable":false,"is_customizable":false,"is_digital":false,"file_data":"","language":"en-US","has_variations":true,"taxonomy_id":1054,"taxonomy_path":["Home & Living","Kitchen & Dining","Drink & Barware"],"used_manufacturer":false,"Images":[{"listing_image_id":767275231,"hex_code":"88776D","red":136,"green":119,"blue":109,"hue":22,"saturation":19,"brightness":53,"is_black_and_white":false,"creation_tsz":1430762159,"listing_id":93677215,"rank":1,"url_75x75":"https://img1.etsystatic.com/068/1/5615430/il_75x75.767275231_q05j.jpg","url_170x135":"https://img1.etsystatic.com/068/1/5615430/il_170x135.767275231_q05j.jpg","url_570xN":"https://img1.etsystatic.com/068/1/5615430/il_570xN.767275231_q05j.jpg","url_fullxfull":"https://img1.etsystatic.com/068/1/5615430/il_fullxfull.767275231_q05j.jpg","full_height":1500,"full_width":1279},{"listing_image_id":767219408,"hex_code":"B99C7F","red":185,"green":156,"blue":127,"hue":30,"saturation":31,"brightness":72,"is_black_and_white":false,"creation_tsz":1430767702,"listing_id":93677215,"rank":2,"url_75x75":"https://img0.etsystatic.com/061/1/5615430/il_75x75.767219408_5m3w.jpg","url_170x135":"https://img0.etsystatic.com/061/1/5615430/il_170x135.767219408_5m3w.jpg","url_570xN":"https://img0.etsystatic.com/061/1/5615430/il_570xN.767219408_5m3w.jpg","url_fullxfull":"https://img0.etsystatic.com/061/1/5615430/il_fullxfull.767219408_5m3w.jpg","full_height":1333,"full_width":1001},{"listing_image_id":767272057,"hex_code":"C7BAAF","red":199,"green":186,"blue":175,"hue":28,"saturation":12,"brightness":78,"is_black_and_white":false,"creation_tsz":1430762159,"listing_id":93677215,"rank":3,"url_75x75":"https://img1.etsystatic.com/065/0/5615430/il_75x75.767272057_tpo5.jpg","url_170x135":"https://img1.etsystatic.com/065/0/5615430/il_170x135.767272057_tpo5.jpg","url_570xN":"https://img1.etsystatic.com/065/0/5615430/il_570xN.767272057_tpo5.jpg","url_fullxfull":"https://img1.etsystatic.com/065/0/5615430/il_fullxfull.767272057_tpo5.jpg","full_height":1500,"full_width":1018},{"listing_image_id":767299499,"hex_code":"767069","red":118,"green":112,"blue":105,"hue":32,"saturation":11,"brightness":46,"is_black_and_white":false,"creation_tsz":1430763469,"listing_id":93677215,"rank":4,"url_75x75":"https://img1.etsystatic.com/058/1/5615430/il_75x75.767299499_c8kj.jpg","url_170x135":"https://img1.etsystatic.com/058/1/5615430/il_170x135.767299499_c8kj.jpg","url_570xN":"https://img1.etsystatic.com/058/1/5615430/il_570xN.767299499_c8kj.jpg","url_fullxfull":"https://img1.etsystatic.com/058/1/5615430/il_fullxfull.767299499_c8kj.jpg","full_height":1500,"full_width":1000},{"listing_image_id":767152870,"hex_code":"9A9A9A","red":154,"green":154,"blue":154,"hue":0,"saturation":0,"brightness":60,"is_black_and_white":null,"creation_tsz":1430762159,"listing_id":93677215,"rank":5,"url_75x75":"https://img0.etsystatic.com/056/1/5615430/il_75x75.767152870_dqzm.jpg","url_170x135":"https://img0.etsystatic.com/056/1/5615430/il_170x135.767152870_dqzm.jpg","url_570xN":"https://img0.etsystatic.com/056/1/5615430/il_570xN.767152870_dqzm.jpg","url_fullxfull":"https://img0.etsystatic.com/056/1/5615430/il_fullxfull.767152870_dqzm.jpg","full_height":1500,"full_width":1001}],"Shop":{"shop_id":5615430,"shop_name":"ScissorMill","user_id":7806860,"creation_tsz":1249264602,"title":"Personalized Groomsmen Gifts &  Bridesmaid Gifts","announcement":"Welcome to ScissorMill.com! We laser engrave memorable gifts for Weddings, Mother&#39;s Day, Father&#39;s Day & Christmas.","currency_code":"USD","is_vacation":false,"vacation_message":null,"sale_message":"Please verify the shipping address on this invoice is correct. We will send an order confirmation via the Etsy Convo System. Please LOG IN to your ETSY account to read it & answer any questions we may have. Thank you so much for your business!\r\n\r\n","digital_sale_message":null,"last_updated_tsz":1460661956,"listing_active_count":177,"digital_listing_count":0,"login_name":"woobiemommy","accepts_custom_requests":true,"policy_welcome":"Thanks for visiting ScissorMill!\r\n\r\n Our Office Manager, Vontrice, is available online between the hours of 9am-5pm Monday thru Friday. \r\n\r\n**We all have families and enjoy spending time with them on the weekends.\r\n\r\n  RUSH Orders are available but you MUST contact us for approval on your purchase before placing it. \r\n\r\nScissorMill also owns & operates a second store on Etsy called PoppinPrint","policy_payment":"SECURE OPTIONS\nEtsy keeps your payment information secure. Sellers don't receive your credit card information.\n- Visa\n- MasterCard\n- American Express\n- Discover\n- PayPal\n- Apple Pay\n- SOFORT Bank Transfer\n- iDEAL\n- Etsy Gift Card","policy_shipping":"PROCESSING TIME\nThe time I need to prepare an order for shipping varies. For details, see individual items.\n\nESTIMATED SHIPPING TIME\nNorth America: 4 - 6 business days\n\nI'll do my best to meet these shipping estimates, but cannot guarantee them. Actual delivery time will depend on the shipping method you choose.\n\nCUSTOMS AND DUTIES FEES\nBuyers are responsible for any customs or duties fees that may apply. Sellers aren't responsible for delays due to customs","policy_refunds":"I DON'T ACCEPT RETURNS, EXCHANGES, OR CANCELLATIONS\nBut please contact me if you have any problems with your order.","policy_additional":"I will only use your shipping and billing address, and contact information\n- To communicate with you about your order\n- To fulfill your order\n- For legal reasons (like paying taxes)","policy_seller_info":"","policy_updated_tsz":1455055660,"policy_has_private_receipt_info":false,"vacation_autoreply":null,"url":"https://www.etsy.com/shop/ScissorMill?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","image_url_760x100":"https://img1.etsystatic.com/136/0/5615430/iusb_760x100.18072711_o7qz.jpg","num_favorers":14418,"languages":["en-US"],"upcoming_local_event_id":null,"icon_url_fullxfull":"https://img1.etsystatic.com/129/0/5615430/isla_fullxfull.17428297_l2g816dv.jpg","is_using_structured_policies":true,"has_onboarded_structured_policies":true,"has_unstructured_policies":true,"custom_shops_state":0}},{"listing_id":252580922,"state":"active","user_id":66243346,"category_id":68933854,"title":"Sunshine & Whiskey Relaxed Fit Tank Top, Country Tank Top, Workout Tank Top, Concert Tank Top, Spring Break Tank","description":"If you need your shirt by a certain day PLEASE message me first to make sure it can be done. If you do not message me first, I am not responsible if your item does not arrive by desired date. I have a 1-2 week processing time. I am a one person shop and I am in it 10 hours a day 7 days a week. I do the best I can to get orders out quickly but please have patience :))\n\nCheck my shop announcement for any shipping delays (holidays, personal matters etc.)\n\nRelaxed Fit Tank Top\nBrand - Next Level Apparel\n100% Cotton Runs true to size. For petite women, these have been known to run a little big.\n\nThese tank tops are great for going out to the bar, concerts, casual wear or even to work out in! \nThe fabric is very soft and breathable, and the colors are vibrant and eye catching!\n\nIf you don’t see a design you like, feel free to request a custom order!\n\nSee ready made shirts and catch sales on my Instagram!\nwww.Instagram.com/southernsoulapparel\n\nSend me a selfie of you in your new shirt and I will send you a 40% off coupon!","creation_tsz":1460660523,"ending_tsz":1471201323,"original_creation_tsz":1445226424,"last_modified_tsz":1460660523,"price":"19.99","currency_code":"USD","quantity":18,"tags":["country tank top","country t shirt","southern tank top","loose tank top","concert tank top","country concert","workout tank top","country music shirt","country quotes tank","southern soul","whiskey tank","whiskey girl","sunshine and whiskey"],"category_path":["Clothing","Women","Shirt"],"category_path_ids":[69150353,69152559,68933854],"materials":[],"shop_section_id":17875708,"featured_rank":null,"state_tsz":1460059567,"url":"https://www.etsy.com/listing/252580922/sunshine-whiskey-relaxed-fit-tank-top?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","views":198,"num_favorers":50,"shipping_template_id":12551546121,"processing_min":5,"processing_max":10,"who_made":"i_did","is_supply":"false","when_made":"made_to_order","item_weight":null,"item_weight_units":null,"item_length":null,"item_width":null,"item_height":null,"item_dimensions_unit":"in","is_private":false,"recipient":"women","occasion":null,"style":null,"non_taxable":false,"is_customizable":true,"is_digital":false,"file_data":"","language":"en-US","has_variations":true,"taxonomy_id":553,"taxonomy_path":["Clothing","Women's Clothing","Tops & Tees"],"used_manufacturer":false,"Images":[{"listing_image_id":949587862,"hex_code":"918F90","red":145,"green":143,"blue":144,"hue":330,"saturation":1,"brightness":56,"is_black_and_white":false,"creation_tsz":1459403135,"listing_id":252580922,"rank":1,"url_75x75":"https://img0.etsystatic.com/112/1/11120147/il_75x75.949587862_27q9.jpg","url_170x135":"https://img0.etsystatic.com/112/1/11120147/il_170x135.949587862_27q9.jpg","url_570xN":"https://img0.etsystatic.com/112/1/11120147/il_570xN.949587862_27q9.jpg","url_fullxfull":"https://img0.etsystatic.com/112/1/11120147/il_fullxfull.949587862_27q9.jpg","full_height":1125,"full_width":816},{"listing_image_id":918538114,"hex_code":"B7B4B0","red":183,"green":180,"blue":176,"hue":34,"saturation":3,"brightness":71,"is_black_and_white":false,"creation_tsz":1454895116,"listing_id":252580922,"rank":2,"url_75x75":"https://img0.etsystatic.com/118/0/11120147/il_75x75.918538114_l14r.jpg","url_170x135":"https://img0.etsystatic.com/118/0/11120147/il_170x135.918538114_l14r.jpg","url_570xN":"https://img0.etsystatic.com/118/0/11120147/il_570xN.918538114_l14r.jpg","url_fullxfull":"https://img0.etsystatic.com/118/0/11120147/il_fullxfull.918538114_l14r.jpg","full_height":1040,"full_width":1500},{"listing_image_id":918283415,"hex_code":"BBBAB9","red":187,"green":186,"blue":185,"hue":30,"saturation":1,"brightness":73,"is_black_and_white":null,"creation_tsz":1454895116,"listing_id":252580922,"rank":3,"url_75x75":"https://img1.etsystatic.com/128/0/11120147/il_75x75.918283415_363l.jpg","url_170x135":"https://img1.etsystatic.com/128/0/11120147/il_170x135.918283415_363l.jpg","url_570xN":"https://img1.etsystatic.com/128/0/11120147/il_570xN.918283415_363l.jpg","url_fullxfull":"https://img1.etsystatic.com/128/0/11120147/il_fullxfull.918283415_363l.jpg","full_height":481,"full_width":680}],"Shop":{"shop_id":11120147,"shop_name":"SouthernSoulApparel","user_id":66243346,"creation_tsz":1431410552,"title":"Southern Style Tanks & Tees","announcement":"Welcome to Southern Soul Apparel!\r\n\r\nHere you will find southern style and country inspired tanks and tees.\r\nI try to add new designs daily but if you still don&#39;t see what your looking for, request a custom order!\r\n\r\nFollow me on Instagram & Facebook to catch coupon codes, upcoming specials & what&#39;s new. @southernsoulapparel www.facebook.com/southernsoulapparel17.com\r\n\r\nProcessing time is 1-2 weeks. Please have patience, I am a one person shop, I am working it 7 days a week doing the best I can to get orders out quickly.\r\nPlease do not contact me about completely copying another design found on the web, I will not do it.\r\n\r\n","currency_code":"USD","is_vacation":false,"vacation_message":"Working on open orders! Will be back open soon.","sale_message":"Thanks for buyin&#39;!\r\nDon&#39;t forget to send a selfie for a 40% off coupon!\r\nFollow me on instagram to catch sales and promotions!","digital_sale_message":null,"last_updated_tsz":1460660523,"listing_active_count":205,"digital_listing_count":0,"login_name":"countrybabycouture1","accepts_custom_requests":true,"policy_welcome":"Thanks for visiting my shop! Feel free to message me with custom orders.\r\n\r\n\r\n\r\n\r\n","policy_payment":"Other is for previously discussed means of payment ONLY (mainly local purchases) No cancellations after 24hrs of purchase.\r\n","policy_shipping":"Once tracking states &quot;Delivered&quot; I am no longer responsible. If your order is lost in the mail I will replace it (USA only).\r\nProcessing time is 1-2 weeks. I am a one person shop and I do the best I can to get orders out quickly but please remember it&#39;s just me with many orders a week. ","policy_refunds":"All sales are final,reason being all shirts are custom made to order. I do not carry an inventory of shirts these are printed when purchased. If you find a serious problem with your order please message me to resolve it!\r\nWill not refund if shirt does not arrive on time I do not control the Postal Service.\r\n","policy_additional":"These shirts are printed with VINYL. The reason I use vinyl is because it doesn&#39;t crack, doesn&#39;t fade. Your decal will look as good as the day you received it no matter how many washes. Vinyl is HEAT PRESSED professionally at 320 degrees. \r\n\r\nMy items are handmade. The vinyl is sometimes hand cut and they are hand printed. Handmade may come with little imperfections but none that would distort the beauty of the shirt in any way. By purchasing from my shop you agree to this statement. \r\nWe all have different gadgets sometimes the colors may be a little different from what is seen in the listing but beautiful none the less!\r\n\r\n \r\n\r\n","policy_seller_info":null,"policy_updated_tsz":1460641811,"policy_has_private_receipt_info":false,"vacation_autoreply":"Hey lovelies! Shop is on break and I am working on all open orders now, I have been experiencing high volume orders and I am a one person shop. I am doing the best I can to get orders out asap. Thanks for your patience. ","url":"https://www.etsy.com/shop/SouthernSoulApparel?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","image_url_760x100":"https://img0.etsystatic.com/139/0/11120147/iusb_760x100.17811276_6346.jpg","num_favorers":661,"languages":["en-US"],"upcoming_local_event_id":null,"icon_url_fullxfull":"https://img1.etsystatic.com/139/0/11120147/isla_fullxfull.17807757_m2z4ji1e.jpg","is_using_structured_policies":false,"has_onboarded_structured_policies":false,"has_unstructured_policies":true,"custom_shops_state":3}},{"listing_id":210491829,"state":"active","user_id":32660934,"category_id":68887494,"title":"Personalized 6 oz Stainless Steel Metal Whiskey Scotch Flask Unique Men Christmas, Groomsmen, Man Cave, 21st Birthday Gift","description":"Unique one of a kind metal whiskey 6 oz. flask with option wood box. These personalized etched flask are a certain hit. Perfect groomsmen gift, birthday gift for men, man cave gift. We can engrave anything you want, logos, graphics, saying, etc. We do have graphic ideas, see image #5.  Let us know at checkout in sellers notes how you want engraved. \r\n\r\nFlask Size = 4.5&quot; x 3&quot; x 1&quot;\r\nWood Box Size = 5&quot; x 5.5&quot; x 2.5&quot;\r\n\r\nGraphic Ideas\r\n\r\nImage #5 are some design options available, if you want to use any  of these, please specify the graphic item code at checkout in sellers notes along with customization details. \r\n\r\nQuote Ideas \r\n\r\nThese come personalized with or without whiskey quotes, here&#39;s some ideas:\r\n\r\n1) “A drunk man’s words are a sober man’s thoughts.” ~ Steve Fergosi\r\n2) “Work is the curse of the drinking classes.” ~ Oscar Wilde \r\n3) “Reality is an illusion created by a lack of alcohol.” ~ N.F. Simpson \r\n4) “He that drinks fast, pays slow.” ~ Benjamin Franklin \r\n5) “Responsible drinking? Now that’s an oxymoron.” ~ Aaron Howard \r\n6) “I know a lot more old drunks than old doctors.” ~ Joe E. Lewis \r\n7) “Alcoholic friends are as easy to make as Sea Monkeys.” ~ Dry \r\n8) “I’ve never been drunk, but often I’ve been overserved.” ~ George Gobel\r\n\r\nWithout Box Item Code 024841\r\nWith Box Item Code 024981","creation_tsz":1460660336,"ending_tsz":1471201136,"original_creation_tsz":1415605125,"last_modified_tsz":1460660336,"price":"21.59","currency_code":"USD","quantity":966,"tags":["glass flask","groomsmen flask","flask","whiskey flask","unique flask","personalized flask","21st birthday gift","unique gift for men","groomsmen gift","6 oz flask","steel flask","whiskey decanter","personalized gifts"],"category_path":["Weddings"],"category_path_ids":[68887494],"materials":["glass","stainless steel"],"shop_section_id":13510077,"featured_rank":null,"state_tsz":1460659735,"url":"https://www.etsy.com/listing/210491829/personalized-6-oz-stainless-steel-metal?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","views":1024,"num_favorers":49,"shipping_template_id":null,"processing_min":3,"processing_max":5,"who_made":"i_did","is_supply":"false","when_made":"made_to_order","item_weight":null,"item_weight_units":null,"item_length":null,"item_width":null,"item_height":null,"item_dimensions_unit":null,"is_private":false,"recipient":null,"occasion":null,"style":null,"non_taxable":false,"is_customizable":false,"is_digital":false,"file_data":"","language":"en-US","has_variations":true,"taxonomy_id":1668,"taxonomy_path":["Weddings","Gifts & Mementos","Groomsmen Gifts"],"used_manufacturer":false,"Images":[{"listing_image_id":679876316,"hex_code":"785F5A","red":120,"green":95,"blue":90,"hue":10,"saturation":25,"brightness":47,"is_black_and_white":false,"creation_tsz":1415605125,"listing_id":210491829,"rank":1,"url_75x75":"https://img0.etsystatic.com/059/0/8057725/il_75x75.679876316_mivq.jpg","url_170x135":"https://img0.etsystatic.com/059/0/8057725/il_170x135.679876316_mivq.jpg","url_570xN":"https://img0.etsystatic.com/059/0/8057725/il_570xN.679876316_mivq.jpg","url_fullxfull":"https://img0.etsystatic.com/059/0/8057725/il_fullxfull.679876316_mivq.jpg","full_height":600,"full_width":600},{"listing_image_id":679876040,"hex_code":"5F4337","red":95,"green":67,"blue":55,"hue":18,"saturation":42,"brightness":37,"is_black_and_white":false,"creation_tsz":1415605125,"listing_id":210491829,"rank":2,"url_75x75":"https://img0.etsystatic.com/049/0/8057725/il_75x75.679876040_k4f1.jpg","url_170x135":"https://img0.etsystatic.com/049/0/8057725/il_170x135.679876040_k4f1.jpg","url_570xN":"https://img0.etsystatic.com/049/0/8057725/il_570xN.679876040_k4f1.jpg","url_fullxfull":"https://img0.etsystatic.com/049/0/8057725/il_fullxfull.679876040_k4f1.jpg","full_height":600,"full_width":600},{"listing_image_id":679875804,"hex_code":"5F4C4A","red":95,"green":76,"blue":74,"hue":6,"saturation":22,"brightness":37,"is_black_and_white":false,"creation_tsz":1415605125,"listing_id":210491829,"rank":3,"url_75x75":"https://img0.etsystatic.com/059/0/8057725/il_75x75.679875804_4tta.jpg","url_170x135":"https://img0.etsystatic.com/059/0/8057725/il_170x135.679875804_4tta.jpg","url_570xN":"https://img0.etsystatic.com/059/0/8057725/il_570xN.679875804_4tta.jpg","url_fullxfull":"https://img0.etsystatic.com/059/0/8057725/il_fullxfull.679875804_4tta.jpg","full_height":600,"full_width":600},{"listing_image_id":679876214,"hex_code":"5A4A47","red":90,"green":74,"blue":71,"hue":9,"saturation":21,"brightness":35,"is_black_and_white":false,"creation_tsz":1415605125,"listing_id":210491829,"rank":4,"url_75x75":"https://img0.etsystatic.com/056/0/8057725/il_75x75.679876214_mfue.jpg","url_170x135":"https://img0.etsystatic.com/056/0/8057725/il_170x135.679876214_mfue.jpg","url_570xN":"https://img0.etsystatic.com/056/0/8057725/il_570xN.679876214_mfue.jpg","url_fullxfull":"https://img0.etsystatic.com/056/0/8057725/il_fullxfull.679876214_mfue.jpg","full_height":600,"full_width":600},{"listing_image_id":679876324,"hex_code":"E2E2E2","red":226,"green":226,"blue":226,"hue":0,"saturation":0,"brightness":88,"is_black_and_white":false,"creation_tsz":1415605125,"listing_id":210491829,"rank":5,"url_75x75":"https://img0.etsystatic.com/047/0/8057725/il_75x75.679876324_6h5o.jpg","url_170x135":"https://img0.etsystatic.com/047/0/8057725/il_170x135.679876324_6h5o.jpg","url_570xN":"https://img0.etsystatic.com/047/0/8057725/il_570xN.679876324_6h5o.jpg","url_fullxfull":"https://img0.etsystatic.com/047/0/8057725/il_fullxfull.679876324_6h5o.jpg","full_height":598,"full_width":662}],"Shop":{"shop_id":8057725,"shop_name":"TealsPrairie","user_id":32660934,"creation_tsz":1366241465,"title":"Teals Prairie & Co. | Specialty Gift Engravers ","announcement":"You see, all products are personalized with initials, graphics or anything you want. There is no setup or engraving fee. To personalize, at checkout in &quot;Notes to Seller&quot; type instructions and if you&#39;re including a graphic, provide an online link or e-mail it when we contact you. ","currency_code":"USD","is_vacation":false,"vacation_message":null,"sale_message":"Our current production time is 1 week in addition to the listed production time, excluding shipping time. We will return to our regular production schedule Feb. 14, 2016. Thank you!\r\n\r\nSTOP: support@tealsprairieco.zendesk.com\r\n\r\nSTOP: PLEASE CHECK YOUR SHIPPING ADDRESS, IF INCORRECT, PLEASE NOTIFY US IMMEDIATELY. PACKAGES SHIPPED TO  THE WRONG ADDRESS WILL NOT BE REPRODUCED. WE WILL RE-SHIP AT YOUR EXPENSE ONCE THE PACKAGE HAS RETURNED. WE ARE NOT RESPONSIBLE FOR PACKAGES SHIPPED TO THE WRONG ADDRESS.  \r\n\r\nSTOP: WE DO NOT GUARANTEE DELIVERIES BY ANY DEADLINE. ALL OF OUR PRODUCTS ARE MADE-TO-ORDER AND PERSONALIZED. SHIPPING TIME IS ESTIMATED ONLY. GENERALLY SPEAKING, WE NEED 2 WEEKS FROM ORDER TO DELIVERY. \r\n\r\nPlease email support@tealsprairieco.zendesk.com for after-sales support. Include order # in subject line. But first, here are our top 4 FAQs.\r\n\r\nQUESTION: WHERE IS MY ORDER?\r\n\r\nreply: you see, if you placed an orders and within 36 hours (excluding weekends) you did NOT hear from us by email with proofs to confirm or additional questions, this means we understood your customization request and put the order immediately into production. from order to delivery, we need 7 - 10 business days. tracking numbers are automatically emailed; however some email servers reject these emails, in which case, we apologize for the inconvenience, but kindly ask that you be patient until the 10 business days delivery time has expired before contacting us by email for an update. CHECK YOUR SPAM FOLDER \r\n\r\nNote: 95% of the time orders placed by Thursday are delivered by that following Friday. If this wasn&#39;t helpful, send us an email, as we are no longer doing after-sales support directly on Etsy. \r\n\r\n\r\nQUESTION: MY ORDER ARRIVED BROKE, ENGRAVED WRONG, ETC. WHAT&#39;S NEXT?\r\n\r\nreply: you see, we always and without question replace broken, incorrectly engraved items, free of charge, so please don&#39;t worry. just email us, let us know exactly what needs to be replaced along with a few supporting images (if convenient). typically speaking, lead-time for replacements are the same as the original order. If this wasn&#39;t helpful, send us an email, as we are no longer doing after-sales support directly on Etsy. \r\n\r\nQUESTION: I FORGOT TO LEAVE PERSONALIZATION DETAILS \r\n\r\nreply: you see, just send those details to the email address above with order # in subject line. we do not ship blank, non-personalized items. If this wasn&#39;t helpful, send us an email, as we are no longer doing after-sales support directly on Etsy. \r\n\r\nQUESTION: I NEED TO CHANGE MY SHIPPING ADDRESS \r\n\r\nreply: you see, as long as the order hasn&#39;t shipped, we can change the shipping address. simply email the shipping address with order # in subject line. If this wasn&#39;t helpful, send us an email, as we are no longer doing after-sales support directly on Etsy. \r\n\r\nWe appreciate your business. \r\n\r\nTeals Prairie & Co.\r\nsupport@tealsprairieco.zendesk.com","digital_sale_message":null,"last_updated_tsz":1460663897,"listing_active_count":2060,"digital_listing_count":0,"login_name":"TealsPrairie","accepts_custom_requests":false,"policy_welcome":"Keep it affordable. ","policy_payment":"Paypal only.\r\n\r\n","policy_shipping":"FOR INTERNATIONAL DELIVERIES, WE ARE NOT RESPONSIBLE FOR DUTIES AND TAXES COLLECTED BY YOUR COUNTRY&#39;S CUSTOM OFFICE. THESE ARE NOT INCLUDED IN YOUR SHIPPING COST. \r\n\r\nWE DO NOT GUARANTEE DELIVERIES BY ANY DEADLINE. ALL OF OUR PRODUCTS ARE MADE-TO-ORDER AND PERSONALIZED. SHIPPING TIME IS ESTIMATED ONLY. GENERALLY SPEAKING, WE NEED  7 BUSINESS DAYS. ","policy_refunds":"No refunds on customized items; however if you get the item damaged to a point that it cannot be used, we will redo and reship at our cost. If the item is damaged, e.g. scratched, but still can be used, we&#39;ll come up with a reasonable settlement.\r\n\r\n","policy_additional":"Owing to the sudden growth of our international business (thank you Etsy!), the brother in our team has opened a very, very little work shop in Hong Kong. This effort not only moves us closer to some of our suppliers, but also allows us to ship international orders to Australia, Singapore, Japan, etc. including much of Europe, South America... cheaper and faster. \r\n\r\nNorth American customers, mainly USA and Canada, will not be affected by this addition, for you good folks, it&#39;s business as usual: engraved and shipped from Houston, Texas. Yee Haw!\r\n\r\nThis concept looked good on paper, let&#39;s hope it pays off- wish us luck!\r\n\r\nLastly, for items with multiple colors, for example journals, since our suppliers cannot keep accurate stock levels, we may substitute your purchase with the same product in a different stocked color. \r\n  \r\nImportant Notes:\r\n\r\n*Expedited orders, large orders or orders with not stock in the USA will come from our Hong Kong shop. We reserve the right to ship from either shops. \r\n\r\n*Ordering samples before a large order is prudent; however owing to the nature of our business, we cannot guarantee a sample and the final production will look &quot;exactly&quot; alike as we have different machinist and many machines that all engrave / print slightly different. If getting &quot;exact&quot; is critical, please let us know at order so we can find the previous order documents and make sure we use the same machinist to engrave the order. We may request a visual photo of the sample for a final reference.   \r\n","policy_seller_info":"PO Box 1538\r\nFresno, TX 77545\r\n1-800-925-7044","policy_updated_tsz":1455255726,"policy_has_private_receipt_info":false,"vacation_autoreply":null,"url":"https://www.etsy.com/shop/TealsPrairie?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","image_url_760x100":"https://img1.etsystatic.com/030/0/8057725/iusb_760x100.14286491_ae7v.jpg","num_favorers":22221,"languages":["en-US"],"upcoming_local_event_id":null,"icon_url_fullxfull":"https://img0.etsystatic.com/105/0/8057725/isla_fullxfull.18388728_dhqi44v9.jpg","is_using_structured_policies":false,"has_onboarded_structured_policies":false,"has_unstructured_policies":true}},{"listing_id":255254154,"state":"active","user_id":16132772,"category_id":68887494,"title":"1 Flask, Personalized Groomsmen Gift, Engraved Hip Flask, Etched Whiskey Flask, Best Mans Gift, Bridal Party, Wedding Party Gift","description":"This listing is for ONE or MORE flasks, personalized with any one of the above engraving designs.\n\nDesigned to carry liquor, our 6 oz. brown, wrapped faux leather flasks are made of stainless steel. Our state-of-the-art laser engraves the faux leather resulting in a medium brown engraving. The listing includes a free silver stainless steel shot cup.\n\nSPECIFICATIONS:\n3-1/2&quot; wide x 4&quot; tall;\nHolds 6 ounces of liquor;\nFood grade stainless steel;\nSilver stainless steel cup holds 1 ounce of liquor.\n\nPERSONALIZATION:\nWe will laser-engrave the front side of each flask with your personalized information. Please see the engraving design/layout from the photos above and/or the drop-down menu.\n\nORDERING:\nSelect the quantity and design from the drop-down menus, click the green &#39;add to cart&#39; button, and specify all engraving information in the note box on the add to cart page, including the following information if applicable:\n1) Name;\n2) Title;\n3) Wedding date.\n\nMost orders are ready and shipped within 3 to 5 business days after receiving payment.\n\nINTERNATIONAL ORDERS are WELCOME!\n\nThank you for visiting our shop!\n* * * * * * * * * * * * * * * * * * * * * *","creation_tsz":1460660254,"ending_tsz":1471201054,"original_creation_tsz":1446939255,"last_modified_tsz":1460660254,"price":"8.95","currency_code":"USD","quantity":97,"tags":["flask","personalized flask","groomsman gift","groomsmen gift","groomsmen gifts","Engraved Hip Flask","wedding","wedding gift","best man flask","engraved flask","wedding party gift","personalized","bridesmaids gift"],"category_path":["Weddings"],"category_path_ids":[68887494],"materials":["food grade stainless steel","faux leather wrapped on stainless steel flask"],"shop_section_id":11197327,"featured_rank":null,"state_tsz":1455246980,"url":"https://www.etsy.com/listing/255254154/1-flask-personalized-groomsmen-gift?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","views":638,"num_favorers":199,"shipping_template_id":24411760167,"processing_min":3,"processing_max":5,"who_made":"i_did","is_supply":"false","when_made":"made_to_order","item_weight":null,"item_weight_units":null,"item_length":null,"item_width":null,"item_height":null,"item_dimensions_unit":"in","is_private":false,"recipient":"men","occasion":"wedding","style":null,"non_taxable":false,"is_customizable":false,"is_digital":false,"file_data":"","language":"en-US","has_variations":true,"taxonomy_id":1668,"taxonomy_path":["Weddings","Gifts & Mementos","Groomsmen Gifts"],"used_manufacturer":false,"Images":[{"listing_image_id":864228859,"hex_code":"9A7964","red":154,"green":121,"blue":100,"hue":23,"saturation":35,"brightness":60,"is_black_and_white":false,"creation_tsz":1446939256,"listing_id":255254154,"rank":1,"url_75x75":"https://img1.etsystatic.com/130/0/6476377/il_75x75.864228859_gj7k.jpg","url_170x135":"https://img1.etsystatic.com/130/0/6476377/il_170x135.864228859_gj7k.jpg","url_570xN":"https://img1.etsystatic.com/130/0/6476377/il_570xN.864228859_gj7k.jpg","url_fullxfull":"https://img1.etsystatic.com/130/0/6476377/il_fullxfull.864228859_gj7k.jpg","full_height":1116,"full_width":1275},{"listing_image_id":864461900,"hex_code":"9C7A66","red":156,"green":122,"blue":102,"hue":22,"saturation":34,"brightness":61,"is_black_and_white":false,"creation_tsz":1446939256,"listing_id":255254154,"rank":2,"url_75x75":"https://img0.etsystatic.com/131/0/6476377/il_75x75.864461900_d4f0.jpg","url_170x135":"https://img0.etsystatic.com/131/0/6476377/il_170x135.864461900_d4f0.jpg","url_570xN":"https://img0.etsystatic.com/131/0/6476377/il_570xN.864461900_d4f0.jpg","url_fullxfull":"https://img0.etsystatic.com/131/0/6476377/il_fullxfull.864461900_d4f0.jpg","full_height":1074,"full_width":1202},{"listing_image_id":756131701,"hex_code":"A0988E","red":160,"green":152,"blue":142,"hue":33,"saturation":11,"brightness":62,"is_black_and_white":false,"creation_tsz":1446939256,"listing_id":255254154,"rank":3,"url_75x75":"https://img1.etsystatic.com/063/0/6476377/il_75x75.756131701_fuqh.jpg","url_170x135":"https://img1.etsystatic.com/063/0/6476377/il_170x135.756131701_fuqh.jpg","url_570xN":"https://img1.etsystatic.com/063/0/6476377/il_570xN.756131701_fuqh.jpg","url_fullxfull":"https://img1.etsystatic.com/063/0/6476377/il_fullxfull.756131701_fuqh.jpg","full_height":665,"full_width":1000}],"Shop":{"shop_id":6476377,"shop_name":"AKLaser","user_id":16132772,"creation_tsz":1313467446,"title":"Personalized Flasks","announcement":"**QUICK TURN AROUND TIME & FREE SHOT GLASS with every flask purchased. Most orders will be processed and shipped within 3 to 5  BUSINESS Days***\r\n\r\nWedding flasks, hip flasks, whiskey flasks, personalized in my studio and wood shop near Vancouver, Washington. Come on in and browse and let me know if you have questions, I specialize in personal service! ","currency_code":"USD","is_vacation":false,"vacation_message":"We are taking a vacation. We will reopen August 30. \r\n\r\nPlease message us at Engravingpro2@gmail.com or visit us at www.etsy.shop/engravingpro\r\n\r\nThank you for visiting our shop! \r\n\r\nRespectfully,\r\nAK Laser\r\nKellie and Adam","sale_message":"Thank you for visiting our Etsy shop, www.etsy.com/shopaklaser and for making a purchase! This e-mail confirms your purchase.\r\n\r\n Most orders will be processed and shipped within 3 to 5 BUSINESS Days***\r\n\r\nThe order invoice includes the ship date (located above your name and address).  We will email you a shipping notification and TRACKING when your package has shipped. \r\n\r\nWe guarantee our custom work 100 percent. If there&#39;s a mistake we made with your order, feel free to contact me via &#39;Etsy conversations&#39;, we will ship you another (corrected) item at our cost!\r\n\r\nPackages shipped INTERNATIONALLY can take up to 3 or 4 weeks for delivery. If this conflicts with your deadline, please contact us as soon as possible via &#39;Etsy conversation&#39;. \r\n\r\nOur  INTERNATIONAL customers will be responsible for all import taxes, duties, VAT and/or handling fees that may be applied on different imported merchandise by your countries. The fees, are collected at the time of customs clearance, and your merchandise/package may be held at your local (Postal Office) or other location until the fees are paid. Please see my shop policies for more information.\r\n\r\nWe recycle packaging materials when possible.\r\n\r\nPlease note:\r\n+++Please wash the engraved FLASKS (by hand) thoroughly inside and out before using.\r\n\r\nPlease contact us if your have any questions and/or concerns!\r\nwww.etsy.com/shop/aklaser, \r\n\r\n360.667.0380\r\n\r\nRespectfully,\r\nKellie\r\nAK Laser","digital_sale_message":null,"last_updated_tsz":1460660255,"listing_active_count":28,"digital_listing_count":0,"login_name":"AKLaser","accepts_custom_requests":false,"policy_welcome":"Welcome to our shop and thank you for visiting! \r\n\r\nIf you have questions, concerns and/or issues please do not hesitate to contact us!!\r\n\r\nOur contact information is via &#39;Etsy conversation&#39; -we check our Etsy messages hourly during normal business hours and every few hours on weekends. We also receive phone calls during normal business hours. ","policy_payment":"We accept PayPal and credit card payment in US Dollars. Payment must be made in full and have cleared before the item is shipped.\r\n\r\nWashington State residents will be charged sales tax of 8.4% upon checkout. ","policy_shipping":"Most orders will be processed, and packages shipped within 5 business days, unless mentioned otherwise in our shop banner, listing&#39;s description or order form receipt.\r\n\r\nPackages will be shipped to the name and address that you provided in your PAYPAL or Etsy account.\r\n\r\nWe ship through the UNITED STATES POSTAL SERVICE (USPS). In the United States, we ship packages First Class Mail, Priority Mail or Parcel Select (Ground). The following shipping delivery times are estimates: \r\n\r\n***Packages shipped First Class Mail can be expected in 2-5 days;\r\n***Priority Mail (2-3 days or more during holidays);\r\n***Parcel Select (2-9 days). \r\n\r\nMost of our flask sets are shipped USPS Parcel Select. All packages of orders purchased from within the U.S. are tracked to their destination. \r\n\r\nIf you require a RUSH ORDER, please message us before you order so we can tailor your needs to the appropriate USPS shipping delivery method. We process rush orders in 1 to 2 days and packages can be expected within 3 or 4 business days. This may include a guaranteed delivery time in the U.S, depending on the shipping upgrade that is purchased. \r\n\r\nINTERNATIONAL ORDERS are welcome for all of our shop listings! International packages are shipped USPS First Class International or Priority Mail International (if packages weigh over 4 pounds). First Class International packages can take up to 4 weeks for delivery. Packages shipped Priority International can be expected in 6-11 days. Please order early. Contact us via Etsy conversations -if questions. \r\n\r\nINTERNATIONAL packages shipped internationally are TRACKED ONLY to the International sorting center in the U.S.\r\n\r\nINTERNATIONAL CUSTOMERS will be responsible for all fees imposed by their countries. These fees include and are not limited to IMPORT TAXES, VAT and/or handling fees. The fees, may be applied on different imported merchandise by your countries and post offices and are collected at the time of customs clearance. Your merchandise/package may be held at your local (Post Office) or other location until the fees are paid. Our listing&#39;s shipping prices do not include any of the aforementioned fees.\r\n\r\nTo our shop visitors from the UK -please review the following information (in the link provided below) before purchasing our items:\r\nwww.hmrc.gov.uk/customs/post/buying.htm#3\r\n\r\nBelow is a sample of fees charged for four flask sets to the UK:\r\n  £10.32 in VAT;\r\n  £8 Royal Mail international handling fee;\r\n  Total £18.32 plus the cost of the four flask sets.\r\n\r\n(The above was received from a customer of the UK in 2014).\r\n\r\nAll packages will be shipped with the full value (item price) and as merchandise.\r\n\r\nWe recycle packaging materials when possible. \r\n \r\nWe will email you when your package has shipped. ","policy_refunds":"We are very sorry that we can not give refunds for personalized engraved merchandise. Still, please message us, we are sometimes willing to work out something!! \r\n\r\nIf there is a mistake with our engraving, or a problem with the merchandise, please contact us via &#39;Etsy conversations&#39; within five days of receiving your package.\r\n\r\nWe will only read engraving information if it is written in the note box on the order form, or if it references an e-mail or  &#39;&#39;Etsy conversation&quot;. ","policy_additional":"Please make sure when you order that all ENGRAVING INSTRUCTIONS are written in the &#39;note box&#39; on the &#39;add to cart &#39; page, and all names, titles and wedding dates and other information if required are correct. \r\n\r\nWe do not provide PROOFS of personalization for any of the engraving designs listed in our shop.\r\n\r\nFor most orders we will engrave exactly or close to what is requested on the order form, except for two exceptions, i.e., if the customer requests that &quot;Groomsmen&quot; or &quot;Bestman&quot; be engraved for a flask or knife order, we will engrave &quot;Groomsman&quot; and &quot;Best Man&quot;. Dates will be engraved exactly or close to what is pictured.\r\n\r\nAll of the ENGRAVED IMAGES on the flasks are intellectual property, created by us. All of our shop&#39;s listing PHOTOS and NARRATIVE are Intellectual Property. Copying our images, photos or narrative is intellectual property right infringement. \r\n\r\n+++Please wash the engraved FLASKS and shot cups (by hand) thoroughly inside and out before using.\r\n\r\nWHEN YOU ORDER from AKLASER, you understand and agree to our shop policies.\r\n\r\nOur studio is located at Battle Ground, Washington, 35 minutes north of Portland, Oregon.\r\n \r\nEngravingpro, LLC\r\n20505 NE 221st CIR\r\n\r\nWe manage another Etsy Shop, Engravingpro.","policy_seller_info":null,"policy_updated_tsz":1460491999,"policy_has_private_receipt_info":false,"vacation_autoreply":"We are taking a vacation. We will reopen August 30. \r\n\r\nPlease message us at Engravingpro2@gmail.com.\r\n\r\nThank you for visiting our shop! \r\n\r\nRespectfully,\r\nAK Laser\r\nKellie and Adam","url":"https://www.etsy.com/shop/AKLaser?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","image_url_760x100":null,"num_favorers":430,"languages":["en-US"],"upcoming_local_event_id":null,"icon_url_fullxfull":null,"is_using_structured_policies":false,"has_onboarded_structured_policies":false,"has_unstructured_policies":true}},{"listing_id":264016067,"state":"active","user_id":16132772,"category_id":68887494,"title":"Bridesmaid Gift, Personalized Bridal Party Gift , Engraved Hip Flask, Personlized Whiskey Flask, Pocket Size Flask","description":"This listing is for ONE or MORE flasks gift sets, personalized with any one of the above engraving designs.\n\nDesigned to carry liquor, our 6 oz. powder coated flasks are made of stainless steel. Our state-of-the-art laser engraves the coating resulting in a beautiful silver engraving, which shines in any light! To make a special gift this listing includes an Engraved Flask, and a Funnel, packaged in a Black Gift Box.\n\nSPECIFICATIONS:\nGift Box is 5-1/2&quot; wide, 6-3/4&quot; tall;\nFlask is 3-1/2&quot; wide x 4&quot; tall;\nHolds 6 ounces of liquor;\nFood grade stainless steel;\nStainless steel funnel.\n\nPERSONALIZATION:\nWe will laser-engrave the front side of each flask with your personalized information. Please see the engraving design/layout from the photos above and/or the drop-down menu.\n\nORDERING:\nSelect the quantity and design from the drop-down menus, click the green &#39;add to cart&#39; button, and specify all engraving information in the note box on the add to cart page, including the following information if applicable:\n1) Name;\n2) Title;\n3) Wedding date.\n\nMost orders are ready and shipped within 3 to 5 business days after receiving payment.\n\nINTERNATIONAL ORDERS are WELCOME!\n\nThank you for visiting our shop!\n* * * * * * * * * * * * * * * * * * * * * *","creation_tsz":1460660254,"ending_tsz":1471201054,"original_creation_tsz":1452884246,"last_modified_tsz":1460660254,"price":"11.95","currency_code":"USD","quantity":80,"tags":["flask","personalized flask","Engraved Hip Flask","wedding gift","engraved flask","wedding party gift","bridesmaid gift","wedding flasks","bridal party gifts","bridal party gift","flask gift set","groomsman gift","groomsmen gift"],"category_path":["Weddings"],"category_path_ids":[68887494],"materials":["powder coating","food grade stainless steel"],"shop_section_id":11197327,"featured_rank":null,"state_tsz":1452884247,"url":"https://www.etsy.com/listing/264016067/bridesmaid-gift-personalized-bridal?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","views":336,"num_favorers":36,"shipping_template_id":1206049516,"processing_min":3,"processing_max":5,"who_made":"i_did","is_supply":"false","when_made":"made_to_order","item_weight":null,"item_weight_units":null,"item_length":null,"item_width":null,"item_height":null,"item_dimensions_unit":"in","is_private":false,"recipient":"men","occasion":"wedding","style":null,"non_taxable":false,"is_customizable":false,"is_digital":false,"file_data":"","language":"en-US","has_variations":true,"taxonomy_id":1666,"taxonomy_path":["Weddings","Gifts & Mementos","Bridesmaids' Gifts"],"used_manufacturer":false,"Images":[{"listing_image_id":904164866,"hex_code":"7D6369","red":125,"green":99,"blue":105,"hue":346,"saturation":20,"brightness":49,"is_black_and_white":false,"creation_tsz":1452884246,"listing_id":264016067,"rank":1,"url_75x75":"https://img0.etsystatic.com/134/0/6476377/il_75x75.904164866_oxw4.jpg","url_170x135":"https://img0.etsystatic.com/134/0/6476377/il_170x135.904164866_oxw4.jpg","url_570xN":"https://img0.etsystatic.com/134/0/6476377/il_570xN.904164866_oxw4.jpg","url_fullxfull":"https://img0.etsystatic.com/134/0/6476377/il_fullxfull.904164866_oxw4.jpg","full_height":897,"full_width":1000},{"listing_image_id":1000647337,"hex_code":"74406A","red":116,"green":64,"blue":106,"hue":312,"saturation":44,"brightness":45,"is_black_and_white":false,"creation_tsz":1460060275,"listing_id":264016067,"rank":2,"url_75x75":"https://img1.etsystatic.com/129/0/6476377/il_75x75.1000647337_9p1k.jpg","url_170x135":"https://img1.etsystatic.com/129/0/6476377/il_170x135.1000647337_9p1k.jpg","url_570xN":"https://img1.etsystatic.com/129/0/6476377/il_570xN.1000647337_9p1k.jpg","url_fullxfull":"https://img1.etsystatic.com/129/0/6476377/il_fullxfull.1000647337_9p1k.jpg","full_height":942,"full_width":1200},{"listing_image_id":903920669,"hex_code":"6E6D6F","red":110,"green":109,"blue":111,"hue":270,"saturation":1,"brightness":43,"is_black_and_white":false,"creation_tsz":1452884247,"listing_id":264016067,"rank":3,"url_75x75":"https://img1.etsystatic.com/115/0/6476377/il_75x75.903920669_tpj2.jpg","url_170x135":"https://img1.etsystatic.com/115/0/6476377/il_170x135.903920669_tpj2.jpg","url_570xN":"https://img1.etsystatic.com/115/0/6476377/il_570xN.903920669_tpj2.jpg","url_fullxfull":"https://img1.etsystatic.com/115/0/6476377/il_fullxfull.903920669_tpj2.jpg","full_height":903,"full_width":900},{"listing_image_id":903921355,"hex_code":"6B6A6C","red":107,"green":106,"blue":108,"hue":270,"saturation":1,"brightness":42,"is_black_and_white":false,"creation_tsz":1452884247,"listing_id":264016067,"rank":4,"url_75x75":"https://img1.etsystatic.com/138/0/6476377/il_75x75.903921355_geiq.jpg","url_170x135":"https://img1.etsystatic.com/138/0/6476377/il_170x135.903921355_geiq.jpg","url_570xN":"https://img1.etsystatic.com/138/0/6476377/il_570xN.903921355_geiq.jpg","url_fullxfull":"https://img1.etsystatic.com/138/0/6476377/il_fullxfull.903921355_geiq.jpg","full_height":889,"full_width":900},{"listing_image_id":904171326,"hex_code":"69686B","red":105,"green":104,"blue":107,"hue":260,"saturation":2,"brightness":41,"is_black_and_white":false,"creation_tsz":1452884247,"listing_id":264016067,"rank":5,"url_75x75":"https://img0.etsystatic.com/124/0/6476377/il_75x75.904171326_2wde.jpg","url_170x135":"https://img0.etsystatic.com/124/0/6476377/il_170x135.904171326_2wde.jpg","url_570xN":"https://img0.etsystatic.com/124/0/6476377/il_570xN.904171326_2wde.jpg","url_fullxfull":"https://img0.etsystatic.com/124/0/6476377/il_fullxfull.904171326_2wde.jpg","full_height":919,"full_width":1000}],"Shop":{"shop_id":6476377,"shop_name":"AKLaser","user_id":16132772,"creation_tsz":1313467446,"title":"Personalized Flasks","announcement":"**QUICK TURN AROUND TIME & FREE SHOT GLASS with every flask purchased. Most orders will be processed and shipped within 3 to 5  BUSINESS Days***\r\n\r\nWedding flasks, hip flasks, whiskey flasks, personalized in my studio and wood shop near Vancouver, Washington. Come on in and browse and let me know if you have questions, I specialize in personal service! ","currency_code":"USD","is_vacation":false,"vacation_message":"We are taking a vacation. We will reopen August 30. \r\n\r\nPlease message us at Engravingpro2@gmail.com or visit us at www.etsy.shop/engravingpro\r\n\r\nThank you for visiting our shop! \r\n\r\nRespectfully,\r\nAK Laser\r\nKellie and Adam","sale_message":"Thank you for visiting our Etsy shop, www.etsy.com/shopaklaser and for making a purchase! This e-mail confirms your purchase.\r\n\r\n Most orders will be processed and shipped within 3 to 5 BUSINESS Days***\r\n\r\nThe order invoice includes the ship date (located above your name and address).  We will email you a shipping notification and TRACKING when your package has shipped. \r\n\r\nWe guarantee our custom work 100 percent. If there&#39;s a mistake we made with your order, feel free to contact me via &#39;Etsy conversations&#39;, we will ship you another (corrected) item at our cost!\r\n\r\nPackages shipped INTERNATIONALLY can take up to 3 or 4 weeks for delivery. If this conflicts with your deadline, please contact us as soon as possible via &#39;Etsy conversation&#39;. \r\n\r\nOur  INTERNATIONAL customers will be responsible for all import taxes, duties, VAT and/or handling fees that may be applied on different imported merchandise by your countries. The fees, are collected at the time of customs clearance, and your merchandise/package may be held at your local (Postal Office) or other location until the fees are paid. Please see my shop policies for more information.\r\n\r\nWe recycle packaging materials when possible.\r\n\r\nPlease note:\r\n+++Please wash the engraved FLASKS (by hand) thoroughly inside and out before using.\r\n\r\nPlease contact us if your have any questions and/or concerns!\r\nwww.etsy.com/shop/aklaser, \r\n\r\n360.667.0380\r\n\r\nRespectfully,\r\nKellie\r\nAK Laser","digital_sale_message":null,"last_updated_tsz":1460660255,"listing_active_count":28,"digital_listing_count":0,"login_name":"AKLaser","accepts_custom_requests":false,"policy_welcome":"Welcome to our shop and thank you for visiting! \r\n\r\nIf you have questions, concerns and/or issues please do not hesitate to contact us!!\r\n\r\nOur contact information is via &#39;Etsy conversation&#39; -we check our Etsy messages hourly during normal business hours and every few hours on weekends. We also receive phone calls during normal business hours. ","policy_payment":"We accept PayPal and credit card payment in US Dollars. Payment must be made in full and have cleared before the item is shipped.\r\n\r\nWashington State residents will be charged sales tax of 8.4% upon checkout. ","policy_shipping":"Most orders will be processed, and packages shipped within 5 business days, unless mentioned otherwise in our shop banner, listing&#39;s description or order form receipt.\r\n\r\nPackages will be shipped to the name and address that you provided in your PAYPAL or Etsy account.\r\n\r\nWe ship through the UNITED STATES POSTAL SERVICE (USPS). In the United States, we ship packages First Class Mail, Priority Mail or Parcel Select (Ground). The following shipping delivery times are estimates: \r\n\r\n***Packages shipped First Class Mail can be expected in 2-5 days;\r\n***Priority Mail (2-3 days or more during holidays);\r\n***Parcel Select (2-9 days). \r\n\r\nMost of our flask sets are shipped USPS Parcel Select. All packages of orders purchased from within the U.S. are tracked to their destination. \r\n\r\nIf you require a RUSH ORDER, please message us before you order so we can tailor your needs to the appropriate USPS shipping delivery method. We process rush orders in 1 to 2 days and packages can be expected within 3 or 4 business days. This may include a guaranteed delivery time in the U.S, depending on the shipping upgrade that is purchased. \r\n\r\nINTERNATIONAL ORDERS are welcome for all of our shop listings! International packages are shipped USPS First Class International or Priority Mail International (if packages weigh over 4 pounds). First Class International packages can take up to 4 weeks for delivery. Packages shipped Priority International can be expected in 6-11 days. Please order early. Contact us via Etsy conversations -if questions. \r\n\r\nINTERNATIONAL packages shipped internationally are TRACKED ONLY to the International sorting center in the U.S.\r\n\r\nINTERNATIONAL CUSTOMERS will be responsible for all fees imposed by their countries. These fees include and are not limited to IMPORT TAXES, VAT and/or handling fees. The fees, may be applied on different imported merchandise by your countries and post offices and are collected at the time of customs clearance. Your merchandise/package may be held at your local (Post Office) or other location until the fees are paid. Our listing&#39;s shipping prices do not include any of the aforementioned fees.\r\n\r\nTo our shop visitors from the UK -please review the following information (in the link provided below) before purchasing our items:\r\nwww.hmrc.gov.uk/customs/post/buying.htm#3\r\n\r\nBelow is a sample of fees charged for four flask sets to the UK:\r\n  £10.32 in VAT;\r\n  £8 Royal Mail international handling fee;\r\n  Total £18.32 plus the cost of the four flask sets.\r\n\r\n(The above was received from a customer of the UK in 2014).\r\n\r\nAll packages will be shipped with the full value (item price) and as merchandise.\r\n\r\nWe recycle packaging materials when possible. \r\n \r\nWe will email you when your package has shipped. ","policy_refunds":"We are very sorry that we can not give refunds for personalized engraved merchandise. Still, please message us, we are sometimes willing to work out something!! \r\n\r\nIf there is a mistake with our engraving, or a problem with the merchandise, please contact us via &#39;Etsy conversations&#39; within five days of receiving your package.\r\n\r\nWe will only read engraving information if it is written in the note box on the order form, or if it references an e-mail or  &#39;&#39;Etsy conversation&quot;. ","policy_additional":"Please make sure when you order that all ENGRAVING INSTRUCTIONS are written in the &#39;note box&#39; on the &#39;add to cart &#39; page, and all names, titles and wedding dates and other information if required are correct. \r\n\r\nWe do not provide PROOFS of personalization for any of the engraving designs listed in our shop.\r\n\r\nFor most orders we will engrave exactly or close to what is requested on the order form, except for two exceptions, i.e., if the customer requests that &quot;Groomsmen&quot; or &quot;Bestman&quot; be engraved for a flask or knife order, we will engrave &quot;Groomsman&quot; and &quot;Best Man&quot;. Dates will be engraved exactly or close to what is pictured.\r\n\r\nAll of the ENGRAVED IMAGES on the flasks are intellectual property, created by us. All of our shop&#39;s listing PHOTOS and NARRATIVE are Intellectual Property. Copying our images, photos or narrative is intellectual property right infringement. \r\n\r\n+++Please wash the engraved FLASKS and shot cups (by hand) thoroughly inside and out before using.\r\n\r\nWHEN YOU ORDER from AKLASER, you understand and agree to our shop policies.\r\n\r\nOur studio is located at Battle Ground, Washington, 35 minutes north of Portland, Oregon.\r\n \r\nEngravingpro, LLC\r\n20505 NE 221st CIR\r\n\r\nWe manage another Etsy Shop, Engravingpro.","policy_seller_info":null,"policy_updated_tsz":1460491999,"policy_has_private_receipt_info":false,"vacation_autoreply":"We are taking a vacation. We will reopen August 30. \r\n\r\nPlease message us at Engravingpro2@gmail.com.\r\n\r\nThank you for visiting our shop! \r\n\r\nRespectfully,\r\nAK Laser\r\nKellie and Adam","url":"https://www.etsy.com/shop/AKLaser?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","image_url_760x100":null,"num_favorers":430,"languages":["en-US"],"upcoming_local_event_id":null,"icon_url_fullxfull":null,"is_using_structured_policies":false,"has_onboarded_structured_policies":false,"has_unstructured_policies":true}},{"listing_id":217471351,"state":"active","user_id":48671337,"category_id":69150425,"title":"Custom Whiskey Glasses - Set of 2 Personalized Whiskey/Bourbon/Scotch Glasses. Custom sand carved 11 oz. Rocks Glass. Mens Gift","description":"This listing is for a set of two personalized sand carved 11 oz. Whiskey, Bourbon, Scotch glasses. \n\nWe use a technique known as Sandblasting to engrave our glasses. This provides a much deeper and richer engraving than laser etching.\n\nEnjoy your favorite Whiskey, Bourbon or Scotch in one of your own personalized sand carved 11oz. glasses. Great gift idea for Father&#39;s Day, Birthday, Anniversary or any occasion. \n\nOverall Dimensions:\nHeight: 3 1/2&quot;\nTop Diameter: 3&quot;\nBottom Diameter: 3&quot;\n\nChoose one of our custom designs from our drop down menu or if you have a design feel free to leave your idea in our note to seller section.\n\nCoaster in picture is not included!\nDesigns #1-5 are a specific font and can&#39;t be changed.\n\nLooking for more than one glass? Please check out our other listings...\n\nSet of (2)\nhttps://www.etsy.com/listing/217471351/custom-whiskey-glasses-set-of-2?ref=shop_home_active_5\n\nSet of (4)\nhttps://www.etsy.com/listing/217219830/whiskey-glasses-set-of-4-personalized?ref=shop_home_active_7\n\nHow about a set of whiskey rocks to go with your set of whiskey glasses?\nhttps://www.etsy.com/listing/217380849/personalized-whiskey-stones-one-set-of-9?ref=shop_home_active_12\n\nThank you for visiting Laser&#39;s Edge!!\n\nhttps://www.etsy.com/shop/LasersEdge77?ref=hdr_shop_menu","creation_tsz":1460660054,"ending_tsz":1471200854,"original_creation_tsz":1420581637,"last_modified_tsz":1460660054,"price":"23.00","currency_code":"USD","quantity":59,"tags":["whiskey glasses","Whiskey Glass","Scotch Glass","Engraved Whiskey","Engraved Glass","Bourbon Glass","Custom Whiskey","Whiskey Rocks","Rock Glass","Fathers Day","Engraved Bourbon","Anniversary Gift","Sand Blasted Glass"],"category_path":["Housewares"],"category_path_ids":[69150425],"materials":["Glass"],"shop_section_id":16570678,"featured_rank":null,"state_tsz":1460382458,"url":"https://www.etsy.com/listing/217471351/custom-whiskey-glasses-set-of-2?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","views":4816,"num_favorers":345,"shipping_template_id":null,"processing_min":5,"processing_max":10,"who_made":"i_did","is_supply":"false","when_made":"made_to_order","item_weight":null,"item_weight_units":null,"item_length":null,"item_width":null,"item_height":null,"item_dimensions_unit":"in","is_private":false,"recipient":"unisex_adults","occasion":null,"style":null,"non_taxable":false,"is_customizable":true,"is_digital":false,"file_data":"","language":"en-US","has_variations":true,"taxonomy_id":1071,"taxonomy_path":["Home & Living","Kitchen & Dining","Drink & Barware","Drinkware","Tumblers & Water Glasses"],"used_manufacturer":false,"Images":[{"listing_image_id":706936715,"hex_code":"9C5739","red":156,"green":87,"blue":57,"hue":18,"saturation":63,"brightness":61,"is_black_and_white":false,"creation_tsz":1420581637,"listing_id":217471351,"rank":1,"url_75x75":"https://img1.etsystatic.com/050/1/9548171/il_75x75.706936715_rcbv.jpg","url_170x135":"https://img1.etsystatic.com/050/1/9548171/il_170x135.706936715_rcbv.jpg","url_570xN":"https://img1.etsystatic.com/050/1/9548171/il_570xN.706936715_rcbv.jpg","url_fullxfull":"https://img1.etsystatic.com/050/1/9548171/il_fullxfull.706936715_rcbv.jpg","full_height":997,"full_width":1500},{"listing_image_id":706936729,"hex_code":"A46444","red":164,"green":100,"blue":68,"hue":20,"saturation":58,"brightness":64,"is_black_and_white":false,"creation_tsz":1420581637,"listing_id":217471351,"rank":2,"url_75x75":"https://img1.etsystatic.com/057/1/9548171/il_75x75.706936729_c9jn.jpg","url_170x135":"https://img1.etsystatic.com/057/1/9548171/il_170x135.706936729_c9jn.jpg","url_570xN":"https://img1.etsystatic.com/057/1/9548171/il_570xN.706936729_c9jn.jpg","url_fullxfull":"https://img1.etsystatic.com/057/1/9548171/il_fullxfull.706936729_c9jn.jpg","full_height":997,"full_width":1500},{"listing_image_id":706936667,"hex_code":"955639","red":149,"green":86,"blue":57,"hue":19,"saturation":61,"brightness":58,"is_black_and_white":false,"creation_tsz":1420581637,"listing_id":217471351,"rank":3,"url_75x75":"https://img1.etsystatic.com/058/1/9548171/il_75x75.706936667_5hm9.jpg","url_170x135":"https://img1.etsystatic.com/058/1/9548171/il_170x135.706936667_5hm9.jpg","url_570xN":"https://img1.etsystatic.com/058/1/9548171/il_570xN.706936667_5hm9.jpg","url_fullxfull":"https://img1.etsystatic.com/058/1/9548171/il_fullxfull.706936667_5hm9.jpg","full_height":997,"full_width":1500},{"listing_image_id":706905411,"hex_code":"D9D9D9","red":217,"green":217,"blue":217,"hue":0,"saturation":0,"brightness":85,"is_black_and_white":null,"creation_tsz":1420581637,"listing_id":217471351,"rank":4,"url_75x75":"https://img1.etsystatic.com/046/0/9548171/il_75x75.706905411_gp6y.jpg","url_170x135":"https://img1.etsystatic.com/046/0/9548171/il_170x135.706905411_gp6y.jpg","url_570xN":"https://img1.etsystatic.com/046/0/9548171/il_570xN.706905411_gp6y.jpg","url_fullxfull":"https://img1.etsystatic.com/046/0/9548171/il_fullxfull.706905411_gp6y.jpg","full_height":1500,"full_width":1162},{"listing_image_id":706814348,"hex_code":"F9F9F9","red":249,"green":249,"blue":249,"hue":0,"saturation":0,"brightness":97,"is_black_and_white":null,"creation_tsz":1420581637,"listing_id":217471351,"rank":5,"url_75x75":"https://img0.etsystatic.com/051/0/9548171/il_75x75.706814348_h7cz.jpg","url_170x135":"https://img0.etsystatic.com/051/0/9548171/il_170x135.706814348_h7cz.jpg","url_570xN":"https://img0.etsystatic.com/051/0/9548171/il_570xN.706814348_h7cz.jpg","url_fullxfull":"https://img0.etsystatic.com/051/0/9548171/il_fullxfull.706814348_h7cz.jpg","full_height":1500,"full_width":1160}],"Shop":{"shop_id":9548171,"shop_name":"LasersEdge77","user_id":48671337,"creation_tsz":1419821542,"title":"Lasers Edge","announcement":"Welcome to Lasers Edge! We are pleased to introduce our gift shop for all occasions. Our number one priority is our customers! We strive for excellent customer service! Couldn&#39;t find what you are looking for? Please message us with an idea you have and we&#39;ll work together to make the perfect gift! We LOVE custom orders! Check back often for new designs! ","currency_code":"USD","is_vacation":false,"vacation_message":null,"sale_message":"Thank you so much for your business! The greatest compliment we can receive is the referral of your friends and family. Your feedback is very important to us!","digital_sale_message":null,"last_updated_tsz":1460660054,"listing_active_count":89,"digital_listing_count":0,"login_name":"lasersedge77","accepts_custom_requests":true,"policy_welcome":"Welcome to Lasers Edge! Thank you for visiting our shop. Our #1 goal is to provide excellent customer service. We specialize in creating the perfect personalized gift for that special someone in your life. \r\n\r\nWe LOVE custom orders! Please message us with an idea you have and we&#39;ll work together to make the perfect gift!\r\n\r\nWe Strive for 100% Customer Satisfaction and Will Never Settle for Anything Less!","policy_payment":"SECURE OPTIONS\nEtsy keeps your payment information secure. Sellers don't receive your credit card information.\n- Visa\n- MasterCard\n- American Express\n- Discover\n- PayPal\n- Apple Pay\n- SOFORT Bank Transfer\n- iDEAL\n- Etsy Gift Card","policy_shipping":"PROCESSING TIME\nThe time I need to prepare an order for shipping varies. For details, see individual items.\n\nESTIMATED SHIPPING TIME\nAustralia: 10 - 15 business days\nNorth America: 3 - 5 business days\nEurope: 10 - 15 business days\nAustralia, New Zealand and Oceania: 10 - 15 business days\nAsia Pacific: 10 - 15 business days\nLatin America and the Caribbean: 10 - 15 business days\nNorth Africa and the Middle East: 10 - 15 business days\nSub-Saharan Africa: 10 - 15 business days\n\nI'll do my best to meet these shipping estimates, but cannot guarantee them. Actual delivery time will depend on the shipping method you choose.\n\nCUSTOMS AND DUTIES FEES\nBuyers are responsible for any customs or duties fees that may apply. Sellers aren't responsible for delays due to customs","policy_refunds":"I GLADLY ACCEPT RETURNS AND CANCELLATIONS\nJust contact me within: 14 days of delivery\nShip returns back to me within: 30 days of delivery\nRequest a cancellation within: 24 hours of purchase\n\nI DON'T ACCEPT EXCHANGES\nBut please contact me if you have any problems with your order.\n\nTHE FOLLOWING ITEMS CAN'T BE RETURNED\nBecause of the nature of these items, unless they arrive damaged or defective, I can't accept returns for:\n- Custom or personalized orders\n- Perishable products (like food or flowers)\n- Digital downloads\n- Intimate items (for health/hygiene reasons)\n\nCONDITIONS OF RETURN\nBuyers are responsible for return shipping costs.\nIf the item is not returned in its original condition, the buyer is responsible for any loss in value.","policy_additional":"I will only use your shipping and billing address, and contact information\n- To communicate with you about your order\n- To fulfill your order\n- For legal reasons (like paying taxes)\n\nWHAT SHIPPING METHOD DO WE USE?\nAll orders will ship First Class Standard US Mail or USPS Priority Mail. \n\n Shipping times will vary based on your location. Most orders shipped within the United States take 3-5 business days. Orders shipped outside of the United States will take 2-3 weeks depending on your location. ***Please Note: We are not responsible for fees charged by customs for orders shipped outside of the United States. ***\n\n Once Your Order is Complete You Will Receive a Confirmation Email Along with Tracking from USPS.\n\n All orders are shipped from Port Jervis, NY.\n\nRETURNS/EXCHANGES\nDue to the Nature of Our Business, ALL SALES ARE FINAL. Please be Sure to Double Check that Your Engraving Information is Correct Prior to Submitting Your Order.\n\nWHAT IF MY ITEM WAS RECEIVED DAMAGED?\nIn the event you receive a damaged item, please inform us within 48 hours of delivery. Please email a photo of the damaged item along with a description of the damage to be eligible for a free replacement to the following email address: lasersedge77@gmail.com\n\nPLEASE HELP, I RECEIVED AN INCORRECT ITEM OR MY ITEM WAS NOT PERSONALIZED CORRECTLY.\nIn the event you receive an item that was made in error, please send a photograph along with a description of the Item that was made incorrectly and we will mail you a replacement within 48 hours.\n\n ***Please Note*** Please be sure to double check that your personalization information is correct prior to submitting your order. We will personalize your item based on the information that was provided to us during the checkout process.\n\nDO YOU PROVIDE &QUOT;PROOFS&QUOT; OF YOUR DESIGNS?\nWe can absolutely provide a &quot;proof&quot; of the design you choose. However, PROOFS ARE AVAILABLE UPON REQUEST ONLY. To ask for a proof you may simply do so by contacting us via Etsy conversations or via the &quot;Note to LasersEdge77&quot; section of the order.\n\nHOW DO I PROVIDE MY PERSONALIZATION DETAILS?\nYou may provide instructions for personalizing your order in the &quot;Note to LasersEdge77&quot; section of the order. This note section can be viewed once the items have been placed in the shopping cart.","policy_seller_info":"","policy_updated_tsz":1435928642,"policy_has_private_receipt_info":false,"vacation_autoreply":null,"url":"https://www.etsy.com/shop/LasersEdge77?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","image_url_760x100":"https://img0.etsystatic.com/048/0/9548171/iusb_760x100.14788230_4gkd.jpg","num_favorers":244,"languages":["en-US"],"upcoming_local_event_id":null,"icon_url_fullxfull":"https://img0.etsystatic.com/076/0/9548171/isla_fullxfull.15926990_j8barb0r.jpg","is_using_structured_policies":true,"has_onboarded_structured_policies":true,"has_unstructured_policies":true,"custom_shops_state":3}},{"listing_id":228274279,"state":"active","user_id":49140852,"category_id":69150425,"title":"Jim Beam’s Choice Kentucky Bourbon Whiskey Decanter Liquor Bottle, Vintage Shepherd and Dog Wedgewood Style Blue & White Milk Glass Vase","description":"•\tCirca: 1960&#39;s\n•\tManufacturer: James B. Beam Distilling Co..\n•\tMaterial: Glass\n•\tDimensions: 5&quot; H X 5 3/4&quot; W Diameter \n•\tCondition: Good vintage condition, missing stopper-lid (Please zoom photos for details)\n\nDESCRIPTION: This is an impressive vintage Jim Beam&#39;s Choice Wedgewood style decanter bottle. This blue & white milk glass scene depicts a shepherd and his dog. This piece would make a fine addition to your bar collection, or use as a floral arrangement vase.  \n\nFeel free to ask questions prior to purchasing. Your email will be answered the same day.\n\nDo you collect BAR Ware? If so, check out our other vintage Bar items here: http://etsy.me/1vjw6FK","creation_tsz":1460659839,"ending_tsz":1471200639,"original_creation_tsz":1427818189,"last_modified_tsz":1460660042,"price":"13.00","currency_code":"USD","quantity":1,"tags":["Bar","Wedgewood","Jasperware","Jeannette Hellenic","Hellenic Blue","Glass Ice Bucket","Wedgewood Ice","Blue White Bucket","Jeannette Bucket","Jeannette Glass","Wedgewood Glass","Roman Glass","Roman Greek"],"category_path":["Housewares"],"category_path_ids":[69150425],"materials":["Glass","Metal"],"shop_section_id":15611790,"featured_rank":null,"state_tsz":1460124636,"url":"https://www.etsy.com/listing/228274279/jim-beams-choice-kentucky-bourbon?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","views":90,"num_favorers":11,"shipping_template_id":4981707939,"processing_min":1,"processing_max":2,"who_made":"someone_else","is_supply":"false","when_made":"1960s","item_weight":null,"item_weight_units":null,"item_length":null,"item_width":null,"item_height":null,"item_dimensions_unit":"in","is_private":false,"recipient":null,"occasion":null,"style":["Mid Century","Regency"],"non_taxable":false,"is_customizable":false,"is_digital":false,"file_data":"","language":"en-US","has_variations":false,"taxonomy_id":1064,"taxonomy_path":["Home & Living","Kitchen & Dining","Drink & Barware","Barware","Decanters"],"used_manufacturer":false,"Images":[{"listing_image_id":750495632,"hex_code":"8C8598","red":140,"green":133,"blue":152,"hue":262,"saturation":12,"brightness":59,"is_black_and_white":false,"creation_tsz":1427818190,"listing_id":228274279,"rank":1,"url_75x75":"https://img0.etsystatic.com/061/0/9590059/il_75x75.750495632_f253.jpg","url_170x135":"https://img0.etsystatic.com/061/0/9590059/il_170x135.750495632_f253.jpg","url_570xN":"https://img0.etsystatic.com/061/0/9590059/il_570xN.750495632_f253.jpg","url_fullxfull":"https://img0.etsystatic.com/061/0/9590059/il_fullxfull.750495632_f253.jpg","full_height":927,"full_width":1300},{"listing_image_id":750619175,"hex_code":"93A8B9","red":147,"green":168,"blue":185,"hue":207,"saturation":20,"brightness":72,"is_black_and_white":false,"creation_tsz":1427818190,"listing_id":228274279,"rank":2,"url_75x75":"https://img1.etsystatic.com/056/0/9590059/il_75x75.750619175_2xbc.jpg","url_170x135":"https://img1.etsystatic.com/056/0/9590059/il_170x135.750619175_2xbc.jpg","url_570xN":"https://img1.etsystatic.com/056/0/9590059/il_570xN.750619175_2xbc.jpg","url_fullxfull":"https://img1.etsystatic.com/056/0/9590059/il_fullxfull.750619175_2xbc.jpg","full_height":925,"full_width":1198},{"listing_image_id":750495630,"hex_code":"8EAAC0","red":142,"green":170,"blue":192,"hue":206,"saturation":26,"brightness":75,"is_black_and_white":false,"creation_tsz":1427818190,"listing_id":228274279,"rank":3,"url_75x75":"https://img0.etsystatic.com/060/0/9590059/il_75x75.750495630_5i7r.jpg","url_170x135":"https://img0.etsystatic.com/060/0/9590059/il_170x135.750495630_5i7r.jpg","url_570xN":"https://img0.etsystatic.com/060/0/9590059/il_570xN.750495630_5i7r.jpg","url_fullxfull":"https://img0.etsystatic.com/060/0/9590059/il_fullxfull.750495630_5i7r.jpg","full_height":915,"full_width":1218},{"listing_image_id":750619179,"hex_code":"779BBD","red":119,"green":155,"blue":189,"hue":209,"saturation":37,"brightness":74,"is_black_and_white":false,"creation_tsz":1427818190,"listing_id":228274279,"rank":4,"url_75x75":"https://img1.etsystatic.com/058/0/9590059/il_75x75.750619179_nzmc.jpg","url_170x135":"https://img1.etsystatic.com/058/0/9590059/il_170x135.750619179_nzmc.jpg","url_570xN":"https://img1.etsystatic.com/058/0/9590059/il_570xN.750619179_nzmc.jpg","url_fullxfull":"https://img1.etsystatic.com/058/0/9590059/il_fullxfull.750619179_nzmc.jpg","full_height":930,"full_width":1343},{"listing_image_id":750619181,"hex_code":"8AAAC2","red":138,"green":170,"blue":194,"hue":206,"saturation":28,"brightness":76,"is_black_and_white":false,"creation_tsz":1427818190,"listing_id":228274279,"rank":5,"url_75x75":"https://img1.etsystatic.com/059/0/9590059/il_75x75.750619181_eslz.jpg","url_170x135":"https://img1.etsystatic.com/059/0/9590059/il_170x135.750619181_eslz.jpg","url_570xN":"https://img1.etsystatic.com/059/0/9590059/il_570xN.750619181_eslz.jpg","url_fullxfull":"https://img1.etsystatic.com/059/0/9590059/il_fullxfull.750619181_eslz.jpg","full_height":930,"full_width":1244}],"Shop":{"shop_id":9590059,"shop_name":"TreasureRealm","user_id":49140852,"creation_tsz":1402018656,"title":"Treasure Realm - Antiques, Vintage & Retro Items","announcement":"Welcome to Treasure Realm! Here you will find Antique & Vintage items that are sure to bring back memories and add to your favorite collections. Our treasures come and go, but we usually always have vintage glass, figurines, nautical items, kitchen & dining, barware, vases, plates, Oriental & Asian items, and other treasures from around the world including Germany, Italy, England, France, Japan, Africa, and more!","currency_code":"USD","is_vacation":false,"vacation_message":null,"sale_message":"Thank you for purchasing from Treasure Realm. We hope you are delighted with your new found treasure(s). Please favorite our store and visit often, we are always updating our inventory as our treasure hunters return from their expeditions.","digital_sale_message":null,"last_updated_tsz":1457366214,"listing_active_count":87,"digital_listing_count":0,"login_name":"TreasureRealm","accepts_custom_requests":false,"policy_welcome":"Thanks for shopping in the Treasure Realm!  I hope you&#39;ve found something that tickles your fancy. Please read the following policies regarding Payment, Shipping, and Returns.","policy_payment":"Payment is required at the time of purchase. I accept PayPal and Direct Etsy Checkout where you can securely use your credit or debit card, and Etsy gift cards. ","policy_shipping":"I ship all items within 1-2 business days of payment receipt via USPS; large or heavy items may ship via UPS within the United States. All orders will receive tracking numbers. \r\n\r\nINTERNATIONAL SHIPPING:  Buyers are responsible for any customs duties, VAT, and other taxes or fees assessed by their respective countries.\r\n\r\nI cannot ship to Military APO/FPO addresses or PO Boxes, No exceptions.","policy_refunds":"All of my items are vintage. I do my best to take good photos and create accurate descriptions, and provide extra care when packaging. I will accept returns within 3 business days of delivery date if the item(s) are &quot;significantly&quot; not as described only, otherwise all sales are final. ","policy_additional":"If there is a problem with your purchase, please let me know within 3 business days of delivery date, and before leaving a less than positive feedback or review. I will do everything possible to help resolve the issue. ","policy_seller_info":"Will provide on a need to know basis.","policy_updated_tsz":1407139439,"policy_has_private_receipt_info":false,"vacation_autoreply":null,"url":"https://www.etsy.com/shop/TreasureRealm?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","image_url_760x100":"https://img1.etsystatic.com/047/0/9590059/iusb_760x100.14954373_6umi.jpg","num_favorers":358,"languages":["en-US"],"upcoming_local_event_id":null,"icon_url_fullxfull":"https://img0.etsystatic.com/073/0/9590059/isla_fullxfull.15870296_bas10xyr.jpg","is_using_structured_policies":false,"has_onboarded_structured_policies":false,"has_unstructured_policies":true}},{"listing_id":249489132,"state":"active","user_id":28590404,"category_id":69150425,"title":"Wedding Gifts for Couple, Personalized Whiskey Decanter Set with 4 Whiskey Glasses, Groomsmen Gift, Engraved Decanter Set, Scotch Decanter","description":"Beautifully engraved Whiskey Decanter Set that holds 23.75 oz of your favorite spirit. Comes with 4 Round Rocks Glasses that are engraved the same as the decanter.  Great for a wedding gift, groomsmen gift, housewarming gift, birthday gift, father&#39;s day gift and more.  Measures 5.5&quot; wide and 10.75&quot; tall.\n\n\nPlease send the personalization in the notes to seller at checkout:\n\n1. Style Choice\n2. Font Choice\n3. Personalization of each decanter and glasses\n\nPlease contact me if you would like a listing of 4 or more at a discounted price!\n\nFor other great glassware click here:\n\nhttps://www.etsy.com/shop/MyPersonalMemories?section_id=16093019\n\nFor other great groomsmen and men gifts click here:\n\nhttps://www.etsy.com/shop/MyPersonalMemories?section_id=13236312\n\nThanks for looking!\n\nKristin","creation_tsz":1460659700,"ending_tsz":1471200500,"original_creation_tsz":1443193394,"last_modified_tsz":1460659700,"price":"49.99","currency_code":"USD","quantity":53,"tags":["whiskey decanter","engraved decanter","housewarming gift","groomsmen gift","personalized whiskey","glass decanter","whiskey glasses","scotch decanter","liquor decanter","groomsman gift","engraved whiskey","gifts for couple","wedding gifts"],"category_path":["Housewares"],"category_path_ids":[69150425],"materials":["Glass"],"shop_section_id":13236304,"featured_rank":null,"state_tsz":1459303205,"url":"https://www.etsy.com/listing/249489132/wedding-gifts-for-couple-personalized?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","views":3545,"num_favorers":326,"shipping_template_id":18349765712,"processing_min":1,"processing_max":2,"who_made":"collective","is_supply":"false","when_made":"made_to_order","item_weight":null,"item_weight_units":null,"item_length":null,"item_width":null,"item_height":null,"item_dimensions_unit":"in","is_private":false,"recipient":null,"occasion":null,"style":null,"non_taxable":false,"is_customizable":true,"is_digital":false,"file_data":"","language":"en-US","has_variations":true,"taxonomy_id":1064,"taxonomy_path":["Home & Living","Kitchen & Dining","Drink & Barware","Barware","Decanters"],"used_manufacturer":false,"Images":[{"listing_image_id":952893076,"hex_code":"9F847A","red":159,"green":132,"blue":122,"hue":16,"saturation":23,"brightness":62,"is_black_and_white":false,"creation_tsz":1459888758,"listing_id":249489132,"rank":1,"url_75x75":"https://img0.etsystatic.com/119/0/7905522/il_75x75.952893076_ghc4.jpg","url_170x135":"https://img0.etsystatic.com/119/0/7905522/il_170x135.952893076_ghc4.jpg","url_570xN":"https://img0.etsystatic.com/119/0/7905522/il_570xN.952893076_ghc4.jpg","url_fullxfull":"https://img0.etsystatic.com/119/0/7905522/il_fullxfull.952893076_ghc4.jpg","full_height":1442,"full_width":1500},{"listing_image_id":839739196,"hex_code":"000000","red":0,"green":0,"blue":0,"hue":0,"saturation":0,"brightness":0,"is_black_and_white":null,"creation_tsz":1443193395,"listing_id":249489132,"rank":2,"url_75x75":"https://img0.etsystatic.com/103/0/7905522/il_75x75.839739196_m6jm.jpg","url_170x135":"https://img0.etsystatic.com/103/0/7905522/il_170x135.839739196_m6jm.jpg","url_570xN":"https://img0.etsystatic.com/103/0/7905522/il_570xN.839739196_m6jm.jpg","url_fullxfull":"https://img0.etsystatic.com/103/0/7905522/il_fullxfull.839739196_m6jm.jpg","full_height":1500,"full_width":1500},{"listing_image_id":839514443,"hex_code":"000000","red":0,"green":0,"blue":0,"hue":0,"saturation":0,"brightness":0,"is_black_and_white":null,"creation_tsz":1443193395,"listing_id":249489132,"rank":3,"url_75x75":"https://img1.etsystatic.com/103/0/7905522/il_75x75.839514443_pfwd.jpg","url_170x135":"https://img1.etsystatic.com/103/0/7905522/il_170x135.839514443_pfwd.jpg","url_570xN":"https://img1.etsystatic.com/103/0/7905522/il_570xN.839514443_pfwd.jpg","url_fullxfull":"https://img1.etsystatic.com/103/0/7905522/il_fullxfull.839514443_pfwd.jpg","full_height":1500,"full_width":1500},{"listing_image_id":839514331,"hex_code":"000000","red":0,"green":0,"blue":0,"hue":0,"saturation":0,"brightness":0,"is_black_and_white":null,"creation_tsz":1443193395,"listing_id":249489132,"rank":4,"url_75x75":"https://img1.etsystatic.com/101/1/7905522/il_75x75.839514331_bpgb.jpg","url_170x135":"https://img1.etsystatic.com/101/1/7905522/il_170x135.839514331_bpgb.jpg","url_570xN":"https://img1.etsystatic.com/101/1/7905522/il_570xN.839514331_bpgb.jpg","url_fullxfull":"https://img1.etsystatic.com/101/1/7905522/il_fullxfull.839514331_bpgb.jpg","full_height":1500,"full_width":1500},{"listing_image_id":839532567,"hex_code":"000000","red":0,"green":0,"blue":0,"hue":0,"saturation":0,"brightness":0,"is_black_and_white":null,"creation_tsz":1443194810,"listing_id":249489132,"rank":5,"url_75x75":"https://img1.etsystatic.com/102/0/7905522/il_75x75.839532567_qr4k.jpg","url_170x135":"https://img1.etsystatic.com/102/0/7905522/il_170x135.839532567_qr4k.jpg","url_570xN":"https://img1.etsystatic.com/102/0/7905522/il_570xN.839532567_qr4k.jpg","url_fullxfull":"https://img1.etsystatic.com/102/0/7905522/il_fullxfull.839532567_qr4k.jpg","full_height":1135,"full_width":1135}],"Shop":{"shop_id":7905522,"shop_name":"MyPersonalMemories","user_id":28590404,"creation_tsz":1362773839,"title":"My Personal Memories","announcement":"Thank you for stopping by my shop!  My items will ship in 1-3 business days. If you would like to order 4 or more of an item, please email me for the discounted price.  Please email me with any questions.  Happy Shopping!","currency_code":"USD","is_vacation":false,"vacation_message":"Hi Everyone!  Thank you for a wonderful holiday season! All orders that have already been placed will be shipped as soon as possible. I will be back from vacation on Dec 28. Have a great holiday and wishing you many more Personal Memories. See you soon!","sale_message":"It is my pleasure to be doing business with you.  Your purchase will be in the mail in 1-3 business days.  Please email me with any questions.\r\n\r\nPlease click the link below and like my Facebook page for great coupons and deals as well as share your special occasion pictures and stories!!\r\n\r\nhttps://www.facebook.com/MyPersonalMemories\r\n\r\nand follow my Pinterest page and pin your favorite items!!\r\n\r\nhttp://www.pinterest.com/mypersmemories/\r\n\r\nHave a wonderful day! \r\nKristin ","digital_sale_message":null,"last_updated_tsz":1460663367,"listing_active_count":380,"digital_listing_count":0,"login_name":"MyPersonalMemories","accepts_custom_requests":true,"policy_welcome":"Welcome to My Personal Memories!  I am Kristin, the shop owner, and am totally addicted to Personalized Gifts!  The thought of putting smiles on people&#39;s faces was the strongest influence of creating this company.  Giving and receiving a personalized good is the most heartfelt of gifts.  My company is based around family, friends and happiness. I am pleased and honored to give 10% of all proceeds to different organizations that are closest to my heart.  Thanks for stopping by and please visit my shop again!","policy_payment":null,"policy_shipping":"I strive for fast and efficient delivery.  Personalized items are usually shipped within 1-3 business days of ordering products.  Once I have shipped your item/s, I will send you a shipping notification along with a tracking number to easily track your package.","policy_refunds":"My Personal Memories takes great pride in each and every personalized product sold and strives to create everlasting memories for each and every customer.  My products are inspected thoroughly before packaged for shipment.  If a product is damaged or defective, please contact My Personal Memories for a no cost exchange.  Understandably, personalized goods cannot be returned, unless there is a defect to the product. ","policy_additional":"Please include Personalization in the notes to seller.","policy_seller_info":null,"policy_updated_tsz":1401322791,"policy_has_private_receipt_info":false,"vacation_autoreply":null,"url":"https://www.etsy.com/shop/MyPersonalMemories?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","image_url_760x100":"https://img1.etsystatic.com/101/0/7905522/iusb_760x100.19982161_i6jn.jpg","num_favorers":5108,"languages":["en-US"],"upcoming_local_event_id":null,"icon_url_fullxfull":"https://img1.etsystatic.com/101/0/7905522/isla_fullxfull.16531449_14tn2jeg.jpg","is_using_structured_policies":false,"has_onboarded_structured_policies":false,"has_unstructured_policies":true}},{"listing_id":195811677,"state":"active","user_id":33770356,"category_id":69194689,"title":"Whiskey After Dark - Personalized Rocks Tumblers with Font Selection OPTIONAL Four (4) Black Ice Whiskey Stones or Engraved Whiskey Stones","description":"Nightcap or late nights out, we offer this set of whiskey tumblers with a unique font list for the whiskey after dark crowd. Choose your font and monogram style. Don&#39;t forget to ADD Black Ice Whiskey Stones to your order and take your spirits to the next level. \r\n\r\nFAVORITE OUR SHOP ON ETSY, LIKE US ON FACEBOOK, AND FOLLOW US ON TWITTER FOR SPECIAL OFFERS AND DISCOUNTS. DESIGN&#39;S THE LIMIT!\r\n\r\nPRODUCT LISTINGS FOR LARGE ROCKS TUMBLERS\r\n\r\nListing for ONE (1) https://www.etsy.com/listing/195811677\r\n\r\nListing for TWO (2) https://www.etsy.com/listing/180454656\r\n\r\nListing for THREE (3) https://www.etsy.com/listing/195812943\r\n\r\nListing for FOUR (4) https://www.etsy.com/listing/180522062\r\n\r\nListing for FIVE (5) https://www.etsy.com/listing/195813379\r\n\r\nListing for SIX (6) https://www.etsy.com/listing/195805500\r\n\r\nListing for SEVEN (7) https://www.etsy.com/listing/195806012\r\n\r\nListing for EIGHT (8) https://www.etsy.com/listing/180533443\r\n\r\nOR CLICK REQUEST A CUSTOM ORDER FOR ANY QUANTITY OR SPECIAL REQUESTS.\r\n\r\nNothing says, &quot;YOU ROCK&quot; like the gift of a personalized set of lowball rocks tumblers. Perfect for any spirit or spirited occasion. Create your own barware collection and make it personal. Choose any combination of design and font choices from our selection. Request a custom order for any special request. Select a matched set or personalize each glass with different name or initial. ADD Black Ice Whiskey Stones or Engraved Ice Whiskey Stones to your order and take your spirits to the next level. \r\n\r\nADD RUSH TO YOUR CART BEFORE PROCEEDING TO CHECKOUT: https://www.etsy.com/listing/186599157/expedite\r\n\r\nPlace an order fast and easy! Make your choice of a product, select the design option you prefer, specify a font from our selection, & select the quantity. When you agree that you have read, fully understand, & accept our shop policies, click add to cart & proceed to checkout. Make sure to include the following information in the notes to Design&#39;s the Limit to complete your order: \r\n\r\nFILL IN THE NOTES TO DESIGNS THE LIMIT AS FOLLOWS:\r\n\r\n(1) PERSONAL INFORMATION and MONOGRAM STYLE (see monogram rules below)\r\nEnter your name or initials as you want them to appear on your item and state the monogram style\r\n\r\n(2) NAME OF FONT (Click left/right arrows on main product image) \r\nPlease include the font you prefer in the notes to seller when you place your order. \r\n\r\n(3) ADD A PRODUCT: (Black Ice Stones: Please read ADD-ON-PRODUCTS below) Select Black Ice Stones or Engraved Black Ice Stones and enter your initial(s) for engraving on the Stone. Black Ice Stones come with gift pouch. \r\n\r\nADD MORE BLACK ICE STONES TO YOUR ORDER: https://www.etsy.com/listing/184092815\r\n\r\n(4) DELIVERY DATE AND PROOF REQUESTS: (OPTIONS)\r\nRush Order Available: https://www.etsy.com/listing/186599157/expedite\r\nDesign&#39;s the Limit will prepare and submit proofs for any order on request, but proof submission and approval process may delay rush orders. Gift wrap option available on request, but will delay rush orders. \r\n\r\nPlease include your PERSONAL INFORMATION as you want it to appear on your personalized gift, if you request initials state your MONOGRAM CHOICE. Unless you want exactly what you see in the picture, state the DESIGN NUMBER and NAME OF FONT you prefer. E-mail us if you have any questions and we would be more than happy to assist you with your purchase.\r\n\r\n1.) PERSONAL INFORMATION - State the name or initial(s) as you want the information to appear on your item(s). Enter your name with lowercase or capital letters as you prefer. State first, middle, and last initial and monogram rule. Specify matched set or personalize each glass with an individual monogram. Check twice as proofs are submitted on request only and customer is responsible for spelling errors.\r\n\r\nMONOGRAM RULES FOR INITIALS -\r\nFor monograms which include three initials specify Standard or Traditional monogram. If no monogram rule is selected, orders will be filled as they are entered into the notes to Designs the Limit in the same font size per the Standard 3-initial monogram style. \r\n\r\n THREE INITIALS MONOGRAM DESCRIPTION\r\nA.) Standard Monogram Description: Monogram with the First, Middle, Last Initials in sequential order and with equal font size.\r\nB.) Traditional Monogram Description: Monogram with the First, Last, Middle Initials in order shown with the Last Initial of greater font size in the center.\r\n\r\n2.) FONT SELECTION - State the name of the font you prefer from our selection of fonts. If no font is selected, orders will be filled with the font shown in the design option selected, in the main product image or as determined by name or initials entered in the notes to seller. Font size is determined by the size of the product selected and the length of personal information provided. If you are uncertain, request a proof when you place your order and we will submit our design before processing your order.\r\n\r\n3.) ADD-ON-PRODUCTS - When adding Black Ice Stones from the drop down menu to any order, please specify one, two, or three initials only. Initial(s) will be personalized in a bold font of our choice which is more visible on the stones unless a request is specified at the time of purchase. To keep the cost of additional items to a minimum, additional design options are not included with the purchase of ADD-ON PRODUCTS.\r\n\r\nPRODUCT INFORMATION - Black Ice Stones on Etsy\r\nMaterial: Made in the USA Black Soapstones \r\nMade from recycled material - dimensions vary\r\nIntended Usage: Intended for use with whiskey, scotch, or other liquors, but may be used on other drinks. The FDA classifies soapstone as generally safe - just don&#39;t chew or swallow them!\r\nInstructions: Handle with care for both cold or hot use. Wash and air dry before each use.\r\nStore in freezer for 3 hours before each cold usage. Handle with care!\r\nMicrowave in 30 second increments for hot usage. Handle with care! \r\nFaux Velvet Gift Pouch Included with purchase of Black Ice Stones.\r\n\r\n4.) DELIVERY DATE AND PROOF REQUESTS - Let us know when you need your order delivered by so we can plan accordingly. Need your order delivered before the scheduled ship date? Rush Order listing is available for extreme time constraints. Add this listing to your cart with the product you have selected and proceed to checkout for expedited completion of your order: https://www.etsy.com/listing/186599157/expedite. Proofs are available on request, but submission and approval process will affect expedited completion time. Gift wrap option available, but will delay rush orders.\r\n\r\nPRODUCT INFORMATION: \r\nLarge Rocks Tumblers\r\nGlassware Made in the USA\r\nDimensions: 3.3125&quot;T x 2.375&quot;B x 4&quot;H Capacity: 13 oz.\r\nEngraved on equipment Made in the USA\r\n\r\n*NOTE* Please note that minor air bubbles, flow lines, and slight bumps are inherent to all glass and crystal products and are not considered defects and once personalized the products are non-refundable\r\n\r\nNot sure what to do, click ASK A QUESTION or REQUEST A CUSTOM ORDER for a custom design, to submit your own images, for quantity discounts, or for any questions you have. At Designs the Limit customer service is our number one goal. \r\n\r\nCUSTOM ORDER REQUESTS - Think outside the box and send us your custom requests for any of the products we sell. Include as much of your desires for our inspiration with your custom requests. We specialize in custom designs for special events, theme occasions, or designs with a personal touch. Let us know what you imagine and we will exceed your expectations with limitless designs available.\r\n\r\nDESIGNS THE LIMIT, LLC\r\n\r\nAll visitors to our shop are subject to compliance with our shops terms and conditions with no exceptions. Visitors to Design&#39;s the Limit agree to read, fully understand, and accept our shop policies. If you have questions about our policies, products, or services please do not hesitate to contact us. Design&#39;s the Limit would like to thank you for your support of the artisans, etsians, and small business in America. We actively contribute to various non-profit charities, do not guarantee a donation with every order, and discourage solicitation of our kindness through Etsy or our other webstores. We reserve the right to refuse business to anyone, but we aim to be of service beyond expectations. All of the information and product images placed on our webstore are the sole intellectual property of Design&#39;s the Limit, LLC and reproduction of any of our products images, store information, or our designs is strictly forbidden. Please click, &quot;Ask a question,&quot; &quot;Request a Custom Order...&quot; or you may e-mail us at info [!at] designsthelimit.com for more information and thank you for the opportunity to serve.","creation_tsz":1460659610,"ending_tsz":1471200410,"original_creation_tsz":1404926322,"last_modified_tsz":1460659610,"price":"16.99","currency_code":"USD","quantity":990,"tags":["Whiskey Glasses","Personalized Glasses","Mancave","Black Ice Stones","Goth","Gothic Font","Macabre","Fetish","Underground","Nightcap","After Dark","Night","Made in the USA"],"category_path":["Glass","Glassware","Etched"],"category_path_ids":[69150361,68891932,69194689],"materials":["Made in the USA Glassware","Made in the USA Whiskey Stones"],"shop_section_id":18796076,"featured_rank":null,"state_tsz":1459653027,"url":"https://www.etsy.com/listing/195811677/whiskey-after-dark-personalized-rocks?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","views":348,"num_favorers":11,"shipping_template_id":4076731213,"processing_min":5,"processing_max":10,"who_made":"i_did","is_supply":"false","when_made":"made_to_order","item_weight":null,"item_weight_units":null,"item_length":null,"item_width":null,"item_height":null,"item_dimensions_unit":null,"is_private":false,"recipient":"unisex_adults","occasion":"fathers_day","style":null,"non_taxable":false,"is_customizable":true,"is_digital":false,"file_data":"","language":"en-US","has_variations":true,"suggested_taxonomy_id":1054,"taxonomy_path":["Home & Living","Kitchen & Dining","Drink & Barware"],"used_manufacturer":false,"Images":[{"listing_image_id":568331026,"hex_code":"443F31","red":68,"green":63,"blue":49,"hue":44,"saturation":27,"brightness":26,"is_black_and_white":false,"creation_tsz":1404926322,"listing_id":195811677,"rank":1,"url_75x75":"https://img0.etsystatic.com/026/0/8168003/il_75x75.568331026_8rct.jpg","url_170x135":"https://img0.etsystatic.com/026/0/8168003/il_170x135.568331026_8rct.jpg","url_570xN":"https://img0.etsystatic.com/026/0/8168003/il_570xN.568331026_8rct.jpg","url_fullxfull":"https://img0.etsystatic.com/026/0/8168003/il_fullxfull.568331026_8rct.jpg","full_height":1350,"full_width":1350},{"listing_image_id":568450475,"hex_code":"B0AFAF","red":176,"green":175,"blue":175,"hue":0,"saturation":0,"brightness":69,"is_black_and_white":false,"creation_tsz":1404926322,"listing_id":195811677,"rank":2,"url_75x75":"https://img1.etsystatic.com/026/0/8168003/il_75x75.568450475_qq1g.jpg","url_170x135":"https://img1.etsystatic.com/026/0/8168003/il_170x135.568450475_qq1g.jpg","url_570xN":"https://img1.etsystatic.com/026/0/8168003/il_570xN.568450475_qq1g.jpg","url_fullxfull":"https://img1.etsystatic.com/026/0/8168003/il_fullxfull.568450475_qq1g.jpg","full_height":722,"full_width":866},{"listing_image_id":625312003,"hex_code":"A2A5A7","red":162,"green":165,"blue":167,"hue":204,"saturation":2,"brightness":65,"is_black_and_white":false,"creation_tsz":1404941393,"listing_id":195811677,"rank":3,"url_75x75":"https://img1.etsystatic.com/026/0/8168003/il_75x75.625312003_j8o6.jpg","url_170x135":"https://img1.etsystatic.com/026/0/8168003/il_170x135.625312003_j8o6.jpg","url_570xN":"https://img1.etsystatic.com/026/0/8168003/il_570xN.625312003_j8o6.jpg","url_fullxfull":"https://img1.etsystatic.com/026/0/8168003/il_fullxfull.625312003_j8o6.jpg","full_height":1479,"full_width":1479},{"listing_image_id":625198470,"hex_code":"A2A5A7","red":162,"green":165,"blue":167,"hue":204,"saturation":2,"brightness":65,"is_black_and_white":false,"creation_tsz":1404941458,"listing_id":195811677,"rank":4,"url_75x75":"https://img0.etsystatic.com/040/0/8168003/il_75x75.625198470_l3hg.jpg","url_170x135":"https://img0.etsystatic.com/040/0/8168003/il_170x135.625198470_l3hg.jpg","url_570xN":"https://img0.etsystatic.com/040/0/8168003/il_570xN.625198470_l3hg.jpg","url_fullxfull":"https://img0.etsystatic.com/040/0/8168003/il_fullxfull.625198470_l3hg.jpg","full_height":1479,"full_width":1479},{"listing_image_id":625312147,"hex_code":"A3BEC6","red":163,"green":190,"blue":198,"hue":194,"saturation":17,"brightness":77,"is_black_and_white":false,"creation_tsz":1404941393,"listing_id":195811677,"rank":5,"url_75x75":"https://img1.etsystatic.com/038/0/8168003/il_75x75.625312147_7wgl.jpg","url_170x135":"https://img1.etsystatic.com/038/0/8168003/il_170x135.625312147_7wgl.jpg","url_570xN":"https://img1.etsystatic.com/038/0/8168003/il_570xN.625312147_7wgl.jpg","url_fullxfull":"https://img1.etsystatic.com/038/0/8168003/il_fullxfull.625312147_7wgl.jpg","full_height":180,"full_width":180}],"Shop":{"shop_id":8168003,"shop_name":"DesignstheLimit","user_id":33770356,"creation_tsz":1369190198,"title":"We Can Design For Any Ideas You May Have in Mind! ","announcement":"Choose from Our Designs, Submit Your Own, or Have Us Design for You! \n\nInspire our creativity with your design requests or let us inspire you with our portfolio of design and font combinations. We specialize in providing our customers with options from the design to the delivery. Custom orders available for any combination of our products and gift services. We communicate in a timely manner and offer rush orders for any last minute gift purchases. \n\nDESIGN&#39;S THE LIMIT PERSONALIZED GIFTS FOR EVERY OCCASION\nwww.designsthelimit.etsy.com\n\nWe provide gift services as personalized as the gifts we create and can include professional gift wrap with color & ribbon options, premium note cards with customer provided gift messages including envelope, and engraved gift message options for treasured gift purchases. For business customers, we offer engraved logo and contact information on the underside of our cutting boards or on the back of our picture frames for real-estate, travel, or other business professionals.  For every gift giving occasion, personal or business, make it personal and professional at Design&#39;s the Limit.\n\nDESIGN&#39;S FOR ETERNITY WEDDING GIFTS & FAVORS with REGISTRY\nwww.designsforeternity.etsy.com & www.etsy.com/registry\n\n If you are getting married, Design&#39;s the Limit is also on Etsy at Design&#39;s for Eternity! Get the perfect gifts for your wedding party and add us to your Etsy Gift Registry! We have an entire section of our shop devoted to couple&#39;s monograms for the gifts you get for yourself and we fulfill bulk orders for the entire wedding party with individual personalization! \n\n&quot;Don&#39;t take our word for it, read our reviews!&quot; \nwww.etsy.com/your/shops/DesignstheLimit/reviews\n\nDesign&#39;s the Limit offers design and personalization of custom glass, stone, wood, and other materials from personalized gifts to display artwork. We offer a variety of quality product options and accept custom orders for glass, stone, and other materials on a commission basis. We are socially active members of the Etsy community who love to message with our customers and offer free estimates.\n\nGET SOCIAL @DESIGNSTHELIMIT\n Facebook: www.facebook.com/designsthelimit\n Twitter: www.twitter.com/designsthelimit\n Pinterest : www.pinterest.com/designsthelimit\n Google+: plus.google.com/+designsthelimit \n Wanelo: www.wanelo.com/designsthelimit\n Instagram: www.instagram.com/designsthelimit\n Tsu: www.tsu.co/designsthelimit\n Tumblr: www.designsthelimit.tumblr.com \n\nRichard and Tatiana of ETSY SHOP Design&#39;s the Limit\non Etsy at Shop: www.designsthelimit.etsy.com","currency_code":"USD","is_vacation":false,"vacation_message":null,"sale_message":"CUSTOMER ACCEPTANCE OF SHOP TERMS AND SHIPPING POLICY:\r\nWhen you purchased your gift from Design&#39;s the Limit you agreed that you read, fully understood, and accepted our shop policies. If you have any questions about our policies, please contact us immediately before we have completed and shipped your gift purchase. Design&#39;s the Limit standard shipping rates include USPS Parcel Select 2-9 days or USPS First Class 2-5 days and neither of these options includes postal insurance. The USPS includes insurance for all USPS Priority Mail and USPS Priority Express Mail shipments, but it is the customers sole responsibility to submit and handle shipping claims directly with the USPS.","digital_sale_message":null,"last_updated_tsz":1460661794,"listing_active_count":292,"digital_listing_count":0,"login_name":"DesignsTheLimit","accepts_custom_requests":true,"policy_welcome":"BBB Accredited Business in Virginia Beach, Virginia\r\nEMAIL: info@designsthelimit.com\r\nWEBSITE: www.designsthelimit.com\r\n(888) 847 - 3157 Voicemail w/ Email Address\r\n\r\nDESIGN&#39;S THE LIMIT PERSONALIZED GIFTS FOR EVERY OCCASION\r\nwww.designsthelimit.etsy.com\r\n\r\nDESIGN&#39;S FOR ETERNITY WEDDING FAVORS & REGISTRY GIFTS\r\nwww.designsforeternity.etsy.com\r\n\r\nDon&#39;t take our word for it, read our reviews:\r\nhttps://www.etsy.com/your/shops/DesignstheLimit/reviews","policy_payment":"PURCHASE OUR RUSH ORDER LISTING \nMOVE TO THE FRONT OF THE LINE! \nRUSH ORDER UPGRADE:  www.etsy.com/listing/188575296\n\nPlace your order at this time by completing the options including your choice of a product, quantity, and design options from the drop down menus. Include additional information in the notes in the next step of the checkout process in a small text box provided. If you would like to request a custom order or have any questions about the available product options contact us by clicking the REQUEST A CUSTOM ORDER AND HAVE SOMETHING MADE FOR YOU! We respond in a timely manner to conversations through the Etsy messaging system and look forward to messaging with you.\n\nFOR MONOGRAMMING, WE OFFER THE FOLLOWING DESCRIPTIONS:\n\nSTANDARD Monogram Description: Monogram with the First, Middle, Last Initials in sequential order and with equal font size.\n\nTRADITIONAL Monogram Description: Monogram with the First, Last, Middle Initials in order shown with the Last Initial of greater font size in the center.\n\nCOUPLES: Monogram with the last initial in the center of greater font size and each couple&#39;s first initial on either side of the last initial. We can substitute an ampersand or other symbol for the last initial.\n\nIf a monogram is specified, we complete orders with Traditional or Traditional Couple&#39;s Monogram with the Bride&#39;s First Initial, Last Initial, and the Groom&#39;s First Initial unless otherwise specified. Additional monogram options in our portfolio are available for any product in our shop on request. \n\nFORMAT YOUR DATE: Include a date in the notes as you want it to appear on the product you have selected. Design&#39;s the Limit will complete your order with the date you have entered into the notes to seller either as you have entered it, as it appears in the main product image, or as presented in the design option you select. Unless the word Established or a specific format is requested when you place your order, we reserve the right to use creative license to complete your order. Established can be included in any format. Please specify the formats you prefer and the layout requested in addition to entering the date if requesting other than what is shown in the main product image or design.\n\nDATE FORMAT OPTIONS: Est. 2014, Established 2014, October 9th, 2014 or October 9, 2014 or 09 Oct 2014 or 9th Oct 2014 or 10/9/2014 or 10/09/2014 or 10.09.2014 or 10.9.2014 or 10-9-2014 or 10-October-2014 or 09Oct14 or The 9th of October 2014 or 09/Oct/2014 or Thursday, 9 October 2014 or 9/x/14, 9.x.14, 9-x.14, or 9.X.2014 or 9 October 2014 CE  or 9 October AD 2014 and more....\n\nOUR DESIGNS (Click left/right arrows on main product image) Choose any design, substitute any font from our selection, and add any of our design elements to your order to make your design personal to your taste. Personalization including a design option found on any of our other listings is also available on request. Select your choice of design from the drop down menu or select CUSTOM for other design requests including design and font combinations. Visit our Pinterest boards for more inspiration: www.pinterest.com/designsthelimit/designs-the-limit-wedding-monogram-design-options\n\nAVAILABLE FONTS: Personalization is included with any of our designs and for text only special requests. Choose from our selection of available product designs by clicking on the left or right arrows adjacent to the product image. View our portfolio of fonts on Pinterest for additional choices: www.pinterest.com/designsthelimit/designs-the-limit-font-selection\n\nCUSTOM DESIGNS AND IMAGE SUBMISSION: Custom may be selected for name or initials without design option, but other special requests may require an additional charge not included in the main product listing. Submit your own images by emailing us your image to info@ designsthelimit.com for completion and include our design fee with your purchase. \n\nLINK: www.etsy.com/listing/186169097/design-fee - Design fee may be waived if preauthorized by email with a vector line drawing submission or other exceptions. Custom order and special requests are available by clicking on the &quot;REQUEST A CUSTOM ORDER....&quot; bar below the main product image. Submit a custom request for any occasion from custom theme designs to any other ideas you have in mind. \n\nRUSH ORDER LISTING: www.etsy.com/listing/186599157/expedite\nRUSH ORDERS AND DELIVERY DATE REQUESTS: Let us know when you need your order delivered by so we can plan accordingly. Unless you are purchasing a rush order, select the least expensive shipping method if options are presented as shipping method does not affect completion time. Need your order delivered before the scheduled ship date? Add our rush order listing to your cart and select either USPS Priority Mail 2-3 days or USPS Priority Mail Express 1-2 days as needed. Completion time for each product and quantity purchased varies and completion time is not guaranteed, but rush orders are moved to the front of all standards orders and completed as quickly as possible without sacrificing quality. \n\nPROOF REQUESTS: If you are not 100% sure about the design option you have selected, the font you have chosen, the design options available, the information you have submitted, or just wish to see the design before it is completed, request a proof at the time of purchase and we will submit our design for your approval before completing your order. If you do not request a proof at the time of purchase, check the information you have submitted with your order twice as customers are responsible for spelling errors, missing or incomplete information, and requesting a proof at the time of purchase. Proofs are available on request, but submission and approval process may affect expedited completion. \n\nGIFT CARD: www.etsy.com/listing/233842379/gift-cards\nGIFT RECEIPTS AND GIFT NOTES: You do not need to request a gift receipt. As so many of our products are shipped directly to the gift recipient, we do not send a invoice and packing slips do not display pricing. Make your personalized gift a personalized gift giving experience, you can purchase a gift card and include your personal gift message in the notes to seller on checkout. \n\nGIFT WRAP: www.etsy.com/listing/184961786/gift-wrap\nGIFT WRAP REQUESTS: Gift wrap is available for any of the items we sell. Click &quot;Request a Custom Order,&quot; and we will create a custom listing for you including gift wrap. Specify if you wish to have each item gift wrapped individually or any other instructions. Gift wrap, when purchased in conjunction with a rush order listing, will delay completion and the ship date for most orders. \n\nADDITIONAL ENGRAVING: Personalization is included, but for other requests including bottom engraving, vertical engraving, engraving on both sides. or other requests including additional labor an additional fee is included. LINK: www.etsy.com/listing/157659482","policy_shipping":"NORMAL PRODUCTION TIME: Normal production time varies from item to item, depending on our workload, and with the quantity purchased. We make every effort to complete our orders by the scheduled date, but do not guarantee completion date/times of any order. Especially when shopping around the holidays or anytime you need delivery before a specific date, please click &quot;Ask a Question&quot; or &quot;Request a Custom Order...&quot; If you make a purchase and specify your request at the time of purchase, there is no guarantee that your order will be completed and shipped on time. Design&#39;s the Limit offers an expedited order listing for customer placing orders with requested delivery dates before the scheduled ship date, but the Rush Order listing does not include additional shipping options. Shipping options are selected at the time of purchase, but may be upgraded after your order is placed by contacting us before it ships. Once at item is shipped it is the customer&#39;s responsibility to track, receive, inspect, and submit shipping claims if applicable unless additional third-party insurance is added to your order. Customer assumes responsibility for understanding and accepting that the ship date attached to each listing is not a guarantee that the item will ship by the date listed and that delays as a result of holidays that occur during the work week, obtaining approval of proofs submitted, or waiting for a response to other messages may delay the completion of orders. Please contact us if you have any questions about your order at any time, we love our Etsy customers and invite messaging and interaction through the Etsy messaging system.\n\nSHIPPING POLICY - USPS-Parcel Select or First Class shipping is included with your purchase depending on the product and quantity purchased and no insurance is included with our standard shipping rates. Other shipping options including hold for pickup, signature confirmation, shipping insurance, or delivery notification are available on request, but not included in our standard listings. For these options, expedited orders, or orders with special shipping instructions, send us a custom order request so that we may calculate your shipping by zip code and include additional charges that will apply prior to your purchase. Design&#39;s the Limit can not be held responsible for any changes to your order once you have placed your order, but can create a custom order for changes to your order after receipt. Customer is responsible for entering their shipping address including nine digit zip code which can be verified with the USPS. Customer is responsible for loss and additional shipping costs as a result of shipping to an unconfirmed address. Orders placed without your personal information or other details which must be specified in the notes to seller at the time of purchase will delay shipping until confirmation of your order details are received. Design&#39;s the Limit offers products on multiple webstores simultaneously and does not guarantee that your item will be in stock at the time of purchase. Design&#39;s the Limit is not responsible for delays as a result of manufacturer backorders or shipping from the manufacturer to our location. Orders placed with a request for a proof to be submitted, custom design, a design submitted by the customer, for orders with larger quantities, gift wrap, and/or for orders with individualized personalization will delay shipping. \n\nSHIPPING DELAYS OR POSTAL RETURNS POLICY: Design&#39;s the Limit is not responsible for delays of the USPS, UPS, FedEx, or other shipping services. Customer is responsible for additional shipping costs as a result of shipping to an unconfirmed address, unclaimed deliveries, shipping damage, theft, loss beyond the control of Design&#39;s the Limit, or packages returned to Design&#39;s the Limit for any reason. Customer is responsible for communicating with the USPS, UPS, FedEx, or other service providers for all shipping claims beyond the control of Design&#39;s the Limit. Etsy generated e-mail confirmations with USPS tracking number do not guarantee the USPS has received your item(s) for shipping. Designs the Limit will send tracking number and other information on request only. If shipping is delayed for any reason we will send you a delay notification on request. \n\nCHANGE OF ADDRESS POLICY: If you have selected the wrong shipping address or need to make a change to the shipping address, send us a message and we will assist you. We require an additional purchase for all change of address requests and complete a change of address by shipping your order to the address entered with the purchase of our change of address listing. To change the address entered at the time of purchase, please add this link to your cart and proceed to checkout. Please enter the address you would like to have your order shipped to in the SHIP TO field during checkout.\n\nCHANGE OF ADDRESS:\nhttps://www.etsy.com/listing/245879070/change-of-address\n\nAs soon as we receive the purchase of a change of address listing, we mark the first order as shipped to ensure that your order is shipped to the address you prefer. If requesting a change of address to the state of Virginia, we can only honor your request if the address originally entered during checkout is in the state of Virginia. We recommend entering the address you would like your package shipped to at the time of purchase and we do not guarantee and can not be held responsible for changing the order shipping address or communicating with the USPS, FedEx, UPS, or other shipping providers once your order has been shipped and is beyond our control. It is the customers sole responsibility to enter the shipping address they would like their package shipped to and to review the information on their Etsy generated order receipt emails with the order number and shipping information. We also offer additional shipping options for an additional charge and not included in the standard listings including shipping insurance, signature delivery, hold for pickup, and other delivery requests.\n\nSHIPPING: The USPS includes insurance for all USPS Priority Mail and USPS Priority Express Mail shipments, but it is the customers sole responsibility to submit and handle shipping claims directly with the USPS unless additional insurance is included at the time of purchase from either the shipping options drop down menu at checkout or by adding the insurance listing to your shopping cart before your order is shipped.\n\nSHIPPING INSURANCE: Design&#39;s the Limit offers additional insurance which may be purchased for any listing at an additional charge and will handle any insurance claims for orders which purchase the additional insurance. To submit a claim for an item which additional insurance was purchased, we require you to keep the broken item until any shipping claims can be resolved, submit a signed testimonial about the condition of the product and the packaging when it arrived, and provide proof in form of multiple digital pictures that can be emailed to  info [!at] designsthelimit.com. For faster service, please include your order number. After we receive multiple digital pictures of the damaged product in the original packaging with a signed testimonial, we will submit a claim with the insurance provider. Customer&#39;s must purchase replacement items or wait until shipping claims can be resolved. If the customer decides to purchase the item again, a full refund will be issued on completion of the shipping claim. If the customer decides to wait until the shipping claim is resolved, a replacement will be issued and shipped at no charge after the claim is resolved. It is the customer&#39;s responsibility to ensure that insurance is included with the shipping of their packages. \n\nTHIRD-PARTY SHIPPING INSURANCE LISTING LINK: https://www.etsy.com/listing/187324452/shipping-insurance\n\n\nSHIPPING DAMAGE & CLAIMS POLICY: If your item arrives broken give us a call within 24 hours of receipt of your delivery and we will address the situation promptly. Save all packaging and the item that has been broken. The insurance provider does not always require you to ship the broken item, but the item must be stored until the insurance claim is resolved. For this and other reasons, the customer&#39;s is responsible for resolving shipping claims for USPS Priority and USPS Priority Express insurance provided by the USPS. Design&#39;s the Limit standard listings include USPS Parcel Select 2-9 day or USPS First Class shipping with no insurance. In some cases, Design&#39;s the Limit may upgrade your shipping to USPS Priority Mail 1-3 days which includes insurance provided by the USPS, but Design&#39;s the Limit will only handle the insurance claim if our additional third party shipping insurance is purchased before your order is shipped. \n\nFILE A SHIPPING DAMAGE CLAIM: www.usps.com/help/claims.htm\n\n\nINTERNATIONAL CUSTOMERS:  For orders requesting shipping outside of the USA, please send us a custom order request if international shipping options are not included in the standard listing options. We are in the process of adding calculated international shipping to our listings, but we can create a custom listing for international shipping on request. In addition to our other shop policies, it is the customers sole responsibility to be aware of the customs regulations in the country they are requesting shipment to. All customers requesting an international shipment agree to research the regulations, disclose any pertinent information to Design&#39;s the Limit, and accept full responsibility for the item they are purchasing and adherence to international laws. Customers further agree to handle and pay out of pocket any import fees, taxes, penalties, or other payments required to complete the delivery of the order and agree to hold Design&#39;s the Limit harmless for any additional fees. \n\n\nDOMESTIC & INTERNATIONAL SHIPPING: Although we attempt to calculate our shipping as accurately as possible, on occasion customers may be responsible for additional fees if the cost of shipping your order exceeds the amount charged for shipping during checkout. Customers understand that there is no guarantee of the accuracy of estimated shipping costs at the time of purchase. If additional shipping costs occur, the customer is responsible for paying all shipping cost before an item will be shipped or to complete delivery of their package. In the event of shipping damage, the customer is responsible for all insurance claims, return shipping costs, purchase of replacement, shipping costs of replacement items, and any other costs that occur as a result of shipping including, but not limited to custom and import fees, shipping labels, packaging materials, and additional labor. Customer is responsible for all risk and any loss occurring from shipping to an unconfirmed USPS address and for any shipment outside of the continental US borders.\n\n\nINTERNATIONAL CUSTOMERS WITH ENGLISH AS A SECOND LANGUAGE: Design&#39;s the Limit will create a custom listing for international shipments on request, but when requesting a custom order for shipping outside of the US, customers agree that they have read, fully understand, and accept our shop policies and proceed at their own risk. Design&#39;s the Limit does not offer shipping insurance on international shipments and can not be held responsible for shipments outside of US borders. International customers further agree to hold Design&#39;s the Limit harmless in any way for the products, services, and shipment of the products we offer. We offer sales and service only in the English language and customers are responsible for reading our shop policies before making a purchase. Customer&#39;s who do not speak English or speak English as a second language are still responsible for adherence to our shop policies, terms, and conditions. Communication is required for the purchase of personalized gifts and we offer sales and service in the English language only.\n\n\nCOUNTRY OF ORIGIN: We attempt to identify all of the products we offer which are Made in the USA and if you would like to know the country of origin of any of our products, click &quot;Ask a Question,&quot; and we would be happy to answer your question. Due to volatility and changes in world markets, we do not guarantee the accuracy of our listing information regarding country of origin or changes in production or supply. If you are concerned about the country of origin or would like to ascertain that your purchase is for products Made in the USA, contact us before making a purchase.\n\n\nMADE IN THE USA: In addition to offering a large variety of products which are Made in the USA, we use equipment Made in the USA, and ship our products using packaging materials Made in the USA. We use environmentally friendly materials whenever possible, recycle, and reuse materials in an effort to do our part for the planet Earth. In some cases, Design&#39;s the Limit also offers some of the finest products available from around the world. In most cases, Design&#39;s the Limit also offers personalization using Made in the USA equipment, but also reserves the right to use equipment manufactured in other parts of the world as we deem necessary. Please click &quot;Ask a Question&quot; if you have any questions. If you support Made in the USA and environmentally friendly products, let us know if you have any questions about our products and services.","policy_refunds":"PAYMENT & CANCELLATION POLICY: Due to the inherent nature of personalized gifts, all sales are final. Every customer is responsible for reading, understanding, and accepting our shop policies prior to making a purchase and without exception. Cancellation requests are only honored if made immediately after placing an order. Once your order has been received and we have emailed acceptance, we no longer accept cancellation requests.\n\nREFUNDS, EXCHANGES, AND RETURNS: Design&#39;s the Limit does not accept cancellation requests, accept returns, or allow exchanges for any of personalized gifts which we sell with no exceptions. All sales are final. We inspect all of our products to be free from factory and workmanship defects before personalization. To ensure the highest possible quality, we then inspect each product again before it ships. \n\nPRODUCT VARIATIONS: Please note that minor air bubbles, flow lines, and slight bumps are inherent to all glass and crystal products and are not considered defects. Heavy bottom glassware will have variations due to settling which may affect the capacity. Measurements and volumes for glassware will vary by batch and product information identified in the listings are not guaranteed. Wood grain pattern varies from piece to piece, have variations in color, and have various knots or other imperfections which are not considered defects. Veins, flow lines, slight bumps, and crevices are inherent to all stone products and are not considered defects. Variations and other characteristics are present to some degree on all the products we sell and once personalized the items are non-refundable. Imperfections and variations are inherent to the nature of the products and are not considered defects. We embrace the unique qualities and characteristics and the nature of the products we personalize. Design&#39;s the Limit is not responsible for liability of our products and is only responsible for the quality of the artwork we provide as part of the personalization of the products you purchase. \n\nPRODUCT DEFECTS: In addition to all of our other shop policies, any claims must be referred to the original manufacturer of the artwork canvas which varies with each listing. The manufacturer&#39;s whose products we purchase to transform into artwork for our customers, accept no liability for items which have been personalized. Design&#39;s the Limit, LLC accepts no liability in any form for the products we offer to our customers. All customers accept responsibility for the products they purchase from us and have no recourse for any reason or circumstance with no exceptions if the original product manufacturer does not wish to handle the claim. All customers agree to hold Design&#39;s the Limit harmless for the products and services we offer. All customers further agree to understand that the original product manufacturer (OPM) varies from product to product and that by purchasing their products you are responsible for following the manufacturers policies and instructions for use. It is the customers sole responsibility to ask for additional information and for the safe use of our products once purchased.\n\nPRODUCT DISPUTES: Design&#39;s the Limit stands to deliver quality products and quality artwork with the customer service to match. Let us know how we can be of service, we appreciate your support of small business in America.. Never to leave our customers without an option, if you are looking for particular product characteristics or would like to specify particular order guidelines let us know before you make a purchase. If you would like to have any order recommissioned, we can create a custom order for you including a discount for the total quantity purchased, an accurate shipping rate to your zip code, and our efforts to accommodate any special requests.\n\nWHAT IF I AM ORDERING MORE THAN ONE OF THE SAME PRODUCT:\nWhen ordering more than one of any product we offer, you will notice product variations. Many products have a distinct character inherent in the materials nature including wood, glass, stone, and other materials. Any product, when purchased, will have individual characteristics due to the nature of the product which are not considered defects. These variations are to be expected, are considered desirable, and give each a unique appeal. We do not accept returns or offer refunds for buyer remorse or dislike for a particular grain, pattern, variation, or other characteristic of the product when it is received. We make every effort to purchase quality products which can be admired and put to good use for years to come. Design&#39;s the Limit gifts are unique just like the service we provide.\n\nPERSONALIZATION POLICY: Personalizing gifts is an art, not a science. Design&#39;s the Limit reserves the right to use creative license to complete any order. Design&#39;s the Limit does not offer products for sale unless personalized and products that have been personalized are not eligible for return. All sales are final and we strongly recommend reading the information attached to each listing and proofreading the information submitted in the notes to seller before submitting it. All orders are produced as inspired by the customer. We do not issue refunds or exchanges on orders submitted with incorrect information. After you place an order, we recommend proofreading the information in your Etsy generated email informing you that your order has been received. Orders which are entered with missing information will be completed with the information provided and shipped on schedule to the address provided. Design&#39;s the Limit will accept orders including logos, phrases, quotes, poems, songs, bible verses, and even profanity in good humor as long as the information is in the public domain. \n\nDECENCY REQUIREMENTS: Design&#39;s the Limit will not fill any order including profanity which could be classified as obscene including, but not limited to, the following categories: vulgar, discriminatory, or demeaning to others. As long as the information is in the public domain and the customer assumes responsibility for the right to reproduce the information provided, Design&#39;s the Limit will accept special requests in good humor. Orders placed for personalization of information which we deem to be vulgar or hateful will be cancelled and a partial refund will be issued. It is the customers responsibility to decide what is an appropriate gift and for the submission of the obscene including accepting full responsibility for the items they purchase. We reserve the right to report the information you enter in the notes to seller or in any conversation through the Etsy messaging system as we see fit and in any manor in which we deem necessary. \n\nINTELLECTUAL PROPERTY: We explicitly forbid the use of any of the information including design proofs provided in our messages for being used for any other reason than to make a purchase in our shop unless written permission is obtained prior to use. All product images, designs, proofs, and written information posted in our shop or conveyed through email is the intellectual property of Design&#39;s the Limit. Our products are to be purchased and used by individuals for their intended purpose and not for resale. Contact us for more information.\n\nCUSTOMER ACCEPTANCE OF SHOP TERMS POLICY \nBy visiting our site, the customer is responsible for adherence to our shop policies without exception. When sending or receiving an e-mail, asking a question, requesting a custom order, receiving a proof of design, or when placing an order with Design&#39;s the Limit you agree that you have read, fully understand, and accept our shop policies. Our shop policies are updated on a regular basis and visitors to our site are responsible for reading, understanding, and accepting our shop policies with every visit without exception. All sales are final and if you have any questions about our products or services please do not hesitate to contact us before you make a purchase. All of the information and product images placed on our webstore are the sole intellectual property of Design&#39;s the Limit, LLC and reproduction of any of our products designs, shop information, or our images is strictly forbidden. Please click ask a question or you may e-mail us at info [!at] designsthelimit.com for more information and thank you for the opportunity to serve all of your\n\n\n\n\nCOUPON AND QUANTITY DISCOUNTS POLICY: Design&#39;s the Limit will not retroactively issue refunds for quantity discounts. Design&#39;s the Limit special offers and coupon codes must be entered at the time of purchase and coupons not entered at the time of purchase will not be refunded. All sales are final and we encourage all of our customers who obtain coupon codes to enter them carefully in the appropriate field during checkout, read the product listings, read our shop policies, and contact us for any questions they may have before making a purchase.","policy_additional":"HOLD - HARMLESS:  All customers agree to hold Design&#39;s the Limit and our vendors harmless in any way for the products and services we provide. Design&#39;s the Limit offers sales of personalized artwork on a variety of products to domestic and international customers while accepting no liability for the products we sell and no guarantee of customer satisfaction. Design&#39;s the Limit&#39;s original product manufacturer&#39;s and other vendors accept no liability in any form for the products we personalize and once personalized they cannot be held responsible for the product. All customer&#39;s accept that all sales are final and that they have no recourse if the product does not meet their expectations or for any other issues relating to the products or services they have purchased. By purchasing products used in food service, customer accepts sole responsibility for cleaning and inspecting products thoroughly and determining if the product is safe to use. Customer further accepts sole responsibility for the health, safety, and welfare of anyone who uses the product. If you purchase any of our products and then proceed to give our products as gifts, you accept sole responsibility for the health, safety, and welfare of your gift recipient and anyone they share the product with. Customer accepts all risk for the products purchased from our shop. All of our shop policies are non-negotiable, but please contact us before you make a purchase if you have any questions or concerns about the products you intend to purchase.\n\nINTELLECTUAL PROPERTY:  All of the information and product images placed on our webstore or submitted to customers through e-mail are the sole intellectual property of Design&#39;s the Limit, LLC and reproduction of any of our information or our images is strictly forbidden. Images submitted to customers in response to a custom order request are the sole intellectual property of Design&#39;s the Limit and any attempt to use the images provided for any other purpose than to purchase a product from our shop is not permissible. Any customer who is responsible for committing fraud or theft of our images will be reported to the proper authorities and we will seek damages to the full extent of the law. Any design which is created by Design&#39;s the Limit is the property of Design&#39;s the Limit and we reserve the right to reuse our designs. Design&#39;s the Limit will not reuse personal information, logos, or other information provided by the customer, but designs created for customers remain the property of Design&#39;s the Limit. Design&#39;s the Limit will offer a reward on conviction of theft of our information, designs, or product images. Please contact us if you are aware of any individual or company who has broken the law and we will make ever effort to keep your identity confidential and only disclose such information to the proper authorities on request.\n\nIF YOU REQUEST OR SUBMIT YOUR OWN TEXT OR IMAGES - Personalization is included in the cost of our products with the purchase of any of our standard designs. However, if you request a custom order which requires additional labor to complete the design, additional fees apply. For item listings which include a custom design option in the product selection, the custom fee may be increased or decreased depending on the individual request and additional fees may apply depending on the design. Images may be submitted in Adobe Illustrator (.ai) format to reduce the cost of design. E-mail us your design, image, logo, quote, poem, song, inspirational saying, or other personal message so that we can prepare it for personalization. Text and personal information received by Design&#39;s the Limit, L.L.C. will not be used for any other reason than to fill your order request. Design&#39;s the Limit, LLC is not responsible for identifying the source of the material submitted by others and accepts no liability for the reproduction of images and/or other information submitted. It is the customer&#39;s sole responsibility to be aware of the source of the material submitted, to disclose that information to Design&#39;s the Limit, LLC, and to either know if the image is in the public domain or have permission to reproduce the material before submission. Customer assumes all liability for the right to reproduce any materials including text or images provided and is the sole responsible party for: identifying the source of any protected material submitted, verifying whether the material is in the public domain, obtaining permission to reproduce the material, and any and all of the legal consequences for submitting the material to Design&#39;s the Limit, LLC. Customers who submit orders requesting images or text submitted are subject to our cancellation policy if unable to obtain written permission to reproduce the information submitted. Customers who submit text or images to Design&#39;s the Limit without disclosing the source, accept full legal responsibility for the reproduction, agree to hold Design&#39;s the Limit harmless in any way, and will be responsible for paying all of our legal fees including but not limited to damages, lost wages, legal representation, and any other fees or penalties that may arise should any legal action be taken. Submission of images and/or other information to Design&#39;s the Limit, LLC constitutes an affidavit of the customer&#39;s right to reproduce the material submitted with the consent of the owner of the intellectual property rights, copyrights, and/or trademarks. Design&#39;s the Limit reserves the right to contact individuals, organizations, corporations, or the proper authorities to report the submission of images it believes were obtained unlawfully. We hold the upmost respect for the laws of this country and the men and women who enforce those laws. We are a BBB Accredited business and licensed Limited Liability Company in the Commonwealth of Virginia.\n\nPRIVACY POLICY: Although you can contact us directly through email at  info [!at] designsthelimit.com or call us Toll Free at (888) 847 - 3157, once an order has been placed communication in reference to an order must be conducted through the Etsy messaging system. To protect the privacy of our customers we do not discuss the details of an order on the phone or through direct email unless we can verify the identity of the individual. We make every attempt to respond to conversations on Etsy in a timely manner and encourage use of the Etsy messaging system as the primary means of communication for your personalized gift purchases in our shop. As sellers on Etsy, we are only provided with your screen name, your email address, and the address you enter as the shipping address when you place an order. Please enter the Shipping Address in the appropriate field and the information to complete your order in the Notes to Seller textbox before completing checkout. We will contact you in reference to your order as needed through the Etsy messaging system or may email you directly in cases where we do not receive a response.\n\nDOES DESIGN&#39;S THE LIMIT OFFER A WARRANTY?\nTHIS SITE IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS. NO REPRESENTATIONS OR WARRANTIES OF ANY KIND ARE MADE, EXPRESS OR IMPLIED, AS TO THE INFORMATION, CONTENT, MATERIALS, OR PRODUCTS INCLUDED ON THIS SITE. TO THE FULL EXTENT PERMISSIBLE BY APPLICABLE LAW, THIS SITE&#39;S OWNER DISCLAIMS ALL WARRANTIES INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. \n\nALL VISITORS TO OUR SHOP EXPRESSLY AGREE THAT USE OF THIS SITE IS AT THEIR SOLE RISK AND ASSUME ALL LIABILITY FOR USE, RESPONSIBILITY FOR THEIR ACTIONS, AND ACCEPT THEIR OBLIGATION TO READ, UNDERSTAND, AND ACCEPT OUR SHOP POLICIES BEFORE CONTACTING THE SHOP OWNER, MAKING A PURCHASE, OR INTERACTING WITH THE SHOP OR IT&#39;S PRODUCTS.","policy_seller_info":"CONTACT US: We make every effort to respond to every conversation in a timely manner and recommend use of the Etsy Messaging System. Please click &quot;Contact the Shop Owner&quot; on our homepage or click &quot;Request a Custom Order......&quot; from any listing. Design&#39;s the Limit asks all of our Etsy customers to contact us before you make a purchase if you have any questions about our shop or any of the products or gift services we provide. We look forward to working with you and feel honored to be a part of our customer&#39;s happiest gift giving moments around the world.\n\nRichard and Tatiana of Design&#39;s the Limit\nShipping Worldwide on Etsy from Virginia Beach, Virginia\nB.B.B. Accredited and 2016 Wedding Wire Couple&#39;s Choice Award!","policy_updated_tsz":1458310786,"policy_has_private_receipt_info":true,"vacation_autoreply":null,"url":"https://www.etsy.com/shop/DesignstheLimit?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","image_url_760x100":"https://img1.etsystatic.com/123/0/8168003/iusb_760x100.19563965_haiy.jpg","num_favorers":1607,"languages":["en-US"],"upcoming_local_event_id":null,"icon_url_fullxfull":"https://img0.etsystatic.com/138/0/8168003/isla_fullxfull.17020394_l8gghj5j.jpg","is_using_structured_policies":false,"has_onboarded_structured_policies":false,"has_unstructured_policies":true}},{"listing_id":236655450,"state":"active","user_id":32454617,"category_id":68887494,"title":"Custom Engraved Personalized Rocks Whiskey Glass Groomsman Wedding Best Man Bridesmaid Father Gift Add Text & Images!","description":"YOUR BID IS FOR ONE PERSONALIZED ROCKS WHISKEY GLASS.\n\nWE WILL ENGRAVE YOUR MESSAGE ON THE GLASS FOR A GIFT THAT LASTS FOREVER!\n\nOverall Dimensions:\nTop Diameter: 3 5/8&quot;\nBottom Diameter: 2 3/4&quot;\nMaximum Diameter: 3 5/8&quot;\nHeight: 4&quot;\n\n13oz\n\nMade in the USA\n\n\n\n\nPERSONALIZATION:\n\n1. TEXT:\n\n(you may add any text, it does not have to be for wedding)\n\n2. IMAGES:\n\nYOU MAY ADD ANY OF OUR FREE IMAGES FROM THE EXAMPLE PICTURE OR BELOW LINK:\n\nhttp://www.mipengraving.com/clipart/clipart.php\n\n3. PICK YOUR FONT STYLE!\n\nYOU MAY PICK YOUR FONT STYLE, PLEASE SEE LINK BELOW FOR SOME POPULAR FONT OPTIONS:\n\nhttp://www.mipengraving.com/Fonts.html","creation_tsz":1460659340,"ending_tsz":1471200140,"original_creation_tsz":1433978396,"last_modified_tsz":1460659340,"price":"9.99","currency_code":"USD","quantity":896,"tags":["Groomsmen Gift","Bridesmaid Gift","Wedding Party Gift","Father Gift","Gift For Him","Goblet","Wine Goblet","Mother Gift","Grandmother Gift","Sister Gift"],"category_path":["Weddings"],"category_path_ids":[68887494],"materials":["Glass"],"shop_section_id":17211137,"featured_rank":null,"state_tsz":1433978396,"url":"https://www.etsy.com/listing/236655450/custom-engraved-personalized-rocks?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","views":1287,"num_favorers":7,"shipping_template_id":21549489797,"processing_min":3,"processing_max":5,"who_made":"i_did","is_supply":"false","when_made":"made_to_order","item_weight":null,"item_weight_units":null,"item_length":null,"item_width":null,"item_height":null,"item_dimensions_unit":"in","is_private":false,"recipient":"men","occasion":"wedding","style":null,"non_taxable":false,"is_customizable":true,"is_digital":false,"file_data":"","language":"en-US","has_variations":false,"taxonomy_id":1668,"taxonomy_path":["Weddings","Gifts & Mementos","Groomsmen Gifts"],"used_manufacturer":false,"Images":[{"listing_image_id":785298539,"hex_code":"000000","red":0,"green":0,"blue":0,"hue":0,"saturation":0,"brightness":0,"is_black_and_white":null,"creation_tsz":1433978397,"listing_id":236655450,"rank":1,"url_75x75":"https://img1.etsystatic.com/066/0/8035728/il_75x75.785298539_km6t.jpg","url_170x135":"https://img1.etsystatic.com/066/0/8035728/il_170x135.785298539_km6t.jpg","url_570xN":"https://img1.etsystatic.com/066/0/8035728/il_570xN.785298539_km6t.jpg","url_fullxfull":"https://img1.etsystatic.com/066/0/8035728/il_fullxfull.785298539_km6t.jpg","full_height":606,"full_width":809}],"Shop":{"shop_id":8035728,"shop_name":"Daylors","user_id":32454617,"creation_tsz":1365708624,"title":null,"announcement":null,"currency_code":"USD","is_vacation":false,"vacation_message":null,"sale_message":null,"digital_sale_message":null,"last_updated_tsz":1460659340,"listing_active_count":2879,"digital_listing_count":0,"login_name":"daylors","accepts_custom_requests":true,"policy_welcome":null,"policy_payment":null,"policy_shipping":null,"policy_refunds":null,"policy_additional":null,"policy_seller_info":null,"policy_updated_tsz":0,"policy_has_private_receipt_info":false,"vacation_autoreply":null,"url":"https://www.etsy.com/shop/Daylors?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","image_url_760x100":null,"num_favorers":1187,"languages":["en-US"],"upcoming_local_event_id":null,"icon_url_fullxfull":null,"is_using_structured_policies":false,"has_onboarded_structured_policies":false,"has_unstructured_policies":false}},{"listing_id":250368573,"state":"active","user_id":22553896,"category_id":69150425,"title":"Set of 2 Personalized Whiskey glasses","description":"All glasses are microwave and dishwasher safe. \n \nSET OF 2 PERSONALIZED ROCKS WISKEY GLASSES\n\nWE WILL ENGRAVE YOUR MESSAGE ON THE GLASS FOR A GIFT THAT LASTS FOREVER!\n\nOverall Dimensions:\nTop Diameter: 3 5/8&quot; \nBottom Diameter: 2 3/4&quot; \nMaximum Diameter: 3 5/8&quot;\nHeight: 4&quot;\n13oz\n\nMade in the USA\n\n\nPERSONALIZATION:\n\nPlease do not forget to leave the name  and optional second line of text! We cannot complete the order without this information\n\n\nNOTE: As demand increases or decreases our supplier may or may not be able to meet demand. As this occurs, we reserve the right to change glasses as necessary. The general shape will always be the same (i.e. whiskey glasses will always be whisky glasses and wine will always be wine, we will never substitute types) If you, or the person you are ordering for force an issue with this, please contact us prior to ordering to ensure we have the exact glass you&#39;re looking for.","creation_tsz":1460659326,"ending_tsz":1471200126,"original_creation_tsz":1443842547,"last_modified_tsz":1460659326,"price":"14.99","currency_code":"USD","quantity":33,"tags":["Candle","Monogram","Personalized","wedding","Custom","Whiskey","Liquor","gift","Glass","Etched","groomsmen","groomsman","best man"],"category_path":["Housewares"],"category_path_ids":[69150425],"materials":[],"shop_section_id":14784145,"featured_rank":null,"state_tsz":1456330754,"url":"https://www.etsy.com/listing/250368573/set-of-2-personalized-whiskey-glasses?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","views":110,"num_favorers":4,"shipping_template_id":null,"processing_min":3,"processing_max":5,"who_made":"i_did","is_supply":"false","when_made":"made_to_order","item_weight":null,"item_weight_units":null,"item_length":null,"item_width":null,"item_height":null,"item_dimensions_unit":"in","is_private":false,"recipient":null,"occasion":null,"style":null,"non_taxable":false,"is_customizable":true,"is_digital":false,"file_data":"","language":"en-US","has_variations":false,"taxonomy_id":1054,"taxonomy_path":["Home & Living","Kitchen & Dining","Drink & Barware"],"used_manufacturer":false,"Images":[{"listing_image_id":843722193,"hex_code":"724825","red":114,"green":72,"blue":37,"hue":27,"saturation":67,"brightness":44,"is_black_and_white":false,"creation_tsz":1443842548,"listing_id":250368573,"rank":1,"url_75x75":"https://img1.etsystatic.com/102/0/8413977/il_75x75.843722193_dk8a.jpg","url_170x135":"https://img1.etsystatic.com/102/0/8413977/il_170x135.843722193_dk8a.jpg","url_570xN":"https://img1.etsystatic.com/102/0/8413977/il_570xN.843722193_dk8a.jpg","url_fullxfull":"https://img1.etsystatic.com/102/0/8413977/il_fullxfull.843722193_dk8a.jpg","full_height":622,"full_width":640}],"Shop":{"shop_id":8413977,"shop_name":"CarolinaCrazy","user_id":22553896,"creation_tsz":1375325128,"title":"Carolina Crazy","announcement":"Hi and welcome to Carolina Crazy! Please look around and let us know if there&#39;s anything we can do to help you. Custom orders welcome!","currency_code":"USD","is_vacation":false,"vacation_message":null,"sale_message":"Thank you for your purchase! Please note the production time on the listing and feel free to contact us if you have any questions about your order. \r\n\r\n****If your order requires a proof, please check for it within 48 hours. Once we send out a proof, you have an additional 48 hours to approve. Any proofs not approved within 48 hours will be shipped as the proof was sent and we will not be responsible for errors. It&#39;s crucial that we&#39;re able to get orders out on time so please do not forget to check for proofs!****\r\n\r\nIf there is an issue with your order, please contact us so that we can help resolve the problem! \r\n\r\nThank you, \r\nCarolina Crazy Staff\r\n\r\nFor new products, giveaways and promotions follow us on instagram! @carolinacrazygifts\r\nIf you post a pic of your purchase, be sure to tag us for a discount on your next purchase!","digital_sale_message":"If you have any problems downloading your purchase, please feel free to contact us. ","last_updated_tsz":1460659326,"listing_active_count":462,"digital_listing_count":102,"login_name":"meganbolick","accepts_custom_requests":true,"policy_welcome":"We strive to provide you with the best high quality vinyl product that will last for years to come. Not only will your accessories be looking fabulous in your custom monograms but so will you. If there is anything that you want and do not see please contact us. We are sure we can accommodate whatever your needs maybe. \r\n","policy_payment":"We accept all forms of payment. \r\n\r\n CANCELLATIONS\r\n Due to turnaround time personalization we can not cancel orders\r\n","policy_shipping":"We use USPS First Class Mail for all of my domestic packages unless you purchase an upgrade. Tracking is provided on all orders.\r\n\r\n SHIPPING AND HANDLING\r\n\r\n *USPS First Class Mail with tracking (2-5 days)\r\n * USPS Priority Mail (1-3 days) UPGRADED\r\n\r\n ****Upgrading your shipping does not put your order first. If you need a rush order it is an additional $5.00\r\n\r\n ****We have found in our experience that the days for arrival are only estimates. We can not guarantee when your package will arrive nor be held responsible for lost packages. This includes USPS Priority Mail UPGRADE\r\n\r\n ****Since all packages come with tracking please make sure that you have provided me with all the correct shipping information. This also goes for your Paypal account. That is where all orders with Paypal will ship too. If a package shows that it has been delivered I will NOT resend or offer a refund for your merchandise. We do provide insurance for all packages. We suggest that you purchase it.\r\n\r\n ****Please make sure that you have all the correct shipping information. We do charge shipping again if package is returned.\r\n\r\n","policy_refunds":"Please double check your order for the correct information that is needed. If there is an error in your initials and it is our fault we will replace it immediately.\r\n\r\nDue to the nature of all our merchandise being personalized we can not accept returns.\r\n\r\nIf there is an issue with your order we must be notified within 3 days of receiving.\r\n\r\nIn the event you mess the decal up while applying, we do NOT offer a refund for this. If you&#39;re unsure how to apply the decal please visit: https://www.youtube.com/watch?v=VyRwCvTcriE for a detailed video tutorial.\r\n","policy_additional":"We use the best quality outdoor vinyl that will last for years to come.\r\n\r\nWhen decals are applied to Phones-Laptops- Tumblers and such they will not last as long due to constant handling.\r\n\r\n Vinyl decals must be hand washed.\r\n\r\nAll decals are very easy to apply to almost all surfaces. Should you need help applying, please feel free to contact us.\r\n\r\n Vinyl does not like to stick to rubber, silicon or PCU.\r\n\r\n Decals are removable but not reusable.\r\n\r\n ****The printed pattern decals are all sealed with a clear UV protection to HELP prevent fading and peeling. These decals are made from a different type of vinyl that will not last as long as the solid color vinyl.\r\n\r\nGLASS NOTE: As demand increases or decreases our supplier may or may not be able to meet demand. As this occurs, we reserve the right to change glasses as necessary. The general shape will always be the same (i.e. whiskey glasses will always be whisky glasses and wine will always be wine, we will never substitute types) If you, or the person you are ordering for force an issue with this, please contact us prior to ordering to ensure we have the exact glass you&#39;re looking for. ","policy_seller_info":"Megan Bolick, Betsy Harpe, Heather Nelson\r\ncarolinacrazygifts@gmail.com\r\nCharlotte, North Carolina","policy_updated_tsz":1453252197,"policy_has_private_receipt_info":false,"vacation_autoreply":null,"url":"https://www.etsy.com/shop/CarolinaCrazy?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","image_url_760x100":"https://img1.etsystatic.com/068/0/8413977/iusb_760x100.15456415_2yq9.jpg","num_favorers":2335,"languages":["en-US"],"upcoming_local_event_id":null,"icon_url_fullxfull":null,"is_using_structured_policies":false,"has_onboarded_structured_policies":false,"has_unstructured_policies":true,"custom_shops_state":3}},{"listing_id":276408506,"state":"active","user_id":60650877,"category_id":69151309,"title":"Flawless Whisky Quartz Fancy Cardamom Shape Briolette Beads - Laser Net Faceted Three Sided Gemstones AAA Rice Pointer Matched Trio Set","description":"Radiant whisky quartz briolettes with expert laser faceting cut, fancy cardamom shape, utter brilliance, beautiful transparency.\n\nHigh-End gem grade stones. No doubt AAA gems !!\n\n Each listing is for THREE briolettes (matched trio set), color and quality as pictured. You get what you see! \n\n\n• S P E C I F I C S •\n\n•  Average size: 16 x 8mm (pendant)   14 x 7.5mm (earring set)\n\n•  Amount: 3 briolettes (one trio)\n\n•  Shape:  fancy drop","creation_tsz":1460659319,"ending_tsz":1471200119,"original_creation_tsz":1460659319,"last_modified_tsz":1460662983,"price":"21.40","currency_code":"USD","quantity":2,"tags":["genuine gemstones","natural stones","aaa","gem quality","high-end","3 sided cardamom","matched pair","matched trio","jewelry set","whisky whiskey","rice briolette","laser faceted","plump"],"category_path":["Supplies","Bead"],"category_path_ids":[69150433,69151309],"materials":["Genuine gemstones"],"shop_section_id":17085281,"featured_rank":null,"state_tsz":1460659319,"url":"https://www.etsy.com/listing/276408506/flawless-whisky-quartz-fancy-cardamom?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","views":0,"num_favorers":0,"shipping_template_id":11461676363,"processing_min":1,"processing_max":2,"who_made":"someone_else","is_supply":"true","when_made":"2010_2016","item_weight":"1","item_weight_units":null,"item_length":"8","item_width":"6","item_height":"1","item_dimensions_unit":"in","is_private":false,"recipient":null,"occasion":null,"style":null,"non_taxable":false,"is_customizable":false,"is_digital":false,"file_data":"","language":"en-US","has_variations":false,"taxonomy_id":2232,"taxonomy_path":["Craft Supplies & Tools","Jewelry & Beading Supplies","Loose Gemstones"],"used_manufacturer":false,"Images":[{"listing_image_id":1004716719,"hex_code":"B8A47F","red":184,"green":164,"blue":127,"hue":39,"saturation":30,"brightness":72,"is_black_and_white":false,"creation_tsz":1460659319,"listing_id":276408506,"rank":1,"url_75x75":"https://img1.etsystatic.com/140/0/10609531/il_75x75.1004716719_4mf3.jpg","url_170x135":"https://img1.etsystatic.com/140/0/10609531/il_170x135.1004716719_4mf3.jpg","url_570xN":"https://img1.etsystatic.com/140/0/10609531/il_570xN.1004716719_4mf3.jpg","url_fullxfull":"https://img1.etsystatic.com/140/0/10609531/il_fullxfull.1004716719_4mf3.jpg","full_height":480,"full_width":640},{"listing_image_id":958175258,"hex_code":"9F8862","red":159,"green":136,"blue":98,"hue":37,"saturation":38,"brightness":62,"is_black_and_white":false,"creation_tsz":1460659319,"listing_id":276408506,"rank":2,"url_75x75":"https://img0.etsystatic.com/130/0/10609531/il_75x75.958175258_7mkx.jpg","url_170x135":"https://img0.etsystatic.com/130/0/10609531/il_170x135.958175258_7mkx.jpg","url_570xN":"https://img0.etsystatic.com/130/0/10609531/il_570xN.958175258_7mkx.jpg","url_fullxfull":"https://img0.etsystatic.com/130/0/10609531/il_fullxfull.958175258_7mkx.jpg","full_height":480,"full_width":640},{"listing_image_id":1004716703,"hex_code":"B4A382","red":180,"green":163,"blue":130,"hue":40,"saturation":27,"brightness":70,"is_black_and_white":false,"creation_tsz":1460659319,"listing_id":276408506,"rank":3,"url_75x75":"https://img1.etsystatic.com/132/0/10609531/il_75x75.1004716703_i0cp.jpg","url_170x135":"https://img1.etsystatic.com/132/0/10609531/il_170x135.1004716703_i0cp.jpg","url_570xN":"https://img1.etsystatic.com/132/0/10609531/il_570xN.1004716703_i0cp.jpg","url_fullxfull":"https://img1.etsystatic.com/132/0/10609531/il_fullxfull.1004716703_i0cp.jpg","full_height":480,"full_width":640},{"listing_image_id":958175292,"hex_code":"A99571","red":169,"green":149,"blue":113,"hue":39,"saturation":33,"brightness":66,"is_black_and_white":false,"creation_tsz":1460659319,"listing_id":276408506,"rank":4,"url_75x75":"https://img0.etsystatic.com/107/0/10609531/il_75x75.958175292_1us6.jpg","url_170x135":"https://img0.etsystatic.com/107/0/10609531/il_170x135.958175292_1us6.jpg","url_570xN":"https://img0.etsystatic.com/107/0/10609531/il_570xN.958175292_1us6.jpg","url_fullxfull":"https://img0.etsystatic.com/107/0/10609531/il_fullxfull.958175292_1us6.jpg","full_height":480,"full_width":640}],"Shop":{"shop_id":10609531,"shop_name":"GetRealStone","user_id":60650877,"creation_tsz":1428464857,"title":"Selected Premium Natural Gemstone Beads at Great Prices","announcement":"WELCOME!  If making jewelry with luscious natural gemstones in the colors of the rainbow is your thing, you&#39;ll be sure to get amazing finds here!\r\n\r\nThanks for stopping by, don&#39;t forget to add me to your favorites and come back soon, my collection of gemstones is HUGE and I will be listing new items all the time.\r\n\r\nAll my gemstones have been carefully hand-selected by me over the years, they range from good to premium quality, some of my offerings are very unique and in very limited quantity and once sold they won&#39;t be offered again, this is due to them being a unique find or an old purchase of gems that are not available in the market at all times. \r\n\r\nYou get what you see in the photos, all these gems were picked and chose for my own jewelry, now as I&#39;m folding my jewelry business, all my gem buying expertise becomes your benefit and all these darlings become picked and chose for you!\r\n\r\n\r\n                     ••••   ••••   ••••   ••••     ••••   ••••   ••••   ••••     ••••   ••••   ••••   ••••\r\n\r\nIf you have any questions, please inquire before buying, and always be mindful of these three basic points:\r\n\r\n1- Photos are magnified to show the gemstone in detail, you have to read the description for an accurate size and other details.\r\n2- Slight color variations may occur from monitor to monitor, and\r\n3- No natural stone is flawless, although some can be very close to being perfect, natural inclusions and other issues may be present, but that is part of the beauty and character of earth-mined stones!","currency_code":"USD","is_vacation":false,"vacation_message":null,"sale_message":"Thanks for shopping GetRealStone !","digital_sale_message":null,"last_updated_tsz":1460522425,"listing_active_count":140,"digital_listing_count":0,"login_name":"GetRealStone","accepts_custom_requests":false,"policy_welcome":"Welcome to my shop, glad you stopped by!\r\nIf you have any questions, please don&#39;t be shy and ask, I welcome all inquires ;-D\r\nAll my gemstones are genuine earth-mined stones and although no natural gemstone is flawless, I strive for the best possible quality. \r\nWhat you see in my pictures is what you get!","policy_payment":"Any credit card is accepted through PayPal, the safe, easy and fast way to pay and you don&#39;t need an account to do so. If you open an account with them, you can also pay with eCheck.\r\n\r\nMN Residents pay 7.1875% sales tax.","policy_shipping":"All purchases will ship very safely packaged within 1-2 working days after payment is received.\r\nPackages will ship to the address specified on PayPal, it is your responsibility to make sure it is correct.","policy_refunds":"Refunds and exchange are available. I do my very best to provide an accurate depiction of all my gemstones through the pictures and written description, but if you are not totally satisfied with your purchase feel free to convo me for an exchange or to let me know that you will be returning the item. \r\nPlease, in any of those cases contact me Right Away after receiving the item and if you are returning do so within 5 working days. \r\nIn order to return an item, it has to be in the Exact Same condition it was received, otherwise it won&#39;t be accepted. \r\nI will issue a full refund minus shipping costs.","policy_additional":"All my gemstones have been carefully hand-selected by me through the years, they range from good to premium quality, some of my offerings are very unique and in very limited quantity and once sold they won&#39;t be offered again, this is due to them being a unique find or an old purchase of gems that are not available in the market at all times. \r\n\r\nIf you have any questions, please inquire before buying, and always be mindful of these 3 basic points:\r\n1- Photos are magnified to show the gemstone in detail, you have to read the description for an accurate size and other details.\r\n2- Slight color variations may occur from monitor to monitor, and\r\n3- No natural stone is flawless, although some can be very close to being perfect, natural inclusions and other issues may be present, but that is part of the beauty and character earth-mined stones!","policy_seller_info":null,"policy_updated_tsz":1448136516,"policy_has_private_receipt_info":false,"vacation_autoreply":null,"url":"https://www.etsy.com/shop/GetRealStone?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","image_url_760x100":"https://img0.etsystatic.com/055/0/10609531/iusb_760x100.15285252_jll2.jpg","num_favorers":195,"languages":["en-US"],"upcoming_local_event_id":null,"icon_url_fullxfull":"https://img0.etsystatic.com/125/0/10609531/isla_fullxfull.16834128_ng2nysss.jpg","is_using_structured_policies":false,"has_onboarded_structured_policies":false,"has_unstructured_policies":true}},{"listing_id":222487646,"state":"active","user_id":61503621,"category_id":69154647,"title":"World Traveler Airplane Vintage Plank Nameplate Sign Personalized Bar Man Cave 24&quot;X11&quot;","description":"World Traveler Vintage Plank Wood Sign\r\n\r\nwith personalized Nameplate\r\n\r\nPersonalized Nameplate  23.75&quot; X 3.5&quot;\r\n\r\nSign Only 23.75&quot; X 11.5&quot; \r\n\r\n\r\n\r\nPLEASE NOTE:   YOU CAN GET JUST THE SIGN WITHOUT THE NAMEPLATE IF YOU WOULD PREFER IT THAT WAY.  MESSAGE ME AND I WILL SET UP A PERSONAL LISTING FOR YOU WITH JUST THE SIGN.  COST FOR JUST THE SIGN WITH NO NAMEPLATE IS $120.00 WITH FREE SHIPPING.\r\n\r\n \r\n\r\nPersonalized Pop Art Vintage wooden plank sign with sculpted relief.\r\n\r\nThis sign is handcrafted in the USA of furniture grade wood planks\r\n\r\nand professionally printed using proprietary Poly-Arch Lithography.\r\n\r\nEach &quot;sign art&quot; piece is individually made upon order.\r\n\r\nFrom cutting and preparing the plank, to painting, screening, hand lettering, and distressing.\r\n\r\nEach is a unique piece of art.\r\n\r\nThe sculpted relief is made entirely in-house by staff artisans.\r\n\r\nPersonalized with the name of your choice. \r\n\r\nNo reasonable character limit.\r\n\r\nHanging hardware included for easy door or wall mounting.\r\n\r\nPerfect addition for your man cave, office, bar, recreation room, or business.\r\n\r\nThis is a great looking and unique wood sign.\r\n\r\nMakes a great gift or to keep for yourself\r\n\r\n\r\nPlease message me with your choice of personalization after purchase.\r\n\r\n\r\nThis item is personalized so please allow 5 to 7 business days for customization to be completed before it will ship.\r\n\r\nTypically it will take less time except around the holidays when it could take longer.\r\n\r\nOC17","creation_tsz":1460659226,"ending_tsz":1471200026,"original_creation_tsz":1423831585,"last_modified_tsz":1460659226,"price":"149.00","currency_code":"USD","quantity":2,"tags":["wood","clock","personalized","Vineyards","Wine","Barrel Head","Chateau","Bar","Pub","Whiskey","Game Room","Man Cave","Sign"],"category_path":["Woodworking","Home Decor"],"category_path_ids":[68887388,69154647],"materials":["wood","barrel head"],"shop_section_id":16792678,"featured_rank":null,"state_tsz":1434282623,"url":"https://www.etsy.com/listing/222487646/world-traveler-airplane-vintage-plank?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","views":47,"num_favorers":2,"shipping_template_id":null,"processing_min":5,"processing_max":7,"who_made":"collective","is_supply":"false","when_made":"made_to_order","item_weight":null,"item_weight_units":null,"item_length":null,"item_width":null,"item_height":null,"item_dimensions_unit":null,"is_private":false,"recipient":null,"occasion":null,"style":null,"non_taxable":false,"is_customizable":false,"is_digital":false,"file_data":"","language":"en-US","has_variations":false,"suggested_taxonomy_id":1002,"taxonomy_path":["Home & Living","Home Décor"],"used_manufacturer":false,"Images":[{"listing_image_id":727043981,"hex_code":"665E57","red":102,"green":94,"blue":87,"hue":28,"saturation":14,"brightness":40,"is_black_and_white":false,"creation_tsz":1423831585,"listing_id":222487646,"rank":1,"url_75x75":"https://img1.etsystatic.com/051/0/10683212/il_75x75.727043981_327q.jpg","url_170x135":"https://img1.etsystatic.com/051/0/10683212/il_170x135.727043981_327q.jpg","url_570xN":"https://img1.etsystatic.com/051/0/10683212/il_570xN.727043981_327q.jpg","url_fullxfull":"https://img1.etsystatic.com/051/0/10683212/il_fullxfull.727043981_327q.jpg","full_height":399,"full_width":600}],"Shop":{"shop_id":10683212,"shop_name":"KandKSales","user_id":61503621,"creation_tsz":1423507869,"title":"Personalized barrel sign, lazy susan, serving tray more","announcement":"We offer a variety of personalized signs, lazy susans, serving trays and more.  ALL WITH FREE SHIPPING WITHIN THE US.   Any of our items make a great gift with that personalized touch.\n\nALL OF OUR ITEMS SHIP FOR FREE WITHIN THE UNITED STATES.  IF YOU NEED YOUR ITEM SHIPPED OUTSIDE THE US OR TO CANADA PLEASE SEND ME A MESSAGE AND WE WILL WORK OUT A SHIPPING CHARGE FOR YOU.","currency_code":"USD","is_vacation":false,"vacation_message":null,"sale_message":null,"digital_sale_message":null,"last_updated_tsz":1460659226,"listing_active_count":243,"digital_listing_count":0,"login_name":"kimberly5518","accepts_custom_requests":false,"policy_welcome":null,"policy_payment":null,"policy_shipping":null,"policy_refunds":null,"policy_additional":null,"policy_seller_info":null,"policy_updated_tsz":0,"policy_has_private_receipt_info":false,"vacation_autoreply":null,"url":"https://www.etsy.com/shop/KandKSales?utm_source=theironyardteaching&utm_medium=api&utm_campaign=api","image_url_760x100":"https://img1.etsystatic.com/048/0/10683212/iusb_760x100.15017095_fwxy.jpg","num_favorers":49,"languages":["en-US"],"upcoming_local_event_id":null,"icon_url_fullxfull":null,"is_using_structured_policies":false,"has_onboarded_structured_policies":false,"has_unstructured_policies":false}}],"params":{"limit":25,"offset":0,"page":null,"keywords":"whiskey","sort_on":"created","sort_order":"down","min_price":null,"max_price":null,"color":null,"color_accuracy":0,"tags":null,"category":null,"location":null,"lat":null,"lon":null,"region":null,"geo_level":"city","accepts_gift_cards":"false","translate_keywords":"false"},"type":"Listing","pagination":{"effective_limit":25,"effective_offset":0,"next_offset":25,"effective_page":1,"next_page":2}};exports["default"] = etsydata;module.exports = exports["default"];

},{}],3:[function(require,module,exports){
// importing jquery to my project
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

// importing etsydata from .js doc in js/folder

var _etsydata = require('./etsydata');

var _etsydata2 = _interopRequireDefault(_etsydata);

// let products equal etsy results array
var products = _etsydata2['default'].results;

// logs products array to the screen
console.log(products);

products.forEach(function (product) {
  // creating variables for each piece of data we are pulling from api
  // image variable imgsrc
  var imgsrc = product.Images[0].url_570xN;
  console.log(imgsrc);
  // product name variables
  var product_name = product.title.substring(0, 25);
  console.log(product_name);
  // product seller name
  var product_seller = product.Shop.shop_name;
  console.log(product_seller);
  // product price
  var product_price = console.log(product_price);

  var card = '\n  <div class="card">\n    <div class="product_image" style="background-image: url(\'' + imgsrc + '\'); background-size: auto 100%; background-position: center; background-repeat: no-repeat;">\n    <button class="ad_button">Ad</button>\n    </div>\n    <div class="product_text_area">\n      <span class="product_title">' + product_name + '...</span>\n      <br>\n      <span class="product_seller">Slangin Bags</span>\n      <span class="product_price">$200</span>\n    </div>\n  </div>\n  ';

  (0, _jquery2['default'])('.product_column').append(card);
});

// productListings.length

// <img src="${imgsrc}" alt="" class="product_image"/>

},{"./etsydata":2,"jquery":1}]},{},[3])


//# sourceMappingURL=bundle.js.map
