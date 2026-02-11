import { useMemo, useState, useCallback } from 'react';

type Args = {
  externalValue: string;
};

export function useEditableName({ externalValue }: Args) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(externalValue);

  const value = isEditing ? draft : externalValue;

  const trimmed = useMemo(() => value.trim(), [value]);

  const canSave = useMemo(() => {
    return trimmed.length > 0 && trimmed !== externalValue;
  }, [trimmed, externalValue]);

  const start = useCallback(() => {
    setDraft(externalValue);
    setIsEditing(true);
  }, [externalValue]);

  const cancel = useCallback(() => {
    setIsEditing(false);
    setDraft(externalValue);
  }, [externalValue]);

  const setValue = useCallback((next: string) => {
    setDraft(next);
  }, []);

  return {
    isEditing,
    value,
    setValue,

    trimmed,
    canSave,

    start,
    cancel,
    setIsEditing,
  };
}
