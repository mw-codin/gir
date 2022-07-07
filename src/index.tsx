import React from "react";
import ReactDOM from "react-dom";
import styled from '@emotion/styled';
import { Global, css } from '@emotion/react';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: var(--background-color);
`;

const CSSVariables = css`
  :root {
    --background-color: #ffffff;
  }
`;

const GlobalStyle = css`
  ${CSSVariables};
  body {
    margin: 0;
  }
`;

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Global styles={GlobalStyle} />
      <AppContainer></AppContainer>
    </React.Fragment>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
