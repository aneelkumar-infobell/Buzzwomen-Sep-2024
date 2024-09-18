import PropTypes from 'prop-types';
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import LocationQuality from './Location';
import DateRangeQuality from './Daterange';
import { useState } from 'react';
import {
  Grid,
  Box,
  Radio,
  Stack,
  Button,
  Drawer,
  Rating,
  Divider,
  Checkbox,
  FormGroup,
  IconButton,
  Typography,
  RadioGroup,
  Card,
  CardContent,
} from '@mui/material';
import AdminQuality from './Admin';
export const SORT_BY_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High-Low' },
  { value: 'priceAsc', label: 'Price: Low-High' },
];
export const FILTER_GENDER_OPTIONS = ['Men', 'Women', 'Kids'];
export const FILTER_CATEGORY_OPTIONS = ['All', 'Shose', 'Apparel', 'Accessories'];
export const FILTER_RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];
export const FILTER_PRICE_OPTIONS = [
  { value: 'below', label: 'Below $25' },
  { value: 'between', label: 'Between $25 - $75' },
  { value: 'above', label: 'Above $75' },
];
export const FILTER_COLOR_OPTIONS = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];
QualityAssuranceFilter.propTypes = {
  isOpenFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
};
export default function QualityAssuranceFilter({ isOpenFilter, onOpenFilter, onCloseFilter, clcikData, getData, onSumbit, resetBus, onDateSubmit }) {
  const [selectDATA, setSelectData] = useState()
  const data = sessionStorage?.getItem('userId')
  return (
    <>
      <Drawer
        anchor="right"
        open={isOpenFilter}
        onClose={() => {
          setSelectData();
          onCloseFilter();
        }}
        PaperProps={{
          sx: { width: 320 },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
          <Typography variant="subtitle1" sx={{ ml: 1 }} style={{ marginLeft: 25, color: 'black' }}>
            Filters
            {selectDATA && selectDATA === 2 && ': Admins'}
            {selectDATA && selectDATA === 3 && ': Program Managers'}
            {selectDATA && selectDATA === 4 && ': Operation Managers'}
            {selectDATA && selectDATA === 12 && ': Senior Operation Managers'}
            {selectDATA && selectDATA === 13 && ': Gelathi Facilitator Leads'}
            {selectDATA && selectDATA === 7 && ': Location'}
            {selectDATA && selectDATA === 9 && ': Date Range'}
          </Typography>
          <IconButton
            onClick={() => {
              setSelectData();
              onCloseFilter();
            }}
          >
            <Iconify icon="eva:close-fill" width={20} height={20} />
          </IconButton>
        </Stack>
        <Divider />
        <Scrollbar>
          {/* <Stack spacing={3} sx={{ p: 3 }}> */}
          <div>
            <Card style={{ backgroundColor: '#f6f8fb' }}>
              <CardContent>
                {(data == 1) ? <Button onClick={() => {
                  setSelectData(2);
                }}
                  sx={{
                    ':hover': {
                      bgcolor: '#ffd796', // theme.palette.primary.main
                      color: '#ff7424',
                    },
                    ':focus': {
                      bgcolor: '#ffd796',
                      color: '#ff7424',
                    },
                    color: 'black',
                  }}
                >
                  Admins
                </Button> : null}
                {(data == 1 || data == 2) ? <Button onClick={() => {
                  setSelectData(3);
                }}
                  sx={{
                    ':hover': {
                      bgcolor: '#ffd796', // theme.palette.primary.main
                      color: '#ff7424',
                    },
                    ':focus': {
                      bgcolor: '#ffd796',
                      color: '#ff7424',
                    },
                    color: 'black',
                    marginTop: 1,
                  }}
                >
                  Program Managers
                </Button> : null}
                {(data == 1 || data == 2 || data == 3) ? <Button onClick={() => {
                  setSelectData(12);
                }}
                  sx={{
                    ':hover': {
                      bgcolor: '#ffd796', // theme.palette.primary.main
                      color: '#ff7424',
                    },
                    ':focus': {
                      bgcolor: '#ffd796',
                      color: '#ff7424',
                    },
                    color: 'black',
                    marginTop: 1,
                  }}
                >
                  Senior Operation Managers
                </Button> : null}
                {(data == 1 || data == 2 || data == 3 || data == 12) ? <Button onClick={() => {
                  setSelectData(4);
                }}
                  sx={{
                    ':hover': {
                      bgcolor: '#ffd796', // theme.palette.primary.main
                      color: '#ff7424',
                    },
                    ':focus': {
                      bgcolor: '#ffd796',
                      color: '#ff7424',
                    },
                    marginTop: 1,
                    color: 'black',
                  }}
                >
                  Operation Managers
                </Button> : null}
                {(data == 1 || data == 2 || data == 3 || data == 12 || data == 4) ? <Button onClick={() => {
                  setSelectData(13);
                }}
                  sx={{
                    ':hover': {
                      bgcolor: '#ffd796', // theme.palette.primary.main
                      color: '#ff7424',
                    },
                    ':focus': {
                      bgcolor: '#ffd796',
                      color: '#ff7424',
                    },
                    marginTop: 1,
                    color: 'black',
                  }}
                >
                  Gelathi Facilitator Leads
                </Button> : null}
                <Button
                  onClick={() => {
                    setSelectData(7);
                  }}
                  sx={{
                    ':hover': {
                      bgcolor: '#ffd796', // theme.palette.primary.main
                      color: '#ff7424',
                    },
                    ':focus': {
                      bgcolor: '#ffd796',
                      color: '#ff7424',
                    },
                    marginTop: 1,
                    color: 'black',
                  }}
                >
                  Location
                </Button>
                <Button
                  onClick={() => {
                    setSelectData(9);
                  }}
                  sx={{
                    ':hover': {
                      bgcolor: '#ffd796', // theme.palette.primary.main
                      color: '#ff7424',
                    },
                    ':focus': {
                      bgcolor: '#ffd796',
                      color: '#ff7424',
                    },
                    marginTop: 1,
                    color: 'black',
                  }}
                >
                  Date Range
                </Button>
              </CardContent>
            </Card>
            {selectDATA && selectDATA == 7 && <Grid style={{ marginTop: 30 }}>
              <LocationQuality selectDATA={selectDATA} onSumbit={(e, i) => { onSumbit(e, i) }} />
            </Grid>}
            {selectDATA && selectDATA == 9 && <Grid style={{ marginTop: 30 }}>
              <DateRangeQuality selectDATA={selectDATA} onDateSubmit={(e) => { onDateSubmit(e) }} />
            </Grid>}
            {selectDATA && selectDATA == 2 && <Grid style={{ marginTop: 30 }}>
              <AdminQuality selectDATA={selectDATA} getData={getData} />
            </Grid>}
            {selectDATA && selectDATA == 3 && <Grid style={{ marginTop: 30 }}>
              <AdminQuality selectDATA={selectDATA} getData={getData} />
            </Grid>}
            {selectDATA && selectDATA == 4 && <Grid style={{ marginTop: 30 }}>
              <AdminQuality selectDATA={selectDATA} getData={getData} />
            </Grid>}
            {selectDATA && selectDATA == 12 && <Grid style={{ marginTop: 30 }}>
              <AdminQuality selectDATA={selectDATA} getData={getData} />
            </Grid>}
            {selectDATA && selectDATA == 13 && <Grid style={{ marginTop: 30 }}>
              <AdminQuality selectDATA={selectDATA} getData={getData} />
            </Grid>}
          </div>
        </Scrollbar>
      </Drawer>
    </>
  );
}
