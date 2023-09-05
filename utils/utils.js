export function checkForYams(rollResults) {
    // Check if all elements in the rollResults array are equal
    return rollResults.every((result) => result === rollResults[0]);
}

export function checkForCarre(rollResults) {
    // Sort the rollResults array in ascending order
    rollResults.sort();
  
    // Loop through the sorted array and check if there are four identical numbers
    for (let i = 0; i < rollResults.length - 3; i++) {
      if (
        rollResults[i] === rollResults[i + 1] &&
        rollResults[i] === rollResults[i + 2] &&
        rollResults[i] === rollResults[i + 3]
      ) {
        return true; // Carré found
      }
    }
    return false; // No Carré found
}


export function checkForDouble(rollResults) {
    // Sort the rollResults array in ascending order
    rollResults.sort();
  
    let pairCount = 0; // Counter to keep track of pairs found
  
    // Loop through the sorted array and check for pairs
    for (let i = 0; i < rollResults.length - 1; i++) {
      if (rollResults[i] === rollResults[i + 1]) {
        pairCount++;
  
        // Skip the second number in the pair
        i++;
      }
    }
  
    // Check if we found two pairs (double)
    if (pairCount === 2) {
      return true; // Double found
    }
  
    return false; // No Double found
}
  
