import React, { useState, useLayoutEffect, useEffect } from "react";
import { Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import styled from "styled-components";
import base from "../../styles/theme/base";
import { createBreakpoint } from "styled-components-breakpoint";
import { Copy, Eyes } from "../../assets/icon";
import { CopyAddressContainer } from "../../pages/Transaction";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { sliceAddress, copyAddress } from "../../utils";
import { rows, Row } from "../../configs/data/test";
import axios from "axios";
import { get } from "lodash";
import { useAppDispatch, useAppSelector } from "../../store";
import { listNetWorks } from "../../configs/data/blockchain";
import { formatValue, sendTransaction, getCurrentBlock, getBalanceToken, useBlockchain, getBalance } from "../../blockchain";
import Web3 from "web3";
import { setHistoriesAddress } from "../../store/redux/history/actions";
import { preProcessHistoryResponse } from "../../utils";
import { Token } from "../../types/blockchain.type";
import { Empty } from "../../assets/icon";

import { EmptyContainer } from "../../pages/Overview/overview.css";
const breakpoint = createBreakpoint(base.breakpoints);
const sliceAddressIdTableCell = (str: string) => {
  if (str.length > 35) {
    return str.substr(0, 5) + "..." + str.substr(str.length - 3, str.length);
  }
  return str;
};
const TableWithPagination: React.FC = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const myAddress = "0x04E407C7d7C2A6aA7f2e66B0B8C0dBcafA5E3Afe";
  const listTokenState = useAppSelector(state => state.token);
  const networkState = useAppSelector(state => state.network);
  const historyState = useAppSelector(state => state.history);
  const { web3 } = useBlockchain(networkState.currentListTokens.data);
  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };
  const [isDesktop, setIsDesktop] = useState(true);
  const handleResize = () => {
    if (window.innerWidth < 600) {
      setIsDesktop(false);
    } else {
      setIsDesktop(true);
    }
  };
  useLayoutEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useAppDispatch();
  const [row, setRow] = React.useState<Row>({
    time: "",
    method: "",
    amount: "",
    from: "",
    to: "",
    network: "",
    id: "",
    token: "",
  });
  const fetchData = async () => {
    const currentNetwork = listNetWorks.find(networkTemp => networkTemp.rpcUrls === networkState.currentListTokens.data);
    const listToken = listTokenState.currentListTokens.data.filter((tokens: Token) => tokens.rpcUrls === networkState.currentListTokens.data && tokens.tokenContract !== undefined);
    const historyTransaction = await preProcessHistoryResponse(currentNetwork, myAddress, listToken);
    dispatch(setHistoriesAddress(historyTransaction));
  };
  useEffect(() => {
    if (!historyState.getHistoriesAddress.data.length) fetchData();
  }, [networkState.currentListTokens.data]);
  const handleInfo = (time: string, method: string, amount: string, from: string, to: string, network: string, id: string, token: string) => {
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

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            {historyState.getHistoriesAddress.data?.length ? (
              <TableRow>
                <TableCell>Time</TableCell>
                <TableCell>Method</TableCell>
                <TableCellCustom>Amount</TableCellCustom>
                <TableCellCustom>From</TableCellCustom>
                <TableCellCustom></TableCellCustom>
                <TableCellCustom>To</TableCellCustom>
                <TableCellCustom>Network</TableCellCustom>
                <TableCell>TxID</TableCell>
                <TableCell></TableCell>
              </TableRow>
            ) : null}
          </TableHead>

          <TableBody>
            {historyState.getHistoriesAddress.data?.length ? (
              historyState.getHistoriesAddress.data.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage).map(row => (
                <TableRow key={row.id}>
                  <TableCell>{row.timeStamp}</TableCell>
                  <TableCell>
                    <CustomMethod>{row.method}</CustomMethod>
                  </TableCell>
                  <TableCellCustom>
                    {formatValue(web3 as Web3, row.value as string)} {row.tokenSymbol ? row.tokenSymbol : "ETH"}
                  </TableCellCustom>
                  <TableCellCustom>
                    <CopyAddressContainer onClick={() => copyAddress(row.from)}>
                      {sliceAddress(row.from ? row.from : "")} <Copy />
                    </CopyAddressContainer>
                  </TableCellCustom>
                  <TableCellCustom>
                    <TableCellCustomInOut text={row.from === "0x04E407C7d7C2A6aA7f2e66B0B8C0dBcafA5E3Afe" ? "In" : "Out"}>
                      {row.from === "0x04E407C7d7C2A6aA7f2e66B0B8C0dBcafA5E3Afe" ? "In" : "Out"}
                    </TableCellCustomInOut>
                  </TableCellCustom>
                  <TableCellCustom>
                    <CopyAddressContainer onClick={() => copyAddress(row.to)}>
                      {sliceAddress(row.to ? row.to : "")} <Copy />
                    </CopyAddressContainer>
                  </TableCellCustom>
                  <TableCellCustom>Ethereum Network</TableCellCustom>
                  <TableCell>
                    <CopyAddressContainer onClick={() => copyAddress(row.blockHash)}>
                      {isDesktop ? sliceAddress(row.blockHash ? row.blockHash : "") : sliceAddressIdTableCell(row.blockHash ? row.blockHash : "")} <Copy />
                    </CopyAddressContainer>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() =>
                        handleInfo(
                          row?.timeStamp ? row?.timeStamp : "",
                          "Approve",
                          formatValue(web3 as Web3, row.value.toString()),
                          row.from,
                          row.to,
                          "Ethereum Network",
                          row.blockHash,
                          row.tokenSymbol ? row.tokenSymbol : "ETH"
                        )
                      }
                    >
                      <Eyes />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <EmptyContainer>
                <div>
                  <Empty></Empty>
                  <p>Assets not found in your wallet</p>
                </div>
              </EmptyContainer>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil((historyState.getHistoriesAddress.data?.length ? historyState.getHistoriesAddress.data?.length : 0) / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        shape='rounded'
      />

      <ModalCustom open={open} onClose={handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
        <Box sx={style} width={isDesktop ? 700 : 300}>
          <HeaderModalInfoTransaction>
            <HeaderModalGroupLeft>
              <TitleModal>Transfer details</TitleModal>
              <CustomMethod>{row.method}</CustomMethod>
              <TableCellCustomInOut text={row.from === "0x04E407C7d7C2A6aA7f2e66B0B8C0dBcafA5E3Afe" ? "In" : "Out"}>
                {row.from === "0x04E407C7d7C2A6aA7f2e66B0B8C0dBcafA5E3Afe" ? "In" : "Out"}
              </TableCellCustomInOut>
            </HeaderModalGroupLeft>
            <div>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </div>
          </HeaderModalInfoTransaction>
          <ContainerInfoTransactions>
            <HeaderModalInfoTransaction>
              <div>Status</div>
              <div>Completed</div>
            </HeaderModalInfoTransaction>
            <HeaderModalInfoTransaction>
              <div>Date</div>
              <div>{row.time}</div>
            </HeaderModalInfoTransaction>
            <HeaderModalInfoTransaction>
              <div>Method</div>
              <div>Approve</div>
            </HeaderModalInfoTransaction>
            <HeaderModalInfoTransaction>
              <div>TxID</div>
              <CopyAddressContainer onClick={() => copyAddress(row.id)}>
                {isDesktop ? row.id : sliceAddress(row.id)} <Copy />
              </CopyAddressContainer>
            </HeaderModalInfoTransaction>
            <HeaderModalInfoTransaction>
              <div>Coin</div>
              <div>{row.token}</div>
            </HeaderModalInfoTransaction>
            <HeaderModalInfoTransaction>
              <div>Network</div>
              <div>{row.network}</div>
            </HeaderModalInfoTransaction>
            <HeaderModalInfoTransaction>
              <div>From</div>
              <CopyAddressContainer onClick={() => copyAddress(row.from)}>
                {isDesktop ? row.from : sliceAddress(row.from)} <Copy />
              </CopyAddressContainer>
            </HeaderModalInfoTransaction>
            <HeaderModalInfoTransaction>
              <div>To</div>
              <CopyAddressContainer onClick={() => copyAddress(row.to)}>
                {isDesktop ? row.to : sliceAddress(row.to)} <Copy />
              </CopyAddressContainer>
            </HeaderModalInfoTransaction>
            <HeaderModalInfoTransaction>
              <div>Fee</div>
              <div>
                0.12
                <span>{row.token}</span>
              </div>
            </HeaderModalInfoTransaction>
          </ContainerInfoTransactions>
        </Box>
      </ModalCustom>
    </>
  );
};

const App: React.FC = () => {
  return <TableWithPagination />;
};

export default App;

export const TitleModal = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  color: black;
  margin-right: 10px;
`;
const ContainerInfoTransactions = styled.div`
  width: 100%;
  margin-top: 40px;
  color: ${props => props.theme.colors.black};
`;

export const HeaderModalInfoTransaction = styled.div`
  display: flex;
  justify-content: space-between !important;
  width: 100%;
  margin-bottom: 20px;
`;
export const HeaderModalGroupLeft = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
type PropsInOut = {
  text: string;
};
export const ModalCustom = styled(Modal)`
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
  border-radius: 8px;
  ${breakpoint("xs")`
       width: auto !important;
    `}
  ${breakpoint("md")`
        width: 100px !important;
  `}
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

const TableCellCustom = styled(TableCell)`
  ${breakpoint("xs")`
      display: none !important;
    `}
  ${breakpoint("md")`
      display: table-cell !important;
  `}
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
