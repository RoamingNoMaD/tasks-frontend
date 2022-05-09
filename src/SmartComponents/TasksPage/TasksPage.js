import React, { Suspense, lazy, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Spinner, StackItem, Stack } from '@patternfly/react-core';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import {
  PageHeader,
  PageHeaderTitle,
} from '@redhat-cloud-services/frontend-components/PageHeader';
import { TasksTabs } from '../../PresentationalComponents';
import { TASKS_PAGE_TABS } from '../../constants';

const AvailableTasksTable = lazy(() =>
  import('../AvailableTasksTable/AvailableTasksTable')
);
const CompletedTasksTable = lazy(() =>
  import('../../SmartComponents/CompletedTasksTable/CompletedTasksTable')
);

import './tasks-page.scss';

const TasksPage = ({ tab }) => {
  const history = useHistory();
  const [tabIndex, setTab] = useState(tab);
  useEffect(() => {
    if (tab === 0) {
      history.push('available');
    }
  }, []);

  const updateTab = (event, index) => {
    history.push(index ? 'executed' : 'available');
    setTab(index);
  };

  return (
    <React.Fragment>
      <PageHeader>
        <PageHeaderTitle title="Tasks" />
      </PageHeader>
      <TasksTabs
        className="tabs-background"
        tabIndex={tabIndex}
        updateTab={updateTab}
        tabsList={TASKS_PAGE_TABS}
      />
      <Main>
        <Stack hasGutter>
          <StackItem>
            <Suspense fallback={<Spinner />}>
              {tabIndex === 0 ? (
                <AvailableTasksTable />
              ) : (
                <CompletedTasksTable />
              )}
            </Suspense>
          </StackItem>
        </Stack>
      </Main>
    </React.Fragment>
  );
};

TasksPage.propTypes = {
  tab: propTypes.number,
};

export default TasksPage;
