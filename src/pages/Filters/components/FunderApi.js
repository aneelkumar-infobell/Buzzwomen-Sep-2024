import axios from 'axios';
import { baseURL } from 'src/utils/api';

export default async function FunderApi(props) {
   console.log("calling me ")
   const {selectDATA,apikey}= props
    var role = JSON.parse(sessionStorage?.getItem('userDetails'))?.role
    var idvalue = JSON.parse(sessionStorage?.getItem('userDetails'))?.id;
    var response = []
    const data = JSON.stringify({
        // "role_id": role,
        // "filter_type": JSON.stringify(parseInt(selectDATA)),
        // "pageNum": 1,
        // "emp_id": JSON.stringify(parseInt(idvalue))
    });
    const config = {
        method: 'post',
        url: baseURL + 'getFunderList',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': apikey,
        },
      
    };
   
    response = await axios(config)
        .then((response) => {
            return response?.data?.list

        })
        .catch((error) => {
            return null
        });
    
    return await response;
    console.log(response ,"data")
}