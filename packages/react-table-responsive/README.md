# React-Table-Responsive

It's a documentation for version > 1.0.0. If you are using version < 1.0.0, see the old documentation [here](./OLD-README.md).

Mobile-friendly react table component based on [react-table](https://github.com/tannerlinsley/react-table).

## [Demo](https://tourmalinecore.github.io/React-Packages/?path=/story/table--client-side-desktop)

# Table of Contents

- [Installation](#Instalation)
- [Features](#Main-Package-Features)
- [Client Side Table](#Client-Side-Table)
  - [Configuration](#Configuration)
    - [Column props](#Column-props)
  - [Sorting](#Sorting)
  - [Filtration](#Filtration)
    - [Select Column Filter](#Select-Column-Filter)
  - [Actions](#Actions)
    - [Action props](#Action-props)
  - [Table State Persistance](#table-state-persistence)
- [Server Side Table](#Server-Side-Table)
  - [Table Refresh](#Table-Refresh)
  - [Configuration](#Configuration)
  - [Request data](#Request-data)
- [Unsupported features from react-table](#Unsupported-features-from-react-table)

# Installation

The package can be installed via npm:
```
npm install @tourmalinecore/react-table-responsive --save
```

Or via yarn:
```
yarn add @tourmalinecore/react-table-responsive
```

### Do not forget to import styles if you want to use the default styling.
They should be imported once in your root component:
```JSX
import '@tourmalinecore/react-table-responsive/es/index.css';
import '@tourmalinecore/react-tc-modal/es/index.css';
import '@tourmalinecore/react-tc-ui-kit/es/index.css';
```

> **NOTE**: You may want to re-style on your own. In that case you don't have to import the styles.


# Main Package Features
- Table that supports **client** side pagination/sorting/filtration. [Go to section](#client-side-table)
- Table that supports **server** side pagination/sorting/filtration. [Go to section](#server-side-table)
- Single column sorting. [Go to section](#sorting)
- Optional persistence of selected sorting, filters, page size, etc. by storing them in the Local Storage.
- Different pagination strategies between mobile and desktop versions of the table.
- Total amount of rows in the footer of the table.
- Actions column. Easy way to create an interactive table by adding action buttons to each row. [Go to section](#actions)
- External trigger of the server side table data reloading. [Go to section](#refresh-table)
- Customizable column filtration. You can use your own filter component or override the default filtration behavior. [Go to section](#filters)
- Passing `react-table` props to the underlying engine as is. (not all the features are supported, see the list [here](#unsupported-features-from-react-table))

# Client Side Table

The most basic usage of the ClientTable:

```JSX
import {ClientTable} from '@tourmalinecore/react-table-responsive';

type MyData = {
  name: string;
  data: string;
} 

const data: MyData[] = [
    {
      name: 'name1',
      data: 'data1',
    },
    {
      name: 'name2',
      data: 'data2',
    },
  ];

return (
  <ClientTable<MyData>
    tableId="unique-table-id"
    data={data}
    columns={[
      {
        id: 'Name',
        header: `Name`,
        accessorFn: (row) => row.name,
      },
      {
        id: 'Data',
        header: `Data`,
        accessorFn: (row) => row.data,
      },
    ]}
    tcOrder={{
      id: `Name`,
      desc: true,
    }}
    tcRenderMobileTitle={(row) => row.original.name}
  />
);
```

## Configuration
| Name | Type | Default Value | Description |
|-|-|-|-|
| tableId | String | "" | **Required parameter.** Used to differentiate the state of the table from other table instances. Should be unique. |
| data | Array\<any\> | [] | Data for table grouped by rows, it maps with **columns** by property key, using columns '*accessor field*'. Each object is a `row`: **key** - column id (use it in columns 'accessor' field), **value** - cell data. |
| columns | Array\<[Column](#Column-props)\> | [] | Defines table's columns. See the [table](#Column-props) below for more info. |
| tcActions | Array\<[Action](#Action-props)\> | [] | Defines a special column for action-buttons. See [here](#Actions) for more info. |
| tcOrder | [ColumnSort](https://tanstack.com/table/v8/docs/guide/sorting#sorting-state)  | undefined | **Required parameter.** Sorting order. |
| tcLanguage | "en" \| "ru" | "en" | The language used for navigation labels. Accepts "en"/"ru" or Object containing translation for all required strings ([example](https://github.com/TourmalineCore/React-Packages/blob/feature/readme-update/packages/react-table-responsive/src/i18n/en.js)) |
| tcRenderMobileTitle | ([Row](https://tanstack.com/table/v8/docs/api/core/row)) => ReactNode | () => null | Row's accordion head content for mobile view. |
| tcMaxStillMobileBreakpoint | Number | 800 | A breakpoint to toggle between mobile/desktop view. |
| tcIsStriped | Boolean | false | Sets striped rows view.
| tcLoading | Boolean | false | If true, displays a loader in place of a table's content. |
| tcOnFiltersChange | ([filters](https://tanstack.com/table/v8/docs/api/features/column-filtering)) => void | () => null | Triggered when value of any filter is changed. |
| tcEnableTableStatePersistence | Boolean | false | If true, selected filters, ordering, and current page will be stored in memory and when the user goes back to the table, its state will be initialized with it. It is stored in a const variable, thus the state disappears on page reload. |
| tcPageSizeOptions | Number[] | [10, 20, 50, 100] | You can override the default page size. |

### Column Props

| Name | Type | Default Value | Description |
|-|-|-|-|
| id |  String | undefined | **Required props**. For a server table the id should be identical to the field in the API contract.|
| [header](https://tanstack.com/table/v8/docs/api/core/column-def#header) |  String \| (header) => unknown | undefined | Displays name for the column 'th'. |
| [accessorFn](https://tanstack.com/table/v8/docs/api/core/column-def#accessorfn) | (originalRow, index) => any | undefined | Used to build the data model for your column. The data returned by an accessorFn should be primitive and sortable. |
| [cell](https://tanstack.com/table/v8/docs/api/core/column-def#cell) | String \| (cell) => unknown | undefined | A function for rendering cell's content. By default renders the content of a property with the same name as the `accessorFn` as text. |
| [footer](https://tanstack.com/table/v8/docs/api/core/column-def#footer) | String \| (footer) => unknown | undefined | Renders column's footer. Receives the table instance and column model as props. |
| [filterFn](https://tanstack.com/table/v8/docs/api/features/column-filtering#filterfn) | FilterFn \| keyof FilterFns \| keyof BuiltInFilterFns | 'auto'| A function used for column filtration. If a string is passed, the function with that name will be used from either the custom filterTypes table option (if specified) or from the built-in filtering types object. |
| tcFilter | (context: HeaderContext) => ReactNode | undefined | Receives the table instance and column model as props. Renders a component that will be used for filtration in the column. A text input is used by default. |
| tcSelectFilterOptions | Array\<Object\> | [] | If you are using `SelectColumnFilter`, pass options with this property. |
| minSize | Number | 80 | The minimum allowed size for the column. |
| size | Number | 150 | The desired size for the column. |
| maxSize | Number | 400 | The maximum allowed size for the column. |
| tcPrincipalFilterableColumn | Boolean | undefined | The flag which allows to filter through a column on mobile. It adds a search field in the table header. Only one column can have this flag. |
| tcNonMobileColumn | Boolean | undefined | Prevents column from showing on mobile. |
| tcNoFooterColumn | Boolean | undefined | Prevents column from showing in the footer. |
| enableSorting | Boolean | false | Enables sorting for the column. |
| enableColumnFilter | Boolean | false | Enables filtering for the column. |

> **NOTE**: You can find more info about react-table props in the [official docs](https://tanstack.com/table/v8/docs/overview).

## Sorting

This package implements a single-column sorting. You can use it by adding `tcOrder` property to the table. It accepts an object with such props as `id` and `desc` (determines sorting direction).

```JSX
<ClientTable
  tableId="unique-table-id"
  data={data}
  columns={[
    {
      id: `Name`,
      header: `Name`,
      accessorFn: (row) => row.name,
      enableSorting: true,
    },
    {
      id: `Data`,
      header: `Data`,
      accessorFn: (row) => row.data,
    },
  ]}
  tcOrder={{
    id: 'Name',
    desc: false,
  }}
/>
```

## Filtration

You can use your own filtration function for default text input filter:

```js
const columns = [
    {
      id: 'Status',
      header: 'Status',
      accessorFn: (row) => row.status,
      enableColumnFilter: true,
      filterFn: (rows, _, filterValue) => rows.original.status === filterValue,
    },
  ];
```

**ALSO** you can implement a whole new Filter component, for example SelectColumnFilter:

```JSX
function SelectColumnFilter<TData>({
  column,
  filterValueOverride,
  setFilterOverride,
}: {
  column: Column<TData, unknown>,
  filterValueOverride?: string | number,
  setFilterOverride?: (id: string, value: string) => unknown,
}) {
  const columnFilterValue = column.getFilterValue()

  return (
    <Select
      value={(setFilterOverride ? filterValueOverride : columnFilterValue) as string | number}
      dataCy={`table-select-${column.id}`}
      options={column.columnDef.tcSelectFilterOptions ?? []}
      onChange={(e) => {
        if (setFilterOverride) {
          setFilterOverride(column.id, e.target.value)
        } else {
          column.setFilterValue(e.target.value)
        }
      }}
    />
  )
}
```


You can override the default text input filter the following way:

```js
const columns = [
  {
    id: 'Status',
    header: 'Status',
    accessorFn: (row) => row.status,
    enableColumnFilter: true,
    tcFilter: SelectColumnFilter,
  },
];
```

### Select Column Filter

This package also contains ready-to-use **SelectColumnFilter**, which allows you to filter data by properties with a known set of values, such as status types. Set `tcFilter` property to **SelectColumnFilter** and define `tcSelectFilterOptions` array, like in the example.

**NOTE**: To add "All" option in the list, you need to add an object with an empty string value to options array.

```JSX
import {ClientTable, SelectColumnFilter} from '@tourmalinecore/react-table-responsive';

const columns = [
    {
      id: 'Status',
      header: 'Status',
      accessorFn: (row) => row.status,
      tcFilter: SelectColumnFilter,
      tcSelectFilterOptions: [
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

This package allows to add actions columns with `tcActions` property:

```JSX

type MyData = {
  name: string;
  data: string;
  canBeDownloaded?: boolean;
}

const data: MyData[] = [
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

return (
  <ClientTable<MyData>
    tableId="unique-table-id"
    data={data}
    columns={[
      {
        id: 'Name',
        header: 'Name',
        accessorFn: (row) => row.name
      },
      {
        id: 'Data',
        header: 'Data',
        accessorFn: (row) => row.data
      },
    ]}
     tcOrder={{
      id: 'Name',
      desc: false,
    }}
    tcActions={[
      {
        name: `open-dictionaries-action`,
        show: () => true,
        renderText: () => `Open Dictionaries`,
        onClick: (e, row) => console.log(`Opening Dictionaries for ${row.original.name}`),
      },
      {
        name: `download-action`,
        show: (row) => !!row.original.canBeDownloaded,
        renderIcon: () => <span>&darr;</span>,
        renderText: (row) => `Download ${row.original.name}`,
        onClick: (e, row) => console.log(`Downloading ${row.original.name}`),
      },
    ]}
  />
);
```

### Action Props
| Name | Type | Default Value | Description |
|-|-|-|-|
| name | String | - | Unique name for an action. |
| show | (row) => Boolean | - | Returns whether an action will be present for the row or not. |
| renderIcon | (row) => ReactElement | undefined | Renders an action icon in the action popup. |
| renderText | (row) => String | - | Returns the text that will be shown in the action popup. |
| onClick | (event, row) => any | undefined | The event triggered on the action's click.  |


## Table State Persistence

In order not to make the user select the page size value every time they visit the page, the table instance always stores that value in the Local Storage.

By setting the table's property `tcEnableTableStatePersistence` to **true** you
tell the table to store other settings (filters, sorting, current page)
in a const variable, that will be reset on page reload, but persist between pages in apps with a client-side routing.

# Server Side Table

ServerTable is pretty much the same as the ClientTable, but instead of using the whole data at once, it loads the data partially from an external source.

```JSX
import {ServerTable} from '@tourmalinecore/react-table-responsive'

return (
  <ServerTable
    tableId="unique-table-id"
    columns={[]}
    tcOrder={{
      id: '',
      desc: false,
    }}

    // props for API calls
    tcApiHostUrl="https://hosturl"
    tcDataPath="/api-endpoint"
    tcRequestMethod="GET"
  />
);
```

## Table Refresh

You can manually invoke a table's data update by using the `tcRefresh` property:

```JSX
const [refresh, setRefresh] = useState(false);

return (
  <div>
    <button onClick={() => setRefresh(!refresh)}>
      Refresh Table
    </button>
    <ServerTable
      tableId="unique-table-id"
      columns={[]}
      tcOrder={{
        id: '',
        desc: false,
      }}
      tcRefresh={refresh}
      tcApiHostUrl="https://hosturl"
      tcDataPath="/api-endpoint"
      tcRequestMethod="GET"
    />
  </div>
)
```

## Configuration
ServerTable uses some unique props in addition to what the client table has:

| Name | Type | Default Value | Description |
|-|-|-|-|
| tcRefresh | Boolean | false | Toggle it in any way to trigger the table's refresh. |
| tcHttpClient | instance of axios | axios | For now it only applies the instance of axios, you can pass your own axios instance with config, interceptors, etc. |
| tcApiHostUrl | String | "" | URL of your API. |
| tcDataPath | String | "" | The path to the specific endpoint from which the data will be requested. |
| tcAuthToken | String | "" | Provides an authentication token if needed. |
| tcRequestMethod | String | "GET" | The request method used by the endpoint. |
| tcRequestData | Object | {} | Data for requests with body. |
| tcCustomDataLoader | CustomDataLoader | undefined | Pass an async function here to rewrite the table data loading logic. Should return a Promise. |
| tcOnPageDataLoaded | (data) => void | () => null | Triggered when the requested data is loaded. |

### tcCustomDataLoader Types
```js
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
  url,
  method,
  headers,
  params,
  data,
  paramsSerializer,
}: {
  url: string,
  method: 'POST' | 'GET',
  headers: {
    [key: string]: string,
  },
  params: Params,
  data: object,
  paramsSerializer: (params: Params) => string,
}) => Promise<{
  data: {
    draw: number,
    list: {
      [tableDataKey: string]: string | number,
    }[],
    totalCount: number
  },
}>
```

## Query Parameters for Data Requests

If you want to use the default GET request method, you will need to ensure that your backend endpoint can process queries consisting of the following parameters:

| Name | Type | Description |
|-|-|-|
| draw | Number | Used as a query identifier to ensure queries are being executed in the correct order.  |
| page | Number | Number of the page to take. |
| pageSize | Number | Determines the number of entries on the page. |
| orderBy | String | Property name used for sorting. |
| orderingDirection | String | Any string for ascending order or 'desc' for descending. |
| filteredByColumns | String[] | Collection of property names to be used for filtering separated by comma. |
| filteredByValues | String[] | Collection of property values to be used for filtering separated by comma. Their indexes must correspond with the ones from the *filteredByColumns* array. |

Example:
```
https://{app-url}/{endpoint}?draw=2&page=1&pageSize=10&orderBy=name&orderingDirection=desc&filteredByColumns=Name&filteredByColumns=Surname&filteredByValues=John&filteredByValues=Smith
```

**Curl**
```
curl --location -g --request GET 'https://{app url}/{endpoint}?draw=2&page=1&pageSize=10&orderBy=name&orderingDirection=desc&filteredByColumns=Name&filteredByColumns=Surname&filteredByValues=John&filteredByValues=Smith' \
--header 'Authorization: {your auth token}'
```

# Unsupported Features from react-table
- Multi-column sorting
- Virtualization
- Resizing