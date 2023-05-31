import styled from "styled-components";
import { breakpoint } from "../../utils";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
export const ChangeNetworkTag = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: #42526e;
  margin-bottom: 20px;
`;
export const ChangeNetworkTagSub = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #42526e;
  width: 318px;
  height: 48px;
  margin-bottom: 30px;
`;
export const FormControlCustom = styled(FormControl)`
  background-color: #4a5568;
  ${breakpoint("xs")`
       width: 50% !important;

      `}
  ${breakpoint("sm")`
       width: 250px !important;
    `}
  border-radius: 8px !important;
  height: 40px !important;
  margin-left: 10px !important;
  box-sizing: border-box;
`;

export const SelectCustom = styled(Select)`
  height: 40px !important;
  border-radius: 8px;
  color: #fff !important;
  font-family: "Inter" !important;
  font-style: normal !important;
  font-weight: 600 !important;
  font-size: 14px !important;
  line-height: 24px !important;
  &:hover {
    border-radius: 8px !important;
  }
  box-sizing: border-box;
  border-radius: 8px !important;
  .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input {
    border-radius: 8px !important;
  }
`;
export const Container = styled.div`
  ${breakpoint("xs")`
      margin: 10px 10px
      `}
  ${breakpoint("sm")`
       margin: 44px 35px;
    `}
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const MenuItemCustom = styled(MenuItem)`
  height: 50px;
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
export const TagNetwork = styled.div`
  text-align: center;
  padding: 8px 16px;
  border: solid 1px #d9d9d9;
  color: #42526e;
  gap: 8px;
  background-color: #f1f1f1;
  border-radius: 32px;
  ${breakpoint("xs")`
       width: auto !important;
    `}
  ${breakpoint("md")`
        width: 270px !important;
  `}
`;
