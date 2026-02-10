import { useEffect, useMemo, useState, useCallback } from 'react';

type Args = {
  externalValue: string;
};

export function useEditableName({ externalValue }: Args) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(externalValue);

  useEffect(() => {
    if (!isEditing) setValue(externalValue);
  }, [externalValue, isEditing]);

  const trimmed = useMemo(() => value.trim(), [value]);

  const canSave = useMemo(() => {
    return trimmed.length > 0 && trimmed !== externalValue;
  }, [trimmed, externalValue]);

  const start = useCallback(() => setIsEditing(true), []);
  const cancel = useCallback(() => {
    setIsEditing(false);
    setValue(externalValue);
  }, [externalValue]);

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
