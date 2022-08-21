/* 

⦁ Handle the case when the secret key is a shorter string than the message, If the key is “b” and the message is “abcde”, the expected result is still “bcdef”. If the key is “aab” and the message is “abcde” the expected result is “abdde”.

Example: https://imgur.com/a/c7qXIzd

Dupa cum spune in descrierea problemei, exemplul dat in imaginea de pe imgur este gresit pt partea in care secretul este mai mic decat mesajul, adica encriptarea n-ar trebui sa fie pt tot mesajul ci doar pt lungimea mesajului egal cu lungimea secretului. 

*/

import { characters } from "./characters.js";

const spaces = [];

function spaceIntegration(messageString, spaces) {
  const messageArray = messageString.split("");
  spaces.forEach((spaceIndex, index) => {
    messageArray.splice(spaceIndex, 0, " ");
  });
  return messageArray.join("");
}

function cypher(message, secretKey, encryption = true) {
  const secretKeyArray = secretKey.split("");
  const messageArray = message.split("");
  const cypherMessage = [...message];

  if (encryption === true) {
    messageArray.forEach((char, index) => {
      if (/\s/.test(char)) {
        spaces.push(index);
      }
    });
  } else;

  function encryptOrDecrypt(message, secretChar, index, encrypt = true) {
    if (encryption) {
      const sumOfIndexes =
        (characters.indexOf(message[index]) +
          characters.indexOf(secretKey[index])) %
        characters.length;

      const encryptedIndexFromList = characters.indexOf(
        characters[sumOfIndexes]
      );

      cypherMessage[index] = characters[encryptedIndexFromList];
    } else {
      const decryptedIndexFromList =
        characters.indexOf(message[index]) -
        characters.indexOf(secretKey[index]);

      cypherMessage[index] = characters[decryptedIndexFromList];
    }
  }

  secretKeyArray.forEach((char, index) => {
    const oneCharKey = secretKeyArray.length == 1;
    if (encryption) {
      if (oneCharKey) {
        messageArray.forEach((messageChar, index) => {
          encryptOrDecrypt(message, char, index);
        });
      } else encryptOrDecrypt(message, char, index);
    } else {
      if (oneCharKey) {
        messageArray.forEach((messageChar, index) =>
          encryptOrDecrypt(message, char, index, false)
        );
      } else {
        encryptOrDecrypt(message, char, index, false);
      }
    }
  });

  let newMessage = cypherMessage.join("");

  if (encryption === false) {
    newMessage = spaceIntegration(cypherMessage.join(""), spaces);
    spaces.length = 0;
  }

  return newMessage;
}

function copyText() {
  copyButton.addEventListener("click", () => {
    let textToCopy = encryptedTextarea.select();
    navigator.clipboard.writeText(encryptedTextarea.value);
  });
}

function encrypt() {
  const encryptButton = document.querySelector("#encrypt-button");
  encryptButton.addEventListener("click", () => {
    const messageTextareaValue = messageTextarea.value.toUpperCase();
    const secretTextareaValue = secretTextarea.value.toUpperCase();
    encryptedTextarea.value = cypher(messageTextareaValue, secretTextareaValue);
  });
}

function decrypt() {
  const decryptButton = document.querySelector("#decrypt-button");
  decryptButton.addEventListener("click", () => {
    const messageTextareaValue = messageTextarea.value.toUpperCase();
    const secretTextareaValue = secretTextarea.value.toUpperCase();
    encryptedTextarea.value = cypher(
      messageTextareaValue,
      secretTextareaValue,
      false
    );
  });
}

const copyButton = document.querySelector(".copy");
const messageTextarea = document.querySelector("#message-textarea");
const secretTextarea = document.querySelector("#secret-textarea");
const encryptedTextarea = document.querySelector("#encrypted-message");
encrypt();
decrypt();
copyText();
