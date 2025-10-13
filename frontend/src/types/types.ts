export interface WaitList {
  data: {
    id: number;
    email: string;
    created_at: string;
    status: string;
  }[];

  pagination: {
    current_page: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
    per_page: number;
    total: number;
  };
}
