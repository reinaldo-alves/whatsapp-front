import { HomeContainer, HomeLogo, HomeText, HomeTitle } from "./styles"
import Logo from '../../assets/logozap.png'
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../contexts/UserContext"

function HomePage() {
  const { showMenu, setShowMenu } = useContext(UserContext)
  const [isBiggerThan700, setIsBiggerThan700] = useState(window.innerWidth <= 700)

  useEffect(() => {
    window.addEventListener('resize', () => setIsBiggerThan700(window.innerWidth <= 700))
    return () => {
      window.removeEventListener('resize', () => setIsBiggerThan700(window.innerWidth <= 700))
    }
  }, [])

  return(
    <HomeContainer>
      <HomeTitle>Bem-vindo ao Whatsapp Web</HomeTitle>
      <HomeLogo src={Logo} />
      {isBiggerThan700 ?
        <HomeText>Para começar, acesse o <a onClick={() => setShowMenu(!showMenu)}>menu</a> para selecionar um chat, iniciar uma nova conversa ou criar um grupo</HomeText>
        :
        <HomeText>Para começar, selecione um chat ao lado, inicie uma conversa com outro usuário ou crie um novo grupo</HomeText>}
    </HomeContainer>
  )
}

export default HomePage