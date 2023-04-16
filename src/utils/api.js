import users from "../data/users.json";

const validateUser = async (username, password) => {
  const matchingUser = users.users.find(
    (user) => user.username === username && user.password === password
  );
  return Boolean(matchingUser);
};

export default { validateUser };
