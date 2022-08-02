import * as React from 'react';
import Entry from './Components/Entry';
import { testData, LocalCodeReviewStorage } from './Store/CodeReview';
import { CodeReview, CodeReviewStorageInterface } from './Store/Types';
import './App.css';

type AppState = {
  url: string;
  data: CodeReview[];
};

class App extends React.Component<{}, AppState> {
  codeReviewStore: CodeReviewStorageInterface;

  constructor(props: any) {
    super(props);
    // Passing updateData to the storage engine will ensure that whenever _save or
    // _load are called, the application will we re-render accordingly.
    this.codeReviewStore = new LocalCodeReviewStorage(this.updateData.bind(this));
    this.codeReviewStore._set(testData);
    this.state = { url: '', data: this.codeReviewStore.Data() };
  }

  updateData(data: CodeReview[]): void {
    this.setState({ data });
  }

  componentDidMount() {
    if (window.chrome !== undefined) {
      window.chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        // since only one tab should be active and in the current window at once
        // the return variable should only have one entry
        var activeTab = tabs[0];
        if (activeTab.url !== undefined) {
          this.setState({ url: activeTab.url });
        }
      });

      window.chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        if (!tab.active) {
          return;
        }

        if (tab.url !== undefined) {
          this.setState({ url: tab.url });
        }
      });
    }
  }

  render() {
    return (
      <div>
        <Entry
          url={this.state.url}
          data={this.state.data}
          getFn={this.codeReviewStore.Get.bind(this.codeReviewStore)}
          saveFn={this.codeReviewStore.Save.bind(this.codeReviewStore)}
          deleteFn={this.codeReviewStore.Delete.bind(this.codeReviewStore)}
        />
      </div>
    );
  }
}

export default App;
