import React from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import { useCustomSnackBar } from "@app/hooks";
import { TitlePage } from "@app/styles";
import { TextField as CustomInput, Button } from "@app/components";

import { style } from "../mfa.css";
import styled from "styled-components";
import { Grid } from "@mui/material";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};
const ModalEnableMFA: React.FC<Props> = props => {
  const { isOpen, handleClose } = props;
  const { handleNotification } = useCustomSnackBar();

  return (
    <Modal open={isOpen} onClose={handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
      <Box sx={style}>
        <TitlePage>Send Recovery Phrase</TitlePage>
        <ContainerSummary>Provide an email to receive recovery phrase. In case you lose access to your saved browser, you can authenticate with your recovery phrase</ContainerSummary>
        <ContainerActions container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <CustomInput
              style={{
                width: "100%",
              }}
              size='small'
              value={"nvkhiem2016@gmail.com"}
            />
          </Grid>
          <Grid item>
            <CustomInput />
            <Button variant='outlined' text='Download' />
          </Grid>
        </ContainerActions>
      </Box>
    </Modal>
  );
};

const ContainerSummary = styled.div``;

const ContainerActions = styled(Grid)`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.sm}px;
`;
export default ModalEnableMFA;
