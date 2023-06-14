import React, { useState, useLayoutEffect, useEffect } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { Dropdown } from "@app/assets/icon";
import { listNetWorks } from "@app/configs/data";
import { Token } from "@app/types/blockchain.type";
import { useAppDispatch, useAppSelector } from "@app/store";
import { setNetworkState } from "@app/store/redux/network/actions";
import { setHistoriesAddress } from "@app/store/redux/history/actions";
import { useBlockchain } from "@app/blockchain";
import { sliceAddress, copyAddress, preProcessHistoryResponse } from "@app/utils";

import { ModalCustom, HeaderModalInfoTransaction, HeaderModalGroupLeft, TitleModal } from "../Table/table.css";
import { ChangeNetworkTag, ChangeNetworkTagSub, FormControlCustom, SelectCustom, Container, MenuItemCustom, style, TagNetwork } from "./network.css";

import TagChangeNetwork from "./changeNetwork";
import ButtonCustom from "../Button";
export const NetworkContainer = () => {
  const { account: myAddress } = useBlockchain();
  const networkState = useAppSelector(state => state.network);
  const [network, setNetwork] = useState(networkState.currentNetwork.data);
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const listTokenState = useAppSelector(state => state.token);
  const historyState = useAppSelector(state => state.history);
  const fetchData = async (e: string = "") => {
    try {
      const rpc = e ? e : network;
      const currentNetwork = listNetWorks.find(networkTemp => networkTemp.rpcUrls === rpc);
      const listToken = listTokenState.currentListTokens.data.filter((tokens: Token) => tokens.rpcUrls === rpc && tokens.tokenContract !== undefined);
      const historyTransaction = await preProcessHistoryResponse(currentNetwork, myAddress, listToken);
      dispatch(setHistoriesAddress(historyTransaction));
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = async (event: any) => {
    setNetwork(event.target.value);
    handleOpen();
    await fetchData(event.target.value);
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
    dispatch(setNetworkState(network));
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    dispatch(setNetworkState(network));
    if (!historyState.getHistoriesAddress.data.length) fetchData();
  }, [network]);

  return (
    <Container>
      <ButtonCustom onClick={() => copyAddress(myAddress)} width='40%' height='40px' styleButton='style' padding='8px 12px' gap='10px' fontSize='14px' text={sliceAddress(myAddress)} />
      <FormControlCustom>
        <SelectCustom IconComponent={() => <Dropdown style={{ marginRight: "10px" }} />} value={network} onChange={handleChange}>
          {listNetWorks.map(network => (
            <MenuItemCustom key={network.chainID} value={network.rpcUrls}>
              <p>{network.description}</p>
            </MenuItemCustom>
          ))}
        </SelectCustom>
      </FormControlCustom>
      <ModalCustom open={open} onClose={handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
        <Box sx={style} width={isDesktop ? 700 : 300}>
          <HeaderModalInfoTransaction>
            <HeaderModalGroupLeft>
              <TitleModal>You have switched to</TitleModal>
              <TagNetwork>{listNetWorks.find(e => e.rpcUrls === network)?.description}</TagNetwork>
            </HeaderModalGroupLeft>
            <div>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </div>
          </HeaderModalInfoTransaction>
          <TagChangeNetwork text1={myAddress} text2={myAddress} />
          <ChangeNetworkTag>Change network</ChangeNetworkTag>
          <ChangeNetworkTagSub>The system will automatically create a new account for you on this network</ChangeNetworkTagSub>
          <ButtonCustom onClick={() => handleClose()} width='146px' height='44px' styleButton='primary' text='Got it'></ButtonCustom>
        </Box>
      </ModalCustom>
    </Container>
  );
};
