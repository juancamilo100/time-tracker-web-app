import { Reducer, Store } from 'redux';
import { RouterState } from 'connected-react-router';
import { ILanguageProviderProps } from 'containers/LanguageProvider';
import { ContainerState as AppState } from 'containers/App/types';
import { ContainerState as HomeState } from 'containers/HomePage/types';
import { ContainerState as LoginPageState } from 'containers/LoginPage/types';
import { ContainerState as HistoryPageState } from 'containers/ReportHistoryPage/types';
import { ContainerState as ProfilePageState } from 'containers/ProfilePage/types';
import { ContainerState as CreateReportPageState } from 'containers/CreateReportPage/types';
import { ContainerState as InvoiceDeliveryState } from 'containers/InvoiceDelivery/types';
import { SagaIterator } from 'redux-saga';

export interface LifeStore extends Store {
  injectedReducers: any;
  injectedSagas: any;
  runSaga(saga: (() => SagaIterator<any>) | undefined, args: any | undefined): any;
}

export interface InjectReducerParams {
  key: keyof ApplicationRootState;
  reducer: Reducer<any, any>;
}

export interface InjectSagaParams {
  key: keyof ApplicationRootState;
  saga: () => SagaIterator<any>;
  mode?: string | undefined;
}

// Your root reducer type, which is your redux state types also
export interface ApplicationRootState {
  readonly router: RouterState;
  readonly global: AppState;
  readonly language: ILanguageProviderProps;
  readonly home: HomeState;
  readonly loginPage: LoginPageState;
  readonly createReportPage: CreateReportPageState;
  readonly reportHistoryPage: HistoryPageState;
  readonly profilePage: ProfilePageState;
  readonly invoiceDeliveryPage: InvoiceDeliveryState;
}

