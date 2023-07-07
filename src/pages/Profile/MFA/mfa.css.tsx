import styled from "styled-components";
import { breakpoint } from "../../../utils";

export const ContainerDeviceModal = styled.div`
  width: 100%;
`;
export const ListDevicesContainer = styled.div`
  ${breakpoint("xs")`
    margin-left: 10px;
`}
  ${breakpoint("lg")`
    margin-left: 44px;
  `}
`;
export const ContainerButtonFactors = styled.div`
  width: max-content;
  float: right;
`;

export const ContainerHeaderFactors = styled.div``;
export const ContainerNumberFactors = styled.div`
  padding: 12px 28px;
  gap: 10px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  background-color: #f0f0f1;
`;

export const style = {
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

export const EnableMFAContainer = styled.div`
  width: 100%;
  .title {
    flex: 1;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
