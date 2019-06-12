import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button'
import {portfolioService} from '../../_services';
import BHeader from '../BHeader'

class DetailPage extends React.Component {
  constructor(props)
  {
    super(props)
    this.state = {
      index_img: 0
    }
    this.leftChange = this
      .leftChange
      .bind(this);
    this.rightChange = this
      .rightChange
      .bind(this);
    this.addGift = this
      .addGift
      .bind(this);
  }
  leftChange() {
    var ind = this.state.index_img;
    if (ind == 0) 
      ind = this.props.location.state.info.product_imageurl.length;
    ind--;
    this.setState({index_img: ind})
  }
  rightChange() {
    var ind = this.state.index_img;
    if (ind == this.props.location.state.info.product_imageurl.length - 1) 
      ind = -1;
    ind++;
    this.setState({index_img: ind})
  }
  addGift() {
    portfolioService
      .addGift({uniq_id: this.props.location.state.info.uniq_id})
      .then((response) => {
		console.log("ADD GIFT RESPONSE:", response);
		this.props.history.push('/portfolio');
      })
  }

  render() {
    const {lolstate, info, is_gift} = this.props.location.state;
    const {account} = this.props;
    const {index_img} = this.state;
    return (
      <div className="Bigcontainer">
        <BHeader/>
        <div className="row my-5">
          <div
            className="col-md-1 col-12"
            style={{
            display: 'flex'
          }}>
            <img
              src='/assets/image/leftArrow.png'
              className='detail-arrow'
              onClick={this.leftChange}></img>
          </div>
          <Card
            className="col-md-7 col-12"
            style={{
            display: 'flex'
          }}>
            <img src={info.product_imageurl[index_img]} className="detail-product1"></img>
            {lolstate === 1
              ? <img className="product-like" src="/assets/image/ULike.png"></img>
              : (lolstate === 2 && <img className="product-love" src="/assets/image/Love.png"></img>)}
            {!is_gift
              ? <Button className="pink-button" onClick={this.addGift}>Add Gift</Button>
              : ''}
          </Card>
          <div
            className="col-md-1 col-12"
            style={{
            display: 'flex'
          }}>
            <img
              src='/assets/image/rightArrow.png'
              className='detail-arrow'
              onClick={this.rightChange}></img>
          </div>
          <div className="col-md-3 col-12 product-container">
            <p className="product-brand">{info.brand_name}</p>
            <p className="product-name">{info.product_name}</p>
            <p className="product-price">{info.price}</p>
            <p className="product-color">Color</p>
            <div className="classFlex">
              <div className="product-thumb1">
                <img className="product-thumb" src={info.color_thumbnail}></img>
              </div>
            </div>
            <p className="product-size2">Size</p>
            <div className="classFlex product-size1">
              {info
                .available_size
                .map(i => {
                  return <p className="product-size">{i}</p>
                })
}</div>
            {/* color_thumbnail */}
            <p className="product-description">Description</p>
            <p>{info.description}</p>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {account: state.account.account};
}

export default withRouter(connect(mapStateToProps)(DetailPage));
