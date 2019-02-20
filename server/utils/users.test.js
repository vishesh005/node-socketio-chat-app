const expect = require('expect');
const {Users} = require('./users');

describe('Test User Class',()=>{
   it('should add and remove user',()=>{
     var user={
       name:'Vishesh',
      id:'Google_Vishesh',
      room:'Google_Devs'
    };
      var users=new Users();
      users.addUser(user.id,user.name,user.room,users.room);
      expect(users.users).toEqual([user]);
   });

});
