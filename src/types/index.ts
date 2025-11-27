export type PostTypeStatus = "publish" | "draft" | "block" | "all";

export interface DataItem {
  id: number;
  title: string;
  body: string;
  status: "publish" | "draft" | "block";
  topRate: boolean;
}

export interface CommentPost {
  body: string;
  post_id: number;
}

export interface CommentResponse {
  id: number;
  body: string;
  post_id: number;
}

export interface TopRatePost {
  postId: number;
  rateValue: boolean;
  pageNumber: number;
}