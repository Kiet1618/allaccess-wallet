import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { TitlePage } from "@app/styles";
import { Button as CustomButton } from "@app/components";
import useBlockchain from "@app/blockchain/wrapper";
import { SubTitlePage, ContainerDeviceModal, ContainerButtonFactors, FlexContainer, style } from "./css";
import { sliceAddress, copyAddress } from "@app/utils";

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
  const { getBalance, getAccount } = useBlockchain();
  const [balance, setBalance] = React.useState("0");
  const [_, setStatus] = React.useState(false);
  useEffect(() => {
    const fetchBalance = async () => {
      const fetchBalance = await getBalance();
      setBalance(fetchBalance);
    };
    fetchBalance();
  }, [getAccount()]);
  return (
    <Modal open={Boolean(origin)} onClose={handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
      <Box sx={style}>
        <TitlePage>{title}</TitlePage>
        <SubTitlePage>{subTitle}</SubTitlePage>
        <ContainerDeviceModal style={{ marginTop: "10px" }}>
          <FlexContainer>
            <div>
              <b>Account</b>
            </div>
            <div>
              <b>Balance</b>
            </div>
          </FlexContainer>
          <FlexContainer style={{ marginTop: "10px" }}>
            <CustomButton
              onClick={() =>
                copyAddress(getAccount(), () => {
                  setStatus(true);
                  setTimeout(() => {
                    setStatus(false);
                  }, 3000);
                })
              }
              style={{ borderRadius: "8px" }}
              variant='outlined'
              text={sliceAddress(getAccount())}
              styleButton='default'
            ></CustomButton>
            <CustomButton style={{ borderRadius: "8px" }} variant='outlined' text={balance} styleButton='default' border='none'></CustomButton>
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
