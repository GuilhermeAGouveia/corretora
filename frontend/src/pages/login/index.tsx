import {useRouter} from "next/router";
import {useState} from "react";
import {useForm} from "react-hook-form";
import BannerInfo, {useBannerInfo} from "../../components/BannerInfo";
import Input from "../../components/InputReactHookForm";
import LogoComponent from "../../components/Logo";
import SlideBanner from "../../components/SlideBanner";
import {useAuth} from "../../context/Auth";
import {getRandomImageByImovelType} from "../../lib/imagem";
import {AlertType, ImovelType} from "../../lib/interfaces";
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
    const {control: controlBannerInfo, setMessage} = useBannerInfo();

    const [loading, setLoading] = useState(false);
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

    const preValidate = (data: any) => {
        if (!data.email || !data.password) {
            setMessage("Preencha todos os campos", AlertType.ERROR);
            return false;
        }

        if (data.password.length < 6) {
            setMessage("A senha deve ter no mínimo 6 caracteres", AlertType.WARNING);
            return false;
        }

        return true;
    }

    const onSubmit = async (data: any) => {
        if (preValidate(data)) {
            setLoading(true);
            try {
                await login(data);
                router.push("/lista");
            } catch (error: any) {
                console.log(error);
                if (error.toJSON().status === 400) {
                    setMessage("As credenciais estão incorretas", AlertType.ERROR);
                } else {
                    setMessage("Ocorreu um erro ao fazer login", AlertType.ERROR);
                }
            }
            setLoading(false);
        }
    };

    return (
        <LoginContainer>
            <BannerInfo control={controlBannerInfo} />
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
