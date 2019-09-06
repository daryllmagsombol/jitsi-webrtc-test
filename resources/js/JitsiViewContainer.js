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
        this.setState({[name]: value})
    }

    joinRoom() {
        let roomName = this.state.roomName
        if(!roomName.trim()) return
        this.setState({ isRoom: true }, () =>{
            const domain = 'localhost:8080';
            const options = {
                roomName,
                width: 1000,
                height: 1000,
                nickName: 'HEYYYY',
                parentNode: document.querySelector('#meet')
            };
            const api = new JitsiMeetExternalAPI(domain, options);
            api.executeCommand('displayName', this.state.nickName);
        })
        
    }

    renderInputOrRoom() {
        return this.state.isRoom ? '' : this.renderInput()
    }

    renderInput() {
        return (
                <Card style={{padding: '70px'}}>
                <h1 className="lead" style={{textSize: 30}}>JOIN ROOM</h1>
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
        )
    }

    render() {
        return (
            <div className="container-fluid" >
                <div id="meet" className="justify-content-center align-items-center row" style={{minHeight: '100vh'}}>
                    {this.renderInputOrRoom()}
                </div>
            </div>
        )
    }
}

export default JitsiViewContainer