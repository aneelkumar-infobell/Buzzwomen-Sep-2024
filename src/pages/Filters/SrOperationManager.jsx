import { useState, useEffect } from 'react';
import ApiRequest from './components/ApiRequest';
import ListTabledata from './components/ListTabledata';
import SearchCommon from './components/SearchCommon';
import { useAuth } from 'src/AuthContext';
export default function SrOperationManager({ selectDATA, getData,date,endDate ,dateValue,endDateValue}) {
  const {apikey} = useAuth();
  const [fund, setFund] = useState();
  const [searchInFilter, setSearchInFilter] = useState(null)
  useEffect(() => {
    funder()
  }, [])
  const funder = async () => {
    ApiRequest({ selectDATA: 12, apikey }).then(res => setFund(res))
  }
  const getSearchFilter = (e) => {
    setSearchInFilter(e)
  }
  const returnSearchFilter = () => {
    return searchInFilter
  }
  return (
    <div>
      <SearchCommon getSearchFilter={(e) => { getSearchFilter(e) }} />
      <ListTabledata data={fund} getData={getData}  date={date} endDate={endDate} dateValue={dateValue} endDateValue={endDateValue} selectDATA={12} type="Sr . OperationManager"
        returnSearchFilter={returnSearchFilter} />
    </div>)
}