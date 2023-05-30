import React from "react";
import styled from "styled-components";
// import base from "../../styles/theme/base";
// import { createBreakpoint } from "styled-components-breakpoint";
import { sliceAddress, copyAddress } from "../../utils";
import { Move } from "../../assets/icon";
//const breakpoint = createBreakpoint(base.breakpoints);

type Props = {
  text1: string;
  text2: string;
};
const OldAddress = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 6px 10px;
  gap: 10px;
  width: 130px;
  position: absolute;
  height: 36px;
  top: 0;
  margin-top: 50px;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffeeef;
  border-radius: 8px;
  color: #fc6168;
`;

const NewAddress = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 6px 10px;
  gap: 10px;
  width: 130px;
  position: absolute;
  height: 36px;
  top: 0;
  margin-top: 86px;
  left: 57%;
  transform: translate(-50%, -50%);
  background: #c5f6e2;
  border-radius: 8px;
  color: #0d6b58;
`;
const MoveContainer = styled.div`
  position: absolute;
  top: 0;
  margin-top: 86px;
  left: 45%;
  transform: translate(-50%, -50%);
  z-index: 9;
`;
const ContainerDiv = styled.div`
  position: relative;
  height: 150px;
  width: 100%;
`;
const TagChangeNetwork: React.FC<Props> = (props: Props) => {
  return (
    <ContainerDiv>
      <OldAddress>{sliceAddress(props.text1)}</OldAddress>
      <MoveContainer>
        <Move />
      </MoveContainer>
      <NewAddress>{sliceAddress(props.text2)}</NewAddress>
    </ContainerDiv>
  );
};

export default TagChangeNetwork;
