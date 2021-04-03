import * as React from 'react';
import {
  DataGrid,
  GridOverlay,
  GridToolbarContainer,
  GridFilterToolbarButton,
  GridColumnsToolbarButton,
  GridToolbarExport,
} from '@material-ui/data-grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import InfoIcon from '@material-ui/icons/Info';
import ClearIcon from '@material-ui/icons/Clear';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';

const columns = [
  { field: 'id', headerName: 'ID', flex: 0.8 },
  { field: 'submissionName', headerName: 'Submission Name', flex: 3 },
  {
    field: 'quotationAmount', headerName: 'Amount (S$)', type: 'number', flex: 1.2,
  },
  {
    field: 'lastUpdated',
    headerName: 'Last Updated',
    type: 'dateTime',
    flex: 1,
  },
  {
    field: 'dateAdded',
    headerName: 'Date Added',
    type: 'dateTime',
    flex: 1,
  },
  { field: 'submittedBy', headerName: 'Submitted By', flex: 1 },
  { field: 'status', headerName: 'Status', flex: 0.7 },
];

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const rows = [
  {
    id: 'Q00000001', submissionName: 'CommIT Technical Team Bonding', quotationAmount: 200, lastUpdated: '02/03/2021 16:04:07', dateAdded: '02/03/2021 16:04:07', submittedBy: 'Jing Quan', status: 'Approved',
  },
  {
    id: 'Q00000002', submissionName: 'CommIT Technical Team Bonding', quotationAmount: 200, lastUpdated: '02/03/2021 16:04:07', dateAdded: '02/03/2021 16:04:07', submittedBy: 'Jing Quan', status: 'Approved',
  },
  {
    id: 'Q00000003', submissionName: 'CommIT Technical Team Bonding', quotationAmount: 200, lastUpdated: '02/03/2021 16:04:07', dateAdded: '02/03/2021 16:04:07', submittedBy: 'Jing Quan', status: 'Approved',
  },
  {
    id: 'Q00000004', submissionName: 'CommIT Technical Team Bonding', quotationAmount: 200, lastUpdated: '02/03/2021 16:04:07', dateAdded: '02/03/2021 16:04:07', submittedBy: 'Jing Quan', status: 'Approved',
  },
  {
    id: 'Q00000005', submissionName: 'CommIT Technical Team Bonding', quotationAmount: 200, lastUpdated: '02/03/2021 16:04:07', dateAdded: '02/03/2021 16:04:07', submittedBy: 'Jing Quan', status: 'Approved',
  },
  {
    id: 'Q00000006', submissionName: 'CommIT Technical Team Bonding', quotationAmount: 200, lastUpdated: '02/03/2021 16:04:07', dateAdded: '02/03/2021 16:04:07', submittedBy: 'Jing Quan', status: 'Approved',
  },
  {
    id: 'Q00000007', submissionName: 'CommIT Technical Team Bonding', quotationAmount: 200, lastUpdated: '02/03/2021 16:04:07', dateAdded: '02/03/2021 16:04:07', submittedBy: 'Jing Quan', status: 'Approved',
  },
  {
    id: 'Q00000008', submissionName: 'CommIT Technical Team Bonding', quotationAmount: 200, lastUpdated: '02/03/2021 16:04:07', dateAdded: '02/03/2021 16:04:07', submittedBy: 'Jing Quan', status: 'Approved',
  },
  {
    id: 'Q00000009', submissionName: 'CommIT Technical Team Bonding', quotationAmount: 200, lastUpdated: '02/03/2021 16:04:07', dateAdded: '02/03/2021 16:04:07', submittedBy: 'Jing Quan', status: 'Approved',
  },
  {
    id: 'Q00000010', submissionName: 'CommIT Technical Team Bonding', quotationAmount: 200, lastUpdated: '02/03/2021 16:04:07', dateAdded: '02/03/2021 16:04:07', submittedBy: 'Jing Quan', status: 'Approved',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: 'column',
    '& .ant-empty-img-1': {
      fill: theme.palette.type === 'light' ? '#aeb8c2' : '#262626',
    },
    '& .ant-empty-img-2': {
      fill: theme.palette.type === 'light' ? '#f5f5f7' : '#595959',
    },
    '& .ant-empty-img-3': {
      fill: theme.palette.type === 'light' ? '#dce0e6' : '#434343',
    },
    '& .ant-empty-img-4': {
      fill: theme.palette.type === 'light' ? '#fff' : '#1c1c1c',
    },
    '& .ant-empty-img-5': {
      fillOpacity: theme.palette.type === 'light' ? '0.8' : '0.08',
      fill: theme.palette.type === 'light' ? '#f5f5f5' : '#fff',
    },
  },
  label: {
    marginTop: theme.spacing(1),
  },
  paper: {
    position: 'absolute',
    width: 600,
    height: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
}));

function CustomNoRowsOverlay() {
  const classes = useStyles();

  return (
    <GridOverlay className={classes.root}>
      <svg
        width="120"
        height="100"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse
              className="ant-empty-img-5"
              cx="67.797"
              cy="106.89"
              rx="67.797"
              ry="12.668"
            />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <div className={classes.label}>No Record</div>
    </GridOverlay>
  );
}

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridColumnsToolbarButton />
      <GridFilterToolbarButton />
      <GridToolbarExport />
      <div style={{ position: 'absolute', right: '10px', top: '5px' }}>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </div>
    </GridToolbarContainer>
  );
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export default function QuotationTable() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [openSuccessSnackBar, setOpenSuccessSnackBar] = React.useState(false);
  const [openRejectionSnackBar, setOpenRejectionSnackBar] = React.useState(false);
  const [body, setBody] = React.useState(
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
    </div>,
  );

  const handleOpen = (e) => {
    setBody(
      <div style={modalStyle} className={classes.paper}>
        <h2 id="simple-modal-title" style={{ float: 'left' }}>{e.row.id}</h2>
        <Button
          style={{ float: 'right', marginTop: '15px' }}
          variant="contained"
          color="default"
          startIcon={<InfoIcon />}
          onClick={(f) => handleViewMoreClick(f, e.row.id)}
        >
          View More
        </Button>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Quotation Name
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
                {e.row.submissionName}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Quotation Amount
              </TableCell>
              <TableCell style={{ width: 320 }} align="left">
                {e.row.quotationAmount}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Submitted By
              </TableCell>
              <TableCell style={{ width: 320 }} align="left">
                {e.row.submittedBy}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div style={{ marginTop: '50px' }}>
          <TextField
            id="outlined-full-width"
            label="Remarks"
            style={{ margin: 8 }}
            placeholder="Enter your remarks here..."
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
        </div>
        <div style={{ position: 'absolute', right: '155px', bottom: '5px' }}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<ClearIcon />}
            onClick={handleRejectionSnackBarClick}
          >
            Reject
          </Button>
        </div>
        <div style={{ position: 'absolute', right: '25px', bottom: '5px' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<CheckIcon />}
            onClick={handleSuccessSnackBarClick}
          >
            Approve
          </Button>
        </div>
      </div>,
    );
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSuccessSnackBarClick = () => {
    setOpen(false);
    setOpenSuccessSnackBar(true);
  };

  const handleSuccessSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSuccessSnackBar(false);
  };

  const handleRejectionSnackBarClick = () => {
    setOpen(false);
    setOpenRejectionSnackBar(true);
  };

  const handleRejectionSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenRejectionSnackBar(false);
  };

  const handleViewMoreClick = (e, value) => {
    console.log(value);
    window.open(`/quotation/details/${value}`, '_blank');
  };

  return (
    <div>
      <div style={{
        marginLeft: 15, marginRight: 15, marginTop: 10, marginBottom: 10,
      }}
      >
        <Grid container>
          <Grid item xs={12} sm={12} container zeroMinWidth>
            <Typography component="div">
              <Box fontSize={32} fontWeight="fontWeightBold" m={1}>
                Quotation Submissions
              </Box>
            </Typography>
            <div style={{ height: 460, width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                checkboxSelection
                onRowClick={handleOpen}
                components={{
                  NoRowsOverlay: CustomNoRowsOverlay,
                  Toolbar: CustomToolbar,
                }}
              />
            </div>
          </Grid>
        </Grid>
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      </div>
      <div>
        <Snackbar open={openRejectionSnackBar} autoHideDuration={6000} onClose={handleRejectionSnackBarClose}>
          <Alert onClose={handleRejectionSnackBarClose} severity="error">
            Quotation Rejected
          </Alert>
        </Snackbar>
        <Snackbar open={openSuccessSnackBar} autoHideDuration={6000} onClose={handleSuccessSnackBarClose}>
          <Alert onClose={handleSuccessSnackBarClose} severity="success">
            Quotation Approved!
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
