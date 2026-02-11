import type { Card } from '../../../api/configurations/types';
import type { UiColumns } from '../types/common.types';

const isCard = (v: Card | undefined | null): v is Card => !!v;

export function sanitizeColumns(cols: UiColumns): UiColumns {
  return {
    todo: cols.todo.filter(isCard),
    in_progress: cols.in_progress.filter(isCard),
    done: cols.done.filter(isCard),
  };
}
