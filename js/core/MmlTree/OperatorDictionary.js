import { TEXCLASS } from './MmlNode.js';
export function OPDEF(lspace, rspace, texClass, properties) {
    if (texClass === void 0) { texClass = TEXCLASS.BIN; }
    if (properties === void 0) { properties = null; }
    return [lspace, rspace, texClass, properties];
}
export var MO = {
    ORD: OPDEF(0, 0, TEXCLASS.ORD),
    ORD11: OPDEF(1, 1, TEXCLASS.ORD),
    ORD21: OPDEF(2, 1, TEXCLASS.ORD),
    ORD02: OPDEF(0, 2, TEXCLASS.ORD),
    ORD55: OPDEF(5, 5, TEXCLASS.ORD),
    OP: OPDEF(1, 2, TEXCLASS.OP, { largeop: true, movablelimits: true, symmetric: true }),
    OPFIXED: OPDEF(1, 2, TEXCLASS.OP, { largeop: true, movablelimits: true }),
    INTEGRAL: OPDEF(0, 1, TEXCLASS.OP, { largeop: true, symmetric: true }),
    INTEGRAL2: OPDEF(1, 2, TEXCLASS.OP, { largeop: true, symmetric: true }),
    BIN3: OPDEF(3, 3, TEXCLASS.BIN),
    BIN4: OPDEF(4, 4, TEXCLASS.BIN),
    BIN01: OPDEF(0, 1, TEXCLASS.BIN),
    BIN5: OPDEF(5, 5, TEXCLASS.BIN),
    TALLBIN: OPDEF(4, 4, TEXCLASS.BIN, { stretchy: true }),
    BINOP: OPDEF(4, 4, TEXCLASS.BIN, { largeop: true, movablelimits: true }),
    REL: OPDEF(5, 5, TEXCLASS.REL),
    REL1: OPDEF(1, 1, TEXCLASS.REL, { stretchy: true }),
    REL4: OPDEF(4, 4, TEXCLASS.REL),
    RELSTRETCH: OPDEF(5, 5, TEXCLASS.REL, { stretchy: true }),
    RELACCENT: OPDEF(5, 5, TEXCLASS.REL, { accent: true }),
    WIDEREL: OPDEF(5, 5, TEXCLASS.REL, { accent: true, stretchy: true }),
    OPEN: OPDEF(0, 0, TEXCLASS.OPEN, { fence: true, stretchy: true, symmetric: true }),
    CLOSE: OPDEF(0, 0, TEXCLASS.CLOSE, { fence: true, stretchy: true, symmetric: true }),
    INNER: OPDEF(0, 0, TEXCLASS.INNER),
    PUNCT: OPDEF(0, 3, TEXCLASS.PUNCT),
    ACCENT: OPDEF(0, 0, TEXCLASS.ORD, { accent: true }),
    WIDEACCENT: OPDEF(0, 0, TEXCLASS.ORD, { accent: true, stretchy: true })
};
export var RANGES = [
    [0x20, 0x7F, TEXCLASS.REL, 'BasicLatin'],
    [0xA0, 0xFF, TEXCLASS.ORD, 'Latin1Supplement'],
    [0x100, 0x17F, TEXCLASS.ORD, 'LatinExtendedA'],
    [0x180, 0x24F, TEXCLASS.ORD, 'LatinExtendedB'],
    [0x2B0, 0x2FF, TEXCLASS.ORD, 'SpacingModLetters'],
    [0x300, 0x36F, TEXCLASS.ORD, 'CombDiacritMarks'],
    [0x370, 0x3FF, TEXCLASS.ORD, 'GreekAndCoptic'],
    [0x1E00, 0x1EFF, TEXCLASS.ORD, 'LatinExtendedAdditional'],
    [0x2000, 0x206F, TEXCLASS.PUNCT, 'GeneralPunctuation'],
    [0x2070, 0x209F, TEXCLASS.ORD, 'SuperAndSubscripts'],
    [0x20A0, 0x20CF, TEXCLASS.ORD, 'Currency'],
    [0x20D0, 0x20FF, TEXCLASS.ORD, 'CombDiactForSymbols'],
    [0x2100, 0x214F, TEXCLASS.ORD, 'LetterlikeSymbols'],
    [0x2150, 0x218F, TEXCLASS.ORD, 'NumberForms'],
    [0x2190, 0x21FF, TEXCLASS.REL, 'Arrows'],
    [0x2200, 0x22FF, TEXCLASS.BIN, 'MathOperators'],
    [0x2300, 0x23FF, TEXCLASS.ORD, 'MiscTechnical'],
    [0x2460, 0x24FF, TEXCLASS.ORD, 'EnclosedAlphaNums'],
    [0x2500, 0x259F, TEXCLASS.ORD, 'BoxDrawing'],
    [0x25A0, 0x25FF, TEXCLASS.ORD, 'GeometricShapes'],
    [0x2700, 0x27BF, TEXCLASS.ORD, 'Dingbats'],
    [0x27C0, 0x27EF, TEXCLASS.ORD, 'MiscMathSymbolsA'],
    [0x27F0, 0x27FF, TEXCLASS.REL, 'SupplementalArrowsA'],
    [0x2900, 0x297F, TEXCLASS.REL, 'SupplementalArrowsB'],
    [0x2980, 0x29FF, TEXCLASS.ORD, 'MiscMathSymbolsB'],
    [0x2A00, 0x2AFF, TEXCLASS.BIN, 'SuppMathOperators'],
    [0x2B00, 0x2BFF, TEXCLASS.ORD, 'MiscSymbolsAndArrows'],
    [0x1D400, 0x1D7FF, TEXCLASS.ORD, 'MathAlphabets']
];
export var MMLSPACING = [
    [0, 0],
    [1, 2],
    [3, 3],
    [4, 4],
    [0, 0],
    [0, 0],
    [0, 3]
];
export var OPTABLE = {
    prefix: {
        '(': MO.OPEN,
        '+': MO.BIN01,
        '-': MO.BIN01,
        '[': MO.OPEN,
        '{': MO.OPEN,
        '|': MO.OPEN,
        '||': [0, 0, TEXCLASS.BIN, { fence: true, stretchy: true, symmetric: true }],
        '|||': [0, 0, TEXCLASS.ORD, { fence: true, stretchy: true, symmetric: true }],
        '\u00AC': MO.ORD21,
        '\u00B1': MO.BIN01,
        '\u2016': [0, 0, TEXCLASS.ORD, { fence: true, stretchy: true }],
        '\u2018': [0, 0, TEXCLASS.OPEN, { fence: true }],
        '\u201C': [0, 0, TEXCLASS.OPEN, { fence: true }],
        '\u2145': MO.ORD21,
        '\u2146': OPDEF(2, 0, TEXCLASS.ORD),
        '\u2200': MO.ORD21,
        '\u2202': MO.ORD21,
        '\u2203': MO.ORD21,
        '\u2204': MO.ORD21,
        '\u2207': MO.ORD21,
        '\u220F': MO.OP,
        '\u2210': MO.OP,
        '\u2211': MO.OP,
        '\u2212': MO.BIN01,
        '\u2213': MO.BIN01,
        '\u221A': [1, 1, TEXCLASS.ORD, { stretchy: true }],
        '\u221B': MO.ORD11,
        '\u221C': MO.ORD11,
        '\u2220': MO.ORD,
        '\u2221': MO.ORD,
        '\u2222': MO.ORD,
        '\u222B': MO.INTEGRAL,
        '\u222C': MO.INTEGRAL,
        '\u222D': MO.INTEGRAL,
        '\u222E': MO.INTEGRAL,
        '\u222F': MO.INTEGRAL,
        '\u2230': MO.INTEGRAL,
        '\u2231': MO.INTEGRAL,
        '\u2232': MO.INTEGRAL,
        '\u2233': MO.INTEGRAL,
        '\u22C0': MO.OP,
        '\u22C1': MO.OP,
        '\u22C2': MO.OP,
        '\u22C3': MO.OP,
        '\u2308': MO.OPEN,
        '\u230A': MO.OPEN,
        '\u2772': MO.OPEN,
        '\u27E6': MO.OPEN,
        '\u27E8': MO.OPEN,
        '\u27EA': MO.OPEN,
        '\u27EC': MO.OPEN,
        '\u27EE': MO.OPEN,
        '\u2980': [0, 0, TEXCLASS.ORD, { fence: true, stretchy: true }],
        '\u2983': MO.OPEN,
        '\u2985': MO.OPEN,
        '\u2987': MO.OPEN,
        '\u2989': MO.OPEN,
        '\u298B': MO.OPEN,
        '\u298D': MO.OPEN,
        '\u298F': MO.OPEN,
        '\u2991': MO.OPEN,
        '\u2993': MO.OPEN,
        '\u2995': MO.OPEN,
        '\u2997': MO.OPEN,
        '\u29FC': MO.OPEN,
        '\u2A00': MO.OP,
        '\u2A01': MO.OP,
        '\u2A02': MO.OP,
        '\u2A03': MO.OP,
        '\u2A04': MO.OP,
        '\u2A05': MO.OP,
        '\u2A06': MO.OP,
        '\u2A07': MO.OP,
        '\u2A08': MO.OP,
        '\u2A09': MO.OP,
        '\u2A0A': MO.OP,
        '\u2A0B': MO.INTEGRAL2,
        '\u2A0C': MO.INTEGRAL,
        '\u2A0D': MO.INTEGRAL2,
        '\u2A0E': MO.INTEGRAL2,
        '\u2A0F': MO.INTEGRAL2,
        '\u2A10': MO.OP,
        '\u2A11': MO.OP,
        '\u2A12': MO.OP,
        '\u2A13': MO.OP,
        '\u2A14': MO.OP,
        '\u2A15': MO.INTEGRAL2,
        '\u2A16': MO.INTEGRAL2,
        '\u2A17': MO.INTEGRAL2,
        '\u2A18': MO.INTEGRAL2,
        '\u2A19': MO.INTEGRAL2,
        '\u2A1A': MO.INTEGRAL2,
        '\u2A1B': MO.INTEGRAL2,
        '\u2A1C': MO.INTEGRAL2,
        '\u2AFC': MO.OP,
        '\u2AFF': MO.OP,
    },
    postfix: {
        '!!': OPDEF(1, 0),
        '!': [1, 0, TEXCLASS.CLOSE, null],
        '&': MO.ORD,
        ')': MO.CLOSE,
        '++': OPDEF(0, 0),
        '--': OPDEF(0, 0),
        '..': OPDEF(0, 0),
        '...': MO.ORD,
        '\'': MO.ACCENT,
        ']': MO.CLOSE,
        '^': MO.WIDEACCENT,
        '_': MO.WIDEACCENT,
        '`': MO.ACCENT,
        '|': MO.CLOSE,
        '}': MO.CLOSE,
        '~': MO.WIDEACCENT,
        '||': [0, 0, TEXCLASS.BIN, { fence: true, stretchy: true, symmetric: true }],
        '|||': [0, 0, TEXCLASS.ORD, { fence: true, stretchy: true, symmetric: true }],
        '\u00A8': MO.ACCENT,
        '\u00AF': MO.WIDEACCENT,
        '\u00B0': MO.ORD,
        '\u00B4': MO.ACCENT,
        '\u00B8': MO.ACCENT,
        '\u02C6': MO.WIDEACCENT,
        '\u02C7': MO.WIDEACCENT,
        '\u02C9': MO.WIDEACCENT,
        '\u02CA': MO.ACCENT,
        '\u02CB': MO.ACCENT,
        '\u02CD': MO.WIDEACCENT,
        '\u02D8': MO.ACCENT,
        '\u02D9': MO.ACCENT,
        '\u02DA': MO.ACCENT,
        '\u02DC': MO.WIDEACCENT,
        '\u02DD': MO.ACCENT,
        '\u02F7': MO.WIDEACCENT,
        '\u0302': MO.WIDEACCENT,
        '\u0311': MO.ACCENT,
        '\u03F6': MO.REL,
        '\u2016': [0, 0, TEXCLASS.ORD, { fence: true, stretchy: true }],
        '\u2019': [0, 0, TEXCLASS.CLOSE, { fence: true }],
        '\u201D': [0, 0, TEXCLASS.CLOSE, { fence: true }],
        '\u2032': MO.ORD02,
        '\u203E': MO.WIDEACCENT,
        '\u20DB': MO.ACCENT,
        '\u20DC': MO.ACCENT,
        '\u2309': MO.CLOSE,
        '\u230B': MO.CLOSE,
        '\u23B4': MO.WIDEACCENT,
        '\u23B5': MO.WIDEACCENT,
        '\u23DC': MO.WIDEACCENT,
        '\u23DD': MO.WIDEACCENT,
        '\u23DE': MO.WIDEACCENT,
        '\u23DF': MO.WIDEACCENT,
        '\u23E0': MO.WIDEACCENT,
        '\u23E1': MO.WIDEACCENT,
        '\u25A0': MO.BIN3,
        '\u25A1': MO.BIN3,
        '\u25AA': MO.BIN3,
        '\u25AB': MO.BIN3,
        '\u25AD': MO.BIN3,
        '\u25AE': MO.BIN3,
        '\u25AF': MO.BIN3,
        '\u25B0': MO.BIN3,
        '\u25B1': MO.BIN3,
        '\u25B2': MO.BIN4,
        '\u25B4': MO.BIN4,
        '\u25B6': MO.BIN4,
        '\u25B7': MO.BIN4,
        '\u25B8': MO.BIN4,
        '\u25BC': MO.BIN4,
        '\u25BE': MO.BIN4,
        '\u25C0': MO.BIN4,
        '\u25C1': MO.BIN4,
        '\u25C2': MO.BIN4,
        '\u25C4': MO.BIN4,
        '\u25C5': MO.BIN4,
        '\u25C6': MO.BIN4,
        '\u25C7': MO.BIN4,
        '\u25C8': MO.BIN4,
        '\u25C9': MO.BIN4,
        '\u25CC': MO.BIN4,
        '\u25CD': MO.BIN4,
        '\u25CE': MO.BIN4,
        '\u25CF': MO.BIN4,
        '\u25D6': MO.BIN4,
        '\u25D7': MO.BIN4,
        '\u25E6': MO.BIN4,
        '\u266D': MO.ORD02,
        '\u266E': MO.ORD02,
        '\u266F': MO.ORD02,
        '\u2773': MO.CLOSE,
        '\u27E7': MO.CLOSE,
        '\u27E9': MO.CLOSE,
        '\u27EB': MO.CLOSE,
        '\u27ED': MO.CLOSE,
        '\u27EF': MO.CLOSE,
        '\u2980': [0, 0, TEXCLASS.ORD, { fence: true, stretchy: true }],
        '\u2984': MO.CLOSE,
        '\u2986': MO.CLOSE,
        '\u2988': MO.CLOSE,
        '\u298A': MO.CLOSE,
        '\u298C': MO.CLOSE,
        '\u298E': MO.CLOSE,
        '\u2990': MO.CLOSE,
        '\u2992': MO.CLOSE,
        '\u2994': MO.CLOSE,
        '\u2996': MO.CLOSE,
        '\u2998': MO.CLOSE,
        '\u29FD': MO.CLOSE,
    },
    infix: {
        '!=': MO.BIN4,
        '#': MO.ORD,
        '$': MO.ORD,
        '%': [3, 3, TEXCLASS.ORD, null],
        '&&': MO.BIN4,
        '': MO.ORD,
        '*': MO.BIN3,
        '**': OPDEF(1, 1),
        '*=': MO.BIN4,
        '+': MO.BIN4,
        '+=': MO.BIN4,
        ',': [0, 3, TEXCLASS.PUNCT, { linebreakstyle: 'after', separator: true }],
        '-': MO.BIN4,
        '-=': MO.BIN4,
        '->': MO.BIN5,
        '.': [0, 3, TEXCLASS.PUNCT, { separator: true }],
        '/': MO.ORD11,
        '//': OPDEF(1, 1),
        '/=': MO.BIN4,
        ':': [1, 2, TEXCLASS.REL, null],
        ':=': MO.BIN4,
        ';': [0, 3, TEXCLASS.PUNCT, { linebreakstyle: 'after', separator: true }],
        '<': MO.REL,
        '<=': MO.BIN5,
        '<>': OPDEF(1, 1),
        '=': MO.REL,
        '==': MO.BIN4,
        '>': MO.REL,
        '>=': MO.BIN5,
        '?': [1, 1, TEXCLASS.CLOSE, null],
        '@': MO.ORD11,
        '\\': MO.ORD,
        '^': MO.ORD11,
        '_': MO.ORD11,
        '|': [2, 2, TEXCLASS.ORD, { fence: true, stretchy: true, symmetric: true }],
        '||': [2, 2, TEXCLASS.BIN, { fence: true, stretchy: true, symmetric: true }],
        '|||': [2, 2, TEXCLASS.ORD, { fence: true, stretchy: true, symmetric: true }],
        '\u00B1': MO.BIN4,
        '\u00B7': MO.BIN4,
        '\u00D7': MO.BIN4,
        '\u00F7': MO.BIN4,
        '\u02B9': MO.ORD,
        '\u0300': MO.ACCENT,
        '\u0301': MO.ACCENT,
        '\u0303': MO.WIDEACCENT,
        '\u0304': MO.ACCENT,
        '\u0306': MO.ACCENT,
        '\u0307': MO.ACCENT,
        '\u0308': MO.ACCENT,
        '\u030C': MO.ACCENT,
        '\u0332': MO.WIDEACCENT,
        '\u0338': MO.REL4,
        '\u2015': [0, 0, TEXCLASS.ORD, { stretchy: true }],
        '\u2017': [0, 0, TEXCLASS.ORD, { stretchy: true }],
        '\u2020': MO.BIN3,
        '\u2021': MO.BIN3,
        '\u2022': MO.BIN4,
        '\u2026': MO.INNER,
        '\u2044': MO.TALLBIN,
        '\u2061': MO.ORD,
        '\u2062': MO.ORD,
        '\u2063': [0, 0, TEXCLASS.ORD, { linebreakstyle: 'after', separator: true }],
        '\u2064': MO.ORD,
        '\u20D7': MO.ACCENT,
        '\u2111': MO.ORD,
        '\u2113': MO.ORD,
        '\u2118': MO.ORD,
        '\u211C': MO.ORD,
        '\u2190': MO.WIDEREL,
        '\u2191': MO.RELSTRETCH,
        '\u2192': MO.WIDEREL,
        '\u2193': MO.RELSTRETCH,
        '\u2194': MO.WIDEREL,
        '\u2195': MO.RELSTRETCH,
        '\u2196': MO.RELSTRETCH,
        '\u2197': MO.RELSTRETCH,
        '\u2198': MO.RELSTRETCH,
        '\u2199': MO.RELSTRETCH,
        '\u219A': MO.RELACCENT,
        '\u219B': MO.RELACCENT,
        '\u219C': MO.WIDEREL,
        '\u219D': MO.WIDEREL,
        '\u219E': MO.WIDEREL,
        '\u219F': MO.WIDEREL,
        '\u21A0': MO.WIDEREL,
        '\u21A1': MO.RELSTRETCH,
        '\u21A2': MO.WIDEREL,
        '\u21A3': MO.WIDEREL,
        '\u21A4': MO.WIDEREL,
        '\u21A5': MO.RELSTRETCH,
        '\u21A6': MO.WIDEREL,
        '\u21A7': MO.RELSTRETCH,
        '\u21A8': MO.RELSTRETCH,
        '\u21A9': MO.WIDEREL,
        '\u21AA': MO.WIDEREL,
        '\u21AB': MO.WIDEREL,
        '\u21AC': MO.WIDEREL,
        '\u21AD': MO.WIDEREL,
        '\u21AE': MO.RELACCENT,
        '\u21AF': MO.RELSTRETCH,
        '\u21B0': MO.RELSTRETCH,
        '\u21B1': MO.RELSTRETCH,
        '\u21B2': MO.RELSTRETCH,
        '\u21B3': MO.RELSTRETCH,
        '\u21B4': MO.RELSTRETCH,
        '\u21B5': MO.RELSTRETCH,
        '\u21B6': MO.RELACCENT,
        '\u21B7': MO.RELACCENT,
        '\u21B8': MO.REL,
        '\u21B9': MO.WIDEREL,
        '\u21BA': MO.REL,
        '\u21BB': MO.REL,
        '\u21BC': MO.WIDEREL,
        '\u21BD': MO.WIDEREL,
        '\u21BE': MO.RELSTRETCH,
        '\u21BF': MO.RELSTRETCH,
        '\u21C0': MO.WIDEREL,
        '\u21C1': MO.WIDEREL,
        '\u21C2': MO.RELSTRETCH,
        '\u21C3': MO.RELSTRETCH,
        '\u21C4': MO.WIDEREL,
        '\u21C5': MO.RELSTRETCH,
        '\u21C6': MO.WIDEREL,
        '\u21C7': MO.WIDEREL,
        '\u21C8': MO.RELSTRETCH,
        '\u21C9': MO.WIDEREL,
        '\u21CA': MO.RELSTRETCH,
        '\u21CB': MO.WIDEREL,
        '\u21CC': MO.WIDEREL,
        '\u21CD': MO.RELACCENT,
        '\u21CE': MO.RELACCENT,
        '\u21CF': MO.RELACCENT,
        '\u21D0': MO.WIDEREL,
        '\u21D1': MO.RELSTRETCH,
        '\u21D2': MO.WIDEREL,
        '\u21D3': MO.RELSTRETCH,
        '\u21D4': MO.WIDEREL,
        '\u21D5': MO.RELSTRETCH,
        '\u21D6': MO.RELSTRETCH,
        '\u21D7': MO.RELSTRETCH,
        '\u21D8': MO.RELSTRETCH,
        '\u21D9': MO.RELSTRETCH,
        '\u21DA': MO.WIDEREL,
        '\u21DB': MO.WIDEREL,
        '\u21DC': MO.WIDEREL,
        '\u21DD': MO.WIDEREL,
        '\u21DE': MO.REL,
        '\u21DF': MO.REL,
        '\u21E0': MO.WIDEREL,
        '\u21E1': MO.RELSTRETCH,
        '\u21E2': MO.WIDEREL,
        '\u21E3': MO.RELSTRETCH,
        '\u21E4': MO.WIDEREL,
        '\u21E5': MO.WIDEREL,
        '\u21E6': MO.WIDEREL,
        '\u21E7': MO.RELSTRETCH,
        '\u21E8': MO.WIDEREL,
        '\u21E9': MO.RELSTRETCH,
        '\u21EA': MO.RELSTRETCH,
        '\u21EB': MO.RELSTRETCH,
        '\u21EC': MO.RELSTRETCH,
        '\u21ED': MO.RELSTRETCH,
        '\u21EE': MO.RELSTRETCH,
        '\u21EF': MO.RELSTRETCH,
        '\u21F0': MO.WIDEREL,
        '\u21F1': MO.REL,
        '\u21F2': MO.REL,
        '\u21F3': MO.RELSTRETCH,
        '\u21F4': MO.RELACCENT,
        '\u21F5': MO.RELSTRETCH,
        '\u21F6': MO.WIDEREL,
        '\u21F7': MO.RELACCENT,
        '\u21F8': MO.RELACCENT,
        '\u21F9': MO.RELACCENT,
        '\u21FA': MO.RELACCENT,
        '\u21FB': MO.RELACCENT,
        '\u21FC': MO.RELACCENT,
        '\u21FD': MO.WIDEREL,
        '\u21FE': MO.WIDEREL,
        '\u21FF': MO.WIDEREL,
        '\u2201': OPDEF(1, 2, TEXCLASS.ORD),
        '\u2205': MO.ORD,
        '\u2206': MO.BIN3,
        '\u2208': MO.REL,
        '\u2209': MO.REL,
        '\u220A': MO.REL,
        '\u220B': MO.REL,
        '\u220C': MO.REL,
        '\u220D': MO.REL,
        '\u220E': MO.BIN3,
        '\u2212': MO.BIN4,
        '\u2213': MO.BIN4,
        '\u2214': MO.BIN4,
        '\u2215': MO.TALLBIN,
        '\u2216': MO.BIN4,
        '\u2217': MO.BIN4,
        '\u2218': MO.BIN4,
        '\u2219': MO.BIN4,
        '\u221D': MO.REL,
        '\u221E': MO.ORD,
        '\u221F': MO.REL,
        '\u2223': MO.REL,
        '\u2224': MO.REL,
        '\u2225': MO.REL,
        '\u2226': MO.REL,
        '\u2227': MO.BIN4,
        '\u2228': MO.BIN4,
        '\u2229': MO.BIN4,
        '\u222A': MO.BIN4,
        '\u2234': MO.REL,
        '\u2235': MO.REL,
        '\u2236': MO.REL,
        '\u2237': MO.REL,
        '\u2238': MO.BIN4,
        '\u2239': MO.REL,
        '\u223A': MO.BIN4,
        '\u223B': MO.REL,
        '\u223C': MO.REL,
        '\u223D': MO.REL,
        '\u223D\u0331': MO.BIN3,
        '\u223E': MO.REL,
        '\u223F': MO.BIN3,
        '\u2240': MO.BIN4,
        '\u2241': MO.REL,
        '\u2242': MO.REL,
        '\u2242\u0338': MO.REL,
        '\u2243': MO.REL,
        '\u2244': MO.REL,
        '\u2245': MO.REL,
        '\u2246': MO.REL,
        '\u2247': MO.REL,
        '\u2248': MO.REL,
        '\u2249': MO.REL,
        '\u224A': MO.REL,
        '\u224B': MO.REL,
        '\u224C': MO.REL,
        '\u224D': MO.REL,
        '\u224E': MO.REL,
        '\u224E\u0338': MO.REL,
        '\u224F': MO.REL,
        '\u224F\u0338': MO.REL,
        '\u2250': MO.REL,
        '\u2251': MO.REL,
        '\u2252': MO.REL,
        '\u2253': MO.REL,
        '\u2254': MO.REL,
        '\u2255': MO.REL,
        '\u2256': MO.REL,
        '\u2257': MO.REL,
        '\u2258': MO.REL,
        '\u2259': MO.REL,
        '\u225A': MO.REL,
        '\u225C': MO.REL,
        '\u225D': MO.REL,
        '\u225E': MO.REL,
        '\u225F': MO.REL,
        '\u2260': MO.REL,
        '\u2261': MO.REL,
        '\u2262': MO.REL,
        '\u2263': MO.REL,
        '\u2264': MO.REL,
        '\u2265': MO.REL,
        '\u2266': MO.REL,
        '\u2266\u0338': MO.REL,
        '\u2267': MO.REL,
        '\u2268': MO.REL,
        '\u2269': MO.REL,
        '\u226A': MO.REL,
        '\u226A\u0338': MO.REL,
        '\u226B': MO.REL,
        '\u226B\u0338': MO.REL,
        '\u226C': MO.REL,
        '\u226D': MO.REL,
        '\u226E': MO.REL,
        '\u226F': MO.REL,
        '\u2270': MO.REL,
        '\u2271': MO.REL,
        '\u2272': MO.REL,
        '\u2273': MO.REL,
        '\u2274': MO.REL,
        '\u2275': MO.REL,
        '\u2276': MO.REL,
        '\u2277': MO.REL,
        '\u2278': MO.REL,
        '\u2279': MO.REL,
        '\u227A': MO.REL,
        '\u227B': MO.REL,
        '\u227C': MO.REL,
        '\u227D': MO.REL,
        '\u227E': MO.REL,
        '\u227F': MO.REL,
        '\u227F\u0338': MO.REL,
        '\u2280': MO.REL,
        '\u2281': MO.REL,
        '\u2282': MO.REL,
        '\u2282\u20D2': MO.REL,
        '\u2283': MO.REL,
        '\u2283\u20D2': MO.REL,
        '\u2284': MO.REL,
        '\u2285': MO.REL,
        '\u2286': MO.REL,
        '\u2287': MO.REL,
        '\u2288': MO.REL,
        '\u2289': MO.REL,
        '\u228A': MO.REL,
        '\u228B': MO.REL,
        '\u228C': MO.BIN4,
        '\u228D': MO.BIN4,
        '\u228E': MO.BIN4,
        '\u228F': MO.REL,
        '\u228F\u0338': MO.REL,
        '\u2290': MO.REL,
        '\u2290\u0338': MO.REL,
        '\u2291': MO.REL,
        '\u2292': MO.REL,
        '\u2293': MO.BIN4,
        '\u2294': MO.BIN4,
        '\u2295': MO.BIN4,
        '\u2296': MO.BIN4,
        '\u2297': MO.BIN4,
        '\u2298': MO.BIN4,
        '\u2299': MO.BIN4,
        '\u229A': MO.BIN4,
        '\u229B': MO.BIN4,
        '\u229C': MO.BIN4,
        '\u229D': MO.BIN4,
        '\u229E': MO.BIN4,
        '\u229F': MO.BIN4,
        '\u22A0': MO.BIN4,
        '\u22A1': MO.BIN4,
        '\u22A2': MO.REL,
        '\u22A3': MO.REL,
        '\u22A4': MO.ORD55,
        '\u22A5': MO.REL,
        '\u22A6': MO.REL,
        '\u22A7': MO.REL,
        '\u22A8': MO.REL,
        '\u22A9': MO.REL,
        '\u22AA': MO.REL,
        '\u22AB': MO.REL,
        '\u22AC': MO.REL,
        '\u22AD': MO.REL,
        '\u22AE': MO.REL,
        '\u22AF': MO.REL,
        '\u22B0': MO.REL,
        '\u22B1': MO.REL,
        '\u22B2': MO.REL,
        '\u22B3': MO.REL,
        '\u22B4': MO.REL,
        '\u22B5': MO.REL,
        '\u22B6': MO.REL,
        '\u22B7': MO.REL,
        '\u22B8': MO.REL,
        '\u22B9': MO.REL,
        '\u22BA': MO.BIN4,
        '\u22BB': MO.BIN4,
        '\u22BC': MO.BIN4,
        '\u22BD': MO.BIN4,
        '\u22BE': MO.BIN3,
        '\u22BF': MO.BIN3,
        '\u22C4': MO.BIN4,
        '\u22C5': MO.BIN4,
        '\u22C6': MO.BIN4,
        '\u22C7': MO.BIN4,
        '\u22C8': MO.REL,
        '\u22C9': MO.BIN4,
        '\u22CA': MO.BIN4,
        '\u22CB': MO.BIN4,
        '\u22CC': MO.BIN4,
        '\u22CD': MO.REL,
        '\u22CE': MO.BIN4,
        '\u22CF': MO.BIN4,
        '\u22D0': MO.REL,
        '\u22D1': MO.REL,
        '\u22D2': MO.BIN4,
        '\u22D3': MO.BIN4,
        '\u22D4': MO.REL,
        '\u22D5': MO.REL,
        '\u22D6': MO.REL,
        '\u22D7': MO.REL,
        '\u22D8': MO.REL,
        '\u22D9': MO.REL,
        '\u22DA': MO.REL,
        '\u22DB': MO.REL,
        '\u22DC': MO.REL,
        '\u22DD': MO.REL,
        '\u22DE': MO.REL,
        '\u22DF': MO.REL,
        '\u22E0': MO.REL,
        '\u22E1': MO.REL,
        '\u22E2': MO.REL,
        '\u22E3': MO.REL,
        '\u22E4': MO.REL,
        '\u22E5': MO.REL,
        '\u22E6': MO.REL,
        '\u22E7': MO.REL,
        '\u22E8': MO.REL,
        '\u22E9': MO.REL,
        '\u22EA': MO.REL,
        '\u22EB': MO.REL,
        '\u22EC': MO.REL,
        '\u22ED': MO.REL,
        '\u22EE': MO.ORD55,
        '\u22EF': MO.INNER,
        '\u22F0': MO.REL,
        '\u22F1': [5, 5, TEXCLASS.INNER, null],
        '\u22F2': MO.REL,
        '\u22F3': MO.REL,
        '\u22F4': MO.REL,
        '\u22F5': MO.REL,
        '\u22F6': MO.REL,
        '\u22F7': MO.REL,
        '\u22F8': MO.REL,
        '\u22F9': MO.REL,
        '\u22FA': MO.REL,
        '\u22FB': MO.REL,
        '\u22FC': MO.REL,
        '\u22FD': MO.REL,
        '\u22FE': MO.REL,
        '\u22FF': MO.REL,
        '\u2305': MO.BIN3,
        '\u2306': MO.BIN3,
        '\u2322': MO.REL4,
        '\u2323': MO.REL4,
        '\u2329': MO.OPEN,
        '\u232A': MO.CLOSE,
        '\u23AA': MO.ORD,
        '\u23AF': [0, 0, TEXCLASS.ORD, { stretchy: true }],
        '\u23B0': MO.OPEN,
        '\u23B1': MO.CLOSE,
        '\u2500': MO.ORD,
        '\u25B3': MO.BIN4,
        '\u25B5': MO.BIN4,
        '\u25B9': MO.BIN4,
        '\u25BD': MO.BIN4,
        '\u25BF': MO.BIN4,
        '\u25C3': MO.BIN4,
        '\u25EF': MO.BIN3,
        '\u2660': MO.ORD,
        '\u2661': MO.ORD,
        '\u2662': MO.ORD,
        '\u2663': MO.ORD,
        '\u2758': MO.REL,
        '\u27F0': MO.RELSTRETCH,
        '\u27F1': MO.RELSTRETCH,
        '\u27F5': MO.WIDEREL,
        '\u27F6': MO.WIDEREL,
        '\u27F7': MO.WIDEREL,
        '\u27F8': MO.WIDEREL,
        '\u27F9': MO.WIDEREL,
        '\u27FA': MO.WIDEREL,
        '\u27FB': MO.WIDEREL,
        '\u27FC': MO.WIDEREL,
        '\u27FD': MO.WIDEREL,
        '\u27FE': MO.WIDEREL,
        '\u27FF': MO.WIDEREL,
        '\u2900': MO.RELACCENT,
        '\u2901': MO.RELACCENT,
        '\u2902': MO.RELACCENT,
        '\u2903': MO.RELACCENT,
        '\u2904': MO.RELACCENT,
        '\u2905': MO.RELACCENT,
        '\u2906': MO.RELACCENT,
        '\u2907': MO.RELACCENT,
        '\u2908': MO.REL,
        '\u2909': MO.REL,
        '\u290A': MO.RELSTRETCH,
        '\u290B': MO.RELSTRETCH,
        '\u290C': MO.WIDEREL,
        '\u290D': MO.WIDEREL,
        '\u290E': MO.WIDEREL,
        '\u290F': MO.WIDEREL,
        '\u2910': MO.WIDEREL,
        '\u2911': MO.RELACCENT,
        '\u2912': MO.RELSTRETCH,
        '\u2913': MO.RELSTRETCH,
        '\u2914': MO.RELACCENT,
        '\u2915': MO.RELACCENT,
        '\u2916': MO.RELACCENT,
        '\u2917': MO.RELACCENT,
        '\u2918': MO.RELACCENT,
        '\u2919': MO.RELACCENT,
        '\u291A': MO.RELACCENT,
        '\u291B': MO.RELACCENT,
        '\u291C': MO.RELACCENT,
        '\u291D': MO.RELACCENT,
        '\u291E': MO.RELACCENT,
        '\u291F': MO.RELACCENT,
        '\u2920': MO.RELACCENT,
        '\u2921': MO.RELSTRETCH,
        '\u2922': MO.RELSTRETCH,
        '\u2923': MO.REL,
        '\u2924': MO.REL,
        '\u2925': MO.REL,
        '\u2926': MO.REL,
        '\u2927': MO.REL,
        '\u2928': MO.REL,
        '\u2929': MO.REL,
        '\u292A': MO.REL,
        '\u292B': MO.REL,
        '\u292C': MO.REL,
        '\u292D': MO.REL,
        '\u292E': MO.REL,
        '\u292F': MO.REL,
        '\u2930': MO.REL,
        '\u2931': MO.REL,
        '\u2932': MO.REL,
        '\u2933': MO.RELACCENT,
        '\u2934': MO.REL,
        '\u2935': MO.REL,
        '\u2936': MO.REL,
        '\u2937': MO.REL,
        '\u2938': MO.REL,
        '\u2939': MO.REL,
        '\u293A': MO.RELACCENT,
        '\u293B': MO.RELACCENT,
        '\u293C': MO.RELACCENT,
        '\u293D': MO.RELACCENT,
        '\u293E': MO.REL,
        '\u293F': MO.REL,
        '\u2940': MO.REL,
        '\u2941': MO.REL,
        '\u2942': MO.RELACCENT,
        '\u2943': MO.RELACCENT,
        '\u2944': MO.RELACCENT,
        '\u2945': MO.RELACCENT,
        '\u2946': MO.RELACCENT,
        '\u2947': MO.RELACCENT,
        '\u2948': MO.RELACCENT,
        '\u2949': MO.REL,
        '\u294A': MO.RELACCENT,
        '\u294B': MO.RELACCENT,
        '\u294C': MO.REL,
        '\u294D': MO.REL,
        '\u294E': MO.WIDEREL,
        '\u294F': MO.RELSTRETCH,
        '\u2950': MO.WIDEREL,
        '\u2951': MO.RELSTRETCH,
        '\u2952': MO.WIDEREL,
        '\u2953': MO.WIDEREL,
        '\u2954': MO.RELSTRETCH,
        '\u2955': MO.RELSTRETCH,
        '\u2956': MO.RELSTRETCH,
        '\u2957': MO.RELSTRETCH,
        '\u2958': MO.RELSTRETCH,
        '\u2959': MO.RELSTRETCH,
        '\u295A': MO.WIDEREL,
        '\u295B': MO.WIDEREL,
        '\u295C': MO.RELSTRETCH,
        '\u295D': MO.RELSTRETCH,
        '\u295E': MO.WIDEREL,
        '\u295F': MO.WIDEREL,
        '\u2960': MO.RELSTRETCH,
        '\u2961': MO.RELSTRETCH,
        '\u2962': MO.RELACCENT,
        '\u2963': MO.REL,
        '\u2964': MO.RELACCENT,
        '\u2965': MO.REL,
        '\u2966': MO.RELACCENT,
        '\u2967': MO.RELACCENT,
        '\u2968': MO.RELACCENT,
        '\u2969': MO.RELACCENT,
        '\u296A': MO.RELACCENT,
        '\u296B': MO.RELACCENT,
        '\u296C': MO.RELACCENT,
        '\u296D': MO.RELACCENT,
        '\u296E': MO.RELSTRETCH,
        '\u296F': MO.RELSTRETCH,
        '\u2970': MO.RELACCENT,
        '\u2971': MO.RELACCENT,
        '\u2972': MO.RELACCENT,
        '\u2973': MO.RELACCENT,
        '\u2974': MO.RELACCENT,
        '\u2975': MO.RELACCENT,
        '\u2976': MO.RELACCENT,
        '\u2977': MO.RELACCENT,
        '\u2978': MO.RELACCENT,
        '\u2979': MO.RELACCENT,
        '\u297A': MO.RELACCENT,
        '\u297B': MO.RELACCENT,
        '\u297C': MO.RELACCENT,
        '\u297D': MO.RELACCENT,
        '\u297E': MO.REL,
        '\u297F': MO.REL,
        '\u2981': MO.BIN3,
        '\u2982': MO.BIN3,
        '\u2999': MO.BIN3,
        '\u299A': MO.BIN3,
        '\u299B': MO.BIN3,
        '\u299C': MO.BIN3,
        '\u299D': MO.BIN3,
        '\u299E': MO.BIN3,
        '\u299F': MO.BIN3,
        '\u29A0': MO.BIN3,
        '\u29A1': MO.BIN3,
        '\u29A2': MO.BIN3,
        '\u29A3': MO.BIN3,
        '\u29A4': MO.BIN3,
        '\u29A5': MO.BIN3,
        '\u29A6': MO.BIN3,
        '\u29A7': MO.BIN3,
        '\u29A8': MO.BIN3,
        '\u29A9': MO.BIN3,
        '\u29AA': MO.BIN3,
        '\u29AB': MO.BIN3,
        '\u29AC': MO.BIN3,
        '\u29AD': MO.BIN3,
        '\u29AE': MO.BIN3,
        '\u29AF': MO.BIN3,
        '\u29B0': MO.BIN3,
        '\u29B1': MO.BIN3,
        '\u29B2': MO.BIN3,
        '\u29B3': MO.BIN3,
        '\u29B4': MO.BIN3,
        '\u29B5': MO.BIN3,
        '\u29B6': MO.BIN4,
        '\u29B7': MO.BIN4,
        '\u29B8': MO.BIN4,
        '\u29B9': MO.BIN4,
        '\u29BA': MO.BIN4,
        '\u29BB': MO.BIN4,
        '\u29BC': MO.BIN4,
        '\u29BD': MO.BIN4,
        '\u29BE': MO.BIN4,
        '\u29BF': MO.BIN4,
        '\u29C0': MO.REL,
        '\u29C1': MO.REL,
        '\u29C2': MO.BIN3,
        '\u29C3': MO.BIN3,
        '\u29C4': MO.BIN4,
        '\u29C5': MO.BIN4,
        '\u29C6': MO.BIN4,
        '\u29C7': MO.BIN4,
        '\u29C8': MO.BIN4,
        '\u29C9': MO.BIN3,
        '\u29CA': MO.BIN3,
        '\u29CB': MO.BIN3,
        '\u29CC': MO.BIN3,
        '\u29CD': MO.BIN3,
        '\u29CE': MO.REL,
        '\u29CF': MO.REL,
        '\u29CF\u0338': MO.REL,
        '\u29D0': MO.REL,
        '\u29D0\u0338': MO.REL,
        '\u29D1': MO.REL,
        '\u29D2': MO.REL,
        '\u29D3': MO.REL,
        '\u29D4': MO.REL,
        '\u29D5': MO.REL,
        '\u29D6': MO.BIN4,
        '\u29D7': MO.BIN4,
        '\u29D8': MO.BIN3,
        '\u29D9': MO.BIN3,
        '\u29DB': MO.BIN3,
        '\u29DC': MO.BIN3,
        '\u29DD': MO.BIN3,
        '\u29DE': MO.REL,
        '\u29DF': MO.BIN3,
        '\u29E0': MO.BIN3,
        '\u29E1': MO.REL,
        '\u29E2': MO.BIN4,
        '\u29E3': MO.REL,
        '\u29E4': MO.REL,
        '\u29E5': MO.REL,
        '\u29E6': MO.REL,
        '\u29E7': MO.BIN3,
        '\u29E8': MO.BIN3,
        '\u29E9': MO.BIN3,
        '\u29EA': MO.BIN3,
        '\u29EB': MO.BIN3,
        '\u29EC': MO.BIN3,
        '\u29ED': MO.BIN3,
        '\u29EE': MO.BIN3,
        '\u29EF': MO.BIN3,
        '\u29F0': MO.BIN3,
        '\u29F1': MO.BIN3,
        '\u29F2': MO.BIN3,
        '\u29F3': MO.BIN3,
        '\u29F4': MO.REL,
        '\u29F5': MO.BIN4,
        '\u29F6': MO.BIN4,
        '\u29F7': MO.BIN4,
        '\u29F8': MO.BIN3,
        '\u29F9': MO.BIN3,
        '\u29FA': MO.BIN3,
        '\u29FB': MO.BIN3,
        '\u29FE': MO.BIN4,
        '\u29FF': MO.BIN4,
        '\u2A1D': MO.BIN3,
        '\u2A1E': MO.BIN3,
        '\u2A1F': MO.BIN3,
        '\u2A20': MO.BIN3,
        '\u2A21': MO.BIN3,
        '\u2A22': MO.BIN4,
        '\u2A23': MO.BIN4,
        '\u2A24': MO.BIN4,
        '\u2A25': MO.BIN4,
        '\u2A26': MO.BIN4,
        '\u2A27': MO.BIN4,
        '\u2A28': MO.BIN4,
        '\u2A29': MO.BIN4,
        '\u2A2A': MO.BIN4,
        '\u2A2B': MO.BIN4,
        '\u2A2C': MO.BIN4,
        '\u2A2D': MO.BIN4,
        '\u2A2E': MO.BIN4,
        '\u2A2F': MO.BIN4,
        '\u2A30': MO.BIN4,
        '\u2A31': MO.BIN4,
        '\u2A32': MO.BIN4,
        '\u2A33': MO.BIN4,
        '\u2A34': MO.BIN4,
        '\u2A35': MO.BIN4,
        '\u2A36': MO.BIN4,
        '\u2A37': MO.BIN4,
        '\u2A38': MO.BIN4,
        '\u2A39': MO.BIN4,
        '\u2A3A': MO.BIN4,
        '\u2A3B': MO.BIN4,
        '\u2A3C': MO.BIN4,
        '\u2A3D': MO.BIN4,
        '\u2A3E': MO.BIN4,
        '\u2A3F': MO.BIN4,
        '\u2A40': MO.BIN4,
        '\u2A41': MO.BIN4,
        '\u2A42': MO.BIN4,
        '\u2A43': MO.BIN4,
        '\u2A44': MO.BIN4,
        '\u2A45': MO.BIN4,
        '\u2A46': MO.BIN4,
        '\u2A47': MO.BIN4,
        '\u2A48': MO.BIN4,
        '\u2A49': MO.BIN4,
        '\u2A4A': MO.BIN4,
        '\u2A4B': MO.BIN4,
        '\u2A4C': MO.BIN4,
        '\u2A4D': MO.BIN4,
        '\u2A4E': MO.BIN4,
        '\u2A4F': MO.BIN4,
        '\u2A50': MO.BIN4,
        '\u2A51': MO.BIN4,
        '\u2A52': MO.BIN4,
        '\u2A53': MO.BIN4,
        '\u2A54': MO.BIN4,
        '\u2A55': MO.BIN4,
        '\u2A56': MO.BIN4,
        '\u2A57': MO.BIN4,
        '\u2A58': MO.BIN4,
        '\u2A59': MO.REL,
        '\u2A5A': MO.BIN4,
        '\u2A5B': MO.BIN4,
        '\u2A5C': MO.BIN4,
        '\u2A5D': MO.BIN4,
        '\u2A5E': MO.BIN4,
        '\u2A5F': MO.BIN4,
        '\u2A60': MO.BIN4,
        '\u2A61': MO.BIN4,
        '\u2A62': MO.BIN4,
        '\u2A63': MO.BIN4,
        '\u2A64': MO.BIN4,
        '\u2A65': MO.BIN4,
        '\u2A66': MO.REL,
        '\u2A67': MO.REL,
        '\u2A68': MO.REL,
        '\u2A69': MO.REL,
        '\u2A6A': MO.REL,
        '\u2A6B': MO.REL,
        '\u2A6C': MO.REL,
        '\u2A6D': MO.REL,
        '\u2A6E': MO.REL,
        '\u2A6F': MO.REL,
        '\u2A70': MO.REL,
        '\u2A71': MO.BIN4,
        '\u2A72': MO.BIN4,
        '\u2A73': MO.REL,
        '\u2A74': MO.REL,
        '\u2A75': MO.REL,
        '\u2A76': MO.REL,
        '\u2A77': MO.REL,
        '\u2A78': MO.REL,
        '\u2A79': MO.REL,
        '\u2A7A': MO.REL,
        '\u2A7B': MO.REL,
        '\u2A7C': MO.REL,
        '\u2A7D': MO.REL,
        '\u2A7D\u0338': MO.REL,
        '\u2A7E': MO.REL,
        '\u2A7E\u0338': MO.REL,
        '\u2A7F': MO.REL,
        '\u2A80': MO.REL,
        '\u2A81': MO.REL,
        '\u2A82': MO.REL,
        '\u2A83': MO.REL,
        '\u2A84': MO.REL,
        '\u2A85': MO.REL,
        '\u2A86': MO.REL,
        '\u2A87': MO.REL,
        '\u2A88': MO.REL,
        '\u2A89': MO.REL,
        '\u2A8A': MO.REL,
        '\u2A8B': MO.REL,
        '\u2A8C': MO.REL,
        '\u2A8D': MO.REL,
        '\u2A8E': MO.REL,
        '\u2A8F': MO.REL,
        '\u2A90': MO.REL,
        '\u2A91': MO.REL,
        '\u2A92': MO.REL,
        '\u2A93': MO.REL,
        '\u2A94': MO.REL,
        '\u2A95': MO.REL,
        '\u2A96': MO.REL,
        '\u2A97': MO.REL,
        '\u2A98': MO.REL,
        '\u2A99': MO.REL,
        '\u2A9A': MO.REL,
        '\u2A9B': MO.REL,
        '\u2A9C': MO.REL,
        '\u2A9D': MO.REL,
        '\u2A9E': MO.REL,
        '\u2A9F': MO.REL,
        '\u2AA0': MO.REL,
        '\u2AA1': MO.REL,
        '\u2AA1\u0338': MO.REL,
        '\u2AA2': MO.REL,
        '\u2AA2\u0338': MO.REL,
        '\u2AA3': MO.REL,
        '\u2AA4': MO.REL,
        '\u2AA5': MO.REL,
        '\u2AA6': MO.REL,
        '\u2AA7': MO.REL,
        '\u2AA8': MO.REL,
        '\u2AA9': MO.REL,
        '\u2AAA': MO.REL,
        '\u2AAB': MO.REL,
        '\u2AAC': MO.REL,
        '\u2AAD': MO.REL,
        '\u2AAE': MO.REL,
        '\u2AAF': MO.REL,
        '\u2AAF\u0338': MO.REL,
        '\u2AB0': MO.REL,
        '\u2AB0\u0338': MO.REL,
        '\u2AB1': MO.REL,
        '\u2AB2': MO.REL,
        '\u2AB3': MO.REL,
        '\u2AB4': MO.REL,
        '\u2AB5': MO.REL,
        '\u2AB6': MO.REL,
        '\u2AB7': MO.REL,
        '\u2AB8': MO.REL,
        '\u2AB9': MO.REL,
        '\u2ABA': MO.REL,
        '\u2ABB': MO.REL,
        '\u2ABC': MO.REL,
        '\u2ABD': MO.REL,
        '\u2ABE': MO.REL,
        '\u2ABF': MO.REL,
        '\u2AC0': MO.REL,
        '\u2AC1': MO.REL,
        '\u2AC2': MO.REL,
        '\u2AC3': MO.REL,
        '\u2AC4': MO.REL,
        '\u2AC5': MO.REL,
        '\u2AC6': MO.REL,
        '\u2AC7': MO.REL,
        '\u2AC8': MO.REL,
        '\u2AC9': MO.REL,
        '\u2ACA': MO.REL,
        '\u2ACB': MO.REL,
        '\u2ACC': MO.REL,
        '\u2ACD': MO.REL,
        '\u2ACE': MO.REL,
        '\u2ACF': MO.REL,
        '\u2AD0': MO.REL,
        '\u2AD1': MO.REL,
        '\u2AD2': MO.REL,
        '\u2AD3': MO.REL,
        '\u2AD4': MO.REL,
        '\u2AD5': MO.REL,
        '\u2AD6': MO.REL,
        '\u2AD7': MO.REL,
        '\u2AD8': MO.REL,
        '\u2AD9': MO.REL,
        '\u2ADA': MO.REL,
        '\u2ADB': MO.REL,
        '\u2ADC': MO.REL,
        '\u2ADD': MO.REL,
        '\u2ADE': MO.REL,
        '\u2ADF': MO.REL,
        '\u2AE0': MO.REL,
        '\u2AE1': MO.REL,
        '\u2AE2': MO.REL,
        '\u2AE3': MO.REL,
        '\u2AE4': MO.REL,
        '\u2AE5': MO.REL,
        '\u2AE6': MO.REL,
        '\u2AE7': MO.REL,
        '\u2AE8': MO.REL,
        '\u2AE9': MO.REL,
        '\u2AEA': MO.REL,
        '\u2AEB': MO.REL,
        '\u2AEC': MO.REL,
        '\u2AED': MO.REL,
        '\u2AEE': MO.REL,
        '\u2AEF': MO.REL,
        '\u2AF0': MO.REL,
        '\u2AF1': MO.REL,
        '\u2AF2': MO.REL,
        '\u2AF3': MO.REL,
        '\u2AF4': MO.BIN4,
        '\u2AF5': MO.BIN4,
        '\u2AF6': MO.BIN4,
        '\u2AF7': MO.REL,
        '\u2AF8': MO.REL,
        '\u2AF9': MO.REL,
        '\u2AFA': MO.REL,
        '\u2AFB': MO.BIN4,
        '\u2AFD': MO.BIN4,
        '\u2AFE': MO.BIN3,
        '\u2B45': MO.RELSTRETCH,
        '\u2B46': MO.RELSTRETCH,
        '\u3008': MO.OPEN,
        '\u3009': MO.CLOSE,
        '\uFE37': MO.WIDEACCENT,
        '\uFE38': MO.WIDEACCENT,
    }
};
OPTABLE['infix']['^'] = MO.WIDEREL;
OPTABLE['infix']['_'] = MO.WIDEREL;
OPTABLE['prefix']['\u2223'] = MO.OPEN;
OPTABLE['prefix']['\u2225'] = MO.OPEN;
OPTABLE['postfix']['\u2223'] = MO.CLOSE;
OPTABLE['postfix']['\u2225'] = MO.CLOSE;
//# sourceMappingURL=OperatorDictionary.js.map