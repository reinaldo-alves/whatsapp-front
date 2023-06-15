import styled from "styled-components";

export const ChatItemContainer = styled.div<{fixed: boolean, counter: number, active: boolean}>`
  box-sizing: border-box;
  padding: 10px;
  border-bottom: 1px solid #F0F2F5;
  display: grid;
  align-items: center;
  cursor: pointer;
  grid-template-columns: auto 1fr ${({ fixed }) => fixed ? 'auto' : '0'} ${({ counter }) => counter ? 'auto' : '0'};
  background-color: ${({ active }) => active ? '#dddddd' : 'transparent'};
  border: 5px solid #fff;
`;

export const ImageProfile = styled.img`
  width: 60px;
  min-width: 60px;
  height: 60px;
  border-radius: 50%;
`;

export const TitleChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
`;

export const TitleChat = styled.span`
  font-size: 18px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const LastMessage = styled.span`
  color: #808080;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const NoReadCounter = styled.div<{counter: number}>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: red;
  justify-self: flex-end;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: ${({ counter }) => !counter ? 'hidden' : 'visible' };

  span {
    font-size: 12px;
    font-weight: bold;
    color: #fff;
  }
`;

export const FixedIcon = styled.img<{fixed: boolean}>`
  display: ${({ fixed }) => fixed ? 'flex' : 'none' };
  width: 20px;
  height: 20px;
  align-self: center;
  margin-right: ${({ fixed }) => fixed ? '5px' : '0' };
`;