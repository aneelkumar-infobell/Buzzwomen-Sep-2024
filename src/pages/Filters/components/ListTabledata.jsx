import Card from '@mui/material/Card';
import { useEffect } from 'react';
import CardContent from '@mui/material/CardContent';
import Iconify from '../../../components/Iconify';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
function ListTabledata(props) {
    const [filterData, setFilterData] = useState(null)
    useEffect(() => {
        setFilterData(props.returnSearchFilter)
    }, [props.returnSearchFilter])
    return (
        <Card>
            {props.data?.length !== 0 && props.data?.map(itm => {
                if ((itm?.name?.toLowerCase()?.includes(filterData?.toLowerCase()) || filterData == null) || itm?.first_name?.toLowerCase()?.includes(filterData?.toLowerCase()) || filterData == null)
                    return (
                        <TableContainer sx={{ paddingLeft: "1rem" }} ><br />
                            <Table aria-label="customized table"  >
                                <TableBody style={{ marginTop: "10px",cursor:'pointer' }} >
                                    <TableRow onClick={() => { props.getData({ ...itm, type: props.type }, props.selectDATA,props.date,props.endDate,props.dateValue,props.endDateValue) }} >
                                        <TableCell sx={{ width: "10px" }}> <Iconify icon="mdi:user-circle" width={25} height={25} /> </TableCell>
                                        <TableCell >  {itm?.name} {itm?.first_name} {itm?.last_name}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )
            })}
        </Card>
    )
}
export default ListTabledata