!function(e){function t(l){if(n[l])return n[l].exports;var c=n[l]={i:l,l:!1,exports:{}};return e[l].call(c.exports,c,c.exports,t),c.l=!0,c.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,l){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:l})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t){var n=wp.i18n.__;(0,wp.blocks.registerBlockType)("cgb/block-my-block",{title:n("my-block - CGB Block"),icon:"shield",category:"common",keywords:[n("my-block \u2014 CGB Block"),n("CGB Example"),n("create-guten-block")],edit:function(e){return wp.element.createElement("div",{className:e.className},wp.element.createElement("p",null,"\u2014 Hello from the backend."),wp.element.createElement("p",null,"CGB BLOCK: ",wp.element.createElement("code",null,"my-block")," is a new Gutenberg block"),wp.element.createElement("p",null,"It was created via"," ",wp.element.createElement("code",null,wp.element.createElement("a",{href:"https://github.com/ahmadawais/create-guten-block"},"create-guten-block")),"."))},save:function(e){return wp.element.createElement("div",null,wp.element.createElement("p",null,"\u2014 Hello from the frontend."),wp.element.createElement("p",null,"CGB BLOCK: ",wp.element.createElement("code",null,"my-block")," is a new Gutenberg block."),wp.element.createElement("p",null,"It was created via"," ",wp.element.createElement("code",null,wp.element.createElement("a",{href:"https://github.com/ahmadawais/create-guten-block"},"create-guten-block")),"."))}})}]);