import { Component } from 'react';

function ensureEditorFunc(){
    if(!(this instanceof Component)){
        throw new Error('function must be bound to Editor Component!')
    }
}

function runEditorFunc(func, params){
    ensureEditorFunc.call(this);
    func.apply(this, params);
}

function _toggleFullScreen(e){
    this.setState({
        fullscreen: !this.state.fullscreen
    });
    e.stopPropagation();
    e.preventDefault();
}   

export function toggleFullScreen(...params){
    runEditorFunc.call(this, _toggleFullScreen.bind(this), params);
}