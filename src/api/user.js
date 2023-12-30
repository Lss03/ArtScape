let usersData = [
    // 示例用户
    { id: 1, 
      username: '神秘人',
      password: '12345', 
      nickname: '',
      avatar: '',
      fans: 10,
      likes: 0,
      works: 0,
      email: '' }
  ];
  
  export default {
      getUserInfo(callback) {
          setTimeout(() => callback(usersData), 100);
      },
      updateUserInfo(newUser, callback) {
          setTimeout(() => {
              usersData.push(newUser);
              callback(newUser);
          }, 100);
      },
      // 其他方法...
  };
