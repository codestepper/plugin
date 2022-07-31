export type Anchor = {
  id: string;
  comment: string;
};

export type CodeReview = {
  url: string;
  anchors: Anchor[];
};

export interface CodeReviewStorageInterface {
  Data(): CodeReview[];
  Get(url: string): CodeReview | undefined;
  Save(url: string, id: string, comment: string): CodeReview[];
  Delete(url: string, id: string): CodeReview[];
}
