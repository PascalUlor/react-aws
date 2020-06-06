import { API } from 'aws-amplify';
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { makeStyles, styled } from '@material-ui/core/styles';
import AvgSalary from './AvgSalary'

const apiName = 'awsrest';
const path = '/api/';
const myInit = { // OPTIONAL
    headers: {}, // OPTIONAL
    response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
};


const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
    div: {
        padding: 10,
    }
});


export default function Jobs() {
    const [jobs, setJobs] = useState();
    const classes = useStyles();

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
                            <TableCell>Company</TableCell>
                            <TableCell align="right">Job Title</TableCell>
                            <TableCell align="right">Type</TableCell>
                            <TableCell align="right">Created at</TableCell>
                            <TableCell align="right">Location</TableCell>
                            <TableCell align="right">Average Salary</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {jobs.map(row =>(
                            <TableRow key={row.id}>
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
        </main>
    ) : (
        <div className={classes.div}>Loading...</div>
    )
    
}