import { useState, FC } from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { Filter1 } from '@mui/icons-material';
import './NewCreate.css'

const filters = ['newest', 'oldest'];

const Filter: FC<{onData: any}> = ({onData}) => {
  const [open, setOpen] = useState(false);
  const [filterOption, setFilterOption] = useState('newest');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFilterClick = (filter: string) => {
    setFilterOption(filter);
    onData(filter);
    setOpen(false);
  };

  return (
    <div>
      <div className='filter_line'>
        <div className='filter_label'>
          <Typography variant="subtitle1" component="div">
            Filter by: {filterOption} 
          </Typography>
        </div>
        <Button variant="outlined" onClick={handleClickOpen}>
          <Filter1 />
        </Button>
      </div>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Filter</DialogTitle>
        <List sx={{ pt: 0 }}>
          {filters.map((filter) => (
            <ListItem disableGutters key={filter}>
              <ListItemButton onClick={() => handleFilterClick(filter)}>
                <ListItemText primary={filter} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Dialog>
    </div>
  );
}

export default Filter;