import styled from 'styled-components';

export const LoginContainer = styled.div`
    width: 95%;
    max-width: 1800px;
    height: 95%;
    background-color: #fff;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
`;

export const LoginLogo = styled.img`
    height: 200px;
`;

export const LoginMessage = styled.span`
    font-size: 32px;
    font-weight: bold;
    color: #25D366;
    margin-bottom: 50px;
`;

export const LoginLabel = styled.span`
    color: #25D366;
    font-size: 22px;
`;

export const LoginInput = styled.input`
    width: 400px;
    background-color: #fff;
    height: 45px;
    border: 1px solid #25D366;
    outline: none;
    border-radius: 8px;
    box-sizing: border-box;
    padding: 4px 10px;
    font-size: 16px;
    text-align: center;
`;

export const LoginButton = styled.button`
    background-color: #25D366;
    color: #fff;
    font-size: 20px;
    border-radius: 8px;
    border: none;
    height: 30px;
    width: 80px;
    cursor: pointer;

    :active {
        color: #25D366;
        background-color: #fff;
    }
`;