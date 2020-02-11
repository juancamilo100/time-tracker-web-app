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
import Profile from 'containers/Profile';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import GlobalStyle from '../../global-styles';
import { routePath } from 'config';
import { HistoryPage } from 'containers/HistoryPage';
import LoginPage from 'containers/LoginPage';

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

export default function App() {
    console.log("Rendering App");
    
  return (
    <AppWrapper>
      <Helmet titleTemplate="%s - Time Tracker" defaultTitle="Time Tracker">
        <meta name="description" content="Time Tracker Application" />
      </Helmet>
      <Switch>
        <Route path={routePath.loginPath} component={LoginPage} />
        <HomePage>
          <Route path={routePath.featuresPath} component={FeaturePage} />
          <Route path={routePath.reportHistoryPath} component={HistoryPage} />
          <Route path={routePath.profilePath} component={Profile} />
        </HomePage>
        <Route exact path={routePath.mainPath} component={HomePage} />

        <Route path="" component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </AppWrapper>
  );
}
