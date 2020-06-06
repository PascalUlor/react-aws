import { API } from 'aws-amplify';
import React, { useState, useEffect } from 'react';

let apiName = 'awsrest';
let path = '/api/';


const processLocation = (location) =>{
    if(location.match('Remote')) {
        console.log(location)
        return false;
    }

    location = location.toLowerCase().replace(' ', '_');
    location = location.split(',')[0];

    if(encodeURIComponent(location).match(/\%|\(/)) {
        console.log(location)
        return false;
    }

    return location;
}


export default function AvgSalary(props){
    const [salary, setSalary] = useState([]);

    
    useEffect(()=>{
        const locationVar = processLocation(props.location);

        if(!locationVar){
            setSalary('N/A')
            return;
        }
        
        API.get(apiName, path + 'city/' + locationVar + '/salaries', {response: true})
        .then(res => {
            let data = res.data;
            if(data !== 'N/A'){
                data = data.toFixed(2);
            }
            setSalary(data);
        }).catch(err => console.log(err.response))
    }, [props.location]);
}