import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button'
import SHeader from '../Header/SHeader'
import Footer from '../Footer'
class DetailPage extends React.Component {
  constructor(props)
  {
    super(props)
    this.state = {
	  index_img: 0,
	  clicked:0
    }
    this.leftChange = this
      .leftChange
      .bind(this);
    this.rightChange = this
      .rightChange
      .bind(this);
    this.buyProduct = this
      .buyProduct
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
  buyProduct() {
    window.open(this.props.location.state.info.pageurl)
  }
  onClick(index){
	  this.setState({clicked:index, index_img:index})
  }

  onBack(){
    this.props.history.go(-1);
  }
  render() {
    const {lolstate, info} = this.props.location.state;
    const {index_img} = this.state;
    return (
      <div>
        <SHeader/>
        <div className="Bigcontainer">
          <div className="row" style={{marginTop: '3rem'}}>
            <div className="col-md-1 col-3">
              {info
                .product_imageurl
                .map((i, index) => (index === this.state.clicked)
                  ? <label className="label-active">
                      <img className='detail-img' src={i}/>
                    </label>
                  : <label
                    className="label-inactive"
                    onClick={this
                    .onClick
                    .bind(this, index)}>
                    <img className='detail-img' src={i}/>
                  </label>)}
            </div>

            <Card
              className="col-md-7 col-9"
              style={{
              display: 'flex',marginBottom:'40px'
            }}>
              <img src={info.product_imageurl[index_img]} className="detail-product1"></img>
              {lolstate === 1
                ? <img className="product-like" src="/assets/image/ULike.png"></img>
                : (lolstate === 2 && <img className="product-love" src="/assets/image/Love.png"></img>)}
              <Button className="pink-button" onClick={this.buyProduct}>Buy</Button>

            </Card>
            <div className="col-md-3 col-12 product-container">
            <img style={{marginBottom:'30px',marginLeft:'-10px',cursor:'pointer'}} src="/assets/image/back1.png" onClick={this.onBack.bind(this)}></img>
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
              <p className="product-description">Description</p>
              <p>{info.description}</p>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {account: state.account.account};
}

export default withRouter(connect(mapStateToProps)(DetailPage));
