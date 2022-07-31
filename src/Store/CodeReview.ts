import { CodeReview, CodeReviewStorageInterface } from './Types';

const testData: CodeReview[] = [
  {
    url: 'http://localhost:8000/public/',
    anchors: [
      { id: 'diff-34df9ab71f49e2da0a54c01b22e503d19c70987b66c806826d5ed1b7022f7314R31', comment: 'this is the start' },
      { id: 'diff-f9ab71f49e2da0a54c01b22e503d19c70987b66c806826d5ed1b7022f7314R31', comment: 'this is the end' },
    ],
  },
];

class LocalCodeReviewStorage implements CodeReviewStorageInterface {
  data: CodeReview[];

  constructor(data: CodeReview[]) {
    this.data = data;
  }

  Data(): CodeReview[] {
    return this.data;
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

  Save(url: string, id: string, comment: string): CodeReview[] {
    let cr = this.Get(url);
    if (cr === undefined) {
      cr = { url, anchors: [] };
    }

    let codeReview: CodeReview = cr;

    // case of updating the comment in an anchor
    codeReview.anchors.forEach((anchor, idx) => {
      if (anchor.id === id) {
        anchor.comment = comment;
        codeReview.anchors[idx] = anchor;
        this._save(codeReview);
        return this.data;
      }

      idx++;
    });

    codeReview.anchors.push({ id, comment });
    this._save(codeReview);
    return this.data;
  }

  Delete(url: string, id: string): CodeReview[] {
    for (let codeReview of this.data) {
      if (codeReview.url === url) {
        let idx = 0;
        for (let anchor of codeReview.anchors) {
          if (anchor.id === id) {
            codeReview.anchors.splice(idx, 1);
            this._save(codeReview);
            break;
          }

          idx++;
        }
      }
    }

    return this.data;
  }

  // _save updates data and persists state to local storage
  _save(codeReview: CodeReview): void {
    // No anchors means delete it!
    if (codeReview.anchors.length === 0) {
      let idx = 0;
      for (let cr of this.data) {
        if (cr.url === codeReview.url) {
          this.data.splice(idx, 1);
          return;
        }
        idx++;
      }
    }

    let idx = 0;
    for (let cr of this.data) {
      if (cr.url === codeReview.url) {
        this.data[idx] = codeReview;
        return;
      }
    }

    this.data.push(codeReview);
    // TODO save this.data to local storage
  }

  // _load pulls from local storage
  _load(): void {
    return;
  }
}

export { testData, LocalCodeReviewStorage };
