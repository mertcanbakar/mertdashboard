/* eslint-disable react/prop-types */
import { DataGrid } from "@mui/x-data-grid";

function TableGrid({ rows, columns, pageSize = 10, ...props }) {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={pageSize}
      rowsPerPageOptions={[pageSize]}
      density="compact"
      sx={{
        "& .MuiDataGrid-cell": {
          borderBottom: 1,
          borderColor: "lightgray",
        },
        "& .MuiDataGrid-iconSeparator ": {
          color: "#2196f3",
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: "#2296f3",
          color: "#fefefe",
        },
      }}
      initialState={{
        sorting: {
          sortModel: [{ field: "id", sort: "desc" }],
        },
      }}
      {...props}
    />
  );
}

export default TableGrid;
