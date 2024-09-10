import { useState, useEffect } from 'react';
import ApiRequest from './components/ApiRequest';
import ListTabledata from './components/ListTabledata';
import SearchCommon from './components/SearchCommon';
import Projectapi from './components/Projectsapi';
import { useAuth } from 'src/AuthContext';
export default function OperationManager({ selectDATA, getData,type,date,endDate,dateValue,endDateValue}) {
   const {apikey} = useAuth();
  const [omdata, setOmData] = useState();
  const [searchInFilter, setSearchInFilter] = useState(null)
  useEffect(() => {
    OperationManage()
  }, [])
  const getSearchFilter = (e) => {
    setSearchInFilter(e)
  }
  const returnSearchFilter = () => {
    return searchInFilter
  }
  const OperationManage = async () => {
    if(type=="Projects")
    {
      Projectapi({ selectDATA:4,apikey }).then(res =>setOmData(res))
    }
    else{
      ApiRequest({ selectDATA: 4,apikey }).then(res => setOmData(res))
    }
   
  }
  return (
    <div>
      <SearchCommon getSearchFilter={(e) => { getSearchFilter(e) }} />
      <ListTabledata data={omdata} getData={getData} date={date} endDate={endDate} dateValue={dateValue} endDateValue={endDateValue} selectDATA={4} type="Operation Manager" returnSearchFilter={returnSearchFilter} />
    </div>
  );
}