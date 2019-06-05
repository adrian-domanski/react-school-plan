import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logIn } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'

export class signIn extends Component {
    state = {
        email: '',
        password: ''
    }

    handleSubmit = e => {
        e.preventDefault();
        new Promise(resolve => {
            resolve(this.props.logIn(this.state))
        })
    }

    getError = () => {
        const elems = document.querySelectorAll('.valid')
        const labels = document.querySelectorAll('label.active')
        const valid_inp = Array.from(elems);
        const valid_lab = Array.from(labels);

        valid_lab.forEach(label => {
            label.style.setProperty('color', 'red', 'important');
        })

        valid_inp.forEach(input => {
            input.style.setProperty('border-bottom', '2px solid red', 'important');
            input.style.setProperty('box-shadow', 'none', 'important');
        })

        return (<p className="alert">Nieprawidłowy login i/lub hasło!</p>)
    }

    handleChange = e => {
        const { id, value } = e.target;
        this.setState({ [id]: value });
    }
    render() {
        const { email, password } = this.state;
        const { authError } = this.props;
        if (this.props.auth.uid) return <Redirect to='/home' />
        return (
            <div className="container marginTop-box">
                <div className="row">
                    <div className="col s12">
                        <div className="card">
                            <div className="card-content">
                                <span className="card-title center">Zaloguj się</span>

                                <form onSubmit={this.handleSubmit}>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input id="email" onChange={this.handleChange} value={email} type="email" className="validate" />
                                            <label htmlFor="email">Email</label>
                                        </div>



                                        <div className="input-field col s12">
                                            <input id="password" onChange={this.handleChange} value={password} type="password" className="validate" />
                                            <label htmlFor="password">Hasło</label>
                                        </div>

                                    </div>
                                    {authError ? (this.getError()) : null}
                                    <button className="waves-effect waves-light btn center" type='submit'>Zaloguj</button>
                                </form>


                            </div>
                        </div>
                        <div className="card-action">
                        </div>
                    </div>
                </div>
                <div id="modal4" className="modal">
                    <div className="modal-content">
                        <h4 className='red-text'>Wypełnij poprawnie wszystkie pola!</h4>
                        <p>Sprawdź poprawność wprowadzonych danych i spróbuj jeszcze raz.</p>
                        {/* <p>{errorList}</p> */}
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="green white-text modal-close waves-effect waves-green btn-flat">OK</a>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logIn: credentials => dispatch(logIn(credentials))
    }
}

const mapStateToProps = state => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(signIn)
