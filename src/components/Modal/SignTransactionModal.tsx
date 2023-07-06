import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { TitlePage } from "@app/styles";
import { Button as CustomButton } from "@app/components";
import { useBlockchain, getGasPrice } from "@app/blockchain";
import { SubTitlePage, ContainerDeviceModal, ContainerButtonFactors, FlexContainer, style } from "./css";
import Web3 from "web3";
import { isEmpty } from "lodash";
import { useAppSelector } from "@app/store";
import { sliceAddress, copyAddress } from "@app/utils";
import { Arrow } from "@app/assets/icon";

export type InfoTransacions = {
  addressTo: string;
  amount: string;
  contractTo?: string;
  origin: string;
  symbol?: string;
};
type Props = {
  title?: string;
  subTitle?: string;
  info: InfoTransacions | null;
  loading: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
};
const SignTransactionModal: React.FC<Props> = props => {
  const networkState = useAppSelector(state => state.network);
  const [_, setStatus] = useState(false);
  const { loading, info, handleClose, handleConfirm, title, subTitle } = props;
  const { web3, account } = useBlockchain(networkState.currentNetwork.data.rpcUrls);
  const [gasFee, setGasFee] = useState("0");
  useEffect(() => {
    const fetchGas = async () => {
      const gasPrice = await getGasPrice(web3 as Web3);

      setGasFee(gasPrice);
    };
    fetchGas();
  }, [web3, account]);
  return (
    <Modal open={!isEmpty(info)} onClose={handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
      <Box sx={style}>
        <TitlePage>{title}</TitlePage>
        <SubTitlePage>
          {subTitle + " "} <b>{info?.origin}</b>
        </SubTitlePage>
        <ContainerDeviceModal>
          <FlexContainer>
            <CustomButton onClick={() => copyAddress(account, setStatus)} style={{ borderRadius: "8px" }} variant='outlined' text={sliceAddress(account)} styleButton='default' />
            <Arrow style={{ margin: "10px 20px" }} />
            <CustomButton
              onClick={() => copyAddress(info?.addressTo ? info?.addressTo : "Error", setStatus)}
              style={{ borderRadius: "8px" }}
              variant='outlined'
              text={sliceAddress(info?.addressTo ? info?.addressTo : "Error")}
              styleButton='default'
            />
          </FlexContainer>
          <FlexContainer style={{ marginTop: "20px" }}>
            <div>Amount:</div>
            <div>{info?.amount + " " + info?.symbol}</div>
          </FlexContainer>
          {info?.contractTo ? (
            <FlexContainer>
              <div>Contract:</div>
              <div>{sliceAddress(info.contractTo)}</div>
            </FlexContainer>
          ) : null}
          <FlexContainer>
            <div>Gas Fee:</div>
            <div>{gasFee + " " + networkState.currentNetwork.data.title}</div>
          </FlexContainer>
        </ContainerDeviceModal>
        <ContainerButtonFactors>
          <CustomButton onClick={handleClose} height='48px' width='150px' mTop='50px' mBottom='20px' mRight='20px' text='Reject' styleButton='inactive'></CustomButton>
          <CustomButton loading={loading} onClick={handleConfirm} height='48px' width='150px' mTop='50px' mBottom='20px' text='Confirm' styleButton='primary'></CustomButton>
        </ContainerButtonFactors>
      </Box>
    </Modal>
  );
};
export default SignTransactionModal;
