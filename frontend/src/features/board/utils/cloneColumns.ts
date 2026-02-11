import type { ColumnId } from '../../../api/configurations/types.ts';
import type { UiColumns } from './cardsToColumns.ts';


export function cloneColumns(cols: UiColumns, columnIds: ColumnId[]): UiColumns {
  return columnIds.reduce((acc, id) => {
    acc[id] = [...cols[id]];
    return acc;
  }, {} as UiColumns);
}