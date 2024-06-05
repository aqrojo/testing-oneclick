import { Link, Route, Switch } from "wouter";
import SumExample from "./examples/SumExample/SumExample";
import MultipleChoiceExample from "./examples/MultipleChoiceExample/MultipleChoiceExample";
import "./App.css";

function App() {
  return (
    <div className="App">
      <ul className="menu">
        <li>
          <Link href="/suma">Suma</Link>
        </li>
        <li>
          <Link href="/multiple-choice">Multiple choice</Link>
        </li>
      </ul>

      <Switch>
        <Route path="/suma" component={SumExample} />
        <Route path="/multiple-choice" component={MultipleChoiceExample} />
      </Switch>
    </div>
  );
}

export default App;
