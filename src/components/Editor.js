import React, { Component } from 'react';
import './Editor.css';
import { toggleFullScreen } from './defaultKeyFunc';

const initStyle = {
    global:{
        lineHeight: '2rem'
    },
    lineNu:{
        fontSize: '1.2rem',
        padding: '8px 4px',
        display: 'auto',
        background: '#444',
        color: '#999'
    },
    editor:{
        fontSize: '1.4rem',
        background: '#2f2f2f',
        color: '#eee',
        padding: '8px .8rem'
    }
}

const initConfig = {
    style: initStyle
}

class Editor extends Component {
    constructor(){
        super();

        this.state = {
            nu: 1,
            fullscreen: false,
            config: initConfig,
            keyMapping: {
                'ALT-F': toggleFullScreen.bind(this)
            }
        }

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }
    handleKeyDown(e){
        let keyMapping = ''
        if(e.ctrlKey){
            keyMapping += 'CTLR-';
        }
        if(e.altKey){
            keyMapping += 'ALT-';
        }
        
        keyMapping += String.fromCharCode(e.keyCode);
        if(this.state.keyMapping[keyMapping]){
            this.state.keyMapping[keyMapping].call(this, e);
        }
    }
    handleKeyUp(e){
        const html = e.target.innerHTML;
        //console.log(html);
        let line = html.split('<div>').length;
        if(html.startsWith('<div>')){
            line -= 1;
        }
        this.setState({
            nu: line
        });
    }
    render(){
        const lineNuDom = new Array(this.state.nu).fill('').map((v, i)=>{
            return (<div className="nu" key={i}>{i + 1}</div>);
        });
        return (
            <div className={"wrapper " + (this.state.fullscreen?'fullscreen':'')} 
                style={this.state.config.style.global}>
                <div className={'fixedWrapper'}>
                    <div className="line-nu" style={this.state.config.style.lineNu}>
                        { lineNuDom }
                    </div>
                    <div className="editor" contentEditable="true"
                        onKeyDown={this.handleKeyDown}
                        onKeyUp={this.handleKeyUp} 
                        style={this.state.config.style.editor}>
                    </div>
                </div>
            </div>
        )
    }
}

export default Editor;