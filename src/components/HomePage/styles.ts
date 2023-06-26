import styled from 'styled-components';

export const HomeContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    box-sizing: border-box;
    padding: 20px;
`;

export const HomeTitle = styled.span`
    font-size: 32px;
    text-align: center;
    font-weight: bold;
    color: #25D366;
`;

export const HomeText = styled.span`
    width: 60%;
    min-width: 100px;
    font-size: 20px;
    text-align: center;

    a {
        cursor: pointer;
        color: blue;
        text-decoration: underline;
    }
`;

export const HomeLogo = styled.img`
    height: 300px;

    @media (max-width: 400px) {
        height: 200px;
    }
`;
