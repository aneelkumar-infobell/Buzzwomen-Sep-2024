import React, { useState } from 'react'
import { Input, InputAdornment } from '@mui/material';
import Iconify from '../../../components/Iconify';

function searchCommon(props) {

    return (
        <div style={{ marginLeft: "1rem", display: 'flex' }}>
            <Input
                autoFocus
                onChange={(e) => { props.getSearchFilter(e?.target?.value) }}
                placeholder="Search…"
                sx={{ m: 2, fontWeight: 'fontWeightBold', width: 340, }}
                startAdornment={
                    <InputAdornment position="start">
                        <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                    </InputAdornment>
                }
            />
        </div>
    )
}

export default searchCommon