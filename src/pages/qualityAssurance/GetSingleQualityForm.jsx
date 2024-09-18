import * as React from 'react';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {
  Button,
  Grid,
  Stack,
  TextField,
  Select,
  FormControl,
  Radio,
  RadioGroup,
  InputLabel,
  MenuItem,
  Checkbox,
  Box,
  FormGroup,
  FormControlLabel,
  Card,
  CardContent,
  CardActionArea,
  DialogContent,
  DialogContentText,
  FormHelperText,
} from '@mui/material';
import Tabs from '@mui/material/Tabs';
import DialogForm from './components/DialogForm';
import Tab from '@mui/material/Tab';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Color } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import Iconify from 'src/components/Iconify';
import { Icon } from '@iconify/react';
import products from 'src/_mock/products';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Alert from '@mui/material/Alert';
import { ReplayCircleFilled } from '@mui/icons-material';
import { baseURL } from 'src/utils/api';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const GetSingleQualityForm = ({ item, open, handleClose }) => {
  const [sendForm, setSendForm] = useState('');
  useEffect(() => {
    if (item === undefined) {

    } else {
      setSendForm(item);
    }
  }, [item]);
  const myJSON = JSON.stringify(item);
  const RenderStringToArray = ( {string}) =>{
var value =string?.split(",")
  return value?.map((val) =><li style={{color:"gray"}}>{val}</li> )
  }
  const Formrender = () => {
    return (
      <>
        {Object?.entries(item).map(([key, value]) => (
          <div key={key}>
            {key == 'id' || key == 'emp_id' || key == 'role_id' || key == 'email_address' ? null : (
              <Card style={{ marginTop: 20, borderRadius: 20 }}>
                <CardContent>
                  <Typography style={{ color: '#ff7424' }}>
                    {key.charAt(0).toUpperCase() + key.slice(1).replaceAll('_', '  ')}{' '}
                  </Typography>
                  <Stack mt={2}>
                    <Typography>Answer: {value}</Typography>
                  </Stack>
                </CardContent>
              </Card>
            )}
          </div>
        ))}
      </>
    );
  };
  const SelfSakthiDay1 = () => {
    return (
      <>
        <Card sx={{ marginTop: '20px' }}>
          <CardContent>
            <Stack>
              <Typography>Day1 or Day 2</Typography>
              <TextField
                type="day"
                disabled
                inputProps={{ disabled: true }}
                label="Your Answer"
                variant="outlined"
                color="common"
                value={sendForm?.day1_or_day2}
              />
            </Stack>
          </CardContent>
        </Card>
        <CardContent>
          <Card>
            <Card sx={{ backgroundColor: '#ff7424' }} mt={2}>
              <CardContent>
                <Typography variant="h5">Day-1</Typography>
              </CardContent>
            </Card>
            <CardContent>
              <Stack mt={2}>
                <Typography>Name of the trainer being evaluated</Typography>
                <TextField
                  type="day"
                  disabled
                  inputProps={{ disabled: true }}
                  label="Your Answer"
                  variant="outlined"
                  color="common"
                  value={sendForm?.name_of_the_trainer_being_evaluated}
                />
              </Stack>
            </CardContent>
          </Card>
        </CardContent>
      </>
    );
  };
  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'fixed', bgcolor: '#ff7424' }}>
          <Toolbar sx={{ bgcolor: '#ff7424' }}>
            <IconButton style={{ color: 'white' }} onClick={handleClose}>
              <Iconify icon="material-symbols:arrow-back-rounded" />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1, color: 'white' }} variant="h6" component="div">
               Quality Assessment Form
            </Typography>
          </Toolbar>
        </AppBar>
        {/* <div style={{marginTop:"60px"}}>
      <Formrender/>
      </div> */}
        {/* 1 */}
        <Grid style={{ backgroundColor: '#FFD580', marginTop: '30px' }}>
         
          <Card sx={{ mt: 4, margin: '20px' }}>
            <CardContent>
              <Typography>Email</Typography>
              <Stack mt={2} mb={2}>
                <TextField
                  type="email"
                  disabled
                  inputProps={{ disabled: true }}
                  label="Your Answer"
                  variant="outlined"
                  color="common"
                  onChange={(e) => setSendForm({ ...sendForm, email_address: e.target.value })}
                  value={sendForm?.email_address}
                />
              </Stack>
            </CardContent>
          </Card>
          <Card sx={{ mt: 2, margin: '20px' }}>
            <CardContent>
              <Typography>Name of the Assessor</Typography>
              <Stack mt={2} mb={2}>
                <TextField
                  disabled
                  inputProps={{ disabled: true }}
                  label="Your Answer"
                  variant="outlined"
                  color="common"
                  onChange={(e) => setSendForm({ ...sendForm, name_of_the_assessor: e.target.value })}
                  value={sendForm?.name_of_the_assessor}
                />
              </Stack>
            </CardContent>
          </Card>
          <Card sx={{ margin: '20px' }}>
            <CardContent>
              <Stack>
                <Typography variant="body2"> Date of the evaluation of the training/meeting</Typography>
                <Stack mt={2} mb={2}>
                  <DateTimePicker
                    id="date-time-picker"
                    minDate={sendForm?.entry_date}
                    disabled
                    label="From"
                    onChange={(e) => {
                      handleTime(e);
                    }}
                    value={sendForm?.entry_date}
                    PopperProps={{
                      placement: 'top',
                    }}
                    renderInput={(params) => (
                      <TextField disabled inputProps={{ disabled: true }} {...params} color="common" />
                    )}
                  />
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        
          <Card sx={{ margin: '20px' }}>
            <CardContent>
              <Stack>
                <Typography variant="body2">Name of the District</Typography>
                <Stack mt={2} mb={2}>
                  <TextField
                    disabled
                    inputProps={{ disabled: true }}
                    label="Your Answer"
                    variant="outlined"
                    color="common"
                    value={sendForm?.name_of_the_district}
                  />
                </Stack>
              </Stack>
            </CardContent>
          </Card>
          <Card sx={{ margin: '20px' }}>
            <CardContent>
              <Stack>
                <Typography variant="body2">Name of the Taluk</Typography>
                <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) =>
                            setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                          }
                          value={sendForm?.name_of_the_taluk}
                        />
                      </Stack>
              </Stack>
            </CardContent>
          </Card>
          <Card sx={{ margin: '20px' }}>
            <CardContent>
              <Stack>
                <Typography variant="body2">Name of the village and the venue of meeting/training</Typography>
                <Stack mt={2} mb={2}>
                  <TextField
                    disabled
                    inputProps={{ disabled: true }}
                    label="Your Answer"
                    variant="outlined"
                    color="common"
                    value={sendForm?.name_of_the_village_and_the_venue_of_meeting_or_training}
                  />
                </Stack>
              </Stack>
            </CardContent>
          </Card>
         
          <Card sx={{ margin: '20px' }}>
            <CardContent>
              <Stack>
                <Typography variant="body2">Selected POA</Typography>
                <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                         
                          value={sendForm?.today_poa}
                        />
                      </Stack>
              </Stack>
            </CardContent>
          </Card>
     
          {/* 2 */}
          {sendForm?.program_assessment == 2 ? (
            <Grid backgroundColor={'#FFD580'}>
            
              <CardContent>
               
                  <Card sx={{ backgroundColor: '#ff7424' }} mt={2}>
                    <CardContent>
                    
                      <Typography variant="h5">Gelathi Program</Typography>
                 
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: '20px' }}>
                  <CardContent>
                    <Typography>Name of the Field Associate</Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        disabled
                        inputProps={{ disabled: true }}
                        type="number"
                        label="Your Answer"
                        variant="outlined"
                        color="common"
                        onChange={(e) =>
                          setSendForm({ ...sendForm, no_of_participants_at_the_start_of_the_session: e.target.value })
                        }
                        value={sendForm?.name_of_the_gf}
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: '20px' }}>
                  <CardContent>
                    <Typography>No of participants at the start of the session</Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        disabled
                        inputProps={{ disabled: true }}
                        type="number"
                        label="Your Answer"
                        variant="outlined"
                        color="common"
                        onChange={(e) =>
                          setSendForm({ ...sendForm, no_of_participants_at_the_start_of_the_session: e.target.value })
                        }
                        value={sendForm?.no_of_participants_at_the_start_of_the_session}
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: '20px' }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography>Assessment of</Typography>
                      <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                        
                          value={sendForm?.assessment_of}
                        />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: 2 }}>
                  <CardContent>
                    <Typography>The Field Associate competently carried out the following functions</Typography>
                    
                    <RenderStringToArray string={sendForm?.the_gf_comptetly_carried_out_following_funtions} />
                      
                
                  
                    <Stack mt={2} mb={2}>
                  <TextField
                    disabled
                    inputProps={{ disabled: true }}
                    label="Your Answer"
                    variant="outlined"
                    color="common"
                    onChange={(e) => setSendForm({ ...sendForm, name_of_the_assessor: e.target.value })}
                    value={sendForm?.the_gf_comptetly_carried_out_following_funtions}
                  />
                </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: 2 }}>
                  <CardContent>
                    <Typography>
                      The Field Associate carried out the following functions before the training/meeting started
                    </Typography>
                    <RenderStringToArray string={sendForm?.the_gf_caried_followig_fuctions_bfore_traning_or_meting_started} />
                      
               
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: '20px' }}>
                  <CardContent>
                    <Typography>How many stories of success or change emerged from the recap</Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        disabled
                        inputProps={{ disabled: true }}
                        type="number"
                        label="Your Answer"
                        variant="outlined"
                        color="common"
                        onChange={(e) =>
                          setSendForm({
                            ...sendForm,
                            how_many_stories_of_success_or_change_emerged_from_the_recap: e.target.value,
                          })
                        }
                        value={sendForm?.how_many_stories_of_success_or_change_emerged_from_the_recap}
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: '20px' }}>
                  <CardContent>
                    <Typography>
                      Mention name of the Gelathis with success stories and a story in couple of lines
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        disabled
                        inputProps={{ disabled: true }}
                        label="Your Answer"
                        variant="outlined"
                        color="common"
                        onChange={(e) =>
                          setSendForm({
                            ...sendForm,
                            ment_name_of_gelathis_success_stories_and_story_couple_of_lines: e.target.value,
                          })
                        }
                        value={sendForm?.ment_name_of_gelathis_success_stories_and_story_couple_of_lines}
                      />
                    </Stack>
                  </CardContent>
                </Card>
              </CardContent>
            </Grid>
          ) : null}
          {/* 3 */}
          {sendForm?.assessment_of == 'Circle Meeting' ? (
            <Grid backgroundColor={'#FFD580'}>
             
              <CardContent>
                <Card>
                  <Card sx={{ backgroundColor: '#ff7424' }} mt={2}>
                    <CardContent>
                      <Typography variant="h5">Circle Meeting</Typography>
                    </CardContent>
                  </Card>
                  <CardContent>
                    <Typography>Check which ones the Field Associate did NOT do</Typography>
                    <RenderStringToArray string={sendForm?.check_which_ones_the_gf_did_not_do} />
                    
                
                  </CardContent>
                </Card>
              </CardContent>
            </Grid>
          ) : null}
          {/* 4 */}
          {sendForm?.assessment_of == 'Spoorthi Module 1' ? (
            <Grid backgroundColor={'#FFD580'}>
       
              <CardContent>
                <Card>
                  <Card sx={{ backgroundColor: '#ff7424' }} mt={2}>
                    <CardContent>
                      <Typography variant="h5">Spoorthi-1</Typography>
                    </CardContent>
                  </Card>
                  <CardContent>
                    <Typography>Check which ones the Field Associate did NOT do</Typography>
                    <RenderStringToArray string={sendForm?.check_which_ones_the_gelathi_did_not_do} />
                    
                   
                  </CardContent>
                </Card>
              </CardContent>
            </Grid>
          ) : null}
          {/* 5 */}
          {sendForm?.assessment_of == 'Spoorthi Module 2' ? (
            <Grid backgroundColor={'#FFD580'}>
            
              <CardContent>
                <Card>
                  <Card sx={{ backgroundColor: '#ff7424' }} mt={2}>
                    <CardContent>
                      <Typography variant="h5">Spoorthi-2</Typography>
                    </CardContent>
                  </Card>
                  <CardContent>
                    <Typography>Check which ones the Field Associate did NOT do</Typography>
                    <RenderStringToArray string={sendForm?.check_which_ones_the_gelathi_did_not_do} />
                    
                 
                  </CardContent>
                </Card>
              </CardContent>
            </Grid>
          ) : null}
          <br />
          {/* 6 */}
          {sendForm?.assessment_of == 'Spoorthi Module 3' ? (
            <Grid backgroundColor={'#FFD580'}>
          
              <CardContent>
                <Card>
                  <Card sx={{ backgroundColor: '#ff7424' }} mt={2}>
                    <CardContent>
                      <Typography variant="h5">Spoorthi-3</Typography>
                    </CardContent>
                  </Card>
                  <CardContent>
                    <Typography>Check which ones the Field Associate did NOT do</Typography>
                    <RenderStringToArray string={sendForm?.check_which_ones_the_gelathi_did_not_do_2} />
                    
                  
                  
                  </CardContent>
                </Card>
              </CardContent>
            </Grid>
          ) : null}
          {/* 7 */}
          {sendForm?.assessment_of == 'Spoorthi Module 4' ? (
            <Grid backgroundColor={'#FFD580'}>
             
              <CardContent>
                <Card>
                  <Card sx={{ backgroundColor: '#ff7424' }} mt={2}>
                    <CardContent>
                      <Typography variant="h5">Spoorthi-4</Typography>
                    </CardContent>
                  </Card>
                  <CardContent>
                    <Typography>Check which ones the Field Associate did NOT do</Typography>
                    <RenderStringToArray string={sendForm?.check_which_ones_the_gelathi_did_not_do_1} />
                    
                 
                  
                    
                  </CardContent>
                </Card>
              </CardContent>
            </Grid>
          ) : null}
          {sendForm?.assessment_of == 'Green Module 1' ? (
            <Grid backgroundColor={'#FFD580'}>
              <CardContent>
               
                <Card>
                  <Card sx={{ backgroundColor: '#ff7424' }} mt={2}>
                    <CardContent>
                      <Typography variant="h5">Green Module 1:</Typography>
                    </CardContent>
                  </Card>
                  <CardContent>
                    <Typography>Check which ones the Field Associate did not do</Typography>
                    <RenderStringToArray string={sendForm?.check_which_ones_the_gf_did_not_do} />
                    
                   
                  
                  
                  </CardContent>
                </Card>
              </CardContent>
            </Grid>
          ) : null}
          {sendForm?.assessment_of == 'Green Module 2' ? (
            <Grid backgroundColor={'#FFD580'}>
             
              <CardContent>
                <Card>
                  <Card sx={{ backgroundColor: '#ff7424' }} mt={2}>
                    <CardContent>
                      <Typography variant="h5">Green Module 2:</Typography>
                    </CardContent>
                  </Card>
                  <CardContent>
                    <Typography>Check which ones the Gelati Facilitator did not do</Typography>
                  
                    <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) =>
                            setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                          }
                          value={sendForm?.check_which_ones_the_gf_did_not_do}
                        />
                      </Stack>
                  
                 
                  </CardContent>
                </Card>
              </CardContent>
            </Grid>
          ) : null}
          {sendForm?.assessment_of == 'Green Module 3' ? (
            <Grid backgroundColor={'#FFD580'}>
           
              <CardContent>
                <Card>
                  <Card sx={{ backgroundColor: '#ff7424' }} mt={2}>
                    <CardContent>
                      <Typography variant="h5">Green Module 3:</Typography>
                    </CardContent>
                  </Card>
                  <CardContent>
                    <Typography>Check which ones Gelati facilitator did not do</Typography>
                   
                   
                    <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) =>
                            setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                          }
                          value={sendForm?.check_which_ones_the_gf_did_not_do}
                        />
                      </Stack>
                  
                 
                  </CardContent>
                </Card>
              </CardContent>
            </Grid>
          ) : null}
          {sendForm?.assessment_of == 'Green Module 4' ? (
            <Grid backgroundColor={'#FFD580'}>
          
              <CardContent>
                <Card>
                  <Card sx={{ backgroundColor: '#ff7424' }} mt={2}>
                    <CardContent>
                      <Typography variant="h5">Green Module 4</Typography>
                    </CardContent>
                  </Card>
                  <CardContent>
                    <Typography>Check which ones Gelati Facilitator did not do</Typography>
                
                    <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) =>
                            setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                          }
                          value={sendForm?.check_which_ones_the_gf_did_not_do}
                        />
                      </Stack>
                  
                
                  </CardContent>
                </Card>
              </CardContent>
            </Grid>
          ) : null}
          {sendForm?.assessment_of == 'Green Module 5' ? (
            <Grid backgroundColor={'#FFD580'}>
            
              <CardContent>
                <Card>
                  <Card sx={{ backgroundColor: '#ff7424' }} mt={2}>
                    <CardContent>
                      <Typography variant="h5">Green Module 5</Typography>
                    </CardContent>
                  </Card>
                  <CardContent>
                    <Typography>Check which one Gelati Facilitator Did NOT do</Typography>
             
             
                    <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) =>
                            setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                          }
                          value={sendForm?.check_which_ones_the_gf_did_not_do}
                        />
                      </Stack>
                     
                  </CardContent>
                </Card>
              </CardContent>
            </Grid>
          ) : null}
          {sendForm?.assessment_of == 'Vyapar Module 1' ? (
            <Grid backgroundColor={'#FFD580'}>
              <CardContent>
                <Card>
                  <Card sx={{ backgroundColor: '#ff7424' }} mt={2}>
                    <CardContent>
                      <Typography variant="h5">Vyapar Training 1</Typography>
                    </CardContent>
                  </Card>
                  <CardContent>
                    <Stack mt={2}>
                      <Stack>
                        <Typography variant="body1">Check which ones the Field Associate did not do</Typography>
                        <RenderStringToArray string={sendForm?.check_which_ones_the_gf_did_not_do} />
                    
                      
                      </Stack>
                    </Stack>
                  </CardContent>{' '}
                </Card>
              </CardContent>
            </Grid>
          ) : null}
          {sendForm?.assessment_of == 'Vyapar Module 2' ? (
            <Grid backgroundColor={'#FFD580'}>
              <CardContent>
                <Card>
                  <Card sx={{ backgroundColor: '#ff7424' }} mt={2}>
                    <CardContent>
                      <Typography variant="h5">Vyapar Training 2</Typography>
                    </CardContent>
                  </Card>
                  <CardContent>
                    <Stack mt={2}>
                      <Stack>
                        <Typography variant="body1">Check which ones the Facilitators did not do</Typography>
                        <Stack mt={2}>
                          <FormGroup>
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Welcome"
                              value={'Welcome'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Recap of the 1st Vyapar training"
                              value={'Recap of the 1st Vyapar training'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Ask the question why you are joining here?"
                              value={'Ask the question why you are joining here'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Ask about the Self Shakthi day-2 phone question"
                              value={'Ask about the Self Shakthi day-2 phone question'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Business improvement / growth factors listed"
                              value={'Business improvement / growth factors listed'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="What type of business are you doing?"
                              value={'What type of business are you doing'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="What is the Income & formula of income"
                              value={'What is the Income & formula of income'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Income and Expenses chart"
                              value={'Income and Expenses chart'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Who is your customer?"
                              value={'Who is your customer'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Types of Sales"
                              value={'Types of Sales'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Types of Expenses"
                              value={'Types of Expenses'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Formula of Profit"
                              value={'Formula of Profit'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="List of the daily expenses and Income chart in the book"
                              value={'List of the daily expenses and Income chart in the book'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Given name for Vyapar-2"
                              value={'Given name for Vyapar-2'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Feedback"
                              value={'Feedback'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Homework"
                              value={'Homework'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Was the pledge made?"
                              value={'Was the pledge made'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                          </FormGroup>
                        </Stack>
                      </Stack>
                    </Stack>
                  </CardContent>{' '}
                </Card>
              </CardContent>
            </Grid>
          ) : null}
          {sendForm?.assessment_of == 'Vyapar Module 3' ? (
            <Grid backgroundColor={'#FFD580'}>
              <CardContent>
                <Card>
                  <Card sx={{ backgroundColor: '#ff7424' }} mt={2}>
                    <CardContent>
                      <Typography variant="h5">Vyapar Training 3</Typography>
                    </CardContent>
                  </Card>
                  <CardContent>
                    <Stack mt={2}>
                      <Stack>
                        <Typography variant="body1">Check which ones the Field Associates did not do</Typography>
                        <Stack mt={2}>
                          <FormGroup>
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Welcome"
                              value={'Welcome'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Recap of the 2nd Vyapar training"
                              value={'Recap of the 2nd Vyapar training'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Definition of the problem"
                              value={'Definition of the problem'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Temporary solution and permanent solution"
                              value={'Temporary solution and permanent solution'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Explanation of business problem"
                              value={'Explanation of business problem'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Temporary solution and permanent solution regarding the business  problem"
                              value={'Temporary solution and permanent solution regarding the business  problem'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="List down their own business problems"
                              value={'List down their own business problems'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Discuss about the solution in the group"
                              value={'Discuss about the solution in the group'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Activity as a tool for coping with risk"
                              value={'Activity as a tool for coping with risk'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Debrief about the activity by GF"
                              value={'Debrief about the activity by GF'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Given name for Vyapar-3"
                              value={'Given name for Vyapar-3'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Feedback"
                              value={'Feedback'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Homework"
                              value={'Homework'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Was the pledge made?"
                              value={'Was the pledge made'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                          </FormGroup>
                        </Stack>
                      </Stack>
                    </Stack>
                  </CardContent>{' '}
                </Card>
              </CardContent>
            </Grid>
          ) : null}
          {sendForm?.assessment_of == 'Vyapar Module 4' ? (
            <Grid backgroundColor={'#FFD580'}>
              <CardContent>
                <Card>
                  <Card sx={{ backgroundColor: '#ff7424' }} mt={2}>
                    <CardContent>
                      <Typography variant="h5">Vyapar Training 4</Typography>
                    </CardContent>
                  </Card>
                  <CardContent>
                    <Stack mt={2}>
                      <Stack>
                        <Typography variant="body1">Check which ones the Field Associates did not do</Typography>
                        <Stack mt={2}>
                          <FormGroup>
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Welcome"
                              value={'Welcome'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Recap of the 3rd Vyapar training"
                              value={'Recap of the 3rd Vyapar training'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Visualization their business and sharing the experience"
                              value={'Visualization their business and sharing the experience'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="What is goal?"
                              value={'What is goal'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="How should be the goal?"
                              value={'How should be the goal'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="SMART  Explanation"
                              value={'SMART  Explanation'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Writing their business goals based on SMART"
                              value={'Writing their business goals based on SMART'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="List of steps to achieve the goals"
                              value={'List of steps to achieve the goals'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Types of loans"
                              value={'Types of loans'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Formula of the Profit"
                              value={'Formula of the Profit'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Debrief from the GF"
                              value={'Debrief from the GF'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Given name for Vyapar-4"
                              value={'Given name for Vyapar-4'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Feedback"
                              value={'Feedback'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Homework"
                              value={'Homework'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Was the pledge made?"
                              value={'Was the pledge made'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                          </FormGroup>
                        </Stack>
                      </Stack>
                    </Stack>
                  </CardContent>{' '}
                </Card>
              </CardContent>
            </Grid>
          ) : null}
          {sendForm?.assessment_of == 'Vyapar Module 5' ? (
            <Grid backgroundColor={'#FFD580'}>
              <CardContent>
                <Card>
                  <Card sx={{ backgroundColor: '#ff7424' }} mt={2}>
                    <CardContent>
                      <Typography variant="h5">Vyapar Training 5</Typography>
                    </CardContent>
                  </Card>
                  <CardContent>
                    <Stack mt={2}>
                      <Stack>
                        <Typography variant="body1">Check which ones the Field Associates did not do</Typography>
                        <Stack mt={2}>
                          <FormGroup>
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Welcome"
                              value={'Welcome'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Recap of the 4th Vyapar training"
                              value={'Recap of the 4th Vyapar training'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="List out the different aspects of business"
                              value={'List out the different aspects of business'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Explanation about the SWOT"
                              value={'Explanation about the SWOT'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="List down their business strengths"
                              value={'List down their business strengths'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="List down their business weakness"
                              value={'List down their business weakness'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="List down their business opportunity"
                              value={'List down their business opportunity'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="List down their business threats"
                              value={'List down their business threats'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Evaluation of their business skills"
                              value={'Evaluation of their business skills'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Given the grade for their skills"
                              value={'Given the grade for their skills'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Sharing their grade in the pair"
                              value={'Sharing their grade in the pair'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Debrief from the GF"
                              value={'Debrief from the GF'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Given name for Vyapar-5"
                              value={'Given name for Vyapar-5'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Feedback"
                              value={'Feedback'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Homework"
                              value={'Homework'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Was the pledge made?"
                              value={'Was the pledge made'}
                              onChange={(event) => handleprerequisites('check_which_ones_the_gf_did_not_do', event)}
                            />
                          </FormGroup>
                        </Stack>
                      </Stack>
                    </Stack>
                  </CardContent>{' '}
                </Card>
              </CardContent>
            </Grid>
          ) : null}
          {/* 10  common*/}
          {sendForm?.program_assessment == 2 ? (
            <Grid backgroundColor={'#FFD580'}>
          
              <CardContent>
                <Card>
                  <Card sx={{ backgroundColor: '#ff7424' }} mt={2}>
                    <CardContent>
                      <Typography variant="h5">Attendance</Typography>
                     
                    </CardContent>
                  </Card>
                   <Card sx={{ marginTop: '20px' }}>
                   <CardContent>
                   <Typography >
                        The purpose of the section is to collect quantitative data around participation, excitement,
                        preparedness and the maintenance of interest level of the participants during the training.
                      </Typography>
                   </CardContent>
                  </Card>
                  <Card sx={{ marginTop: '20px' }}>
                    <CardContent>
                      <Typography>Number Of Enrolled Galathis in the circle ?</Typography>
                      <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          type="number"
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) =>
                            setSendForm({ ...sendForm, number_of_enrolled_gelathis_in_the_circle: e.target.value })
                          }
                          value={sendForm?.number_of_enrolled_gelathis_in_the_circle}
                        />
                      </Stack>
                      <Typography>Number of attended Gelathis?</Typography>
                      <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          type="number"
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) => setSendForm({ ...sendForm, no_of_attended_gelathis: e.target.value })}
                          value={sendForm?.no_of_attended_gelathis}
                        />
                      </Stack>
                      {/* <Typography>How many women attended the training session?
 
          </Typography>
                <Stack mt={2} mb={2}>
                        <TextField   label="Your Answer" variant="outlined" color="common" onChange={(e) => setSendForm({ ...sendForm, how_many_women_attended_the_training_session:e.target.value})} value={sendForm?.how_many_women_attended_the_training_session}/>
                    </Stack>  */}
                    </CardContent>
                  </Card>
                </Card>
                <Card sx={{ marginTop: 2 }}>
                  <CardContent>
                    <Typography mb={2}>Level of participation (1 is poor and 5 is excellent)</Typography>
                    <Typography mb={2}>Reached the venue on or before time</Typography>
                    
                    <Stack mt={2} mb={2}>
                  <TextField
                    disabled
                    inputProps={{ disabled: true }}
                    label="Your Answer"
                    variant="outlined"
                    color="common"
                    onChange={(e) => setSendForm({ ...sendForm, name_of_the_assessor: e.target.value })}
                    value={sendForm?.level_of_participation_1}
                  />
                </Stack>
                <Typography mb={2}>Present for the entire session</Typography>
                    
                    <Stack mt={2} mb={2}>
                  <TextField
                    disabled
                    inputProps={{ disabled: true }}
                    label="Your Answer"
                    variant="outlined"
                    color="common"
                    onChange={(e) => setSendForm({ ...sendForm, name_of_the_assessor: e.target.value })}
                    value={sendForm?.level_of_participation_3}
                  />
                </Stack>
                <Typography mb={2}>Leave in the meeting/ training in between?</Typography>
                    
                    <Stack mt={2} mb={2}>
                  <TextField
                    disabled
                    inputProps={{ disabled: true }}
                    label="Your Answer"
                    variant="outlined"
                    color="common"
                    onChange={(e) => setSendForm({ ...sendForm, name_of_the_assessor: e.target.value })}
                    value={sendForm?.level_of_participation_4}
                  />
                </Stack>
                <Typography mb={2}>Signed the ledger/meeting minute</Typography>
                    
                    <Stack mt={2} mb={2}>
                  <TextField
                    disabled
                    inputProps={{ disabled: true }}
                    label="Your Answer"
                    variant="outlined"
                    color="common"
                    onChange={(e) => setSendForm({ ...sendForm, name_of_the_assessor: e.target.value })}
                    value={sendForm?.level_of_participation_5}
                  />
                </Stack>
                  </CardContent>
                </Card>
              </CardContent>
            </Grid>
          ) : null}
          {/* 12 common */}
          {sendForm?.program_assessment == 2 ? (
            <Grid backgroundColor={'#FFD580'}>
             
              <CardContent>
                <Card>
                  <Card sx={{ backgroundColor: '#ff7424' }} mt={2}>
                    <CardContent>
                      <Typography>Feedback to Field Associate</Typography>
                    </CardContent>
                  </Card>
                  <Card sx={{ marginTop: '20px' }}>
                    <CardContent>
                      <Stack>
                        <Typography>
                          The purpose of this sector is to help Gelathis learn to improves their skill sets around
                          facilitation of the training.
                        </Typography>
                        <Stack>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                </Card>
                <Card sx={{ marginTop: 2 }}>
                  <CardContent>
                  
                        <Typography>
                        The Field Associate competently covered the following things in the training delivered
                 
                        </Typography>
                        <RenderStringToArray string={sendForm?.the_gf_competently_covered_folowing_things_in_training_delivered} />
                    
                      
                       
                     
                  
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: 2 }}>
                  <CardContent>
                    <Typography mb={2}>Rate The Field Associate(Out of 5)</Typography>
                  
                    <Typography mb={2}>Prior preparedness and planning for the session
</Typography>
                    <Stack mt={2} mb={2}>
                  <TextField
                    disabled
                    inputProps={{ disabled: true }}
                    label="Your Answer"
                    variant="outlined"
                    color="common"
                    onChange={(e) => setSendForm({ ...sendForm, name_of_the_assessor: e.target.value })}
                    value={sendForm?.rate_the_gf_1}
                  />
                </Stack>
                <Typography mb={2}>Venue
</Typography>
                    <Stack mt={2} mb={2}>
                  <TextField
                    disabled
                    inputProps={{ disabled: true }}
                    label="Your Answer"
                    variant="outlined"
                    color="common"
                    onChange={(e) => setSendForm({ ...sendForm, name_of_the_assessor: e.target.value })}
                    value={sendForm?.rate_the_gf_2}
                  />
                </Stack>
                <Typography mb={2}>Report of GF with Gelathis
</Typography>
                    <Stack mt={2} mb={2}>
                  <TextField
                    disabled
                    inputProps={{ disabled: true }}
                    label="Your Answer"
                    variant="outlined"
                    color="common"
                    onChange={(e) => setSendForm({ ...sendForm, name_of_the_assessor: e.target.value })}
                    value={sendForm?.rate_the_gf_3}
                  />
                </Stack>
                <Typography mb={2}>Body language during the training
</Typography>
                    <Stack mt={2} mb={2}>
                  <TextField
                    disabled
                    inputProps={{ disabled: true }}
                    label="Your Answer"
                    variant="outlined"
                    color="common"
                    onChange={(e) => setSendForm({ ...sendForm, name_of_the_assessor: e.target.value })}
                    value={sendForm?.rate_the_gf_4}
                  />
                </Stack>
                <Typography mb={2}>Making session interactive and fun
</Typography>
                    <Stack mt={2} mb={2}>
                  <TextField
                    disabled
                    inputProps={{ disabled: true }}
                    label="Your Answer"
                    variant="outlined"
                    color="common"
                    onChange={(e) => setSendForm({ ...sendForm, name_of_the_assessor: e.target.value })}
                    value={sendForm?.rate_the_gf_5}
                  />
                </Stack>
                <Typography mb={2}>Knowledge of the content of the training
</Typography>
                    <Stack mt={2} mb={2}>
                  <TextField
                    disabled
                    inputProps={{ disabled: true }}
                    label="Your Answer"
                    variant="outlined"
                    color="common"
                    onChange={(e) => setSendForm({ ...sendForm, name_of_the_assessor: e.target.value })}
                    value={sendForm?.rate_the_gf_6}
                  />
                </Stack>
                <Typography mb={2}>Ability to clear doubts
</Typography>
                    <Stack mt={2} mb={2}>
                  <TextField
                    disabled
                    inputProps={{ disabled: true }}
                    label="Your Answer"
                    variant="outlined"
                    color="common"
                    onChange={(e) => setSendForm({ ...sendForm, name_of_the_assessor: e.target.value })}
                    value={sendForm?.rate_the_gf_7}
                  />
                </Stack>
                <Typography mb={2}>Ability to inspire the Gelathi's
</Typography>
                    <Stack mt={2} mb={2}>
                  <TextField
                    disabled
                    inputProps={{ disabled: true }}
                    label="Your Answer"
                    variant="outlined"
                    color="common"
                    onChange={(e) => setSendForm({ ...sendForm, name_of_the_assessor: e.target.value })}
                    value={sendForm?.rate_the_gf_8}
                  />
                </Stack>
                <Typography mb={2}>Ability to give clear link between the activity and the content
</Typography>
                    <Stack mt={2} mb={2}>
                  <TextField
                    disabled
                    inputProps={{ disabled: true }}
                    label="Your Answer"
                    variant="outlined"
                    color="common"
                    onChange={(e) => setSendForm({ ...sendForm, name_of_the_assessor: e.target.value })}
                    value={sendForm?.rate_the_gf_9}
                  />
                </Stack>
                <Typography mb={2}>Vulnerable and honest
</Typography>
                    <Stack mt={2} mb={2}>
                  <TextField
                    disabled
                    inputProps={{ disabled: true }}
                    label="Your Answer"
                    variant="outlined"
                    color="common"
                    onChange={(e) => setSendForm({ ...sendForm, name_of_the_assessor: e.target.value })}
                    value={sendForm?.rate_the_gf_10}
                  />
                </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: '20px' }}>
                  <CardContent>
                    <Typography>What worked in the training?</Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        disabled
                        inputProps={{ disabled: true }}
                        type="text"
                        label="Your Answer"
                        variant="outlined"
                        color="common"
                        onChange={(e) => setSendForm({ ...sendForm, what_worked_in_the_training: e.target.value })}
                        value={sendForm?.what_worked_in_the_training}
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: '20px' }}>
                  <CardContent>
                    <Typography>What can be better next time?</Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        disabled
                        inputProps={{ disabled: true }}
                        type="text"
                        label="Your Answer"
                        variant="outlined"
                        color="common"
                        onChange={(e) => setSendForm({ ...sendForm, what_can_be_better_next_time: e.target.value })}
                        value={sendForm?.what_can_be_better_next_time}
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: '20px' }}>
                  <CardContent>
                    <Typography>
                      Any further training and understanding disabled by the Field Associate of any of the training
                      modules delivered
                      
                    </Typography>
                    <RenderStringToArray string={sendForm?.any_futher_training_and_understding_reqired_by_gf_traing_module} />
                    
                 
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: '20px' }}>
                  <CardContent>
                    <Typography>
                      Did you find anything in the training/ Field Associate that needs to be worked on priority?
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        disabled
                        inputProps={{ disabled: true }}
                        type="text"
                        label="Your Answer"
                        variant="outlined"
                        color="common"
                        onChange={(e) =>
                          setSendForm({
                            ...sendForm,
                            did_you_find_anything_traiing_or_gf_that_neds_to_worked_priority: e.target.value,
                          })
                        }
                        value={sendForm?.did_you_find_anything_traiing_or_gf_that_neds_to_worked_priority}
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: '20px' }}>
                  <CardContent>
                    <Typography>Details of success stories to be collected from Gelathis by GF</Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        disabled
                        inputProps={{ disabled: true }}
                        type="text"
                        label="Your Answer"
                        variant="outlined"
                        color="common"
                        onChange={(e) =>
                          setSendForm({
                            ...sendForm,
                            details_of_success_stories_to_be_collected_from_gelathis_by_gf: e.target.value,
                          })
                        }
                        value={sendForm?.details_of_success_stories_to_be_collected_from_gelathis_by_gf}
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: '20px' }}>
                  <CardContent>
                    <Typography>Deadline to collect the stories</Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        disabled
                        label="Your Answer"
                        variant="outlined"
                        color="common"
                        onChange={(e) => setSendForm({ ...sendForm, deadline_to_collect_the_stories: e.target.value })}
                        value={sendForm?.deadline_to_collect_the_stories}
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: '20px' }}>
                  <CardContent>
                    <Typography>End time of the training</Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                      disabled
                        inputProps={{ disabled: true }}
                        type="time"
                        label="Your Answer"
                        variant="outlined"
                        color="common"
                        onChange={(e) => setSendForm({ ...sendForm, end_time_of_the_training: e.target.value })}
                        value={sendForm?.end_time_of_the_training}
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: '20px' }}>
                  <CardContent>
                    <Typography>No of participants at end of the session</Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                      disabled
                        type="number"
                        label="Your Answer"
                        variant="outlined"
                        color="common"
                        onChange={(e) =>
                          setSendForm({ ...sendForm, no_of_participants_at_end_of_the_session: e.target.value })
                        }
                        value={sendForm?.no_of_participants_at_end_of_the_session}
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: '20px' }}>
                  <CardContent>
                    <Typography>Any other comments about the Field Associate</Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        disabled
                        inputProps={{ disabled: true }}
                        type="text"
                        label="Your Answer"
                        variant="outlined"
                        color="common"
                        onChange={(e) =>
                          setSendForm({ ...sendForm, any_other_comments_about_the_gelathi_facilitator: e.target.value })
                        }
                        value={sendForm?.any_other_comments_about_the_gelathi_facilitator}
                      />
                    </Stack>
                  </CardContent>
                </Card>
              </CardContent>
            </Grid>
          ) : null}
          <br />
          {sendForm?.program_assessment == 1 ? (
            <Grid backgroundColor={'#FFD580'}>
           
              <CardContent>
                <Card>
                  <Card sx={{ backgroundColor: '#ff7424' }} mt={2}>
                    <CardContent>
                      <Typography>Self-Shakti</Typography>
                      <Typography>Training Quality assessment</Typography>
                    </CardContent>
                  </Card>
                  <Card sx={{ marginTop: '20px' }}>
                    <CardContent>
                      <Stack>
                        <Typography>Day1 or Day 2 </Typography>
                        <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) =>
                            setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                          }
                          value={sendForm?.day1_or_day2}
                        />
                      </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                </Card>
              </CardContent>
            </Grid>
          ) : null}
          {/* 13 */}
          {sendForm?.day1_or_day2 == 'Day 1' ? (
            <Grid backgroundColor={'#FFD580'}>
            
              <CardContent>
                <Card>
                  <Card sx={{ backgroundColor: '#ff7424' }} mt={2}>
                    <CardContent>
                      <Typography variant="h5">Day-1</Typography>
                    </CardContent>
                  </Card>
                  <CardContent>
                    <Typography>Name of the trainer being evaluated</Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        disabled
                        inputProps={{ disabled: true }}
                        label="Your Answer"
                        variant="outlined"
                        color="common"
                       
                         
                        value={sendForm?.name_of_the_trainer_being_evaluated}
                      />
                    </Stack>
                  </CardContent>
                </Card>
              </CardContent>
            </Grid>
          ) : null}
          <br />
          {/* 14 */}
          {sendForm?.day1_or_day2 == 'Day 1' ? (
            <Grid backgroundColor={'#FFD580'}>
            
              <CardContent>
                <Card>
                  <Card sx={{ backgroundColor: '#ff7424' }} mt={2}>
                    <CardContent>
                      <Typography variant="h5">Before the training starts on Day 1</Typography>
                    </CardContent>
                  </Card>
                  <CardContent>
                    <Typography>Check which ones the Trainer did NOT do</Typography>
                    <RenderStringToArray string={sendForm?.check_which_ones_the_trainer_did_not_do} />
                 
                  </CardContent>
                </Card>
              </CardContent>
            </Grid>
          ) : null}
          <br />
          {/* 15 */}
          {sendForm?.day1_or_day2 == 'Day 1' ? (
            <Grid backgroundColor={'#FFD580'}>
             
              <CardContent>
                <Card>
                  <Card sx={{ backgroundColor: '#ff7424' }} mt={2}>
                    <CardContent>
                      <Typography variant="h5">Module 1 (M1) Introduction of Buzz:</Typography>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent>
                      <Typography> How many women attended the training session?</Typography>
                      <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                        
                          value={sendForm?.how_many_women_attended_the_training_session}
                        />
                      </Stack>
                    </CardContent>
                  </Card>
                </Card>
                <Card sx={{ marginTop: 2 }}>
                  <CardContent>
                    <Typography>Check which ones the trainer did not do</Typography>
                    <RenderStringToArray string={sendForm?.check_which_ones_the_trainer_did_not_do_1} />
                    
                   
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: '20px' }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography>Were the women interactive?</Typography>
                      <Stack mt={2} mb={2}>
                    <TextField 
                     disabled inputProps={{ disabled: true }} label="Your Answer" variant="outlined" color="common"
                     value={sendForm?.were_the_women_interactive} />
                </Stack> 
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: '20px' }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography>
                        Did any women leave the training session during or after the first module?
                      </Typography>
                      <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                       
                          value={sendForm?.did_any_women_leave_tring_session_dring_or_after_1st_module}
                        />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
             {  (sendForm?.did_any_women_leave_tring_session_dring_or_after_1st_module=='Yes')? <Card sx={{ marginTop: '20px' }}>
                  <CardContent>
                    <Typography>If so, how many?</Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        type="number"
                        disabled
                        inputProps={{ disabled: true }}
                        label="Your Answer"
                        variant="outlined"
                        color="common"
                       value={sendForm?.if_so_how_many}
                      />
                    </Stack>
                  </CardContent>
                </Card>:null}
                <Card sx={{ marginTop: '20px' }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography>Did this module take 20 minutes as allotted?</Typography>
                      <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                         
                          value={sendForm?.did_this_module_take_20_minutes_as_allotted}
                        />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </CardContent>
            </Grid>
          ) : null}
          <br />
          {sendForm?.day1_or_day2 == 'Day 1' ? (
            <Grid style={{ backgroundColor: '#FFD580' }}>
            
              <Card sx={{ mt: 4, margin: '20px', backgroundColor: '#ff7424' }}>
                <CardContent>
                  <Stack>
                    <Typography style={{ fontWeight: 700 }} color="primary">
                      Module 2 (M2) Basics of an Enterprise: <br />
                    </Typography>
                  </Stack>
                </CardContent>
                <Card sx={{ mt: 2 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography variant="body2">
                        Did any new women attend the training session during this module?/ಈ ಮಾಡ್ಯೂಲ್ ನಲ್ಲಿ ಯಾವುದೇ ಹೊಸ
                        ಮಹಿಳೆಯರು ತರಬೇತಿ ಸೆಷನ್ ಗೆ ಹಾಜರಾಗಿದ್ದಾರೆಯೇ?
                      </Typography>
                      <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                        
                          value={sendForm?.did_any_new_women_attend_the_training_session_during_module}
                        />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Card>
              {/* <Card sx={{mt:2,}} >
        <CardContent>
        <Stack mt={2}>
                <Typography variant="body2">Did any new women attend the training session during this module?/ಈ ಮಾಡ್ಯೂಲ್ ನಲ್ಲಿ ಯಾವುದೇ ಹೊಸ ಮಹಿಳೆಯರು ತರಬೇತಿ ಸೆಷನ್ ಗೆ ಹಾಜರಾಗಿದ್ದಾರೆಯೇ?</Typography>
                <Stack mt={2}>
                <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                     
                      name="radio-buttons-group"
                      onChange={(e, value) => { setSendData({ ...sendData,ownAsset : value }) }}
                  
                    >
                    <div style={{display:"flex"}}>
                      <FormControlLabel value="No" control={<Radio style={{color:"#595959"}} />} label="No" />
                      <FormControlLabel value="Yes" control={<Radio style={{color:"#595959"}}  />} label="Yes" />
                      </div>
                    </RadioGroup>
                </Stack>
              </Stack>
       
             
        </CardContent>
     </Card> */}
             {(sendForm?.did_any_new_women_attend_the_training_session_during_module=="Yes")? <Card sx={{ margin: '20px' }}>
                <CardContent>
                  <Stack>
                    <Typography variant="body1">If so, How many?/ಹಾಗಿದ್ದರೆ ಎಷ್ಟು?</Typography>
                    <Stack mt={3}>
                      <TextField
                        type="number"
                        disabled
                        inputProps={{ disabled: true }}
                        id="Your Answer"
                        label="Your Answer"
                        variant="outlined"
                       
                        value={sendForm?.if_so_how_many_1}
                      />
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>: null}
              <Card sx={{ margin: '20px' }}>
                <CardContent>
                  <Stack mt={2}>
                    <Typography>
                      Check which ones the trainer did not do/ತರಬೇತುದಾರನು ಯಾವುದನ್ನು ಮಾಡಲಿಲ್ಲ ಎಂಬುದನ್ನು ಪರಿಶೀಲಿಸಿ
                    </Typography>
                    <RenderStringToArray string={sendForm?.check_which_ones_the_trainer_did_not_do_2} />
                      
                
                  </Stack>
                </CardContent>
              </Card>
              <Card sx={{ margin: '20px' }}>
                <CardContent>
                  <Stack mt={2}>
                    <Typography>
                      During the debrief the trainer did: /ಡಿಬ್ರೀಫ್ ಸಮಯದಲ್ಲಿ ತರಬೇತುದಾರನು ಹೀಗೆ ಮಾಡಿದನು( check the ones
                      he/she did)
                    </Typography>
                    <RenderStringToArray string={sendForm?.during_the_debrief_the_trainer_did} />
                      
                
                  
                  
                  </Stack>
                </CardContent>
              </Card>
              <Card sx={{ margin: '20px' }}>
                <CardContent>
                  <Stack mt={2}>
                    <Typography>
                      {' '}
                      Did any women leave the training session during or after the first module?/ಮೊದಲ ಮಾಡ್ಯೂಲ್ ಸಮಯದಲ್ಲಿ
                      ಅಥವಾ ನಂತರ ಯಾವುದೇ ಮಹಿಳೆಯರು ಸೆಷನ್ ಅನ್ನು ತೊರೆದಿದ್ದಾರೆಯೇ?
                    </Typography>
                  
                    <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                      
                          value={sendForm?.did_any_women_leve_training_session_during_or_after_1st_module_1}
                        />
                      </Stack>
                  </Stack>
                </CardContent>
              </Card>
            { (sendForm?.did_any_women_leve_training_session_during_or_after_1st_module_1=='Yes')? <Card sx={{ margin: '20px' }}>
                <CardContent>
                
                    <Typography variant="body1">If so, How many?/ಹಾಗಿದ್ದರೆ ಎಷ್ಟು?</Typography>
                    <Stack mt={3}>
                      <TextField
                        type="number"
                        disabled
                        inputProps={{ disabled: true }}
                        id="Your Answer"
                        label="Your Answer"
                        variant="outlined"
                    
                        value={sendForm?.if_so_how_many_2}
                      />
                    </Stack>
                
                </CardContent>
              </Card>: null}
              <Card sx={{ margin: '20px' }}>
                <CardContent>
                  <Stack mt={2}>
                    <Typography>
                      Did this module take 20 minutes as allotted?/ಈ ಮಾಡ್ಯೂಲ್ ನಿಗದಿಪಡಿಸಿದಂತೆ 20 ನಿಮಿಷಗಳನ್ನು
                      ತೆಗೆದುಕೊಂಡಿದೆಯೇ?
                    </Typography>
                    <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                        
                          value={sendForm?.did_this_module_take_20_minutes_as_allotted_1}
                        />
                      </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ) : null}
          <br />
          {sendForm?.day1_or_day2 == 'Day 1' ? (
            <Grid style={{ backgroundColor: '#FFD580' }}>
             
              <CardContent>
                <Card sx={{ mt: 4, margin: '20px', backgroundColor: '#ff7424' }}>
                  <CardContent>
                    <Stack>
                      <Typography style={{ fontWeight: 700 }} color="primary">
                        Module 3 (M3) Building Relationships
                      </Typography>
                    </Stack>
                  </CardContent>
                  {/* <Card>
                <CardContent>
              <Stack mt={2}>
                <Typography variant="body2">Did any new women attend the training session during this module</Typography>
                <Stack mt={2}>
                <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                     
                      name="radio-buttons-group"
                      
                  
                    >
                    <div style={{display:"flex"}}>
                      <FormControlLabel value="No" control={<Radio style={{color:"#595959"}} />} label="No" />
                      <FormControlLabel value="Yes" control={<Radio style={{color:"#595959"}}  />} label="Yes" />
                      </div>
                    </RadioGroup>
                </Stack>
              </Stack>
              </CardContent>
              </Card> */}
                </Card>
                <Card sx={{ mt: 2, margin: '20px' }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography variant="body2">
                        Did any new women attend the training session during this module
                      </Typography>
                      <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                      
                          value={sendForm?.did_any_new_women_attend_training_session_during_this_module_1}
                        />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
                {(sendForm?.did_any_new_women_attend_training_session_during_this_module_1=='Yes')? <Card sx={{ margin: '20px' }}>
                  <CardContent>
                 
                      <Typography variant="body1">If so, How many?</Typography>
                      <Stack mt={3}>
                        <TextField
                          type="number"
                          disabled
                          inputProps={{ disabled: true }}
                          id="Your Answer"
                          label="Your Answer"
                          variant="outlined"
                        
                          value={sendForm?.if_so_how_many_3}
                        />
                      </Stack>
                   
                  </CardContent>
                </Card>: null}
                <Card sx={{ margin: '20px' }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography>Check which ones the trainer did not do</Typography>
                      <RenderStringToArray string={sendForm?.check_which_ones_the_trainer_did_not_do_3} />
                    
                   
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ margin: '20px' }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography>
                        During the debriefs for role plays the trainer did not ask: ( check the ones he/she did)
                      </Typography>
                      <RenderStringToArray string={sendForm?.during_the_debriefs_for_role_plays_the_trainer_did_not_ask} />
                    
                   
                 
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ margin: '20px' }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography> Did the trainer leave the women to read the role play card themselves?</Typography>
                      <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                       
                          value={sendForm?.did_the_trainer_leave_women_to_read_role_play_card_themselves}
                        />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ margin: '20px' }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography> Did the groups engage and interact among themselves well?</Typography>
                      <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                       
                          value={sendForm?.did_the_groups_engage_and_interact_among_themselves_well       
                        }
                        />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ margin: '20px' }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography>Were the participants responsive during the debriefing?</Typography>
                      <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                       
                          value={sendForm?.were_the_participants_responsive_during_the_debriefing}
                        />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ margin: '20px' }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography>Did any women leave the training session during or after this module?</Typography>
                      <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                        
                          value={sendForm?.did_any_wmen_leave_the_trning_sesion_during_or_aftr_tis_modle_1}
                        />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
               {(sendForm?.did_any_wmen_leave_the_trning_sesion_during_or_aftr_tis_modle_1=='Yes')? <Card sx={{ margin: '20px' }}>
                  <CardContent>
                 
                      <Typography variant="body1">If so, How many?</Typography>
                      <Stack mt={3}>
                        <TextField
                          type="number"
                          disabled
                          inputProps={{ disabled: true }}
                          id="Your Answer"
                          label="Your Answer"
                          variant="outlined"
                       
                          value={sendForm?.if_so_how_many_4}
                        />
                      </Stack>
                
                  </CardContent>
                </Card>: null}
                <Card sx={{ margin: '20px' }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography> Did this module take 30 minutes as allotted?</Typography>
                      <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          value={sendForm?.did_this_module_take_30_minutes_as_allotted_1}
                        />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </CardContent>
            </Grid>
          ) : null}
          {sendForm?.day1_or_day2 == 'Day 1' ? (
            <Grid backgroundColor={'#FFD580'}>
          
              <CardContent>
                <Card>
                  <Card sx={{ backgroundColor: '#ff7424' }} mt={2}>
                    <CardContent>
                      <Typography variant="h5">Module 4 (M4) Daily Money Management:</Typography>
                    </CardContent>
                  </Card>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography>Did any new women attend the training session during this this module?</Typography>
                      
                      <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                       
                          value={sendForm?.did_any_new_women_attend_training_session_during_this_module_2}
                        />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
               {(sendForm?.did_any_new_women_attend_training_session_during_this_module_2=='Yes')? <Card sx={{ margin: '20px' }}>
                  <CardContent>
                    <Stack>
                      <Typography variant="body1">If so, How many?</Typography>
                      <Stack mt={3}>
                        <TextField
                          type="number"
                          disabled
                          inputProps={{ disabled: true }}
                          id="Your Answer"
                          label="Your Answer"
                          variant="outlined"
                        
                          value={sendForm?.if_so_how_many_5}
                        />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>: null}
                <Card sx={{ marginTop: 2 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography>Check which ones the trainer did not do</Typography>
                      <RenderStringToArray string={sendForm?.check_which_ones_the_trainer_did_not_do_4} />
                    
                   
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: 2 }}>
                  <CardContent>
                    <Stack>
                      <Typography variant="body1">
                        How many women remained by the end of this training session?
                      </Typography>
                      <Stack mt={3}>
                        <TextField
                          type="number"
                          disabled
                          inputProps={{ disabled: true }}
                          id="Your Answer"
                          label="Your Answer"
                          variant="outlined"
                      
                          value={sendForm?.how_many_women_remained_by_the_end_of_this_training_session}
                        />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: 2 }}>
                  <CardContent>
                    <Stack>
                      <Typography variant="body1">How many are likely to come back?</Typography>
                      <Stack mt={3}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          id="Your Answer"
                          label="Your Answer"
                          variant="outlined"
                  
                          value={sendForm?.how_many_are_likely_to_come_back}
                        />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: 2 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography> Did this module take 30 minutes as allotted?</Typography>
                      
                      <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          value={sendForm?.did_this_module_take_30_minutes_as_allotted_1}
                        />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </CardContent>
            </Grid>
          ) : null}
          {sendForm?.day1_or_day2 == 'Day 1' ? (
            <Grid backgroundColor={'#FFD580'}>
             
              <CardContent>
                <Card>
                  <Card sx={{ backgroundColor: '#ff7424' }} mt={2}>
                    <CardContent>
                      <Typography variant="h5">Post - training on Day 1:</Typography>
                    </CardContent>
                  </Card>
                  <Card sx={{ marginTop: 2 }}>
                    <CardContent>
                      <Stack mt={2}>
                        <Typography>Check which ones the trainer did not do</Typography>
                        <RenderStringToArray string={sendForm?.check_which_ones_the_trainer_did_not_do_5} />
                    
                      
                      </Stack>
                    </CardContent>
                  </Card>
                </Card>
                {/* <Card sx={{marginTop:2}}>
        <CardContent>
        <Stack mt={2}>
                <Typography>
                Name of the trainer being evaluated
                </Typography>
                <Stack mt={2}>
                  <FormGroup>
                    
                    
                    
                    
                    <FormControlLabel value="Ask how was it for you?" control={<Checkbox />} label="Ask how was it for you?" onChange={(event)=>handlecheckedata('borrowedmoney',event)}/>
                    <FormControlLabel value="Ask what did you learn new today?" control={<Checkbox />} label="Ask what did you learn new today?" onChange={(event)=>handlecheckedata('borrowedmoney',event)}/>
                    <FormControlLabel value="Ask do you have any feedback for me as a trainer or for our organisation so that we can deliver the best experience for you?" control={<Checkbox />} label="Ask do you have any feedback for me as a trainer or for our organisation so that we can deliver the best experience for you?" onChange={(event)=>handlecheckedata('borrowedmoney',event)}/>
                    <FormControlLabel value="Ask the women that if they have any doubts/questions they can ask right now in the group or ask in person?" control={<Checkbox />} label="Ask the women that if they have any doubts/questions they can ask right now in the group or ask in person?" onChange={(event)=>handlecheckedata('borrowedmoney',event)}/>
                    <FormControlLabel value="Tell the women what will be covered in the next training session" control={<Checkbox />} label="Tell the women what will be covered in the next training session" onChange={(event)=>handlecheckedata('borrowedmoney',event)}/>
                    <FormControlLabel value="Ask them to share with their family what they have learnt?" control={<Checkbox />} label="Ask them to share with their family what they have learnt?" onChange={(event)=>handlecheckedata('borrowedmoney',event)}/>
                    <FormControlLabel value="Create excitement/curiosity among the participants about the next training session" control={<Checkbox />} label="Create excitement/curiosity among the participants about the next training session" onChange={(event)=>handlecheckedata('borrowedmoney',event)}/>
                    <FormControlLabel value="Tell them that Buzz India will be following up on them for the next three years through a Buzz Gelathi" control={<Checkbox />} label="Tell them that Buzz India will be following up on them for the next three years through a Buzz Gelathi" onChange={(event)=>handlecheckedata('borrowedmoney',event)}/>
                    <FormControlLabel value="Explain the concept and functions of the Buzz Gelathi" control={<Checkbox />} label="Explain the concept and functions of the Buzz Gelathi" onChange={(event)=>handlecheckedata('borrowedmoney',event)}/>
                    <FormControlLabel value="Appreciate the Anganwadi teacher" control={<Checkbox />} label="Appreciate the Anganwadi teacher" onChange={(event)=>handlecheckedata('borrowedmoney',event)}/>
                    
                    
                   
                   
                    
                  </FormGroup>
                </Stack>
              </Stack>
        
       
        </CardContent>
     </Card> */}
              </CardContent>
            </Grid>
          ) : null}
          {sendForm?.day1_or_day2 == 'Day 2' ? (
            <Grid backgroundColor={'#FFD580'}>
             
              <CardContent>
                <Card>
                  <Card sx={{ backgroundColor: '#ff7424' }} mt={2}>
                    <CardContent>
                      <Typography variant="h5">Day-2</Typography>
                    </CardContent>
                  </Card>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography>Name of the trainer being evaluated</Typography>
         
                      
                      <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                     
                          value={sendForm?.name_of_the_trainer_being_evaluated}
                        />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: 2 }}>
                  <CardContent>
                    <Stack>
                      <Typography variant="body1">How many women attended the training session? (number)</Typography>
                      <Stack mt={3}>
                        <TextField
                          type="number"
                          disabled
                          inputProps={{ disabled: true }}
                          id="Your Answer"
                          label="Your Answer"
                          variant="outlined"
                        
                          value={sendForm?.how_many_women_attended_the_training_session}
                        />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: 2 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography>Check which ones the trainer did not do</Typography>
                      <RenderStringToArray string={sendForm?.check_which_ones_the_trainer_did_not_do} />
                    
                  
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: 2 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography>Was the recap done?</Typography>
                         
                      <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                       
                          value={sendForm?.was_the_recap_done}
                        />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: 2 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography>Did the recap take 15 minutes as allotted?</Typography>
                      
                   
                      <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                   
                          value={sendForm?.did_the_recap_take_15_minutes_as_allotted}
                        />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: 2 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography>Check which ones the trainer did not do</Typography>
                    
                      <RenderStringToArray string={sendForm?.check_which_ones_the_trainer_did_not_do_1} />
                    
                     
                    </Stack>
                  </CardContent>
                </Card>
              </CardContent>
            </Grid>
          ) : null}
          {sendForm?.day1_or_day2 == 'Day 2' ? (
            <Grid backgroundColor={'#FFD580'}>
              <CardContent>
                <Card>
                  <Card sx={{ backgroundColor: '#ff7424' }} mt={2}>
                    <CardContent>
                      <Typography variant="h5">Module 5 (M5) Assets & Liabilities:</Typography>
                    </CardContent>
                  </Card>
                  <CardContent>
                    <Stack mt={2}>
                      <Stack>
                        <Typography variant="body1">How many women attended the training session?</Typography>
                        <Stack mt={3}>
                          <TextField
                            disabled
                            inputProps={{ disabled: true }}
                            id="Your Answer"
                            label="Your Answer"
                            variant="outlined"
                        
                            value={sendForm?.how_many_women_attended_the_training_session_1}
                          />
                        </Stack>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: '20px' }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography>Check which ones the trainer did not do:</Typography>
                      <RenderStringToArray string={sendForm?.check_which_ones_the_trainer_did_not_do_2} />
                    
                    {/* { 
                    ( sendForm?.check_which_ones_the_trainer_did_not_do_2)?
                    sendForm?.check_which_ones_the_trainer_did_not_do_2.split(",").map((index , item)=>{
                        <Typography key={index}>{ item}</Typography>
                      }) : null
                    } */}
                  
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: '20px' }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography>During the debrief did the trainer not do the following:</Typography>
                      
                      <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                      
                          value={sendForm?.during_the_debrief_did_the_trainer_did_not_do_the_following}
                        />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: '20px' }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography>Were the participants responsive during the debriefing?</Typography>
                      <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) =>
                            setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                          }
                          value={sendForm?.were_the_participants_responsive_during_the_debriefing}
                        />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>{' '}
                <Card sx={{ marginTop: '20px' }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography>Did any women leave the training session during or after this module?</Typography>
        
        <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) =>
                            setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                          }
                          value={sendForm?.did_any_women_leave_tring_session_dring_or_after_1st_module}
                        />
                      </Stack>      
                    
                    </Stack>
                  </CardContent>
                </Card>
               {(sendForm?.did_any_women_leave_tring_session_dring_or_after_1st_module=='Yes')? <Card sx={{ marginTop: '20px' }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Stack>
                        <Typography variant="body1">If so, how many?</Typography>
                        <Stack mt={3}>
                          <TextField
                            type="number"
                            disabled
                            inputProps={{ disabled: true }}
                            id="Your Answer"
                            label="Your Answer"
                            variant="outlined"
                            onChange={(e) => setSendForm({ ...sendForm, if_so_how_many: e.target.value })}
                            value={sendForm?.if_so_how_many}
                          />
                        </Stack>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>:null}
                <Card sx={{ marginTop: '20px' }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography>Did this module take 30 minutes as allotted?</Typography>
                
                      
                      <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) =>
                            setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                          }
                          value={sendForm?.did_this_module_take_30_minutes_as_allotted}
                        />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </CardContent>
            </Grid>
          ) : null}
          {sendForm?.day1_or_day2 == 'Day 2' ? (
            <Grid backgroundColor={'#FFD580'}>
              <CardContent>
                <Card>
                  <Card sx={{ backgroundColor: '#ff7424' }} mt={2}>
                    <CardContent>
                      <Typography variant="h5">Module 6 (M6): Goal setting game</Typography>
                    </CardContent>
                  </Card>
                  <CardContent>
                    <Stack mt={2}>
                      <Stack>
                        <Typography variant="body1">How many women attended the training session?</Typography>
                        <Stack mt={3}>
                          <TextField
                            type="number"
                            disabled
                            inputProps={{ disabled: true }}
                            id="Your Answer"
                            label="Your Answer"
                            variant="outlined"
                            onChange={(e) =>
                              setSendForm({
                                ...sendForm,
                                how_many_women_attended_the_training_session_2: e.target.value,
                              })
                            }
                            value={sendForm?.how_many_women_attended_the_training_session_2}
                          />
                        </Stack>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: '20px' }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography>Check which ones the trainer did not do:</Typography>
                      <RenderStringToArray string={sendForm?.check_which_ones_the_trainer_did_not_do_2} />
                    
                    
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: '20px' }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography>Check which instructions the trainer did not do</Typography>
                      <RenderStringToArray string={sendForm?.check_which_instructions_the_trainer_did_not_do} />
                    
                 
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: '20px' }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography>Repeat the activity with the second volunteer?</Typography>
                     
                      
                      <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) =>
                            setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                          }
                          value={sendForm?.repeat_the_activity_with_the_second_volunteer}
                        />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: '20px' }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography>During the debrief did the trainer not ask:</Typography>
                      
                      <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) =>
                            setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                          }
                          value={sendForm?.check_which_ones_the_trainer_did_not_do_2}
                        />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: '20px' }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography>Were the participants responsive during the debriefing?</Typography>
                   
                      
                      <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) =>
                            setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                          }
                          value={sendForm?.were_the_participants_responsive_during_the_debriefing_1}
                        />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>{' '}
                <Card sx={{ marginTop: '20px' }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography>Did any women leave the training session during or after this module?</Typography>
                      
                      <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) =>
                            setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                          }
                          value={sendForm?.did_any_wmen_leave_the_trning_sesion_during_or_aftr_tis_modle_1}
                        />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              {(sendForm?.did_any_wmen_leave_the_trning_sesion_during_or_aftr_tis_modle_1=='Yes')?  <Card sx={{ marginTop: '20px' }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Stack>
                        <Typography variant="body1">If so, how many?</Typography>
                        <Stack mt={3}>
                          <TextField
                            type="number"
                            disabled
                            inputProps={{ disabled: true }}
                            id="Your Answer"
                            label="Your Answer"
                            variant="outlined"
                            onChange={(e) => setSendForm({ ...sendForm, if_so_how_many_1: e.target.value })}
                            value={sendForm?.if_so_how_many_1}
                          />
                        </Stack>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>: null}
                <Card sx={{ marginTop: '20px' }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography>Did this module take 30 minutes as allotted?</Typography>
                      
                      <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) =>
                            setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                          }
                          value={sendForm?.did_this_module_take_30_minutes_as_allotted_1}
                        />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </CardContent>
            </Grid>
          ) : null}
          {sendForm?.day1_or_day2 == 'Day 2' ? (
            <Grid backgroundColor={'#FFD580'}>
              <CardContent>
                <Card>
                  <Card sx={{ backgroundColor: '#ff7424' }} mt={2}>
                    <CardContent>
                      <Typography variant="h5">Module-7 (M7) Financial goals</Typography>
                    </CardContent>
                  </Card>
                  <CardContent>
                    <Stack mt={2}>
                      <Stack>
                        <Typography variant="body1">How many women attended the training session?</Typography>
                        <Stack mt={3}>
                          <TextField
                            type="number"
                            disabled
                            inputProps={{ disabled: true }}
                            id="Your Answer"
                            label="Your Answer"
                            variant="outlined"
                            onChange={(e) =>
                              setSendForm({
                                ...sendForm,
                                how_many_women_attended_the_training_session_3: e.target.value,
                              })
                            }
                            value={sendForm?.how_many_women_attended_the_training_session_3}
                          />
                        </Stack>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: '20px' }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography>Check which ones the trainer did not do:</Typography>
                      <RenderStringToArray string={sendForm?.check_which_ones_the_trainer_did_not_do_3} />
                    
                   
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: '20px' }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography>The trainer did not ask</Typography>
                    
                      <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) =>
                            setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                          }
                          value={sendForm?.the_trainer_did_not_ask}
                        />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: '20px' }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography>What did the trainer not do</Typography>
                      
                      <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) =>
                            setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                          }
                          value={sendForm?.what_did_the_trainer_not_do}
                        />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: '20px' }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography>During the debrief did the trainer not ask:</Typography>
                      
                      <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) =>
                            setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                          }
                          value={sendForm?.during_the_debrief_did_the_trainer_not_ask_1}
                        />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: '20px' }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography>Were the participants responsive during the debriefing?</Typography>
                      
                      <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) =>
                            setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                          }
                          value={sendForm?.were_the_participants_responsive_during_the_debriefing_2}
                        />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>{' '}
                <Card sx={{ marginTop: '20px' }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography>Did any women leave the training session during or after this module?</Typography>
                  
                      
                      <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) =>
                            setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                          }
                          value={sendForm?.did_any_wmen_leave_the_trning_sesion_during_or_aftr_tis_modle_2}
                        />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
               {(sendForm?.did_any_wmen_leave_the_trning_sesion_during_or_aftr_tis_modle_2=='Yes')? <Card sx={{ marginTop: '20px' }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Stack>
                        <Typography variant="body1">If so, how many?</Typography>
                        <Stack mt={3}>
                          <TextField
                            type="number"
                            disabled
                            inputProps={{ disabled: true }}
                            id="Your Answer"
                            label="Your Answer"
                            variant="outlined"
                            onChange={(e) => setSendForm({ ...sendForm, if_so_how_many_2: e.target.value })}
                            value={sendForm?.if_so_how_many_2}
                          />
                        </Stack>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>:null}
                <Card sx={{ marginTop: '20px' }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography>Did this module take 30 minutes as allotted?</Typography>
                     
                      
                      <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) =>
                            setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                          }
                          value={sendForm?.did_this_module_take_30_minutes_as_allotted_3}
                        />
                        </Stack>
                      </Stack>
                  </CardContent>
                </Card>
              </CardContent>
            </Grid>
          ) : null}
          {sendForm?.day1_or_day2 == 'Day 2' ? (
            <Grid backgroundColor={'#FFD580'}>
              <CardContent>
                <Card>
                  <Card sx={{ backgroundColor: '#ff7424' }} mt={2}>
                    <CardContent>
                      <Typography variant="h5">Module 8 (M8): Loans - group discussion of case studies</Typography>
                    </CardContent>
                  </Card>
                  <CardContent>
                    <Stack mt={2}>
                      <Stack>
                        <Typography variant="body1">How many women attended the training session?</Typography>
                        <Stack mt={3}>
                          <TextField
                            type="number"
                            disabled
                            inputProps={{ disabled: true }}
                            id="Your Answer"
                            label="Your Answer"
                            variant="outlined"
                            onChange={(e) =>
                              setSendForm({
                                ...sendForm,
                                how_many_women_attended_the_training_session_4: e.target.value,
                              })
                            }
                            value={sendForm?.how_many_women_attended_the_training_session_4}
                          />
                        </Stack>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: '20px' }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography>Check which ones the trainer did not do:</Typography>
                      <RenderStringToArray string={sendForm?.check_which_ones_the_trainer_did_not_do_4} />
                    
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: '20px' }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography>During the debrief did the trainer not ask:</Typography>
                      
                      <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) =>
                            setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                          }
                          value={sendForm?.during_the_debrief_did_the_trainer_not_ask_2}
                        />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: '20px' }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography>Were the participants responsive during the debriefing?</Typography>
                      
                      <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) =>
                            setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                          }
                          value={sendForm?.were_the_participants_responsive_during_the_debriefing_3}
                        />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>{' '}
                <Card sx={{ marginTop: '20px' }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography>Did any women leave the training session during or after this module?</Typography>
                      
                      <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) =>
                            setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                          }
                          value={sendForm?.did_any_wmen_leave_the_trning_sesion_during_or_aftr_tis_modle_3}
                        />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
               {(sendForm?.did_any_wmen_leave_the_trning_sesion_during_or_aftr_tis_modle_3=='Yes')? <Card sx={{ marginTop: '20px' }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Stack>
                        <Typography variant="body1">If so, how many?</Typography>
                        <Stack mt={3}>
                          <TextField
                            type="number"
                            disabled
                            inputProps={{ disabled: true }}
                            id="Your Answer"
                            label="Your Answer"
                            variant="outlined"
                            onChange={(e) => setSendForm({ ...sendForm, if_so_how_many_3: e.target.value })}
                            value={sendForm?.if_so_how_many_3}
                          />
                        </Stack>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>:null}
                <Card sx={{ marginTop: '20px' }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography>Did this module take 30 minutes as allotted?</Typography>
                      
                      <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) =>
                            setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                          }
                          value={sendForm?.did_this_module_take_30_minutes_as_allotted_2}
                        />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </CardContent>
            </Grid>
          ) : null}
          {sendForm?.day1_or_day2 == 'Day 2' ? (
            <Grid backgroundColor={'#FFD580'}>
              <CardContent>
                <Card>
                  <Card sx={{ backgroundColor: '#ff7424' }} mt={2}>
                    <CardContent>
                      <Typography variant="h5">Post training on Day 2 </Typography>
                    </CardContent>
                  </Card>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography>Check which ones the trainer did not do:</Typography>
                      <RenderStringToArray string={sendForm?.check_which_ones_the_trainer_did_not_do_5} />
                    
                   
                    </Stack>
                  </CardContent>
                </Card>
              </CardContent>
            </Grid>
          ) : null}
          {sendForm?.program_assessment == 3 ? (
            <Grid backgroundColor={'#FFD580'}>
              <CardContent>
                <Card>
                  <Card sx={{ backgroundColor: '#ff7424' }} mt={2}>
                    <CardContent>
                      <Typography variant="h5">Self Shakti by Gelathi </Typography>
                    </CardContent>
                  </Card>
                  <CardContent>
                    <Stack mt={2}>
                      {' '}
                      <Stack>
                        <Typography variant="body1">Training Quality assessment</Typography>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: '20px' }}>
                  <CardContent>
                    <Stack mt={2}>
                      {' '}
                      <Stack>
                        <Typography variant="body1">Name of the Gelathi being evaluated</Typography>
                        <Stack mt={3}>
                          <TextField
                            disabled
                            inputProps={{ disabled: true }}
                            id="Your Answer"
                            label="Your Answer"
                            variant="outlined"
                            onChange={(e) =>
                              setSendForm({ ...sendForm, name_of_the_gelathi_being_evaluated: e.target.value })
                            }
                            value={sendForm?.name_of_the_gelathi_being_evaluated}


                          />
                        </Stack>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
                <Stack mt={2}>
                  <Card>
                    <CardContent>
                      <Stack mt={2}>
                        <Typography>Days/ Modules</Typography>
                        <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) =>
                            setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                          }
                          value={sendForm?.days_modules}
                        />
                      </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                </Stack>
              </CardContent>
            </Grid>
          ) : null}
          {sendForm?.days_modules == 'Session-1 _ Introduction' ? (
            <Grid backgroundColor={'#FFD580'}>
              <CardContent>
                <Card>
                  <Card sx={{ backgroundColor: '#ff7424' }} mt={2}>
                    <CardContent>
                      <Typography variant="h5">Session-1 _ Introduction</Typography>
                      <Typography variant="h6">Before the training starts on Session 1</Typography>
                    </CardContent>
                  </Card>
                  <CardContent>
                    <Stack mt={2}>
                      <Stack>
                        <Typography variant="body1">Check which ones the Gelathi did not do</Typography>
                        
                        <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) =>
                            setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                          }
                          value={sendForm?.check_which_ones_the_gelathi_did_not_do}
                        />
                      </Stack>
                      </Stack>
                    </Stack>
                  </CardContent>{' '}
                </Card>
                <Card sx={{ marginTop: '20px' }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Stack>
                        <Typography variant="body1">How many women attended the training session?</Typography>
                        <Stack mt={3}>
                          <TextField
                            type="number"
                            disabled
                            inputProps={{ disabled: true }}
                            id="Your Answer"
                            label="Your Answer"
                            variant="outlined"
                            defaultValue={sendForm?.how_many_women_attended_the_training_session}
                           
                          />
                        </Stack>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: '20px' }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography>Check which ones the Gelathi did not do</Typography>
                      
                      <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) =>
                            setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                          }
                          value={sendForm?.check_which_ones_the_gelathi_did_not_do_1}
                        />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </CardContent>
            </Grid>
          ) : null}
          {sendForm?.days_modules == 'Session-1 _ Introduction' ? (
            <Grid backgroundColor={'#FFD580'}>
              <CardContent>
                <Card>
                  <Card sx={{ backgroundColor: '#ff7424' }} mt={2}>
                    <CardContent>
                      <Typography variant="h5">Post - Session:</Typography>
                    </CardContent>
                  </Card>
                  <CardContent>
                  
                  <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) =>
                            setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                          }
                          value={sendForm?.check_which_ones_the_gelathi_did_not_do_2}
                        />
                      </Stack>
                  </CardContent>{' '}
                </Card>
              </CardContent>
            </Grid>
          ) : null}
          {sendForm?.days_modules == 'Session-2 _ Financial Management' ? (
            <Grid backgroundColor={'#FFD580'}>
              <CardContent>
                <Card>
                  <Card sx={{ backgroundColor: '#ff7424' }} mt={2}>
                    <CardContent>
                      <Typography variant="h5">Session-2 Financial Management</Typography>
                    </CardContent>
                  </Card>
                  <CardContent>
                    <Stack mt={2}>
                      <Stack>
                        <Typography variant="body1">Check which ones the Gelathi did not do</Typography>
                        
                        <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) =>
                            setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                          }
                          value={sendForm?.check_which_ones_the_gelathi_did_not_do}
                        />
                      </Stack>
                      </Stack>
                    </Stack>
                  </CardContent>{' '}
                </Card>
                <Card sx={{ marginTop: '20px' }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Stack>
                        <Typography variant="body1">How many women attended the training session?</Typography>
                        <Stack mt={3}>
                          <TextField
                            type="number"
                            disabled
                            inputProps={{ disabled: true }}
                            id="Your Answer"
                            label="Your Answer"
                            variant="outlined"
                            onChange={(e) =>
                              setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                            }
                            value={sendForm?.how_many_women_attended_the_training_session}
                          />
                        </Stack>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: '20px' }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography>Was the recap done?</Typography>
                      
                      <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) =>
                            setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                          }
                          value={sendForm?.was_the_recap_done}
                        />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </CardContent>
            </Grid>
          ) : null}
          {sendForm?.days_modules == 'Session-2 _ Financial Management' ? (
            <Grid backgroundColor={'#FFD580'}>
              <CardContent>
                <Card>
                  <Card sx={{ backgroundColor: '#ff7424' }} mt={2}>
                    <CardContent>
                      <Typography variant="h5">Post - Session:</Typography>
                    </CardContent>
                  </Card>
                  <CardContent>
                    <Stack mt={2}>
                      <Stack>
                        <Typography variant="body1">Check which ones the Gelathi did not do</Typography>
                        
                        <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) =>
                            setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                          }
                          value={sendForm?.check_which_ones_the_gelathi_did_not_do_1}
                        />
                      </Stack>
                      </Stack>
                    </Stack>
                  </CardContent>{' '}
                </Card>
              </CardContent>
            </Grid>
          ) : null}
          {sendForm?.days_modules == 'Session-3 _Basics of an enterprise' ? (
            <Grid backgroundColor={'#FFD580'}>
             
              <CardContent>
                <Card>
                  <Card sx={{ backgroundColor: '#ff7424' }} mt={2}>
                    <CardContent>
                      <Typography variant="h5">Session-3 Basics of an Enterprises</Typography>
                    </CardContent>
                  </Card>
                  <Card sx={{ marginTop: 2 }}>
                    <CardContent>
                    <Typography variant="body1">Check which ones the Gelathi did not do</Typography>
                        
                    <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) =>
                            setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                          }
                          value={sendForm?.check_which_ones_the_gelathi_did_not_do}
                        />
                      </Stack>
                    </CardContent>
                  </Card>
                </Card>
                <Card sx={{ marginTop: 2 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography>During the debrief did the Gelathi:</Typography>
                      
                      <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) =>
                            setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                          }
                          value={sendForm?.during_the_debrief_did_the_gelathi}
                        />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </CardContent>
            </Grid>
          ) : null}
          {sendForm?.days_modules == 'Session-3 _Basics of an enterprise' ? (
            <Grid backgroundColor={'#FFD580'}>
                <CardContent>
                <Card>
                  <Card sx={{ backgroundColor: '#ff7424' }} mt={2}>
                    <CardContent>
                      <Typography variant="h5">Post - Session:</Typography>
                    </CardContent>
                  </Card>
                  <Card sx={{ marginTop: 2 }}>
                    <CardContent>
                      <Stack mt={2}>
                        <Typography>Check which ones the Gelathi did not do</Typography>
                        
                        <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) =>
                            setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                          }
                          value={sendForm?.check_which_ones_the_gelathi_did_not_do_1}
                        />
                      </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                </Card>
              </CardContent>
            </Grid>
          ) : null}
          {sendForm?.days_modules == 'Session-4 _Building Relationship' ? (
            <Grid backgroundColor={'#FFD580'}>
           
              <CardContent>
                <Card>
                  <Card sx={{ backgroundColor: '#ff7424' }} mt={2}>
                    <CardContent>
                      <Typography variant="h5">Session-4 Building Relationships:</Typography>
                    </CardContent>
                  </Card>
                  <Card sx={{ marginTop: 2 }}>
                    <CardContent>
                      <Stack mt={2}>
                        <Typography>Check which ones the Gelathi did not do</Typography>
                        
                        <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) =>
                            setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                          }
                          value={sendForm?.check_which_ones_the_gelathi_did_not_do}
                        />
                      </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                </Card>
                <Card sx={{ marginTop: 2 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography>During the debriefs for role plays the Gelathi did not ask:</Typography>
                      
                      <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) =>
                            setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                          }
                          value={sendForm?.during_the_debriefs_for_role_plays_the_gelathi_did_not_ask}
                        />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </CardContent>
            </Grid>
          ) : null}
          {sendForm?.days_modules == 'Session-4 _Building Relationship' ? (
            <Grid backgroundColor={'#FFD580'}>
            
              <CardContent>
                <Card>
                  <Card sx={{ backgroundColor: '#ff7424' }} mt={2}>
                    <CardContent>
                      <Typography variant="h5">Post-training</Typography>
                    </CardContent>
                  </Card>
                  <Card sx={{ marginTop: 2 }}>
                    <CardContent>
                      <Stack mt={2}>
                        <Typography>Check which ones the Gelathi did not do</Typography>
                        
                        <Stack mt={2} mb={2}>   <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) =>
                            setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                          }
                          value={sendForm?.check_which_ones_the_gelathi_did_not_do_1}
                        />
                      </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                </Card>
              </CardContent>
            </Grid>
          ) : null}
          {sendForm?.days_modules == 'Session-5 _Assets and Liabilities' ? (
            <Grid backgroundColor={'#FFD580'}>
          
              <CardContent>
                <Card>
                  <Card sx={{ backgroundColor: '#ff7424' }} mt={2}>
                    <CardContent>
                      <Typography variant="h5">Session 5: Assets & Liabilities: </Typography>
                    </CardContent>
                  </Card>
                  <Card sx={{ marginTop: 2 }}>
                    <CardContent>
                      <Stack>
                        <Typography variant="body1">Name of the Gelathi being evaluated</Typography>
                        <Stack mt={3}>
                          <TextField
                            disabled
                            inputProps={{ disabled: true }}
                            id="Your Answer"
                            label="Your Answer"
                            variant="outlined"
                            onChange={(e) =>
                              setSendForm({ ...sendForm, name_of_the_gelathi_being_evaluated_1: e.target.value })
                            }
                            value={sendForm?.name_of_the_gelathi_being_evaluated_1}


                          />
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                </Card>
                <Card sx={{ marginTop: 2 }}>
                  <CardContent>
                    <Stack>
                      <Typography variant="body1">How many women attended the training session?</Typography>
                      <Stack mt={3}>
                        <TextField
                          type="number"
                          disabled
                          inputProps={{ disabled: true }}
                          id="Your Answer"
                          label="Your Answer"
                          variant="outlined"
                          onChange={(e) =>
                            setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                          }
                          value={sendForm?.how_many_women_attended_the_training_session}
                        />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: 2 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography>Was the recap done?</Typography>
                      
                      <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) =>
                            setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                          }
                          value={sendForm?.was_the_recap_done_1}
                        />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: 2 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography>Check which ones the trainer did not do</Typography>
                      <RenderStringToArray string={sendForm?.check_which_ones_the_trainer_did_not_do} />
                    
                     
                    </Stack>
                  </CardContent>
                </Card>
              </CardContent>
            </Grid>
          ) : null}
          {sendForm?.days_modules == 'Session-6 _Goal setting game' ? (
            <Grid backgroundColor={'#FFD580'}>
           
              <CardContent>
                <Card>
                  <Card sx={{ backgroundColor: '#ff7424' }} mt={2}>
                    <CardContent>
                      <Typography variant="h5">Session 6: Goal setting game </Typography>
                    </CardContent>
                  </Card>
                  <Card sx={{ marginTop: 2 }}>
                    <CardContent>
                      <Stack>
                        <Typography variant="body1">How many women attended the training session?</Typography>
                        <Stack mt={3}>
                          <TextField
                            type="number"
                            disabled
                            inputProps={{ disabled: true }}
                            id="Your Answer"
                            label="Your Answer"
                            variant="outlined"
                            onChange={(e) =>
                              setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                            }
                            value={sendForm?.how_many_women_attended_the_training_session}
                          />
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                </Card>
                <Card sx={{ marginTop: 2 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography>Check which ones the Galati did not do</Typography>
                      
                      <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) =>
                            setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                          }
                          value={sendForm?.check_which_ones_the_gelathi_did_not_do}
                        />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: 2 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography>Check which instructions the Gelathi did not do</Typography>
                      <RenderStringToArray string={sendForm?.check_which_instructions_the_gelathi_did_not_do} />
                    
                 
                    
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: 2 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography>Repeat the activity with the second volunteer?</Typography>
                      
                      <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) =>
                            setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                          }
                          value={sendForm?.repeat_the_activity_with_the_second_volunteer}
                        />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: 2 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography>Did the debrief done by Gelathi?</Typography>
                      
                      <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) =>
                            setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                          }
                          value={sendForm?.did_the_debrief_done_by_gelathi}
                        />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </CardContent>
            </Grid>
          ) : null}
          {/* 37 */}
          {sendForm?.days_modules == 'Session-7 _Financial Goals' ? (
            <Grid backgroundColor={'#FFD580'}>
           
              <CardContent>
                <Card>
                  <Card sx={{ backgroundColor: '#ff7424' }} mt={2}>
                    <CardContent>
                      <Typography variant="h5">Session-7 Financial goals</Typography>
                    </CardContent>
                  </Card>
                  <Card sx={{ marginTop: '20px' }}>
                    <CardContent>
                      <Typography>How many women attended the training session?</Typography>
                      <Stack mt={2} mb={2}>
                        <TextField
                          type="number"
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) =>
                            setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                          }
                          value={sendForm?.how_many_women_attended_the_training_session}
                        />
                      </Stack>
                    </CardContent>
                  </Card>
                </Card>
                <Card sx={{ marginTop: 2 }}>
                  <CardContent>
                    <Typography>Check which ones the Gelathi did not do</Typography>
                    
                    <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) =>
                            setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                          }
                          value={sendForm?.check_which_ones_the_gelathi_did_not_do}
                        />
                      </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: 2 }}>
                  <CardContent>
                    <Typography>The Gelathi did not ask</Typography>
                 
                    
                    <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) =>
                            setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                          }
                          value={sendForm?.the_gelathi_did_not_ask_1}
                        />
                      </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: 2 }}>
                  <CardContent>
                    <Typography>During the debrief did the Gelathi not ask:</Typography>
                    
                    <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) =>
                            setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                          }
                          value={sendForm?.during_the_debrief_did_the_gelathi_not_ask}
                        />
                      </Stack>
                  </CardContent>
                </Card>
              </CardContent>
            </Grid>
          ) : null}
          {/* 38 */}
          {sendForm?.days_modules == 'Session-8 _Loans-Group discussion of Case Studies' ? (
            <Grid backgroundColor={'#FFD580'}>
             
              <CardContent>
                <Card>
                  <Card sx={{ backgroundColor: '#ff7424' }} mt={2}>
                    <CardContent>
                      <Typography variant="h5">Session 8: Loans - group discussion of case studies</Typography>
                    </CardContent>
                  </Card>
                  <Card sx={{ marginTop: '20px' }}>
                    <CardContent>
                      <Typography>How many women attended the training session?</Typography>
                      <Stack mt={2} mb={2}>
                        <TextField
                          type="number"
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) =>
                            setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                          }
                          value={sendForm?.how_many_women_attended_the_training_session}
                        />
                      </Stack>
                    </CardContent>
                  </Card>
                </Card>
                <Card sx={{ marginTop: 2 }}>
                  <CardContent>
                    <Typography>Check which ones the Gelathi did not do:</Typography>
                    
                    <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) =>
                            setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                          }
                          value={sendForm?.check_which_ones_the_gelathi_did_not_do}
                        />
                      </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ marginTop: 2 }}>
                  <CardContent>
                    <Typography>During the debrief did the Gelathi not ask:</Typography>
                    during_the_debrief_did_the_gelathi_not_ask
                    <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) =>
                            setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                          }
                          value={sendForm?.during_the_debrief_did_the_gelathi_not_ask}
                        />
                      </Stack>
                  </CardContent>
                </Card>
              </CardContent>
            </Grid>
          ) : null}
          {/* 39 */}
          {sendForm?.days_modules == 'Session-8 _Loans-Group discussion of Case Studies' ? (
            <Grid backgroundColor={'#FFD580'}>
             
              <CardContent>
                <Card>
                  <Card sx={{ backgroundColor: '#ff7424' }} mt={2}>
                    <CardContent>
                      <Typography variant="h5">Post training </Typography>
                    </CardContent>
                  </Card>
                  <CardContent>
                    <Typography>Check which one Gelati Did NOT do</Typography>
                    
                    <Stack mt={2} mb={2}>
                        <TextField
                          disabled
                          inputProps={{ disabled: true }}
                          label="Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) =>
                            setSendForm({ ...sendForm, how_many_women_attended_the_training_session: e.target.value })
                          }
                          value={sendForm?.check_which_ones_the_gelathi_did_not_do_1}
                        />
                      </Stack>
                  </CardContent>
                </Card>
              </CardContent>
            </Grid>
          ) : null}
        </Grid>
        <br />
      </Dialog>
    </div>
  );
};
export default GetSingleQualityForm;
