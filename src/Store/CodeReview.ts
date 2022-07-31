export type CodeReview = {
  url: string;
  anchors: Anchor[];
};

export type Anchor = {
  id: string;
  comment: string;
};

const testData: CodeReview[] = [
  {
    url: 'http://localhost:8000/public/',
    anchors: [
      { id: 'diff-34df9ab71f49e2da0a54c01b22e503d19c70987b66c806826d5ed1b7022f7314R31', comment: 'this is the start' },
      { id: 'diff-f9ab71f49e2da0a54c01b22e503d19c70987b66c806826d5ed1b7022f7314R31', comment: 'this is the end' },
    ],
  },
];

interface CodeReviewInterface {
  data: CodeReview[];
  Get(url: string): CodeReview | undefined;
  Add(url: string, id: string, comment: string): void;
  Delete(url: string, id: string): void;
}

class LocalCodeReview implements CodeReviewInterface {
  data: CodeReview[];

  constructor(data: CodeReview[]) {
    this.data = data;
  }

  Get(url: string): CodeReview | undefined {
    if (this.data === undefined) {
      return;
    }

    for (let codeReview of this.data) {
      let currentURL: URL;
      let storedURL: URL;

      try {
        currentURL = new URL(url);
        storedURL = new URL(codeReview.url);
      } catch (e) {
        console.debug('error parsing url:', e);
        return;
      }

      const currentURLKey = currentURL.origin + currentURL.pathname;
      const storedURLKey = storedURL.origin + storedURL.pathname;

      if (currentURLKey === storedURLKey) {
        return codeReview;
      }
    }
  }

  Add(url: string, id: string, comment: string): void {}

  Delete(url: string, id: string): void {}

  // _save persists state to local storage
  _save(): void {}

  // _load pulls from local storage
  _load(): void {}
}

export { testData, LocalCodeReview };
