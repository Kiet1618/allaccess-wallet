import React, { useState } from "react";
import { TitlePageBlack } from "../../styles";

import { Table, TableContainer, TableBody, TableCell, TableCellProps, TableHead, TableRow, Paper, TablePagination, Pagination } from "@mui/material";
import styled from "styled-components";
import base from "../../styles/theme/base";
import { createBreakpoint } from "styled-components-breakpoint";
import { Copy, Eyes } from "../../assets/icon";
import { CopyAddressContainer, SubTitlePage } from "../../pages/Transaction";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";

const breakpoint = createBreakpoint(base.breakpoints);
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

const TableWithPagination: React.FC = () => {
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
    <>
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
                  <IconButton onClick={() => handleInfo(row.time, row.method, row.amount, row.from, row.to, row.network, row.id, row.token)}>
                    <Eyes />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination count={Math.ceil(rows.length / rowsPerPage)} page={page} onChange={handleChangePage} shape='rounded' />
      <ModalCustom open={open} onClose={handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <HeaderModalInforTransaction>
            <HeaderModalGroupLeft>
              <TitleModal>Transfer details</TitleModal>
              <CustomMethod>{row.method}</CustomMethod>
              <TableCellCustomInOut text={row.from === "0x04E407C7d7C2A6aA7f2e66B0B8C0dBcafA5E3Afe" ? "In" : "Out"}>
                {row.from === "0x04E407C7d7C2A6aA7f2e66B0B8C0dBcafA5E3Afe" ? "In" : "Out"}
              </TableCellCustomInOut>
            </HeaderModalGroupLeft>
            <div>
              <IconButton>
                <CloseIcon />
              </IconButton>
            </div>
          </HeaderModalInforTransaction>
          <HeaderModalInforTransaction>
            <div>Status</div>
            <div>Completed</div>
          </HeaderModalInforTransaction>
          <HeaderModalInforTransaction>
            <div>Status</div>
            <div>Completed</div>
          </HeaderModalInforTransaction>
        </Box>
      </ModalCustom>
    </>
  );
};

const App: React.FC = () => {
  return <TableWithPagination />;
};

const TitleModal = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  color: black;
  margin-right: 10px;
`;

const HeaderModalInforTransaction = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const HeaderModalGroupLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
export default App;
type PropsInOut = {
  text: string;
};
const ModalCustom = styled(Modal)`
  .igUPum {
    display: flex;
    -webkit-box-pack: justify !important;
    justify-content: space-between;
    width: 100% !important;
  }
`;
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
  width: 600,
};
