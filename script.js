// User Story 1: Function declaration named sanitizeLog
function sanitizeLog(entry, disallowedCharacters) {
  let sanitizedEntry = entry;
  
  // User Story 2: Replace disallowed characters with #, case-sensitive
  for (let i = 0; i < disallowedCharacters.length; i++) {
    const char = disallowedCharacters[i];
    // Using split and join to replace all occurrences without regex issues
    // (case-sensitive by default)
    sanitizedEntry = sanitizedEntry.split(char).join("#");
  }
  
  return sanitizedEntry;
}

// User Story 3: Function declaration named cleanLogs
function cleanLogs(logs, disallowedCharacters) {
  let totalCount = 0;
  let sanitizedCount = 0;
  let informationalCount = 0;

  // User Story 4: Iterate over the array in order
  for (let i = 0; i < logs.length; i++) {
    const entry = logs[i];
    
    // User Story 5: Check for fatal marker
    if (entry.includes("$")) {
      return "Sanitizing stopped. Failure Reason: Fatal character occurred.";
    }

    totalCount++;

    // User Story 6: Informational entry check
    if (entry.startsWith("/")) {
      informationalCount++;
    } else {
      // User Story 7: Sanitize other entries
      // (Note: The output string isn't printed, but the function is called
      // to fulfill the requirement of sanitizing. We could store these if needed.)
      sanitizeLog(entry, disallowedCharacters);
      sanitizedCount++;
    }
  }

  // User Story 8: Return final count summary
  return `Total Entry Count: ${totalCount}. Sanitized Entry Count: ${sanitizedCount}. Informational Entry Count: ${informationalCount}. Finished sanitizing logs.`;
}

// --- Testing with the provided arrays ---

let logs_1 = [
  "INFO: Server started on port 3000",
  "DEBUG: user=admin token=abc123 connected",
  "WARN: High memory usage detected at 87%"
];

let logs_2 = [
  "FATAL: System overload detected, shutting down",
  "DEBUG: token=def456$ refreshed for session",
  "ERROR: Null pointer exception in module auth"
];

let logs_3 = [
  "ERROR: Failed to connect to db, retry=3",
  "DEBUG: api_key=XYZ789 used in request",
  "/INFO: Cache cleared successfully",
  "WARN: Disk usage at 92%, threshold=90%",
  "/INFO: Disk usage stabilized"
];

const charsToRemove = ["e", "E", "o", "r"];

// Test 1
console.log(cleanLogs(logs_1, charsToRemove)); 
// Expected: Total Entry Count: 3. Sanitized Entry Count: 3. Informational Entry Count: 0. Finished sanitizing logs.

// Test 2
console.log(cleanLogs(logs_2, charsToRemove));
// Expected: Sanitizing stopped. Failure Reason: Fatal character occurred.

// Test 3
console.log(cleanLogs(logs_3, charsToRemove));
// Expected: Total Entry Count: 5. Sanitized Entry Count: 3. Informational Entry Count: 2. Finished sanitizing logs.