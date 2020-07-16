import styled from 'styled-components'
import { v } from 'src/utils'

interface Itop {
  top: string
}

export const ViewLoadingWrapper = styled.div`
  width: 100%;  
  height: ${v(800)};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: ${v(24)};
  color: #666;
  p {
    margin: ${v(20)} 0;
  }
`

export const LoadingWrapper = styled.div`
  position: fixed;
  left: 50%;
  top: ${(props: Itop) => props.top};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transform: translate3d(-50%, -50%, 0);
  z-index: 1;
  .content {
    margin: ${v(20)} 0;
    font-size: ${v(28)};
    color: #cccccc;
  }
  .button {
    width: ${v(220)};
    padding: ${v(18)} 0;
    font-size: ${v(24)};
    color: #fff;
    background-color: #2172ed;
    border: none;
    border-radius: ${v(6)};
    &:active {
      opacity: .8;
    }
  }
`