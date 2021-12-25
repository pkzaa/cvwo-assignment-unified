// Miscellaneous helper functions

export function fallback(value, fallbackValue) {
  return value !== undefined ? value : fallbackValue
}

// This *really* should be specified by ECMA...
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
