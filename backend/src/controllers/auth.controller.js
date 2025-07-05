const authController = {
  signup: (req, res) => {
    res.send("signup route");
  },
  login: (req, res) => {
    res.send("login route");
  },
  logout: (req, res) => {
    res.send("logout route");
  },
};

export default authController;
