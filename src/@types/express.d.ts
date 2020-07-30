// Override types in some lib
declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
