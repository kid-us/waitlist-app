export interface WaitList {
  data: {
    email_address: string;
    created_at: string;
  }[];

  has_next: boolean;
  has_prev: boolean;
}
