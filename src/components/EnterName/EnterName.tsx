import './styles.css'
import Logo from '../../assets/whatsappweb.png'

interface IProps {
    name: string,
    avatar: string,
    changename: (e: React.ChangeEvent<HTMLInputElement>) => void,
    changeavatar: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handle: () => void
}

function EnterName(props: IProps) {
    return(
        <div className="container">
            <div className="back-ground"></div>
            <div className="login-container">
                <img className="login-logo" src={Logo} alt="" />
                <span className="login-message">Bem-vindo!</span>
                <span className="login-label">Digite seu nome</span>
                <input className="login-input" value={props.name} onChange={props.changename} />
                <span className="login-label">Insira o link de uma imagem para seu perfil</span>
                <input className="login-input" value={props.avatar} onChange={props.changeavatar} />
                <button className="login-button" onClick={props.handle}>Entrar</button>
            </div>
        </div>
    )
}

export default EnterName