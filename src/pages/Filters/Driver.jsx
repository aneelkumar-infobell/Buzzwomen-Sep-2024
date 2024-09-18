import { useState, useEffect } from 'react';
import ApiRequest from './components/ApiRequest';
import ListTabledata from './components/ListTabledata';
import SearchCommon from './components/SearchCommon';
import { useAuth } from 'src/AuthContext';
export default function Driver({ selectDATA, getData }) {
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
        ApiRequest({ selectDATA: selectDATA, apikey }).then(res => setFund(res))
    }
    return (
        <div>
            <SearchCommon getSearchFilter={(e) => { getSearchFilter(e) }} />
            <ListTabledata data={fund} />
        </div>
    )
}