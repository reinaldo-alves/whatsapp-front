import styled from "styled-components";

export const ChatItemContainer = styled.div`
  box-sizing: border-box;
  padding: 10px;
  border-bottom: 1px solid #F0F2F5;
  display: flex;
  align-items: center;
  cursor: pointer;
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