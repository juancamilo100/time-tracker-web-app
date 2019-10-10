/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styles/styled-components';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
// import Header from 'components/Header';
// import Footer from 'components/Footer';

import GlobalStyle from '../../global-styles';
import { routePath } from 'config';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
       <Helmet
        titleTemplate="%s - Time Tracker"
        defaultTitle="Time Tracker"
      >
        <meta name="description" content="Time Tracker Application" />
      </Helmet> 
      {/* <Header /> */}
      
      {/* Partially works */}
      {/* <HomePage></HomePage>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/features" component={FeaturePage} />
        <Route path="" component={NotFoundPage} />
      </Switch> */}
      {/* <Footer /> */}

      {/* Does not work */}
      <HomePage>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path={routePath.featuresPath} component={FeaturePage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </HomePage>
      <GlobalStyle />
    </AppWrapper>
  );
}
