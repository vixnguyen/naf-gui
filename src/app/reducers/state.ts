export interface RootState {
  pageData: RootState.PageState;
  appStatus: RootState.AppStatus;
  notification: RootState.NotificationState;
}

export namespace RootState {
  export type PageState = {};
  export type AppStatus = {
    [key: string]: any;
  };
  export type NotificationState = {};
}
