import styled from "styled-components";
import { breakpoint } from "../../utils";
import Modal from "@mui/material/Modal";
import { TableCell } from "@mui/material";
import { PropsInOut } from "./type";
export const TitleModal = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  color: black;
  margin-right: 10px;
`;
export const ContainerInfoTransactions = styled.div`
  width: 100%;
  margin-top: 40px;
  color: ${props => props.theme.colors.black};
`;

export const HeaderModalInfoTransaction = styled.div`
  display: flex;
  justify-content: space-between !important;
  width: 100%;
  margin-bottom: 20px;
`;
export const HeaderModalGroupLeft = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalCustom = styled(Modal)`
  .igUPum {
    display: flex;
    -webkit-box-pack: justify !important;
    justify-content: space-between;
    width: 100% !important;
  }
`;
export const CustomMethod = styled.div`
  text-align: center;
  padding: 5px 5px;
  border: solid 1px #cfd6dd;
  color: #272e35;
  border-radius: 8px;
  ${breakpoint("xs")`
       width: auto !important;
    `}
  ${breakpoint("md")`
        width: 100px !important;
  `}
`;
export const TableCellCustomInOut = styled.div<PropsInOut>`
  background-color: ${props => {
    if (props.text === "In") {
      return "rgb(29, 233, 182, 0.25)";
    } else {
      return "rgb(247, 206, 57, 0.25)";
    }
  }};
  border-radius: 8px;
  margin: 5px 5px;
  padding: 5px 5px;
  width: 50px;
  color: ${props => {
    if (props.text === "In") {
      return "#1DE9B6";
    } else {
      return "#F7CE39";
    }
  }};
  border: ${props => {
    if (props.text === "In") {
      return "solid 1px #1DE9B6";
    } else {
      return "solid 1px #F7CE39";
    }
  }};
  text-align: center;
`;

export const TableCellCustom = styled(TableCell)`
  ${breakpoint("xs")`
      display: none !important;
    `}
  ${breakpoint("md")`
      display: table-cell !important;
  `}
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
