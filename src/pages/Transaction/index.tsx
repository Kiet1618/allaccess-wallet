import { Grid } from "@mui/material";
import { Page, TitlePage } from "../../styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import base from "../../styles/theme/base";
import { createBreakpoint } from "styled-components-breakpoint";
import Typography from "@mui/material/Typography";
import CustomButton from "../../components/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import CustomInput from "../../components/TextField";
import { NetworkContainer } from "../../components/Network";
import { myListCoin, privateKey } from "../../configs/data/test";
import { Copy, DropdownBlack, Success } from "../../assets/icon";
import QRCode from "react-qr-code";
import { OverviewHeaderTopCoin, TextHeaderOverview } from "../Overview/overview.css";
import FormGroup from "@mui/material/FormGroup";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { sliceAddress, copyAddress } from "../../utils";
import styled from "styled-components";
import { setCurrentListTokens } from "../../store/redux/token/actions";
import Web3 from "web3";
import { sendTransaction, getBalanceToken, useBlockchain, getBalance } from "../../blockchain";
import { useAppDispatch, useAppSelector } from "../../store";
import { ModalCustom, HeaderModalInfoTransaction } from "../../components/Table";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Box from "@mui/material/Box";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});
export type FormData = {
  token: string;
  addressTo: string;
  amount: string;
  tokenContract?: string;
};
type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};
const breakpoint = createBreakpoint(base.breakpoints);

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role='tabpanel' hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <OverviewHeaderTopCoin>
          <Typography>{children}</Typography>
        </OverviewHeaderTopCoin>
      )}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Transaction = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const networkState = useAppSelector(state => state.network);
  const listTokenState = useAppSelector(state => state.token);
  // const [provider, setProvider] = useState(networkState.currentListTokens.data);
  const { web3 } = useBlockchain(networkState.currentListTokens.data);
  const myAddress = "0x04E407C7d7C2A6aA7f2e66B0B8C0dBcafA5E3Afe";
  const [openAlert, setOpenAlert] = useState(false);
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleCloseAlert = () => setOpenAlert(false);
  const [balance, setBalance] = useState("");
  const [token, setToken] = React.useState(listTokenState.currentListTokens.data.find(token => token.rpcUrls === networkState.currentListTokens.data)?.symbol as string);

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
      tokenContract: "",
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
    await sendTransaction(web3 as Web3, values).then(res => {
      if (res === "Error") {
        setOpenAlert(true);
      } else {
        setOpen(true);
      }
    });
    setIsSubmitting(false);
    reset();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
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
    try {
      getBalance(web3 as Web3).then(res => setBalance(res));
    } catch {
      setBalance("Error");
    }
    try {
      setToken(listTokenState.currentListTokens.data.find(token => token.rpcUrls === networkState.currentListTokens.data)?.symbol as string);
    } catch {}
  }, [networkState.currentListTokens.data]);

  return (
    <Page>
      <Grid container columns={{ xs: 100, sm: 100, md: 100, lg: 100, xl: 100 }}>
        <Grid item xs={100} sm={100} md={100} lg={50} xl={60}>
          <OverviewHeaderTopCoin>
            <TabsCustom value={value} onChange={handleChange} aria-label='basic tabs example'>
              <TabTransfer label='Transfer' {...a11yProps(0)} />
              <TabTransfer label='Receive' {...a11yProps(1)} />
            </TabsCustom>
          </OverviewHeaderTopCoin>
        </Grid>
        <Grid item xs={100} sm={100} md={50} lg={50} xl={40}>
          <NetworkContainerFixed>
            <NetworkContainer />
          </NetworkContainerFixed>
        </Grid>
        <Grid container columns={{ xs: 100, sm: 100, md: 100, lg: 100, xl: 100 }}>
          <Grid>
            <ContainerTabs value={value} index={0}>
              <TitlePageContainer>
                <TitlePage>Transfer your Ethereum</TitlePage>
              </TitlePageContainer>
              <SubTitlePage>You need to choose the correct network, address and coin to transfer to another wallet address.</SubTitlePage>
            </ContainerTabs>
          </Grid>
          <Grid item xs={100} sm={100} md={100} lg={50} xl={55}>
            <ContainerTabs value={value} index={0}>
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
            </ContainerTabs>
          </Grid>
          <Grid item xs={100} sm={100} md={100} lg={50} xl={45}>
            <ContainerTabs value={value} index={0}>
              <BackgroundPage>
                <ReceiveTagHeader>Account balance</ReceiveTagHeader>
                <CopyAddressContainer onClick={() => copyAddress(myAddress)}>
                  {sliceAddress(myAddress)} <Copy />
                </CopyAddressContainer>
                <BalanceNumberCard>
                  {balance} {token}
                </BalanceNumberCard>
              </BackgroundPage>
            </ContainerTabs>
          </Grid>
        </Grid>
        <Grid container columns={{ xs: 100, sm: 100, md: 100, lg: 100, xl: 100 }}>
          <Grid item xs={100}>
            <TabPanel value={value} index={1}>
              <TitlePageContainer>
                <TitlePage>Scan QR code</TitlePage>
              </TitlePageContainer>
            </TabPanel>
          </Grid>
          <Grid item xs={100} sm={100} md={100} lg={50} xl={55}>
            <TabPanel value={value} index={1}>
              <SubTitlePage>Use the camera on your device to scan the code, then wait for a confirmation from your old device.</SubTitlePage>
              <BackgroundPage>
                <ContainerFlexSpace>
                  <ReceiveTagHeader>Address</ReceiveTagHeader>
                  <CopyAddressContainer>
                    <Copy /> Copy
                  </CopyAddressContainer>
                </ContainerFlexSpace>
                <AddressContainer>
                  <CustomInput size='small' disabled defaultValue={myAddress} variant='outlined' fullWidth margin='normal' styleTextField='disable' />
                </AddressContainer>
              </BackgroundPage>
            </TabPanel>
          </Grid>
          <Grid item xs={100} sm={100} md={100} lg={50} xl={45}>
            <TabPanel value={value} index={1}>
              <ContainerQRCode>
                <BackgroundPageQR>
                  <QRCode value={myAddress}></QRCode>
                </BackgroundPageQR>
              </ContainerQRCode>
            </TabPanel>
          </Grid>
        </Grid>
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
    </Page>
  );
};
export default Transaction;
const BackgroundPageQR = styled.div`
  background-color: white;
  border: 1px solid #fafafa;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 5px 5px 5px 5px rgba(88, 88, 88, 0.2);
`;
const TransferSuccessTitle = styled.div`
  font-weight: 600;
  font-size: 32px;
  line-height: 40px;
  color: rgba(0, 0, 0, 0.85);
`;
const TransferSuccessSub = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #42526e;
  width: 418px;
  margin-top: 20px;
`;
const AddressContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ContainerQRCode = styled.div`
  margin: 30px 0;
`;
const ReceiveTagHeader = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.neutrals.gray600};
`;
export const SubTitlePage = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.xs + "px"};
  line-height: 24px;

  color: ${({ theme }) => theme.colors.neutrals.gray600};
  ${breakpoint("xs")`
    width: 100%;
`}
  ${breakpoint("sm")`
     margin: 20px 0;
     width: 100%;
  `}
  ${breakpoint("md")`
     margin: 20px 0;
     width: 100%;
  `}
  ${breakpoint("lg")`
     margin: 20px 0;
     width: 60%;
  `}
`;

export const BackgroundPage = styled.div`
  background-color: #fafafa;
  padding: 40px;
  border-radius: 8px;
`;

export const SelectCoin = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  img {
    margin-right: 10px;
  }
`;
const ContainerFlexSpace = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;
export const ContainerTabs = styled(TabPanel)`
  .css-ahj2mt-MuiTypography-root {
    width: 100% !important;
    padding: 0 !important;
  }
`;
const ContainerRight = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  margin-top: 30px;
`;
export const CopyAddressContainer = styled.a`
  cursor: pointer;
  display: flex;
  justify-content: left;
  align-items: center;
  svg {
    margin-left: 5px;
    margin-right: 5px;
  }
`;

const BalanceNumberCard = styled.div`
  font-weight: 600;
  font-size: 32px;
  line-height: 48px;
  margin: 20px 0;
`;
export const TitlePageContainer = styled.div`
  ${breakpoint("xs")`
    display: none;
`}
  ${breakpoint("lg")`
    display: block;
  `}
`;
export const TabsCustom = styled(Tabs)`
  background-color: #f6f6f6 !important;
  border-radius: 8px !important;
  .css-1aquho2-MuiTabs-indicator {
    background-color: #f6f6f6 !important;
  }
  .css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected {
    background-color: ${props => props.theme.colors.white} !important;
  }
  .css-1h9z7r5-MuiButtonBase-root-MuiTab-root {
    min-height: initial !important;
    height: 40px !important;
  }
  ${breakpoint("xs")`
    
      width: 100% ! important;
      display: flex;
      margin-left: 10px ! important;
      margin-right: 10px ! important;
    `}
  ${breakpoint("sm")`
      position: static;
      width: 300px ! important;
      justify-content: center;
      align-items: center;
      transform: none;
      margin: 10px 0;
      z-index: 0;
    `}
`;
export const TabTransfer = styled(Tab)`
  border-radius: 8px !important;
  margin: 5px !important;

  ${breakpoint("xs")`
      width: calc(50% - 10px) !important;
    `}
  ${breakpoint("sm")`
      width: 140px !important;
    `}
`;

export const NetworkContainerFixed = styled.div`
  background-color: ${props => props.theme.colors.white};
  ${breakpoint("xs")`
      margin-top: 24px;
      padding-top: 10px;
      padding-bottom: 10px;
    `}
  ${breakpoint("sm")`
        align-items: center;
        width: max-content;
        margin-left: 10px;
    `}
     ${breakpoint("md")`
        align-items: center;
        margin: auto
        width: max-content;
        margin-left: 44px;
      `}
       ${breakpoint("lg")`
        justify-content: center;
        align-items: center;
        margin-top: 44px;
        width: max-content;
        margin-right: 44px;
        float: right;
        `}
`;

export const SpanRed = styled.span`
  color: #cf2d2d;
`;
export const ContainerTextField = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: left;
`;

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  textAlign: "center",
  alignItems: "center",
};

const ContainerIconSuccess = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
`;
const ContainerTwoButtonModal = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: space-around;
  width: 100%;
  align-items: center;
`;
