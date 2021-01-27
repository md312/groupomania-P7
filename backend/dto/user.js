function dtoUser(user){
return Object.assign (
    {},
    {
        user_id: user.user_id,
        username: user.username,
        image: user.image,
        admin : user.admin,
        messages: user.messages,
        messagesMedia : user.messageMedia,
      
    }
)
}

module.exports = dtoUser;
