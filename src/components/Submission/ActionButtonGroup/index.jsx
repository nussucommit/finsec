import React, { Component, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SendIcon from '@material-ui/icons/Send';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function ActionButtons() {
  const classes = useStyles();
  return (
    <React.Fragment>
        <Container maxWidth='lg'>
        <div className={classes.root}>
            <Grid container>
            <Grid container item spacing={3} xs={10}>
                <Grid>
                <Button
                    variant='contained'
                    color='primary'
                    className={classes.button}
                    startIcon={<SendIcon />}
                >
                    Send
                </Button>
                <Button
                    variant='contained'
                    color='secondary'
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                >
                    Delete
                </Button>
                <Button
                    variant='contained'
                    color='default'
                    className={classes.button}
                    startIcon={<CloudUploadIcon />}
                >
                    Upload
                </Button>
                </Grid>
            </Grid>
            <Grid container item xs={2} justify='flex-end'>
                <Grid item xs={2}>
                <IconButton color='primary' aria-label='add to shopping cart'>
                    <AddIcon />
                </IconButton>
                </Grid>
            </Grid>
            </Grid>
        </div>
        </Container>
    </React.Fragment>
  );
}

class ActionButtonGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return <ActionButtons />;
  }
}

export default ActionButtonGroup;
