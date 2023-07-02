import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { TitlePage } from "@app/styles";
import { Button as CustomButton } from "@app/components";
import { useBlockchain, getBalance } from "@app/blockchain";
import { SubTitlePage, ContainerDeviceModal, ContainerButtonFactors, FlexContainer, style } from "./css";
import Web3 from "web3";
import { sliceAddress } from "@app/utils";
type Props = {
  title?: string;
  subTitle?: string;
  origin: string | null;
  loading: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
};
const LoginRequestModal: React.FC<Props> = props => {
  const { loading, origin, handleClose, handleConfirm, title, subTitle } = props;
  const { web3, account } = useBlockchain();
  const [balance, setBalance] = React.useState("0");
  useEffect(() => {
    const fetchBalance = async () => {
      const fetchBalance = await getBalance(web3 as Web3);
      setBalance(fetchBalance);
    };
    fetchBalance();
  }, []);
  return (
    <Modal open={Boolean(origin)} onClose={handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
      <Box sx={style}>
        <TitlePage>{title}</TitlePage>
        <SubTitlePage>{subTitle}</SubTitlePage>
        <ContainerDeviceModal style={{ marginTop: "10px" }}>
          <FlexContainer>
            <div>
              <b>Amount</b>
            </div>
            <div>
              <b>Balance</b>
            </div>
          </FlexContainer>
          <FlexContainer style={{ marginTop: "10px" }}>
            <div>{sliceAddress(account)}</div>
            <div>{balance}</div>
          </FlexContainer>
          <FlexContainer style={{ marginTop: "30px", marginBottom: "30px" }}>
            <div>
              <b>Origin</b>
            </div>
            <div>{origin}</div>
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
export default LoginRequestModal;
