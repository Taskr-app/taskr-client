import {
  mockDndElSpacing,
  DND_DRAG_HANDLE_DATA_ATTR
} from '../utils/rbdHelpers';
import * as React from 'react';
import { MockedProvider, wait, MockedResponse } from '@apollo/react-testing';
import {
  mocks,
  projectId,
  listsAndTasksMock
} from '../utils/mockListsAndTasks';
import { MemoryRouter, Route } from 'react-router-dom';
import ProjectPage from '../../pages/project';
import { act } from 'react-dom/test-utils';
import { encode } from '../../lib/hashids';
import {
  render,
  fireEvent,
  within,
  waitForElement
} from '@testing-library/react';
import { UpdateListPosDocument } from '../../generated/graphql';

const spaceKey = { keyCode: 32 };
const arrowLeftKey = { keyCode: 37 };
const arrowRightKey = { keyCode: 39 };

const projectName = 'testing';
const hashedId = encode(projectId);

const createTestTextOrderByTestIdHelper = (getAllByTestId: any) => {
  const testTextOrderByTestId = (testId: any, expectedTexts: any) => {
    const texts = getAllByTestId(testId).map((x: any) => x.textContent);
    expect(texts).toEqual(expectedTexts);
  };
  return testTextOrderByTestId;
};

const renderApp = async (mocks: MockedResponse[]) => {
  const rtlUtils = render(
    <MockedProvider mocks={mocks} addTypename={true}>
      <MemoryRouter initialEntries={[`/project/${hashedId}/${projectName}`]}>
        <Route
          path="/project/:projectId/:projectName"
          component={ProjectPage}
        />
      </MemoryRouter>
    </MockedProvider>
  );

  await act(async () => {
    await wait(0);
    mockDndElSpacing(rtlUtils);
    await wait(0);
  });

  const makeGetDragEl = (text: string) => () =>
    rtlUtils.getByText(text).closest(DND_DRAG_HANDLE_DATA_ATTR);

  return { makeGetDragEl, ...rtlUtils };
};

describe('Project-Dnd', () => {
  let root: HTMLDivElement;

  beforeEach(() => {
    // mockGetComputedSpacing();
    root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
  });

  afterAll(() => {
    document.body.removeChild(root);
  });

  describe('dnd', () => {
    test('Move a list to the right', async () => {
      const mocksWithUpdatePosListMutation = [...mocks];
      mocksWithUpdatePosListMutation.push({
        request: {
          query: UpdateListPosDocument,
          variables: {
            id: '1',
            aboveId: listsAndTasksMock[1].id
          }
        },
        result: {
          data: {
            undefined
          }
        }
      });
      const { getByText, makeGetDragEl, getByTestId } = await renderApp(
        mocksWithUpdatePosListMutation
      );

      const getDragEl = (makeGetDragEl('ooga') as unknown) as () => HTMLElement;

      await act(async () => {
        getDragEl().focus();
        expect(getDragEl()).toHaveFocus();

        fireEvent.keyDown(getDragEl(), spaceKey);
        await waitForElement(() => getByText(/You have lifted an item/i));
        fireEvent.keyDown(getDragEl(), arrowRightKey);
        await waitForElement(() => getByText(/You have moved the item/i));
        fireEvent.keyDown(getDragEl(), spaceKey);
        await waitForElement(() => getByText(/You have dropped the item/i));
      });

      const { getAllByTestId: getAllByTestIdWithinBoard } = (within(
        getByTestId('board')
      ) as unknown) as { getAllByTestId: HTMLElement[] };

      const testTextOrderByTestId = createTestTextOrderByTestIdHelper(
        getAllByTestIdWithinBoard
      );

      testTextOrderByTestId('list-content', ['booga', 'ooga']);
    });

    test('Move a list to the left', async () => {
      const mocksWithUpdatePosListMutation = [...mocks];
      mocksWithUpdatePosListMutation.push({
        request: {
          query: UpdateListPosDocument,
          variables: {
            id: '2',
            belowId: listsAndTasksMock[0].id
          }
        },
        result: {
          data: {
            undefined
          }
        }
      });

      const { getByText, makeGetDragEl, getByTestId } = await renderApp(
        mocksWithUpdatePosListMutation
      );

      const getDragEl = (makeGetDragEl(
        'booga'
      ) as unknown) as () => HTMLElement;

      await act(async () => {
        getDragEl().focus();
        expect(getDragEl()).toHaveFocus();

        fireEvent.keyDown(getDragEl(), spaceKey);
        await waitForElement(() => getByText(/You have lifted an item/i));
        fireEvent.keyDown(getDragEl(), arrowLeftKey);
        await waitForElement(() => getByText(/You have moved the item/i));
        fireEvent.keyDown(getDragEl(), spaceKey);
        await waitForElement(() => getByText(/You have dropped the item/i));
      });

      const { getAllByTestId: getAllByTestIdWithinBoard } = (within(
        getByTestId('board')
      ) as unknown) as { getAllByTestId: HTMLElement[] };

      const testTextOrderByTestId = createTestTextOrderByTestIdHelper(
        getAllByTestIdWithinBoard
      );

      testTextOrderByTestId('list-content', ['booga', 'ooga']);
    });
  });
});
