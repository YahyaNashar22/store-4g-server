import jwt from "jsonwebtoken";

export const createToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name:user.name,
      role: user.role,
      email:user.email
    },
    process.env.TOKEN
  );
};
export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.TOKEN);

    return { success: true, data: decoded };
  } catch (error) {
    return { success: false, error: error.message };
  }
};