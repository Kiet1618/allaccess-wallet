import React, { useState, useLayoutEffect } from "react";
import Web3 from "web3";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Pagination } from "@mui/material";
import { Copy, Eyes } from "../../assets/icon";
import { Empty } from "../../assets/icon";
import { InfoModal } from "./type";
import { sliceAddress, copyAddress } from "../../utils";
import { formatValue, useBlockchain } from "../../blockchain";
import { useAppSelector } from "../../store";
import { EmptyContainer } from "../../pages/Overview/overview.css";
import { CopyAddressContainer } from "../../pages/Transaction/transaction.css";
import { TitleModal, ContainerInfoTransactions, HeaderModalInfoTransaction, style, HeaderModalGroupLeft, ModalCustom, CustomMethod, TableCellCustomInOut, TableCellCustom } from "./table.css";
import DoneIcon from "@mui/icons-material/Done";
const sliceAddressIdTableCell = (str: string) => {
  if (str.length > 35) {
    return str.substr(0, 5) + "..." + str.substr(str.length - 3, str.length);
  }
  return str;
};
const TableWithPagination: React.FC = () => {
  const rowsPerPage = 5;
  const networkState = useAppSelector(state => state.network);
  const historyState = useAppSelector(state => state.history);
  const { web3, account: myAddress } = useBlockchain(networkState.currentNetwork.data.rpcUrls);
  const [statusFrom, setStatusFrom] = useState(false);
  const [statusTo, setStatusTo] = useState(false);
  const [statusTransactionHash, setStatusTransactionHash] = useState(false);

  const [page, setPage] = useState(1);
  const [isDesktop, setIsDesktop] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [row, setRow] = React.useState<InfoModal>({
    time: "",
    method: "",
    amount: "",
    from: "",
    to: "",
    network: "",
    id: "",
    token: "",
  });
  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };
  const handleResize = () => {
    if (window.innerWidth < 600) {
      setIsDesktop(false);
    } else {
      setIsDesktop(true);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
  useLayoutEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
                    <CopyAddressContainer
                      onClick={() =>
                        copyAddress(row.from, () => {
                          setStatusFrom(true);
                          setTimeout(() => {
                            setStatusFrom(false);
                          }, 3000);
                        })
                      }
                    >
                      {sliceAddress(row.from ? row.from : "")} {statusFrom ? <DoneIcon /> : <Copy />}
                    </CopyAddressContainer>
                  </TableCellCustom>
                  <TableCellCustom>
                    <TableCellCustomInOut text={row.from === myAddress ? "Out" : "In"}>{row.from === myAddress ? "Out" : "In"}</TableCellCustomInOut>
                  </TableCellCustom>
                  <TableCellCustom>
                    <CopyAddressContainer
                      onClick={() =>
                        copyAddress(row.to, () => {
                          setStatusTo(true);
                          setTimeout(() => {
                            setStatusTo(false);
                          }, 3000);
                        })
                      }
                    >
                      {sliceAddress(row.to ? row.to : "")} {statusTo ? <DoneIcon /> : <Copy />}
                    </CopyAddressContainer>
                  </TableCellCustom>
                  <TableCellCustom>Ethereum Network</TableCellCustom>
                  <TableCell>
                    <CopyAddressContainer
                      onClick={() =>
                        copyAddress(row.blockHash, () => {
                          setStatusTransactionHash(true);
                          setTimeout(() => {
                            setStatusTransactionHash(false);
                          }, 3000);
                        })
                      }
                    >
                      {isDesktop ? sliceAddress(row.blockHash ? row.blockHash : "") : sliceAddressIdTableCell(row.blockHash ? row.blockHash : "")} {statusTransactionHash ? <DoneIcon /> : <Copy />}
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
              <TableCellCustomInOut text={row.from === myAddress ? "Out" : "In"}>{row.from === "myAddress" ? "Out" : "In"}</TableCellCustomInOut>
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
              <CopyAddressContainer
                onClick={() =>
                  copyAddress(row.id, () => {
                    setStatusFrom(true);
                    setTimeout(() => {
                      setStatusFrom(false);
                    }, 3000);
                  })
                }
              >
                {isDesktop ? row.id : sliceAddress(row.id)}
                {statusFrom ? <DoneIcon /> : <Copy />}
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
              <CopyAddressContainer
                onClick={() =>
                  copyAddress(row.from, () => {
                    setStatusTo(true);
                    setTimeout(() => setStatusTo(false), 3000);
                  })
                }
              >
                {isDesktop ? row.from : sliceAddress(row.from)} {statusTo ? <DoneIcon /> : <Copy />}
              </CopyAddressContainer>
            </HeaderModalInfoTransaction>
            <HeaderModalInfoTransaction>
              <div>To</div>
              <CopyAddressContainer
                onClick={() =>
                  copyAddress(row.to, () => {
                    setStatusTransactionHash(true);
                    setTimeout(() => setStatusTransactionHash(false), 3000);
                  })
                }
              >
                {isDesktop ? row.to : sliceAddress(row.to)} {statusTransactionHash ? <DoneIcon /> : <Copy />}
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
export default TableWithPagination;
