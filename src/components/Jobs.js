import { API } from 'aws-amplify';
import React, { useState, useEffect } from 'react';

const apiName = 'awsrest';
const path = '/api/';
const myInit = { // OPTIONAL
    headers: {}, // OPTIONAL
    response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
};



export default function Jobs() {
    const [jobs, setJobs] = useState();

    useEffect( () => {
        API.get(apiName, path, myInit)
        .then((result) =>{
            console.log(result.data)
            setJobs(result.data);
        }).catch(error => console.log(error))
    }, [])

    return (
        <div>{jobs}</div>
    )
    
}