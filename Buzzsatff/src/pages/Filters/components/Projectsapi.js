import axios from 'axios';
import { baseURL } from 'src/utils/api';

export default async function Projectapi(props) {
    
   const {selectDATA,apikey}= props
    var role = JSON.parse(sessionStorage?.getItem('userDetails'))?.role
    var idvalue = JSON.parse(sessionStorage?.getItem('userDetails'))?.id;
    var response = []
    const data = JSON.stringify({
        "role_id": role,
        "pageNum": "1",
        "user_id": idvalue,
        "filter_id": JSON.stringify(selectDATA),
        "type": ""
    });
   
    const config = {
        method: 'post',
        url: baseURL+'getAllPeople',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': apikey
        },
        data
    };
  
    response = await axios(config)

        .then((response) => {
            return response?.data?.list
        })
        .catch((error) => {
            return null
        });
        
    return await response;
}

