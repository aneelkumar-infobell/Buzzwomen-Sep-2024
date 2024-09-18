import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles'
import { red } from '@mui/material/colors';
import defaultImage from '../../../assets/images/default.png'
import { Card, CardContent, Grid, Typography, Avatar, Badge, Button } from '@mui/material';
import ShopProductCard from './ProductCard';

ProductList.propTypes = {
  products: PropTypes.array.isRequired
};


export default function ProductList({ isOpenFilter, onOpenFilter, onCloseFilter, products, users, ...other }) {

  const viewUser = (itm) => {
    sessionStorage.setItem('people', JSON.stringify(itm))
    onOpenFilter()
  }

  return (
    <>
      <Grid container spacing={3} {...other}>
        {users.map((itm, index) => (
          <Grid key={index} item xs={6} sm={6} md={4} >

            <Card onClick={() => { viewUser(itm) }}>
              <CardContent style={{padding:"20px"}}>
                <Grid direction={'column'} spacing={2} height="180px">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                   
                    <img style={{ borderRadius: 50 ,height:50,width:50}} src={itm?.profile_pic!=="" ? itm.profile_pic : defaultImage} />
                  </div>
                  <Typography  sx={{ fontSize: 20, fontWeight: 'medium' }} mt={3} textAlign={'center'} >
                    {`${itm?.first_name} ${itm?.last_name}`}
                  </Typography>
                  <div style={{ textAlign: "center", fontSize: "0.8rem",color:"#ff7424",fontWeight:300}}>
                    {itm?.role_name}
                  </div>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))
        }

      </Grid>{users?.length == 0 && (
        <div>
          <h1 style={{ fontWeight: 900, textAlign: 'center' }}><br />No People</h1>
        </div>

      )}</>
  );
}
