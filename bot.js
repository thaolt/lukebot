// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
const moment = require('moment');

const { ActivityTypes } = require('botbuilder');

// Turn counter property
const TURN_COUNTER_PROPERTY = 'turnCounterProperty';

class MyBot {
  /**
   *
   * @param {ConversationState} conversation state object
   */
  constructor(conversationState) {
    // Creates a new state accessor property.
    // See https://aka.ms/about-bot-state-accessors to learn more about the bot state and state accessors.
    this.countProperty = conversationState.createProperty(TURN_COUNTER_PROPERTY);
    this.conversationState = conversationState;
  }
  /**
   *
   * @param {TurnContext} on turn context object.
   */
  async onTurn(turnContext) {
    // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
    if (turnContext.activity.type === ActivityTypes.Message) {
      // read from state.
      // let count = await this.countProperty.get(turnContext);
      // count = count === undefined ? 1 : ++count;
      let command = turnContext.activity.text.toLowerCase();
      command = command.replace(/^lukechatbot/, '');
      command = command.trim();
      let message = "";
      if (command == "tet") {
        const remain_days = - moment().diff( '2019-02-05', 'days');
        message = `Còn có ${remain_days} ngày nữa là tới tết à. Cứ từ từ.`;

        await turnContext.sendActivity(message);
      }
      if (command == "noel" || command == "christmas") {
        const remain_days = - moment().diff( '2018-12-24', 'days');
        message = `Còn ${remain_days} ngày nữa là đến Noel rồi. Bạn dã có người yêu chưa. Khẩn trương lên.`;

        await turnContext.sendActivity(message);
      }
      if (command == "valentin") {
        const remain_days = - moment().diff( '2019-02-14', 'days');
        message = `Còn ${remain_days} ngày nữa là đến Valentin rồi. Mình vẫn cô đơn. kaka.`;

        await turnContext.sendActivity(message);
      }
      // increment and set turn counter.
      // await this.countProperty.set(turnContext, count);
    } else {
      // await turnContext.sendActivity(`[${turnContext.activity.type} event detected]`);
    }
    // Save state changes
    await this.conversationState.saveChanges(turnContext);
  }
}

module.exports.MyBot = MyBot;