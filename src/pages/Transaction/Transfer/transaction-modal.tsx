import { CircularProgress } from "@mui/material";
import CustomButton from "../../../components/Button";
import { Success } from "../../../assets/icon";
import React, { useState, memo, useLayoutEffect } from "react";
import { sliceAddress } from "../../../utils";
import { useAppSelector } from "../../../store";
import { ModalCustom, HeaderModalInfoTransaction } from "../../../components/Table/table.css";
import Box from "@mui/material/Box";
import { style, TransferSuccessTitle, TransferSuccessSub, CopyAddressContainer, ContainerIconSuccess, ContainerTwoButtonModal } from "./transfer.css";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  status: "success" | "pending" | "error" | string;
  transactionHash?: string;
  transactionError?: string;
};
const TransactionModal: React.FC<Props> = memo(props => {
  const { isOpen, status, handleClose, transactionHash } = props;
  const networkState = useAppSelector(state => state.network);
  const [isDesktop, setIsDesktop] = useState(true);

  const onClose = () => {
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

  return (
    <ModalCustom open={isOpen} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description' onClose={handleClose}>
      <Box sx={style} width={isDesktop ? 700 : 300}>
        {status === "success" && (
          <>
            <HeaderModalInfoTransaction style={{ marginTop: "20px" }}>
              <ContainerIconSuccess>
                <Success />
              </ContainerIconSuccess>
            </HeaderModalInfoTransaction>
            <TransferSuccessTitle>Transfer successfully</TransferSuccessTitle>
            <TransferSuccessSub>You are done the transaction successfully. You can now review your transaction in your history</TransferSuccessSub>

            <ContainerTwoButtonModal>
              <CustomButton
                onClick={() => window.open(networkState.currentNetwork.data.apiTransactionHash?.replace("{transactionHash}", transactionHash || ""), "_blank")}
                width='230px'
                height='44px'
                styleButton='inactive'
                text='View transfer history'
              ></CustomButton>
              <CustomButton onClick={onClose} width='135px' height='44px' styleButton='primary' text='Ok, I got it'></CustomButton>
            </ContainerTwoButtonModal>
          </>
        )}
        {status === "pending" && (
          <>
            <HeaderModalInfoTransaction>
              <ContainerIconSuccess>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <CircularProgress style={{ margin: "40px 0" }} />
                </Box>
              </ContainerIconSuccess>
            </HeaderModalInfoTransaction>
            <TransferSuccessTitle>Transfer pending</TransferSuccessTitle>
            <TransferSuccessSub style={{ marginBottom: "20px" }}>The transaction continues regardless of whether you close the modal.</TransferSuccessSub>
            {transactionHash ? (
              <CopyAddressContainer
                onClick={() => {
                  const link = networkState.currentNetwork.data.apiTransactionHash?.replace("{transactionHash}", transactionHash || "");
                  console.log("🚀 ~ file: transaction-modal.tsx:82 ~ link:", link);
                  window.open(link, "_blank");
                }}
              >
                {"Transaction hash: " + sliceAddress(transactionHash)}
              </CopyAddressContainer>
            ) : null}
          </>
        )}
      </Box>
    </ModalCustom>
  );
});
TransactionModal.displayName = "TransactionModal";
export default TransactionModal;
