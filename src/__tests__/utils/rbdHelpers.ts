import '@testing-library/jest-dom/extend-expect';
import {
  fireEvent,
  waitForElement,
  RenderResult,
  Matcher,
  SelectorMatcherOptions
} from '@testing-library/react';

/*
  window.getComputedStyle mock
*/
const noSpacing = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
};

const getComputedSpacing = ({
  margin = noSpacing,
  padding = noSpacing,
  border = noSpacing,
  display = 'block'
}): Pick<
  CSSStyleDeclaration,
  | 'paddingTop'
  | 'paddingRight'
  | 'paddingBottom'
  | 'paddingLeft'
  | 'marginTop'
  | 'marginBottom'
  | 'marginLeft'
  | 'marginRight'
  | 'borderTopWidth'
  | 'borderRightWidth'
  | 'borderBottomWidth'
  | 'borderLeftWidth'
  | 'display'
> => ({
  paddingTop: `${padding.top}px`,
  paddingRight: `${padding.right}px`,
  paddingBottom: `${padding.bottom}px`,
  paddingLeft: `${padding.left}px`,
  marginTop: `${margin.top}px`,
  marginRight: `${margin.right}px`,
  marginBottom: `${margin.bottom}px`,
  marginLeft: `${margin.left}px`,
  borderTopWidth: `${border.top}px`,
  borderRightWidth: `${border.right}px`,
  borderBottomWidth: `${border.bottom}px`,
  borderLeftWidth: `${border.left}px`,
  display
});

export const mockGetComputedSpacing = () =>
  jest
    .spyOn(window, 'getComputedStyle')
    .mockImplementation((): any => getComputedSpacing({}));

/*
  el.getBoundingClientRect mock
*/
export const mockGetBoundingClientRect = (el: Element) =>
  jest.spyOn(el, 'getBoundingClientRect').mockImplementation((): any => {
    // return new DOMRect(0, 0, 0, 0);
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      center: { x: 0, y: 0 }
    };
  });

/*
  promise util
*/
const executeAsyncFnsSerially = (fns: any) =>
  fns.reduce(
    (promise: any, fn: any) =>
      promise.then((result: any) =>
        fn().then(Array.prototype.concat.bind(result))
      ),
    Promise.resolve([])
  );

/*
  react-beautiful-dnd utils
*/
// used for lookups
const DND_DROPPABLE_DATA_ATTR = '[data-rbd-droppable-id]';
export const DND_DRAGGABLE_DATA_ATTR = '[data-rbd-draggable-id]';
export const DND_DRAG_HANDLE_DATA_ATTR = '[data-rbd-drag-handle-draggable-id]';

export const mockDndElSpacing = (rtlUtils: RenderResult) => {
  const droppables = rtlUtils.container.querySelectorAll(
    DND_DROPPABLE_DATA_ATTR
  );
  droppables.forEach(dropEl => {
    mockGetBoundingClientRect(dropEl);
    const draggables = dropEl.querySelectorAll(DND_DRAGGABLE_DATA_ATTR);
    draggables.forEach(dragEl => {
      mockGetBoundingClientRect(dragEl);
    });
  });
};

export const DND_DIRECTION_LEFT = 'DND_DIRECTION_LEFT';
export const DND_DIRECTION_UP = 'DND_DIRECTION_UP';
export const DND_DIRECTION_RIGHT = 'DND_DIRECTION_RIGHT';
export const DND_DIRECTION_DOWN = 'DND_DIRECTION_DOWN';

export const makeDnd = async ({
  getByText,
  getDragEl,
  direction,
  positions
}: {
  getByText: (
    text: Matcher,
    options?: SelectorMatcherOptions | undefined,
    waitForElementOptions?: unknown
  ) => HTMLElement;
  getDragEl: () => HTMLElement;
  direction: string;
  positions: number;
}) => {
  const spaceKey = { keyCode: 32 };
  const arrowLeftKey = { keyCode: 37 };
  const arrowUpKey = { keyCode: 38 };
  const arrowRightKey = { keyCode: 39 };
  const arrowDownKey = { keyCode: 40 };
  const getKeyForDirection = () => {
    switch (direction) {
      case DND_DIRECTION_LEFT:
        return arrowLeftKey;
      case DND_DIRECTION_UP:
        return arrowUpKey;
      case DND_DIRECTION_RIGHT:
        return arrowRightKey;
      case DND_DIRECTION_DOWN:
        return arrowDownKey;
      default:
        throw new Error('Unhandled `direction`!');
    }
  };
  const handleMovementInDirection = async () => {
    // enable keyboard dragging
    fireEvent.keyDown(getDragEl(), spaceKey);
    await waitForElement(() => getByText(/You have lifted an item/i));
    // move drag element based on direction
    fireEvent.keyDown(getDragEl(), getKeyForDirection());
    await waitForElement(() => getByText(/You have moved the item/i));
    // disable keyboard dragging
    fireEvent.keyDown(getDragEl(), spaceKey);
    await waitForElement(() => getByText(/You have dropped the item/i));
  };

  // focus drag element
  getDragEl().focus();
  expect(getDragEl()).toHaveFocus();

  // move drag element based on direction and positions
  const movements = [];
  for (let i = 0; i < positions; i += 1) {
    movements.push(handleMovementInDirection);
  }
  await executeAsyncFnsSerially(movements);
};
