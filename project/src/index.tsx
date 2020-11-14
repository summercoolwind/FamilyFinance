import * as React from "react";
import * as ReactDOM from "react-dom";

import UserComponent from "./view/UserComponent";

ReactDOM.render(
  <UserComponent data={{name:"TypeScript"}}/>,
  document.getElementById('root') as HTMLElement
);