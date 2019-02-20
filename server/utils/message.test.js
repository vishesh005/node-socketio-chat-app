const expect = require('expect');
var {generateMessage,generateLocationMessage}=require('./message');

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

describe('generate Location',()=>{
  it('should generate correct location',()=>{
          var latitude=110.12;
          var longitude=23.001;
          var from='Vishesh';
          var url=`https://www.google.com/maps?q=${latitude},${longitude}`;
          var obj=generateLocationMessage(from,latitude,longitude);
          expect(obj.from).toBe(from);
          expect(obj.url).toBe(url);

  });
});
