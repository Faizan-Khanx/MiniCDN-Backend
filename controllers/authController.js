import { RegisterService } from "../services/authService.js";

const RegisterController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const Register = await RegisterService(email, password);
    return res
      .status(201)
      .json({ success: "true", message: "User Registration Sucessfull" });
  } catch (err) {
    console.log(`Error in Register Controller: ${err.message}`);
    next(err);
  }
};

const LoginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const Login = await LoginService(email, password);
    return res.status(200).json({ message: "Login Succesfull", token: Login });
  } catch (err) {
    console.log(`Error In Login Controller: ${err.message}`);
    next(err);
  }
};

export { RegisterController, LoginController };
