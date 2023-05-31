import { Devices } from "../../configs/data/test";
import { Computer } from "../../assets/icon";
import { TextBlue } from "../Overview/overview.css";
import CustomTextInput from "../../components/TextField";
import CustomButton from "../../components/Button";
import { useState } from "react";
import React from "react";
import {
  ContainerButton,
  ContainerMultipleFactors,
  HeaderText,
  SubHeaderText,
  NameText,
  IdText,
  IpText,
  TextHeaderCard,
  ContainerBackgroundCard,
  ContainerDevice,
  ContainerText,
  GroupLeftItemDevice,
} from "./multipleFactors.css";
const MultipleFactors = () => {
  const [typeButton, setTypeButton] = useState(false);
  const [seed, setSeed] = useState("");
  const [checkSeed, setCheckSeed] = useState(true);
  const handleValidatorAmount = (value: string = seed) => {
    const words = value.split(" ");
    if (words.length !== 24) {
      return "Must be 24 characters long";
    }
    return "";
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
        {Devices.map(device => (
          <ContainerDevice key={device.id}>
            <GroupLeftItemDevice>
              <Computer />
              <ContainerText>
                <NameText> {device.name}</NameText>
                <IpText>IP: {device.ip}</IpText>
              </ContainerText>
            </GroupLeftItemDevice>
            <IdText>Reference ID: {device.id}</IdText>
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
          <CustomButton width='30%' padding='10px' text='Confirm' styleButton={typeButton ? "primary" : "inactive"}></CustomButton>
        </ContainerButton>
      </ContainerBackgroundCard>
    </ContainerMultipleFactors>
  );
};

export default MultipleFactors;
