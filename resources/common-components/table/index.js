import { get } from "lodash";

export default function Table({ columns, dataSource, sorting = false }) {
  return (
    <div
      className="table-responsive mb-0"
      data-list={
        sorting
          ? `{"valueNames": [${columns
              .map((column) => `"${column.id}-sort"`)
              .join(",")}]}`
          : null
      }
    >
      <table className="table table-sm mb-0">
        <thead>
          <tr>
            {columns.map((column) => {
              const title = column.titleRender
                ? column.titleRender(column.title)
                : column.title;

              return (
                <th key={column.id} scope="col">
                  {sorting ? (
                    <a
                      href="#"
                      className="text-muted list-sort"
                      data-sort={`${column.id}-sort`}
                    >
                      {title}
                    </a>
                  ) : (
                    title
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {dataSource.map((item) => (
            <tr key={item.id}>
              {columns.map((column, index) => (
                <td
                  key={`${item.id}-${index}`}
                  scope="row"
                  className={sorting ? `${column.id}-sort` : ""}
                >
                  {column.render
                    ? column.contentRender(get(item, column.dataIndex), item)
                    : get(item, column.dataIndex)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
