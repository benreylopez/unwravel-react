import React from 'react';
import Card from '@material-ui/core/Card';
import Link from 'react-dom';

class Photo extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            hover: false,
            lol: this.props.lolstate
        }
        this.toggleHover = this.toggleHover.bind(this);
        this.likeChange = this.likeChange.bind(this);
        this.loveChange = this.loveChange.bind(this);
        this.toPurchase = this.toPurchase.bind(this);
    }
    likeChange(state) {
        if(state === 0)
            this.setState({lol: 0});
        if(state === 1)
            this.setState({lol: 1});
    }
    loveChange(state) {
        if(state === 0)
            this.setState({lol: 0});
        if(state === 2)
            this.setState({lol: 2});
    }
    toggleHover() {
        this.setState({hover: !this.state.hover});
    }
    toPurchase() {
        console.log("HAHAHAHAHAHA");
    }
    render(){
        return(
                <Card className="product-list" onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} onClick={this.toPurchase}>
                    <img src={this.props.info.product_imageurl[0]} style={{width:'100%'}}></img>
                    {this.state.hover &&
                    <div className="product-opac">
                        <p>{this.props.info.product_name}</p>
                        <p>{this.props.info.price}</p>
                    </div>
                    }

                    {!this.state.hover && (this.state.lol === 1 ? <img className="product-like" src="/assets/image/Like.png"></img>
                    :(this.state.lol === 2 && <img className="product-love" src="/assets/image/Love.png"></img>))}

                    {this.state.hover && (this.state.lol === 1 ? <img className="product-like" src="/assets/image/ULike.png" onClick={() => this.likeChange(0)}></img>
                                                                :<img className="product-like" src="/assets/image/Like.png" onClick={() => this.likeChange(1)}></img>)}
                    {this.state.hover && (this.state.lol === 2 ? <img className="product-love" src="/assets/image/Love.png" onClick={() => this.loveChange(0)}></img>
                                                                :<img className="product-love" src="/assets/image/ULove.png" onClick={() => this.loveChange(2)}></img>)}

                </Card>
        )
    }
}

export default Photo;