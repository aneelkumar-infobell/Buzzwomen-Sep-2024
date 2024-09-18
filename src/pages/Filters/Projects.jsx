import { useState, useEffect } from 'react';
import ApiRequest from './components/ApiRequest';
import ListTabledata from './components/ListTabledata';
import SearchCommon from './components/SearchCommon';
import { useAuth } from 'src/AuthContext';

export default function Projects({ selectDATA, getData,date,endDate,dateValue,endDateValue}) {
  const {apikey} = useAuth();
  const [projects, setProjects] = useState();
  const [searchInFilter, setSearchInFilter] = useState(null)
  useEffect(() => {
    project()
  }, []
  )
  const project = async () => {
    ApiRequest({ selectDATA: 3 , apikey}).then(res => setProjects(res))
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
      <ListTabledata data={projects} getData={getData} date={date} endDate={endDate} dateValue={dateValue} endDateValue={endDateValue} selectDATA={3} type="Projects" returnSearchFilter={returnSearchFilter} />
    </div>);
}