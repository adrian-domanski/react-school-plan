import React, { Component } from 'react'
import { initStyle } from '../../store/actions/initStyle'
import { NavLink } from 'react-router-dom'
import M from "materialize-css";

export class SignedOutLinks extends Component {
    componentDidMount() {
        let sideNav = initStyle('nav');
        // Mobile menu close after click link
        const links = Array.from(document.querySelectorAll('li'));
        links.forEach(link => {
            sideNav = initStyle('nav');
            if (link.firstChild.id !== 'sort_item') {
                link.addEventListener('click', () => {
                    sideNav = initStyle('nav');
                    sideNav.forEach(item => item.close());
                })
            }
        })
    }

    closeSide = (type)=>{
        if(type==='mobile') {
        let sideNavs = document.querySelectorAll('.sidenav');
        let inst_side = M.Sidenav.init(sideNavs);
        inst_side[0].close();
        }
    }

    render() {
        const { option, handleChange,type } = this.props;
        let classes = '';
        let sort_mobile = ''
        if(type ==='desktop') sort_mobile = 'sort_desktop';
        if(type ==='mobile') classes = 'sidenav-close';
        return (
            <React.Fragment>
                <li className={classes}><NavLink to='/home'>Strona Główna</NavLink> </li>
                <li><div id="sort_item" className={sort_mobile}>
                    <div className="input-field sort">
                        <select value={option} onChange={(e)=> {handleChange(e); this.closeSide(type)}}>
                            <option value="all_groups" disabled={true}>Sortuj zadania</option>
                            <option value="i">Informatycy</option>
                            <option value="e">Ekonomiści</option>
                            <option value="all_groups">Wszyscy</option>
                        </select>
                    </div>
                </div>
                </li>
                <li className={classes}><NavLink to='/zaloguj'>Zaloguj się</NavLink></li>
            </React.Fragment>
        )
    }
}

export default SignedOutLinks
