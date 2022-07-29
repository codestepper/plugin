

export type CodeReview = {
    url: string;
    anchors: Anchor[];
}

export type Anchor = {
    id: string;
    comment: string;
}

const testData: CodeReview[] = [
    { url: "http://localhost:8000/public/", anchors: [
        { id: "diff-34df9ab71f49e2da0a54c01b22e503d19c70987b66c806826d5ed1b7022f7314R31", comment: "this is the start" }
    ] },
]

export { testData }
