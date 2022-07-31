import { LocalCodeReviewStorage } from './CodeReview';
import { CodeReview, CodeReviewStorageInterface } from './Types';

function fakeUpdater(data: CodeReview[]): void {
  return;
}

test('initializes local code review', () => {
  const testData: CodeReview[] = [
    {
      url: 'http://localhost:8000/public/',
      anchors: [
        {
          id: 'diff-34df9ab71f49e2da0a54c01b22e503d19c70987b66c806826d5ed1b7022f7314R31',
          comment: 'this is the start',
        },
        { id: 'diff-f9ab71f49e2da0a54c01b22e503d19c70987b66c806826d5ed1b7022f7314R31', comment: 'this is the end' },
      ],
    },
  ];

  let codeReview: CodeReviewStorageInterface = new LocalCodeReviewStorage(fakeUpdater);
  codeReview._set(testData);
  expect(codeReview.Data()).toEqual(testData);
});

test('LocalCodeReview.Get(...) finds correct code review', () => {
  const testData: CodeReview[] = [
    {
      url: 'http://localhost:8000/public/',
      anchors: [
        {
          id: 'diff-34df9ab71f49e2da0a54c01b22e503d19c70987b66c806826d5ed1b7022f7314R31',
          comment: 'this is the start',
        },
        { id: 'diff-f9ab71f49e2da0a54c01b22e503d19c70987b66c806826d5ed1b7022f7314R31', comment: 'this is the end' },
      ],
    },
  ];
  let codeReview: CodeReviewStorageInterface = new LocalCodeReviewStorage(fakeUpdater);
  codeReview._set(testData);
  expect(
    codeReview.Get(
      'http://localhost:8000/public/#diff-f9ab71f49e2da0a54c01b22e503d19c70987b66c806826d5ed1b7022f7314R31'
    )
  ).toEqual(testData[0]);
});

test('LocalCodeReview.Save(...) inserts new record', () => {
  let codeReview: CodeReviewStorageInterface = new LocalCodeReviewStorage(fakeUpdater);
  let res: CodeReview[] = codeReview.Save(
    'https://github.com/foo/bar/pull/8518/files#diff-193b27d62e4fbda3d563009fed5ec6761a05f73558d94b39fab63ae948c679eaR51',
    '#diff-193b27d62e4fbda3d563009fed5ec6761a05f73558d94b39fab63ae948c679eaR51',
    'This is where I started'
  );

  expect(res[0]).not.toBe(undefined);
  expect(res[0].anchors.length).toBe(1);
  expect(res[0].anchors[0].id).toBe('#diff-193b27d62e4fbda3d563009fed5ec6761a05f73558d94b39fab63ae948c679eaR51');
  expect(res[0].anchors[0].comment).toBe('This is where I started');
});

test('LocalCodeReview.Delete(...) removes a record', () => {
  const testData: CodeReview[] = [
    {
      url: 'http://localhost:8000/public/',
      anchors: [
        {
          id: 'diff-34df9ab71f49e2da0a54c01b22e503d19c70987b66c806826d5ed1b7022f7314R31',
          comment: 'this is the start',
        },
        { id: 'diff-f9ab71f49e2da0a54c01b22e503d19c70987b66c806826d5ed1b7022f7314R31', comment: 'this is the end' },
      ],
    },
  ];
  let codeReview: CodeReviewStorageInterface = new LocalCodeReviewStorage(fakeUpdater);
  codeReview._set(testData);
  let res: CodeReview[] = codeReview.Delete(
    'http://localhost:8000/public/',
    'diff-34df9ab71f49e2da0a54c01b22e503d19c70987b66c806826d5ed1b7022f7314R31'
  );
  expect(res[0].anchors.length).toBe(1);
  res = codeReview.Delete(
    'http://localhost:8000/public/',
    'diff-f9ab71f49e2da0a54c01b22e503d19c70987b66c806826d5ed1b7022f7314R31'
  );
  expect(res.length).toBe(0);
});

test('LocalCodeReview mixed commands', () => {
  const testData: CodeReview[] = [
    {
      url: 'http://localhost:8000/public/',
      anchors: [
        {
          id: 'diff-34df9ab71f49e2da0a54c01b22e503d19c70987b66c806826d5ed1b7022f7314R31',
          comment: 'this is the start',
        },
        { id: 'diff-f9ab71f49e2da0a54c01b22e503d19c70987b66c806826d5ed1b7022f7314R31', comment: 'this is the end' },
      ],
    },
  ];
  let codeReview: CodeReviewStorageInterface = new LocalCodeReviewStorage(fakeUpdater);
  codeReview._set(testData);
  let data = codeReview.Save('http://localhost:8000/public/', 'diff-3', 'final comment');
  expect(data.length).toBe(1);
  expect(data[0].url).toBe('http://localhost:8000/public/');
  expect(data[0].anchors.length).toBe(3);
});
