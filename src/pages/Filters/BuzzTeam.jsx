import { useState, useEffect } from 'react';
import ApiRequest from './components/ApiRequest';
import ListTabledata from './components/ListTabledata';
import { useAuth } from 'src/AuthContext';
export default function BuzzTeam({ selectDATA, getData }) {
    const {apikey} = useAuth();
    const [buzzTeam, setBuzzTeam] = useState();
    useEffect(() => {
        if (selectDATA) { buzzTeamCall() }
    }, [selectDATA])
    const buzzTeamCall = async () => {
        ApiRequest({ selectDATA: selectDATA , apikey}).then(res => setBuzzTeam(res))
    }
    return (
        <ListTabledata data={buzzTeam} />
    )
}