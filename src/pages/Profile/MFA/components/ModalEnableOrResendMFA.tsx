import React, { useState } from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import DoneIcon from "@mui/icons-material/Done";

import { TitlePage } from "@app/styles";
import { Button } from "@app/components";
import { Copy } from "@app/assets/icon";

import styled from "styled-components";
import { Grid, InputAdornment, TextField } from "@mui/material";
import { copyAddress } from "@app/utils";
import { style } from "../mfa.css";
import { useCustomSnackBar } from "@app/hooks";

type Props = {
  isOpen: boolean;
  email: string;
  handleClose: () => void;
  loadingEnableMFA: boolean;
  handleEnableMFA: () => void;
  seeds: string;
};
const ModalEnableMFA: React.FC<Props> = props => {
  const { handleNotification } = useCustomSnackBar();

  const { email, isOpen, handleClose, loadingEnableMFA, handleEnableMFA, seeds } = props;
  const [copiedSeeds, setCopiedSeeds] = useState(false);
  const [allowConfirm, setAllowConfirm] = useState(false);

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([seeds], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "recovery_phrase.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    setAllowConfirm(true);
  };

  const preHandleEnableMFA = () => {
    if (!allowConfirm) {
      handleNotification("Please download recovery phrase before", "error");
      return;
    }
    handleEnableMFA();
  };

  return (
    <Modal open={isOpen} onClose={handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
      <Box sx={style}>
        <TitlePage>Recovery Phrase</TitlePage>
        <ContainerSummary>
          Recovery phrase will be sent to <b>{email}</b>. In case you lose access to your saved browser, you can authenticate with your recovery phrase
        </ContainerSummary>
        <ContainerActions spacing={2}>
          <Grid>
            <TextField
              multiline
              rows={2}
              maxRows={4}
              value={seeds}
              style={{ width: "100%" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='start' style={{ cursor: "pointer" }}>
                    {copiedSeeds && <DoneIcon />}
                    {!copiedSeeds && (
                      <Copy
                        onClick={() => {
                          setCopiedSeeds(true);
                          copyAddress(seeds, () => {
                            setTimeout(() => {
                              setCopiedSeeds(false);
                            }, 3000);
                          });
                        }}
                      />
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Button onClick={handleDownload} mTop='8px' variant='outlined' text='Download' />
        </ContainerActions>
        <Button styleButton={loadingEnableMFA ? "inactive" : "primary"} loading={loadingEnableMFA} onClick={preHandleEnableMFA} mTop='8px' width='135px' height='44px' text='Send to email'></Button>
      </Box>
    </Modal>
  );
};

const ContainerSummary = styled.div`
  margin-top: 8px;
`;

const ContainerActions = styled(Grid)`
  text-align: left;
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.sm}px;
`;
export default ModalEnableMFA;
