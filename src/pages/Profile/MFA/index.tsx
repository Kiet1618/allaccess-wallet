import React from "react";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import Modal from "@mui/material/Modal";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { Devices } from "../../../configs/data/test";
import { Computer, Trash } from "../../../assets/icon";
import CustomButton from "../../../components/Button";
import CustomInput from "../../../components/TextField";
import { TitlePageBlack, TitlePage } from "../../../styles";
import { BackgroundPage, TitlePageContainer } from "../profile.css";
import { SubTitlePage, ContainerTextField, SpanRed } from "../../Transaction/transaction.css";
import { TextHeaderCard, ContainerDevice, GroupLeftItemDevice, ContainerText, NameText, IpText } from "../../MultipleFactors/multipleFactors.css";
import { ContainerDeviceModal, ListDevicesContainer, ContainerButtonFactors, ContainerNumberFactors, ContainerHeaderFactors, style } from "./mfa.css";

type Device = {
  name: string;
  ip: string;
};
const MFA = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const handleDelete = (name: string, ip: string) => {
    setDevice({
      name: name,
      ip: ip,
    });
    handleOpen();
  };
  const handleClose = () => setOpen(false);
  const [device, setDevice] = React.useState<Device>({
    name: "",
    ip: "",
  });
  return (
    <>
      <Grid container columns={{ xs: 100, sm: 100, md: 100, lg: 100, xl: 100 }}>
        <Grid item xs={100}>
          <TitlePageContainer>
            <TitlePageBlack>MFA Setting</TitlePageBlack>
            <SubTitlePage>You can manage your security and view your devices here</SubTitlePage>
          </TitlePageContainer>
        </Grid>
        <Grid item xs={100} sm={100} md={100} lg={50} xl={55}>
          <BackgroundPage>
            <ContainerHeaderFactors>
              <TextHeaderCard>Security factors</TextHeaderCard>
              <ContainerNumberFactors>2/3</ContainerNumberFactors>
            </ContainerHeaderFactors>
            <SubTitlePage>The number of factors to authenticate in order to access your account.</SubTitlePage>
            <ContainerTextField>
              <label>
                Recovery email <SpanRed>*</SpanRed>
              </label>
              <CustomInput size='small' fullWidth value={"kiettran@lecle.co.kr"} styleTextField='default' disabled></CustomInput>
            </ContainerTextField>
            <ContainerButtonFactors>
              <CustomButton height='48px' width='100px' mTop='50px' mBottom='20px' mRight='20px' text='Cancel' styleButton='inactive'></CustomButton>
              <CustomButton height='48px' width='100px' mTop='50px' mBottom='20px' text='Confirm' styleButton='primary'></CustomButton>
            </ContainerButtonFactors>
          </BackgroundPage>
        </Grid>
        <Grid item xs={100} sm={100} md={100} lg={50} xl={45}>
          <ListDevicesContainer>
            <BackgroundPage>
              <TextHeaderCard>List devices</TextHeaderCard>
              {Devices.map(device => (
                <ContainerDevice key={device.id}>
                  <GroupLeftItemDevice>
                    <Computer />
                    <ContainerText>
                      <NameText> {device.name}</NameText>
                      <IpText>IP: {device.ip}</IpText>
                    </ContainerText>
                  </GroupLeftItemDevice>
                  <Tooltip title='Delete' placement='top-start'>
                    <IconButton
                      onClick={() => {
                        handleDelete(device.name, device.ip);
                      }}
                    >
                      <Trash />
                    </IconButton>
                  </Tooltip>
                </ContainerDevice>
              ))}
            </BackgroundPage>
          </ListDevicesContainer>
        </Grid>
      </Grid>
      <Modal open={open} onClose={handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <TitlePage>Delete devices</TitlePage>
          <SubTitlePage>This device will be erased and automatically logged out, are you sure?</SubTitlePage>
          <ContainerDeviceModal>
            <ContainerDevice>
              <GroupLeftItemDevice>
                <Computer />
                <ContainerText>
                  <NameText>{device.name}</NameText>
                  <IpText>IP: {device.ip}</IpText>
                </ContainerText>
              </GroupLeftItemDevice>
            </ContainerDevice>
          </ContainerDeviceModal>
          <ContainerButtonFactors>
            <CustomButton onClick={handleClose} height='48px' width='150px' mTop='50px' mBottom='20px' mRight='20px' text='Back' styleButton='inactive'></CustomButton>
            <CustomButton height='48px' width='150px' mTop='50px' mBottom='20px' text="Yes, I'm sure" styleButton='primary'></CustomButton>
          </ContainerButtonFactors>
        </Box>
      </Modal>
    </>
  );
};
export default MFA;
