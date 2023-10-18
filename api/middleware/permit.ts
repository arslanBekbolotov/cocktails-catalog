import {NextFunction, Request, Response} from 'express';
import {IRequestWithUser} from './auth';

const permit = (...roles: string[]) => {
  return async (expressReq: Request, res: Response, next: NextFunction) => {
    const req = expressReq as IRequestWithUser;
    const {id} = req.params;

    if (!req.user) {
      return res.status(401).send({message: 'Unauthenticated'});
    }

    if (roles.includes('creator') && req.user._id.toString() === id) {
      next();
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).send({message: 'Unauthorized'});
    }

    next();
  };
};

export default permit;