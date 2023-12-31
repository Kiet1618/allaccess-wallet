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
import { useAppDispatch, useAppSelector } from "@app/store";
import { sendPhraseToEmail } from "@app/store/redux/wallet/actions";

type Props = {
  isOpen: boolean;
  email: string;
  handleClose: () => void;
  loadingEnableMFA: boolean;
  handleEnableMFA: () => void;
  seeds: string;
};
const ModalEnableMFA: React.FC<Props> = props => {
  const dispatch = useAppDispatch();

  const { handleNotification } = useCustomSnackBar();
  const sendPhraseToEmailState = useAppSelector(state => state.wallet.sendPhraseToEmail);

  const { email, isOpen, handleClose, loadingEnableMFA, handleEnableMFA, seeds } = props;
  const [copiedSeeds, setCopiedSeeds] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [isSentEmail, setIsSentEmail] = useState(false);

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([seeds], { type: "text/plain" });
    const url = window.URL.createObjectURL(file);
    element.href = url;
    element.download = "recovery_phrase.txt";
    element.hidden = true;
    document.body.appendChild(element);

    element.addEventListener("click", () => {
      // Check if the download was canceled
      if (element.href === "") {
        console.log("Download canceled");
        // Handle the cancel event here
        setIsDownloaded(false);
      } else {
        setIsDownloaded(true);
      }
    });
    element.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(element); // Clean up after downloading

    setIsDownloaded(true);
  };

  const handleSendEmail = async () => {
    const { meta } = await dispatch(sendPhraseToEmail({ email, phrase: seeds }));
    if (meta.requestStatus === "fulfilled") {
      handleNotification("Please confirm to complete the 2FA setting", "success");
      setIsSentEmail(true);
    }
    if (meta.requestStatus === "rejected") {
      handleNotification("Sent mail failed, please try again later", "error");
      setIsSentEmail(false);
    }
  };

  const preHandleEnableMFA = () => {
    if (!isDownloaded && !isSentEmail) {
      handleNotification("Please download recovery phrase before", "error");
      return;
    }
    handleEnableMFA();
  };

  const disableSendEmail = () => {
    // if (isSentEmail) return "inactive";
    if (!sendPhraseToEmailState.loading) return "style";
    if (sendPhraseToEmailState.loading) return "inactive";
  };

  return (
    <Modal open={isOpen} onClose={handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
      <Box sx={style}>
        <TitlePage>Backup recovery key</TitlePage>
        <ContainerSummary>
          Please ensure you store your recovery key in a safe place. It is important as the recovery key is the only way to access your account in case you lose data on all configured devices
        </ContainerSummary>
        <ContainerInput>
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
        </ContainerInput>
        <ContainerActions spacing={2}>
          <Button onClick={handleSendEmail} styleButton={disableSendEmail()} loading={sendPhraseToEmailState.loading} mRight='8px' variant='outlined' text='Send to email' />
          <Button onClick={handleDownload} variant='outlined' text='Download' />
        </ContainerActions>
        {(isDownloaded || isSentEmail) && (
          <Button styleButton={loadingEnableMFA ? "inactive" : "primary"} loading={loadingEnableMFA} onClick={preHandleEnableMFA} mTop='8px' width='135px' height='44px' text='Confirm'></Button>
        )}
      </Box>
    </Modal>
  );
};

const ContainerSummary = styled.div`
  margin-top: 8px;
`;

const ContainerActions = styled(Grid)`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.sm}px;
`;

const ContainerInput = styled(Grid)`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.sm}px;
`;
export default ModalEnableMFA;
