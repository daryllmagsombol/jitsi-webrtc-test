import React, { Component } from 'react'
import { Button, Label, Input, InputGroup, Form, FormGroup, Col, Card, CardBody, CardTitle, CardText, Container, Row } from 'reactstrap'

import openSocket from 'socket.io-client';
import { throws } from 'assert';

export class JitsiViewContainer extends Component {

    constructor() {
        super()
       // const domain = 'meet.jit.si';
        
    //     JitsiMeetJS.init();
    //     let options = {
    //         hosts: {
    //             domain: "beta.meet.jit.si",
    //             muc: 'conference.beta.meet.jit.si',
    //             focus: 'focus.beta.meet.jit.si',
    //         },
    //         bosh: '//beta.meet.jit.si/http-bind',
    //         clientNode: 'https://beta.meet.jit.si',
    // }
    //     let api = new JitsiMeetJS.JitsiConnection(null, null, options);

    //this.socket = openSocket('https://10.10.80.20:8000');
    this.state = { 
        roomName: '',
        nickName: '',
        users: [
            { username: 'darjosh', name:'Daryll' }, 
            { username: 'anon', name:'Anon' },
        ],
        isRoom: false
    }
    this.renderContact = this.renderContact.bind(this)
    this.renderInput = this.renderInput.bind(this)
    this.joinRoom = this.joinRoom.bind(this)
    this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        //this.socket.on('test', 'hey')
    }

    call(username) {
        // var myWindow = window.open("", "Call", "width=700,height=7000");
        // myWindow.document.write("<div id='meet'></div>");
    }

    renderContact() {
        // return this.state.users.map((user, key)=>{
        //     return (<Button key={key} onClick={()=>{this.call(user.username)}}>Call {user.name}</Button>)
        // })
        
    }

    handleChange (e) {
        let { name, value } = e.target
        this.setState({ [name]: value })
    }

    joinRoom() {
        let { roomName, nickName } = this.state

        if(!roomName.trim()) return

        const domain = 'meet.jit.si';
        const options = {
            roomName,
            // width: 800,
            // height: 800,
            parentNode: document.querySelector('#meet')
        };

        this.setState({ isRoom: true }, () =>{
            const api = new JitsiMeetExternalAPI(domain, options);
            api.executeCommand('displayName', nickName);
        })
        return
    }

    renderInputOrRoom() {
        return this.state.isRoom ? '' : this.renderInput()
    }

    renderInput() {
        return (
            <div className="container-fluid" >
                <div className="justify-content-center align-items-center row" style={{minHeight: '100vh'}}>
                    <Card style={{padding: '65px'}}>
                    <h1 className="lead">JOIN ROOM</h1>
                            <Form>
                                <FormGroup>
                                    <Label for="roomName">Room Name</Label>
                                    <Input
                                        value={this.state.roomName}
                                        type="text" name="roomName" id="roomName"
                                        placeholder="myRoom"
                                        onChange={this.handleChange}
                                    />
                                    <Label for="roomName">Nick Name</Label>
                                    <Input
                                        value={this.state.nickName}
                                        type="text" name="nickName" id="nickName"
                                        placeholder="Jonas"
                                        onChange={this.handleChange}
                                    />
                                </FormGroup>
                            </Form>
                            {this.renderContact()}
                            <Button color="primary" onClick={()=>{this.joinRoom()}}>Join</Button>
                    </Card>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div id="meet" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: 0 }}>
                {this.renderInputOrRoom()}
            </div>
        )
    }
}

export default JitsiViewContainer