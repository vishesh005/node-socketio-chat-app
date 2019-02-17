const expect = require('expect');
var {generateMessage}=require('./message');

describe('generateMessage',()=>{
   it('should generate message object',()=>{
     var from='Vishesh';
     var text='Hey there';
      var obj=generateMessage(from,text);
      expect(obj).toInclude({from,
        text});
        expect(obj.createdAt).toBeA('number');

   });
});
