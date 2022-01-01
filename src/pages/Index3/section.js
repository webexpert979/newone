import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import SubscriptionContract from "../../contracts/subscription.json";
import Web3 from "web3"
import swal from "sweetalert";
import generateElement from "../../generateElement";

const subscribeWeekly = async()=> {
		const {ethereum } = window;
   
        if(!ethereum){
          throw new Error("Web3 not found");
        }
   
        const web3 = new Web3(ethereum);
        await ethereum.enable();
        console.log(web3);
   
       const accounts = await web3.eth.getAccounts();
       console.log(accounts)
	   const account = accounts[0]
	   const subscription = new web3.eth.Contract(SubscriptionContract,"0x9A4dbf5F38d9679E4320f7393d7ef6b803a6c152")
	   let planType = "0x7765656b6c790000000000000000000000000000000000000000000000000000";
	   /*let tx = await subscription.methods.createPlan("500000000000000000","604800",planType).send({
            from: accounts[0]
        });
	   console.log(tx);
	   */
	   let preplan = await subscription.methods.plans("0").call();
	   console.log(preplan);
	   const currentSub = await subscription.methods.subscriptions(account,'0').call();
	   const block = await web3.eth.getBlock('latest')
	   const next = parseInt(currentSub.nextPayment);
	   if(currentSub.start==="0"){
		let firstsubscribe = await subscription.methods.subscribe("0","0xa53f701552b6FE94fa40DEd1A0a01b1763ef697F",false).send({
		   from:account,
		   gasLimit:3000000,
		   value:500000000000000000
		});
		console.log(firstsubscribe);
	   }
	   else if(block.timestamp>next) {
	    let paysubscribe = await subscription.methods.pay(account,"0xa53f701552b6FE94fa40DEd1A0a01b1763ef697F","0").send({
		   from:account,
		   gasLimit:3000000,
		   value:500000000000000000
		});
	   }
	   else {
		swal({
        content: generateElement(`You are already subscribed to this plan`),
        icon: "success",
		});
	   }
	}
const subscribeMonthly = async()=> {
		const {ethereum } = window;
   
        if(!ethereum){
          throw new Error("Web3 not found");
        }
   
        const web3 = new Web3(ethereum);
        await ethereum.enable();
        console.log(web3);
   
       const accounts = await web3.eth.getAccounts();
       console.log(accounts)
	   const account = accounts[0]
	   const subscription = new web3.eth.Contract(SubscriptionContract,"0x9A4dbf5F38d9679E4320f7393d7ef6b803a6c152")
	   let planType = "0x6d6f6e74686c7900000000000000000000000000000000000000000000000000";
	   /*let tx = await subscription.methods.createPlan("500000000000000000","604800",planType).send({
            from: accounts[0]
        });
	   console.log(tx);
	   */
	   let preplan = await subscription.methods.plans("2").call();
	   console.log(preplan);
	   const currentSub = await subscription.methods.subscriptions(account,'2').call();
	   const block = await web3.eth.getBlock('latest')
	   const next = parseInt(currentSub.nextPayment);
	   if(currentSub.start==="0"){
		let firstsubscribe = await subscription.methods.subscribe("2","0xa53f701552b6FE94fa40DEd1A0a01b1763ef697F",false).send({
		   from:account,
		   gasLimit:3000000,
		   value:1000000000000000000
		});
		console.log(firstsubscribe);
	   }
	   else if(block.timestamp>next) {
	    let paysubscribe = await subscription.methods.pay(account,"0xa53f701552b6FE94fa40DEd1A0a01b1763ef697F","2").send({
		   from:account,
		   gasLimit:3000000,
		   value:1000000000000000000
		});
	   }
	   else {
		swal({
        content: generateElement(`You are already subscribed to this plan`),
        icon: "success",
		});
	   }
	}
const subscribeLifetime = async()=> {
		const {ethereum } = window;
   
        if(!ethereum){
          throw new Error("Web3 not found");
        }
   
        const web3 = new Web3(ethereum);
        await ethereum.enable();
        console.log(web3);
   
       const accounts = await web3.eth.getAccounts();
       console.log(accounts)
	   const account = accounts[0]
	   const subscription = new web3.eth.Contract(SubscriptionContract,"0x9A4dbf5F38d9679E4320f7393d7ef6b803a6c152")
	   let planType = "0x6d6f6e74686c7900000000000000000000000000000000000000000000000000";
	   /*let tx = await subscription.methods.createPlan("500000000000000000","604800",planType).send({
            from: accounts[0]
        });
	   console.log(tx);
	   */
	   let preplan = await subscription.methods.plans("7").call();
	   console.log(preplan);
	   const currentSub = await subscription.methods.subscriptions(account,'3').call();
	   const block = await web3.eth.getBlock('latest')
	   const next = parseInt(currentSub.nextPayment);
	   if(currentSub.start==="0" || currentSub.lifetime===false){
		let firstsubscribe = await subscription.methods.subscribe("3","0xa53f701552b6FE94fa40DEd1A0a01b1763ef697F",true).send({
		   from:account,
		   gasLimit:3000000,
		   value:1500000000000000000
		});
		console.log(firstsubscribe);
	   }
	   else {
		swal({
        content: generateElement(`You are already subscribed to this plan`),
        icon: "success",
		});
	   }
	}
class Section extends Component {
	
  render() {
    return (
      <React.Fragment>
        <section className="section bg-home height-80vh" id="home">
          <div className="bg-overlay"></div>
          <div className="display-table">
            <div className="display-table-cell">
              <Container>
                <Row>
                  <Col
                    lg={{ size: 8, offset: 2 }}
                    className="text-white text-center"
                  >
                    <div>
                      <div>
                        <h4
                          className="home-small-title"
                          style={{ paddingTop: "60px" }}
                        >
                          SENDCOIN.APP
                        </h4>
                        <h1 className="home-title">We Support All Networks</h1>
                        <p className="padding-t-15 home-desc mx-auto">
                          <span>Binance TestNet </span>
                          <span>| Binance MainNet</span>
                        </p>
                        <p className="play-shadow margin-t-30 margin-l-r-auto"></p>
																									<div  id="subscriptions">
																	<h4>Subscriptions</h4>
																	<button onClick={subscribeWeekly}  id="weekly">Weekly 0.5 BNB</button>  |  <button onClick={subscribeMonthly}  id="monthly">Monthly 1 BNB</button>  |  <button onClick={subscribeLifetime}  id="lifetime">Lifetime 1.5 BNB</button>
																	</div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Section;
