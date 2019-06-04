import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
class PurchasePage extends React.Component{
    render(){
        const {account} = this.props;
        return(
            <div className = "Bigcontainer">
		
                <div className="row">
                    <div className="col-md-4 col-5">
                        <img className="prologo" src="/assets/image/logo.png"></img>
                    </div>
                    <div className="col-md-5 col-1">
                        
                    </div>
                    <div className="col-md-3 userMark col-6">
                        {account !== undefined && <p className="userName">{account.firstname} {account.lastname} </p>}
                        <img className="prouser" src="/assets/image/profileicon.png"></img>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { account: state.account.account};
  }
  
export default withRouter(connect(mapStateToProps)(PurchasePage));
  