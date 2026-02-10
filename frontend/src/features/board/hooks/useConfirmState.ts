import { useState } from 'react';

export function useConfirmState() {
  const [open, setOpen] = useState(false);

  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  return { open, setOpen, openDialog, closeDialog };
}
