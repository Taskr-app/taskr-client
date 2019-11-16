# Taskr client

#### Table of Contents
- [Installation](#Installation)
- [Getting started](#Getting_started)
- [Generate graphql](#Generate_graphql)
- [Graphql](#Graphql)
- [Styling](#Styling)
- [Tests](#Tests)
- [Making a pull request](#Making_a_pull_request)

### Installation
1. `npm install` or `yarn`
---------

### Getting started

1. Create an `.env` file in the root directory following the `.env.sample` file
2. Run `yarn start` or `npm start`
------  

### Graphql
https://www.apollographql.com/docs/react/api/react-hooks/
- We are using apollo-client to connect to our apollo backend
- Queries/mutations/subscriptions can be created under the `graphql` directory with the `*.graphql` extension
- `yarn codegen` will create watch for any changes under `graphql` and create types, hooks, and the query itself within `generated/graphql`.

##### Using queries
```jsx
import { useMeQuery } from "../generated/graphql"

const App = () => {
    const { data, loading, error } = useMeQuery();

    if (loading) {
        return <div>loading...</div>
    }
    if (error || !data.me) {
        return <></>
    }
    return <div>{data.me}</div>
}
```
##### Using mutations
```jsx
import { useMessageMutation } from "../generated/graphql"

const App = () => {
    const [message, { loading }] = useMessageMutation();

    const handleClick = () => {
        message({
            variables: { message: 'hello world' }
        })
    }

    return <button loading={loading} onClick={handleClick}>Click</button>
}
```
- If you ever need access to the direct query tags for tests or refetchQueries, those are also generated.
```jsx
import { useMessageMutation, MessageDocument } from "../generated/graphql"

const App = () => {
    const [message, { loading }] = useMessageMutation();

    const handleClick = () => {
        message({
            variables: { message: 'hello world' }
            refetchQueries: [{ query: MessageDocument }]
        })
    }

    return <button loading={loading} onClick={handleClick}>Click</button>
}
```
##### Using lazy queries
If you need to fire a query manually rather than on component mount, you can use lazyQueries which are also generated

```jsx
import { useMeLazyQuery } from "../generated/graphql"

const App = () => {
    const [getMe, { called, loading, data }] = useMeLazyQuery();
    const handleClick = () => getMe() // fetching me query

    if (loading) {
        return <div>loading...</div>
    }

    return (
        <>
            <div>{data.me || 'Not logged in'}</div>
            <button onClick={handleClick}>Log in</button>
        </>
    )
}
```

### Styling
- Use CSS modules pattern and scss
- Avoid inline styles unless passing down as props
```css
/** App.module.less */
.main {
    display: flex;
    width: 100%;
}

```

##### Antd themes
https://ant.design/docs/react/customize-theme

________

### Components
##### Text

```jsx
import { HeaderText, SubText } from "components/common/Text";

export default () => (
    <>
        <HeaderText style={{ marginBottom: '5px' }} white={1}>Hello</HeaderText>
        <SubText style={{ marginBottom: '5px' }}>World</SubText>
    </>
)
```

| Prop               | Description                       | Type        | Default        | Required |
| ------------------ | --------------------------------- | ----------- | -------------- | -------- |
| **`style`**        | Style                             | _(object)_  | _undefined_    | ❌ |
| **`white`**        | Text color white                             | _(number)_     | _undefined_    | ❌       |
| **`children`**         | Children | _(ReactNode)_  | _undefined_    | ✅             |

##### Modals
```jsx
const RandomPage = () => {
    const { showModal } = useModal()
    return (
        <button onClick={() => showModal('welcome')}>Open Modal</button>
    )
}
```
_________

### Tests 🔀
Tests are written using `jest` + `enzyme`
- Run `yarn test` to run tests

`@apollo/react-testing` ~ Use `MockedProvider` to mock queries to an apollo-server
```jsx
import * as React from 'react';
import { render } from 'enzyme';
import Home from '../../pages/home';
import { MockedProvider } from '@apollo/react-testing';
import { MeDocument } from '../../generated/graphql';
import { MemoryRouter } from 'react-router';

describe('Pages', () => {
  describe('Home', () => {
    const mocks = [
      {
        request: {
          query: MeDocument
        },
        result: {
          data: {
            me: { id: 1, email: 'example@email.com' }
          }
        }
      }
    ];

    it('should render and call me query', () => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter initialEntries={['/home']}>
            <Home />
          </MemoryRouter>
        </MockedProvider>
      );
    });
  }
}
```
____

### Making a pull request
1. Assign a ticket to yourself on trello and move it to `Doing` column
2. `git checkout -b feature`
3. Make and commit changes, push and create a PR
4. Resolve all merge conflicts
5. Once PR passes the CI tests you can go ahead and `rebase and merge` to `master`
6. Delete the branch after successfully merged.

