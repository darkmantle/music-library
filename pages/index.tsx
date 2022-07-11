import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Container from "@mui/material/Container";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'title',
        headerName: 'Title',
        width: 150
    }
];

const searchOptions = [
    "query",
    "title",
    "artist",
    "barcode"
]

const Home: NextPage<any> = (props) => {

    const [type, setType] = useState<any>('query');
    const [rows, setRows] = useState<any>([]);

    const handleChange = (event: SelectChangeEvent) => {
        setType(event.target.value);
    };

    const keyPress = (e: any) => {
        if (e.keyCode == 13) {
            fetch("/api/search", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    type,
                    query: e.target.value
                })
            })
                .then(res => res.json())
                .then((data: SearchResponse) => {
                    setRows(data.results);
                })
        }
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    return (
        <Container sx={{ marginTop: 10 }}>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={type}
                            label="Type"
                            onChange={handleChange}
                        >
                            {searchOptions.map(so => <MenuItem value={so}>{capitalizeFirstLetter(so)}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={10} style={{ paddingLeft: 0, borderTopLeftRadius: 0 }}>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" onKeyUp={keyPress} sx={{ width: '100%' }} />

                </Grid>
            </Grid>
            <Box sx={{ height: '70vh', width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    checkboxSelection
                    disableSelectionOnClick
                />
            </Box>
        </Container>
    )
}

export default Home;