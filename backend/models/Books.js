const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Books = new Schema(
  {
    name: {
      type: String,
    },
    author: {
      type: String,
    },
    publication: {
      type: String,
    },
    publicationYear: {
      type: Number,
    },
    language: {
      type: String,
    },
    genre: {
      type: String,
    },
    edition: {
      type: String,
    },
    pdf: {
      type: String,
    },
    coverPage: {
      type: String,
    },
    views: {
      type: Number,
    },
    favorite: {
      type: Number,
    },
    about: {
      type: String,
    },
  },
  {
    collection: "books",
  }
);
module.exports = mongoose.model("Books", Books);
// {
//   "bookname": "asdf",
//   "author": "gp sharma",
//   "publication": "asdf",
//   "publicationYear": 1999,
//   "language": "hindi",
//   "genre": "memoirs_autobiographies",
//   "pdfDownloadUrl": "https://530cby-my.sharepoint.com/personal/vast2108_530cby_onmicrosoft_com/_layouts/15/download.aspx?UniqueId=c2deb5c6-d04f-45ce-84be-d34a8300c64e&Translate=false&tempauth=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvNTMwY2J5LW15LnNoYXJlcG9pbnQuY29tQGZiN2U0YjEwLTE3YTUtNGQzOC05NjQ3LWQxMGVkY2U2MTM5OSIsImlzcyI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMCIsIm5iZiI6IjE2ODcwOTQ1MDIiLCJleHAiOiIxNjg3MDk4MTAyIiwiZW5kcG9pbnR1cmwiOiJTVkFKQ29oMUxVN2lBTElEY2pKTVhLRDF5SGNKeU5PSFpnM3grQmthMWVjPSIsImVuZHBvaW50dXJsTGVuZ3RoIjoiMTYxIiwiaXNsb29wYmFjayI6IlRydWUiLCJjaWQiOiJvTDROZjdEUUFDQmg0L0NqWDV1dEVBPT0iLCJ2ZXIiOiJoYXNoZWRwcm9vZnRva2VuIiwic2l0ZWlkIjoiWTJVeVpEVTFPR010TVRkaE55MDBaREJsTFRrMU56SXRNVEk1WXpsa09HVTRaV0U0IiwiYXBwX2Rpc3BsYXluYW1lIjoiZS1saWJyYXJ5IiwiZ2l2ZW5fbmFtZSI6IkZOVSIsImZhbWlseV9uYW1lIjoiTE5VIiwic2lnbmluX3N0YXRlIjoiW1wia21zaVwiXSIsImFwcGlkIjoiYzUxNTI2MGItMzdkMi00Yzg4LWFjYmEtYmNlNTgxMWYzNGIxIiwidGlkIjoiZmI3ZTRiMTAtMTdhNS00ZDM4LTk2NDctZDEwZWRjZTYxMzk5IiwidXBuIjoidmFzdDIxMDhANTMwY2J5Lm9ubWljcm9zb2Z0LmNvbSIsInB1aWQiOiIxMDAzMjAwMkFBOTAxRjhDIiwiY2FjaGVrZXkiOiIwaC5mfG1lbWJlcnNoaXB8MTAwMzIwMDJhYTkwMWY4Y0BsaXZlLmNvbSIsInNjcCI6Im15ZmlsZXMucmVhZCBteWZpbGVzLndyaXRlIGFsbHByb2ZpbGVzLnJlYWQiLCJ0dCI6IjIiLCJpcGFkZHIiOiIxMDMuNzQuMTkuMTEyIn0.u7btRPXa8PmZqqgJL5A4P67n0gBNV7nrv0EI-lGCT8A&ApiVersion=2.0",
//   "coverPageDownloadUrl": "https://530cby-my.sharepoint.com/personal/vast2108_530cby_onmicrosoft_com/_layouts/15/download.aspx?UniqueId=ec5d1b45-3443-488e-af99-ba441bf0a92b&Translate=false&tempauth=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvNTMwY2J5LW15LnNoYXJlcG9pbnQuY29tQGZiN2U0YjEwLTE3YTUtNGQzOC05NjQ3LWQxMGVkY2U2MTM5OSIsImlzcyI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMCIsIm5iZiI6IjE2ODcwOTQ1MDQiLCJleHAiOiIxNjg3MDk4MTA0IiwiZW5kcG9pbnR1cmwiOiJIV0RKQlBzcmYwTlM0aU9GdXhSZy9VUVc0UWRlZWFnRmpuMWpMajlpYnY0PSIsImVuZHBvaW50dXJsTGVuZ3RoIjoiMTYxIiwiaXNsb29wYmFjayI6IlRydWUiLCJjaWQiOiJvTDROZ0JoUUFDQmg0L3NQOFA3ekVBPT0iLCJ2ZXIiOiJoYXNoZWRwcm9vZnRva2VuIiwic2l0ZWlkIjoiWTJVeVpEVTFPR010TVRkaE55MDBaREJsTFRrMU56SXRNVEk1WXpsa09HVTRaV0U0IiwiYXBwX2Rpc3BsYXluYW1lIjoiZS1saWJyYXJ5IiwiZ2l2ZW5fbmFtZSI6IkZOVSIsImZhbWlseV9uYW1lIjoiTE5VIiwic2lnbmluX3N0YXRlIjoiW1wia21zaVwiXSIsImFwcGlkIjoiYzUxNTI2MGItMzdkMi00Yzg4LWFjYmEtYmNlNTgxMWYzNGIxIiwidGlkIjoiZmI3ZTRiMTAtMTdhNS00ZDM4LTk2NDctZDEwZWRjZTYxMzk5IiwidXBuIjoidmFzdDIxMDhANTMwY2J5Lm9ubWljcm9zb2Z0LmNvbSIsInB1aWQiOiIxMDAzMjAwMkFBOTAxRjhDIiwiY2FjaGVrZXkiOiIwaC5mfG1lbWJlcnNoaXB8MTAwMzIwMDJhYTkwMWY4Y0BsaXZlLmNvbSIsInNjcCI6Im15ZmlsZXMucmVhZCBteWZpbGVzLndyaXRlIGFsbHByb2ZpbGVzLnJlYWQiLCJ0dCI6IjIiLCJpcGFkZHIiOiIxMDMuNzQuMTkuMTEyIn0.IcjJJo3nX3Ze8aGRUaldwXn4YfvWsCXC8Evnd-BnA6s&ApiVersion=2.0"
//   "views":0
// }
