import { useState, useEffect } from 'react';
import shakthiapirequest from './selfshakthiapi';
import Iconify from '../../../components/Iconify';
import { Card } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
export default function Trainersdata({ selectDATA, getData,type,data1}) {
 
  const [train, setTrain] = useState();
  const [searchInFilter, setSearchInFilter] = useState(null)
  useEffect(() => {
    trainer()
  }, []
  )
  const trainer = async () => {
  
    shakthiapirequest({ selectDATA: 5,data1}).then(res => setTrain(res))  
  }
  const getSearchFilter = (e) => {
    setSearchInFilter(e)
  }
  const returnSearchFilter = () => {
    return searchInFilter
  }
  return (
     <Card>
    {data1?.trainers?.length !== 0 && data1?.trainers?.map(itm => {
        if (itm?.name?.toLowerCase())
            return (
                <TableContainer sx={{ paddingLeft: "1rem" }} ><br />
                    <Table aria-label="customized table"  >
                        <TableBody style={{ marginTop: "10px" }} >
                            <TableRow onClick={() => { getData({ ...itm, type: type }, selectDATA) }} >
                                <TableCell sx={{ width: "10px" }}> <Iconify icon="mdi:user-circle" width={25} height={25} /> </TableCell>
                                <TableCell >  {itm?.name} {itm?.first_name} {itm?.last_name}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            )
    })}
    {data1?.trainers?.length==0 && <div style={{textAlign:'center',justifyContent:"center",alignItems:"center",fontWeight:700,marginTop:20}}>No Trainers</div>}
  </Card>
    );
}