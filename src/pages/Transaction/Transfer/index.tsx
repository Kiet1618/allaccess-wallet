import { Grid } from "@mui/material";
import { TitlePage } from "../../../styles";
import CustomButton from "../../../components/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import CustomInput from "../../../components/TextField";
import { Copy, DropdownBlack, Success, SearchIcon } from "../../../assets/icon";
import { TextHeaderOverview } from "../../Overview/overview.css";
import FormGroup from "@mui/material/FormGroup";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { sliceAddress, copyAddress } from "../../../utils";
import { setCurrentListTokens } from "../../../store/redux/token/actions";
import Web3 from "web3";
import { sendTransaction, getBalanceToken, useBlockchain, getBalance, getNameToken, getSymbolToken } from "../../../blockchain";
import { useAppDispatch, useAppSelector } from "../../../store";
import { ModalCustom, HeaderModalInfoTransaction } from "../../../components/Table/table.css";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Box from "@mui/material/Box";
import { sendTransactionToken } from "../../../blockchain";
import { Token } from "../../../types/blockchain.type";
import { listNetWorks } from "../../../configs/data";
import { FormData } from "./type";
import {
  ContainerBalanceCard,
  TransferSuccessTitle,
  TransferSuccessSub,
  SearchContainer,
  ReceiveTagHeader,
  SubTitlePage,
  BackgroundPage,
  SelectCoin,
  ContainerFlexSpace,
  ContainerRight,
  CopyAddressContainer,
  BalanceNumberCard,
  TitlePageContainer,
  SpanRed,
  ContainerTextField,
  ContainerIconSuccess,
  ContainerTwoButtonModal,
  style,
} from "./transfer.css";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});
const Transfer = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const networkState = useAppSelector(state => state.network);
  const listTokenState = useAppSelector(state => state.token);
  const { web3 } = useBlockchain(networkState.currentListTokens.data);
  const myAddress = "0x04E407C7d7C2A6aA7f2e66B0B8C0dBcafA5E3Afe";
  const [openAlert, setOpenAlert] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleCloseAlert = () => setOpenAlert(false);
  const [tokenAddress, setTokenAddress] = useState("");
  const [symbolToken, setSymbolToken] = useState("");
  const [nameToken, setNameToken] = useState("");
  const [balance, setBalance] = useState("");
  const dispatch = useAppDispatch();
  const [token, setToken] = useState(listTokenState.currentListTokens.data.find(token => token.rpcUrls === networkState.currentListTokens.data)?.symbol as string);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      token: token,
      addressTo: "",
      amount: "",
    },
  });

  const validateAmount = (value: string) => {
    const parsedValue = Number(value);
    if (isNaN(parsedValue) || parsedValue <= 0) {
      return false;
    }
    return true;
  };
  const onSubmit = React.useCallback(async (values: FormData) => {
    setIsSubmitting(true);
    const currentToken = await listTokenState.currentListTokens.data.filter(e => e.rpcUrls === networkState.currentListTokens.data).find(e => e.symbol === values.token);
    currentToken?.tokenContract
      ? await sendTransactionToken(web3 as Web3, values, currentToken.tokenContract).then(res => {
          if (res === "Error") {
            setOpenAlert(true);
          } else {
            setOpen(true);
          }
        })
      : await sendTransaction(web3 as Web3, values).then(res => {
          if (res === "Error") {
            setOpenAlert(true);
          } else {
            setOpen(true);
          }
        });
    setIsSubmitting(false);
    reset();
  }, []);

  const [isDesktop, setIsDesktop] = useState(true);
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
  useEffect(() => {
    getNameToken(web3 as Web3, tokenAddress).then(res => setNameToken(res ? res : ""));
    getSymbolToken(web3 as Web3, tokenAddress).then(res => setSymbolToken(res ? res : ""));
    try {
      if (symbolToken && nameToken) {
        const currentNetwork = listNetWorks.find(networks => networks.rpcUrls === networkState.currentListTokens.data);

        dispatch(
          setCurrentListTokens({
            chainId: currentNetwork?.chainID,
            rpcUrls: currentNetwork?.rpcUrls,
            img: "",
            symbol: symbolToken,
            name: nameToken,
            tokenContract: tokenAddress,
          } as Token)
        );
      }
    } catch (err) {}
  }, [tokenAddress]);

  useEffect(() => {
    try {
      setToken(listTokenState.currentListTokens.data.find(e => e.rpcUrls === networkState.currentListTokens.data)?.symbol as string);
    } catch {}
  }, [networkState.currentListTokens.data]);
  useEffect(() => {
    try {
      const currentToken = listTokenState.currentListTokens.data.filter(e => e.rpcUrls === networkState.currentListTokens.data).find(e => e.symbol === token);
      currentToken?.tokenContract ? getBalanceToken(web3 as Web3, currentToken.tokenContract).then(res => setBalance(res)) : getBalance(web3 as Web3).then(res => setBalance(res));
    } catch {
      setBalance("Error");
    }
  }, [networkState.currentListTokens.data, token]);
  return (
    <Grid container columns={{ xs: 100, sm: 100, md: 100, lg: 100, xl: 100 }}>
      <Grid>
        <TitlePageContainer>
          <TitlePage>Transfer your Ethereum</TitlePage>
        </TitlePageContainer>
        <SubTitlePage>You need to choose the correct network, address and coin to transfer to another wallet address.</SubTitlePage>
      </Grid>
      <Grid item xs={100} sm={100} md={100} lg={50} xl={55}>
        <BackgroundPage>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <FormControl fullWidth>
                <ContainerTextField>
                  <label>
                    Select coin <SpanRed>*</SpanRed>
                  </label>
                  <CustomInput
                    value={token}
                    styleTextField='default'
                    select
                    id='token'
                    size='small'
                    {...register("token", {
                      onChange: e => setToken(e.target.value),
                    })}
                    SelectProps={{
                      IconComponent: () => <DropdownBlack style={{ marginRight: "10px" }} />,
                    }}
                  >
                    <SearchContainer>
                      <CustomInput
                        InputProps={{
                          startAdornment: <SearchIcon />,
                        }}
                        placeholder={"Search"}
                        size='small'
                        hiddenLabel
                        fullWidth
                        color='primary'
                        styleTextField='disable'
                        width='100%'
                        onChange={e => setTokenAddress(e.target.value)}
                      />
                    </SearchContainer>
                    {listTokenState.currentListTokens.data
                      .filter(token => token.rpcUrls === networkState.currentListTokens.data)
                      .map(coin => (
                        <MenuItem key={coin.symbol} value={coin.symbol}>
                          <SelectCoin>
                            <img width={"20px"} src={coin.img}></img>
                            {coin.name}
                          </SelectCoin>
                        </MenuItem>
                      ))}
                  </CustomInput>
                </ContainerTextField>
              </FormControl>
              <ContainerTextField>
                <label>
                  Transfer to <SpanRed>*</SpanRed>
                </label>
                <Controller
                  render={({ field: { name, value, onChange } }) => (
                    <CustomInput
                      error={!!errors.addressTo}
                      onChange={onChange}
                      name={name}
                      value={value}
                      helperText={errors.addressTo && "Invalid address"}
                      placeholder='Enter address'
                      id='addressTo'
                      size='small'
                      styleTextField='default'
                    />
                  )}
                  control={control}
                  name='addressTo'
                  defaultValue=''
                  rules={{
                    pattern: {
                      value: /^0x[a-fA-F0-9]{40}$/,
                      message: "",
                    },
                    required: { value: true, message: "" },
                  }}
                />
              </ContainerTextField>
              <ContainerTextField>
                <label>
                  Amount <SpanRed>*</SpanRed>
                </label>
                <Controller
                  render={({ field: { name, value, onChange } }) => (
                    <CustomInput
                      error={!!errors.amount}
                      onChange={onChange}
                      name={name}
                      placeholder='Enter amount'
                      id='amount'
                      size='small'
                      value={value}
                      styleTextField='default'
                      helperText={errors.amount && "Invalid value"}
                    />
                  )}
                  control={control}
                  name='amount'
                  defaultValue=''
                  rules={{
                    required: { value: true, message: "" },
                    validate: validateAmount,
                  }}
                />
              </ContainerTextField>
              <ContainerFlexSpace>
                <div>Maxium desposit</div>
                <div>0.00001 ETH</div>
              </ContainerFlexSpace>
              <ContainerFlexSpace>
                <div>Network desposit</div>
                <div>$12.34</div>
              </ContainerFlexSpace>
              <ContainerFlexSpace>
                <TextHeaderOverview>Total cost</TextHeaderOverview>
                <TextHeaderOverview>$12.34</TextHeaderOverview>
              </ContainerFlexSpace>
              <ContainerRight>
                <CustomButton variant='contained' loadingPosition='end' loading={isSubmitting} type='submit' text='Transfer' styleButton='primary' width='150px' height='50px'></CustomButton>
              </ContainerRight>
            </FormGroup>
          </form>
        </BackgroundPage>
      </Grid>
      <Grid item xs={100} sm={100} md={100} lg={50} xl={45}>
        <ContainerBalanceCard>
          <BackgroundPage>
            <ReceiveTagHeader>Account balance</ReceiveTagHeader>
            <CopyAddressContainer onClick={() => copyAddress(myAddress)}>
              {sliceAddress(myAddress)} <Copy />
            </CopyAddressContainer>
            <BalanceNumberCard>
              {balance} {token}
            </BalanceNumberCard>
          </BackgroundPage>
        </ContainerBalanceCard>
      </Grid>
      <ModalCustom open={open} onClose={handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
        <Box sx={style} width={isDesktop ? 700 : 300}>
          <HeaderModalInfoTransaction>
            <ContainerIconSuccess>
              <Success />
            </ContainerIconSuccess>
          </HeaderModalInfoTransaction>
          <TransferSuccessTitle>Transfer successfully</TransferSuccessTitle>
          <TransferSuccessSub>You are done the transaction successfully. You can now review your transaction in your history</TransferSuccessSub>

          <ContainerTwoButtonModal>
            <CustomButton onClick={() => handleClose()} width='230px' height='44px' styleButton='inactive' text='View transfer history'></CustomButton>
            <CustomButton onClick={() => handleClose()} width='135px' height='44px' styleButton='primary' text='Ok, I got it'></CustomButton>
          </ContainerTwoButtonModal>
        </Box>
      </ModalCustom>
      <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity='error' sx={{ width: "100%", borderRadius: "8px" }}>
          Transaction failure!
        </Alert>
      </Snackbar>
    </Grid>
  );
};
export default Transfer;
