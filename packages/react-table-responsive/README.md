# React-Table-Responsive

It's documentation for version > 1.0.0. If you are using version < 1.0.0, see old documentation [here](./OLD-README.md).

Mobile friendly react table component based on [react-table](https://github.com/tannerlinsley/react-table) using its useFlexLayout hook.

## [Demo](https://tourmalinecore.github.io/React-Packages/?path=/story/table--client-side-desktop)

# Table of Content

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
- Optional persistence of selected sorting, filters, page size, etc. by storing them in the LS.
- Different pagination strategy between mobile and desktop versions of the table.
- Total amount of rows in the footer of the table.
- Actions column. Easy way to create interactive table by adding action buttons to each row. [Go to section](#actions)
- External trigger of the server side table data reloading. [Go to section](#refresh-table)
- Customizable column filtration. You can use your own filter-component or override the default filtration behavior. [Go to section](#filters)
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
        header: `Name`,
        accessorFn: (row) => row.name,
      },
      {
        header: `Data`,
        accessorFn: (row) => row.data,
      },
    ]}
    tcRenderMobileTitle={(row) => row.original.name}
  />
);
```

## Configuration
| Name | Type | Default Value | Description |
|-|-|-|-|
| tableId | String | "" | **Required parameter.** Used to differentiate the state of a table among the other table instances. Should be unique |
| data | Array\<any\> | [] | Data for table grouped by rows, it maps with **columns** by property key, using columns '*accessor field*'. Each object is a `row`: **key** - column id (use it in columns 'accessor' field), **value** - cell data |
| columns | Array\<[Column](#Column-props)\> | [] | Defines table's columns. See the table below for more info |
| tcActions | Array\<[Action](#Action-props)\> | [] | Defines a special column for action-buttons. See the table below for more info |
| tcOrder | [ColumnSort](https://tanstack.com/table/v8/docs/guide/sorting#sorting-state)  | { desc: false; id: ''; } | Sorting order |
| tcLanguage | "en" \| "ru" | "en" | Language used for the navigation labels. Accepts "en"/"ru" or Object containing translation for all necessary strings ([example](https://github.com/TourmalineCore/React-Packages/blob/feature/readme-update/packages/react-table-responsive/src/i18n/en.js)) |
| tcRenderMobileTitle | ([Row](https://tanstack.com/table/v8/docs/api/core/row)) => ReactNode | () => null | Rows accordion head content for mobile view |
| tcMaxStillMobileBreakpoint | Number | 800 | Breakpoint to toggle between mobile/desktop view |
| tcIsStriped | Boolean | false | Sets striped rows view
| tcLoading | Boolean | false | If true displays loader in place of table's content |
| tcOnFiltersChange | ([filters](https://tanstack.com/table/v8/docs/api/features/column-filtering)) => void | () => null | Triggered when value of any filter is changed |
| tcEnableTableStatePersistence | Boolean | false | If true, selected filters, ordering and current page will be stored in memory and when user goes back to the table its state will be initialized with it. It is stored in a const variable thus state disappears on page reload |
| tcPageSizeOptions | Number[] | [10, 20, 50, 100] | You can override the default page size |

### Column props

| Name | Type | Default Value | Description |
|-|-|-|-|
| [header](https://tanstack.com/table/v8/docs/api/core/column-def#header) |  String \| (header) => unknown | undefined | Display name for the column 'th' |
| [accessorFn](https://tanstack.com/table/v8/docs/api/core/column-def#accessorfn) | (originalRow, index) => any | undefined | Used to build the data model for your column. The data returned by an accessor should be primitive and sortable |
| [cell](https://tanstack.com/table/v8/docs/api/core/column-def#cell) | String \| (cell) => unknown | undefined | Function for rendering cell's content. By default renders content of a property with the same name as the `accessorFn` as text |
| [footer](https://tanstack.com/table/v8/docs/api/core/column-def#footer) | String \| (footer) => unknown | undefined | Renders column's footer. Receives the table instance and column model as props |
| [filterFn](https://tanstack.com/table/latest/docs/api/features/column-filtering#filterfn) | FilterFn \| keyof FilterFns \| keyof BuiltInFilterFns | undefined| Function used for the column filtration. If a string is passed, the function with that name will be used from either the custom filterTypes table option (if specified) or from the built-in filtering types object. |
| tcFilter | (context: HeaderContext) => ReactNode | undefined | Receives the table instance and column model as props. Renders a component, that will be used for filtration in the column. By default text input is used |
| tcSelectFilterOptions | Array\<Object\> | [] | If you use `SelectColumnFilter`, pass options with this property |
| minSize | Number | 80 | The minimum allowed size for the column |
| size | Number | 150 | The desired size for the column|
| maxSize | Number | 400 | The maximum allowed size for the column |
| tcPrincipalFilterableColumn | Boolean | undefined | Flag which allows to filter through a column on mobile. It adds a search field in table header. Only one column can have this flag |
| tcNonMobileColumn | Boolean | undefined | Prevents column from showing on the mobile |
| tcNoFooterColumn | Boolean | undefined | Prevents column from showing in the footer, if it is enabled |
| enableSorting | Boolean | false | Enables sorting for the column |
| enableColumnFilter | Boolean | false | Enables filtering for the column |

> **NOTE**: You can find more info about react-table props on [official docs](https://tanstack.com/table/v8/docs/overview).

## Sorting

This package implements single-column sorting. You can use by adding `tcOrder` property to the Table. It accepts object with such props as `id` and `desc` (determines sorting direction).

```JSX
<ClientTable
  tableId="unique-table-id"
  data={data}
  columns={[
    {
      header: `Name`,
      accessorFn: (row) => row.name,
      enableSorting: true,
    },
    {
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
    header: 'Status',
    accessorFn: (row) => row.status,
    enableColumnFilter: true,
    tcFilter: SelectColumnFilter,
  },
];
```

### Select Column Filter

This package also contains ready-to-use **SelectColumnFilter**, that allows you to filter data by properties with a known set of values, such as status types. Set `tcFilter` property to **SelectColumnFilter** and define `tcSelectFilterOptions` array, like in the example.

**NOTE**: To add "All" option in the list, you need to add object with an empty string value to Options array.

```JSX
import {ClientTable, SelectColumnFilter} from '@tourmalinecore/react-table-responsive';

const columns = [
    {
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
        header: 'Name',
        accessorFn: (row) => row.name
      },
      {
        header: 'Data',
        accessorFn: (row) => row.data
      },
    ]}
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

### Action props
| Name | Type | Default Value | Description |
|-|-|-|-|
| name | String | - | Unique name for an action |
| show | (row) => Boolean | - | Returns whether an action will be present for the row or not |
| renderIcon | (row) => ReactElement | undefined | Renders action icon in action popup |
| renderText | (row) => String | - | Returns text, that will be shown in action popup |
| onClick | (event, row) => any | undefined | Event triggered on action's click  |


## Table State Persistence

In order not to force the user to choose page size value every time they visit the page, Table instance always stores that value in the Local Storage.

By setting table's property `tcEnableTableStatePersistence` to **true** you
tell the table to store other settings (filters, sorting and current page)
in a const variable, that will be reset on page reload, but persist between pages in apps with a client-side routing.

# Server Side Table

ServerTable is pretty much the same as the ClientTable, but instead of using the whole data at once, it loads data partially from an external source.

```JSX
import {ServerTable} from '@tourmalinecore/react-table-responsive'

return (
  <ServerTable
    tableId="unique-table-id"
    columns={[]}
    // this props for api calls
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
      columns={columns}
      tcRefresh={refresh}
      tcApiHostUrl="https://hosturl"
      tcDataPath="/api-endpoint"
      tcRequestMethod="GET"
    />
  </div>
)
```


## Configuration
ServerTable uses some unique props in addition to what client table has:

| Name | Type | Default Value | Description |
|-|-|-|-|
| tcRefresh | Boolean | false | Toggle it in any way to trigger table refresh |
| tcHttpClient | instance of axios | axios | For now it only applies instance of axios, you can pass your own axios instance with config, interceptors, etc. |
| tcApiHostUrl | String | "" | URL of your API |
| tcDataPath | String | "" | The path to the specific endpoint from which the data will be requested |
| tcAuthToken | String | "" | Authentication token if needed |
| tcRequestMethod | String | "GET" | Request method used by endpoint |
| tcRequestData | Object | {} | Data for requests with body |
| tcCustomDataLoader | CustomDataLoader | undefined | Pass async function here to rewrite table data loading logic, should return Promise |
| tcOnPageDataLoaded | (data) => void | () => null | Triggered when requested data is loaded |

### tcCustomDataLoader types
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
  },
}>
```

## Query parameters for data requests

If you want to use default GET request method you will need to ensure that your backend endpoint can process query consisting of the parameters below:

| Name | Type | Description |
|-|-|-|
| draw | Number | Used as query identifier to ensure queries are being executed in correct order  |
| page | Number | Number of page to take |
| pageSize | Number | Number that defines size of the pages |
| orderBy | String | Property name used for sorting |
| orderingDirection | String | Any string for ascending order or 'desc' for descending |
| filteredByColumns | String[] | Collection of property names to be used for filtering separated by comma |
| filteredByValues | String[] | Collection of property values to be used for filtering separated by comma. Their indexes must correspond with the ones from the *filteredByColumns* array |

Example:
```
https://{app-url}/{endpoint}?draw=2&page=1&pageSize=10&orderBy=name&orderingDirection=desc&filteredByColumns=Name&filteredByColumns=Surname&filteredByValues=John&filteredByValues=Smith
```

**Curl**
```
curl --location -g --request GET 'https://{app url}/{endpoint}?draw=2&page=1&pageSize=10&orderBy=name&orderingDirection=desc&filteredByColumns=Name,Surname&filteredByValues=John,Smith' \
--header 'Authorization: {your aut token}'
```

# Unsupported features from react-table
- Multi-Column sorting
- Virtualization
- Resizing