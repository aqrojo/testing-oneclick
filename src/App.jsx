import { Link, Route, Switch } from "wouter";
import SumExample from "./examples/SumExample/SumExample";
import "./App.css";

function App() {
  return (
    <div className="App">
      <ul className="menu">
        <li>
          <Link href="/">Suma</Link>
        </li>
      </ul>

      <Switch>
        <Route path="/" component={SumExample} />
      </Switch>
    </div>
  );
}

export default App;
