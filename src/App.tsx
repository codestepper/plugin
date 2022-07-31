import * as React from 'react';
import Entry from './Components/Entry'
import { testData } from './Store/CodeReview'
import './App.css';

type AppState = {
  url: string;
};

class App extends React.Component<{}, AppState> {
  state: Readonly<AppState> = {
    url: ""
  };

  componentDidMount() {
    if (window.chrome !== undefined) {
      window.chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {

        // since only one tab should be active and in the current window at once
        // the return variable should only have one entry
        var activeTab = tabs[0];
        if (activeTab.url !== undefined) {
          this.setState({ url: activeTab.url })
        }
      })

      window.chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        if (!tab.active) {
          return
        }

        if (tab.url !== undefined) {
          this.setState({ url: tab.url })
        }
      })
    }
  }

  render() {
    return (
      <div>
        <Entry url={this.state.url} data={testData} />
      </div>
    )
  }
};

export default App;
