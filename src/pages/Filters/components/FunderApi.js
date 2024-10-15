import axios from 'axios';
import { baseURL } from 'src/utils/api';

export default async function FunderApi(props) {
   console.log("calling me " , )
   const {selectDATA,apikey , old}= props
   var projectId = JSON.parse(sessionStorage?.getItem("proId") )
   console.log(projectId.toString() ,"projectId" ,apikey ,"apikey")
    var role = JSON.parse(sessionStorage?.getItem('userDetails'))?.role
    var idvalue = JSON.parse(sessionStorage?.getItem('userDetails'))?.id;
    var response = []
    const data = JSON.stringify({
"projectID": projectId.toString(),
        // "role_id": role,
        // "filter_type": JSON.stringify(parseInt(selectDATA)),
        // "pageNum": 1,
        // "emp_id": JSON.stringify(parseInt(idvalue))
    });
    const config = {
        method: 'post',
    //  url: baseURL + 'getFunderList',
        url: (old === "old") ? baseURL + 'getFunderList' : baseURL + 'projectFunderList'  ,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': apikey,
        },
        data: data 
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
