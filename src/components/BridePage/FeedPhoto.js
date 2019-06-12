import React from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router';
import { portfolioService } from '../../_services';
  
class FeedPhoto extends React.Component{
    
    constructor(props) {
        super(props)
        this.state = {
            hover: false
        }
        this.toggleHover = this.toggleHover.bind(this);
        this.likeChange = this.likeChange.bind(this);
        this.loveChange = this.loveChange.bind(this);
        this.onDetail = this.onDetail.bind(this);
    }
    componentDidMount(){
        this.setState({lol:this.props.info.lol})
    }
    likeChange(state) {
        this.setState({lol: state});
        portfolioService.changeLOL({uniq_id:this.props.info.uniq_id, lol:state})
        
    }
    loveChange(state) {
        this.setState({lol: state});
        portfolioService.changeLOL({uniq_id:this.props.info.uniq_id, lol:state})
    }
    toggleHover() {
        this.setState({hover: !this.state.hover});
    }
    onDetail() {
        this.props.history.push({
            pathname:'/bride/detail_page',
            state: {lolstate:this.props.info.lol, info:this.props.info, is_gift:0}
        });
    }
    render(){
        const lol = this.state.lol
        return(
                <Card className="product-list" onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
                    <img src={this.props.info.product_imageurl[0]} style={{width:'100%'}}></img>
                    {this.state.hover &&
                    <div className="product-opac">
                        <p>{this.props.info.product_name}</p>
                        <p>{this.props.info.price}</p>
                    </div>
                    }

                    {!this.state.hover && (lol === 1 ? <img className="product-like" src="/assets/image/ULike.png"></img>
                    :(lol === 2 && <img className="product-love" src="/assets/image/Love.png"></img>))}

                    {this.state.hover && (lol === 1 ? <img className="product-like" src="/assets/image/ULike.png" onClick ={() => this.likeChange(0)}></img>
                                                                :<img className="product-like" src="/assets/image/Like.png" onClick ={() => this.likeChange(1)}></img>)}
                    {this.state.hover && (lol === 2 ? <img className="product-love" src="/assets/image/Love.png" onClick ={() => this.loveChange(0)}></img>
                                                                :<img className="product-love" src="/assets/image/ULove.png" onClick ={() => this.loveChange(2)}></img>)}
                    {this.state.hover && <Button className = "details" color="secondary" onClick = {this.onDetail}>
                        DETAILS > > >
                    </Button>}
                </Card>
        )
    }
}

export default withRouter(FeedPhoto);