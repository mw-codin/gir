import React from "react";
import ReactDOM from "react-dom";
import styled from '@emotion/styled';
import { Global, css } from '@emotion/react';
import { Box } from './components';

const AppContainer = styled.div`
  height: 100vh;
  background-color: var(--background-color);
  position: fixed;
  top: 20px;
  left: 20px;
  width: 500px;
  height: 500px;
  border: 2px solid green;
  border-radius: 10px;
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
      <AppContainer>
        <Box color={[0, 255, 0]} />
      </AppContainer>
    </React.Fragment>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
