import React from "react";
import ReactDOM from "react-dom";

import IndexView from "./view/IndexView";
import './i18n/i18n';

ReactDOM.render(
  <IndexView />,
  document.getElementById('root') as HTMLElement
);