import type { Card } from '../../../api/configurations/types';
import type { UiColumns } from '../types/common.types';

export function sanitizeColumns(cols: UiColumns): UiColumns {
  return {
    todo: cols.todo.filter(Boolean) as Card[],
    in_progress: cols.in_progress.filter(Boolean) as Card[],
    done: cols.done.filter(Boolean) as Card[],
  };
}
