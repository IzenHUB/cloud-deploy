const utils = require('./Utils').utils;

const unit_test = async () => {

  //Unit test case 1:
  if (utils.add(2, 2) === 4) {
    console.log("Test case 1 passed");
  } else {
    console.error("Test case 1 failed: if(utils.add(2, 2) === 4)");
    process.exit(1);
  }

  //unit test case 2:
  if (utils.add(3, 3) === 6) {
    console.log("Test case 2 passed");
  } else {
    console.error("Test case 2 failed: if(utils.add(3, 3) === 6)");
    process.exit(1);
  }

}

unit_test();