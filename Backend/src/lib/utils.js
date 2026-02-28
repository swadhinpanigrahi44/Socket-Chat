import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const { JWT_SECRET } = process.env;
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("token", token, {
    httpOnly: true, // This flag ensures that the cookie cannot be accessed via client-side JavaScript, enhancing security against cross-site scripting (XSS) attacks.
    secure: process.env.NODE_ENV === "production" ? false : true, // This flag ensures that the cookie is only sent over HTTPS connections, which is important for protecting the token during transmission. It should be enabled in production environments where HTTPS is used.
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
    sameSite: "strict", // This setting helps prevent cross-site request forgery (CSRF) attacks by ensuring that the cookie is only sent in requests originating from the same site.
  });
  return token;
};
