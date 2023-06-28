import React, { useState, useLayoutEffect, useEffect } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";

import { Dropdown } from "@app/assets/icon";
import { listNetWorks } from "@app/configs/data";
import { ChainNetwork, Token } from "@app/types/blockchain.type";
import { useAppDispatch, useAppSelector } from "@app/store";
import { setNetworkState } from "@app/store/redux/network/actions";
import { setHistoriesAddress } from "@app/store/redux/history/actions";
import { useBlockchain } from "@app/blockchain";
import { sliceAddress, copyAddress, preProcessHistoryResponse } from "@app/utils";

import { ModalCustom, HeaderModalInfoTransaction, HeaderModalGroupLeft, TitleModal } from "../Table/table.css";
import { ChangeNetworkTag, ChangeNetworkTagSub, FormControlCustom, SelectCustom, Container, MenuItemCustom, style, TagNetwork } from "./network.css";

import TagChangeNetwork from "./changeNetwork";
import ButtonCustom from "../Button";
import { getTorusKey } from "@app/storage/storage-service";
export const NetworkContainer = () => {
  const networkState = useAppSelector(state => state.network);
  const [network, setNetwork] = useState(networkState.currentNetwork.data);
  // const { account: myAddress } = useBlockchain(network.rpcUrls);
  const myAddress = getTorusKey().ethAddress;
  console.log(myAddress);
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const listTokenState = useAppSelector(state => state.token);
  const [status, setStatus] = useState(false);
  const historyState = useAppSelector(state => state.history);
  const fetchData = async (e: string = "") => {
    try {
      const listToken = listTokenState.currentListTokens.data.filter((tokens: Token) => tokens.rpcUrls === network.rpcUrls && tokens.tokenContract !== undefined);
      console.log(myAddress);
      const historyTransaction = await preProcessHistoryResponse(network, myAddress, listToken);
      console.log("--------------");
      console.log(historyTransaction);
      console.log("--------------");

      dispatch(setHistoriesAddress(historyTransaction));
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = async (event: any) => {
    const currentNetwork = listNetWorks.find(network => network.description === event.target.value) as ChainNetwork;
    setNetwork(currentNetwork);
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
    fetchData();
  }, [network]);

  return (
    <Container>
      <ButtonCustom onClick={() => copyAddress(myAddress, setStatus)} width='40%' height='40px' styleButton='style' padding='8px 12px' gap='10px' fontSize='14px' text={sliceAddress(myAddress)} />
      <FormControlCustom>
        <SelectCustom IconComponent={() => <Dropdown style={{ marginRight: "10px" }} />} value={network.description} onChange={handleChange}>
          {listNetWorks.map(network => (
            <MenuItemCustom key={network.chainID} value={network.description}>
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
              <TagNetwork>{listNetWorks.find(e => e.rpcUrls === network.rpcUrls)?.description}</TagNetwork>
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
