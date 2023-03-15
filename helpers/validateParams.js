const moment = require("moment");

// Validation for strings
function validateString(
  param,
  required = true,
  minLength = null,
  maxLength = null
) {
  if (typeof param !== "string") return false;
  if (!param) return !required;

  const isTooShort = minLength && param.length < minLength;
  const isTooLong = maxLength && param.length > maxLength;
  if (isTooShort || isTooLong) return false;
  return true;
}

// Validation for numbers
function validateNumber(
  param,
  required = true,
  minValue = null,
  maxValue = null
) {
  if (typeof param !== "number") return false;
  if (!param) return !required;

  const isTooSmall = minValue && param < minValue;
  const isTooBig = maxValue && param > maxValue;
  if (isTooSmall || isTooBig) return false;

  return true;
}

// Validation for time
function validateTime(
  param,
  required = true,
  minValue = "00:00",
  maxValue = "6000:00"
) {
  if (typeof param !== "string") return false;
  if (!param) return !required;

  const getTotalSeconds = (value) => {
    const split = value.split("");
    return parseInt(split[0]) * 60 + parseInt(split[1]);
  };

  const totalSeconds = getTotalSeconds(param);
  const minSeconds = getTotalSeconds(minValue);
  const maxSeconds = getTotalSeconds(maxValue);
  return totalSeconds > minSeconds && totalSeconds < maxSeconds;
}

module.exports = {
  validateString,
  validateNumber,
  validateTime,
};
