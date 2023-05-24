import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MenuItem from "@mui/material/MenuItem";
import ButtonCustom from "../Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { listNetWorks } from "../../configs/data";
import base from "../../styles/theme/base";
import { createBreakpoint } from "styled-components-breakpoint";
const breakpoint = createBreakpoint(base.breakpoints);
import { Dropdown } from "../../assets/icon";
import { sliceAddress, copyAddress } from "../../utils";
import { useAppDispatch, useAppSelector } from "../../store";
import { setCurrentListTokens } from "../../store/redux/transfer/actions";
import { ModalCustom, HeaderModalInforTransaction, HeaderModalGroupLeft, TitleModal } from "../Table";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TagChangeNetwork from "./changeNetwork";
export const NetworkContainer = () => {
  const networkState = useAppSelector(state => state.network);
  const [network, setNetwork] = useState(networkState.currentListTokens.data);
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event: any) => {
    setNetwork(event.target.value);
    dispatch(setCurrentListTokens(network));
    handleOpen();
    console.log(networkState.currentListTokens.data);
  };
  const [isDesktop, setIsDesktop] = useState(true);
  const handleResize = () => {
    if (window.innerWidth < 600) {
      setIsDesktop(false);
    } else {
      setIsDesktop(true);
    }
  };
  const myAdress = "0x04E407C7d7C2A6aA7f2e66B0B8C0dBcafA5E3Afe";
  return (
    <Container>
      <ButtonCustom onClick={() => copyAddress(myAdress)} width='40%' height='40px' styleButton='style' padding='8px 12px' gap='10px' fontSize='14px' text={sliceAddress(myAdress)} />
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
          <HeaderModalInforTransaction>
            <HeaderModalGroupLeft>
              <TitleModal>You have switched to</TitleModal>
              <TagNetwork>{listNetWorks.find(e => e.rpcUrls === network)?.description}</TagNetwork>
            </HeaderModalGroupLeft>
            <div>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </div>
          </HeaderModalInforTransaction>
          <TagChangeNetwork text1={myAdress} text2={myAdress} />
          <ChangeNetworkTag>Change network</ChangeNetworkTag>
          <ChangeNetworkTagSub>The system will automatically create a new account for you on this network</ChangeNetworkTagSub>
          <ButtonCustom onClick={() => handleClose()} width='146px' height='44px' styleButton='primary' text='Got it'></ButtonCustom>
        </Box>
      </ModalCustom>
    </Container>
  );
};
const ChangeNetworkTag = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: #42526e;
  margin-bottom: 20px;
`;
const ChangeNetworkTagSub = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #42526e;
  width: 318px;
  height: 48px;
  margin-bottom: 30px;
`;
const FormControlCustom = styled(FormControl)`
  background-color: #4a5568;
  ${breakpoint("xs")`
       width: 50% !important;

      `}
  ${breakpoint("sm")`
       width: 250px !important;
    `}
  border-radius: 8px !important;
  height: 40px !important;
  margin-left: 10px !important;
  box-sizing: border-box;
`;

const SelectCustom = styled(Select)`
  height: 40px !important;
  border-radius: 8px;
  color: #fff !important;
  font-family: "Inter" !important;
  font-style: normal !important;
  font-weight: 600 !important;
  font-size: 14px !important;
  line-height: 24px !important;
  &:hover {
    border-radius: 8px !important;
  }
  box-sizing: border-box;
  border-radius: 8px !important;
  .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input {
    border-radius: 8px !important;
  }
`;
const Container = styled.div`
  ${breakpoint("xs")`
      margin: 10px 10px
      `}
  ${breakpoint("sm")`
       margin: 44px 35px;
    `}
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const MenuItemCustom = styled(MenuItem)`
  height: 50px;
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
const TagNetwork = styled.div`
  text-align: center;
  padding: 8px 16px;
  border: solid 1px #d9d9d9;
  color: #42526e;
  gap: 8px;
  background-color: #f1f1f1;
  border-radius: 32px;
  ${breakpoint("xs")`
       width: auto !important;
    `}
  ${breakpoint("md")`
        width: 270px !important;
  `}
`;
