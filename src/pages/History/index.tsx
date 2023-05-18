import { Page, TitlePage } from "../../styles";
import base from "../../styles/theme/base";
import { createBreakpoint } from "styled-components-breakpoint";
import React, { useState } from "react";
import styled from "styled-components";
const breakpoint = createBreakpoint(base.breakpoints);
import MenuItem from "@mui/material/MenuItem";
import CustomInput from "../../components/TextField";
import { listNetWorks } from "../../configs/data/menu";
import { TimeDropdown } from "../../assets/icon";
import { Table, TableContainer, TableBody, TableCell, TableCellProps, TableHead, TableRow, Paper, TablePagination, Pagination } from "@mui/material";
import { Copy, Eyes } from "../../assets/icon";
import { CopyAddressContainer } from "../../pages/Transaction";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material";
import Box from "@mui/material/Box";
const rows: Row[] = [
  {
    time: "2022-08-14 02:34",
    method: "Approve",
    amount: 244.68,
    token: "USDT",
    from: "0x04E407C7d7C2A6aA7f2e66B0B8C0dBcafA5E3Afe",
    to: "0x04E407C7d7C2A6aA7f2e66B0B8C0dBcafA5E3Af1",
    network: "Erthereum network",
    id: "0xed3a265cebd603aa2cb9771be5c6ce10ff1e4c7a0be751111111111111111",
  },
  {
    time: "2022-08-14 02:34",
    method: "Execute",
    amount: 244.68,
    token: "USDT",
    from: "0x04E407C7d7C2A6aA7f2e66B0B8C0dBcafA5E3Af1",
    to: "0x04E407C7d7C2A6aA7f2e66B0B8C0dBcafA5E3Afe",
    network: "Erthereum network",
    id: "0xed3a265cebd603aa2cb9771be5c6ce10ff1e4c7a0be222222222222222222222",
  },
  {
    time: "2022-08-14 02:34",
    method: "Transfer",
    amount: 244.68,
    token: "USDT",
    from: "0x04E407C7d7C2A6aA7f2e66B0B8C0dBcafA5E3Af1",
    to: "0x04E407C7d7C2A6aA7f2e66B0B8C0dBcafA5E3Afe",
    network: "Erthereum network",
    id: "0xed3a265cebd603aa2cb9771be5c6ce10ff1e4433333333333333333333333333333",
  },
  {
    time: "2022-08-14 02:34",
    method: "Linear Deposit",
    amount: 244.68,
    token: "USDT",
    from: "0x04E407C7d7C2A6aA7f2e66B0B8C0dBcafA5E3Af1",
    to: "0x04E407C7d7C2A6aA7f2e66B0B8C0dBcafA5E3Afe",
    network: "Erthereum network",
    id: "0xed3a265cebd603aa2cb9771be5c6ce10ff1e4c4444444444444444444444444444",
  },
  {
    time: "2022-08-14 02:34",
    method: "Approve",
    amount: 244.68,
    token: "USDT",
    from: "0x04E407C7d7C2A6aA7f2e66B0B8C0dBcafA5E3Afe",
    to: "0x04E407C7d7C2A6aA7f2e66B0B8C0dBcafA5E3Af1",
    network: "Erthereum network",
    id: "0xed3a265cebd603aa2cb9771be5c6ce10ff1e4c7a555555555555555555555555555",
  },
  {
    time: "2022-08-14 02:34",
    method: "Approve",
    amount: 244.68,
    token: "USDT",
    from: "0x04E407C7d7C2A6aA7f2e66B0B8C0dBcafA5E3Afe",
    to: "0x04E407C7d7C2A6aA7f2e66B0B8C0dBcafA5E3Af1",
    network: "Erthereum network",
    id: "0xed3a265cebd603aa2cb9771be5c6ce10ff1e4c6666666666666666666666666666",
  },
  {
    time: "2022-08-14 02:34",
    method: "Approve",
    amount: 244.68,
    token: "USDT",
    from: "0x04E407C7d7C2A6aA7f2e66B0B8C0dBcafA5E3Afe",
    to: "0x04E407C7d7C2A6aA7f2e66B0B8C0dBcafA5E3Af1",
    network: "Erthereum network",
    id: "0xed3a265cebd603aa2cb9771be5c6ce10ff1e4c777777777777777777777777777",
  },
  {
    time: "2022-08-14 02:34",
    method: "Approve",
    amount: 244.68,
    token: "USDT",
    from: "0x04E407C7d7C2A6aA7f2e66B0B8C0dBcafA5E3Afe",
    to: "0x04E407C7d7C2A6aA7f2e66B0B8C0dBcafA5E3Af1",
    network: "Erthereum network",
    id: "0xed3a265cebd603aa2cb9771be5c6ce10ff1e888888888888888888888888888888",
  },
  {
    time: "2022-08-14 02:34",
    method: "Approve",
    amount: 244.68,
    token: "USDT",
    from: "0x04E407C7d7C2A6aA7f2e66B0B8C0dBcafA5E3Afe",
    to: "0x04E407C7d7C2A6aA7f2e66B0B8C0dBcafA5E3Af1",
    network: "Erthereum network",
    id: "0xed3a265cebd603aa2cb9771be5c6ce10f9999999999999999999999999999999999",
  },
];

interface Row {
  time: string;
  method: string;
  amount: number;
  from: string;
  to: string;
  network: string;
  id: string;
  token: string;
}

const History = () => {
  const myAddress = "0x04E407C7d7C2A6aA7f2e66B0B8C0dBcafA5E3Afe";
  const [time, setTime] = useState("30");
  const [method, setMethod] = useState("All");
  const [network, setNetwork] = useState("0");
  const [status, setStatus] = useState("All");
  const [searchId, setSearchId] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [row, setRow] = React.useState<Row>({
    time: "",
    method: "",
    amount: 0,
    from: "",
    to: "",
    network: "",
    id: "",
    token: "",
  });
  const handleInfo = (time: string, method: string, amount: number, from: string, to: string, network: string, id: string, token: string) => {
    setRow({
      time: time,
      method: method,
      amount: amount,
      from: from,
      to: to,
      network: network,
      id: id,
      token: token,
    });
    handleOpen();
  };

  const sliceAddress = (str: string) => {
    if (str.length > 35) {
      return str.substr(0, 8) + "..." + str.substr(str.length - 5, str.length);
    }
    return str;
  };

  return (
    <Page>
      <TilePageContainer>
        <TitlePage>Transactions history</TitlePage>
        <SubTitlePage>View all your transfers and receive transaction in your wallet.</SubTitlePage>
        <ContainerFilter>
          <ContainerTextField>
            <label>Time</label>
            <CustomInput
              width='260px'
              value={time}
              styleTextField='default'
              select
              id='time'
              size='small'
              onChange={e => setTime(e.target.value)}
              SelectProps={{
                IconComponent: () => <TimeDropdown style={{ marginRight: "10px" }} />,
              }}
            >
              <MenuItem value={7}>Past 7 days</MenuItem>
              <MenuItem value={30}>Past 30 days</MenuItem>
              <MenuItem value={90}>Past 90 days</MenuItem>
              <MenuItem value={0}>Custimized</MenuItem>
            </CustomInput>
          </ContainerTextField>
          <ContainerTextField>
            <label>Method</label>
            <CustomInput width='200px' value={method} styleTextField='default' select id='method' size='small' onChange={e => setMethod(e.target.value)}>
              <MenuItem value={"All"}>All</MenuItem>
              <MenuItem value={"Receive"}>Receive</MenuItem>
              <MenuItem value={"Execute"}>Execute</MenuItem>
              <MenuItem value={"LinearDeposit"}>Linear Deposit</MenuItem>
              <MenuItem value={"Approve"}>Approve</MenuItem>
            </CustomInput>
          </ContainerTextField>
          <ContainerTextField>
            <label>Network</label>
            <CustomInput width='300px' value={network} styleTextField='default' select id='network' size='small' onChange={e => setNetwork(e.target.value)}>
              <MenuItem value={"0"}>All mainnet</MenuItem>
              {listNetWorks.map(network => (
                <MenuItem value={network.chainID}>{network.description}</MenuItem>
              ))}
            </CustomInput>
          </ContainerTextField>
          <ContainerTextField>
            <label>Status</label>
            <CustomInput width='200px' value={status} styleTextField='default' select id='status' size='small' onChange={e => setStatus(e.target.value)}>
              <MenuItem value={"All"}>All</MenuItem>
              <MenuItem value={"Completed"}>Completed</MenuItem>
              <MenuItem value={"Incomplete"}>Incomplete</MenuItem>
              <MenuItem value={"Pending"}>Pending</MenuItem>
            </CustomInput>
          </ContainerTextField>
          <ContainerTextField>
            <label>Search ID</label>
            <CustomInput width='300px' onChange={e => setSearchId(e.target.value)} placeholder='Enter ID' id='search-id' size='small' value={searchId} styleTextField='default' />
          </ContainerTextField>
        </ContainerFilter>
      </TilePageContainer>
      <ContainerDataTable>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Time</TableCell>
                <TableCell>Method</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>From</TableCell>
                <TableCell></TableCell>
                <TableCell>To</TableCell>
                <TableCell>Network</TableCell>
                <TableCell>TxID</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage).map(row => (
                <TableRow key={row.id}>
                  <TableCell>{row.time}</TableCell>
                  <TableCell>
                    <CustomMethod>{row.method}</CustomMethod>
                  </TableCell>
                  <TableCell>
                    {row.amount} {row.token}
                  </TableCell>
                  <TableCell>
                    <CopyAddressContainer>
                      {sliceAddress(row.from)} <Copy />
                    </CopyAddressContainer>
                  </TableCell>

                  <TableCell>
                    {" "}
                    <TableCellCustomInOut text={row.from === "0x04E407C7d7C2A6aA7f2e66B0B8C0dBcafA5E3Afe" ? "In" : "Out"}>
                      {row.from === "0x04E407C7d7C2A6aA7f2e66B0B8C0dBcafA5E3Afe" ? "In" : "Out"}
                    </TableCellCustomInOut>
                  </TableCell>
                  <TableCell>
                    <CopyAddressContainer>
                      {sliceAddress(row.to)} <Copy />
                    </CopyAddressContainer>
                  </TableCell>
                  <TableCell>{row.network}</TableCell>
                  <TableCell>
                    <CopyAddressContainer>
                      {sliceAddress(row.id)} <Copy />
                    </CopyAddressContainer>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={handleOpen}>
                      <Eyes />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Pagination count={Math.ceil(rows.length / rowsPerPage)} page={page} onChange={handleChangePage} shape='rounded' />
      </ContainerDataTable>
      {/* <Modal open={open} onClose={handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <TitlePage>Delete devices</TitlePage>
          <SubTitlePage>This device will be erased and automatically logged out, are you sure?</SubTitlePage>
        </Box>
      </Modal> */}
    </Page>
  );
};
export default History;
const ContainerFilter = styled.div`
  display: flex;
  align-items: center;
`;
const ContainerDataTable = styled.div`
  ${breakpoint("xs")`
    margin: 10px 10px;
`}
  ${breakpoint("lg")`
    margin: 10px 44px;
  `}
`;

export const TilePageContainer = styled.div`
  ${breakpoint("xs")`
    margin: 0px 10px;
`}
  ${breakpoint("lg")`
    margin: 22px 44px;
  `}
  position: static;
  justify-content: center;
  align-items: center;
`;

const SubTitlePage = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.xs + "px"};
  line-height: 24px;

  color: ${({ theme }) => theme.colors.neutrals.gray600};
  ${breakpoint("xs")`
    width: 100%;
`}
  ${breakpoint("sm")`
     margin: 20px 0;
     width: 100%;
  `}
  ${breakpoint("md")`
     margin: 20px 0;
     width: 100%;
  `}
  ${breakpoint("lg")`
     margin: 20px 0;
     width: 60%;
  `}
`;
export const ContainerTextField = styled.div`
  margin: 10px 10px;
  display: flex;
  flex-direction: column;
  justify-content: left;
  .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root {
    color: rgb(113, 128, 150) !important;
  }
`;
type PropsInOut = {
  text: string;
};

const CustomMethod = styled.div`
  text-align: center;
  padding: 5px 5px;
  border: solid 1px #cfd6dd;
  color: #272e35;
  width: 100px;
  border-radius: 8px;
`;
const TableCellCustomInOut = styled.div<PropsInOut>`
  background-color: ${props => {
    if (props.text === "In") {
      return "rgb(29, 233, 182, 0.25)";
    } else {
      return "rgb(247, 206, 57, 0.25)";
    }
  }};
  border-radius: 8px;
  margin: 5px 5px;
  padding: 5px 5px;
  width: 50px;
  color: ${props => {
    if (props.text === "In") {
      return "#1DE9B6";
    } else {
      return "#F7CE39";
    }
  }};
  border: ${props => {
    if (props.text === "In") {
      return "solid 1px #1DE9B6";
    } else {
      return "solid 1px #F7CE39";
    }
  }};
  text-align: center;
`;

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  textAlign: "center",
  alignItems: "center",
};
