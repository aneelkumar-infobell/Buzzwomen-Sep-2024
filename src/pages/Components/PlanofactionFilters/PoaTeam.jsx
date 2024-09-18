import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import Iconify from 'src/components/Iconify';
import Tooltip from 'src/theme/overrides/Tooltip';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import SearchCommon from 'src/pages/Filters/components/SearchCommon';
import { baseURL } from 'src/utils/api';
import { useAuth } from 'src/AuthContext';

const emails = ['username@gmail.com', 'user02@gmail.com'];
function SimpleDialog(props) {
  const { onClose, selectedValue, open, teamData, setUserId } = props;
  var [tempData, setTempData] = useState([...(teamData || [])]);
  const [user, setUser] = useState();
  
  var account = sessionStorage?.getItem('userDetails')
  account = JSON.parse(account)
  const handleClose = () => {
    onClose(selectedValue);
  };
  
  const handleListItemClick = (value) => {
    props?.setUserId(value?.id)
    props?.setName(value?.name)
    onClose(value);
  };
  const [searchInFilter, setSearchInFilter] = useState(null)
  const getSearchFilter = (e) => {
        setSearchInFilter(e)
    }
    const returnSearchFilter = () => {
        return searchInFilter
    }
    useEffect(()=>searchData(''),[teamData,open])
    const searchData =(searchValue) => {
      tempData = teamData?.filter(e=>e?.name?.toLowerCase().includes(searchValue.toLowerCase()));
      setTempData(tempData);
    }
 
  return (
    <Dialog id="poa-team-dialog" onClose={handleClose} open={open}>
      <DialogTitle id="poa-team-dialog-content"> <IconButton id="poa-team-icon-button" edge="start" color="inherit" onClick={handleClose} aria-label="close">
        <CloseIcon />
      </IconButton>Select Buzz Team Members</DialogTitle>
       <SearchCommon getSearchFilter={(e) => { searchData(e) }} />
      {(tempData?.length>0)?<List sx={{ pt: 0 }}>
        {tempData?.map((email) => (
         
          <ListItem id="poa-team-list-item" disableGutters >
            <ListItemButton id="list-item-btn" onClick={() => handleListItemClick(email)} >
              <ListItemAvatar id="list-item-avatar">
                <Avatar id="poa-team-avatar" sx={{ bgcolor: blue[100], color: blue[600] }} src={email?.profile_pic} />
              </ListItemAvatar>
             
              <ListItemText id="list-item-text" primary={email?.name} />
             
              <ListItemText> <Typography variant="subtitle2" color='orange' style={{ textAlign: "right" }}>
              ({(email?.empRole=='5')?"Trainer":(email?.empRole=='6')?"Field Associate":(email?.empRole=='1')?"CEO":(email?.empRole=='2')?"Admin":(email?.empRole=='3')?"Program Manager":(email?.empRole=='4')?"Operations Manager":(email?.empRole=='7')?"Driver":(email?.empRole=='8')?"Funder":(email?.empRole=='9')?"Partner":(email?.empRole=='10')?"Management Team":(email?.empRole=='11')?"FIN/HR/VIEWER":(email?.empRole=='12')?"Senior Operations Manager":(email?.empRole=='13')?"Gelathi Facilitator Lead ":null})
             
            </Typography> </ListItemText>
            </ListItemButton>
          </ListItem>
          ))}
      </List>:<h4 id="no-team-members-found" style={{textAlign:'center'}}>No Team Members Found</h4>}
    </Dialog>
  );
}
SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
export default function PoaTeam({ setUserId, setName, users }) {
    const { apikey } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [teamData, setTeamData] = useState([])
  useEffect(() => {
    team()
  }, []
  )
  
  const team = async => {
    var idvalue = JSON.parse(sessionStorage?.getItem('userDetails'))?.id
    var data = JSON.stringify({
      "emp_id": idvalue,
      "team": ""
    });
    
    var config = {
      method: 'post',
      url: baseURL + 'getMyTeam',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${apikey}`
      },
      data: data
    };
    
    axios(config)
      .then(function (response) {
        setTeamData(response.data?.data)
      })
      .catch(function (error) {
        // console.log(error);
      });
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (value) => {
    setOpen(false);
  };
  return (
    <div>
      <Button id="poa-team-button-people" onClick={handleClickOpen} style={{ float: "right", color: "#ff7424", margin: 10, marginTop: 0 }} sx={{
        '&:hover': {
          backgroundColor: '#ffd796',
          borderColor: "#ff7424",
        },
        borderColor: "#ff7424",
        color: "#ff7424",
        backgroundColor: '#ffd796',
      }} title="Select Buzz member">
        <Iconify id="people-icon" icon="mdi:people" style={{ width: '30px', height: '30px' }} ></Iconify>
      </Button>
      <SimpleDialog
        id="poa-team-simple-dialog"
        teamData={teamData}
       
        setUserId={setUserId}
        setName={setName}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}