import React from 'react'
import $ from 'jquery'

class Fb extends React.Component {

    componentDidMount() {
        $('.op').animate({
            opacity: 1
        }, 2000)
    }
    render() {
        return (

            <div id="right" className='op'>
                <a href='#!' className="handle ui-slideouttab-handle-rounded">Facebook</a>
                <div className="fb-page" data-href="https://www.facebook.com/zsesrem/" data-tabs="timeline" data-width="400"
                    data-height="500" data-small-header="true" data-adapt-container-width="true" data-hide-cover="false"
                    data-show-facepile="true">
                </div>
            </div>


        )
    }
}

export default Fb
