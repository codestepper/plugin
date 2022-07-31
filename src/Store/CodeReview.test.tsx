import { LocalCodeReview, CodeReview } from './CodeReview';

const testData: CodeReview[] = [
  {
    url: 'http://localhost:8000/public/',
    anchors: [
      { id: 'diff-34df9ab71f49e2da0a54c01b22e503d19c70987b66c806826d5ed1b7022f7314R31', comment: 'this is the start' },
      { id: 'diff-f9ab71f49e2da0a54c01b22e503d19c70987b66c806826d5ed1b7022f7314R31', comment: 'this is the end' },
    ],
  },
];

test('initializes local code review', () => {
  let codeReview: LocalCodeReview = new LocalCodeReview(testData);
  expect(codeReview.data).toEqual(testData);
});

test('LocalCodeReview.Get() findss correct code review', () => {
  let codeReview: LocalCodeReview = new LocalCodeReview(testData);
  expect(
    codeReview.Get(
      'http://localhost:8000/public/#diff-f9ab71f49e2da0a54c01b22e503d19c70987b66c806826d5ed1b7022f7314R31'
    )
  ).toEqual(testData[0]);
});

test('LocalCodeReview.Add() inserts new record', () => {
  let codeReview: LocalCodeReview = new LocalCodeReview([]);
});
