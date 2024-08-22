function mod(a, b) {
    return a % b + ((a * b < 0) ? b : 0);
}

// -----------------------------------------------------
// return: [mapXDisplacement, mapYDisplacement]
// -----------------------------------------------------
function getDisplacementByDir(direction) {
    switch (direction) {
        case 0:  return [0, -1];
        case 1:  return [1, 0];
        case 2:  return [0, 1];
        case 3:  return [-1, 0];
        default: return [0, 0];
    }
}