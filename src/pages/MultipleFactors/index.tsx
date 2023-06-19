import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Computer } from "@app/assets/icon";
import { Button as CustomButton, TextField as CustomTextInput } from "@app/components";
import { TextBlue } from "../Overview/overview.css";

import {
  ContainerButton,
  ContainerMultipleFactors,
  HeaderText,
  SubHeaderText,
  NameText,
  IpText,
  TextHeaderCard,
  ContainerBackgroundCard,
  ContainerDevice,
  ContainerText,
  GroupLeftItemDevice,
} from "./multipleFactors.css";
import { useCustomSnackBar, useFetchWallet, usePushNotifications } from "@app/hooks";
import { InfoMasterKey, ShareInfo } from "@app/wallet/metadata";
import { useSessionStorage } from "usehooks-ts";
import { KeyPair } from "@app/wallet/types";
const MultipleFactors = () => {
  const { handleNotification } = useCustomSnackBar();
  const { token } = usePushNotifications();

  const [infoMasterKey] = useSessionStorage<InfoMasterKey | null>("info-master-key", null);
  const [deviceKey, setDeviceKey] = useSessionStorage<KeyPair | null>("device-key", null);
  const [networkKey, setNetworkKey] = useSessionStorage<KeyPair | null>("network-key", null);
  const navigate = useNavigate();
  const { getInfoWalletByNetworkKey, fetchMasterKeyWithPhrase, insertTokenFCM, fetchMasterKeyWithDevice } = useFetchWallet();

  const [deviceShares, setDeviceShares] = useState<ShareInfo[]>([]);
  const [typeButton, setTypeButton] = useState(false);
  const [seed, setSeed] = useState("");
  const [checkSeed, setCheckSeed] = useState(true);
  const [loadingLogin, setLoadingLogin] = useState(false);

  useEffect(() => {
    if (infoMasterKey) {
      const devices = infoMasterKey.shares?.filter(elm => elm.type === "device");
      setDeviceShares(devices || []);
    }
  }, [infoMasterKey]);

  const intervalGetByDevice = async () => {
    if (deviceKey) {
      const data = await getInfoWalletByNetworkKey(networkKey as KeyPair);
      if (data.error) return;
      const { error } = await fetchMasterKeyWithDevice(data.info!);
      if (error) return;
      navigate("/overview");
    }
  };
  useEffect(() => {
    // Interval each 5s for check public confirmed
    const intervalId = setInterval(() => {
      intervalGetByDevice();
    }, 1000 * 5); // in milliseconds
    return () => clearInterval(intervalId);
  }, [deviceKey]);

  const handleValidatorAmount = (value: string = seed) => {
    const words = value.split(" ");
    if (words.length !== 24) {
      return "Must be 24 characters long";
    }
    return "";
  };
  const handleLogin = async () => {
    if (!seed) {
      return;
    }
    setLoadingLogin(true);
    const { error } = await fetchMasterKeyWithPhrase(seed.trim());
    if (error) {
      setLoadingLogin(false);
      handleNotification(error, "error");
      return;
    }
    if (!infoMasterKey) {
      handleNotification("Please initial master key before", "error");
      return;
    }
    // Handle insert token FCM to database by master public key
    insertTokenFCM(token, infoMasterKey);
    getInfoWalletByNetworkKey(networkKey as KeyPair);
    setLoadingLogin(false);
    navigate("/overview");
  };

  return (
    <ContainerMultipleFactors>
      <HeaderText>Verify your login</HeaderText>
      <SubHeaderText>Verify with one of the following to access your account</SubHeaderText>
      <ContainerBackgroundCard>
        <TextHeaderCard>Device (s)</TextHeaderCard>
        <SubHeaderText>
          Login to <strong>allaccess.one</strong> from any of the following devices to complete the security verification.
        </SubHeaderText>
        {deviceShares.map(device => (
          <ContainerDevice key={device.publicKey}>
            <GroupLeftItemDevice>
              <Computer />
              <ContainerText>
                <NameText> {`${device.deviceInfo?.name} ${device.deviceInfo?.version}`}</NameText>
                <IpText>IP: {device.deviceInfo?.ipv4}</IpText>
              </ContainerText>
            </GroupLeftItemDevice>
            {/* <IdText>Reference ID: {device.id}</IdText> */}
          </ContainerDevice>
        ))}
      </ContainerBackgroundCard>
      <ContainerBackgroundCard>
        <TextHeaderCard>Backup Passphrase</TextHeaderCard>
        <SubHeaderText>Make sure you have your 24 words recovery phrase, then click below to begin the recovery process.</SubHeaderText>
        <TextBlue>Passphrase (24 words)</TextBlue>
        <CustomTextInput
          error={!checkSeed}
          onChange={newValue => {
            setSeed(newValue.target.value);
            handleValidatorAmount(newValue.target.value) ? setCheckSeed(false) : setCheckSeed(true);
            setTypeButton(handleValidatorAmount(newValue.target.value) ? false : true);
          }}
          fullWidth
          size='small'
          styleTextField='default'
          placeholder='correct horse batterry ...'
          helperText={!checkSeed ? handleValidatorAmount() : ""}
        ></CustomTextInput>
        <ContainerButton>
          <CustomButton
            width='30%'
            padding='10px'
            mRight='10px'
            text='Cancel'
            styleButton='inactive'
            onClick={() => {
              setDeviceKey(null);
              setNetworkKey(null);
              navigate("/");
            }}
          ></CustomButton>
          <CustomButton width='30%' padding='10px' text='Confirm' styleButton={typeButton ? "primary" : "inactive"} onClick={handleLogin} loading={loadingLogin} disabled={loadingLogin}></CustomButton>
        </ContainerButton>
      </ContainerBackgroundCard>
    </ContainerMultipleFactors>
  );
};

export default MultipleFactors;
