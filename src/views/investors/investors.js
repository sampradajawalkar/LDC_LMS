import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14
    }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0
    }
}));

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9)
];

export default function Investor() {
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        fetch('http://192.168.10.21:8080/investor/1')
            .then((res) => res.json())
            .then((res) => setData([...data, res]));
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="right">ID</StyledTableCell>
                        <StyledTableCell align="right">FIRST NAME</StyledTableCell>
                        <StyledTableCell align="right">PAN CARD</StyledTableCell>
                        <StyledTableCell align="right">LOCATION</StyledTableCell>
                        <StyledTableCell align="right">STATE</StyledTableCell>

                        {/* <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
                        <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
                        <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((investor) => (
                        <StyledTableRow key={investor.id}>
                            <StyledTableCell align="right">{investor.id}</StyledTableCell>
                            <StyledTableCell align="right" component="th" scope="row">
                                {investor.firstName + ' ' + investor.middleName + ' ' + +investor.lastName}
                            </StyledTableCell>
                            <StyledTableCell align="right">{investor.panNo}</StyledTableCell>
                            <StyledTableCell align="right">{investor.address.split(',')[0]}</StyledTableCell>
                            <StyledTableCell align="right">{investor.address.split(',')[1]}</StyledTableCell>
                            {/* <StyledTableCell align="right">{row.fat}</StyledTableCell> */}
                            {/* <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                            <StyledTableCell align="right">{row.protein}</StyledTableCell> */}
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
