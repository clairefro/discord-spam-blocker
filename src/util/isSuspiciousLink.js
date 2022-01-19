const { distance } = require("fastest-levenshtein");

/** Most spam links try to typosquat 'discord' to trick users into thinking the link is safe (ex: "discorde")*/
const TYPOSQUAT_TARGET = "discord";

/** Checks whether a passed link string is suspscious based on the base domain's Levenshtein distance to TYPOSQUAT_TARGET */
function isSuspiciousLink(link, threshold = 4) {
  // get base domain
  const matches = link.match(/^https?:\/\/(www\.)?(\S+?)\./);
  if (!matches) return false;
  const base = matches[2];
  const d = distance(TYPOSQUAT_TARGET, base);
  // if distance is > 0 and < threshold, base is typosquating. Call foul
  if (d > 0 && d <= threshold) {
    return true;
  }
  return false;
}

module.exports = { isSuspiciousLink };
