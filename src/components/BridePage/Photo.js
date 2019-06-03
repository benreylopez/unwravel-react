import React from 'react';

class Photo extends React.Component{
    render(){
        return(
            <div className="product-list">
                <img src={this.props.photoUrl} style={{width:'100%'}}></img>
            </div>
        )
    }
}

export default Photo;