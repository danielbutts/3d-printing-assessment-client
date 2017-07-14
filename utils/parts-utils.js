function validatePart(part) {
  let isValid = true;
  if (part.width === null) { isValid = false; }
  if (part.height === null) { isValid = false; }
  if (part.depth === null) { isValid = false; }
  if (part.volume === null) { isValid = false; }
  if (part.weight === null) { isValid = false; }
  if (part.price === null) { isValid = false; }
  return isValid;
}

module.exports = { validatePart };
