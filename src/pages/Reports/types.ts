export type ENTRY_STATUS =
  | 'report_new'
  | 'report_verification'
  | 'report_accepted'
  | 'report_rejected'
  | 'report_inactive'
  | 'new'
  | 'verification'
  | 'accepted'
  | 'rejected'
  | 'inactive'
  | 'planning'
  | 'execution'
  | 'invalid'
  | 'done';

export type Stats = {
  reports: number;
  reportsBikeStands: number;
  plannings: number;
  planningsBikeStands: number;
  planningsByStatus: {
    planning: number;
    tender: number;
    execution: number;
    done: number;
  };
};
