import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';
import { Stack, Drawer, Divider, IconButton, Typography, Card, CardContent } from '@mui/material';
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import { Icon } from '@iconify/react';
import GelathiCircleForm from './GelathiCircleForm';
import GreenSurvey from './GreenSurvey';
import Vyaparprogram from './Vyaparprogram';
import { oldbaseURL, baseURL } from 'src/utils/api';
import { useAuth } from 'src/AuthContext';
GelathiCircleDrawer.propTypes = {
  isOpenFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
};

export default function GelathiCircleDrawer({
  reloadmethod,
  isOpenFilter,
  onOpenFilter,
  onCloseFilter,
  clcikData,
  data1,
  sessionData,
  mainDrawerReload,
}) {
  const [selectedFromIndex, setSelectedFormIndex] = useState({
    index: '',
    id: '',
  });
  const { apikey } = useAuth();
  const [session, setSession] = useState('');
  const [SessionClickData, setSessionClickData] = useState('');
  const [circleData, setcircleData] = useState('');
  const [reloadFromForm, setReloadFromForm] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [singleCircleData, setSingleCircleData] = useState();
  const [showGreenFrom, setShowGreenForm] = useState(false);
  const [formData, setFormData] = useState();
  useEffect(() => {
    if (clcikData?.id && data1?.project_id) {
      circle();
    }
  }, [clcikData]);
  const gelathiDrawerReloder = () => {
    setReloadFromForm(!reloadFromForm);
  };
  useEffect(() => {
    let isApiSubscribed = true;
    if (isApiSubscribed) {
      if (clcikData?.id && data1?.project_id) {
        circle();
      }
    }
    return () => {
      isApiSubscribed = false;
    };
  }, [reloadFromForm]);
  const circle = (async) => {
    const userid = JSON.parse(sessionStorage.getItem('userDetails'))?.id;
    var data = JSON.stringify({
      circle_id: clcikData?.id,
      project_id: data1?.project_id,
      emp_id: userid,
    });
    var config = {
      method: 'post',
      url: baseURL + 'getGelathiCircleDataNew',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${apikey}`,
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        setcircleData(response?.data);
      })
      .catch(function (error) {
        // console.log(error);
      });
  };
  const removegelathicircle = async (itm) => {
    if (confirm('Are you sure want to remove')) {
      var data = JSON.stringify({
        circle_id: clcikData?.id,
        flag: 0,
        gelathi_id: itm?.gelathi_id,
      });
      var config = {
        method: 'post',
        url: baseURL + 'updateEnrolledGelathi',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${apikey}`,
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          circle();
        })
        .catch(function (error) {
          // console.log(error);
        });
    }
  };

  const callGelathiFormComponent = (index, id) => {
    setShowForm(true);
    setSelectedFormIndex({
      index: index,
      id: id,
    });
  };
  const handleform = () => {
    alert('survey was done');
  };
  return (
    <>
      <Drawer
        anchor="right"
        open={isOpenFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 350 },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            {`${clcikData?.title}:`}
          </Typography>
          <IconButton onClick={onCloseFilter}>
            <Iconify icon="eva:close-fill" width={20} height={20} />
          </IconButton>
        </Stack>
        <Divider />
        <Scrollbar>
          <Stack spacing={10} sx={{ p: 3 }}>
            {circleData?.gelathis?.length > 0 ? (
              <div>
                {circleData?.gelathis?.map((itm, index) => {
                  return (
                    <Card style={{ marginTop: 20 }}>
                      <CardContent>
                        <Stack style={{ float: 'right', marginBottom: 30 }}>
                          <IconButton style={{ marginLeft: 70 }} onClick={() => removegelathicircle(itm)}>
                            <Icon
                              icon="material-symbols:check-box-rounded"
                              width={20}
                              height={20}
                              marginTop={20}
                              color="#ff7424"
                            />
                          </IconButton>
                          {sessionData?.type == 4 ? (
                            itm?.is_survey ? (
                              <button
                                style={{
                                  border: 'none',
                                  outline: 'none',
                                  background: 'transparent',
                                  cursor: 'pointer',
                                  marginLeft: 70,
                                }}
                                onClick={
                                  // callGelathiFormComponent(index , itm?.gelathi_id  )
                                  // if we want to see filed form means need to call another component so that time we can use this kind of methods to call instead of rendering inside the map
                                  handleform
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  color="green"
                                  width="1.5em"
                                  height="1.5em"
                                  viewBox="0 0 36 36"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M21 12H7a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1ZM8 10h12V7.94H8Z"
                                    class="clr-i-outline clr-i-outline-path-1"
                                  />
                                  <path
                                    fill="currentColor"
                                    d="M21 14.08H7a1 1 0 0 0-1 1V19a1 1 0 0 0 1 1h11.36L22 16.3v-1.22a1 1 0 0 0-1-1ZM20 18H8v-2h12Z"
                                    class="clr-i-outline clr-i-outline-path-2"
                                  />
                                  <path
                                    fill="currentColor"
                                    d="M11.06 31.51v-.06l.32-1.39H4V4h20v10.25l2-1.89V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v28a1 1 0 0 0 1 1h8a3.44 3.44 0 0 1 .06-.49Z"
                                    class="clr-i-outline clr-i-outline-path-3"
                                  />
                                  <path
                                    fill="currentColor"
                                    d="m22 19.17l-.78.79a1 1 0 0 0 .78-.79Z"
                                    class="clr-i-outline clr-i-outline-path-4"
                                  />
                                  <path
                                    fill="currentColor"
                                    d="M6 26.94a1 1 0 0 0 1 1h4.84l.3-1.3l.13-.55v-.05H8V24h6.34l2-2H7a1 1 0 0 0-1 1Z"
                                    class="clr-i-outline clr-i-outline-path-5"
                                  />
                                  <path
                                    fill="currentColor"
                                    d="m33.49 16.67l-3.37-3.37a1.61 1.61 0 0 0-2.28 0L14.13 27.09L13 31.9a1.61 1.61 0 0 0 1.26 1.9a1.55 1.55 0 0 0 .31 0a1.15 1.15 0 0 0 .37 0l4.85-1.07L33.49 19a1.6 1.6 0 0 0 0-2.27ZM18.77 30.91l-3.66.81l.89-3.63L26.28 17.7l2.82 2.82Zm11.46-11.52l-2.82-2.82L29 15l2.84 2.84Z"
                                    class="clr-i-outline clr-i-outline-path-6"
                                  />
                                  <path fill="none" d="M0 0h36v36H0z" />
                                </svg>
                              </button>
                            ) : sessionData?.type == 4 && sessionData?.check_in != '0' ? (
                              <button
                                style={{
                                  border: 'none',
                                  outline: 'none',
                                  background: 'transparent',
                                  cursor: 'pointer',
                                  marginLeft: 70,
                                }}
                                onClick={() => {
                                  callGelathiFormComponent(index, itm?.gelathi_id);
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  color="#ff7424"
                                  width="1.5em"
                                  height="1.5em"
                                  viewBox="0 0 36 36"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M21 12H7a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1ZM8 10h12V7.94H8Z"
                                    class="clr-i-outline clr-i-outline-path-1"
                                  />
                                  <path
                                    fill="currentColor"
                                    d="M21 14.08H7a1 1 0 0 0-1 1V19a1 1 0 0 0 1 1h11.36L22 16.3v-1.22a1 1 0 0 0-1-1ZM20 18H8v-2h12Z"
                                    class="clr-i-outline clr-i-outline-path-2"
                                  />
                                  <path
                                    fill="currentColor"
                                    d="M11.06 31.51v-.06l.32-1.39H4V4h20v10.25l2-1.89V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v28a1 1 0 0 0 1 1h8a3.44 3.44 0 0 1 .06-.49Z"
                                    class="clr-i-outline clr-i-outline-path-3"
                                  />
                                  <path
                                    fill="currentColor"
                                    d="m22 19.17l-.78.79a1 1 0 0 0 .78-.79Z"
                                    class="clr-i-outline clr-i-outline-path-4"
                                  />
                                  <path
                                    fill="currentColor"
                                    d="M6 26.94a1 1 0 0 0 1 1h4.84l.3-1.3l.13-.55v-.05H8V24h6.34l2-2H7a1 1 0 0 0-1 1Z"
                                    class="clr-i-outline clr-i-outline-path-5"
                                  />
                                  <path
                                    fill="currentColor"
                                    d="m33.49 16.67l-3.37-3.37a1.61 1.61 0 0 0-2.28 0L14.13 27.09L13 31.9a1.61 1.61 0 0 0 1.26 1.9a1.55 1.55 0 0 0 .31 0a1.15 1.15 0 0 0 .37 0l4.85-1.07L33.49 19a1.6 1.6 0 0 0 0-2.27ZM18.77 30.91l-3.66.81l.89-3.63L26.28 17.7l2.82 2.82Zm11.46-11.52l-2.82-2.82L29 15l2.84 2.84Z"
                                    class="clr-i-outline clr-i-outline-path-6"
                                  />
                                  <path fill="none" d="M0 0h36v36H0z" />
                                </svg>
                              </button>
                            ) : null
                          ) : sessionData?.type == 10 ? (
                            itm?.is_green_survey ? (
                              <button
                                style={{
                                  border: 'none',
                                  outline: 'none',
                                  background: 'transparent',
                                  cursor: 'pointer',
                                  marginLeft: 70,
                                }}
                                onClick={() => {
                                  // callGelathiFormComponent(index , itm?.gelathi_id  )
                                  // if we want to see filed form means need to call another component so that time we can use this kind of methods to call instead of rendering inside the map
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  color="green"
                                  width="1.5em"
                                  height="1.5em"
                                  viewBox="0 0 36 36"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M21 12H7a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1ZM8 10h12V7.94H8Z"
                                    class="clr-i-outline clr-i-outline-path-1"
                                  />
                                  <path
                                    fill="currentColor"
                                    d="M21 14.08H7a1 1 0 0 0-1 1V19a1 1 0 0 0 1 1h11.36L22 16.3v-1.22a1 1 0 0 0-1-1ZM20 18H8v-2h12Z"
                                    class="clr-i-outline clr-i-outline-path-2"
                                  />
                                  <path
                                    fill="currentColor"
                                    d="M11.06 31.51v-.06l.32-1.39H4V4h20v10.25l2-1.89V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v28a1 1 0 0 0 1 1h8a3.44 3.44 0 0 1 .06-.49Z"
                                    class="clr-i-outline clr-i-outline-path-3"
                                  />
                                  <path
                                    fill="currentColor"
                                    d="m22 19.17l-.78.79a1 1 0 0 0 .78-.79Z"
                                    class="clr-i-outline clr-i-outline-path-4"
                                  />
                                  <path
                                    fill="currentColor"
                                    d="M6 26.94a1 1 0 0 0 1 1h4.84l.3-1.3l.13-.55v-.05H8V24h6.34l2-2H7a1 1 0 0 0-1 1Z"
                                    class="clr-i-outline clr-i-outline-path-5"
                                  />
                                  <path
                                    fill="currentColor"
                                    d="m33.49 16.67l-3.37-3.37a1.61 1.61 0 0 0-2.28 0L14.13 27.09L13 31.9a1.61 1.61 0 0 0 1.26 1.9a1.55 1.55 0 0 0 .31 0a1.15 1.15 0 0 0 .37 0l4.85-1.07L33.49 19a1.6 1.6 0 0 0 0-2.27ZM18.77 30.91l-3.66.81l.89-3.63L26.28 17.7l2.82 2.82Zm11.46-11.52l-2.82-2.82L29 15l2.84 2.84Z"
                                    class="clr-i-outline clr-i-outline-path-6"
                                  />
                                  <path fill="none" d="M0 0h36v36H0z" />
                                </svg>
                              </button>
                            ) : sessionData?.type == 10 && sessionData?.check_in != '0' ? (
                              <IconButton
                                style={{ marginLeft: '18px', background: 'none', padding: 0 }}
                                onClick={() => {
                                  // callGelathiFormComponent(index , itm?.gelathi_id  )
                                  // if we want to see filed form means need to call another component so that time we can use this kind of methods to call instead of rendering inside the map
                                }}
                              >
                                <GreenSurvey
                                  itm={itm}
                                  changeState={gelathiDrawerReloder}
                                  mainDrawerReload={mainDrawerReload}
                                />
                              </IconButton>
                            ) : null
                          ) : sessionData?.type == 16 ? (
                            itm?.is_vyapar_survey ? (
                              <button
                                style={{
                                  border: 'none',
                                  outline: 'none',
                                  background: 'transparent',
                                  cursor: 'pointer',
                                  marginLeft: 70,
                                }}
                                onClick={() => {
                                  // callGelathiFormComponent(index , itm?.gelathi_id  )
                                  // if we want to see filed form means need to call another component so that time we can use this kind of methods to call instead of rendering inside the map
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  color="green"
                                  width="1.5em"
                                  height="1.5em"
                                  viewBox="0 0 36 36"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M21 12H7a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1ZM8 10h12V7.94H8Z"
                                    class="clr-i-outline clr-i-outline-path-1"
                                  />
                                  <path
                                    fill="currentColor"
                                    d="M21 14.08H7a1 1 0 0 0-1 1V19a1 1 0 0 0 1 1h11.36L22 16.3v-1.22a1 1 0 0 0-1-1ZM20 18H8v-2h12Z"
                                    class="clr-i-outline clr-i-outline-path-2"
                                  />
                                  <path
                                    fill="currentColor"
                                    d="M11.06 31.51v-.06l.32-1.39H4V4h20v10.25l2-1.89V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v28a1 1 0 0 0 1 1h8a3.44 3.44 0 0 1 .06-.49Z"
                                    class="clr-i-outline clr-i-outline-path-3"
                                  />
                                  <path
                                    fill="currentColor"
                                    d="m22 19.17l-.78.79a1 1 0 0 0 .78-.79Z"
                                    class="clr-i-outline clr-i-outline-path-4"
                                  />
                                  <path
                                    fill="currentColor"
                                    d="M6 26.94a1 1 0 0 0 1 1h4.84l.3-1.3l.13-.55v-.05H8V24h6.34l2-2H7a1 1 0 0 0-1 1Z"
                                    class="clr-i-outline clr-i-outline-path-5"
                                  />
                                  <path
                                    fill="currentColor"
                                    d="m33.49 16.67l-3.37-3.37a1.61 1.61 0 0 0-2.28 0L14.13 27.09L13 31.9a1.61 1.61 0 0 0 1.26 1.9a1.55 1.55 0 0 0 .31 0a1.15 1.15 0 0 0 .37 0l4.85-1.07L33.49 19a1.6 1.6 0 0 0 0-2.27ZM18.77 30.91l-3.66.81l.89-3.63L26.28 17.7l2.82 2.82Zm11.46-11.52l-2.82-2.82L29 15l2.84 2.84Z"
                                    class="clr-i-outline clr-i-outline-path-6"
                                  />
                                  <path fill="none" d="M0 0h36v36H0z" />
                                </svg>
                              </button>
                            ) : sessionData?.type == 16 && sessionData?.check_in != '0' ? (
                              <button
                                style={{
                                  border: 'none',
                                  outline: 'none',
                                  background: 'transparent',
                                  cursor: 'pointer',
                                  marginLeft: 90,
                                }}
                                onClick={() => {
                                  // callGelathiFormComponent(index , itm?.gelathi_id  )
                                  // if we want to see filed form means need to call another component so that time we can use this kind of methods to call instead of rendering inside the map
                                }}
                              >
                                <Vyaparprogram itm={itm} changeState={gelathiDrawerReloder} />
                              </button>
                            ) : (
                              <></>
                            )
                          ) : (
                            <></>
                          )}
                        </Stack>
                        <Typography variant="subtitle1">{itm?.firstName}</Typography>
                        <Typography variant="subtitle1" gutterBottom>
                          <Typography variant="body1" gutterBottom>
                            {itm?.villagename}
                          </Typography>
                        </Typography>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <h5 style={{ textAlign: 'center' }}>No Gelathi</h5>
            )}
            {showForm && (
              <GelathiCircleForm
                index={selectedFromIndex.index}
                reloadmethod={reloadmethod}
                clcikData={clcikData}
                circleData={circleData}
                singleCircleData={singleCircleData}
                id={selectedFromIndex.id}
                setShowForm={setShowForm}
                gelathiDrawerReloder={gelathiDrawerReloder}
              />
            )}
            {showGreenFrom && <GreenSurvey itm={formData} />}
          </Stack>
        </Scrollbar>
      </Drawer>
    </>
  );
}
