function dtoUsers(users) { 
    const allUsers = users.map( user => {
    return Object.assign(
      {},
      {
        user_id: user.user_id,
        username: user.username,
        image: user.image,
        isAdmin : user.isAdmin,
      }
    )
    }
    
  )
  return allUsers;
  };

  module.exports = dtoUsers;
