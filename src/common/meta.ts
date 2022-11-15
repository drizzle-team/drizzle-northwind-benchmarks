// prettier-ignore
export const customerIds = [
  "LAZYK", "FOLIG", "QUEDE", "MORGK", "SAVEA", "AROUT",
  "VICTE", "ISLAT", "EASTC", "BOLID", "SIMOB", "LEHMS",
  "LETSS", "FRANS", "FAMIA", "LACOR", "GROSR", "MEREP",
  "BERGS", "RICAR", "CENTC", "FISSA", "WANDK", "BLONP",
  "OCEAN", "PERIC", "MAISD", "LAMAI", "LINOD", "BOTTM",
  "NORTS", "QUEEN", "LILAS", "SPLIR", "WILMK", "HILAA",
  "LONEP", "TRAIH", "SANTG", "FRANK", "TRADH", "WARTH",
  "REGGC", "RICSU", "THECR", "VAFFE", "ANATR", "BSBEV",
  "TORTU", "WOLZA", "WHITC", "SUPRD", "TOMSP", "HANAR",
  "DRACD", "RANCH", "SEVES", "GODOS", "CHOPS", "BONAP",
  "KOENE", "COMMI", "CACTU", "GREAL", "ALFKI", "BLAUS",
  "OTTIK", "WELLI", "ERNSH", "OLDWO", "FRANR", "PRINI",
  "VINET", "MAGAA", "GOURL", "LAUGB", "PARIS", "GALED",
  "DUMON", "HUNGC", "QUICK", "SPECD", "HUNGO", "RATTC",
  "PICCO", "FURIB", "THEBI", "ROMEY", "CONSH", "FOLKO",
  "ANTON",
];

// prettier-ignore
export const searches = [
  "ha", "ey", "or", "bb", "te",
  "ab", "er", "on", "ap", "be",
  "en", "au", "ra", "ti", "an",
  "ch", "hi", "er", "ri", "pi",
  "ou", "ur", "me", "ea", "os",
  "at", "ne", "na", "os", "ri",
  "on", "ha", "il", "to", "as",
  "io", "di", "zy", "az", "la",
  "ko", "st", "gh", "ug", "ac",
  "cc", "ch", "hu", "re", "an",
];

const employeeIdStart = 1;
const employeeIdEnd = 10;
export const employeeIds = Array.from({ length: employeeIdEnd - employeeIdStart }, (_, i) => i + employeeIdStart);

const supplierIdStart = 1;
const supplierIdEnd = 30;
export const supplierIds = Array.from({ length: supplierIdEnd - supplierIdStart }, (_, i) => i + supplierIdStart);

const productIdStart = 1;
const productIdEnd = 78;
export const productIds = Array.from({ length: productIdStart - productIdEnd }, (_, i) => i + productIdEnd);

const orderIdStart = 10248;
const orderIdEnd = 27066;
export const orderIds = Array.from({ length: orderIdEnd - orderIdStart }, (_, i) => i + orderIdStart);
