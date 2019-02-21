const expect = require('expect');
const {Users} = require('./users');
var injectionData=[{
  name:'Sachin',
 id:'saumatech_001',
 room:'Android Dev'
},
{
 name:'Vishesh',
id:'google_vishesh_005',
room:'Software Engineer'
}];

describe('Test User Class',()=>{
 var users;

     beforeEach(()=>{
      users=new Users();
      users.addUser(injectionData[0].id,injectionData[0].name,injectionData[0].room);
      users.addUser(injectionData[1].id,injectionData[1].name,injectionData[1].room);
     });
   it('should add remove user',()=>{
     var user={
       name:'Ravi',
      id:'null',
      room:'null dev'
    };
      users.addUser(user.id,user.name,user.room);
      expect(users.users).toInclude(user);
   });

   it('should remove user',()=>{
     var data=injectionData[0];
     var removed=users.removeUser(data.id);
     expect(data).toEqual(removed);
     expect(users.users).toExclude(data);
   });

   it('should return data list',()=>{
      var gotusers=users.getUserList('Software Engineer');
      var value=['Vishesh'];
      expect(gotusers).toEqual(value);
   });


});
