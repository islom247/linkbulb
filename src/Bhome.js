import React, {Component} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {shorten} from "./store/actions/linkActions";
import "./styles.css";

class Bhome extends Component {
    state = {
        url: "",
        custom: null,
        expire: ""
    };
    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.shorten(this.state);
    };

    render() {
        const {authError, regError, SKEY} = this.props;
        console.log("skey is:", SKEY);
        if (!SKEY) {
            return <Redirect to="/login"/>
        }
        return (
            <div className="container url-input">
                <form onSubmit={this.handleSubmit} className="form" autoComplete="off">
                    <div className="center">
                        <input
                            type="url"
                            id="url"
                            className="url"
                            onChange={this.handleChange}
                            placeholder="Enter your link"
                            required
                        />
                    </div>
                    <div className="center">
                        <p className="custom-message teal-text text-darken-3">
                            Optionally you can choose your custom short link ending:
                        </p>
                    </div>
                    <div className="center custom-url">
                        <input
                            type="text"
                            className="custom"
                            id="custom"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="center">
                        <p className="custom-message teal-text text-darken-3">
                            Choose short link expiration date:
                        </p>
                        <input type="date" id="expire" name="expire" className="center expire"
                               onChange={this.handleChange}/>
                    </div>
                    <div className="center shorten-button">
                        <button className="btn yellow darken-3 z-depth-3">Shorten</button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        SKEY: state.auth.SKEY
    }
}
const mapDispatchToProps = dispatch => {
    return {
        shorten: link => dispatch(shorten(link))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Bhome);
