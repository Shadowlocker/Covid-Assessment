var assert = require('assert');
var moment = require("moment");
var expect = require('expect');

const tomorrow = () => {
  const now = moment();
  return now.add(1, 'days');
};

const validateDate = ({ date, today = new Date() }) => {
      return moment(date, "DD-MM-YYYY").isSameOrAfter(
        moment(today, "DD-MM-YYYY", "days")
      );
    };

    it("is same or after today", () => {
      expect(validateDate({ date: "16-05-2019" })).toBeFalsy();
    });

describe('tomorrow', () => {
  it('should return the next day in a specific format', () => {
    const date = tomorrow().format('YYYY-MM-DD');
    expect(date).toEqual('2021-12-06');
  });
});

describe('tomorrow', () => {
  it('should return the next day in a specific format', () => {
    const date = tomorrow().format('DD-MM-YYYY');
    expect(date).toEqual('06-12-2021');
  });
});

describe('tomorrow', () => {
  it('should return the next day in a specific format', () => {
    const date = tomorrow().format('YYYY-MM-DD');
    expect(date).toEqual('2021-12-06');
  });
});


describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3, 4].indexOf(4), 3);
    });
  });
});


//
// describe("Simple Calculations", () => {
//   before(() => {
//     console.log( "This part executes once before all tests" );
//   });
//
//   after(() => {
//     console.log( "This part executes once after all tests" );
//   });
//
//   // We can add nested blocks for different tests
//   describe( "Test1", () => {
//     beforeEach(() => {
//       console.log( "executes before every test" );
//     });
//
//     it("Is returning 5 when adding 2 + 3", () => {
//       assert.equal(2 + 3, 5);
//     });
//
//     it("Is returning 6 when multiplying 2 * 3", () => {
//       assert.equal(2*3, 6);
//     });
//   });
//
//   describe("Test2", () => {
//     beforeEach(() => {
//       console.log( "executes before every test" );
//     });
//
//     it("Is returning 4 when adding 2 + 3", () => {
//       assert.equal(2 + 3, 5);
//     });
//
//     it("Is returning 8 when multiplying 2 * 4", () => {
//       assert.equal(2*4, 8);
//     });
//   });
// });
