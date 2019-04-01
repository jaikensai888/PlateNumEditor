//用法：
// const strategy = [
//   {
//     regex: RegRule.vehicle,
//     style: {color:'rgba(95, 184, 138, 1.0)}
//   }
// ];
//EditorState.createEmpty(CreateDecorator("span", preStrategy)),
import { CompositeDecorator } from "draft-js";
import React from "react";

function findWithRegex(regex, contentBlock, callback) {
  const text = contentBlock.getText();
  let matchArr, start;
  let reg = new RegExp(regex, "gim");
  while ((matchArr = reg.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
    console.log("after CallBack",matchArr[0]);
  }
}

export function CreateDecorator(domType, strategy) {
  const option = [];
  strategy.forEach(element => {
    option.push({
      strategy: (contentBlock, callback) => {
        findWithRegex(element.regex, contentBlock, callback);
      },
      component: props => {
        console.log("render Component", props.decoratedText);
        return React.createElement(
          domType,
          { style: element.style },
          props.children
        );
      }
    });
  });
  return new CompositeDecorator(option);
}
