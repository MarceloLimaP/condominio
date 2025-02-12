import { useState } from "react";
import styles from './Condominio.module.css'
import { Link, useNavigate } from "react-router-dom";

export default function SignupForm () {

    const [submit, setSubmit] = useState({
    email: '',
    password: '',
    passwordConfirmation: '',
    condominios: []
})

const [showPass, setShowPass] = useState(false)
const [showPass2, setShowPass2] = useState(false)
const [render, setRender] = useState(false)
const [check, setCheck] = useState(false)
// const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        if (!emailError(submit.email) && !passError(submit.password) && !passConfirm(submit.password, submit.passwordConfirmation)) {
            fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(submit)
            }).then(res => {
                console.log(res.status)
                if (res.status == 400) {
                    setCheck(true)
                }
                if (res.status == 201) {
                    setCheck(false)
                    
                    setTimeout(() => {
                        // navigate("/login")
                    }, 2424);   
                }
                return res.json()
            })
            .then(data => console.log(data))
            .catch(error => console.log(error))
            
            console.log(submit)
        }
        else {
            setRender(true)
        }
    }

    function validateEmail(email) {
        const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return EMAIL_REGEX.test(email)
    }

    function checkPasswordStrength(password) {
        if (password.length < 8) return 0;
        const regexes = [
            /[a-z]/,
            /[A-Z]/,
            /[0-9]/,
            /[~!@#$%^&*)(+=._-]/
        ]
        return regexes
            .map(re => re.test(password))
            .reduce((score, t) => t ? score + 1 : score, 0)
    }

    function emailError(email) {
    if (email.length == 0) {
        return (<div className={styles.error}>
            <span>Por favor introduza o seu endereço de email.</span>
        </div>)
    }
    else if (!validateEmail(email)) {
        return (<div className={styles.error}>
            <span>Por favor introduza um endereço de email válido.</span>
        </div>
        )
    }
}

    function passError(pass) {
        if (pass.length == 0) {
            return (
            <div className={styles.error}>
                <span>Por favor introduza a sua password.</span>
            </div>)
        }
        else if (pass.length < 8) {
            return (
            <div className={styles.error}>
                <span>A sua password deve ter no mínimo 8 caracteres.</span>
            </div>)
        }
        else if (checkPasswordStrength(pass) < 4) {
            return (
            <div className={styles.error}>
                <span>A sua password deve ter pelo menos um número, uma mínuscula, uma maiúscula e um símbolo.</span>
            </div>)
        }
    }

    function passConfirm(pass1, pass2) {
        if (pass2.length == 0) {
            return (
                <div className={styles.error}>
                    <span>Por favor introduza novamente a sua password.</span>
                </div>)
        }
        else if (pass1 != pass2) {
            return (
                <div className={styles.error}>
                    <span>As passwords não coincidem.</span>
                </div>)
        }
    }

    return (
        <div>
            <form className={styles.form} method="get" onSubmit={(e) => handleSubmit(e)}>
                <div className={styles.main}>
                    {/* <img src={thirsty} className={styles.logo} alt="thirsty" /> */}
                    <h1 className={styles.title}>Registar</h1>
                    <div className={styles.field}>
                        <label className={styles.section}>Email</label><br></br>
                        <input className={styles.input} placeholder="someone@example.com" type="text" onChange={(e) => setSubmit((t) => { return { ...t, email: e.target.value.toLowerCase() } })}/>
                        {render ? emailError(submit.email) : <div className={styles.error}>󠀡󠀡</div>}{check ? <div className={styles.error}>Este email já se encontra registado.</div> : <div className={styles.error}>󠀡󠀡</div>}
                    </div>
                    <div className={styles.field}>
                        <label className={styles.section}>Password</label><br></br>
                        <input className={styles.input} placeholder="A1b2C3d$" type={showPass ? "text" : "password"} onChange={(e) => setSubmit((t) => { return { ...t, password: e.target.value } })}/> <button type="button" className={styles.pwbutton} onClick={() => setShowPass((e) => !e)}>{!showPass ? <span className="material-icons">visibility</span> : <span className="material-icons">visibility_off</span>}<span className={styles.strength}>{checkPasswordStrength(submit.password)}</span></button>
                        {render ? passError(submit.password) : <div className={styles.error}>󠀡󠀡</div>}
                    </div>
                    <div className={styles.field}>
                        <label className={styles.section}>Confirmar Password</label><br></br>
                        <input className={styles.input} placeholder="A1b2C3d$" type={showPass2 ? "text" : "password"} onChange={(e) => setSubmit((t) => { return { ...t, passwordConfirmation: e.target.value } })}/> <button type="button" className={styles.pwbutton} onClick={() => setShowPass2((e) => !e)}>{!showPass2 ? <span className="material-icons">visibility</span> : <span className="material-icons">visibility_off</span>}</button>
                        {render ? passConfirm(submit.password, submit.passwordConfirmation) : <div className={styles.error}>󠀡󠀡</div>}
                    </div>
                    <div>
                        <button type="submit" className={styles.submit}>Registar</button>
                        <div className={styles.sub}>Já tem conta? <Link to="/" className={styles.nodecor}>Clique aqui</Link>!</div>
                    </div>
                </div>
            </form>
        </div>
    )
}