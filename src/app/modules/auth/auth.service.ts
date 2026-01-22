import AppError from "../../errorHelper/AppError";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import { createUserToken } from "../../utils/userTokens";

const login = async (payload: any) => {
  const user = await User.findOne({ email: payload.email }).select("+password");
  if (!user) throw new AppError(httpStatus.NOT_FOUND, "User not found");

  const isPasswordMatch = await bcryptjs.compare(
    payload.password,
    user.password as string,
  );
  if (!isPasswordMatch)
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid credentials");

  //   create user token
  const userToken = createUserToken(user);
  const { password, ...rest } = user.toObject();
  return {
    rest,
    accessToken: userToken,
  };
};

export const AuthServices = {
  login,
};
