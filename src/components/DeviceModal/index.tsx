import React from "react";
import { isEmpty } from "lodash";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import { Computer } from "@app/assets/icon";
import { TitlePage } from "@app/styles";
import { ShareInfo } from "@app/wallet/metadata";
import { Button as CustomButton } from "@app/components";

import { SubTitlePage, GroupLeftItemDevice, ContainerDeviceModal, ContainerButtonFactors, ContainerDevice, ContainerText, NameText, IpText, style } from "./css";

type Props = {
  title?: string;
  subTitle?: string;
  device: ShareInfo | null;
  loading: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  isCurrent?: boolean;
};
const DeviceModal: React.FC<Props> = props => {
  const { loading, device, handleClose, handleConfirm, isCurrent, title, subTitle } = props;

  return (
    <Modal open={!isEmpty(device)} onClose={handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
      <Box sx={style}>
        <TitlePage>{title}</TitlePage>
        <SubTitlePage>{subTitle}</SubTitlePage>
        <ContainerDeviceModal>
          <ContainerDevice>
            <GroupLeftItemDevice>
              <Computer />
              <ContainerText>
                <NameText>{`${device?.deviceInfo?.os} ${device?.deviceInfo?.version} ${isCurrent ? "(Current)" : ""}`}</NameText>
                <IpText>IP: {device?.deviceInfo?.ipv4}</IpText>
              </ContainerText>
            </GroupLeftItemDevice>
          </ContainerDevice>
        </ContainerDeviceModal>
        <ContainerButtonFactors>
          <CustomButton onClick={handleClose} height='48px' width='150px' mTop='50px' mBottom='20px' mRight='20px' text='Back' styleButton='inactive'></CustomButton>
          <CustomButton loading={loading} onClick={handleConfirm} height='48px' width='150px' mTop='50px' mBottom='20px' text="Yes, I'm sure" styleButton='primary'></CustomButton>
        </ContainerButtonFactors>
      </Box>
    </Modal>
  );
};
export default DeviceModal;
