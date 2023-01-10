import styled from "@emotion/styled";

const InputStyle = styled.div`
  display: flex;
  row-gap: 15px;
  flex-direction: column;
  margin-bottom: 30px;
  width: 100%;
  > label {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 5px;
    gap: 15px;
  }
  > input {
    background-color: #4d4e56;
    border: none;
    border-radius: 25px;
    color: white;
    padding: 12px 20px;
  }
`;

export const InputColorStyle = styled.span`
  align-items: center;
  display: flex;
  column-gap: 15px;
  margin-bottom: 15px;
  width: 100%;
  > label {
    font-weight: bold;
  }
  > span {
    border: solid 5px white;
    border-radius: 50px;
    max-height: 25px;
    max-width: 25px;
    overflow: hidden;
    padding: 10px;
    input {
      min-height: 50px;
      transform: scale(2);
      border: none;
    }
  }
`;

export default InputStyle;