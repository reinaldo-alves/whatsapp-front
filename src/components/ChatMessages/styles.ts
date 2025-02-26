import styled from 'styled-components';

export const ButtonsContainer = styled.div`
    display: flex;
    position: relative;
`;

export const OptionsContainer = styled.div`
    display: flex;
    gap: 20px;
    position: relative;
    padding: 10px;
`;

export const OptionsButton = styled.img<{menu?: boolean}>`
    height: 25px;
    cursor: pointer;
    z-index: 5;
    display: ${({ menu }) => menu ? 'none' : 'flex'};
    margin-right: ${({ menu }) => menu ? '10px' : '0'};

    @media (max-width: 700px) {
      display: flex;
    }
`;

export const Dropdown = styled.nav<{ dropdown: boolean }>`
    position: absolute;
    top: 40px;
    left: -275px;
    background-color: #fff;
    opacity: ${({ dropdown }) => dropdown ? '1' : '0'};
    visibility: ${({ dropdown }) => dropdown ? 'visible' : 'hidden'};
    width: 300px;
    box-sizing: border-box;
    border-radius: 8px;
    box-shadow: 0 1px 3px 0;
    border: none;
    display: flex;
    flex-direction: column;
    z-index: 6;

    ul {
        margin: 0;
        padding: 10px;

        li {
            text-decoration: none;
            list-style: none;
        }

    }

`;

export const Overlay = styled.div<{ dropdown: boolean }>`
    display: ${({ dropdown }) => dropdown ? 'block' : 'none'};
    background-color: transparent;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 4;
`;

export const DropdownTitle = styled.h3`
    color: #25D366;
    font-size: 16px;
    text-align: center;
    margin: 0 0 10px 0;
`;

export const MenuItem = styled.div<{online: boolean}>`
    width: 100%;
    min-height: 40px;
    cursor: pointer;
    padding: 2px 15px;
    box-sizing: border-box;
    display: flex;
    align-items: center;

    img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        filter: grayscale(${({ online }) => online ? '0' : '1'});
    }

    span {
        font-weight: 400;
        margin-left: 20px;
        font-size: 16px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: ${({ online }) => online ? '#000' : '#888'};
        font-style: ${({ online }) => online ? 'normal' : 'italic'};
    }

    :hover {
        background-color: #F0F2F5;
    }
`;





export const GroupLabel = styled.span`
    font-size: 16px;
    text-align: center;
    margin: 10px 0 5px 0;
    `;

export const GroupInput = styled.input`
    width: 250px;
    background-color: #fff;
    height: 25px;
    border: 1px solid;
    outline: none;
    border-radius: 8px;
    box-sizing: border-box;
    padding: 4px 10px;
    font-size: 16px;
    text-align: center;
    `;

export const GroupButton = styled.button`
    background-color: #25D366;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    border-radius: 8px;
    border: none;
    margin-top: 10px;
    height: 25px;
    width: 120px;
    cursor: pointer;

    :active {
        color: #25D366;
        background-color: #fff;
    }
`;

export const ImageProfile = styled.img`
  width: 60px;
  min-width: 60px;
  height: 60px;
  border-radius: 50%;
`;

export const HeaderContainer = styled.div`
  width: 100%;
  height: 80px;
  background-color: #F0F2F5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 10px;
`;

export const InfoChatContainer = styled.div`
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  align-items: center;
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

export const GroupMembers = styled.span`
  color: #808080;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ChatMessagesArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 5px 0;
  max-height: 100%;
  overflow-y: auto;
`;

export const ChatInputArea = styled.div`
  width: 100%;
  height: 70px;
  background-color: #F0F2F5;
  box-sizing: border-box;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;

  input {
    width: 90%;
    background-color: #fff;
    height: 45px;
    border: none;
    outline: none;
    border-radius: 8px;
    box-sizing: border-box;
    padding: 4px 10px;
    font-size: 16px;
  }

  img {
    width: 40px;
    height: auto;
    cursor: pointer;
  }
`;

export const MessagesPosition = styled.div<{system: boolean, myMessage: boolean}>`
  width: 100%;
  display: flex;
  box-sizing: border-box;
  padding: 0 20px;
  margin: 2px 0;
  justify-content: ${({ system, myMessage }) => system ? 'center': myMessage ? 'right' : 'left'};

  ::before {
    content: "";
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-top: ${({ system, myMessage }) => myMessage || system ? 'none' : '10px solid #FFF'};
  }
  
  ::after {
    content: "";
    width: 0;
    height: 0;
    border-right: 10px solid transparent;
    border-top: ${({ myMessage }) => myMessage? '10px solid #D9FDD3' : 'none'};
  }
`;

export const MessageBaloon = styled.div<{system: boolean, myMessage: boolean}>`
  background-color: ${({ system, myMessage }) => system ? '#DFDFDF': myMessage ? '#D9FDD3' : '#FFF'};
  padding: ${({ system }) => system ? '5px 10px': '10px'};
  border-radius: ${({ system, myMessage }) => system ? '5px': myMessage ? '8px 0 8px 8px' : '0 8px 8px 8px'};
  max-width: 80%;
`;

export const MessageContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto;
  column-gap: 20px;
`;

export const MessageName = styled.span<{color: string}>`
  font-size: 14px;
  font-weight: bold;
  grid-area: 1 / 1 / 2 / 3;
  color: ${({ color }) => color };
`;

export const MessageMessage = styled.span`
  font-size: 16px;
  grid-area: 2 / 1 / 3 / 2;
  overflow: hidden;
`;

export const MessageHour = styled.span`
  font-size: 11px;
  color: #808080;
  grid-area: 2 / 2 / 3 / 3;
  align-self: flex-end;
  justify-self: flex-end;
`;

export const VideoContainer = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  height: 100%;
  align-items: center;

  div {
    width: 100%;
    max-width: 500px;

    video {
      width: 100%;
      border-radius: 2px;
      border: 1px solid #ccc;
      background-color: #ddd;
    }

    span {
      font-weight: bold;
      font-size: 20px;
    }

  }

  @media screen and (max-width: 1024px) {
    flex-direction: column;
    justify-content: center;
  }
`;