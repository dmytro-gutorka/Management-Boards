import type {ColumnId} from "../../../api/configurations/types.ts";
import {COLUMNS} from "../configs/columns.ts";

export function getColumnIds(): ColumnId[] {
    return COLUMNS.map((column) => column.id) as ColumnId[];
}
