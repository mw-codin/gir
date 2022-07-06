import React from "react";
import styled from '@emotion/styled';
import { Global, css } from '@emotion/react';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: var(--background-color);
`;

const CSSVariables = css`
  :root {
    --background-color: #292929;
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
      <AppContainer>Template</AppContainer>
    </React.Fragment>
  );
}

export default App;