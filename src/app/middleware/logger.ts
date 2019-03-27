import { Middleware } from 'redux';

import { Subject } from "rxjs";

export const listenerMiddleware: Middleware = (store) => (next) => (action) => {
  const forkedAction = Object.assign(action, { meta: { listener: new Subject()}});
  // console.log(forkedAction.meta.listener.asObservable());
  forkedAction.meta.listener.asObservable();
  return next(forkedAction);
};

export const logger: Middleware = (store) => (next) => (action) => {
  if (process.env.NODE_ENV !== 'production') {
    // console.log(action);
  }
  // console.log(next(action));
  return next(action);
};
