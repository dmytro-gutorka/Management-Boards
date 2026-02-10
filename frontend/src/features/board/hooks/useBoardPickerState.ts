import { useCallback, useEffect, useMemo, useState } from 'react';

type Args = {
  value: string;
  onChange: (v: string) => void;
};

export function useBoardPickerState({ value, onChange }: Args) {
  const [openJoin, setOpenJoin] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  const [boardIdInput, setBoardIdInput] = useState(value);
  const [boardNameInput, setBoardNameInput] = useState('My board');

  useEffect(() => {
    setBoardIdInput(value);
  }, [value]);

  const canOpen = useMemo(() => boardIdInput.trim().length > 0, [boardIdInput]);
  const canCreate = useMemo(() => boardNameInput.trim().length > 0, [boardNameInput]);

  const openJoinDialog = useCallback(() => setOpenJoin(true), []);
  const closeJoinDialog = useCallback(() => setOpenJoin(false), []);

  const openCreateDialog = useCallback(() => setOpenCreate(true), []);
  const closeCreateDialog = useCallback(() => setOpenCreate(false), []);

  const confirmJoin = useCallback(() => {
    const id = boardIdInput.trim();
    if (!id) return;
    setOpenJoin(false);
    onChange(id);
  }, [boardIdInput, onChange]);

  const afterCreate = useCallback(
    (newBoardId: string) => {
      setOpenCreate(false);
      onChange(newBoardId);
    },
    [onChange],
  );

  return {
    openJoin,
    openCreate,
    boardIdInput,
    boardNameInput,
    canOpen,
    canCreate,

    setBoardIdInput,
    setBoardNameInput,

    openJoinDialog,
    closeJoinDialog,
    openCreateDialog,
    closeCreateDialog,
    confirmJoin,
    afterCreate,
  };
}
