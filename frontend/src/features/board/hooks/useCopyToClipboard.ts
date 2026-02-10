import { useCallback } from 'react';

export function useCopyToClipboard(onSuccess: () => void, onError: () => void) {
  return useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      onSuccess();
    } catch {
      onError();
    }
  }, [onSuccess, onError]);
}
