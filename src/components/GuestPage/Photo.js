import React from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import {withRouter} from 'react-router';

class Photo extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      hover: false,
    }
    this.toggleHover = this.toggleHover.bind(this)
    this.onDetail = this.onDetail.bind(this)
  }
  toggleHover() {
    this.setState({
      hover: !this.state.hover
    });
  }
  onDetail() {
    this
      .props
      .history
      .push({
        pathname: '/guest_detail',
        state: {
          lolstate: this.props.info.lol,
          info: this.props.info
        }
      });
  }
  render() {
    const lol = this.props.info.lol;
    return (
      <Card
        className="product-list"
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover}>
        <img
          src={this.props.info.product_imageurl[0]}
          style={{
          width: '100%'
        }}></img>
        {this.state.hover && <div className="product-opac">
          <p>{this.props.info.product_name}</p>
          <p>{this.props.info.price}</p>
        </div>
}

        {lol === 2 && <img className="product-love" src="/assets/image/Love.png"></img>}
        {lol === 1 && <img className="product-like" src="/assets/image/ULike.png"></img>}
        {this.state.hover && <Button className="details" color="secondary" onClick={this.onDetail}>
          DETAILS > > >
        </Button>}
      </Card>
    )
  }
}

export default withRouter(Photo);