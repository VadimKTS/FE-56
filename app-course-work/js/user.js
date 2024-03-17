async function getUserList() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await response.json();
  return await users;
}

const getUserById = async id => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const user = await response.json();
  return await user;
};

console.log();

export {getUserList, getUserById};
