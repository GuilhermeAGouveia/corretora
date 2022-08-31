import {useRouter} from "next/router";
import {useState} from "react";
import {useForm} from "react-hook-form";
import BannerInfo from "../../components/BannerInfo";
import Input from "../../components/Input";
import LogoComponent from "../../components/Logo";
import SlideBanner from "../../components/SlideBanner";
import {useAuth} from "../../context/Auth";
import {getRandomImageByImovelType} from "../../lib/imagem";
import {ImovelType} from "../../lib/interfaces";
import {
    DivisionLine,
    LoginContainer,
    LoginContainerTitle,
    LoginForm,
    LoginFormButton,
    LoginLeft,
    LoginLeftContent,
    LoginRight,
    LogoCompany,
    SignInGoogleButton,
    SignUpButton
} from "../../styles/pages/login";

export default function Login() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [sucess, setSucess] = useState("");
    const [loading, setLoading] = useState(false);
    const [warning, setWarning] = useState("");
    const {control, handleSubmit} = useForm();
    const {login} = useAuth();

    const contentHorizontalCards = [
        {
            text: "O que você procura?",
        },
        {
            text: "Casa?",
            image: getRandomImageByImovelType(ImovelType.CASA),
        },
        {
            text: "Apto?",
            image: getRandomImageByImovelType(ImovelType.APTO),
        },
        {
            text: "Comércio?",
            image: getRandomImageByImovelType(ImovelType.COMERCIO),
        },
        {
            text: "Temos tudo!",
        },
    ];

    const setErrorOrSucess = (state: "sucess" | "error" | "reset") => {
        switch (state) {
            case "sucess":
                setSucess("Login efetuado com sucesso!");
                setError("");
                break;
            case "error":
                setError("Usuário ou senha inválidos!");
                setSucess("");
                break;
            case "reset":
                setError("");
                setSucess("");
                setWarning("");
                break;
            default:
                break;
        }
    };

    const validate = (data: any) => {
        if (!data.email || !data.password) {
            setErrorOrSucess("error");
            return false;
        }

        if (data.password.length < 6) {
            setWarning("A senha deve ter no mínimo 6 caracteres");
            return false;
        }

        return true;
    }

    const onSubmit = async (data: any) => {
        if (!validate(data)) return;

        setLoading(true);
        try {
            await login(data);
            router.push("/lista");
        } catch (error) {
            console.log(error);
            setErrorOrSucess("error");
        }
        setLoading(false);
        const timeout = setTimeout(() => {
            setErrorOrSucess("reset");
        }, 3100);
        return () => clearTimeout(timeout);
    };

    return (
        <LoginContainer>
            {!!error && (
                <BannerInfo type={"error"}>{error}</BannerInfo>
            )}
            {!!sucess && <BannerInfo type={"success"}>{sucess}</BannerInfo>}
            {!!warning && <BannerInfo type={"warning"}>{warning}</BannerInfo>}
            <LoginLeft>
                <LogoCompany>
                    <LogoComponent/>
                </LogoCompany>
                <LoginLeftContent>
                    <LoginContainerTitle>
                        <h1>Login</h1>
                        <p>Alugue ou compre os melhores imóveis pelos melhores preços</p>
                    </LoginContainerTitle>
                    <SignInGoogleButton type="button">
                        Sign in with Google
                    </SignInGoogleButton>
                    <DivisionLine>
                        <p>or Sign with Email</p>
                    </DivisionLine>
                    <LoginForm onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            type="email"
                            placeholder="Email"
                            name="email"
                            control={control}
                        ></Input>

                        <Input
                            type="password"
                            placeholder="Password"
                            control={control}
                            name="password"
                        ></Input>

                        <LoginFormButton type="submit">
                            {loading ? "Carregando..." : "Entrar"}
                        </LoginFormButton>
                    </LoginForm>
                    <DivisionLine>
                        <p>Novo aqui? {"\t"}</p>
                        <SignUpButton
                            type="button"
                            onClick={() => router.push("/register")}
                        >
                            Cadastrar
                        </SignUpButton>
                    </DivisionLine>
                </LoginLeftContent>
            </LoginLeft>
            <LoginRight>
                <SlideBanner style={{
                    height: "300px",
                    width: "calc(100% - 50px)",
                }} contentCards={contentHorizontalCards}/>
            </LoginRight>
        </LoginContainer>
    );
}
