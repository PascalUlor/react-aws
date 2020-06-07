import { API } from 'aws-amplify';
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import AvgSalary from './AvgSalary'
import JobReviewCard from './JobReviewCard'


const apiName = 'awsrest';
const path = '/api/';
const myInit = { // OPTIONAL
    headers: {}, // OPTIONAL
    response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
};

function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const cardStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

const useStyles = makeStyles({
    table: {
        minWidth: 700,
        margin: '50px 0 0 0',
    },
    div: {
        padding: 10,
    },
    thead: {
        fontWeight: 'bold',
        fontSize: '1.5em',
    },
});


export default function Jobs() {
    const [jobs, setJobs] = useState();
    const classes = useStyles();
    const modalClass = cardStyles();

    // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [card, setCard] = useState({});

  const handleOpen = (data) => {
    setOpen(true);
    setCard(data)
  };

  const handleClose = () => {
    setOpen(false);
  };

    useEffect( () => {
        API.get(apiName, path, myInit)
        .then((result) =>{
            console.log(result.data)
            setJobs(result.data);
        }).catch(error => console.log(error))
    }, [])

    return jobs ? (
        <main>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.thead}>Company</TableCell>
                            <TableCell className={classes.thead} align="right">Job Title</TableCell>
                            <TableCell className={classes.thead} align="right">Type</TableCell>
                            <TableCell className={classes.thead} align="right">Created at</TableCell>
                            <TableCell className={classes.thead} align="right">Location</TableCell>
                            <TableCell className={classes.thead} align="right">Average Salary</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {jobs.map(row =>(
                            <TableRow key={row.id} onClick={()=>handleOpen(row)}>
                                <TableCell align="right">{row.company}</TableCell>
                                <TableCell align="right">{row.title}</TableCell>
                            <TableCell align="right">{row.type}</TableCell>
                            <TableCell align="right">{row.created_at}</TableCell>
                            <TableCell align="right">{row.location}</TableCell>
                            <TableCell align="right"><AvgSalary location={row.location}/></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <JobReviewCard modalStyle={modalStyle} modalClass={modalClass} card={card} />
      </Modal>
        </main>
    ) : (
        <div className={classes.div}>Loading...</div>
    )
    
}