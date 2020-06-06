import { API } from 'aws-amplify';
import React, { useState, useEffect } from 'react';

let apiName = 'awsrest'
let path = '/api/'


export default function Jobs() {
    const [jobs, setJobs] = useState();

    useEffect( () => {
        API.get(apiName, path, { response: true})
        .then((result) =>{
            console.log(result.data)
            setJobs(result.data);
        }).catch(error => console.log(error))
    }, [])

    return (
        <div>{jobs}</div>
    )
    
}