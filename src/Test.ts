import { Utils } from "./Utils";

let failures = 0;

function check(name: string, actual: boolean, expected: boolean): void {
  if (actual !== expected) {
    console.log(`FAIL: ${name} (expected ${expected}, got ${actual})`);
    failures++;
    return;
  }

  console.log(`PASS: ${name}`);
}

// Email checks
check("accepts a normal email", Utils.isValidEmail("alex@example.com"), true);
check("accepts a plus-address email", Utils.isValidEmail("alex+test@example.co.th"), true);
check("rejects an email without @", Utils.isValidEmail("alex.example.com"), false);
check("rejects an email without a domain", Utils.isValidEmail("alex@"), false);
check("rejects spaces in an email", Utils.isValidEmail("alex smith@example.com"), false);
check("rejects an empty email", Utils.isValidEmail(""), false);

// Age checks
check("accepts an adult age", Utils.isValidAge(28), true);
check("accepts the minimum age", Utils.isValidAge(1), true);
check("accepts the maximum age", Utils.isValidAge(120), true);
check("rejects age zero", Utils.isValidAge(0), false);
check("rejects an age above 120", Utils.isValidAge(121), false);
check("rejects a decimal age", Utils.isValidAge(18.5), false);

if (failures > 0) {
  console.log(`\n${failures} check(s) failed.`);
  process.exitCode = 1;
} else {
  console.log("\nAll checks passed.");
}
