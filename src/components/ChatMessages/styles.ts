import styled from 'styled-components';

export const ButtonsContainer = styled.div`
    display: flex;
    position: relative;
`;

export const OptionsButton = styled.img`
    height: 25px;
    cursor: pointer;
    z-index: 5;
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

export const MenuItem = styled.div`
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
    }

    span {
        font-weight: 400;
        margin-left: 20px;
        font-size: 16px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
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