import styled from "styled-components";
import { breakpoint } from "../../utils";

export const ContainerButtonModalFilter = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: right;
`;

export const ModalSubtitle = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
`;
export const ModalTo = styled.div`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;
export const ContainerFilter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  ${breakpoint("xs")`
    display: none;
`}
  ${breakpoint("md")`
     display: flex;
  `}
`;
export const ContainerDataTable = styled.div`
  ${breakpoint("xs")`
    margin: 10px 10px;
  `}
  ${breakpoint("lg")`
    margin: 10px 44px;
  `}
`;

export const TilePageContainer = styled.div`
  ${breakpoint("xs")`
    margin: 0px 10px;
`}
  ${breakpoint("lg")`
    margin: 22px 44px;
  `}
  position: static;
  justify-content: center;
  align-items: center;
`;
export const ContainerItemEmpty = styled.div`
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
export const ContainerFilterButton = styled.div`
  margin: 20px 10px;
  ${breakpoint("xs")`
    display: block;
  `}
  ${breakpoint("md")`
     display: none;
  `}
`;
export const ContainerTextFieldTime = styled.div`
  margin: 10px 10px;
  display: flex;
  flex-direction: column;
  justify-content: left !important;
  align-items: left !important;
  text-align: left !important;
  width: 30%;
  .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root {
    color: rgb(113, 128, 150) !important;
  }
`;

export const ContainerTextFieldTimeCustom = styled.div`
  margin: 10px 10px;
  display: flex;
  flex-direction: column;
  justify-content: left !important;
  align-items: left !important;
  text-align: left !important;
  width: 40%;
  .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root {
    color: rgb(113, 128, 150) !important;
  }
`;
export const ContainerTextFieldMethod = styled.div`
  margin: 10px 10px;
  display: flex;
  flex-direction: column;
  justify-content: left;
  width: 20%;
  .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root {
    color: rgb(113, 128, 150) !important;
  }
`;
export const ContainerTextFieldNetwork = styled.div`
  margin: 10px 10px;
  display: flex;
  flex-direction: column;
  justify-content: left;
  width: 30%;
  .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root {
    color: rgb(113, 128, 150) !important;
  }
`;
export const ContainerTextFieldStatus = styled.div`
  margin: 10px 10px;
  display: flex;
  flex-direction: column;
  justify-content: left;
  width: 20%;
  .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root {
    color: rgb(113, 128, 150) !important;
  }
`;
export const ContainerTextFieldId = styled.div`
  margin: 10px 10px;
  display: flex;
  flex-direction: column;
  justify-content: left;
  width: 35%;
  .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root {
    color: rgb(113, 128, 150) !important;
  }
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

export const styleMobile = {
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
  textAlign: "left",
  alignItems: "left",
};
