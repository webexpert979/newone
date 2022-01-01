import React, { Component } from 'react';
import Index3 from "./Index3/Index3";
import MultiSenderContract from "../contracts/MultiSender.json";
import SubscriptionContract from "../contracts/subscription.json";
import Web3 from "web3"
import swal from "sweetalert";
import generateElement from "../generateElement";

export default class Metamask extends Component {

    constructor(props){
        super(props);

        this.state = {
            web3: null,
            accounts: null, 
            MultiSender: null, 
			subscription:null,
            loaded:false,
			subscribed:false,
            walletConnected: false,
            netId:null
        }
    }

    handleConnectWallet = async () => {
      
        const {ethereum } = window;
   
        if(!ethereum){
          throw new Error("Web3 not found");
        }
   
        const web3 = new Web3(ethereum);
        await ethereum.enable();
        console.log(web3);
   
        const netId=await web3.eth.net.getId();
        console.log(netId);
        this.setState({netId})
   
       const accounts = await web3.eth.getAccounts();
       console.log(accounts)
	   const account = accounts[0]
       const MultiSender = new web3.eth.Contract(MultiSenderContract,"0x81F27c341e1F0AC06EE7Fbab99963AA478783C29")
	   const subscription = new web3.eth.Contract(SubscriptionContract,"0x9A4dbf5F38d9679E4320f7393d7ef6b803a6c152")
       console.log(MultiSender)
	   let subscribed=false;
	   let currentSub;
	   let block;
	   let next;
	   let i=0;
	   
	   
	   for(i=0;i<8;i++){
		currentSub = await subscription.methods.subscriptions(account,i).call();
	    block = await web3.eth.getBlock('latest')
	    next = parseInt(currentSub.nextPayment);
	   
		if(block.timestamp<next) {
			subscribed = true;
			console.log(currentSub);
			break;
		}
		else if(currentSub.lifetime===true) {
		   subscribed = true;
		   console.log(currentSub);
		   break;
		}
	   }
	   //console.log(currentSub);
        if(this.state.netId===97 && subscribed===true){
         this.setState({web3,accounts, MultiSender,subscription,subscribed, loaded:true, walletConnected:true, vipAddress:true });
        }
        else{
          swal({
			content: generateElement(`Please connect to BSC testnet and subscribe to a plan first.`),
			icon: "error",
			});
        }
       }

    render() {
        if (!this.state.loaded  ) {
       
         return(
           
           <Index3 
             walletConnected={this.state.walletConnected} 
             handleConnectWallet = {this.handleConnectWallet}
             
           />
           
           
         )
       }
       else{
         return (
           <React.Fragment>
             <Index3 
               account = {this.state.accounts[0]} 
               multiSender = {this.state.MultiSender} 
               web3 = {this.state.web3} 
               walletConnected = {this.state.walletConnected}
               handleConnectWallet = {this.handleConnectWallet}
              
               
               />
               
         </React.Fragment>
       );
    }}
}
