import { useState, useEffect } from 'react';
import ApiRequest from './components/ApiRequest';
import ListTabledata from './components/ListTabledata';
import SearchCommon from './components/SearchCommon';
import Projectapi from './components/Projectsapi';
import { useAuth } from 'src/AuthContext';
export default function Funders({ selectDATA, getData,type ,date,endDate,dateValue,endDateValue}) {
  const {apikey} = useAuth();

  const [fund, setFund] = useState();
  const [searchInFilter, setSearchInFilter] = useState(null)
  useEffect(() => {
    funder()
  }, [])
  const getSearchFilter = (e) => {
    setSearchInFilter(e)
  }
  const returnSearchFilter = () => {
    return searchInFilter
  }
  const funder = async () => {
    if(type=="Projects")
    {
      Projectapi({ selectDATA:8 , apikey}).then(res =>setFund(res))
    }
    else{
      ApiRequest({ selectDATA: 2, apikey}).then(res => setFund(res))
    }
    
  }
  return (
    <div>
      <SearchCommon getSearchFilter={(e) => { getSearchFilter(e) }} />
      <ListTabledata data={fund} getData={getData} date={date} endDate={endDate} dateValue={dateValue} endDateValue={endDateValue} selectDATA={2} type="Funder" returnSearchFilter={returnSearchFilter} />
    </div>
  )
}