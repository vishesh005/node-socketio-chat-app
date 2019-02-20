class Users{
  constructor(){
    this.users=[];
  }
   addUser(id,name,room) {
      var user={id,name,room};
      this.users.push(user);
      return user;
  }

  removeUser(id){
    var user= getUser(id);
    if(user){
    this.users=this.users.filter((user)=> user.id !== id )[0];
    }
  return user;
  }

  getUser(id){
    return this.users.filter((user)=> user.id === id)[0];
  }

  getUserList(room){
    var users= this.users.filter((user) => user.room === room);
    return names=users.map((user)=> user.name);
   }
}
module.exports = {Users};
