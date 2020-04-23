import React, {Component} from "react";

class History extends Component {
    render() {
        return (
            <div className="center-align">
                <table className="centered striped">
                    <caption>Your link usage history</caption>
                    <thead>
                    <tr>
                        <th>Link</th>
                        <th>Short link</th>
                        <th>Created at</th>
                        <th>Expiration date</th>
                        <th>Accessed times</th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr>
                        <td>AlvinAlvinAlvinAlvinAlvinAlvinAlvinAlvAlvinlvinAlvin</td>
                        <td>Eclair</td>
                        <td>$0.87</td>
                        <td>$0.87</td>
                        <td>$0.87</td>
                    </tr>
                    <tr>
                        <td>Alan</td>
                        <td>Jellybean</td>
                        <td>$3.76</td>
                        <td>$3.76</td>
                        <td>$3.76</td>
                    </tr>
                    <tr>
                        <td>Jonathan</td>
                        <td>Lollipop</td>
                        <td>$7.00</td>
                        <td>$7.00</td>
                        <td>$7.00</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default History;
