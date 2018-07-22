import * as React from 'react';
import './App.css';
import logo from './logo.svg';
import {Store} from "./store";

class App extends React.Component {
    public state = {
        key: '',
        namespace: '',
        retrieved: undefined,
        value: '',
    };

    protected store = new Store();

    constructor(props: any){
        super(props);
    }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
          <label>
              namespace:
              <input type="text" value={this.state.namespace}
                     onChange={this.updateNamespace}/>
          </label>
          <br/>
          <label>
              key:
              <input type="text" value={this.state.key}
                     onChange={this.updateKey}/>
          </label>
          <br/>
          <label>
              value:
              <input type="text" value={this.state.value}
                     onChange={this.updateValue}/>
          </label>
          <br/>
          <button onClick={this.addToStore}>Add to store</button>
          <button onClick={this.getFromStore}>get from store</button>

          <hr/>
          Store state:
          <pre>
              {JSON.stringify(this.store)}
          </pre>

          <hr/>
          Retrieved value:
          <pre>
              {JSON.stringify(this.state.retrieved)}
          </pre>
      </div>
    );
  }

    protected addToStore = () => {
        this.store.set({
            key: this.state.key,
            namespace: this.state.namespace
        }, this.state.value);

        this.setState({
            key: '',
            namespace: '',
            retrieved: undefined,
            value: '',
        });
    };

    protected getFromStore = () => {
        let retrieved;

        if (this.state.key) {
            if (this.state.namespace) {
                retrieved = this.store.get({
                    key: this.state.key,
                    namespace:this.state.namespace
                });
            } else {
                retrieved = this.store.get(this.state.key);
            }
        }

        this.setState({
            key: '',
            namespace: '',
            retrieved,
            value: ''
        });
    };

    protected updateNamespace = (changedValue: any) => {
        this.setState({
            namespace: changedValue.target.value
        })
    };

    protected updateKey = (changedValue: any) => {
        this.setState({
            key: changedValue.target.value
        })
    };

    protected updateValue = (changedValue: any) => {
        this.setState({
            value: changedValue.target.value
        })
    };
}

export default App;
