pragma solidity ^0.8.6;
// SPDX-License-Identifier: MIT OR Apache-2.0

contract Payment {
  uint public nextPlanId;
  struct Plan {
    address merchant;
    uint amount;
    uint frequency;
  }
  struct Subscription {
    address subscriber;
    uint start;
    uint nextPayment;
  }
  mapping(uint => Plan) public plans;
  mapping(address => mapping(uint => Subscription)) public subscriptions;

  event PlanCreated(
    address merchant,
    uint planId,
    uint date
  );
  event SubscriptionCreated(
    address subscriber,
    uint planId,
    uint date
  );
  event SubscriptionCancelled(
    address subscriber,
    uint planId,
    uint date
  );
  event PaymentSent(
    address from,
    address to,
    uint amount,
    uint planId,
    uint date
  );

  function createPlan(uint amount, uint frequency) external {
    require(amount > 0, 'amount needs to be > 0');
    require(frequency > 0, 'frequency needs to be > 0');
    plans[nextPlanId] = Plan(
      msg.sender,
      amount, 
      frequency
    );
    nextPlanId++;
  }

  function subscribe(uint planId, address payer) public payable {
    Plan storage plan = plans[planId];
    require(plan.merchant != address(0), 'this plan does not exist');

    payable(payer).transfer(plan.amount);  
    emit PaymentSent(
      msg.sender, 
      plan.merchant, 
      plan.amount, 
      planId, 
      block.timestamp
    );

    subscriptions[msg.sender][planId] = Subscription(
      msg.sender, 
      block.timestamp, 
      block.timestamp + plan.frequency
    );
    emit SubscriptionCreated(msg.sender, planId, block.timestamp);
  }

  function cancel(uint planId) external {
    Subscription storage subscription = subscriptions[msg.sender][planId];
    require(
      subscription.subscriber != address(0), 
      'this subscription does not exist'
    );
    delete subscriptions[msg.sender][planId]; 
    emit SubscriptionCancelled(msg.sender, planId, block.timestamp);
  }

  function pay(address subscriber,address payer, uint planId) public payable {
    Subscription storage subscription = subscriptions[subscriber][planId];
    Plan storage plan = plans[planId];
    require(
      subscription.subscriber != address(0), 
      'this subscription does not exist'
    );
    require(
      block.timestamp > subscription.nextPayment,
      'not due yet'
    );

    payable(payer).transfer(plan.amount);  
    emit PaymentSent(
      subscriber,
      plan.merchant, 
      plan.amount, 
      planId, 
      block.timestamp
    );
    subscription.nextPayment = subscription.nextPayment + plan.frequency;
  }
}