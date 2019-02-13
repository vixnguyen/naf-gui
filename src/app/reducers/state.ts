export interface RootState {
  pageData: RootState.PageState;
  notification: RootState.NotificationState;
}

export namespace RootState {
  export type PageState = any[];
  export type NotificationState = {};
}
