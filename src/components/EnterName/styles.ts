import styled from 'styled-components';

export const LoginContainer = styled.div<{active: boolean}>`
    width: 95%;
    max-width: 1800px;
    height: 95%;
    background-color: #fff;
    position: absolute;
    display: ${({ active }) => active ? 'flex' : 'none'};
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;

    @media (max-width: 700px) {
        width: 100%;
    }
`;

export const LoginLogo = styled.img`
    height: 200px;

    @media (max-width: 430px) {
        height: 150px;
    }
`;

export const LoginMessage = styled.span`
    font-size: 32px;
    font-weight: bold;
    color: #25D366;
    margin-bottom: 50px;
    text-align: center;
`;

export const LoginLabel = styled.span`
    color: #25D366;
    font-size: 22px;
    text-align: center;
`;

export const LoginInput = styled.input<{width?: string}>`
    width: ${({ width }) => width ? width : '400px'};
    background-color: #fff;
    height: 45px;
    border: 1px solid #25D366;
    outline: none;
    border-radius: 8px;
    box-sizing: border-box;
    padding: 4px 10px;
    font-size: 16px;
    text-align: center;

    @media (max-width: 430px) {
        width: 300px;
    }
`;

export const PasswordContainer = styled.div`
    display: flex;
    gap: 20px;

    @media (max-width: 500px) {
        flex-direction: column;
    }
`;

export const LoginButton = styled.button<{width?: string}>`
    background-color: #25D366;
    color: #fff;
    font-size: 20px;
    border-radius: 8px;
    border: none;
    height: 30px;
    width: ${({ width }) => width ? width : '80px'};
    cursor: pointer;

    :active {
        color: #25D366;
        background-color: #fff;
    }
`;

export const TextAddUser = styled.span`
    margin-top: 15px;
    font-size: 16px;
    color: #25D366;

    span {
        text-decoration: underline;
        
        :hover {
            cursor: pointer;
            color: green;
        }
    }
`;