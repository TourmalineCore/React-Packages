# React-Table-Responsive

Mobile friendly react table component based on [react-table](https://github.com/tannerlinsley/react-table) using its useFlexLayout hook.

## [Demo](https://tourmalinecore.github.io/React-Packages/?path=/story/table--client-side-desktop)

# Table of Content

- [Instalation](#Instalation)
- [Features](#Main-Package-Features)
- [Client Side Table](#Client-Side-Table)
  - [Configuration](#Configuration)
    - [Column props](#Column-props)
  - [Sorting](#Sorting)
  - [Filtration](#Filtration)
    - [Select Column Filter](#Select-Column-Filter)
  - [Actions](#Actions)
    - [Action props](#Action-props)
  - [Table State Persistance](#Table-State-Persistance)
- [Server Side Table](#Server-Side-Table)
  - [Table Refresh](#Table-Refresh)
  - [Configuration](#Configuration)
  - [Request data](#Request-data)
- [Unsupported features from react-table](#Unsupported-features-from-react-table)

# Instalation

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


# Main Package Features
- Table that supports **client** side pagination/sorting/filtration. [Go to section](#client-side-table)
- Table that supports **server** side pagination/sorting/filtration. [Go to section](#server-side-table)
- Single column sorting. [Go to section](#sorting)
- Optional persistance of selected sorting, filters, page size, etc. by storing them in the LS.
- Different pagination strategy between mobile and desktop versions of the table.
- Total amount of rows in the footer of the table.
- Actions column. Easy way to create interactive table by adding action buttons to each row. [Go to section](#actions)
- External trigger of the server side table data reloading. [Go to section](#refresh-table)
- Customizable column filtration. You can use your own filter-component or override the default filtration behaviour. [Go to section](#filters)
- Passing `react-table` props to the underlying engine as is. (not all the features are supported, see the list [here](#unsupported-features-from-react-table))

# Client Side Table

The most basic usage of the ClientTable:

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

return(
  <ClientTable
    tableId="uniq-table-id"
    data={data}
    columns={columns}
  />
);
```

## Configuration

| Name | Type | Default Value | Description |
|-|-|-|-|
| tableId | String | "" | **Required parameter.** Used to differentiate the state of a table among the other table instances. Should be unique |
| data | Array\<any\> | [] | Data for table grouped by rows, it maps with **columns** by property key, using columns '*accessor field*'. Each object is a `row`: **key** - column id (use it in columns 'accessor' field), **value** - cell data |
| columns | Array\<Column\> | [] | Defines table's collumns. See the table below for more info |
| actions | Array\<Action\> | [] | Defines a special column for action-buttons. See the table below for more info |
| order | Object | {} | Sorting order |
| language | String \| Object | "en" | Language used for the navigation labels. Accepts "en"/"ru" or Object containing translation for all necessary strings ([example](https://github.com/TourmalineCore/React-Packages/blob/feature/readme-update/packages/react-table-responsive/src/i18n/en.js)) |
| renderMobileTitle | React.Component \| Function(Row) => JSX | () => null | Rows accordion head content for mobile view |
| maxStillMobileBreakpoint | Int | 800 | Breakpoint to toggle between mobile/desktop view |
| isStriped | Boolean | false | Sets striped rows view
| loading | Boolean | false | If true displays loader in place of table's content |
| onFiltersChange | Function(Array\<Filter\>) => any | () => null | Triggered when value of any filter is changed |
| enableTableStatePersistance | Boolean | false | If true, selected filters, ordering and current page will be stored in memory and when user goes back to the table its state will be initialized with it. It is stored in a const variable thus state dissapears on page reload |

> **NOTE**: You can also provide your custom props: anything you put into these options will automatically be available on the instance. E.g. if you provide a function, it will be available from the `Cell` renderers

### Column props

| Name | Type | Default Value | Description |
|-|-|-|-|
| Header | String | "" | Display name for the column 'th' |
| accessor | String \| Function(originalRow, rowIndex) => any | "" | Used to build the data model for your column. The data returned by an accessor should be primitive and sortable |
| Cell |  React.Component \| Function({row}) => JSX | ({ value }) => String(value) | Function for renedring cell's content. By default renders content of a property with the same name as the `accessor` as text |
| Footer | String \| React.Component \| Function => JSX | () => null | Renders column's footer. Receives the table instance and column model as props |
| filter | Function(rows: Array\<Row\>, columnIds: Array\<ColumnId: String\>, filterValue) => Rows[] | "text" | Function used for the column filtration. If a string is passed, the function with that name will be used from either the custom filterTypes table option (if specified) or from the built-in filtering types object. |
| Filter | React.Component \| Function() => JSX | () => null | Receives the table instance and column model as props. Renders a component, that will be used for filtration in the column. By default text input is used |
| selectFilterOptions | Array\<Object\> | [] | If you use `SelectColumnFilter`, pass options with this property |
| minWidth | Int | 80 | Min limit for the resizing |
| width | Int | 150 | Used for both the flex-basis and flex-grow |
| maxWidth | Int | 400 | Max limit for the resizing |
| principalFilterableColumn | Boolean | true |  |
| nonMobileColumn | Boolean | true | Prevents column from showing on the mobile |
| noFooterColumn | Boolean | false | Prevents column from showing in the footer, if it is enabled |
| disableSortBy | Boolean | true | Disables sorting for the column |
| disableFilters | Boolean | true | Disables filtering for the column |

> **NOTE**: You can find more info about react-table props on [official docs](https://react-table.tanstack.com/docs/api/overview).

## Sorting

This package implements single-column sorting. You can use by adding `order` property to the Table. It accepts object with such props as `id` (accessor of the property) and `desc` (determines sorting direction).

```JSX
<ClientTable
  tableId="uniq-table-id"
  data={data}
  columns={columns}
  order={{
    id: 'name',
    desc: false,
  }}
/>
```

## Filtration

You can use your own filtration function for standard text input filter:

```JSX
const columns = [
    {
      Header: 'Status',
      accessor: 'status',
      filter: (rows, columnIds, filterValue) => rows.filter(row.original.status === filterValue),
    },
  ];
```
**OR** you can implement a whole new Filter component:

```JSX
function CustomFilter ({
  column: {
    id,
    filterValue,
    setFilter,
  },
  filterValueOverride,
  setFilterOverride,
  inputPlaceholder,
  }) {
    return (
      <Select
        value={setFilterOverride ? filterValueOverride : filterValue}
        options={selectFilterOptions}
        onChange={(e) => {
          const newFilterValue = e.target.value;

          if (setFilterOverride) {
            setFilterOverride(id, newFilterValue);
          } else {
            setFilter(newFilterValue);
          }
        }}
      />
  );
}

const columns = [
    {
      Header: 'Status',
      accessor: 'status',
      Filter: CustomFilter,
    },
  ];
```

### Select Column Filter

This package also contains ready-to-use **SelectColumnFilter**, that allows you to filter data by properties with a known set of values, such as status types. Set `Filter` property to **SelectColumnFilter** and define `selectFilterOptions` array, like in the example.

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

## Actions

```JSX

const data = [
    {
      name: 'name1',
      data: 'data1',
    },
    {
      name: 'name2',
      data: 'data2',
      canBeDownloaded: true,
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

const actions = [
  {
    name: 'open-dictionaries-action',
    show: () => true,
    renderText: () => 'Open Dictionaries',
    onClick: (e, row) => console.log(`Opening Dictionaries for ${row.original.name}`),
  },
  {
    name: 'download-action',
    show: (row) => row.original.canBeDownloaded,
    renderIcon: () => <span>&darr;</span>,
    renderText: (row) => `Download ${row.original.name}`,
    onClick: (e, row) => console.log(`Downloading ${row.original.name}`),
  },
];

return (
  <ClientTable
    tableId="uniq-table-id"
    data={data}
    columns={columns}
    actions={actions}
  />
);
```

### Action props
| Name | Type | Default Value | Description |
|-|-|-|-|
| name | String | "" | Unique name for an action |
| show | Function(row) => Boolean | () => null | Returns whether an action will be present for the row or not |
| renderIcon | React.Component \| Function(row) => JSX | () => null | Renders action icon |
| renderText | Function(row) => String | () => null | Returns text, that will be shown as a Tooltip for the icon |
| onClick | Function(event, row) => any | () => null | Event triggered on action's click  |


## Table State Persistance

In order not to force the user to choose page size value every time they visit the page, Table instance always stores that value in the Local Storage.

By setting table's property `enableTableStatePersistance` to **true** you
tell the table to store other settings (filters, sorting and current page)
in a const variable, that will be reseted on page reload, but persist between pages in apps with a client-side routing.

# Server Side Table

ServerTable is pretty much the same as the ClientTable, but instead of using the whole data at once, it loads data partially from an external source.

```JSX
import {ServerTable} from '@tourmalinecore/react-table-responsive'

return (
  <ServerTable
    tableId="uniq-table-id"
    columns={[]}
    actions={[]}

    // this props for api calls
    apiHostUrl="https://hosturl"
    dataPath="/api-endpoint"
    requestMethod="GET"
  />
);
```

## Table Refresh

You can manually invoke a table's data update by using the `refresh` property:

```JSX
const [refresh, setRefresh] = useState(false);

return (
  <div>
    <button onClick={() => setRefresh(!refresh)}>
      Refresh Table
    </button>
    <ServerTable
      tableId="uniq-table-id"
      columns={columns}
      actions={actions}

      refresh={refresh}
      apiHostUrl="https://hosturl"
      dataPath="/api-endpoint"
      requestMethod="GET"
    />
  </div>
)
```


## Configuration
ServerTable uses some unique props in addition to what client table has:

| Name | Type | Default Value | Description |
|-|-|-|-|
| refresh | Boolean | false | Toggle it in any way to trigger table refresh |
| httpClient | instance of axios | axios | For now it only applies instance of axios, you can pass your own axios instance with config, interceptors etc. |
| apiHostUrl | String | "" | URL of your API |
| dataPath | String | "" | The path to the specific endpoint from which the data will be requested |
| authToken | String | "" | Authentication token if needed |
| requestMethod | String | "GET" | Request method used by endpoint |
| requestData | Object | {} | Data for requests with body |
| customDataLoader | async Function | undefined | Pass async function here to rewrite table data loading logic, should return Promise |
| onPageDataLoaded | Function | () => null | Triggered when value requested data is loaded |

### customDataLoader params
```ts
type Params = {
  draw: number,
  page: number,
  pageSize: number,
  orderBy: string,
  orderingDirection: 'desc' | 'asc',
  filteredByColumns: string[],
  filteredByValues: string[],
}

type CustomDataLoader = ({
  url: string,
  method: string,
  headers: {
    [key: string]: string
  },
  params: Params,
  data: {},
  paramsSerializer: (params: Params) => string,
}) => Promise<{
  draw: number,
  list: {
    [tableDataKey: string]: string | number
  }[],
  totalCount: number,
}>
```

## Request data

If you want to use default GET request method you will need to ensure that your backend endpoint can process query consisting of the parameters below:

| Name | Type | Description |
|-|-|-|
| draw | int | Used as query identifier to ensure queries are being executed in correct order  |
| page | int | Number of page to take |
| pageSize | int | Number that defines size of the pages |
| orderBy | string | Property name used for sorting |
| orderingDirection | string | Any string for ascending order or 'desc' for descending |
| filteredByColumns | string[] | Collection of property names to be used for filtering separated by coma |
| filteredByValues | string[] | Collection of property values to be used for filtering separated by coma. Thier indexes must correspond with the ones from the *filteredByColumns* array |

Example:
```
https://{app-url}/{endpoint}?draw=2&page=1&pageSize=10&orderBy=name&orderingDirection=desc&filteredByColumns=Name,Surname&filteredByValues=John,Smith
```

**Curl**
```
curl --location -g --request GET 'https://{app url}/{endpoint}?draw=2&page=1&pageSize=10&orderBy=name&orderingDirection=desc&filteredByColumns=Name,Surname&filteredByValues=John,Smith' \
--header 'Authorization: {your aut token}'
```

# Unsupported features from react-table
- Multi-Column sorting
- Virtualization