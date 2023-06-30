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
import { getTorusKey } from "@app/storage/storage-service";
import useBlockchain from "@app/blockchain/wrapper";
import { createAccount } from "@app/store/redux/wallet/actions";
import { useCustomSnackBar } from "@app/hooks";

export const fetchData = async (currentNetwork: ChainNetwork) => {
  const myAddress = getTorusKey().ethAddress;
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
export const NetworkContainer = () => {
  const networkState = useAppSelector(state => state.network);
  const [selectedNetwork, setSelectedNetwork] = useState(networkState.currentNetwork.data);
  const { handleNotification } = useCustomSnackBar();
  const { getAccount } = useBlockchain();
  // const myAddress = getTorusKey().ethAddress;
  const myPubKey = getTorusKey().pubKey;
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [_, setStatus] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const historyState = useAppSelector(state => state.history);

  const handleChangeNetwork = async (event: any) => {
    const currentNetwork = listNetWorks.find(network => network.description === event.target.value) as ChainNetwork;
    setSelectedNetwork(currentNetwork);
    handleOpen();
  };

  const handleSelectedNetwork = async () => {
    if (!selectedNetwork) return;
    if (selectedNetwork.chainID.includes("flow")) {
      const { meta, payload } = await dispatch(createAccount({ publicKey: myPubKey || "", hashAlgo: 3, signAlgo: 2 }));
      if (meta.requestStatus === "rejected") {
        handleNotification(payload, "error");
        return;
      }
    }
    await dispatch(setNetworkState(selectedNetwork));
    handleClose();
  };

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
  useEffect(() => {
    if (!historyState.getHistoriesAddress.data) fetchData(networkState.currentNetwork.data);
  }, [networkState]);
  return (
    <Container>
      <ButtonCustom
        onClick={() => copyAddress(getAccount(), setStatus)}
        width='40%'
        height='40px'
        styleButton='style'
        padding='8px 12px'
        gap='10px'
        fontSize='14px'
        text={sliceAddress(getAccount())}
      />
      <FormControlCustom>
        <SelectCustom IconComponent={() => <Dropdown style={{ marginRight: "10px" }} />} value={networkState.currentNetwork.data.description} onChange={handleChangeNetwork}>
          {listNetWorks.map(network => (
            <MenuItemCustom
              key={network.chainID}
              value={network.description}
              onChange={() => {
                console.log(network);
              }}
            >
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
              <TagNetwork>{listNetWorks.find(e => e.chainID === selectedNetwork.chainID)?.description}</TagNetwork>
            </HeaderModalGroupLeft>
            <div>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </div>
          </HeaderModalInfoTransaction>
          <TagChangeNetwork text1={getAccount()} text2={getAccount()} />
          <ChangeNetworkTag>Change network</ChangeNetworkTag>
          <ChangeNetworkTagSub>The system will automatically create a new account for you on this network</ChangeNetworkTagSub>
          <div>
            <ButtonCustom onClick={() => handleClose()} mRight='8px' width='146px' height='44px' styleButton='default' text='Close'></ButtonCustom>
            <ButtonCustom onClick={() => handleSelectedNetwork()} width='146px' height='44px' styleButton='primary' text='Got it'></ButtonCustom>
          </div>
        </Box>
      </ModalCustom>
    </Container>
  );
};
