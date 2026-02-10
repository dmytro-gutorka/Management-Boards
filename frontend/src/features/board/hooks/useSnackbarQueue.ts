import { useCallback, useState } from 'react';

export type Snack = { kind: 'success' | 'error'; message: string } | null;

export function useSnack() {
  const [snack, setSnack] = useState<Snack>(null);

  const success = useCallback((message: string) => setSnack({ kind: 'success', message }), []);
  const error = useCallback((message: string) => setSnack({ kind: 'error', message }), []);
  const close = useCallback(() => setSnack(null), []);

  return { snack, success, error, close };
}
