# React-Table-Responsive

Mobile friendly react table component based on [react-table](https://github.com/tannerlinsley/react-table) using its useFlexLayout hook.

## [Demo](https://tourmalinecore.github.io/React-Packages/?path=/story/table--client-side-desktop)

## Instalation

The package can be installed via npm:
```
npm install @tourmalinecore/react-table-responsive --save
```

Or via yarn:
```
yarn add @tourmalinecore/react-table-responsive
```

### Do not forget to import styles if you want to use the defafult styling.
should be imported once in your root component
```JSX
import '@tourmalinecore/react-table-responsive/es/index.css';
import '@tourmalinecore/react-tc-modal/es/index.css';
import '@tourmalinecore/react-tc-ui-kit/es/index.css';
```

> **NOTE**:  You may want to re-style on your own. In that case you don't have to import the styles. 


## Main Package Features:
- Table that supports **client** side pagination/sorting/filtration.
- Table that supports **server** side pagination/sorting/filtration.
- Single column sorting.
- Optional persistance of selected sorting, filters, page size, etc. by storing them in the LS.
- Different pagination strategy between mobile and desktop versions of the table.
- Total amount of rows in the footer of the table.
- Actions column. Easy way to create interactive table by adding action buttons to each row. 
- External trigger of the server side table data reloading.
- Customizable column filtration. You can use your own filter-component or override the default filtration behaviour.
- Passing `react-table` props to the underlying engine as is. (not all the features are supported, see the list at the end)

## Client Side Table

The most basic usage of ClientTable:

```JSX
import {ClientTable} from '@tourmalinecore/react-table-responsive';

const data = [
    {
      name: 'name1',
      data: 'data1',
    },
    {
      name: 'name2',
      data: 'data2',
    },
  ];

const columns = [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Data',
      accessor: 'data',
    },
  ];

<ClientTable
  data={data}
  columns={columns}
  order = {{
    id: 'name',
    desc: false,
  }}
/>
```

## Configuration

| Name | Type | Default Value | Description |
|-|-|-|-|
| tableId | String | "" | Used for local state storing. Should be unique |
| data | Array\<any\> | [] | Data for table grouped by rows, it maps with **columns** by property key, using columns '*accessor field*'. Each object is a `row`: **key** - column id (use it in columns 'accessor' field), **value** - cell data |
| columns | Array\<Column\> | [] | Defines table's collumns. See the table below for more info |
| actions | Array\<Action\> | [] | Defines a special column for action-buttons. See the table below for more info |
| order | Object | {} | Sorting order |
| language | String \| Object | "en" | Language used for the navigation labels. Accepts "en"/"ru" or Object |
| renderMobileTitle | React.Component \| Function(Row) => JSX | () => null | Rows accordion head content for mobile view |
| maxStillMobileBreakpoint | Int | 800 | Breakpoint to toggle between mobile/desktop view |
| isStriped | Boolean | false | Sets striped rows view
| loading | Boolean | false | If true displays loader in place of table's content |
| onFiltersChange | Function(Array\<Filter\>) => any | () => null | Triggered when value of any filter is changed | 
| enableTableStatePersistance | Boolean | false | If true, filters and sortBy will be stored in memory and when you go back to the table its state will be initialized with it. It is stored in a const variable thus state dissapears on page reload |

> **NOTE**: You can also provide your custom props: anything you put into these options will automatically be available on the instance. E.g. if you provide a function, it will be available from the `Cell` renderers

### Column props

| Name | Type | Default Value | Description |
|-|-|-|-|
| Header | String | "" | Display name for the column 'th' |
| accessor | String \| Function(originalRow, rowIndex) => any | "" | Used to build the data model for your column. The data returned by an accessor should be primitive and sortable |
| Cell |  React.Component \| Function({row}) => JSX | ({ value }) => String(value) | Function for renedring cell's content. By default renders content of a property with the same name as the `accessor` as text |
| Footer | String \| Function \| React.Component => JSX | () => null | Renders column's footer. Receives the table instance and column model as props |
| filter | Function(rows, columnIds, filterValue) => Rows[] | (rows) => rows | Function used for the column filtration |
| Filter | React.Component \| Function() => JSX | () => null | Renders a component, that will be used for filtration in the column. By default text input is used |
| selectFilterOptions | Array\<Object\> | [] | If you use `SelectColumnFilter`, pass options with this property |
| minWidth | Int | 80 | Min limit for the resizing |
| width | Int | 150 | Used for both the flex-basis and flex-grow |
| maxWidth | Int | 400 | Max limit for the resizing |
| principalFilterableColumn | Boolean | true |  |
| nonMobileColumn | Boolean | true | Prevents column from showing on the mobile |
| noFooterColumn | Boolean | false | Prevents column from showing in the footer, if it is enabled |
| disableSortBy | Boolean | true | Disables sorting for the column |
| disableFilters | Boolean | true | Disables filtering for the column |

### Action props
| Name | Type | Default Value | Description |
|-|-|-|-|
| name | String | "" | Unique name for an action |
| show | Function({row}) => Boolean | () => null | Returns whether an action will be present for the row or not |
| renderIcon | React.Component \| Function({row}) => JSX | () => null | Renders action icon |
| renderText | Function({row}) => String | () => null | Returns text, that will be shown as a Tooltip for the icon |
| onClick | Function({row}) => any | () => null | Event triggered on action's click  |

# ServerTable
ServerTable is pretty much the same as the ClientTable, but instead of using the whole data at once, it loads data partially from an external source.

```JSX
import {ServerTable} from '@tourmalinecore/react-table-responsive'

<ServerTable
  tableId="uniq-table-id"
  columns={[]}
  actions={[]}

  // this props for api calls
  apiHostUrl="https://hosturl"
  dataPath="/api-endpoint"
  requestMethod="GET"
/>
```

## Configuration
ServerTable uses some unique props in addition to what client table has:

| Name | Type | Default Value | Description |
|-|-|-|-|
| refresh | Boolean | false | Toggle it in any way to trigger table refresh |
| apiHostUrl | String | "" | URL of your API |
| dataPath | String | "" | The path to the specific endpoint from which the data will be requested |
| authToken | String | "" | Authentication token if needed |
| requestMethod | String | "GET" | Request method used by endpoint |
| requestData | Object | {} | Data for requests with body | 
| onPageDataLoaded | Function | () => null | Triggered when value requested data is loaded | 

## Request data

If you want to use default GET request method you will need to ensure that your backend endpoint can process query consisting of the parameters below:

| Name | Type  | Description |
|-|-|-|
| draw | Int |  |
| page | Int | Number of page to take |
| pageSize | Int | Number that defines size of the pages |
| orderBy | String | Property name used for sorting |
| orderingDirection | String | Any string for ascending order and 'desc' for descending |
| filteredByColumns | Array\<String\> | List of property names to be used for filtering separated by coma. This names are taken from the provided *columns* list.
| filteredByValues | Array\<String\> | List of property values to be used for filtering separated by coma. Thier indexes  correspond with the ones from the *filteredByColumns* array |

Example:
```
https://{app-url}/{endpoint}?draw=2&page=1&pageSize=10&orderBy=name&orderingDirection=desc&filteredByColumns=Name,Surname&filteredByValues=John,Smith
```

# Select Column Filter

**SelectColumnFilter** allows to filter data by properties with a known set of values, such as status types. Set `Filter` property to **SelectColumnFilter** and define `selectFilterOptions` array, like in the example.

**NOTE**: To add "All" option in the list, you need to add object with an empty string value to Options array.

```JSX
import {ClientTable, SelectColumnFilter} from '@tourmalinecore/react-table-responsive';

const columns = [
    {
      Header: 'Status',
      accessor: 'status',
      Filter: SelectColumnFilter,
      selectFilterOptions: [
        {
          label: 'All',
          value: '',
        }, 
        {
          label: 'Approved',
          value: 1,
        },
        {
          label: 'Declined',
          value: 2,
        }
      ],
    },
  ];
```

# List of unsupported features from react-table
- Multi-Column sorting 
- Virtualization