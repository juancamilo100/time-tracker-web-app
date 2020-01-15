/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo } from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { RootState } from './types';
import Drawer from '../../components/Drawer';

// tslint:disable-next-line:no-empty-interface
interface OwnProps {}

interface StateProps {
  loading: boolean;
  error: object | boolean;
  repos: object[] | boolean;
  username: string;
}

interface DispatchProps {
  onChangeUsername(evt: any): void; // Not gonna declare event types here. No need. any is fine
  onSubmitForm(evt?: any): void; // Not gonna declare event types here. No need. any is fine
}

type Props = StateProps & DispatchProps & OwnProps;

const key = 'home';

export function HomePage(props: Props) {
  useInjectReducer({ key: key, reducer: reducer });
  useInjectSaga({ key: key, saga: saga });

  /**
   * when initial state username is not null, submit the form to load repos
   */
  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    if (props.username && props.username.trim().length > 0) {
      props.onSubmitForm();
    }
  }, []);

  return (
    <div>
      <Drawer />
    </div>
  );
}

// Map Disptach to your DispatchProps
export function mapDispatchToProps(
  dispatch: Dispatch,
  ownProps: OwnProps,
): DispatchProps {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }
      dispatch(loadRepos());
    },
  };
}

// Map RootState to your StateProps
const mapStateToProps = createStructuredSelector<RootState, StateProps>({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
