import "./Header.scss";

import * as React from "react";

import { Images } from "../../constants/images";

export interface IHeaderProps {}

export function Header(props: IHeaderProps) {
  return (
    <div className="header">
      <div className="header_logo">
        <img src={Images.logo} alt="GEEK" />
        <h1>Test</h1>
      </div>

      <div className="header_nav">
        <p>To do</p>
      </div>
    </div>
  );
}
