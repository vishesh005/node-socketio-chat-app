const expect = require('expect');
const {isRealString} = require('./validation.js');

  describe('Test of isRealString method',()=>{

    it('should validate real string',()=>{
       var object={};
       var spaceString='         ';
       var realString='iamgodofintelligence';
        expect(isRealString(object)).toBe(false);
        expect(isRealString(spaceString)).toBe(false);
        expect(isRealString(realString)).toBe(true);
    });


  });
