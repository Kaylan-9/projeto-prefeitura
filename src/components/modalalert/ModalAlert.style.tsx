import styled from '@emotion/styled';

const ModalAlertStyle = styled.main`
  min-height: 100vh;
  width: 100%;
  position: absolute;
  animation: modalScreen 3s;
  div.float {
    align-items: center;
    padding: 15px;
    background-color: ${(props: any) => props.color ? props.color : "white"};
    border-radius: 15px;
    left: 10%;
    top: -50%;
    transform: translateY(-50%);
    min-width: 600px;
    position: absolute;
    z-index: 5;
    animation: modalMove 3s;
    box-sizing: border-box;
    display: inline-flex;
    gap: 20px;
    @keyframes modalMove {
      0% {top: -50%;}
      5% {top: 15%;}
      95% {top: 15%;}
      100% {top: -50%;}
    }
    > div.icon {
      width: 10%;
      > svg {
        font-size: 25px;
      }
    }
    > p {
      font-size: 21px;
      font-weight: bold
    }
  }
`;

export default ModalAlertStyle;
