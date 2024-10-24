import { useState, useEffect } from 'react';
import React from 'react';
import { Button, Card, CardActions, CardContent, Stack,Checkbox ,Dialog,AppBar,Toolbar,IconButton,Typography,Slide} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useAuth } from 'src/AuthContext';
import { baseURL } from 'src/utils/api';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
export default function AddAttendance({ shown, setShown, batch }) {

  console.log( shown, setShown, batch ,"itm data ")
  const { apikey } = useAuth();
  const [openFilter, setOpenFilter] = useState(false);
  const [clcikData, setClickData] = useState();
  const [addValue, setAddValue] = useState([]);
  const handleCheckBox = () => {
    var checkbox = document.getElementById(itm.participant_id);
    checkbox.checked = false;
    alert('Please Check In First ');
  };
  console.log(addValue ,"itm data ")
  const addAttendance = (itm) => {
    var data = addValue?.includes(itm?.participant_id)
      ? JSON.stringify({
          PartcipantId: parseInt(itm?.participant_id),
          circle_id: parseInt(batch?.circle_id),
          Type: parseInt(batch.type),
          projectid:parseInt(batch.project_id)
        })
      : JSON.stringify({
          PartcipantId: parseInt(itm?.participant_id),
          circle_id: parseInt(batch?.circle_id),
          Type: parseInt(batch.type),
          projectid:parseInt(batch.project_id)
        });
    var config = {
      method: 'post',
      url: baseURL + 'allAttendence',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${apikey}`
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        if (addValue?.includes(itm?.participant_id)) {
          const filteredData = addValue?.filter((item) => item !== itm?.participant_id);
          setAddValue(filteredData);
        } else {
          setAddValue([...addValue, itm?.participant_id]);
        }
        alert(response?.data?.Message);
      })
      .catch(function (error) {
        alert(error?.data?.Message);
      });
  };
  const addAttendance1 = async (itm) => {
    console.log(itm ,"itm data ")
    var data = addValue?.includes(itm?.participant_id)
      ? JSON.stringify({
          flag: 1,
          participant_id: parseInt(itm?.participant_id),
          tbl_poa_id: parseInt(batch?.tb_id),
          type: parseInt(batch.type),
        })
      : JSON.stringify({
          flag: 1,
          participant_id: parseInt(itm?.participant_id),
          tbl_poa_id: parseInt(batch?.tb_id),
          type: parseInt(batch.type),
        });
    var config = {
      method: 'post',
      url: baseURL + 'participantsAttendance',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };
    os(config)
      .then(function (response) {
        if (addValue?.includes(itm?.participant_id)) {
          const filteredData = addValue?.filter((item) => item !== itm?.participant_id);
          setAddValue(filteredData);
        } else {
          setAddValue([...addValue, itm?.participant_id]);
        }
      
        alert(response.Message);
      })
      .catch(function (error) {
    
        alert(error?.Message);
      });
  };
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };
  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    setOpen(shown);
  }, [shown]);
  const handleClickOpen = () => {
    setShown(true);
    setOpen(true);
  };
  const handleClose = () => {
    setShown(false);
    setOpen(false);
  }; 
  const choseAddAttendanceApi = (itm) => {
    console.log(itm , "itm data ")
    if (batch?.type == 2 || batch?.type == 3) {
      addAttendance1(itm);
    } else {
      addAttendance(itm);
    }
  };
  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative', bgcolor: '#ff7424' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1, color: 'white' }} variant="h6" component="div">
              Participants List 
            </Typography>
          </Toolbar>
        </AppBar>
  
        {batch?.check_in != 0 ? (
          <>
            {
            batch?.all_participants?.length <= 0 ?
<Typography sx={{ ml: 2, flex: 1, color: 'black' }} variant="h4" component="div">
            No Participants Found
            </Typography>
            :
            
            batch?.all_participants?.map((itm) => {
              return (
                <Stack style={{ top: 100 }}>
                  <Card
                    onClick={() => {
                      handleOpenFilter();
                      setClickData({ name: itm.gelathiname, title: 'Enrolled  Name' });
                    }}
                  >
                    <CardContent>
                      <CardActions sx={{ borderRadius: 0 }}>
                        <div style={{ width: '90vw', display: 'flex', position: 'relative', padding: '8px' }}>
                          <Typography variant="subtitle2">{itm?.participant_name} </Typography>
                        </div>
                        {batch?.type != 4 &&
                          batch?.type != 10 &&
                          batch?.type != 16 &&
                          batch?.type != 2 &&
                          batch?.type != 3 &&
                          (batch?.type == 11 && itm?.module1 == 1 ? (
                            <Checkbox
                              disabled
                              checked
                              onClick={() => {
                                alert(' Attendance  Is Already Marked.  ');
                              }}
                            />
                          ) : batch?.type == 12 && itm?.module2 == 1 ? (
                            <Checkbox
                              disabled
                              checked
                              onClick={() => {
                                alert(' Attendance  Is Already Marked.  ');
                              }}
                            />
                          ) : batch?.type == 13 && itm?.module3 == 1 ? (
                            <Checkbox
                              disabled
                              checked
                              onClick={() => {
                                alert(' Attendance  Is Already Marked.  ');
                              }}
                            />
                          ) : batch?.type == 14 && itm?.module4 == 1 ? (
                            <Checkbox
                              disabled
                              checked
                              onClick={() => {
                                alert(' Attendance  Is Already Marked.  ');
                              }}
                            />
                          ) : batch?.type == 15 && itm?.module5 == 1 ? (
                            <Checkbox
                              disabled
                              checked
                              onClick={() => {
                                alert(' Attendance  Is Already Marked.  ');
                              }}
                            />
                          ) : batch?.type == 17 && itm?.module1 == 1 ? (
                            <Checkbox
                              disabled
                              checked
                              onClick={() => {
                                alert(' Attendance  Is Already Marked.  ');
                              }}
                            />
                          ) : batch?.type == 18 && itm?.module2 == 1 ? (
                            <Checkbox
                              disabled
                              checked
                              onClick={() => {
                                alert(' Attendance  Is Already Marked.  ');
                              }}
                            />
                          ) : batch?.type == 19 && itm?.module3 == 1 ? (
                            <Checkbox
                              disabled
                              checked
                              onClick={() => {
                                alert(' Attendance  Is Already Marked.  ');
                              }}
                            />
                          ) : batch?.type == 20 && itm?.module4 == 1 ? (
                            <Checkbox
                              disabled
                              checked
                              onClick={() => {
                                alert(' Attendance  Is Already Marked.  ');
                              }}
                            />
                          ) : batch?.type == 21 && itm?.module5 == 1 ? (
                            <Checkbox
                              disabled
                              checked
                              onClick={() => {
                                alert(' Attendance  Is Already Marked.  ');
                              }}
                            />
                          ) : batch?.type == 5 && itm?.module1 == 1 ? (
                            <Checkbox
                              disabled
                              checked
                              onClick={() => {
                                alert(' Attendance  Is Already Marked.  ');
                              }}
                            />
                          ) : batch?.type == 6 && itm?.module2 == 1 ? (
                            <Checkbox
                              disabled
                              checked
                              onClick={() => {
                                alert(' Attendance  Is Already Marked.  ');
                              }}
                            />
                          ) : batch?.type == 7 && itm?.module3 == 1 ? (
                            <Checkbox
                              disabled
                              checked
                              onClick={() => {
                                alert(' Attendance  Is Already Marked.  ');
                              }}
                            />
                          ) : batch?.type == 8 && itm?.module4 == 1 ? (
                            <Checkbox
                              disabled
                              checked
                              onClick={() => {
                                alert(' Attendance  Is Already Marked.  ');
                              }}
                            />
                          ) : batch?.type == 9 && itm?.module5 == 1 ? (
                            <Checkbox
                              disabled
                              checked
                              onClick={() => {
                                alert(' Attendance  Is Already Marked.  ');
                              }}
                            />
                          ) :
                          batch?.type == 23 && itm?.module1 == 1 ? (
                            <Checkbox
                              disabled
                              checked
                              onClick={() => {
                                alert(' Attendance  Is Already Marked.  ');
                              }}
                            />
                          ):
                          batch?.type == 24 && itm?.module2 == 1 ? (
                            <Checkbox
                              disabled
                              checked
                              onClick={() => {
                                alert(' Attendance  Is Already Marked.  ');
                              }}
                            />
                          ):
                          batch?.type == 25 && itm?.module3 == 1 ? (
                            <Checkbox
                              disabled
                              checked
                              onClick={() => {
                                alert(' Attendance  Is Already Marked.  ');
                              }}
                            />
                          ):
                          batch?.type == 26 && itm?.module4 == 1 ? (
                            <Checkbox
                              disabled
                              checked
                              onClick={() => {
                                alert(' Attendance  Is Already Marked.  ');
                              }}
                            />
                          ):
                          batch?.type == 27 && itm?.module5 == 1 ? (
                            <Checkbox
                              disabled
                              checked
                              onClick={() => {
                                alert(' Attendance  Is Already Marked.  ');
                              }}
                            />
                          ):
                          batch?.type == 28 && itm?.module6 == 1 ? (
                            <Checkbox
                              disabled
                              checked
                              onClick={() => {
                                alert(' Attendance  Is Already Marked.  ');
                              }}
                            />
                          ):
                          batch?.type ==  1 ? (
                            null
                          ):

                          (
                            <Checkbox
                              onClick={() => {
                                choseAddAttendanceApi(itm);
                              }}
                              {...label}
                            />
                          ))}
                      </CardActions>
                    </CardContent>
                  </Card>
                </Stack>
              );
            })}
          </>
        ) : (
          <>
            <Typography sx={{ ml: 2, flex: 1, color: 'black' }} variant="h4" component="div">
              Please Do Check IN First
            </Typography>
          </>
        )}
        {}
      </Dialog>
    </div>
  );
}
