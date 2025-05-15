export const login = async (req, res) => {
    const { username, password } = req.body;

  // Just a placeholder response
  res.send(`Username: ${username}, Password: ${password}`);
};
