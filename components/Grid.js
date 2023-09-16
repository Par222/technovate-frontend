import "../node_modules/@syncfusion/ej2-base/styles/material.css";

import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../node_modules/@syncfusion/ej2-calendars/styles/material.css";
import "../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
import "../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../node_modules/@syncfusion/ej2-navigations/styles/material.css";
import "../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
import "../node_modules/@syncfusion/ej2-react-grids/styles/material.css";
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
} from "@syncfusion/ej2-react-grids";
import { donors } from "./donor";
import {
  Filter,
  Inject,
  Page,
  Group,
  Reorder,
  Sort,
  RowDD,
  Selection,
  Edit,
  Toolbar,
  ExcelExport,
} from "@syncfusion/ej2-react-grids/src";

export default function Grid(props) {
    let grid;
  const editOptions = {
    allowAdding: true,
    allowDeleting: true,
    allowEditing: true,
  };
  const toolbarOptions = [
    "Add",
    "Edit",
    "Delete",
    "Update",
    "Cancel",
    "ExcelExport",
  ];
  const toolbarClick = (args) => {
    if (grid && args.item.id === "grid_excelexport") {
        grid.showSpinner();
      grid.excelExport();
    }
  };
  const excelExportComplete = () => {
    if (grid) {
        grid.hideSpinner();
    }
};
  
const AllKeys = Object.keys(donors[0]);
  console.log(props.data)
  return (
    <GridComponent
      id="grid"
      dataSource={props.data}
      editSettings={editOptions}
      toolbar={toolbarOptions}
      pageSettings={{ pageCount: 6 }}
      allowFiltering={true}
      allowGrouping={true}
      allowPaging={true}
      allowSorting={true}
      allowRowDragAndDrop={true}
      allowExcelExport={true}
      allowPdfExport={true}
      excelExportComplete={excelExportComplete}

    toolbarClick={toolbarClick}
      ref={g => grid = g}
    >
      <ColumnsDirective>
        {AllKeys.map((key) => (
          <ColumnDirective field={key} width="100" textAlign="Right" />
        ))}
      </ColumnsDirective>
      <Inject
        services={[
          Filter,
          Group,
          Page,
          Reorder,
          Sort,
          RowDD,
          Selection,
          Toolbar,
          Edit,
          ExcelExport,
        ]}
      ></Inject>
    </GridComponent>
  );
}
