import { HomeContainer, HomeLogo, HomeText, HomeTitle } from "./styles"
import Logo from '../../assets/logozap.png'

function HomePage() {

  return(
    <HomeContainer>
      <HomeTitle>Bem-vindo ao Whatsapp Web</HomeTitle>
      <HomeLogo src={Logo} />
      <HomeText>Para começar, selecione um chat ao lado, inicie uma conversa com outro usuário ou crie um novo grupo</HomeText>
    </HomeContainer>
  )
}

export default HomePage