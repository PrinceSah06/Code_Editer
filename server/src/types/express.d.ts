import { Types } from "mongoose";

declare global {
  namespace Express {
    interface User {
      _id: Types.ObjectId;
      id?: string; // optional if you use req.user.id
      email?: string;
    }

    interface Request {
      user?: User;
    }
  }
}

export {};
