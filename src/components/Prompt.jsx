import * as React from 'react';
import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';


export default function Prompt({ onClose, show, onConfirm }) {

  onClose = onClose || (() => {});
  const _onConfirm = () => { onConfirm(); onClose(); }

  return (
    <Dialog
    open={show}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      Confirm delete!
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Do you want to delete the employee?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>No</Button>
      <Button onClick={_onConfirm} autoFocus>
        Yes
      </Button>
    </DialogActions>
  </Dialog>
  );
}