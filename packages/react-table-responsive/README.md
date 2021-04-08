# React Table Responsive

## Mobile friendly UI wrapper based on [react-table](https://github.com/tannerlinsley/react-table)

### This package contains:
- ClientTable
- ServerTable(with server-based pagination, sorting, filtering)
- SelectColumnFilter (you can use it in columns[].Filter)


#### ClientTable
```JSX
import {ClientTable} from '@tourmalinecore/react-table-responsive';

<ClientTable
  tableId="unique id" // should be unique, because it used for local state storing
  // data for table grouped by rows, it maps with columns by property key, using colums 'accessor field'
  // each object is a "row": key - column id(use it in columns 'accessor' field), value - cell data
  data={[
    {
      name: 'name1',
      data: 'data1',
    },
    {
      name: 'name2',
      data: 'data2',
    },
  ]}
  columns={[
    {
      Header: 'Header Name', // display name for column 'th'
      accessor: 'name', // should be one of data keys
      accessor: (data) => data.propName || data.anotherPropName, // also you can pass custom getter function

      // String | Function(rows, columnIds, filterValue) => Rows[]
      // pass any custom filter function here
      filter: () => {},

      Filter: <SomeFilterComponent />, // default: <text input field>, see example here(TODO file link)
      // if you use <SelectColumnFilter>, pass options with this property
      selectFilterOptions: [{label: '', value: ''}, ...]

      minWidth: 80, // minWidth is only used as a limit for resizing
      width: 150, // width is used for both the flex-basis and flex-grow
      maxWidth: 400, // maxWidth is only used as a limit for resizing
      principalFilterableColumn: true,
      nonMobileColumn: true,
      noFooterColumn: false,
      disableSortBy: true,
      disableFilters: true,
      Cell: ({ row }) => someRenderFunction(row),
      Footer: () => 'footer content',
    },
    {
      Header: 'Header Name',
      accessor: 'data',
    },
  ]}
  actions={[ // special column for icon action-buttons
    {
      name: 'action-uniq-name',
      show: () => true,
      renderIcon: (row) => (<img className="icon" />),
      renderText: () => {}, // tooltip text for icon
      onClick: (event, row) => {}
    },
  ]}
  order = {{ // sorting order
    id: 'shortName',
    desc: false, // should it sort by descendance?
  }}
  language='en' // en/ru or Object, see example here(TODO file link)
  renderMobileTitle={() => {}} // rows accordion head content for mobile view
  maxStillMobileBreakpoint={800} // breakpoint to toggle between mobile/desktop view
  loading={false}
  onFiltersChange={() => {}}
  // if it is true filters and sortBy will be stored in memory and when you go back to the table its state will be initialized with it
  // it is stored in a const variable thus state dissapears on page reload
  enableTableStatePersistance={false}

  // there you can also provide your custom props:
  // anything you put into these options will
  // automatically be available on the instance.
  // E.g. if you provide a function here,  
  // it will be available from cell renderers
/>
```

#### ServerTable

If you want to use default GET request method you will need to ensure that your backend endpoint can process query consisting of the parameters below:

- **draw**: int.
- **page**: int. Number of page to take.
- **pageSize**: int. Number that defines size of the pages.
- **orderBy**: string. Property name used for sorting.
- **orderingDirection**: string. Any string for ascending order and 'desc' for descending.
- **filteredByColumns**: string[]. List of property names to be used for filtering separated by coma. This names are taken from the provided *columns* list.   
- **filteredByValues**: string[]. List of property values to be used for filtering separated by coma. Thier indexes  correspond with the ones from the *filteredByColumns* array.

Example:
```
https://{app-url}/{endpoint}?draw=2&page=1&pageSize=10&orderBy=name&orderingDirection=desc&filteredByColumns=Name,Surname&filteredByValues=John,Smith
```

```JSX
import {ServerTable} from '@tourmalinecore/react-table-responsive'

<ServerTable
  // this props are the same as for TcClientTable
  tableId="uniq-table-id"
  columns={[]}
  actions={[]}
  order={}
  language="en"
  renderMobileTitle={() => {}}
  maxStillMobileBreakpoint={800}
  loading={false}
  onFiltersChange={() => {}}
  enableTableStatePersistance={false}

  // this props for api calls
  refresh={false} // toggle it in any way to trigger table refresh
  apiHostUrl="https://hosturl"
  dataPath="/api-endpoint"
  authToken="" // your auth token if needed
  requestMethod="GET"
  requestData={{}} // data for POST requests, defaults to {}
  onPageDataLoaded={() => {}}

  // there you can also provide your custom props:
  // anything you put into these options will
  // automatically be available on the instance.
  // E.g. if you provide a function here,  
  // it will be available from cell renderers
/>
```

## Do not forget to import styles if needed
should be imported once in your root component
```JSX
import '@tourmalinecore/react-table-responsive/es/index.css';
import '@tourmalinecore/react-tc-modal/es/index.css';
import '@tourmalinecore/react-tc-ui-kit/es/index.css';
```