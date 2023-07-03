import React, { useState, useLayoutEffect, useEffect } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Dropdown } from "@app/assets/icon";
import { listNetWorks } from "@app/configs/data";
import { ChainNetwork, Token } from "@app/types/blockchain.type";
import { useAppDispatch, useAppSelector } from "@app/store";
import { setNetworkState } from "@app/store/redux/network/actions";
import { setHistoriesAddress } from "@app/store/redux/history/actions";
import { sliceAddress, copyAddress, preProcessHistoryResponse } from "@app/utils";
import { ModalCustom, HeaderModalInfoTransaction, HeaderModalGroupLeft, TitleModal } from "../Table/table.css";
import { ChangeNetworkTag, ChangeNetworkTagSub, FormControlCustom, SelectCustom, Container, MenuItemCustom, style, TagNetwork } from "./network.css";
import TagChangeNetwork from "./changeNetwork";
import ButtonCustom from "../Button";
import { useBlockchain } from "@app/blockchain";
import Cookies from "universal-cookie";
export const NetworkContainer = () => {
  const networkState = useAppSelector(state => state.network);
  const [network, setNetwork] = useState(networkState.currentNetwork.data);
  const { account: myAddress } = useBlockchain(network.rpcUrls);
  const cookies = new Cookies();
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [_, setStatus] = useState(false);
  const historyState = useAppSelector(state => state.history);
  const initialNetwork = cookies.get("chainId") ? cookies.get("chainId") : null;
  const handleChange = async (event: any) => {
    const currentNetwork = listNetWorks.find(network => network.description === event.target.value) as ChainNetwork;
    setNetwork(currentNetwork);
    handleOpen();
    await fetchData(currentNetwork);
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
    if (!historyState.getHistoriesAddress.data) fetchData(network);
    dispatch(setNetworkState(network));
  }, [network]);
  const fetchData = async (currentNetwork: ChainNetwork) => {
    const listTokenState = useAppSelector(state => state.token);
    const dispatch = useAppDispatch();
    try {
      const listToken = listTokenState.currentListTokens.data.filter((tokens: Token) => tokens.chainID === currentNetwork.chainID && tokens.tokenContract !== undefined);
      const historyTransaction = await preProcessHistoryResponse(currentNetwork, myAddress, listToken);
      dispatch(setHistoriesAddress(historyTransaction));
    } catch (error) {
      console.log(error);
    }
  };
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
              <TagNetwork>{listNetWorks.find(e => e.chainID === network.chainID)?.description}</TagNetwork>
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
